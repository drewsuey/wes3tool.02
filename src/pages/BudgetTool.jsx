import React, { useState } from 'react';
import FormStep from '../components/FormStep';
import Chart from '../components/Chart';
import PDFExporter from '../components/PDFExporter';

function BudgetTool() {
  const [data, setData] = useState({});

  const handleDataUpdate = (newData) => {
    setData({ ...data, ...newData });
  };

  return (
    <div className="budget-tool-container">
      <h1>WES3 Budget Tool</h1>
      <FormStep onUpdate={handleDataUpdate} />
      {/* {data && <Chart data={data} />} */}
      {/* {data && <PDFExporter data={data} />} */}
    </div>
  );
}

export default BudgetTool;
