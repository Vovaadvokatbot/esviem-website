Write-Host ""
Write-Host "=== START MONOREPO DIAGNOSTICS ===" -ForegroundColor Cyan

function RunCheck {
    param (
        [string]$Command,
        [string]$ErrorMessage
    )

    Write-Host ""
    Write-Host "Running: $Command" -ForegroundColor Yellow
    Invoke-Expression $Command

    if (-not $?) {
        Write-Host $ErrorMessage -ForegroundColor Red
        exit 1
    }
}

$apps = Get-ChildItem -Path "apps" -Directory

if ($apps.Count -eq 0) {
    Write-Host "ERROR: No apps found in /apps directory!" -ForegroundColor Red
    exit 1
}

Write-Host "Found applications:" -ForegroundColor Green
foreach ($app in $apps) {
    Write-Host " - $app"
}

foreach ($app in $apps) {
    $path = "apps/$app"

    if (-not (Test-Path "$path/package.json")) {
        Write-Host "Skipping $path (no package.json)" -ForegroundColor DarkYellow
        continue
    }

    Write-Host ""
    Write-Host "=== CHECKING $path ===" -ForegroundColor Cyan

    Set-Location $path

    RunCheck "pnpm install" "Install failed in $path"

    if (Select-String -Path "package.json" -Pattern '"lint"' -Quiet) {
        RunCheck "pnpm lint" "Lint failed in $path"
    }
    elseif (Test-Path ".eslintrc" -or Test-Path ".eslintrc.js" -or Test-Path ".eslintrc.cjs") {
        RunCheck "pnpm eslint ." "ESLint failed in $path"
    }
    else {
        Write-Host "Lint skipped (no lint script)" -ForegroundColor DarkYellow
    }

    if (Select-String -Path "package.json" -Pattern '"build"' -Quiet) {
        RunCheck "pnpm build" "Build failed in $path"
    }
    else {
        Write-Host "Build skipped (no build script)" -ForegroundColor DarkYellow
    }

    Set-Location ../..
}

Write-Host ""
Write-Host "=== ALL CHECKS COMPLETED SUCCESSFULLY ===" -ForegroundColor Green
