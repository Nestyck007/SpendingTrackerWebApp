# SpendingTrackerWebApp - Progressive Web App

A modern spending tracker PWA that works on iPhone, Android, and web browsers. Install directly on your home screen from Safari.

## Features
- ✅ Add and track spending with categories
- ✅ View statistics with charts (pie and bar charts)
- ✅ Works offline thanks to service worker
- ✅ Installable on iPhone home screen
- ✅ Progressive Web App with responsive design
- ✅ RON (Romanian Leu) currency support
- ✅ Local data storage with no server sync needed

## Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
This starts:
- Frontend dev server at `http://localhost:5173`
- Backend server at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## PWA Installation on iPhone

1. Open Safari on your iPhone
2. Navigate to `http://<your-computer-ip>:3000`
3. Tap the Share button (box with arrow)
4. Scroll down and tap "Add to Home Screen"
5. Name your app and tap "Add"
6. App is now installed on your home screen!

## PWA Features Included
- **Service Worker**: Offline functionality and caching
- **Web App Manifest**: Home screen installation support
- **Responsive Design**: Works on phones, tablets, and desktops
- **Icons**: Custom app icons for home screen

## Project Structure
```
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── utils/        # Utility functions
│   │   ├── App.tsx       # Main app component
│   │   └── index.css     # Global styles
│   ├── public/           # Static assets and PWA files
│   │   ├── manifest.json # PWA manifest
│   │   └── sw.js         # Service worker
│   └── vite.config.ts    # Vite configuration
├── server/               # Express.js backend
│   └── index.js          # Server entry point
└── package.json          # Root package.json
```

## Browser Support
- ✅ Chrome/Edge 50+
- ✅ Firefox 44+
- ✅ Safari 11+ (iOS 12+)
- ✅ Samsung Internet 5+

## Technologies Used
- React 18
- TypeScript
- Vite
- Express.js
- Chart.js (for statistics visualization)
- Service Workers (for offline support)

## License
MIT
