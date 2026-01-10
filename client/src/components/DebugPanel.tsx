import { useState, useEffect } from 'react'
import { populateTestData, clearAllData } from '../utils/testData'
import { getAllSpendings, getBudgets, getRevenues, getRecurringTransactions } from '../utils/spendings'
import './DebugPanel.css'

export default function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [stats, setStats] = useState({
    spendings: 0,
    budgets: 0,
    revenues: 0,
    recurring: 0,
    totalSpent: 0
  })

  const updateStats = () => {
    try {
      const spendings = getAllSpendings()
      const budgets = getBudgets()
      const revenues = getRevenues()
      const recurring = getRecurringTransactions()

      setStats({
        spendings: spendings.length,
        budgets: budgets.length,
        revenues: revenues.length,
        recurring: recurring.filter(r => r.isActive).length,
        totalSpent: spendings.reduce((sum, s) => sum + s.amount, 0)
      })
    } catch (err) {
      console.error('DebugPanel updateStats error', err)
    }
  }

  useEffect(() => {
    updateStats()
    const interval = setInterval(updateStats, 1000)
    return () => clearInterval(interval)
  }, [])

  const handlePopulateData = () => {
    console.log('🔄 Populating test data...')
    populateTestData()
    setTimeout(() => {
      updateStats()
      window.location.reload()
    }, 800)
  }

  const handleClearData = () => {
    if (confirm('⚠️ Delete ALL data? This cannot be undone!')) {
      clearAllData()
    }
  }

  return (
    <>
      {/* Debug Toggle Button */}
      <button
        className="debug-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Toggle Debug Panel (View stats and populate test data)"
        aria-label="Debug Panel Toggle"
      >
        🐛
      </button>

      {/* Debug Panel */}
      {isOpen && (
        <div className="debug-panel">
          <div className="debug-header">
            <h3>🔧 Debug Panel</h3>
            <button 
              className="close-btn" 
              onClick={() => setIsOpen(false)}
              title="Close Debug Panel"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="debug-content">
            {/* Data Statistics */}
            <div className="debug-section">
              <h4>📊 Data Statistics</h4>
              <div className="debug-stats">
                <div className="stat">
                  💾 Spendings: <strong>{stats.spendings}</strong>
                </div>
                <div className="stat">
                  📋 Budgets: <strong>{stats.budgets}</strong>
                </div>
                <div className="stat">
                  💰 Revenues: <strong>{stats.revenues}</strong>
                </div>
                <div className="stat">
                  📅 Recurring: <strong>{stats.recurring}</strong>
                </div>
                <div className="stat">
                  💸 Total Spent: <strong><span className="amount-number">{stats.totalSpent.toFixed(2)}</span> RON</strong>
                </div>
              </div>
            </div>

            {/* Test Actions */}
            <div className="debug-section">
              <h4>🧪 Test Actions</h4>
              <button
                className="debug-btn populate-btn"
                onClick={handlePopulateData}
              >
                ➕ Populate Test Data
              </button>
              <p className="btn-desc">
                Adds: 12 spendings, 5 budgets, 2 revenues, 2 recurring
              </p>

              <button
                className="debug-btn clear-btn"
                onClick={handleClearData}
              >
                🗑️ Clear All Data
              </button>
              <p className="btn-desc">
                Removes all data from localStorage
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}