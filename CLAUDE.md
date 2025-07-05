# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML/CSS/JavaScript landing page for "ゆかスキンクリニック" (Yuka Skin Clinic), specifically promoting DENSITY treatment - a Korean high-frequency radio wave therapy for skin tightening and anti-aging.

## Development Commands

- `python3 -m http.server 8000` - Start local development server
- `npx serve .` - Alternative local server
- Open `http://localhost:8000` in browser to view site

## Architecture

### Tech Stack
- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with responsive design
- **No Dependencies**: Vanilla JavaScript with modern browser APIs

### Project Structure
- `index.html` - Main single-page application with all sections
- `style.css` - Complete responsive CSS styling
- `script.js` - Interactive functionality and animations
- `src/assets/` - Images and static assets for clinic and treatment visuals

### Features
- **Responsive Design**: Mobile-first approach with breakpoints
- **Interactive Elements**: Hamburger menu, FAQ accordion, image slider
- **Smooth Scrolling**: Section navigation with offset for fixed header
- **Accessibility**: Keyboard navigation, focus states, semantic HTML

### Content Structure
The single-page app includes these sections in order:
1. Header with clinic logo and CTA button
2. Hero section introducing DENSITY treatment
3. Problem identification (patient concerns)
4. DENSITY explanation with mechanism diagrams
5. HIFU vs DENSITY comparison
6. Treatment process flow
7. FAQ section with collapsible items
8. Doctor introduction
9. Contact/access information and booking CTAs

### Key Features
- Smooth scrolling navigation between sections
- Collapsible FAQ with useState management
- Responsive design with mobile-first approach
- Japanese language content focused on beauty/medical terminology
- Heavy use of medical/treatment imagery and diagrams