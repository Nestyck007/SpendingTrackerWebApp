import React, { useState } from 'react'
import { addSpending, CATEGORIES } from '../utils/spendings'
import './AddSpending.css'

interface AddSpendingProps {
  onAdded?: () => void
}

export default function AddSpending({ onAdded }: AddSpendingProps) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!description.trim() || !amount.trim()) {
      alert('Please fill in all fields')
      return
    }

    const amountNum = parseFloat(amount)
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid amount')
      return
    }

    addSpending({
      description: description.trim(),
      amount: amountNum,
      category,
      date
    })

    setSubmitted(true)
    setTimeout(() => {
      setDescription('')
      setAmount('')
      setCategory(CATEGORIES[0])
      setDate(new Date().toISOString().split('T')[0])
      setSubmitted(false)
      onAdded?.()
    }, 1200)
  }

  return (
    <div className="add-spending">
      <h1>➕ Add Spending</h1>

      {submitted && (
        <div className="success-message">
          ✅ Spending added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="spending-form">
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            placeholder="e.g., Lunch, Gas, Movie"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={submitted}
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount (RON)</label>
          <input
            id="amount"
            type="number"
            placeholder="0.00"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={submitted}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={submitted}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={submitted}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={submitted}>
          {submitted ? '✅ Added!' : 'Add Spending'}
        </button>
      </form>
    </div>
  )
}
