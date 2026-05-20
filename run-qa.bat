@echo off
echo ==========================================
echo Starting Full QA Suite (Setup, Build, Test)
echo ==========================================

echo.
echo [1/5] Installing QA Dependencies...
call npm install -D @playwright/test @lhci/cli

echo.
echo [2/5] Installing Playwright Browsers...
call npx playwright install --with-deps

echo.
echo [3/5] Building Project for Lighthouse...
call npm run build

echo.
echo [4/5] Running Lighthouse CI Tests...
call npx lhci autorun
if %ERRORLEVEL% NEQ 0 (
    echo Lighthouse found issues, but continuing to Playwright...
)

echo.
echo [5/5] Running Playwright E2E Tests...
call npx playwright test

echo.
echo ==========================================
echo QA Suite Finished!
echo Opening Playwright Report...
echo ==========================================
call npx playwright show-report
pause
