# Korb Engineering tool audit

_Generated 2026-04-15T13:42:48.556Z by `scripts/audit.mjs`. Do not edit by hand._

## Summary

- Total tools scanned: **277**
- Clean (no findings): **109**
- With findings:       **168**

### Findings by tag

| Tag | Count |
|---|---:|
| `[polish]` | 1 |
| `[a11y]` | 146 |
| `[deps]` | 2 |
| `[storage]` | 1 |

## aviation (40 of 58 with findings)

### tools/aviation/360-to-bim.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/aviation/KorbPhotogrammetrySuite.html
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/aviation/ada-compliance-checker.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/aviation/aircraft-maintenance-calculator.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/aviation/airfield-pavement-evaluator.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/aviation/airnav-explorer.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/aviation/alp-tracker.html
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/aviation/aviation-fuel-pricing.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/aviation/aviation-project-planner.html
- `[a11y]` uses native prompt() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/aviation/buildbook-project.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/aviation/contractor-bid-notification.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/aviation/critical-path-method.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/aviation/dbe-calculator.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/aviation/design-aircraft-repository.html
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/aviation/flight-time-logger.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/aviation/fuel-station-designer.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/aviation/geotech-rfp-tool.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/aviation/korb_morse_machine.html
- `[a11y]` uses native prompt() (prefer KorbUI)

### tools/aviation/measurement-annotation-tool.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/aviation/megger-test-report.html
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/aviation/metal-building-selector.html
- `[a11y]` uses native prompt() (prefer KorbUI)

### tools/aviation/metar-decoder.html
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/aviation/npv-irr-calculator.html
- `[a11y]` uses native prompt() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/aviation/omni-calculator.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/aviation/performance-spec-tool.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/aviation/pert-calculator.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/aviation/pipe-sizing-tool.html
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/aviation/pre-flight-checklist.html
- `[a11y]` uses native alert(), confirm(), prompt() (prefer KorbUI)

### tools/aviation/probability-impact-matrix.html
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/aviation/procore-project-manager.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/aviation/proposal-scope-fee.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/aviation/punch-list.html
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/aviation/resource-leveling.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/aviation/rfq-tracker.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/aviation/roi-calculator.html
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/aviation/survey-proposal-tool.html
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/aviation/swot-analysis.html
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/aviation/takeoff-landing-calculator.html
- `[a11y]` uses native prompt() (prefer KorbUI)

### tools/aviation/weight-balance-calculator.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/aviation/wind-rose-generator.html
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

## civil (38 of 61 with findings)

### tools/civil/DailyFieldReport.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/civil/ETAM_Engineering_Evaluation_Tool.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/civil/bid-express.html
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/civil/build-orchestrator.html
- `[a11y]` uses native alert(), confirm(), prompt() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/civil/claim-dispute-drafter.html
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/civil/clause-comparison.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/civil/compliance-checklist.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/civil/construction-estimator.html
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/civil/digital-twin-repository.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/civil/earned-value-mgmt.html
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/civil/eisenhower-matrix.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/civil/erosion-control.html
- `[a11y]` uses native prompt() (prefer KorbUI)

### tools/civil/file-share-tool.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/civil/front-end-documents.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/civil/harrison-latex-editor.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/civil/hec-hms.html
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/civil/invoice-generator.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/civil/kpi-watchdog.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/civil/meeting-minutes.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/civil/monte-carlo-simulation.html
- `[a11y]` uses native alert(), prompt() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/civil/openfoam-cfd.html
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/civil/openproject.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/civil/pci-inspector.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/civil/pdf-editor.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/civil/policy-writer.html
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/civil/rfp-response-generator.html
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/civil/risk-register.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/civil/roomrecon-3d.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/civil/root-cause-analyzer.html
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/civil/scope-gap-detector.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/civil/soil-classification-tool.html
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/civil/spreadsheet-interpreter.html
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/civil/stakeholder-matrix.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/civil/stockpile-volume-scanner.html
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/civil/survey-coordinate-converter.html
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/civil/trend-synthesis.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/civil/unstructured-data-miner.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/civil/wbs-builder.html
- `[a11y]` uses native confirm() (prefer KorbUI)

