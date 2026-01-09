import React, { useState } from 'react'
import { addSpending, addOrUpdateBudget, addOrUpdateRevenue, CATEGORIES } from '../utils/spendings'

const REVENUE_TYPES = [
  'Salary',
  'Bonus',
  'Bet Winning',
  'Gift',
  'Freelance',
  'Investment',
  'Other'
];
import './AddSpending.css'

interface AddSpendingProps {
  onAdded?: () => void
}
type Mode = 'spending' | 'budget' | 'revenue';

export default function AddSpending({ onAdded }: AddSpendingProps) {
  const [mode, setMode] = useState<Mode>('spending');
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0].name)
  const [subcategory, setSubcategory] = useState(CATEGORIES[0].subs[0])
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [currency, setCurrency] = useState('RON')
  // Revenue state
  const [revenueAmount, setRevenueAmount] = useState('');
  const [revenueCurrency, setRevenueCurrency] = useState('RON');
  const [revenueType, setRevenueType] = useState(REVENUE_TYPES[0]);
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'spending') {
      if (!description.trim() || !amount.trim()) {
        alert('Please fill in all fields');
        return;
      }
      const amountNum = parseFloat(amount);
      if (isNaN(amountNum) || amountNum <= 0) {
        alert('Please enter a valid amount');
        return;
      }
      addSpending({
        description: description.trim(),
        amount: amountNum,
        category: `${category} / ${subcategory}`,
        date
      });
      setSubmitted(true);
      setTimeout(() => {
        setDescription('');
        setAmount('');
        setCategory(CATEGORIES[0].name);
        setSubcategory(CATEGORIES[0].subs[0]);
        setDate(new Date().toISOString().split('T')[0]);
        setSubmitted(false);
        onAdded?.();
      }, 1200);
    } else if (mode === 'budget') {
      if (!amount.trim()) {
        alert('Please enter a budget amount');
        return;
      }
      const amountNum = parseFloat(amount);
      if (isNaN(amountNum) || amountNum <= 0) {
        alert('Please enter a valid amount');
        return;
      }
      addOrUpdateBudget({
        category: `${category} / ${subcategory}`,
        amount: amountNum,
        currency,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
      });
      setSubmitted(true);
      setTimeout(() => {
        setAmount('');
        setCategory(CATEGORIES[0].name);
        setSubcategory(CATEGORIES[0].subs[0]);
        setSubmitted(false);
        onAdded?.();
      }, 1200);
    } else if (mode === 'revenue') {
      if (!revenueAmount.trim()) {
        alert('Please enter a revenue amount');
        return;
      }
      const amountNum = parseFloat(revenueAmount);
      if (isNaN(amountNum) || amountNum <= 0) {
        alert('Please enter a valid amount');
        return;
      }
      addOrUpdateRevenue({
        amount: amountNum,
        currency: revenueCurrency,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        type: revenueType
      });
      setSubmitted(true);
      setTimeout(() => {
        setRevenueAmount('');
        setRevenueCurrency('RON');
        setRevenueType(REVENUE_TYPES[0]);
        setSubmitted(false);
        onAdded?.();
      }, 1200);
  }
}

  return (
    <div className="add-spending">
      <div className="mode-toggle">
        <button type="button" className={`btn${mode === 'spending' ? ' btn-primary active' : ''}`} onClick={() => setMode('spending')}>Add Spending</button>
        <button type="button" className={`btn${mode === 'budget' ? ' btn-primary active' : ''}`} onClick={() => setMode('budget')}>Add Budget</button>
        <button type="button" className={`btn${mode === 'revenue' ? ' btn-primary active' : ''}`} onClick={() => setMode('revenue')}>Add Revenue</button>
      </div>
      <h1>{mode === 'spending' ? '➕ Add Spending' : mode === 'budget' ? '💰 Add Budget' : '💵 Add Revenue'}</h1>

      {submitted && (
        <div className="success-message">
          {mode === 'spending' ? '✅ Spending added successfully!' : mode === 'budget' ? '✅ Budget added/updated!' : '✅ Revenue added/updated!'}
        </div>
      )}

      <form onSubmit={handleSubmit} className="spending-form">
        {mode === 'revenue' ? (
          <>
            <div className="form-group">
              <label htmlFor="revenueType">Type</label>
              <select
                id="revenueType"
                value={revenueType}
                onChange={e => setRevenueType(e.target.value)}
                disabled={submitted}
              >
                {REVENUE_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="revenueAmount">Amount</label>
              <input
                id="revenueAmount"
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={revenueAmount}
                onChange={e => setRevenueAmount(e.target.value)}
                disabled={submitted}
              />
            </div>
            <div className="form-group">
              <label htmlFor="revenueCurrency">Currency</label>
              <input
                id="revenueCurrency"
                type="text"
                value={revenueCurrency}
                onChange={e => setRevenueCurrency(e.target.value)}
                disabled={submitted}
                maxLength={5}
                style={{ width: 80 }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                id="description"
                type="text"
                placeholder="e.g., Salary for January, Bonus, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={submitted}
              />
            </div>
          </>
        ) : (
          <>
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
                onChange={e => {
                  setCategory(e.target.value)
                  const selected = CATEGORIES.find(c => c.name === e.target.value)
                  setSubcategory(selected ? selected.subs[0] : '')
                }}
                disabled={submitted}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="subcategory">Subcategory</label>
              <select
                id="subcategory"
                value={subcategory}
                onChange={e => setSubcategory(e.target.value)}
                disabled={submitted}
              >
                {(CATEGORIES.find(c => c.name === category)?.subs || []).map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
            {mode === 'spending' && (
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
            )}
            {mode === 'budget' && (
              <div className="form-group">
                <label htmlFor="currency">Currency</label>
                <input
                  id="currency"
                  type="text"
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                  disabled={submitted}
                  maxLength={5}
                  style={{ width: 80 }}
                />
              </div>
            )}
          </>
        )}
        <button type="submit" className="btn btn-primary" disabled={submitted}>
          {submitted
            ? (mode === 'spending'
                ? '✅ Added!'
                : mode === 'budget'
                  ? '✅ Budget!'
                  : '✅ Revenue!')
            : (mode === 'spending'
                ? 'Add Spending'
                : mode === 'budget'
                  ? 'Add Budget'
                  : 'Add Revenue')}
        </button>
      </form>
    </div>
  )
}
