Write-Host "======================================================"
Write-Host " ESVIEM Website - Git & Vercel Diagnostic Utility"
Write-Host "======================================================"

# 1. Поточна директорія
Write-Host "`n[1] Поточна директорія:" (Get-Location)

# 2. Перевірка наявності Git
Write-Host "`n[2] Перевірка Git..."
git --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Git не встановлений або не знайдений у PATH!"
} else {
    Write-Host "✅ Git встановлено."
}

# 3. Перевірка remote
Write-Host "`n[3] Перевірка підключення remote..."
$remote = git remote -v 2>$null
if ($remote) {
    Write-Host "✅ Remote знайдено:`n$remote"
} else {
    Write-Host "❌ Remote (origin) не налаштований!"
}

# 4. Перевірка автентифікації GitHub
Write-Host "`n[4] Перевірка з'єднання з GitHub..."
try {
    git ls-remote > $null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Авторизація GitHub працює."
    } else {
        Write-Host "⚠️ GitHub потребує повторного входу:"
        Write-Host "   git credential-manager configure"
        Write-Host "   git credential-manager erase --host github.com"
    }
} catch {
    Write-Host "❌ Не вдалося виконати git ls-remote (немає з'єднання або токен прострочений)."
}

# 5. Перевірка package.json
Write-Host "`n[5] Перевірка package.json..."
if (Test-Path "./package.json") {
    try {
        $pkg = Get-Content "./package.json" -Raw | ConvertFrom-Json
        if ($pkg.dependencies.next) {
            Write-Host "✅ Next.js знайдено, версія:" $pkg.dependencies.next
        } else {
            Write-Host "❌ Next.js відсутній у package.json"
        }
    } catch {
        Write-Host "⚠️ Неможливо прочитати package.json (можливо, помилка формату)."
    }
} else {
    Write-Host "❌ Файл package.json не знайдено!"
}

# 6. Перевірка гілки
Write-Host "`n[6] Перевірка гілки..."
$branch = git rev-parse --abbrev-ref HEAD 2>$null
if ($branch) {
    Write-Host "✅ Поточна гілка:" $branch
} else {
    Write-Host "❌ Не вдалося визначити поточну гілку Git."
}

# 7. Перевірка Vercel CLI
Write-Host "`n[7] Перевірка Vercel CLI..."
vercel --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Vercel CLI не знайдено. Для встановлення введи:"
    Write-Host "   npm install -g vercel"
} else {
    Write-Host "✅ Vercel CLI встановлено."
}

Write-Host "`n✅ Діагностика завершена."
Write-Host "======================================================"
