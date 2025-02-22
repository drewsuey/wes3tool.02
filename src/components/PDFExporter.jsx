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
    this.margin = 30;
    this.contentWidth = this.pageWidth - (2 * this.margin);
    this.currentY = this.margin;
    this.footerHeight = 35;
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

  checkPageBreak(requiredSpace) {
    if (this.currentY + requiredSpace > this.pageHeight - this.footerHeight) {
      this.doc.addPage();
      this.currentY = this.margin;
      return true;
    }
    return false;
  }

  addHeader() {
    // Add Ramtech logo in top left
    const logoWidth = 40;
    const logoHeight = 15;
    this.doc.addImage('ramtech.png', 'PNG', this.margin, this.currentY, logoWidth, logoHeight);
    
    // Add ramtechglobal.com in top right
    this.doc.setFontSize(10);
    this.doc.setTextColor(255, 69, 0); // Ramtech orange
    this.doc.text('RAMTECHGLOBAL.COM', this.pageWidth - this.margin, this.currentY + 5, { align: 'right' });
    
    this.currentY += 25;
    
    // Add title
    const title = 'WES3 Fire Safety System Device Estimate';
    const date = new Date().toLocaleDateString();
    
    this.doc.setFontSize(20);
    this.doc.setTextColor(255, 69, 0); // Ramtech orange
    this.doc.text(title, this.pageWidth / 2, this.currentY, { align: 'center' });
    
    this.doc.setFontSize(10);
    this.doc.setTextColor(0, 0, 0); // Reset to black
    this.doc.text(`Generated: ${date}`, this.pageWidth - this.margin, this.currentY, { align: 'right' });
    
    this.currentY += 35;
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

    this.currentY = this.doc.lastAutoTable.finalY + 20;
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

    this.currentY = this.doc.lastAutoTable.finalY + 20;
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

    this.currentY = this.doc.lastAutoTable.finalY + 20;
  }

  addCoverageDetails() {
    if (this.checkPageBreak(150)) {
      this.currentY += 10;
    }

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

    this.currentY = this.doc.lastAutoTable.finalY + 20;
  }

  async addDeviceChart() {
    try {
      if (this.checkPageBreak(200)) {
        this.currentY += 10;
      }

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
      
      const chartWidth = this.contentWidth * 0.7;
      const chartHeight = chartWidth * 0.7;
      const chartX = this.margin + (this.contentWidth - chartWidth) / 2;
      
      this.doc.addImage(chartImage, 'PNG', chartX, this.currentY, chartWidth, chartHeight);
      this.currentY += chartHeight + 30;

      // Cleanup
      chart.destroy();
    } catch (error) {
      console.error('Error generating chart:', error);
      // Continue with PDF generation even if chart fails
    }
  }

  addTermsAndConditions() {
    if (this.checkPageBreak(120)) {
      this.currentY += 10;
    }

    this.doc.setFontSize(12);
    this.doc.setTextColor(255, 69, 0); // Ramtech orange
    this.doc.text('Terms and Conditions', this.margin, this.currentY);
    this.doc.setTextColor(0, 0, 0); // Reset to black
    this.currentY += 15;

    const terms = [
      '1. This estimate is valid for 30 days from the generation date.',
      '2. Final specifications may vary based on site survey and specific requirements.',
      '3. Device quantities are calculated based on site size and coverage requirements.',
      '4. Additional devices may be required based on site assessment.',
      '5. REACT integration features require an active subscription.'
    ];

    this.doc.setFontSize(8);
    terms.forEach(term => {
      if (this.currentY + 10 > this.pageHeight - this.footerHeight) {
        this.doc.addPage();
        this.currentY = this.margin;
      }
      this.doc.text(term, this.margin, this.currentY);
      this.currentY += 10;
    });

    // Add contact email
    this.currentY += 15;
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
        this.pageHeight - 30,
        { align: 'center' }
      );
      
      // Position Orama logo in bottom right
      const logoWidth = 50;
      const logoHeight = 20;
      this.doc.addImage('orama.png', 'PNG',
        this.pageWidth - this.margin - logoWidth,
        this.pageHeight - 30,
        logoWidth, logoHeight);
    }
  }
}

export default PDFExporter;
