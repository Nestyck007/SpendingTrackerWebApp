import { addSpending, addOrUpdateBudget, addOrUpdateRevenue, addRecurringTransaction } from './spendings'

export const populateTestData = () => {
  console.log('🔄 Populating test data...')

  const testSpendings = [
    { description: 'Morning Coffee', amount: 25, category: 'Food / Coffee', date: '2026-01-08' },
    { description: 'Lunch at work', amount: 45, category: 'Food / Lunch', date: '2026-01-08' },
    { description: 'Dinner', amount: 65, category: 'Food / Dinner', date: '2026-01-09' },
    { description: 'Gas - Full tank', amount: 150, category: 'Transport / Gas', date: '2026-01-09' },
    { description: 'Uber ride', amount: 28, category: 'Transport / Taxi', date: '2026-01-10' },
    { description: 'Movie tickets', amount: 50, category: 'Entertainment / Cinema', date: '2026-01-07' },
    { description: 'Spotify subscription', amount: 99, category: 'Entertainment / Subscriptions', date: '2026-01-05' },
    { description: 'Gym membership', amount: 80, category: 'Sports / Membership', date: '2026-01-06' },
    { description: 'Shoes', amount: 120, category: 'Shopping / Clothes', date: '2026-01-04' },
    { description: 'Pharmacy', amount: 42, category: 'Health / Medical', date: '2026-01-03' },
    { description: 'Electric bill', amount: 85, category: 'Utilities / Electricity', date: '2026-01-02' },
    { description: 'Internet bill', amount: 50, category: 'Utilities / Internet', date: '2026-01-02' },
  ]

  testSpendings.forEach(spending => {
    addSpending(spending)
    console.log(`✓ Added spending: ${spending.description}`)
  })

  const testBudgets = [
    { category: 'Food / Coffee', amount: 150 },
    { category: 'Food / Lunch', amount: 250 },
    { category: 'Food / Dinner', amount: 300 },
    { category: 'Transport / Gas', amount: 400 },
    { category: 'Entertainment / Cinema', amount: 200 },
  ]

  testBudgets.forEach(budget => {
    addOrUpdateBudget({
      category: budget.category,
      amount: budget.amount,
      currency: 'RON',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    })
    console.log(`✓ Added budget: ${budget.category}`)
  })

  const testRevenues = [
    { amount: 3500, currency: 'RON', type: 'Salary' },
    { amount: 500, currency: 'RON', type: 'Freelance' },
  ]

  testRevenues.forEach(revenue => {
    addOrUpdateRevenue({
      amount: revenue.amount,
      currency: revenue.currency,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      type: revenue.type
    })
    console.log(`✓ Added revenue: ${revenue.type}`)
  })

  const testRecurring = [
    { description: 'Rent', amount: 1500, category: 'Housing / Rent', frequency: 'monthly' as const, startDate: '2026-01-01' },
    { description: 'Gym membership', amount: 80, category: 'Sports / Membership', frequency: 'monthly' as const, startDate: '2026-01-06' },
  ]

  testRecurring.forEach(recurring => {
    addRecurringTransaction({
      description: recurring.description,
      amount: recurring.amount,
      category: recurring.category,
      frequency: recurring.frequency,
      startDate: recurring.startDate,
      isActive: true
    })
    console.log(`✓ Added recurring: ${recurring.description}`)
  })

  console.log('✅ Test data population complete!')
}

export const clearAllData = () => {
  console.log('🗑️ Clearing all test data...')
  localStorage.removeItem('@spending_tracker/spendings')
  localStorage.removeItem('@spending_tracker/budgets')
  localStorage.removeItem('@spending_tracker/revenues')
  localStorage.removeItem('@spending_tracker/recurring')
  console.log('✅ All data cleared!')
  window.location.reload()
}
