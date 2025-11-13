# Zenda Clone - Next.js Project

A modern, responsive school payment platform clone built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern UI with custom design system
- 📱 Fully responsive design
- ⚡ Built with Next.js 15 and React 19
- 🎭 Smooth animations with Framer Motion
- 🎠 Interactive carousels with Embla Carousel
- 💅 Styled with Tailwind CSS v4
- 🔤 TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd zenda-clone
```

2. Install dependencies (already done):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
zenda-clone/
├── app/
│   ├── layout.tsx          # Root layout with error reporting
│   ├── page.tsx            # Home page with all sections
│   └── globals.css         # Global styles and theme
├── components/
│   ├── sections/           # Page sections
│   │   ├── navigation.tsx
│   │   ├── hero.tsx
│   │   ├── features.tsx
│   │   ├── rewards.tsx
│   │   ├── schools.tsx
│   │   ├── marketplace.tsx
│   │   ├── how-it-works.tsx
│   │   ├── statistics.tsx
│   │   ├── testimonials.tsx
│   │   ├── final-cta.tsx
│   │   ├── download-cta.tsx
│   │   └── footer.tsx
│   ├── ui/                 # Reusable UI components
│   │   └── button.tsx
│   └── ErrorReporter.tsx   # Error tracking component
├── hooks/
│   └── use-mobile.tsx      # Mobile detection hook
└── visual-edits/
    └── VisualEditsMessenger.tsx

```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations
- **Embla Carousel** - Carousels
- **Lucide React** - Icons

## Design System

The project uses a custom design system with:
- Custom color palette (primary: #9B6FFF, accent: #FF9FD5)
- Inter font family
- Responsive typography scale
- Custom border radius values
- Smooth animations and transitions

## License

This is a clone project for educational purposes.
