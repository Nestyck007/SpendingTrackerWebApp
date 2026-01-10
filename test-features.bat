:: filepath: c:\Users\i24ge\SpendingTrackerWebApp\test-features.bat
@echo off
setlocal enabledelayedexpansion

echo ==========================================
echo SpendingTrackerWebApp - Feature Testing
echo ==========================================
echo.

echo Testing Checklist:
echo 1. Recurring Transactions - Add, Pause, Resume, Delete
echo 2. Spending Analytics - Category breakdown ^& stats
echo 3. Budget Alerts - Real-time warnings
echo.

echo Building project...
call npm run build

if %ERRORLEVEL% NEQ 0 (
  echo Build failed!
  exit /b 1
)

echo.
echo Build successful!
echo.
echo Starting dev server...
call npm run dev

echo.
echo ==========================================
echo Testing Instructions:
echo ==========================================
echo.
echo 1. Open browser: http://localhost:5173
echo.
echo TEST FEATURE 1 - Recurring Transactions:
echo    * Click '📅 Recurring' tab
echo    * Click '➕ Add Recurring'
echo    * Fill form: Description, Amount, Category, Frequency, Start Date
echo    * Click 'Save Recurring'
echo    * Verify item appears in list with '✓ Active' status
echo    * Click 'Pause' to deactivate
echo    * Click 'Resume' to reactivate
echo    * Click 'Delete' to remove
echo.
echo TEST FEATURE 2 - Spending Analytics:
echo    * Go to '📊 Stats' tab
echo    * Verify you see:
echo      - Total Spent (sum of all spendings)
echo      - Transactions count
echo      - Average per transaction
echo      - Top Categories with percentages
echo      - Progress bars for each category
echo.
echo TEST FEATURE 3 - Budget Alerts:
echo    * Go to '💰 Add Budget' tab in Add section
echo    * Set budget for a category (e.g., 500 RON)
echo    * Add spendings to that category
echo    * Go back to 'Home' tab
echo    * Watch for yellow alert at top (80% spent)
echo    * Watch for red alert (100%+ spent)
echo.
echo Happy Testing! ^_^
echo.