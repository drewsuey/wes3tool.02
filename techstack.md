# WES3 Budget Tool Technical Stack

## Core Framework
- React 18.2.0
- Vite 6.0.11 (Build tool)
- Node.js 18.x

## Frontend Architecture
- Component-based structure
- Custom hooks for form handling
- CSS modules for styling
- Animation system

## State Management
- React Context API for global state
- localStorage for form persistence
- Custom validation hooks
- Form state management

## Styling System
- Modern CSS features
- CSS variables for theming
- Glass morphism effects
- Responsive design
- Animation system with keyframes
- Backdrop filters

## Animations
- Fade-in/Fade-up effects
- Staggered animations
- Transform transitions
- Reduced motion support
- Hardware-accelerated animations

## Form Management
- Multi-step form process
- Real-time validation
- Cross-field validation
- Form state persistence
- Error handling

## Data Visualization
- Chart.js integration
- Doughnut charts
- Custom color schemes
- Responsive charts
- Print-friendly rendering

## PDF Generation
- jsPDF for document creation
- jspdf-autotable for tables
- Custom PDFExporter class
- Branded templates
- Multi-page support

## Development Tools
- ESLint for code quality
- Prettier for formatting
- Chrome DevTools
- VSCode as IDE

## File Structure
```
src/
├── components/     # Reusable components
│   ├── Chart.jsx
│   ├── FormStep.jsx
│   ├── PDFExporter.jsx
│   ├── ProgressBar.jsx
│   └── Validation.jsx
├── pages/         # Page components
│   ├── Home.jsx
│   └── BudgetTool.jsx
├── utils/         # Utility functions
│   ├── calculations.js
│   └── validationrules.js
├── hooks/         # Custom hooks
│   └── useFormValidation.js
├── styles/        # Global styles
│   ├── main.css
│   └── Home.css
├── data/          # Static data
│   └── coverageLevels.js
└── assets/        # Static assets
    └── react.svg
```

## Key Dependencies
```json
{
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-router-dom": "latest",
    "chart.js": "latest",
    "react-chartjs-2": "latest",
    "jspdf": "latest",
    "jspdf-autotable": "latest"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "latest",
    "vite": "6.0.11",
    "eslint": "latest"
  }
}
```

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Environment
- Node.js 18.x or higher
- npm 9.x or higher
- VSCode with extensions
- Git for version control

## Build Process
1. Development
   ```bash
   npm run dev
   ```
   - Hot module replacement
   - Source maps
   - Development server

2. Production
   ```bash
   npm run build
   ```
   - Asset optimization
   - Code splitting
   - Minification

## Performance Optimizations
- CSS containment
- Hardware acceleration
- Efficient animations
- Lazy loading
- Code splitting
- Asset optimization

## Security Measures
- Input validation
- Data sanitization
- Safe PDF generation
- Environment variables
- Content security

This document reflects the current technical implementation of the WES3 Budget Tool, focusing on the core technologies and practices used in the project.
