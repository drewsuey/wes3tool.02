// Advanced calculations for the WES3 Budget Tool

import { CONSTRUCTION_REQUIREMENTS } from './validationrules';

// MCP Server for advanced calculations
const WOLFRAM_SERVER = "github.com/Garoth/wolframalpha-llm-mcp";

// Device spacing based on coverage level
const COVERAGE_SPACING = {
  max: {
    multiplier: 1.0,
    smokeRatio: 0.9,
    heatRatio: 0.1
  },
  medium: {
    multiplier: 1.25,
    smokeRatio: 0.8,
    heatRatio: 0.2
  },
  low: {
    multiplier: 1.5,
    smokeRatio: 0.7,
    heatRatio: 0.3
  }
};

// Base costs for devices and services
const DEVICE_COSTS = {
  smokeDetector: 150,
  heatDetector: 200,
  callPoint: 100,
  interfaceUnit: 500,
  reactSubscription: 2500 // annual cost
};

// Calculate device coverage area based on construction type and coverage level
export const calculateCoverageArea = async (constructionType, coverageLevel) => {
  const baseSpacing = CONSTRUCTION_REQUIREMENTS[constructionType].maxSpacing;
  const spacingMultiplier = COVERAGE_SPACING[coverageLevel].multiplier;
  const radius = baseSpacing * spacingMultiplier;
  
  try {
    // Validate calculation using WolframAlpha
    const query = `area of circle with radius ${radius} meters`;
    const result = await window.mcpTools.use_mcp_tool(WOLFRAM_SERVER, "get_simple_answer", {
      question: query
    });
    
    // Parse the result to get just the numerical value
    const match = result.match(/(\d+(\.\d+)?)/);
    if (match) {
      return parseFloat(match[0]);
    }
  } catch (error) {
    console.warn('WolframAlpha validation failed, using local calculation:', error);
  }
  
  // Fallback to local calculation if WolframAlpha fails
  return Math.PI * Math.pow(radius, 2);
};

// Convert feet to meters for WolframAlpha calculations
const feetToMeters = (feet) => feet * 0.3048;

// Convert square meters back to square feet
const squareMetersToFeet = (squareMeters) => squareMeters * 10.764;

// Calculate required detectors based on area and construction requirements
export const calculateDetectors = async (formData) => {
  const {
    siteSize,
    floors,
    constructionType,
    coverageLevel
  } = formData;

  try {
    // Convert spacing from feet to meters for WolframAlpha
    const coverageArea = await calculateCoverageArea(constructionType, coverageLevel);
    // Convert result back to square feet for our calculations
    const coverageAreaFt = squareMetersToFeet(coverageArea);
    const minDetectorsPerFloor = CONSTRUCTION_REQUIREMENTS[constructionType].minDetectorsPerFloor;
  
  // Calculate total detectors needed based on area
    const detectorsPerFloor = Math.max(
      minDetectorsPerFloor,
      Math.ceil(siteSize / (floors * coverageAreaFt))
    );
    
    const totalDetectors = detectorsPerFloor * floors;
    
    // Split between smoke and heat detectors based on coverage level
    const { smokeRatio, heatRatio } = COVERAGE_SPACING[coverageLevel];
    
    return {
      smoke: Math.ceil(totalDetectors * smokeRatio),
      heat: Math.ceil(totalDetectors * heatRatio)
    };
  } catch (error) {
    console.error('Failed to calculate detectors:', error);
    // Fallback to basic calculation without WolframAlpha
    const coverageArea = Math.PI * Math.pow(CONSTRUCTION_REQUIREMENTS[constructionType].maxSpacing * COVERAGE_SPACING[coverageLevel].multiplier, 2);
    const minDetectorsPerFloor = CONSTRUCTION_REQUIREMENTS[constructionType].minDetectorsPerFloor;
    const detectorsPerFloor = Math.max(
      minDetectorsPerFloor,
      Math.ceil(siteSize / (floors * coverageArea))
    );
    const totalDetectors = detectorsPerFloor * floors;
    const { smokeRatio, heatRatio } = COVERAGE_SPACING[coverageLevel];
    return {
      smoke: Math.ceil(totalDetectors * smokeRatio),
      heat: Math.ceil(totalDetectors * heatRatio)
    };
  }
};

