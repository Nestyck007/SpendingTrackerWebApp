import React, { useState, useEffect } from 'react'
import { loadSpendings, getCategoryColor } from '../utils/spendings'
import { formatRON } from '../utils/format'
import { Spending } from '../utils/spendings'
import './StatsScreen.css'

interface CategoryBreakdown {
  category: string
  amount: number
  count: number
}

export default function StatsScreen() {
  const [spendings, setSpendings] = useState<Spending[]>([])

  useEffect(() => {
    setSpendings(loadSpendings())
  }, [])

  const total = spendings.reduce((sum, s) => sum + s.amount, 0)
  const average = spendings.length > 0 ? total / spendings.length : 0
  const max = spendings.length > 0 ? Math.max(...spendings.map(s => s.amount)) : 0

  // Calculate category breakdown
  const categoryMap = new Map<string, CategoryBreakdown>()
  spendings.forEach(s => {
    const existing = categoryMap.get(s.category) || { category: s.category, amount: 0, count: 0 }
    existing.amount += s.amount
    existing.count += 1
    categoryMap.set(s.category, existing)
  })

  const breakdown = Array.from(categoryMap.values())
    .sort((a, b) => b.amount - a.amount)

  // Calculate monthly breakdown
  const monthlyMap = new Map<string, number>()
  const now = new Date()
  
  // Initialize last 6 months
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    monthlyMap.set(key, 0)
  }

  spendings.forEach(s => {
    const date = new Date(s.date)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    monthlyMap.set(key, (monthlyMap.get(key) || 0) + s.amount)
  })

  const months = Array.from(monthlyMap.entries()).sort()
  const monthLabels = months.map(([key]) => {
    const [year, month] = key.split('-')
    return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('ro-RO', { month: 'short', year: '2-digit' })
  })
  const monthValues = months.map(([, value]) => value)

  if (spendings.length === 0) {
    return (
      <div className="stats-screen">
        <h1>📊 Statistics</h1>
        <div className="empty-state">
          <p>No data to display yet</p>
          <p className="empty-hint">Add some spending to see statistics</p>
        </div>
      </div>
    )
  }

  return (
    <div className="stats-screen">
      <h1>📊 Statistics</h1>

      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-label">Total Spent</div>
          <div className="stat-value">{formatRON(total)}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Transactions</div>
          <div className="stat-value">{spendings.length}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Average</div>
          <div className="stat-value">{formatRON(average)}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Highest</div>
          <div className="stat-value">{formatRON(max)}</div>
        </div>
      </div>

      <h2>By Category</h2>
      <div className="card category-breakdown">
        {breakdown.map(({ category, amount, count }) => (
          <div key={category} className="category-item">
            <div className="category-header">
              <div className="category-name">{category}</div>
              <div className="category-amount">{formatRON(amount)}</div>
            </div>
            <div className="category-bar-container">
              <div
                className="category-bar"
                style={{
                  width: `${(amount / total) * 100}%`,
                  backgroundColor: getCategoryColor(category)
                }}
              />
            </div>
            <div className="category-stats">
              <span>{count} transaction{count !== 1 ? 's' : ''}</span>
              <span>{((amount / total) * 100).toFixed(0)}%</span>
            </div>
          </div>
        ))}
      </div>

      <h2>Monthly Trend</h2>
      <div className="card monthly-chart">
        <div className="chart-container">
          {monthValues.length > 0 && (
            <div className="bar-chart">
              {monthValues.map((value, idx) => (
                <div key={idx} className="chart-column">
                  <div
                    className="chart-bar"
                    style={{
                      height: `${(value / Math.max(...monthValues)) * 200}px`,
                      backgroundColor: `hsl(${200 + idx * 10}, 70%, 50%)`
                    }}
                    title={formatRON(value)}
                  />
                  <div className="chart-label">{monthLabels[idx]}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
