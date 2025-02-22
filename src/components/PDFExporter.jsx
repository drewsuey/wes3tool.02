import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Chart from 'chart.js/auto';

class PDFExporter {
  constructor(data) {
    this.data = data;
    this.doc = new jsPDF();
    this.pageHeight = this.doc.internal.pageSize.height;
    this.pageWidth = this.doc.internal.pageSize.width;
    this.margin = 20;
    this.currentY = this.margin;
  }

  async generatePDF() {
    try {
      // Add header with logo
      this.addHeader();
      
      // Add customer information
      this.addCustomerInfo();
      
      // Add site specifications
      this.addSiteSpecs();
      
      // Add device quantities table
      this.addDeviceTable();
      
      // Add coverage details
      this.addCoverageDetails();
      
      // Add chart visualization
      await this.addDeviceChart();
      
      // Add terms and conditions
      this.addTermsAndConditions();
      
      // Add footer
      this.addFooter();
      
      // Save the PDF
      this.doc.save('Ramtech-WES3-Device-Estimate.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF');
    }
  }

  addHeader() {
    // Add Ramtech logo in top left
    const logoWidth = 40;
    const logoHeight = 15;
    this.doc.addImage('logo.jpg', 'JPEG', this.margin, this.currentY, logoWidth, logoHeight);
    
    // Add ramtechglobal.com in top right
    this.doc.setFontSize(10);
    this.doc.setTextColor(255, 69, 0); // Ramtech orange
    this.doc.text('RAMTECHGLOBAL.COM', this.pageWidth - this.margin, this.currentY + 5, { align: 'right' });
    
    this.currentY += 30;
    
    // Add title
    const title = 'WES3 Fire Safety System Device Estimate';
    const date = new Date().toLocaleDateString();
    
    this.doc.setFontSize(20);
    this.doc.setTextColor(255, 69, 0); // Ramtech orange
    this.doc.text(title, this.pageWidth / 2, this.currentY, { align: 'center' });
    
    this.doc.setFontSize(10);
    this.doc.setTextColor(0, 0, 0); // Reset to black
    this.doc.text(`Generated: ${date}`, this.pageWidth - this.margin, this.currentY, { align: 'right' });
    
    this.currentY += 20;
  }

  addCustomerInfo() {
    this.doc.setFontSize(14);
    this.doc.setTextColor(255, 69, 0); // Ramtech orange
    this.doc.text('Part 1: Customer Information', this.margin, this.currentY);
    this.doc.setTextColor(0, 0, 0); // Reset to black
    this.currentY += 10;

    const customerInfo = [
      ['Name:', this.data.name],
      ['Company:', this.data.companyName],
      ['Email:', this.data.email],
      ['Phone:', this.data.phone || 'Not provided']
    ];

    this.doc.autoTable({
      startY: this.currentY,
      head: [],
      body: customerInfo,
      theme: 'plain',
      margin: { left: this.margin },
      styles: { 
        fontSize: 10,
        cellPadding: 3,
        textColor: [51, 51, 51]
      },
      columnStyles: {
        0: { fontStyle: 'bold', textColor: [80, 80, 80] }
      }
    });

    this.currentY = this.doc.lastAutoTable.finalY + 10;
  }

  addSiteSpecs() {
    this.doc.setFontSize(14);
    this.doc.setTextColor(255, 69, 0); // Ramtech orange
    this.doc.text('Part 2: Site Specifications', this.margin, this.currentY);
    this.doc.setTextColor(0, 0, 0); // Reset to black
    this.currentY += 10;

    const siteSpecs = [
      ['Site Size:', `${this.data.siteSize} sq ft`],
      ['Number of Floors:', this.data.floors],
      ['Number of Staircases:', this.data.stairs],
      ['Construction Type:', this.data.constructionType],
      ['Construction Phase:', this.data.constructionPhase],
      ['Coverage Level:', this.data.coverageDetails.level]
    ];

    this.doc.autoTable({
      startY: this.currentY,
      head: [],
      body: siteSpecs,
      theme: 'plain',
      margin: { left: this.margin },
      styles: { 
        fontSize: 10,
        cellPadding: 3,
        textColor: [51, 51, 51]
      },
      columnStyles: {
        0: { fontStyle: 'bold', textColor: [80, 80, 80] }
      }
    });

    this.currentY = this.doc.lastAutoTable.finalY + 10;
  }

  addDeviceTable() {
    this.doc.setFontSize(14);
    this.doc.setTextColor(255, 69, 0); // Ramtech orange
    this.doc.text('Part 3: Required Devices', this.margin, this.currentY);
    this.doc.setTextColor(0, 0, 0); // Reset to black
    this.currentY += 10;

    const deviceData = [
      ['Device Type', 'Quantity'],
      ['Smoke Detectors', this.data.deviceCounts.smoke],
      ['Heat Detectors', this.data.deviceCounts.heat],
      ['Call Points', this.data.deviceCounts.callPoints],
      ['Interface Units', this.data.deviceCounts.interfaceUnits]
    ];

    this.doc.autoTable({
      startY: this.currentY,
      head: [deviceData[0]],
      body: deviceData.slice(1),
      theme: 'grid',
      margin: { left: this.margin },
      styles: { 
        fontSize: 10,
        cellPadding: 5,
        textColor: [51, 51, 51]
      },
      headStyles: {
        fillColor: [255, 69, 0],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      }
    });

    this.currentY = this.doc.lastAutoTable.finalY + 10;
  }

