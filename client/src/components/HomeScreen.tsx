import React, { useState, useEffect } from 'react'
import { loadSpendings, deleteSpending, getCategoryColor } from '../utils/spendings'
import { formatRON, formatDate } from '../utils/format'
import { Spending } from '../utils/spendings'
import './HomeScreen.css'

export default function HomeScreen() {
  const [spendings, setSpendings] = useState<Spending[]>([])

  useEffect(() => {
    setSpendings(loadSpendings())
  }, [])

  const sorted = [...spendings].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const total = spendings.reduce((sum, s) => sum + s.amount, 0)

  const handleDelete = (id: string) => {
    if (confirm('Delete this spending?')) {
      deleteSpending(id)
      setSpendings(loadSpendings())
    }
  }

  return (
    <div className="home-screen">
      <h1>💰 Spending Tracker</h1>

      <div className="card total-card">
        <div className="total-label">Total Spent</div>
        <div className="total-amount">{formatRON(total)}</div>
        <div className="total-count">{spendings.length} transactions</div>
      </div>

      <h2>Recent Transactions</h2>

      {sorted.length === 0 ? (
        <div className="empty-state">
          <p>No spending records yet</p>
          <p className="empty-hint">Start by adding your first spending</p>
        </div>
      ) : (
        <div className="spending-list">
          {sorted.map(spending => (
            <div key={spending.id} className="card spending-item">
              <div className="spending-header">
                <div className="spending-info">
                  <div className="spending-description">{spending.description}</div>
                  <div className="spending-meta">
                    <span 
                      className="spending-category"
                      style={{ backgroundColor: getCategoryColor(spending.category) }}
                    >
                      {spending.category}
                    </span>
                    <span className="spending-date">{formatDate(spending.date)}</span>
                  </div>
                </div>
                <div className="spending-amount"><span className="amount-number">{formatRON(spending.amount)}</span></div>
              </div>
              <button
                className="btn-delete"
                onClick={() => handleDelete(spending.id)}
                title="Delete"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
