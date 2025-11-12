Write-Host "=== Git/Vercel Diagnostic ==="

# Поточна директорія
Write-Host "`nCurrent directory:" (Get-Location)

# Git
Write-Host "`nGit version:"
git --version

# Remote
Write-Host "`nGit remote:"
git remote -v

# Branch
Write-Host "`nCurrent branch:"
git rev-parse --abbrev-ref HEAD

# Перевірка підключення до GitHub
Write-Host "`nChecking GitHub access..."
git ls-remote 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ GitHub reachable"
} else {
    Write-Host "❌ GitHub unreachable or not authorized"
}

# package.json
Write-Host "`npackage.json check:"
if (Test-Path "./package.json") {
    try {
        $p = Get-Content "./package.json" -Raw | ConvertFrom-Json
        Write-Host "Next.js:" $p.dependencies.next
    } catch {
        Write-Host "⚠️ cannot read package.json"
    }
} else {
    Write-Host "❌ package.json not found"
}

# Vercel CLI
Write-Host "`nVercel CLI version:"
vercel --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Vercel CLI installed"
} else {
    Write-Host "⚠️ Vercel CLI not installed (npm i -g vercel)"
}

Write-Host "`n=== End of diagnostic ==="
