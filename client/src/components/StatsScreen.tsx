import React, { useState, useEffect } from 'react'
import { loadSpendings, getCategoryColor, loadBudgets, Budget, loadRevenues, Revenue } from '../utils/spendings'
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
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [revenues, setRevenues] = useState<Revenue[]>([])
  const [storageAvailable, setStorageAvailable] = useState(true)

  // Check localStorage availability
  useEffect(() => {
    try {
      const testKey = '__st_test__';
      localStorage.setItem(testKey, '1');
      localStorage.removeItem(testKey);
      setStorageAvailable(true);
    } catch {
      setStorageAvailable(false);
    }
  }, []);

  // Reload spendings and budgets on mount, tab focus, or localStorage change
  useEffect(() => {
    function reload() {
      setSpendings(loadSpendings());
      setBudgets(loadBudgets());
      setRevenues(loadRevenues());
    }
    reload();
    window.addEventListener('focus', reload);
    window.addEventListener('storage', reload);
    return () => {
      window.removeEventListener('focus', reload);
      window.removeEventListener('storage', reload);
    };
  }, []);

  // Performance measurement
  const perfStart = performance.now()
  const total = spendings.reduce((sum, s) => sum + s.amount, 0)
  const average = spendings.length > 0 ? total / spendings.length : 0
  const max = spendings.length > 0 ? Math.max(...spendings.map(s => s.amount)) : 0
  const perfEnd = performance.now()
  if (perfEnd - perfStart > 200) {
    // eslint-disable-next-line no-console
    console.warn(`Stats calculation took ${perfEnd - perfStart}ms`)
  }

  // Calculate category breakdown
  const categoryMap = new Map<string, CategoryBreakdown>()
  spendings.forEach(s => {
    // Exclude uncategorized expenses (category must be non-empty)
    if (!s.category || s.category === 'Other') return;
    const existing = categoryMap.get(s.category) || { category: s.category, amount: 0, count: 0 };
    existing.amount += s.amount;
    existing.count += 1;
    categoryMap.set(s.category, existing);
  });

  // Get current month/year
  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const currentYear = now.getFullYear()

  // Get revenue for current month
  const currentRevenue = revenues.find(r => r.month === currentMonth && r.year === currentYear)

  // Helper: get budget for category (exact match)
  function getBudgetForCategory(cat: string): Budget | undefined {
    return budgets.find(b => b.category === cat && b.month === currentMonth && b.year === currentYear)
  }

  const breakdown = Array.from(categoryMap.values())
    .sort((a, b) => b.amount - a.amount)

  // Calculate monthly breakdown
  const monthlyMap = new Map<string, number>()
  const now2 = new Date()
  
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

  if (!storageAvailable) {
    return (
      <div className="stats-screen">
        <h1>📊 Statistics</h1>
        <div className="empty-state">
          <p>Local storage is not available.</p>
          <p className="empty-hint">Offline and instant calculations require localStorage or IndexedDB. Please enable storage in your browser settings.</p>
        </div>
      </div>
    )
  }

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
      <div className="card" style={{marginBottom: 16}}>
        <h2 style={{margin: '0 0 8px 0'}}>Budgets for {currentYear}-{String(currentMonth).padStart(2, '0')}</h2>
        <ul style={{margin: 0, paddingLeft: 20}}>
          {budgets.filter(b => b.month === currentMonth && b.year === currentYear).map(b => (
            <li key={b.id}>
              <span style={{fontWeight: 600}}>{b.category}</span>: {b.amount} {b.currency}
            </li>
          ))}
          {budgets.filter(b => b.month === currentMonth && b.year === currentYear).length === 0 && (
            <li style={{color: '#bfbfbf'}}>No budgets found for this month</li>
          )}
        </ul>
      </div>
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
        <div className="card stat-card">
          <div className="stat-label">Total Revenue</div>
          <div className="stat-value">
            {revenues.filter(r => r.month === currentMonth && r.year === currentYear).length > 0
              ? `${formatRON(revenues.filter(r => r.month === currentMonth && r.year === currentYear).reduce((sum, r) => sum + r.amount, 0))} ${revenues[0].currency}`
              : '-'}
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Balance</div>
          <div className="stat-value">
            {revenues.filter(r => r.month === currentMonth && r.year === currentYear).length > 0
              ? `${formatRON(revenues.filter(r => r.month === currentMonth && r.year === currentYear).reduce((sum, r) => sum + r.amount, 0) - total)} ${revenues[0].currency}`
              : '-'}
          </div>
        </div>
      </div>

      {/* Revenue breakdown by type */}
      <h2>Revenue Breakdown</h2>
      <div className="card category-breakdown">
        {revenues.filter(r => r.month === currentMonth && r.year === currentYear).length > 0 ? (
          revenues.filter(r => r.month === currentMonth && r.year === currentYear).map(r => (
            <div key={r.id} className="category-item">
              <div className="category-header">
                <div className="category-name">{r.type}</div>
                <div className="category-amount">{formatRON(r.amount)} {r.currency}</div>
                <div className="category-stats">{r.description}</div>
              </div>
            </div>
          ))
        ) : (
          <div style={{color: '#bfbfbf'}}>No revenues found for this month</div>
        )}
      </div>

      <h2>By Category</h2>
      <div className="card category-breakdown">
        {breakdown.map(({ category, amount, count }) => {
          const budget = getBudgetForCategory(category)
          const percent = budget ? (amount / budget.amount) * 100 : 0
          let barClass = ''
          if (budget) {
            if (percent < 80) barClass = 'under-budget'
            else if (percent < 100) barClass = 'near-budget'
            else barClass = 'over-budget'
          }
          return (
            <div key={category} className="category-item">
              <div className="category-header">
                <div className="category-name">{category}</div>
                <div className="category-amount">{formatRON(amount)}</div>
                {budget && (
                  <div className="category-budget">
                    Budget: {formatRON(budget.amount)} {budget.currency}
                  </div>
                )}
              </div>
              <div className="category-bar-container">
                <div
                  className={`category-bar ${barClass}`}
                  style={{
                    width: budget ? `${Math.min(percent, 100)}%` : `${(amount / total) * 100}%`,
                    backgroundColor: getCategoryColor(category)
                  }}
                  title={budget ? `${percent.toFixed(0)}% of budget` : ''}
                />
                {budget && percent > 100 && (
                  <div className="category-bar over-budget-extra" style={{width: `${Math.min(percent - 100, 100)}%`}} />
                )}
              </div>
              <div className="category-stats">
                <span>{count} transaction{count !== 1 ? 's' : ''}</span>
                <span>{budget ? `${percent.toFixed(0)}% of budget` : `${((amount / total) * 100).toFixed(0)}%`}</span>
              </div>
            </div>
          )
        })}
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
