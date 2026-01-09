import React, { useState } from 'react'
import { clearAllSpendings } from '../utils/spendings'
import './SettingsScreen.css'

export default function SettingsScreen() {
  const [showAbout, setShowAbout] = useState(false)

  const handleClearData = () => {
    if (confirm('Are you sure you want to delete all spending records? This cannot be undone.')) {
      clearAllSpendings()
      alert('All data has been cleared.')
      window.location.reload()
    }
  }

  return (
    <div className="settings-screen">
      <h1>⚙️ Settings</h1>

      <div className="card settings-group">
        <h2>About</h2>
        <button onClick={() => setShowAbout(!showAbout)} className="btn-text">
          {showAbout ? '−' : '+'} About This App
        </button>
        {showAbout && (
          <div className="about-content">
            <p><strong>Spending Tracker PWA</strong></p>
            <p>Version 1.0.0</p>
            <p>A modern progressive web app for tracking your spending across categories.</p>
            <ul>
              <li>📱 Works on iPhone, Android, and desktop</li>
              <li>📵 Works offline with local storage</li>
              <li>🏠 Installable on home screen</li>
              <li>💾 Auto-saves all data</li>
              <li>🇷🇴 Supports RON currency</li>
            </ul>
            <p className="version-info">Built with React, Express, and TypeScript</p>
          </div>
        )}
      </div>

      <div className="card settings-group">
        <h2>Data Management</h2>
        <button onClick={handleClearData} className="btn btn-danger" style={{ width: '100%' }}>
          🗑️ Clear All Data
        </button>
        <p className="warning-text">This will permanently delete all your spending records.</p>
      </div>

      <div className="card settings-group">
        <h2>PWA Features</h2>
        <p className="feature-info">This app can be installed on your home screen for quick access.</p>
        <div className="install-hint">
          <strong>On iPhone:</strong> Tap Share → Add to Home Screen
          <br/>
          <strong>On Android:</strong> Tap Menu → Install app
        </div>
      </div>

      <div className="card settings-group">
        <h2>Categories</h2>
        <p className="feature-info">Organize your spending by:</p>
        <ul className="category-list">
          <li>🍔 Food</li>
          <li>🚗 Transport</li>
          <li>🎬 Entertainment</li>
          <li>🛍️ Shopping</li>
          <li>⚕️ Health</li>
          <li>💡 Utilities</li>
          <li>🏠 Rent</li>
          <li>📦 Other</li>
        </ul>
      </div>

      <div className="app-version">
        <p>© 2024 Spending Tracker</p>
        <p className="version-text">Version 1.0.0 • PWA Ready</p>
      </div>
    </div>
  )
}
