// --- Revenue Model ---
export interface Revenue {
  id: string;
  amount: number;
  currency: string;
  month: number;
  year: number;
  type: string; // e.g. Salary, Bonus, etc.
}

const REVENUES_KEY = '@spending_tracker/revenues';

export function loadRevenues(): Revenue[] {
  try {
    const data = localStorage.getItem(REVENUES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveRevenues(revenues: Revenue[]): void {
  localStorage.setItem(REVENUES_KEY, JSON.stringify(revenues));
}

export function addOrUpdateRevenue(revenue: Omit<Revenue, 'id'>, id?: string): Revenue {
  const revenues = loadRevenues();
  // Only one revenue per type per month/year
  const existingIdx = revenues.findIndex(r => r.month === revenue.month && r.year === revenue.year && r.type === revenue.type);
  const newRevenue: Revenue = {
    ...revenue,
    id: id || Date.now().toString()
  };
  if (existingIdx !== -1) {
    revenues[existingIdx] = newRevenue;
  } else {
    revenues.push(newRevenue);
  }
  saveRevenues(revenues);
  return newRevenue;
}
// --- Budget Model ---
export interface Budget {
  id: string;
  category: string; // e.g. "Food" or "Food / Groceries"
  amount: number;
  currency: string; // e.g. "RON"
  month: number; // 1-12
  year: number;
}

const BUDGETS_KEY = '@spending_tracker/budgets';

export function loadBudgets(): Budget[] {
  try {
    const data = localStorage.getItem(BUDGETS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveBudgets(budgets: Budget[]): void {
  localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
}

export function addOrUpdateBudget(budget: Omit<Budget, 'id'>, id?: string): Budget {
  const budgets = loadBudgets();
  const now = new Date();
  // Only one active budget per category per month
  const existingIdx = budgets.findIndex(b => b.category === budget.category && b.month === budget.month && b.year === budget.year);
  const newBudget: Budget = {
    ...budget,
    id: id || Date.now().toString()
  };
  if (existingIdx !== -1) {
    budgets[existingIdx] = newBudget;
  } else {
    budgets.push(newBudget);
  }
  saveBudgets(budgets);
  return newBudget;
}

export function deleteBudget(id: string): void {
  const budgets = loadBudgets();
  saveBudgets(budgets.filter(b => b.id !== id));
}
export interface Spending {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

const STORAGE_KEY = '@spending_tracker/spendings'


export const CATEGORIES = [
  {
    name: 'Housing',
    subs: [
      'Rent / Mortgage', 'Home Maintenance', 'Electricity', 'Gas', 'Water', 'Internet', 'Mobile Phone', 'Home Insurance', 'Furniture'
    ]
  },
  {
    name: 'Food',
    subs: [
      'Groceries', 'Restaurants', 'Fast Food', 'Food Delivery', 'Coffee & Snacks', 'Work Meals'
    ]
  },
  {
    name: 'Transport',
    subs: [
      'Fuel', 'Public Transport', 'Taxi / Ride Sharing', 'Parking', 'Car Service', 'Car Insurance', 'Car Taxes', 'Car Wash'
    ]
  },
  {
    name: 'Utilities & Subscriptions',
    subs: [
      'Phone Bill', 'TV / Streaming', 'Software Subscriptions', 'Cloud Services'
    ]
  },
  {
    name: 'Health',
    subs: [
      'Medicines', 'Doctor Visits', 'Medical Tests', 'Health Insurance', 'Gym / Fitness', 'Therapy'
    ]
  },
  {
    name: 'Education',
    subs: [
      'Courses', 'Books', 'Educational Subscriptions', 'Certifications', 'Conferences'
    ]
  },
  {
    name: 'Clothing',
    subs: [
      'Clothing', 'Shoes', 'Accessories', 'Dry Cleaning'
    ]
  },
  {
    name: 'Leisure',
    subs: [
      'Socializing', 'Cinema / Theatre', 'Events', 'Games', 'Hobbies'
    ]
  },
  {
    name: 'Travel',
    subs: [
      'Flights', 'Accommodation', 'Vacation Food', 'Activities', 'Travel Insurance'
    ]
  },
  {
    name: 'Tech',
    subs: [
      'Electronics', 'Tech Accessories', 'Apps & Games', 'Tech Repairs'
    ]
  },
  {
    name: 'Finance',
    subs: [
      'Savings', 'Investments', 'Bank Fees', 'Loan Payments', 'Interest', 'Transfers'
    ]
  },
  {
    name: 'Gifts & Special',
    subs: [
      'Gifts', 'Donations', 'Special Occasions'
    ]
  },
  {
    name: 'Children',
    subs: [
      'Childcare', 'School Fees', 'Toys', 'Kids Clothing', 'Extra Activities'
    ]
  },
  {
    name: 'Pets',
    subs: [
      'Pet Food', 'Veterinary', 'Pet Toys', 'Pet Insurance'
    ]
  },
  {
    name: 'Other',
    subs: [
      'Unexpected Expenses', 'Other'
    ]
  }
]

const CATEGORY_COLORS: Record<string, string> = {
  'Housing': '#2a9d8f',
  'Food': '#d9480f',
  'Transport': '#d97706',
  'Utilities & Subscriptions': '#b45309',
  'Health': '#0284c7',
  'Education': '#2f855a',
  'Clothing': '#b7791f',
  'Leisure': '#2b6cb0',
  'Travel': '#0ea5a4',
  'Tech': '#264653',
  'Finance': '#115e59',
  'Gifts & Special': '#be185d',
  'Children': '#fb7185',
  'Pets': '#15803d',
  'Other': '#6b7280'
}

export function getCategoryColor(category: string): string {
  // category may include subcategory like "Transport / Taxi" — use base category
  const base = category.split('/')[0].trim()
  return CATEGORY_COLORS[base] || '#adb5bd'
}

export function loadSpendings(): Spending[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveSpendings(spendings: Spending[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(spendings))
}

export function addSpending(spending: Omit<Spending, 'id'>): Spending {
  const spendings = loadSpendings()
  const newSpending: Spending = {
    ...spending,
    id: Date.now().toString()
  }
  spendings.push(newSpending)
  saveSpendings(spendings)
  return newSpending
}

export function deleteSpending(id: string): void {
  const spendings = loadSpendings()
  const filtered = spendings.filter(s => s.id !== id)
  saveSpendings(filtered)
}

export function clearAllSpendings(): void {
  saveSpendings([])
}

// --- Recurring Transactions ---
export interface RecurringTransaction {
  id: string
  description: string
  amount: number
  category: string
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly'
  startDate: string
  endDate?: string
  isActive: boolean
}

const RECURRING_KEY = '@spending_tracker/recurring'

export function loadRecurringTransactions(): RecurringTransaction[] {
  try {
    const data = localStorage.getItem(RECURRING_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveRecurringTransactions(list: RecurringTransaction[]): void {
  localStorage.setItem(RECURRING_KEY, JSON.stringify(list))
}

export function addRecurringTransaction(tx: Omit<RecurringTransaction, 'id'>): RecurringTransaction {
  const list = loadRecurringTransactions()
  const newTx: RecurringTransaction = { ...tx, id: Date.now().toString() }
  list.push(newTx)
  saveRecurringTransactions(list)
  return newTx
}

export function updateRecurringTransaction(id: string, updates: Partial<RecurringTransaction>): void {
  const list = loadRecurringTransactions()
  const idx = list.findIndex(r => r.id === id)
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...updates }
    saveRecurringTransactions(list)
  }
}

export function deleteRecurringTransaction(id: string): void {
  const list = loadRecurringTransactions()
  saveRecurringTransactions(list.filter(r => r.id !== id))
}

// Backward-compatible aliases
export const getAllSpendings = loadSpendings
export const getBudgets = loadBudgets
export const getRevenues = loadRevenues
export const getRecurringTransactions = loadRecurringTransactions
