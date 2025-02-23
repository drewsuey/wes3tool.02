# WES3 Budget Tool Memory Bank

## Product Context
- **Purpose**: Web-based application for construction and facility managers to estimate fire safety system requirements
- **Problems Solved**: 
  - Automates fire detection device quantity calculations
  - Generates detailed budget estimates
  - Provides professional PDF exports
  - Simplifies fire safety planning process

## System Patterns
- **Architecture**:
  - React 18.2.0 with Vite 6.0.11
  - Component-based structure
  - Custom hooks for form handling
  - React Context API for state management
  - localStorage for form persistence

- **Key Technical Decisions**:
  - Multi-step form process
  - Real-time validation
  - Chart.js for data visualization
  - jsPDF for document generation
  - Modern CSS with glass morphism effects

## Tech Context
- **Core Technologies**:
  - React 18.2.0
  - Node.js 18.x
  - Chart.js
  - jsPDF
  - CSS Modules

- **Development Setup**:
  - Vite development server
  - ESLint for code quality
  - Prettier for formatting
  - Chrome DevTools
  - VSCode as IDE

- **Technical Constraints**:
  - Browser storage limits
  - PDF size restrictions
  - Chart rendering performance
  - Mobile memory usage
  - No user accounts or payment processing

## Progress Status
- **Implemented Features**:
  - Project structure and core dependencies
  - Basic routing setup
  - Form validation hooks
  - PDF export functionality
  - Chart components
  - Styling system

- **To Be Implemented**:
  - Unit tests for components
  - Form state persistence
  - Complete PDF templates
  - Animation system
  - Error recovery system
  - Offline support

## Active Context
- **Current Focus**: Initial setup and documentation
- **Recent Changes**: Memory Bank system initialization
- **Next Steps**:
  1. Implement unit tests
  2. Complete form state persistence
  3. Finalize PDF templates
  4. Add animation system
  5. Implement error recovery
  6. Add offline support

## System Architecture
```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── utils/         # Utility functions
├── hooks/         # Custom hooks
├── styles/        # Global styles
├── data/          # Static data
└── assets/        # Static assets
```

## Brand Guidelines
- **Colors**:
  - Brand Orange: #FF5722
  - Brand Dark: #CC4419
  - Brand Light: #FFE0D4
  - Black: #000000

- **Typography**:
  - Hero Title: 3.75rem
  - Section Title: 2.25rem
  - Subtitle: 1.5rem
  - Body Text: 1rem
  - Small Text: 0.875rem

## Application Flow
1. Landing Page
2. Basic Information Form
3. Site Details Form
4. Coverage Selection
5. Additional Features
6. Review & Calculate
7. Final Quote
8. Confirmation Page

## Development Guidelines
- Follow component-based architecture
- Implement real-time validation
- Use CSS modules for styling
- Maintain responsive design
- Follow accessibility guidelines
- Optimize for performance
- Document code changes
- Write unit tests for new features