  addCoverageDetails() {
    this.doc.setFontSize(14);
    this.doc.setTextColor(255, 69, 0); // Ramtech orange
    this.doc.text('Part 4: Coverage Details', this.margin, this.currentY);
    this.doc.setTextColor(0, 0, 0); // Reset to black
    this.currentY += 10;

    const coverageInfo = [
      ['Coverage Level:', this.data.coverageDetails.level],
      ['Construction Type:', this.data.coverageDetails.constructionType],
      ['Device Spacing:', `${this.data.coverageDetails.spacing} ft`],
      ['Coverage Multiplier:', this.data.coverageDetails.multiplier]
    ];

    this.doc.autoTable({
      startY: this.currentY,
      head: [],
      body: coverageInfo,
      theme: 'plain',
      margin: { left: this.margin },
      styles: { 
        fontSize: 10,
        cellPadding: 3,
        textColor: [51, 51, 51]
      },
      columnStyles: {
        0: { fontStyle: 'bold', textColor: [80, 80, 80] }
      }
    });

    this.currentY = this.doc.lastAutoTable.finalY + 10;
  }

  async addDeviceChart() {
    try {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');

      // Create chart
      const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Smoke Detectors', 'Heat Detectors', 'Call Points', 'Interface Units'],
          datasets: [{
            data: [
              this.data.deviceCounts?.smoke || 0,
              this.data.deviceCounts?.heat || 0,
              this.data.deviceCounts?.callPoints || 0,
              this.data.deviceCounts?.interfaceUnits || 0
            ],
            backgroundColor: [
              '#FF0000',
              '#9B59B6',
              '#00B050',
              '#000000'
            ]
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Device Distribution',
              color: '#FF4500', // Ramtech orange
              font: {
                size: 16,
                weight: 'bold'
              }
            },
            legend: {
              display: true,
              position: 'bottom'
            }
          },
          animation: false // Important for PDF generation
        }
      });

      // Wait for chart rendering
      await new Promise(resolve => setTimeout(resolve, 100));

      // Convert chart to image
      const chartImage = canvas.toDataURL('image/png');
      
      // Add chart to PDF
      if (this.currentY + 150 > this.pageHeight) {
        this.doc.addPage();
        this.currentY = this.margin;
      }

      this.doc.addImage(chartImage, 'PNG', this.margin, this.currentY, 170, 120);
      this.currentY += 130;

      // Cleanup
      chart.destroy();
    } catch (error) {
      console.error('Error generating chart:', error);
      // Continue with PDF generation even if chart fails
    }
  }

  addTermsAndConditions() {
    if (this.currentY + 100 > this.pageHeight) {
      this.doc.addPage();
      this.currentY = this.margin;
    }

    this.doc.setFontSize(12);
    this.doc.setTextColor(255, 69, 0); // Ramtech orange
    this.doc.text('Terms and Conditions', this.margin, this.currentY);
    this.doc.setTextColor(0, 0, 0); // Reset to black
    this.currentY += 10;

    const terms = [
      '1. This estimate is valid for 30 days from the generation date.',
      '2. Final specifications may vary based on site survey and specific requirements.',
      '3. Device quantities are calculated based on site size and coverage requirements.',
      '4. Additional devices may be required based on site assessment.',
      '5. REACT integration features require an active subscription.'
    ];

    this.doc.setFontSize(8);
    terms.forEach(term => {
      if (this.currentY + 10 > this.pageHeight) {
        this.doc.addPage();
        this.currentY = this.margin;
      }
    this.doc.text(term, this.margin, this.currentY);
      this.currentY += 10;
    });

    // Add contact email
    this.currentY += 10;
    this.doc.setFontSize(8);
    this.doc.text('If you have any questions about this, please contact react@ramtechglobal.com', this.margin, this.currentY);
  }

  addFooter() {
    const pageCount = this.doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      this.doc.setPage(i);
      
      // Add page numbers in center
      this.doc.setFontSize(8);
      this.doc.text(
        `Page ${i} of ${pageCount}`,
        this.pageWidth / 2,
        this.pageHeight - 20,
        { align: 'center' }
      );
      
      // Add Orama and Halma logos in bottom right
      const oramaWidth = 25;
      const oramaHeight = 10;
      const halmaWidth = 25;
      const halmaHeight = 10;
      const spacing = 5;
      
      // Position logos side by side in bottom right
      // Orama logo (orange wave symbol)
      const oramaLogo = 'data:image/jpeg;base64,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';
      this.doc.addImage(oramaLogo, 'JPEG', 
        this.pageWidth - this.margin - halmaWidth - spacing - oramaWidth,
        this.pageHeight - 25,
        oramaWidth, oramaHeight);
      
      // Halma logo (green circle with text)
      const halmaLogo = 'data:image/jpeg;base64,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';
      this.doc.addImage(halmaLogo, 'JPEG',
        this.pageWidth - this.margin - halmaWidth,
        this.pageHeight - 25,
        halmaWidth, halmaHeight);
    }
  }
}

export default PDFExporter;
