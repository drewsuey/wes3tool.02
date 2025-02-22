# WES3 Budget Tool - UI/Design Documentation

## Design System

### Color Palette

#### Primary Colors
- Brand Orange: `#F15A22` (Primary CTA, highlights, accents)
- Dark Orange: `#D3471C` (Hover states, secondary actions)
- White: `#FFFFFF` (Background, text on dark surfaces)
- Dark Gray: `#333333` (Primary text)

#### Secondary Colors
- Light Gray: `#F4F4F4` (Page background)
- Medium Gray: `#888888` (Placeholder text)
- Blue: `#2196F3` (Progress indicators, links)
- Error Red: `#FF0000` (Error states, validation)

#### Chart Colors
- Smoke Detector: `#FF0000` (Red)
- Heat Detector: `#9B59B6` (Purple)
- Call Points: `#00B050` (Green)
- Interface: `#000000` (Black)

### Typography

#### Font Family
Primary Font: 'Poppins', sans-serif

#### Font Sizes
- Hero Title: `3.5rem`
- Page Title: `2.2rem`
- Section Headers: `1.2rem`
- Body Text: `1rem`
- Small Text: `0.9rem`
- Micro Text: `0.8rem`

#### Font Weights
- Bold: 700 (Headers)
- Semi-bold: 600 (Labels, important text)
- Regular: 400 (Body text)

### Icons & Visual Elements

#### Progress Indicators
- Circular step indicators: 28px diameter
- Progress bar height: 4px
- Active state: Filled blue circle
- Completed state: Checkmark icon
- Inactive state: Gray outline

#### Form Elements
- Input fields: 350px max-width
- Border radius: 5px (inputs, buttons)
- Focus state: 3px orange outline
- Error state: Red border
- Success state: Green border

#### Buttons & CTAs
- Primary button padding: `0.85rem 1.75rem`
- Secondary button padding: `0.8rem 1.5rem`
- Button font size: `1.25rem`
- Hover effect: 3px upward translation

### Layout & Spacing

#### Container Sizes
- Main content max-width: 600px
- Form max-width: 450px
- Full-width form max-width: 1200px
- Card width: 90% of container

#### Spacing System
- Extra Large: 2.5rem (40px)
- Large: 1.75rem (28px)
- Medium: 1.25rem (20px)
- Small: 0.75rem (12px)
- Extra Small: 0.5rem (8px)

#### Grid & Alignment
- Flex-based layout system
- Center-aligned content
- Responsive breakpoint: 768px
- Gap between elements: 1rem (16px)

### Components

#### Cards
- Background: White
- Border radius: 10px
- Box shadow: `0 4px 12px rgba(0, 0, 0, 0.15)`
- Left border accent: 5px solid orange

#### Form Elements
1. Input Fields
   - Full width with max-width
   - Light gray placeholder text
   - Animated focus states
   - Clear error indicators

2. Select Dropdowns
   - Custom styled arrows
   - Matching focus states
   - Full width alignment

3. Checkboxes
   - Custom styled boxes
   - Accessible focus states
   - Clear active states

#### Progress Bar
- Track height: 4px
- Animated progress
- Step indicators
- Clear active/completed states

### Animations & Transitions

#### Timing
- Button hover: 0.3s
- Form transitions: 0.3s
- Progress bar: 0.3s
- Page transitions: 0.4s

#### Effects
- Slide-in animation for forms
- Fade effects for tooltips
- Scale effect for buttons
- Progress bar fill animation

### Accessibility Features

#### Color Contrast
- All text meets WCAG 2.1 AA standards
- High contrast mode support
- Clear focus indicators
- Error state visibility

#### Screen Readers
- ARIA labels
- Role attributes
- Skip navigation
- Form field descriptions

#### Keyboard Navigation
- Logical tab order
- Visible focus states
- Skip links
- Keyboard shortcuts

### Responsive Design

#### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

#### Mobile Adaptations
- Single column layouts
- Stacked form elements
- Adjusted font sizes
- Touch-friendly targets

### Design Principles

#### Visual Hierarchy
1. Clear progression through forms
2. Prominent CTAs
3. Grouped related information
4. Visual feedback for actions

#### Consistency
1. Uniform spacing system
2. Consistent color usage
3. Matching component styles
4. Predictable interactions

#### Feedback & States
1. Hover states
2. Active states
3. Focus states
4. Loading states
5. Error states
6. Success states

### Best Practices

#### Forms
1. Clear labels
2. Visible validation
3. Helpful error messages
4. Progress indication
5. Grouped fields
6. Optional field marking

#### Navigation
1. Clear step indication
2. Back/forward navigation
3. Skip links
4. Breadcrumb trails

#### Performance
1. Optimized images
2. Minimal animations
3. Reduced motion support
4. Progressive enhancement

This documentation provides a comprehensive guide for maintaining consistent design and user experience across the WES3 Budget Tool. It should be used as a reference for any future development or design updates to ensure consistency and accessibility standards are maintained.
