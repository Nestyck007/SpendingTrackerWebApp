import React from 'react'
import './InfoScreen.css'

export default function InfoScreen() {
  return (
    <div className="info-screen">
      <h1>ℹ️ Getting Started</h1>

      <div className="card">
        <h2>Quick steps to start tracking</h2>
        <ol>
          <li><strong>Introduce your monthly revenue.</strong> Add each income source (salary, freelance, other) in the Revenues section or as a positive transaction so you know your baseline every month.</li>
          <li><strong>Create categories.</strong> Use categories like Housing, Food, Transport, Subscriptions so spendings are easy to group and analyse.</li>
          <li><strong>Add recurring payments.</strong> Add rents, subscriptions and memberships under Recurring so they appear automatically.</li>
          <li><strong>Record spendings quickly.</strong> Use the Add screen to capture purchases as they happen—include a short description and pick a category.</li>
          <li><strong>Review budgets and alerts.</strong> Visit Stats to set budgets per category and watch for color-coded alerts when you approach limits.</li>
          <li><strong>Use the Debug panel (dev only).</strong> Populate test data when trying things out or clearing/resetting local storage.</li>
        </ol>
      </div>

      <div className="card">
        <h3>Tips</h3>
        <ul>
          <li>Be consistent with descriptions to make searching easier.</li>
          <li>Prefer adding small expenses immediately to avoid backlog.</li>
          <li>Set realistic budgets and review weekly.</li>
        </ul>
      </div>
    </div>
  )
}
