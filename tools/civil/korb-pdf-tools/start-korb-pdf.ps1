# ============================================================
#  KORB ENGINEERING PDF TOOLS — Windows Launcher
#  Run this script to start the application.
# ============================================================

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

Write-Host ""
Write-Host "  ██╗  ██╗███████╗    ██████╗ ██████╗ ███████╗" -ForegroundColor Red
Write-Host "  ██║ ██╔╝██╔════╝    ██╔══██╗██╔══██╗██╔════╝" -ForegroundColor Red
Write-Host "  █████╔╝ █████╗      ██████╔╝██║  ██║█████╗  " -ForegroundColor Red
Write-Host "  ██╔═██╗ ██╔══╝      ██╔═══╝ ██║  ██║██╔══╝  " -ForegroundColor Red
Write-Host "  ██║  ██╗███████╗    ██║     ██████╔╝██║     " -ForegroundColor Red
Write-Host "  ╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═════╝ ╚═╝     " -ForegroundColor DarkRed
Write-Host ""
Write-Host "  KORB ENGINEERING PDF TOOLS — Starting..." -ForegroundColor White
Write-Host ""

# Check Docker is running
$dockerStatus = docker info 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "  [ERROR] Docker Desktop is not running. Please start Docker Desktop first." -ForegroundColor Red
    Read-Host "  Press Enter to exit"
    exit 1
}

Write-Host "  [1/3] Pulling latest image (first run may take a few minutes)..." -ForegroundColor Yellow
docker compose pull

Write-Host "  [2/3] Starting Korb Engineering PDF Tools..." -ForegroundColor Yellow
docker compose up -d

Write-Host "  [3/3] Waiting for application to be ready..." -ForegroundColor Yellow
$ready = $false
$attempts = 0
while (-not $ready -and $attempts -lt 30) {
    Start-Sleep -Seconds 3
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8080" -TimeoutSec 2 -ErrorAction Stop
        $ready = $true
    } catch {
        $attempts++
        Write-Host "      Waiting... ($($attempts * 3)s)" -ForegroundColor DarkGray
    }
}

if ($ready) {
    Write-Host ""
    Write-Host "  ✓ Korb Engineering PDF Tools is running!" -ForegroundColor Green
    Write-Host "    URL: http://localhost:8080" -ForegroundColor Cyan
    Write-Host ""
    Start-Process "http://localhost:8080"
} else {
    Write-Host ""
    Write-Host "  [WARN] App may still be starting. Try: http://localhost:8080" -ForegroundColor Yellow
}
