# WES3 Budget Tool - Project Requirements Document

## App Overview
The WES3 Budget Tool is a web-based application designed to help construction and facility managers estimate their fire safety system requirements. The tool provides automated calculations for fire detection device quantities based on site specifications and generates detailed budget estimates with professional PDF exports.

## User Flow

1. Landing Page
   - Modern, dark-themed hero section
   - Floating badge with "Fire Safety Planning Made Simple"
   - Animated content sections with fade effects
   - Primary CTA: "Get Started"
   - Secondary CTA: Link to WES-NA product page
   - Responsive design with mobile optimization

2. Multi-step Form Process
   - Step 1: Contact Information
     - Name (required)
     - Company name (required)
     - Email (required, validated)
     - Phone (optional)
   
   - Step 2: Site Information
     - Site size (sq. ft, validated)
     - Number of floors (validated)
     - Number of staircases (validated)
     - Construction type selection
     - Construction phase selection
     - Coverage level selection

   - Step 3: System Requirements
     - Interface device integration options
     - REACT digital app integration
     - Additional requirements specification

   - Step 4: Review & Submit
     - Summary of all inputs
     - Final validation
     - Submit for calculation

3. Results & Export
   - Device Quantities
     - Smoke detectors
     - Heat detectors
     - Call points
     - Interface units
   - Cost Breakdown
     - Hardware costs
     - Installation estimates
     - Annual maintenance
     - REACT subscription (if selected)
   - Visual Charts
     - Device distribution
     - Cost breakdown
   - Export Options
     - Professional PDF export
     - Print functionality
     - Email distribution

## Core Features

1. Dynamic Device Calculation
   - Construction-specific calculations
   - Coverage level adjustments
   - Minimum device requirements
   - Cross-validation rules

2. Form Validation & State
   - Real-time field validation
   - Cross-field validation
   - Form state persistence
   - Error recovery
   - Auto-save functionality

3. Professional PDF Generation
   - Branded layout
   - Multi-page organization
   - Data visualization
   - Cost breakdowns
   - Terms and conditions

4. Enhanced User Experience
   - Animated transitions
   - Loading states
   - Error handling
   - Success feedback
   - Responsive design

## Technical Implementation

1. Frontend Framework
   - React 18.2.0
   - Modern CSS features
   - Animation system
   - Glass morphism effects

2. Form Management
   - Custom validation hooks
   - State persistence
   - Error handling
   - Auto-save system

3. Data Visualization
   - Chart.js integration
   - Custom color schemes
   - Responsive charts
   - Print optimization

4. Document Generation
   - jsPDF integration
   - Custom templates
   - Chart rendering
   - Multi-page support

## Non-functional Requirements

1. Performance
   - Page load < 2 seconds
   - Form response < 500ms
   - PDF generation < 3 seconds
   - Smooth animations

2. Accessibility
   - WCAG 2.1 compliance
   - Keyboard navigation
   - Screen reader support
   - Reduced motion support

3. Reliability
   - Form data persistence
   - Error recovery
   - Offline support
   - Browser compatibility

4. Security
   - Input validation
   - Data sanitization
   - Safe PDF generation
   - Environment protection

## Design Requirements

1. Brand Identity
   - Ramtech orange: #FF5722
   - Dark theme
   - Professional typography
   - Consistent spacing

2. Responsive Design
   - Mobile-first approach
   - Breakpoint handling
   - Touch optimization
   - Print styling

3. Animation System
   - Fade effects
   - Smooth transitions
   - Loading states
   - Reduced motion

## Known Limitations

1. Technical Constraints
   - Browser storage limits
   - PDF size restrictions
   - Chart rendering performance
   - Mobile memory usage

2. Functional Boundaries
   - No user accounts
   - No payment processing
   - No external integrations
   - No historical data

3. Design Considerations
   - Print layout limitations
   - Mobile chart constraints
   - PDF image quality
   - Font availability

This document outlines the current implementation and requirements of the WES3 Budget Tool, serving as a reference for maintaining and extending the application's features.
