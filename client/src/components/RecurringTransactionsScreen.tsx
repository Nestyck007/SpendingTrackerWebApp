import React, { useState, useEffect } from 'react'
import { addRecurringTransaction, loadRecurringTransactions, updateRecurringTransaction, deleteRecurringTransaction, CATEGORIES } from '../utils/spendings'
import { formatRON } from '../utils/format'
import './RecurringTransactionsScreen.css'

export default function RecurringTransactionsScreen() {
  const [recurring, setRecurring] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0]?.name || '')
  const [subcategory, setSubcategory] = useState(CATEGORIES[0]?.subs?.[0] || '')
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly'>('monthly')
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => { load() }, [])

  const load = () => {
    setRecurring(loadRecurringTransactions())
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    const amt = parseFloat(amount)
    if (!description.trim() || isNaN(amt) || amt <= 0) {
      alert('Please fill valid description and amount')
      return
    }
    addRecurringTransaction({ description: description.trim(), amount: amt, category: `${category} / ${subcategory}`, frequency, startDate, isActive: true })
    setDescription('')
    setAmount('')
    setCategory(CATEGORIES[0]?.name || '')
    setSubcategory(CATEGORIES[0]?.subs?.[0] || '')
    setFrequency('monthly')
    setStartDate(new Date().toISOString().split('T')[0])
    setShowForm(false)
    load()
  }

  const handleToggle = (id: string, isActive: boolean) => {
    updateRecurringTransaction(id, { isActive: !isActive })
    load()
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this recurring transaction?')) {
      deleteRecurringTransaction(id)
      load()
    }
  }

  return (
    <div className="recurring-screen">
      <h1>📅 Recurring Transactions</h1>
      <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>{showForm ? '✕ Cancel' : '➕ Add Recurring'}</button>

      {showForm && (
        <form className="recurring-form" onSubmit={handleAdd}>
          <div className="form-group">
            <label htmlFor="r-desc">Description</label>
            <input id="r-desc" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="r-amount">Amount</label>
            <input id="r-amount" type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select value={category} onChange={e => { setCategory(e.target.value); const s = CATEGORIES.find(c=>c.name===e.target.value); setSubcategory(s? s.subs[0]: '') }}>
              {CATEGORIES.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Subcategory</label>
            <select value={subcategory} onChange={e => setSubcategory(e.target.value)}>
              {(CATEGORIES.find(c=>c.name===category)?.subs || []).map(sub=> <option key={sub} value={sub}>{sub}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Frequency</label>
            <select value={frequency} onChange={e => setFrequency(e.target.value as any)}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} />
          </div>
          <button className="btn btn-primary" type="submit">Save Recurring</button>
        </form>
      )}

      <div className="recurring-list">
        {recurring.length === 0 ? <p className="empty-state">No recurring transactions</p> : recurring.map(r => (
          <div key={r.id} className={`recurring-item ${!r.isActive? 'inactive':''}`}>
            <div>
              <strong>{r.description}</strong>
              <p>{r.category} • {r.frequency}</p>
            </div>
            <div>
              <div className="amount"><span className="amount-number">{formatRON(r.amount)}</span></div>
              <button className="btn" onClick={()=>handleToggle(r.id, r.isActive)}>{r.isActive? 'Pause':'Resume'}</button>
              <button className="btn btn-danger" onClick={()=>handleDelete(r.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
