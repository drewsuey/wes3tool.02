// src/pages/BudgetTool.jsx
import React, { useState } from 'react';
import jsPDF from 'jspdf'; // IMPORTANT: import jsPDF for handleDownloadPDF
import FormStep from '../components/FormStep';
import Chart from '../components/Chart';
import '../App.css';

function BudgetTool() {
  const [data, setData] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false); // Track if the form is submitted

  // For "Request a Quote" form toggle
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  // 1) Form data updates
  const handleDataUpdate = (newData) => {
    const sqFt = parseInt(newData.siteSize || 0, 10);
    const floors = parseInt(newData.floors || 0, 10);
    const stairs = parseInt(newData.stairs || 0, 10);

    const coverageLevel = newData.coverageLevel || 'best'; // Default to best if not selected
    let adjustmentFactor = 1; // Default is no adjustment (best coverage)
    if (coverageLevel === 'good') adjustmentFactor = 1.5; // 50% increase
    if (coverageLevel === 'better') adjustmentFactor = 1.25; // 25% increase

    const smokeCoverage = Math.PI * Math.pow(25 * adjustmentFactor, 2);
    const heatCoverage = Math.PI * Math.pow(17.5 * adjustmentFactor, 2);

    const smokeDetectors = Math.ceil(sqFt / smokeCoverage);
    const heatDetectors = Math.ceil(sqFt / heatCoverage);
    const callPoints = floors * stairs;

    const interfaceUnitCount = newData.interfaceIntegration ? 1 : 0;
    const reactAnnualCost = newData.reactIntegration ? 2500 : 0;

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
      coverageLevel,
    });

    setFormSubmitted(true); // Mark the form as submitted
  };

  // Reset the form
  const handleReset = () => {
    setFormSubmitted(false);
    setData({});
  };

  // 2) Print
  const handlePrint = () => {
    window.print();
  };

  // 3) Download PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('WES3 Budget Estimate', 10, 10);
    doc.text(`Smoke Detectors: ${data.smokeDetectors || 0}`, 10, 20);
    doc.text(`Heat Detectors: ${data.heatDetectors || 0}`, 10, 30);
    doc.text(`Call Points: ${data.callPoints || 0}`, 10, 40);
    doc.text(`Total Devices: ${data.totalDevices || 0}`, 10, 50);

    if (data.reactIntegration) {
      doc.text(
        `REACT Subscription: $${data.reactAnnualCost || 0}/year`,
        10,
        60
      );
    }
    doc.save('WES3-Budget-Estimate.pdf');
  };

  // 4) Email
  const handleEmail = () => {
    const subject = encodeURIComponent('WES3 Budget Estimate');
    const body = encodeURIComponent(`
      Here's my WES3 budget estimate:
      
      Smoke Detectors: ${data.smokeDetectors || 0}
      Heat Detectors:  ${data.heatDetectors || 0}
      Call Points:     ${data.callPoints || 0}
      Total Devices:   ${data.totalDevices || 0}

      REACT Subscription: ${
        data.reactIntegration
          ? '$' + (data.reactAnnualCost || 0) + '/year'
          : 'Not selected'
      }
      
      Let me know next steps!
    `);

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="budget-tool-hero">
      <div className="budget-overlay"></div>
      <div className="budget-content">
        <h1 className="budget-title">WES3 Budget Tool</h1>
  
        {!formSubmitted ? (
          <FormStep onUpdate={handleDataUpdate} />
        ) : (
          <div className="estimate-result">
            <h2>Device Estimate</h2>
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
  
            {/* Render the chart */}
            <div className="chart-section">
              <Chart data={data} />
            </div>
  
            {/* CTA Buttons */}
            <div className="cta-buttons">
              <button onClick={handlePrint}>Print</button>
              <button onClick={handleDownloadPDF}>Download PDF</button>
              <button onClick={handleEmail}>Email My Estimate</button>
              <button onClick={handleReset}>Start Over</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );  
}

export default BudgetTool;
