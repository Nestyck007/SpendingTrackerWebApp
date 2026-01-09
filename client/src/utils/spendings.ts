export interface Spending {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

const STORAGE_KEY = '@spending_tracker/spendings'

export const CATEGORIES = [
  'Food',
  'Transport',
  'Entertainment',
  'Shopping',
  'Health',
  'Utilities',
  'Rent',
  'Other'
]

const CATEGORY_COLORS: Record<string, string> = {
  'Food': '#FF6B6B',
  'Transport': '#4ECDC4',
  'Entertainment': '#45B7D1',
  'Shopping': '#FFA07A',
  'Health': '#98D8C8',
  'Utilities': '#F7DC6F',
  'Rent': '#BB8FCE',
  'Other': '#A9A9A9'
}

export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || '#A9A9A9'
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