## misc (74 of 137 with findings)

### tools/misc/3d-print-library.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/TheNutritionTracker3000.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/misc/alans-virtual-caddy.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/alexs-muscle-atlas.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/angry-skeeball.html
- `[deps]` external CDN: cdnjs.cloudflare.com
- `[storage]` localStorage key not prefixed korb_: as_level_progress, as_settings, as_total_score

### tools/misc/anitas-texas-garden.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/misc/app-idea-generator.html
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/misc/aprende-spanish.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/astronomy-essentials.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/audiobook-player.html
- `[a11y]` uses native prompt() (prefer KorbUI)

### tools/misc/build-your-own-korb-site.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/checkers.html
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/misc/clicker-counter.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/connect-four.html
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/misc/copycat-kitchen.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/misc/dev-toolkit.html
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/misc/dfw-events.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/dice-roller.html
- `[a11y]` uses native prompt() (prefer KorbUI)

### tools/misc/digital-library.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/dinner-recommender.html
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/misc/dnd-odyssey.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/misc/dungeon-quest.html
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/misc/ebook-reader.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/enigma-workbench.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/misc/evans-daily-sweepstakes.html
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/misc/evans-zoo-pals 2.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/evans-zoo-pals.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/flowchart-maker.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/formula-forge.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/misc/game-deal-hunter.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/habit-tracker.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/harrison-rocks.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/harrisons-blog.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/harrisons-ipod.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/misc/hendryxs-social-skills.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/home-improvements.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/inbox-sandbox.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/misc/kanban-board.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/misc/kelseys-teacher-tools.html
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/misc/korb-cookbook.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/korb-flowchart-maker.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/misc/korb-party-pack.html
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/misc/korb-world-factbook.html
- `[a11y]` uses native alert() (prefer KorbUI)

### tools/misc/leadership-principles.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/legal-advisor.html
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/misc/mandala-maker.html
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/misc/markdown-editor.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/mary-kays-recipes.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/meal-plan-architect.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/misc/mechanical-football.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/memory-match.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/mexican-grocery-guide.html
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/misc/mind-map.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/minesweeper.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/moving-invoice.html
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/misc/olivias-digital-escape-room.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/painting-studio.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/pdf-markup-studio.html
- `[polish]` viewport lacks viewport-fit=cover (safe-area insets unused)
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[deps]` external CDN: cdnjs.cloudflare.com

### tools/misc/photo-forge.html
- `[a11y]` uses native prompt() (prefer KorbUI)

### tools/misc/pixel-art-editor.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/pomodoro-timer.html
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/misc/retro-arcade.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/sop-creator.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/misc/speak-and-spell.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/spinner-wheel.html
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/misc/spirograph.html
- `[a11y]` uses native prompt() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/misc/spreadsheet-tool.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/misc/text-to-speech.html
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/misc/tip-calculator.html
- `[a11y]` uses native prompt() (prefer KorbUI)

### tools/misc/ultimate-survival-guide.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/vector-drawing.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/whiteboard.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/misc/world-cup-2026.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/world-explorer.html
- `[a11y]` uses native confirm() (prefer KorbUI)

## hk (16 of 21 with findings)

### tools/hk/constraint-optimizer.html
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/hk/content-calendar.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/hk/decision-journal.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/hk/family-coordination.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/hk/harrisons-ipod.html
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/hk/korb-dossier.html
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/hk/meeting-adversary.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/hk/negotiation-simulator.html
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/hk/pre-mortem-generator.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/hk/relationship-tracker.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/hk/scenario-modeler.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/hk/smart-home-automation.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/hk/threat-identifier.html
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent

### tools/hk/travel-planner.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/hk/video-player.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/hk/zoo-tycoon.html
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[xss]` innerHTML write appears near localStorage/JSON.parse — verify escape or use textContent
