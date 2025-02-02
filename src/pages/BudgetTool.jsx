// src/pages/BudgetTool.jsx

import React, { useState } from 'react';
import FormStep from '../components/FormStep';
// import Chart from '../components/Chart';
// import PDFExporter from '../components/PDFExporter';
import '../App.css';

function BudgetTool() {
  const [data, setData] = useState({});

  const handleDataUpdate = (newData) => {
    // 1) Parse numeric fields
    const sqFt   = parseInt(newData.siteSize || 0, 10);
    const floors = parseInt(newData.floors   || 0, 10);
    const stairs = parseInt(newData.stairs   || 0, 10);

    // 2) Calculate coverage areas:
    //    Smoke: π × (25^2)
    //    Heat:  π × (17.5^2)
    const smokeCoverage = Math.PI * Math.pow(25, 2);       // ~1963 sq. ft. per detector
    const heatCoverage  = Math.PI * Math.pow(17.5, 2);     // ~962 sq. ft. per detector

    // 3) Compute # of detectors needed (rounding up)
    const smokeDetectors = Math.ceil(sqFt / smokeCoverage);
    const heatDetectors  = Math.ceil(sqFt / heatCoverage);

    // 4) Call points: one per floor per staircase
    const callPoints = floors * stairs;

    // 5) Optionally compute total devices
    const totalDevices = smokeDetectors + heatDetectors + callPoints;

    // 6) Merge new fields into your state
    setData({
      ...data,
      ...newData,
      smokeDetectors,
      heatDetectors,
      callPoints,
      totalDevices,
    });
  };

  return (
    <div className="budget-tool-hero">
      {/* The overlay covers the entire background */}
      <div className="budget-overlay"></div>

      {/* The content container sits on top of the overlay */}
      <div className="budget-content">
        <h1 className="budget-title">WES3 Budget Tool</h1>

      {/* The form that collects site info, floors, stairs, etc. */}
      <FormStep onUpdate={handleDataUpdate} />

      {/* Display the calculated results once user hits "Submit" */}
      {data.totalDevices !== undefined && (
        <div className="estimate-result">
          <h2>Device Estimate</h2>
          <p>Smoke Detectors Needed: <strong>{data.smokeDetectors}</strong></p>
          <p>Heat Detectors Needed: <strong>{data.heatDetectors}</strong></p>
          <p>Call Points Needed: <strong>{data.callPoints}</strong></p>
          <p>Total Devices: <strong>{data.totalDevices}</strong></p>
        </div>
      )}

      {/* If you want to re-enable the chart or PDF exporter, just uncomment: */}
      {/* {data.totalDevices !== undefined && <Chart data={data} />} */}
      {/* {data.totalDevices !== undefined && <PDFExporter data={data} />} */}
    </div>
    </div>
  );
}

export default BudgetTool;
