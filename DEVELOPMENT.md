# Spending Tracker Web App - PWA

A Progressive Web App for spending tracking built with React, TypeScript, and Express.js.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Modern browser (Chrome, Safari, Firefox, Edge)

### Installation & Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development servers**
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:5173 (Vite dev server)
   - Backend: http://localhost:3000 (Express)

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## 📱 iPhone Installation

1. Open Safari on your iPhone
2. Navigate to your computer's IP address: `http://<your-ip>:3000`
3. Tap Share button (box with arrow)
4. Select "Add to Home Screen"
5. Name the app and tap "Add"
6. App is now on your home screen!

### Finding Your Computer's IP
- **Windows**: Open Command Prompt and type `ipconfig` (look for IPv4 Address under your network)
- **Mac/Linux**: Open Terminal and type `ifconfig` or `hostname -I`

## ✨ Features

- ✅ **Track Spending** - Add transactions with amount, category, and date
- ✅ **Statistics** - View detailed stats with charts and category breakdown
- ✅ **Offline Support** - Works completely offline with service worker
- ✅ **Home Screen App** - Installable on iPhone, Android, and desktop
- ✅ **Local Storage** - All data saved securely on your device
- ✅ **RON Currency** - Support for Romanian Leu (₽)
- ✅ **Responsive Design** - Works on phones, tablets, and desktops
- ✅ **Keyboard Shortcuts** - Press 1-4 for quick navigation

## 📊 Spending Categories

- 🍔 Food
- 🚗 Transport
- 🎬 Entertainment
- 🛍️ Shopping
- ⚕️ Health
- 💡 Utilities
- 🏠 Rent
- 📦 Other

## 🏗️ Project Structure

```
SpendingTrackerWebApp/
├── client/                 # React frontend
│   ├── public/
│   │   ├── manifest.json  # PWA manifest
│   │   ├── sw.js          # Service worker
│   │   └── icons/         # App icons
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── utils/         # Utility functions
│   │   ├── App.tsx        # Main component
│   │   ├── App.css        # App styles
│   │   └── index.tsx      # Entry point
│   ├── index.html         # HTML template
│   └── vite.config.ts     # Vite config
├── server/
│   └── index.js           # Express server
└── package.json           # Dependencies
```

## 🛠️ Technologies

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Express.js, Node.js
- **Build**: Vite (fast bundler)
- **PWA**: Service Workers, Web App Manifest
- **Storage**: localStorage (client-side)
- **UI**: Pure CSS with gradients and modern design

## 📖 Available Commands

- `npm run dev` - Start development servers (frontend + backend)
- `npm run dev:server` - Start only Express server
- `npm run dev:client` - Start only Vite dev server
- `npm run build` - Build React app for production
- `npm run preview` - Preview production build locally

## 🔒 Data Privacy

All your spending data is stored **locally on your device**. No data is sent to any server. Perfect for privacy-conscious users.

## 🌐 Browser Support

- ✅ Chrome 50+
- ✅ Safari 11+ (iOS 12+)
- ✅ Firefox 44+
- ✅ Edge 15+
- ✅ Samsung Internet 5+

## 🐛 Troubleshooting

### App won't install on iPhone
- Make sure you're accessing via `http://` not `https://` (unless with valid certificate)
- Check that manifest.json is being served
- Clear Safari cache and try again

### Offline not working
- Service worker needs to be registered
- Check browser console for service worker errors
- First load needs network connection to cache files

### Data not persisting
- Check browser localStorage limits (usually 5-10MB)
- Ensure private/incognito mode is not enabled
- Clear browser cache if having issues

## 📄 License

MIT

## 🤝 Contributing

Feel free to fork and submit pull requests for any improvements.

---

**Happy Spending Tracking! 💰**
