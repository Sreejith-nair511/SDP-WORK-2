# Design Patterns Explorer

A comprehensive, interactive web application for learning and exploring the 23 Gang of Four (GoF) design patterns with code examples, visualizations, and practical use cases.

## Overview

Design Patterns Explorer is a modern educational platform built to demystify software design patterns through interactive demonstrations, detailed explanations, and real-world code examples. Whether you're a student learning software architecture or an experienced developer looking to refine your pattern knowledge, this application provides structured guidance across all three pattern categories: Creational, Structural, and Behavioral.

## Features

- **23 Design Patterns**: Complete coverage of all Gang of Four design patterns
- **Interactive Visualizations**: Live demonstrations showing how patterns work in practice
- **Code Examples**: Real-world code implementations with copy-to-clipboard functionality
- **Pattern Categories**: Organized by Creational, Structural, and Behavioral patterns
- **Decision Helper**: Guidance on selecting the right pattern for specific problems
- **Pattern Comparison**: Compare patterns side-by-side to understand differences
- **Dark Mode Support**: Professional theme toggle for comfortable viewing
- **Mobile Optimized**: Fully responsive design for desktop, tablet, and mobile devices
- **Smooth Animations**: Entrance animations and transitions for enhanced user experience

## Tech Stack

- **Framework**: Next.js 16.2.4 with React 19
- **Styling**: Tailwind CSS with PostCSS
- **Animations**: Framer Motion
- **UI Components**: Radix UI with custom shadcn/ui components
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Language**: TypeScript
- **Package Manager**: pnpm

## Installation

### Prerequisites

- Node.js 18.x or higher
- pnpm 10.x or higher

### Setup Steps

1. Clone the repository:
```bash
git clone https://github.com/Sreejith-nair511/SDP-WORK-2.git
cd SDP-WORK-2
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

### Browsing Patterns

1. Start by visiting the Home page for an overview
2. Click on "Explore All Patterns" to view all 23 patterns
3. Select a pattern to view detailed information including:
   - Pattern description and intent
   - When to use the pattern
   - Code examples
   - Pros and cons
   - Real-world use cases

### Using Decision Helper

The Decision Helper guides you in selecting appropriate patterns based on your specific requirements:
- Answer targeted questions about your problem
- Receive pattern recommendations
- View comparison with similar patterns

### Pattern Comparison

Compare two or more patterns side-by-side to understand:
- Key differences in approach
- When to choose one over another
- Complexity and implementation overhead

## Project Structure

```
SDP-WORK-2/
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Home page with animations
│   ├── layout.tsx                # Root layout with metadata
│   ├── globals.css               # Global styles
│   ├── patterns/
│   │   ├── page.tsx              # Patterns listing page
│   │   └── [id]/
│   │       └── page.tsx          # Individual pattern detail page
│   ├── compare/
│   │   └── page.tsx              # Pattern comparison page
│   └── help/
│       └── page.tsx              # Decision helper page
├── components/
│   ├── ui/                       # Reusable UI components (50+ components)
│   ├── pattern-*.tsx             # Pattern-specific components
│   ├── pattern-visualizations/   # Interactive pattern demos
│   ├── theme-provider.tsx        # Theme context provider
│   └── theme-toggle.tsx          # Dark mode toggle
├── lib/
│   ├── patterns-data.ts          # Pattern definitions and data
│   └── utils.ts                  # Utility functions
├── hooks/
│   ├── use-mobile.ts             # Mobile detection hook
│   └── use-toast.ts              # Toast notification hook
├── public/                        # Static assets and favicons
├── styles/                        # Additional stylesheets
├── package.json                   # Dependencies
├── next.config.mjs               # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── tailwind.config.js            # Tailwind CSS configuration
```

## Pattern Categories

### Creational Patterns (5)
Patterns that deal with object creation mechanisms:
- Singleton
- Factory Method
- Abstract Factory
- Builder
- Prototype

### Structural Patterns (8)
Patterns for composing classes and objects:
- Adapter
- Bridge
- Composite
- Decorator
- Facade
- Flyweight
- Proxy
- Template Method

### Behavioral Patterns (10)
Patterns for object collaboration and responsibility:
- Chain of Responsibility
- Command
- Interpreter
- Iterator
- Mediator
- Memento
- Observer
- State
- Strategy
- Visitor

## Build and Deployment

### Build for Production

```bash
pnpm build
```

### Start Production Server

```bash
pnpm start
```

### Run Linter

```bash
pnpm lint
```

## Performance Optimizations

- Image optimization with Next.js
- Code splitting and lazy loading
- Entrance animations using Framer Motion with viewport triggers
- Mobile-first responsive design
- Optimized CSS with Tailwind CSS purging
- TypeScript for type safety

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Theme contrast compliance
- Mobile-friendly touch targets

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/enhancement`)
3. Commit your changes (`git commit -m 'Add enhancement'`)
4. Push to the branch (`git push origin feature/enhancement`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Credits

Made by Sreejith and Tejaswini

Design Patterns Explorer provides an interactive learning platform for understanding Gang of Four design patterns, built with modern web technologies for an optimal learning experience.

## Support

For issues, suggestions, or questions:
- Open an issue on GitHub
- Contact the development team

---

Built with Next.js, React, and Tailwind CSS. Powered by Framer Motion for smooth animations and Radix UI for accessible components.
