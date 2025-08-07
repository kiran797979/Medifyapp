param(
    [string]$ProjectPath = (Get-Location)
)

function Write-Status($msg, $color="Cyan") {
    Write-Host $msg -ForegroundColor $color
}

function Try-Run($scriptblock) {
    try { & $scriptblock } catch { }
}

Write-Status "`n[1/6] Pausing OneDrive sync..." "Yellow"
Try-Run { Start-Process -FilePath "$env:LOCALAPPDATA\Microsoft\OneDrive\OneDrive.exe" -ArgumentList "/pause" -WindowStyle Hidden }

Write-Status "[2/6] Killing all Node.js processes..." "Yellow"
Try-Run { Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue }

Write-Status "[3/6] Deleting node_modules\\cypress folder..." "Yellow"
$CypressPath = Join-Path $ProjectPath "node_modules\cypress"
Try-Run { Remove-Item -Recurse -Force -ErrorAction SilentlyContinue $CypressPath }

Write-Status "[4/6] Cleaning npm cache..." "Yellow"
Try-Run { npm cache clean --force | Out-Null }

Write-Status "[5/6] Running npm install in $ProjectPath ..." "Yellow"
try {
    Push-Location $ProjectPath
    npm install
    $npmSuccess = $LASTEXITCODE -eq 0
    Pop-Location
} catch {
    $npmSuccess = $false
    Pop-Location
}

Write-Status "[6/6] Resuming OneDrive sync..." "Yellow"
Try-Run { Start-Process -FilePath "$env:LOCALAPPDATA\Microsoft\OneDrive\OneDrive.exe" -ArgumentList "/resume" -WindowStyle Hidden }

if ($npmSuccess) {
    Write-Status "`nAll steps completed successfully!" "Green"
    exit 0
} else {
    Write-Status "`nSomething went wrong during npm install. Please check the output above." "Red"
    exit 1
}