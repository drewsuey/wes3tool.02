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
      this.doc.save('WES3-Budget-Estimate.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF');
    }
  }

  addHeader() {
    const title = 'WES3 Fire Safety System Budget Estimate';
    const date = new Date().toLocaleDateString();
    
    // Add logo if available
    // this.doc.addImage('logo.png', 'PNG', this.margin, this.currentY, 40, 20);
    
    this.doc.setFontSize(20);
    this.doc.text(title, this.pageWidth / 2, this.currentY + 10, { align: 'center' });
    
    this.doc.setFontSize(10);
    this.doc.text(`Generated: ${date}`, this.pageWidth - this.margin, this.currentY + 10, { align: 'right' });
    
    this.currentY += 30;
  }

  addCustomerInfo() {
    this.doc.setFontSize(14);
    this.doc.text('Customer Information', this.margin, this.currentY);
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
      styles: { fontSize: 10 }
    });

    this.currentY = this.doc.lastAutoTable.finalY + 10;
  }

  addSiteSpecs() {
    this.doc.setFontSize(14);
    this.doc.text('Site Specifications', this.margin, this.currentY);
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
      styles: { fontSize: 10 }
    });

    this.currentY = this.doc.lastAutoTable.finalY + 10;
  }

  addDeviceTable() {
    this.doc.setFontSize(14);
    this.doc.text('Required Devices', this.margin, this.currentY);
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
      theme: 'striped',
      margin: { left: this.margin },
      styles: { fontSize: 10 }
    });

    this.currentY = this.doc.lastAutoTable.finalY + 10;
  }

  addCoverageDetails() {
    this.doc.setFontSize(14);
    this.doc.text('Coverage Details', this.margin, this.currentY);
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
      styles: { fontSize: 10 }
    });

    this.currentY = this.doc.lastAutoTable.finalY + 10;
  }

  async addDeviceChart() {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;

    // Create chart
    new Chart(canvas.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Smoke Detectors', 'Heat Detectors', 'Call Points', 'Interface Units'],
        datasets: [{
          data: [
            this.data.deviceCounts.smoke,
            this.data.deviceCounts.heat,
            this.data.deviceCounts.callPoints,
            this.data.deviceCounts.interfaceUnits
          ],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0'
          ]
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Device Distribution'
          }
        }
      }
    });

    // Convert chart to image
    const chartImage = canvas.toDataURL('image/png');
    
    // Add chart to PDF
    if (this.currentY + 150 > this.pageHeight) {
      this.doc.addPage();
      this.currentY = this.margin;
    }

    this.doc.addImage(chartImage, 'PNG', this.margin, this.currentY, 170, 120);
    this.currentY += 130;
  }

  addTermsAndConditions() {
    if (this.currentY + 100 > this.pageHeight) {
      this.doc.addPage();
      this.currentY = this.margin;
    }

    this.doc.setFontSize(12);
    this.doc.text('Terms and Conditions', this.margin, this.currentY);
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
  }

  addFooter() {
    const pageCount = this.doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      this.doc.setPage(i);
      this.doc.setFontSize(8);
      this.doc.text(
        `Page ${i} of ${pageCount}`,
        this.pageWidth / 2,
        this.pageHeight - 10,
        { align: 'center' }
      );
    }
  }
}

export default PDFExporter;
