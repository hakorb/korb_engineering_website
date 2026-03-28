$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir
Write-Host "Stopping Korb Engineering PDF Tools..." -ForegroundColor Yellow
docker compose down
Write-Host "Stopped." -ForegroundColor Green
