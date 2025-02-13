// src/pages/BudgetTool.jsx
import React, { useState, useCallback, useMemo } from 'react';
import jsPDF from 'jspdf'; // IMPORTANT: import jsPDF for handleDownloadPDF
import FormStep from '../components/FormStep';
import Chart from '../components/Chart';
import '../App.css';

// Constants for calculations
const SPACING_MULTIPLIERS = {
  max: 1,      // Standard spacing
  medium: 1.25, // 25% increased spacing
  low: 1.5     // 50% increased spacing
};

const BASE_COVERAGE_RADIUS = 25; // Base radius in feet
const SMOKE_DETECTOR_RATIO = 0.9;
const HEAT_DETECTOR_RATIO = 0.1;
const REACT_SUBSCRIPTION_COST = 2500;

function BudgetTool() {
  const [data, setData] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false); // Track if the form is submitted

  // For "Request a Quote" form toggle
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  // Memoized calculation functions
  const calculateDeviceCoverage = useCallback((spacing) => {
    return Math.PI * Math.pow(BASE_COVERAGE_RADIUS * spacing, 2);
  }, []);

  const calculateDetectors = useCallback((sqFt, spacing) => {
    const coverage = calculateDeviceCoverage(spacing);
    const total = Math.ceil(sqFt / coverage);
    return {
      smoke: Math.ceil(total * SMOKE_DETECTOR_RATIO),
      heat: Math.ceil(total * HEAT_DETECTOR_RATIO)
    };
  }, [calculateDeviceCoverage]);

  // Memoized data update handler
  const handleDataUpdate = useCallback((newData) => {
    const sqFt = parseInt(newData.siteSize || 0, 10);
    const floors = parseInt(newData.floors || 0, 10);
    const stairs = parseInt(newData.stairs || 0, 10);

    const spacingMultiplier = SPACING_MULTIPLIERS[newData.coverageLevel] || SPACING_MULTIPLIERS.max;
    const { smoke: smokeDetectors, heat: heatDetectors } = calculateDetectors(sqFt, spacingMultiplier);
    
    const callPoints = floors * stairs;
    const interfaceUnitCount = newData.interfaceIntegration ? 1 : 0;
    const reactAnnualCost = newData.reactIntegration ? REACT_SUBSCRIPTION_COST : 0;

    const totalDevices = smokeDetectors + heatDetectors + callPoints + interfaceUnitCount;

    setData({
      ...newData,
      smokeDetectors,
      heatDetectors,
      callPoints,
      interfaceUnitCount,
      totalDevices,
      reactAnnualCost,
      spacingMultiplier,
    });

    setFormSubmitted(true);
  }, [calculateDetectors]);

  // Memoized handlers
  const handleReset = useCallback(() => {
    setFormSubmitted(false);
    setData({});
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleDownloadPDF = useCallback(() => {
    const doc = new jsPDF();
    
    // Memoized PDF content generation
    const content = [
      { text: 'WES3 Budget Estimate', y: 10 },
      { text: `Smoke Detectors: ${data.smokeDetectors || 0}`, y: 20 },
      { text: `Heat Detectors: ${data.heatDetectors || 0}`, y: 30 },
      { text: `Call Points: ${data.callPoints || 0}`, y: 40 },
      { text: `Total Devices: ${data.totalDevices || 0}`, y: 50 }
    ];

    if (data.reactIntegration) {
      content.push({
        text: `REACT Subscription: $${data.reactAnnualCost || 0}/year`,
        y: 60
      });
    }

    content.forEach(({ text, y }) => doc.text(text, 10, y));
    doc.save('WES3-Budget-Estimate.pdf');
  }, [data]);

  const handleEmail = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/api/send-estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to send estimate');
      }

      const result = await response.json();
      alert('Estimate sent successfully to our sales team!');
    } catch (error) {
      console.error('Error sending estimate:', error);
      alert('Failed to send estimate. Please try again later.');
    }
  }, [data]);

  // Memoized result content
  const estimateResult = useMemo(() => (
    <div className="estimate-result">
      <h2>Device Estimate</h2>
      <div className="contact-info">
        <h3>Contact Information</h3>
        <p style={{ color: "#333" }}>Name: <strong>{data.name}</strong></p>
        <p style={{ color: "#333" }}>Company: <strong>{data.companyName}</strong></p>
        <p style={{ color: "#333" }}>Email: <strong>{data.email}</strong></p>
        {data.phone && <p style={{ color: "#333" }}>Phone: <strong>{data.phone}</strong></p>}
      </div>
      
      <div className="device-counts">
        <p style={{ color: "#333" }}>
          Smoke Detectors Needed: <strong>{data.smokeDetectors}</strong>
        </p>
        <p style={{ color: "#333" }}>
          Heat Detectors Needed: <strong>{data.heatDetectors}</strong>
        </p>
        <p style={{ color: "#333" }}>
          Call Points Needed: <strong>{data.callPoints}</strong>
        </p>
        {data.interfaceIntegration && (
          <p style={{ color: "#333" }}>
            Interface Unit: <strong>{data.interfaceUnitCount}</strong>
          </p>
        )}
        <p style={{ color: "#333" }}>
          Total Devices: <strong>{data.totalDevices}</strong>
        </p>
        {data.reactIntegration && (
          <p style={{ color: "#333" }}>
            REACT Subscription: <strong>${data.reactAnnualCost}/year</strong>
          </p>
        )}
      </div>

      <div className="chart-section">
        <Chart data={data} />
      </div>

      <div className="cta-buttons">
        <button onClick={handlePrint}>Print</button>
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={handleEmail}>Email My Estimate</button>
        <button onClick={handleReset}>Start Over</button>
      </div>
    </div>
  ), [data, handlePrint, handleDownloadPDF, handleEmail, handleReset]);

  return (
    <div className="budget-tool-hero">
      <div className="budget-overlay"></div>
      <div className="budget-content">
        <h1 className="budget-title">WES3 Budget Tool</h1>
  
        {!formSubmitted ? (
          <FormStep onUpdate={handleDataUpdate} />
        ) : (
          estimateResult
        )}
      </div>
    </div>
  );  
}

export default React.memo(BudgetTool);
