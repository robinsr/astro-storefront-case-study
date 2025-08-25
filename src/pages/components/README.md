# UI Components Test System

This directory contains a comprehensive test system for all UI primitives and components in the project.

## Test Pages

### `/components` - Main Index
- Overview of all component categories
- Navigation to individual test pages
- Quick access to the complete showcase

### `/components/layout` - Layout Components
- **Container**: Different types (primary, secondary, accent, neutral, info, success, warning, danger)
- **Grid**: Responsive grid system
- **ContainerGrid**: Container query-based responsive grid
- **Card**: Card components with various content layouts

### `/components/interactive` - Interactive Components
- **Button**: All variants, sizes, states, shapes, and configurations
- **Checkbox**: Different colors, sizes, and states
- **Modal**: Modal dialogs with different close methods
- **Accordion**: Collapsible content sections
- **Tabs**: Tab navigation (currently static)
- **Carousel**: Horizontal scrolling carousel

### `/components/typography` - Typography System
- **Text**: All text types, sizes, weights, colors, alignments, and transformations
- **PageTitle**: Page title component with slots
- **FormattedDate**: Date formatting component

### `/components/visual` - Visual Elements
- **Divider**: Various divider styles, variants, positions, and spacing
- **Pattern**: Background patterns with different types, sizes, and opacity
- **Rating**: Star and heart rating systems
- **Hero**: Hero carousel component

### `/components/utility` - Utility Components
- **CopyButton**: Copy to clipboard functionality
- **SlotList**: Dynamic list rendering with slots
- **Code**: Structured data display
- **Join**: Element grouping and styling

### `/components/showcase` - Complete Showcase
- Comprehensive demonstration of all components
- Real-world component combinations
- Navigation between all test pages

## Component Categories

### Layout & Structure
- Foundation components for building page layouts
- Responsive grid systems
- Container management

### Typography & Text
- Consistent text styling and hierarchy
- Semantic text types
- Date formatting

### Interactive Elements
- User input components
- Form elements
- Modal dialogs
- Content organization

### Visual Elements
- Dividers and separators
- Background patterns
- Rating systems
- Hero sections

### Utility Components
- Enhanced functionality
- Data display
- Element grouping
- Copy functionality

## Usage

1. Start at `/components` to see the overview
2. Navigate to specific category pages to test individual components
3. Use `/components/showcase` to see all components together
4. Each page demonstrates various configurations and combinations

## Notes

- Some components (like Tabs) are currently static and need JavaScript implementation
- The system uses DaisyUI classes for styling
- All components are built with TypeScript and Astro
- The test system demonstrates both individual components and real-world combinations
