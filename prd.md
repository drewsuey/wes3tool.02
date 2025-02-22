# WES3 Budget Tool - Project Requirements Document

## App Overview
The WES3 Budget Tool is a web-based application designed to help construction and facility managers estimate their fire safety system requirements. The tool provides automated calculations for fire detection device quantities based on site specifications and generates professionally branded PDF documents.

## User Flow
1. Landing Page
   - Users arrive at a welcome page with an introduction to the tool
   - "Get Started" button leads to the budget calculator

2. Multi-step Form Process
   - Part 1: Customer Information
     - Name
     - Company name
     - Email address
     - Phone number (optional)
   
   - Part 2: Site Information
     - Site size (sq. ft)
     - Number of floors
     - Number of staircases
     - Construction type
     - Construction phase
     - Coverage level selection

3. Results & Export
   - Part 3: Required Devices
     - Smoke detectors
     - Heat detectors
     - Call points
     - Interface units
   
   - Part 4: Coverage Details
     - Coverage level
     - Construction type
     - Device spacing
     - Coverage multiplier

   - Device Distribution Chart
     - Visual representation of device quantities
     - Color-coded by device type
     - Interactive legend

   - Export Options
     - PDF generation with branding
     - Print functionality
     - Email distribution

## Tech Stack
Frontend:
- React 18.2.0
- Vite 6.0.11
- Chart.js with react-chartjs-2
- Custom form validation
- PDF generation with jsPDF

Document Generation:
- jsPDF for document creation
- jspdf-autotable for tables
- html2canvas for charts
- Custom PDFExporter class

## Core Features

1. Form Management
   - Multi-part organization
   - Real-time validation
   - Cross-field validation
   - Form state persistence

2. Device Calculations
   - Automated quantity calculations
   - Coverage level adjustments
   - Building type considerations
   - Minimum device requirements

3. PDF Generation
   - Branded document layout
   - Professional formatting
   - Multi-page organization
   - Consistent styling

4. Data Visualization
   - Interactive doughnut chart
   - Brand-consistent colors
   - Responsive sizing
   - Clear legends

## Document Structure

### PDF Layout
1. Page 1
   - Header with logo and website
   - Part 1: Customer Information
   - Part 2: Site Specifications

2. Page 2
   - Part 3: Required Devices
   - Part 4: Coverage Details
   - Device Distribution Chart
   - Terms and Conditions

3. Footer Elements
   - Page numbers
   - Brand logos
   - Contact information

## In-scope Features
- User input validation
- Device quantity calculations
- Coverage level recommendations
- Branded PDF generation
- Form state persistence
- Data visualization
- Print functionality
- Responsive design
- Cross-browser support

## Out-of-scope
- User accounts/authentication
- Payment processing
- Mobile app versions
- External API integrations
- Historical data tracking
- Custom device specifications

## Non-functional Requirements

1. Performance
   - Form response < 1 second
   - PDF generation < 3 seconds
   - Chart rendering < 1 second

2. Usability
   - Clear form progression
   - Intuitive navigation
   - Professional document output
   - Mobile responsiveness

3. Reliability
   - Form data persistence
   - Error handling
   - Fallback options
   - Browser compatibility

4. Security
   - Input validation
   - Safe PDF generation
   - Data sanitization
   - Environment variable protection

## Design Requirements

1. Branding
   - Ramtech logo placement
   - Brand color usage
   - Consistent typography
   - Professional layout

2. Document Format
   - Clear section organization
   - Proper spacing
   - Table formatting
   - Chart placement

3. Responsive Design
   - Form adaptation
   - Chart scaling
   - Table responsiveness
   - Print optimization

## Known Limitations
1. PDF Generation
   - Chart rendering dependencies
   - Browser compatibility
   - Memory usage
   - File size limits

2. Form Handling
   - Browser storage limits
   - Validation complexity
   - Cross-field dependencies
   - State management

3. Data Visualization
   - Chart rendering performance
   - Mobile display constraints
   - Print quality
   - Browser support

This document outlines the current implementation and requirements of the WES3 Budget Tool, focusing on its core functionality and user experience. It serves as a reference for maintaining and extending the application's features.
