# Hero Animation Documentation

## Overview
Replaced the video in the hero section with a custom full-screen animation showcasing AI-powered interview preparation, coding, and tech elements.

## Animation Features

### 1. **Animated Background Grid**
- Moving grid pattern that creates depth
- Subtle purple tint matching the brand colors
- Continuous 20s animation loop

### 2. **Floating Code Snippets**
- 6 code snippets floating at different positions
- Includes common interview patterns:
  - `function binarySearch()`
  - `class TreeNode {`
  - `const merge = (arr) =>`
  - `if (left < right) {`
  - `return dp[n][m];`
  - `while (queue.length)`
- Each snippet has unique float animation with delays

### 3. **Central AI Brain Visualization**
- Pulsing core with multiple layers
- Computer/monitor icon in the center
- 4 orbiting nodes representing AI processing
- Represents the AI-powered interview coaching

### 4. **AI Elements**
- Floating badges with AI features:
  - "AI Feedback"
  - "Smart Analysis"
  - "Real-time Tips"
  - "Pattern Recognition"
- Fade and slide animations

### 5. **Binary Rain Effect**
- Matrix-style falling binary digits (0s and 1s)
- 15 columns of falling numbers
- Creates a tech/coding atmosphere

### 6. **Success Checkmarks**
- 3 bouncing checkmarks with green accent color
- Represents successful interview preparation
- Positioned strategically across the canvas

### 7. **Coding Icon**
- Rotating code brackets icon in top-right
- Slow 8s rotation
- Reinforces the coding theme

## Technical Implementation

### Animations Used:
- `float` - Smooth up/down movement with slight rotation
- `orbit` - Circular orbit around central point
- `fadeSlide` - Opacity and horizontal movement
- `fall` - Vertical falling effect
- `gridMove` - Background grid translation
- `bounce` - Vertical bounce with scale
- `spin` - Continuous rotation

### Performance:
- Client-side rendered with `"use client"`
- Mounted state prevents hydration issues
- CSS animations for smooth 60fps performance
- Backdrop blur effects for depth

### Responsive:
- Adapts to container size
- Maintains aspect ratio
- Works on all screen sizes

## Color Scheme
- Primary: `#9B6FFF` (purple)
- Accent: `#FF9FD5` (pink)
- Green Accent: `#00D469` (success)
- Uses theme colors from globals.css

## Why This Animation?
- Represents AI-powered interview preparation
- Shows coding/technical focus
- Demonstrates real-time feedback concept
- Creates engaging, modern feel
- Aligns with InterviewPro brand
