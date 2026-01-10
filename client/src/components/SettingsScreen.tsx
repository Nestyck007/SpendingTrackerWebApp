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
            <p>Version 1.2.0</p>
            <p>A modern progressive web app for tracking your spending, budgets, and revenues with full offline support.</p>
            <ul>
              <li>📱 Works on iPhone, Android, and desktop</li>
              <li>📵 Works offline with local storage</li>
              <li>🏠 Installable on home screen (PWA)</li>
              <li>💾 Auto-saves all data locally</li>
              <li>🇷🇴 Supports RON currency</li>
              <li>📊 Real-time budget tracking per category with visual progress</li>
              <li>💰 Add, edit, and delete budgets</li>
              <li>💵 Revenue tracking by type (Salary, Bonus, etc.)</li>
              <li>⚡ Instant stats and balance calculation with color-coded alerts</li>
              <li>🔁 Recurring transactions support (add/pause/delete)</li>
              <li>🛠 Debug panel for populating test data and inspecting storage (dev only)</li>
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
        <h2>PWA & Installation</h2>
        <p className="feature-info">Install this app to your device to open it like a native app and enable offline usage.</p>
        <div className="install-hint">
          <strong>On iPhone (Safari)</strong>
          <ol>
            <li>Open this app URL in Safari on your iPhone.</li>
            <li>Tap the <em>Share</em> icon (square with an up-arrow) at the bottom.</li>
            <li>Scroll the share sheet and tap <em>Add to Home Screen</em>.</li>
            <li>Optionally edit the name, then tap <em>Add</em>. The app will appear on your home screen.</li>
          </ol>
          <strong>Notes:</strong> After installing, open via the home screen for the standalone PWA window. If the Add to Home Screen option is missing, make sure you opened the app in Safari (not in an embedded web view) and that the app was served over HTTPS or localhost.

          <hr/>
          <strong>On Android (Chrome)</strong>
          <ol>
            <li>Open this app URL in Chrome on your Android device.</li>
            <li>Tap the three-dot menu (top-right).</li>
            <li>Tap <em>Install app</em> or <em>Add to Home screen</em>, then confirm.</li>
          </ol>
          <strong>Other browsers</strong>: Firefox may show "Add to Home screen" in the menu; Edge and Samsung Browser provide similar install prompts.
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
        <p>© 2025 Spending Tracker</p>
        <p className="version-text">Version 1.2.0 • PWA Ready</p>
      </div>
    </div>
  )
}
