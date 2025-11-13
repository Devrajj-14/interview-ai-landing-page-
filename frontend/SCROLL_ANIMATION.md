# Scroll Animation Feature

## Overview
Added scroll-based animations to the Features section where feature pills (Activities, Trips & Tours, Clothes, etc.) move closer to the phone mockup when scrolling down and move away when scrolling up.

## Implementation Details

### How It Works
1. **Scroll Progress Tracking**: Uses `useEffect` and scroll event listener to track the section's position in the viewport
2. **Dynamic Transform**: Each feature pill has a transform applied based on scroll progress
3. **Smooth Transitions**: CSS transitions provide smooth movement between states

### Key Features
- Pills move horizontally toward the center (phone) as you scroll down
- Pills scale down slightly (0.7x) as they approach the center
- Smooth 0.1s ease-out transitions for fluid motion
- Different distances for each pill based on their position:
  - Row 1: ±200px
  - Row 2: ±150px to ±250px
  - Row 3: ±120px to ±280px
  - Row 4: -300px
  - Row 5: +220px to +320px

### Code Changes
- Made Features component a client component with `"use client"`
- Added `useRef` and `useState` for scroll tracking
- Created `getTransform()` function to calculate position and scale
- Wrapped each FeaturePill in a div with dynamic inline styles

### Visual Effect
- **Scroll Down**: Pills converge toward the phone mockup in the center
- **Scroll Up**: Pills diverge away from the phone mockup
- Creates a dynamic, engaging parallax-like effect

## Browser Compatibility
Works in all modern browsers that support:
- CSS transforms
- CSS transitions
- JavaScript scroll events

## Performance
- Optimized with `useEffect` cleanup
- Smooth 60fps animations
- Minimal re-renders with state management
