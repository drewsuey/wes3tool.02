# WES3 Budget Tool Technical Stack

## Core Framework
- React 18.2.0
- Vite 6.0.11 (Build tool)
- Node.js 18.x

## State Management
- React Context API for global state
- localStorage for form state persistence
- Custom hooks for form validation

## UI Components
- Custom React components
- Chart.js with react-chartjs-2 for data visualization
- Responsive design with CSS Grid/Flexbox

## PDF Generation & Export
- jsPDF for PDF document creation
- jspdf-autotable for table formatting
- html2canvas for chart rendering
- Custom PDFExporter class for branded exports

## Form Management & Validation
- Custom validation rules
- Real-time field validation
- Cross-field validation support
- Form state persistence

## Data Visualization
- Chart.js for device distribution
- Doughnut charts for quantity visualization
- Custom color schemes for brand consistency

## Styling
- CSS Modules for component styling
- Custom CSS variables for theming
- Responsive design patterns
- Brand-compliant color system

## Development Tools
- ESLint for code quality
- Prettier for code formatting
- Chrome DevTools for debugging
- VSCode as primary IDE

## Build & Deployment
- Vite for development and production builds
- npm for package management
- Environment variable management
- Production optimization

## File Structure
```
src/
├── components/      # Reusable UI components
├── pages/          # Page components
├── utils/          # Utility functions
├── hooks/          # Custom React hooks
├── styles/         # Global styles
├── data/          # Static data
└── assets/        # Images and static assets
```

## Key Dependencies
```json
{
  "dependencies": {
    "chart.js": "latest",
    "jspdf": "latest",
    "jspdf-autotable": "latest",
    "react": "18.2.0",
    "react-chartjs-2": "latest",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "latest",
    "vite": "6.0.11"
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
- VSCode with recommended extensions
- Git for version control

## Build & Deploy Process
1. Development
   - `npm run dev` for local development
   - Hot module replacement enabled
   - Environment variable support

2. Production
   - `npm run build` for production build
   - Asset optimization
   - Code splitting
   - Minification

3. Testing
   - Component testing
   - PDF generation testing
   - Form validation testing
   - Cross-browser testing

## Performance Considerations
- Lazy loading for PDF generation
- Optimized chart rendering
- Efficient form state management
- Responsive image handling

## Security Measures
- Input sanitization
- Form validation
- Safe PDF generation
- Environment variable protection

This document reflects the current technical implementation of the WES3 Budget Tool, focusing on the core technologies and practices used in the project.
