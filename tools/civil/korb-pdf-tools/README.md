# Korb Engineering PDF Tools

Self-hosted PDF manipulation suite — powered by [Stirling-PDF](https://github.com/Stirling-Tools/Stirling-PDF) (GPL-3.0).  
Internal use only. All data stays on your local machine.

---

## Prerequisites

- [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/) installed and running
- WSL2 backend enabled (recommended)
- Port 8080 free on localhost

---

## Quick Start (First-Time Install)

1. **Unzip** this folder to a permanent location, e.g. `C:\KorbPDF\`
2. **Start Docker Desktop** and wait for it to fully initialize
3. **Double-click `START.bat`** — this will:
   - Pull the Stirling-PDF Docker image (~500 MB, one-time)
   - Apply Korb Engineering branding
   - Open your browser to `http://localhost:8080`

---

## Daily Use

| Action | How |
|--------|-----|
| Start the app | Double-click `START.bat` |
| Stop the app  | Double-click `STOP.bat` |
| Open browser  | Navigate to `http://localhost:8080` |

---

## Auto-Start at Login (Optional)

Run the following **once as Administrator** in PowerShell:

```powershell
Set-Location "C:\KorbPDF"
.\install-autostart.ps1
```

This registers a Windows Scheduled Task that starts the app silently at every login.

To remove auto-start:
```powershell
Unregister-ScheduledTask -TaskName "KorbEngineeringPDFTools"
```

---

## Branding Customization

| File | Purpose |
|------|---------|
| `custom-files/static/css/korb-theme.css` | All color/font overrides |
| `custom-files/static/images/logo.svg` | Navbar logo (replace with final KE mark) |
| `custom-files/templates/navbar.html` | Top navigation bar |
| `custom-files/templates/footer.html` | Footer text |
| `configs/settings.yml` | App name, login, locale settings |

---

## Security

- Login is **disabled by default** for internal LAN use.
- To enable login, edit `configs/settings.yml`:
  ```yaml
  security:
    enableLogin: true
  ```
  Then restart with `START.bat`.
- Default credentials (when login enabled): `korb-admin` / `KorbPDF!2024`

---

## Viewing Logs

```powershell
docker logs korb-pdf-tools -f
```

Or check the `logs/` folder in this directory.

---

## Updating Stirling-PDF

```powershell
# In this folder:
docker compose pull
docker compose up -d
```

---

## Tool Categories

- **Organize:** Merge, Split, Reorder, Rotate, Remove/Extract Pages
- **Convert:** PDF ↔ Image/Word/Excel/PPT/HTML/Text/CSV, HTML→PDF, Markdown→PDF
- **Security:** Encrypt, Decrypt, Permissions, Digital Signatures, Sanitize
- **Edit:** Watermark, Stamp, Page Numbers, Crop, Scale, Metadata, Overlay
- **Optimize:** Compress, PDF/A, OCR, Compare, Extract Images/Text
- **Forms:** Fill AcroForms, Flatten, Pipeline/Batch operations

---

## License

Stirling-PDF is licensed under **GPL-3.0**.  
Korb Engineering branding and configuration files are proprietary — internal use only.

---

*Korb Engineering — Civil & Pavement Engineering*
