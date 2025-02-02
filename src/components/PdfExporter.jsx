import React from 'react';
import jsPDF from 'jspdf';

function PDFExporter({ data }) {
  const handleExport = () => {
    const doc = new jsPDF();
    doc.text('WES3 Budget Estimate', 10, 10);
    doc.text(`Site Type: ${data.siteType}`, 10, 20);
    doc.text(`Site Size: ${data.siteSize} sq. ft`, 10, 30);
    doc.text(`Project Phase: ${data.projectPhase}`, 10, 40);
    doc.save('WES3-Budget-Estimate.pdf');
  };

  return <button onClick={handleExport}>Download PDF</button>;
}

export default PDFExporter;
