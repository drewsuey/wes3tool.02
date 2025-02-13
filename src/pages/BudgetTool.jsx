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

    // Coverage level adjustments
    let spacingMultiplier;
    switch (newData.coverageLevel) {
      case 'medium':
        spacingMultiplier = 1.25; // 25% increased spacing
        break;
      case 'low':
        spacingMultiplier = 1.5;  // 50% increased spacing
        break;
      default: // 'max'
        spacingMultiplier = 1;    // Standard spacing
    }

    // Calculate base coverage area with adjusted spacing
    const baseDeviceCoverage = Math.PI * Math.pow(25 * spacingMultiplier, 2);
    
    // Calculate total detectors needed based on area and spacing
    const totalDetectorsNeeded = Math.ceil(sqFt / baseDeviceCoverage);
    
    // Apply 90-10 split for smoke vs heat detectors
    const smokeDetectors = Math.ceil(totalDetectorsNeeded * 0.9);
    const heatDetectors = Math.ceil(totalDetectorsNeeded * 0.1);
    const callPoints = floors * stairs;

    const interfaceUnitCount = newData.interfaceIntegration ? 1 : 0;
    const reactAnnualCost = newData.reactIntegration ? 2500 : 0;

    const totalDevices = smokeDetectors + heatDetectors + callPoints + interfaceUnitCount;

    setData({
      ...newData,
      smokeDetectors,
      heatDetectors,
      callPoints,
      interfaceUnitCount,
      totalDevices,
      reactAnnualCost,
      spacingMultiplier, // Store for reference
    });

    setFormSubmitted(true);
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
  const handleEmail = async () => {
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
            <div className="contact-info">
              <h3>Contact Information</h3>
              <p style={{ color: "#333" }}>Name: <strong>{data.name}</strong></p>
              <p style={{ color: "#333" }}>Company: <strong>{data.companyName}</strong></p>
              <p style={{ color: "#333" }}>Email: <strong>{data.email}</strong></p>
              {data.phone && <p style={{ color: "#333" }}>Phone: <strong>{data.phone}</strong></p>}
            </div>
            
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
