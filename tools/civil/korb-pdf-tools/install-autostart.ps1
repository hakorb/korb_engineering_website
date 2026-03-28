# ============================================================
#  KORB ENGINEERING PDF TOOLS — Windows Auto-Start Installer
#  Run once as Administrator to register startup task.
# ============================================================

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$scriptPath = Join-Path $scriptDir "start-korb-pdf.ps1"

$action  = New-ScheduledTaskAction `
  -Execute "powershell.exe" `
  -Argument "-ExecutionPolicy Bypass -WindowStyle Hidden -File `"$scriptPath`""

$trigger = New-ScheduledTaskTrigger -AtLogOn

$settings = New-ScheduledTaskSettingsSet `
  -ExecutionTimeLimit (New-TimeSpan -Minutes 5) `
  -RestartCount 2 `
  -RestartInterval (New-TimeSpan -Minutes 1)

$principal = New-ScheduledTaskPrincipal `
  -UserId "$env:USERDOMAIN\$env:USERNAME" `
  -RunLevel Highest

Register-ScheduledTask `
  -TaskName "KorbEngineeringPDFTools" `
  -Description "Starts Korb Engineering PDF Tools (Docker/Stirling-PDF) at logon" `
  -Action   $action `
  -Trigger  $trigger `
  -Settings $settings `
  -Principal $principal `
  -Force

Write-Host ""
Write-Host "Auto-start registered. Korb Engineering PDF Tools will launch at next login." -ForegroundColor Green
Write-Host "To remove: Unregister-ScheduledTask -TaskName KorbEngineeringPDFTools" -ForegroundColor Gray
