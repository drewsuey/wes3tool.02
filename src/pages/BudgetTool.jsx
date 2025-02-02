// src/pages/BudgetTool.jsx

import React, { useState } from 'react';
import FormStep from '../components/FormStep';
// import Chart from '../components/Chart';
// import PDFExporter from '../components/PDFExporter';
import '../App.css';

function BudgetTool() {
  const [data, setData] = useState({});

  const handleDataUpdate = (newData) => {
    const sqFt = parseInt(newData.siteSize || 0, 10);
    const floors = parseInt(newData.floors || 0, 10);
    const stairs = parseInt(newData.stairs || 0, 10);

    // Coverage calculations (example only):
    const smokeCoverage = Math.PI * Math.pow(25, 2); // ~1963 sq. ft
    const heatCoverage  = Math.PI * Math.pow(17.5, 2); // ~962 sq. ft

    const smokeDetectors = Math.ceil(sqFt / smokeCoverage);
    const heatDetectors  = Math.ceil(sqFt / heatCoverage);
    const callPoints     = floors * stairs;

    // If interfaceIntegration is checked, we add 1 device
    const interfaceUnitCount = newData.interfaceIntegration ? 1 : 0;

    // If reactIntegration is checked, we won't add a device—
    // but let's store an annual subscription cost or note:
    const reactAnnualCost = newData.reactIntegration ? 2500 : 0; // example $500/year

    // Total devices = Smoke + Heat + Call Points + Interface (IF checked)
    const totalDevices = 
      smokeDetectors + 
      heatDetectors + 
      callPoints + 
      interfaceUnitCount;

    // We'll store everything in state for display
    setData({
      ...newData,
      smokeDetectors,
      heatDetectors,
      callPoints,
      interfaceUnitCount,
      totalDevices,
      reactAnnualCost, // Store the subscription if they picked REACT
    });
  };

  return (
    <div className="budget-tool-hero">
      <div className="budget-overlay"></div>
      <div className="budget-content">
        <h1 className="budget-title">WES3 Budget Tool</h1>

        <FormStep onUpdate={handleDataUpdate} />

        {data.totalDevices !== undefined && (
          <div className="estimate-result">
            <h2>Device Estimate</h2>
            <p>Smoke Detectors Needed: <strong>{data.smokeDetectors}</strong></p>
            <p>Heat Detectors Needed: <strong>{data.heatDetectors}</strong></p>
            <p>Call Points Needed: <strong>{data.callPoints}</strong></p>

            {/* If Interface is checked, show how many we added */}
            {data.interfaceIntegration && (
              <p>Interface Unit: <strong>{data.interfaceUnitCount}</strong></p>
            )}

            <p>Total Devices: <strong>{data.totalDevices}</strong></p>

            {/* REACT is an annual subscription, not an additional device */}
            {data.reactIntegration && (
              <p>REACT Subscription: <strong>${data.reactAnnualCost}/year</strong></p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BudgetTool;