// Calculate call points based on building configuration
export const calculateCallPoints = (floors, stairs, constructionType) => {
  // Minimum 1 call point per staircase per floor
  const baseCallPoints = floors * stairs;
  
  // Add additional call points for commercial and industrial buildings
  const additionalPoints = {
    residential: 0,
    commercial: Math.ceil(floors * 0.5), // Extra points for emergency exits
    industrial: Math.ceil(floors * 1), // Extra points for emergency exits and work zones
    marine: Math.ceil(floors * 1.5) // Extra points for multiple access points
  };
  
  return baseCallPoints + additionalPoints[constructionType];
};

// Calculate interface units based on building type and integration requirements
export const calculateInterfaceUnits = (formData) => {
  const { constructionType, interfaceIntegration, floors } = formData;
  
  if (!interfaceIntegration) {
    return 0;
  }

  // Calculate based on construction type and building size
  const unitsPerFloors = {
    residential: 20, // 1 unit per 20 floors
    commercial: 10, // 1 unit per 10 floors
    industrial: 5,  // 1 unit per 5 floors
    marine: 3       // 1 unit per 3 floors
  };

  return Math.max(1, Math.ceil(floors / unitsPerFloors[constructionType]));
};

// Calculate total system cost
export const calculateCosts = (deviceCounts, hasReactIntegration) => {
  const { smoke, heat, callPoints, interfaceUnits } = deviceCounts;
  
  const deviceCosts = {
    smokeDetectors: smoke * DEVICE_COSTS.smokeDetector,
    heatDetectors: heat * DEVICE_COSTS.heatDetector,
    callPoints: callPoints * DEVICE_COSTS.callPoint,
    interfaceUnits: interfaceUnits * DEVICE_COSTS.interfaceUnit,
    reactSubscription: hasReactIntegration ? DEVICE_COSTS.reactSubscription : 0
  };
  
  const subtotal = Object.values(deviceCosts).reduce((sum, cost) => sum + cost, 0);
  const installation = subtotal * 0.3; // 30% of hardware costs
  const maintenance = subtotal * 0.15; // 15% of hardware costs annually
  
  return {
    ...deviceCosts,
    installation,
    maintenance,
    total: subtotal + installation
  };
};

// Get technical explanation for calculations
export const getCalculationExplanation = async (formData) => {
  try {
    // Convert measurements to metric for WolframAlpha
    const siteSizeMeters = formData.siteSize * 0.092903; // Convert sq ft to sq m
    const spacingMeters = feetToMeters(CONSTRUCTION_REQUIREMENTS[formData.constructionType].maxSpacing);
    
    const query = `In a ${formData.constructionType} building with ${formData.floors} floors and ${siteSizeMeters.toFixed(2)} square meters per floor, explain the optimal spacing for fire detection devices considering that the base spacing is ${spacingMeters.toFixed(2)} meters with a coverage multiplier of ${COVERAGE_SPACING[formData.coverageLevel].multiplier}. Include considerations for smoke vs heat detector ratios.`;
    
    const explanation = await window.mcpTools.use_mcp_tool(WOLFRAM_SERVER, "ask_llm", {
      question: query
    });
    
    return explanation;
  } catch (error) {
    console.warn('Failed to get calculation explanation:', error);
    return null;
  }
};

// Generate complete estimate
export const generateEstimate = async (formData) => {
  try {
    const detectors = await calculateDetectors(formData);
    const callPoints = calculateCallPoints(
      formData.floors,
      formData.stairs,
      formData.constructionType
    );
    const interfaceUnits = calculateInterfaceUnits(formData);
    
    const deviceCounts = {
      smoke: detectors.smoke,
      heat: detectors.heat,
      callPoints,
      interfaceUnits
    };
    
    const costs = calculateCosts(deviceCounts, formData.reactIntegration);
    
    const explanation = await getCalculationExplanation(formData);
    
    return {
      deviceCounts,
      costs,
      coverageDetails: {
        level: formData.coverageLevel,
        constructionType: formData.constructionType,
        spacing: CONSTRUCTION_REQUIREMENTS[formData.constructionType].maxSpacing,
        multiplier: COVERAGE_SPACING[formData.coverageLevel].multiplier,
        technicalExplanation: explanation
      }
    };
  } catch (error) {
    console.error('Failed to generate estimate:', error);
    throw error; // Re-throw to let caller handle the error
  }
};
