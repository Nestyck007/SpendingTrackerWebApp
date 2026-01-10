import { useState, useEffect } from 'react'
import './App.css'
import HomeScreen from './components/HomeScreen'
import AddSpending from './components/AddSpending'
import StatsScreen from './components/StatsScreen'
import SettingsScreen from './components/SettingsScreen'
import RecurringTransactionsScreen from './components/RecurringTransactionsScreen'
import InfoScreen from './components/InfoScreen'
import DebugPanel from './components/DebugPanel'

type ViewType = 'home' | 'add' | 'stats' | 'recurring' | 'settings' | 'info'

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

    // Keyboard shortcuts: 1=Home, 2=Add, 3=Stats, 4=Settings, 5=Info
    const handleKeyPress = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      if (e.key === '1') setView('home')
      if (e.key === '2') setView('add')
      if (e.key === '3') setView('stats')
      if (e.key === '4') setView('settings')
      if (e.key === '5') setView('info')
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
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
        {view === 'recurring' && <RecurringTransactionsScreen />}
        {view === 'settings' && <SettingsScreen />}
        {view === 'info' && <InfoScreen />}
      </div>

      {/* Debug panel (dev only) */}
      {import.meta.env.DEV && <DebugPanel />}

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
          className={`nav-btn ${view === 'recurring' ? 'active' : ''}`}
          onClick={() => setView('recurring')}
          title="Recurring"
        >
          📅 Recurring
        </button>
        <button
          className={`nav-btn ${view === 'info' ? 'active' : ''}`}
          onClick={() => setView('info')}
          title="Info (Press 5)"
        >
          ℹ️ Info
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
