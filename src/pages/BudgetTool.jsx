// src/pages/BudgetTool.jsx
import React, { useState } from 'react';
import jsPDF from 'jspdf'; // IMPORTANT: import jsPDF for handleDownloadPDF
import FormStep from '../components/FormStep';
import Chart from '../components/Chart';
import '../App.css';

function BudgetTool() {
  const [data, setData] = useState({});
  
  // For "Request a Quote" form toggle
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  // 1) Form data updates
  const handleDataUpdate = (newData) => {
    const sqFt = parseInt(newData.siteSize || 0, 10);
    const floors = parseInt(newData.floors || 0, 10);
    const stairs = parseInt(newData.stairs || 0, 10);
  
    // Get coverage adjustment factor based on selected coverage level
    const coverageLevel = newData.coverageLevel || "best"; // Default to best if not selected
    let adjustmentFactor = 1; // Default is no adjustment (best coverage)
    if (coverageLevel === "good") adjustmentFactor = 1.5; // 50% increase
    if (coverageLevel === "better") adjustmentFactor = 1.25; // 25% increase
  
    // Adjust spacing based on coverage level
    const smokeCoverage = Math.PI * Math.pow(25 * adjustmentFactor, 2); // Adjust smoke radius
    const heatCoverage = Math.PI * Math.pow(17.5 * adjustmentFactor, 2); // Adjust heat radius
  
    const smokeDetectors = Math.ceil(sqFt / smokeCoverage);
    const heatDetectors = Math.ceil(sqFt / heatCoverage);
    const callPoints = floors * stairs;
  
    // If interfaceIntegration is checked, add 1 device
    const interfaceUnitCount = newData.interfaceIntegration ? 1 : 0;
  
    // If reactIntegration is checked, add the annual cost (not a device)
    const reactAnnualCost = newData.reactIntegration ? 2500 : 0;
  
    // Total devices = Smoke + Heat + Call Points + Interface
    const totalDevices =
      smokeDetectors + heatDetectors + callPoints + interfaceUnitCount;
  
    setData({
      ...newData,
      smokeDetectors,
      heatDetectors,
      callPoints,
      interfaceUnitCount,
      totalDevices,
      reactAnnualCost,
      coverageLevel, // Store the coverage level for display
    });
  };

  // Other functions remain unchanged...

  return (
    <div className="budget-tool-hero">
      <div className="budget-overlay"></div>
      <div className="budget-content">
        <h1 className="budget-title">WES3 Budget Tool</h1>

        <FormStep onUpdate={handleDataUpdate} />

        {data.totalDevices !== undefined && (
          <div className="estimate-result">
            <h2>Device Estimate</h2>
            <p>Coverage Level: <strong>{data.coverageLevel}</strong></p>
            <p>
              Smoke Detectors Needed: <strong>{data.smokeDetectors}</strong>
            </p>
            <p>
              Heat Detectors Needed: <strong>{data.heatDetectors}</strong>
            </p>
            <p>
              Call Points Needed: <strong>{data.callPoints}</strong>
            </p>

            {/* If Interface is checked, show how many we added */}
            {data.interfaceIntegration && (
              <p>
                Interface Unit: <strong>{data.interfaceUnitCount}</strong>
              </p>
            )}

            <p>
              Total Devices: <strong>{data.totalDevices}</strong>
            </p>

            {/* REACT is an annual subscription, not an additional device */}
            {data.reactIntegration && (
              <p>
                REACT Subscription:{' '}
                <strong>${data.reactAnnualCost}/year</strong>
              </p>
            )}

            {/* CTA Buttons */}
            <div className="cta-buttons">
              <button onClick={handlePrint}>Print</button>
              <button onClick={handleDownloadPDF}>Download PDF</button>
              <button onClick={handleEmail}>Email My Estimate</button>
              <button onClick={handleRequestQuoteClick}>Request a Quote</button>
            </div>

            {/* Optional inline "Request Quote" form */}
            {showQuoteForm && (
              <form onSubmit={handleQuoteFormSubmit} className="quote-form">
                <h3>Request a Formal Quote</h3>
                <label>
                  Name:
                  <input name="name" type="text" required />
                </label>
                <label>
                  Email:
                  <input name="email" type="email" required />
                </label>
                <label>
                  Additional Notes:
                  <textarea name="message" rows="3" />
                </label>
                <button type="submit">Submit Request</button>
              </form>
            )}
          </div>
        )}

        {/* Render the chart below the summary (if you want it always shown, remove the condition) */}
        {data.totalDevices !== undefined && (
          <div className="chart-section">
            <Chart data={data} />
          </div>
        )}
      </div>
    </div>
  );
}

export default BudgetTool;
