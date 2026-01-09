# SpendingTrackerWebApp - Project Setup & Development Guide

## Project Overview
Progressive Web App (PWA) for spending tracking with React frontend and Express.js backend. Installable on iPhone home screen via Safari with offline support.

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js
- **Build Tool**: Vite
- **Database**: localStorage/IndexedDB (client-side)
- **PWA Features**: Service Worker, manifest.json, responsive design

## Setup Checklist

- [ ] Verify .github/copilot-instructions.md exists
- [ ] Scaffold React + Express PWA project structure
- [ ] Configure PWA essentials (manifest, service worker, icons)
- [ ] Install dependencies and verify builds
- [ ] Create VS Code tasks for dev/build
- [ ] Launch project and test in browser
- [ ] Verify PWA installation on iPhone Safari

## Key Directories
- `client/` - React frontend (Vite)
- `server/` - Express.js backend
- `client/public/` - Static assets and PWA icons

## Development Commands
- `npm run dev` - Start both server and client dev servers
- `npm run build` - Build client for production
- `npm run preview` - Preview production build

## PWA Features
- Service worker for offline support
- Web app manifest for home screen installation
- Responsive design for all screen sizes
- Installable on iPhone home screen from Safari

## Testing on iPhone
1. Build: `npm run build`
2. Access from iPhone Safari: `http://<your-computer-ip>:3000`
3. Use Safari menu → "Add to Home Screen" to install
