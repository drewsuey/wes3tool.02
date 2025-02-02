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

    // Coverage calculations (example only):
    const smokeCoverage = Math.PI * Math.pow(25, 2); // ~1963 sq. ft
    const heatCoverage  = Math.PI * Math.pow(17.5, 2); // ~962 sq. ft

    const smokeDetectors = Math.ceil(sqFt / smokeCoverage);
    const heatDetectors  = Math.ceil(sqFt / heatCoverage);
    const callPoints     = floors * stairs;

    // If interfaceIntegration is checked, we add 1 device
    const interfaceUnitCount = newData.interfaceIntegration ? 1 : 0;

    // If reactIntegration is checked, store an annual cost (not a device)
    const reactAnnualCost = newData.reactIntegration ? 2500 : 0; // e.g. $2500/year

    // Total devices = Smoke + Heat + Call Points + Interface
    const totalDevices =
      smokeDetectors +
      heatDetectors +
      callPoints +
      interfaceUnitCount;

    setData({
      ...newData,
      smokeDetectors,
      heatDetectors,
      callPoints,
      interfaceUnitCount,
      totalDevices,
      reactAnnualCost,
    });
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

  // 5) Request Quote button toggles a local mini-form
  const handleRequestQuoteClick = () => {
    setShowQuoteForm(true);
  };

  // 6) Handle form submission
  const handleQuoteFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message') || '';

    // Demo: Just alert. In real usage, you'd send to a server.
    alert(`Quote requested by ${name} (${email}):\n\n${message}`);
    setShowQuoteForm(false);
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
