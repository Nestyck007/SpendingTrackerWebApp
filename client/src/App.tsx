import React, { useState, useEffect } from 'react'
import './App.css'
import HomeScreen from './components/HomeScreen'
import AddSpending from './components/AddSpending'
import StatsScreen from './components/StatsScreen'
import SettingsScreen from './components/SettingsScreen'

type ViewType = 'home' | 'add' | 'stats' | 'settings'

export default function App() {
  const [view, setView] = useState<ViewType>('home')
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    // Register service worker for offline support
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        console.log('Service worker registration failed (may not be available in development)')
      })
    }
  }, [])

  const handleSpendingAdded = () => {
    setRefreshKey(k => k + 1)
    setView('home')
  }

  return (
    <div className="app-container">
      <div className="app-content" key={refreshKey}>
        {view === 'home' && <HomeScreen />}
        {view === 'add' && <AddSpending onAdded={handleSpendingAdded} />}
        {view === 'stats' && <StatsScreen />}
        {view === 'settings' && <SettingsScreen />}
      </div>

      <nav className="app-nav">
        <button
          className={`nav-btn ${view === 'home' ? 'active' : ''}`}
          onClick={() => setView('home')}
          title="Home (Press 1)"
        >
          🏠 Home
        </button>
        <button
          className={`nav-btn ${view === 'add' ? 'active' : ''}`}
          onClick={() => setView('add')}
          title="Add (Press 2)"
        >
          ➕ Add
        </button>
        <button
          className={`nav-btn ${view === 'stats' ? 'active' : ''}`}
          onClick={() => setView('stats')}
          title="Stats (Press 3)"
        >
          📊 Stats
        </button>
        <button
          className={`nav-btn ${view === 'settings' ? 'active' : ''}`}
          onClick={() => setView('settings')}
          title="Settings (Press 4)"
        >
          ⚙️ Settings
        </button>
      </nav>
    </div>
  )
}
