# WES3 Budget Tool - Project Requirements Document

## App Overview
The WES3 Budget Tool is a web-based application designed to help construction and facility managers estimate their fire safety system requirements. The tool provides automated calculations for fire detection device quantities based on site specifications and generates detailed budget estimates that can be exported in various formats.

## User Flow
1. Landing Page
   - Users arrive at a welcome page with an introduction to the tool
   - "Get Started" button leads to the budget calculator

2. Multi-step Form Process
   - Step 1: Contact Information
     - Personal details
     - Company information
     - Contact preferences
   
   - Step 2: Site Information
     - Site size (sq. ft)
     - Number of floors
     - Number of staircases
     - Construction type
     - Construction phase
     - Coverage level selection
   
   - Step 3: System Requirements
     - Interface device integration options
     - REACT digital app integration
     - Additional requirements specification

3. Results & Export
   - Display calculated device quantities
     - Smoke detectors
     - Heat detectors
     - Call points
     - Interface units
   - Visual representation through charts
   - Export options (PDF, Print, Email)

## Tech Stack & APIs
Frontend:
- React 18.3.1
- React Router DOM 7.1.5
- Chart.js with react-chartjs-2
- React-tooltip for enhanced UX
- Vite as build tool

Backend:
- Node.js with Express
- Nodemailer for email functionality
- CORS for cross-origin resource sharing
- Environment configuration with dotenv

Export Services:
- jsPDF for PDF generation
- HTML2Canvas for visual exports

## Core Features
1. Dynamic Device Calculation
   - Automated calculation of required devices based on site specifications
   - Support for different coverage levels (maximum, medium, low)
   - Consideration of building characteristics

2. Interactive Form Interface
   - Multi-step form with progress tracking
   - Real-time validation
   - Responsive design
   - Accessibility compliance

3. Visualization
   - Doughnut chart for device distribution
   - Visual comparison of coverage levels
   - Interactive tooltips

4. Export Capabilities
   - PDF generation
   - Print-friendly formatting
   - Email distribution
   - REACT integration cost calculation

## In-scope
- User input validation and error handling
- Device quantity calculations
- Coverage level recommendations
- PDF report generation
- Email functionality
- Basic authentication
- Responsive design
- Accessibility features
- Data visualization
- Form state management

## Out-of-scope
- User accounts/authentication
- Payment processing
- Real-time collaboration
- Mobile app versions
- Integration with external fire system databases
- Historical data tracking
- Custom device specifications
- 3D visualization

## Non-functional Requirements
1. Performance
   - Page load time < 3 seconds
   - Form submission response < 2 seconds
   - PDF generation < 5 seconds

2. Accessibility
   - WCAG 2.1 AA compliance
   - Screen reader compatibility
   - Keyboard navigation support

3. Security
   - Form data validation
   - Email verification
   - Rate limiting for form submissions
   - Secure PDF generation

4. Usability
   - Intuitive navigation
   - Clear error messages
   - Mobile responsiveness
   - Cross-browser compatibility

## Constraints & Assumptions
Constraints:
- Browser compatibility (modern browsers only)
- Maximum file size for PDF exports
- Email service provider limitations
- API rate limits
- Device calculation accuracy based on standard metrics

Assumptions:
- Users have basic knowledge of construction terms
- Internet connectivity is available
- Modern browser support
- Standard screen resolutions
- English language interface
- Basic device specifications are sufficient

## Known Issues & Potential Pitfalls
1. Technical Challenges
   - PDF generation may fail with large datasets
   - Email delivery reliability
   - Chart rendering performance with large numbers
   - Form state management complexity

2. Business Logic
   - Coverage calculations may need adjustment for special cases
   - Device ratio assumptions may vary by region
   - Construction type classifications may be too broad

3. User Experience
   - Multi-step form completion rate
   - Mobile form usability
   - PDF formatting consistency across devices
   - Chart readability on small screens

4. Integration
   - Email service provider limitations
   - PDF generation library constraints
   - Chart.js version compatibility
   - Backend API scalability

This document serves as a comprehensive guide for the WES3 Budget Tool project, outlining its scope, requirements, and potential challenges. It should be reviewed and updated as the project evolves and new requirements emerge.
