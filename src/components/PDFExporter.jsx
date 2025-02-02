import React from 'react';
import jsPDF from 'jspdf';

function PDFExporter({ data }) {
  // 1) Defensive check: fallback if data is missing
  const siteType = data?.siteType || 'N/A';
  const siteSize = data?.siteSize || 'N/A';
  const projectPhase = data?.projectPhase || 'N/A';

  const handleExport = () => {
    const doc = new jsPDF();

    doc.text('WES3 Budget Estimate', 10, 10);
    doc.text(`Site Type: ${siteType}`, 10, 20);
    doc.text(`Site Size: ${siteSize} sq. ft`, 10, 30);
    doc.text(`Project Phase: ${projectPhase}`, 10, 40);

    doc.save('WES3-Budget-Estimate.pdf');
  };

  return (
    <button onClick={handleExport}>
      Download PDF
    </button>
  );
}

export default PDFExporter;
