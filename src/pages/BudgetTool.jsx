// src/pages/BudgetTool.jsx

import React, { useState } from 'react';
import FormStep from '../components/FormStep';
import Chart from '../components/Chart';
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

    // 1) Print
    const handlePrint = () => {
      window.print();
    };
  
    // 2) Download PDF
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
  
    // 3) Email (uses mailto: so it opens the user's email client)
    const handleEmail = () => {
      const subject = encodeURIComponent('WES3 Budget Estimate');
      // Build a multiline body
      const body = encodeURIComponent(`
        Here's my WES3 budget estimate:
  
        Smoke Detectors: ${data.smokeDetectors || 0}
        Heat Detectors: ${data.heatDetectors || 0}
        Call Points:    ${data.callPoints || 0}
        Total Devices:  ${data.totalDevices || 0}
  
        REACT Subscription: ${data.reactIntegration ? '$' + (data.reactAnnualCost || 0) + '/year' : 'Not selected'}
  
        Let me know next steps!
      `);
  
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };
  
    // 4) Request Quote (either navigate or show a local mini-form)
    const handleRequestQuoteClick = () => {
      // Option A: Show a local form below the results
      setShowQuoteForm(true);

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
      </div>
    </div>
  );
}

export default BudgetTool;

 {/* Render the chart below the summary */}
 <Chart data={data} />
        </div>
      )}
    </div>
  </div>
);
}

export default BudgetTool;