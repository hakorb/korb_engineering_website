# Korb Engineering tool audit

_Generated 2026-04-10T18:41:29.442Z by `scripts/audit.mjs`. Do not edit by hand._

## Summary

- Total tools scanned: **248**
- Clean (no findings): **1**
- With findings:       **247**

### Findings by tag

| Tag | Count |
|---|---:|
| `[a11y]` | 399 |
| `[storage]` | 51 |

## aviation (55 of 55 with findings)

### tools/aviation/1980s-calculator.html
- `[a11y]` no <meta name="description">

### tools/aviation/360-photo-stitcher.html
- `[a11y]` no <meta name="description">

### tools/aviation/360-to-bim.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/aviation/KorbPhotogrammetrySuite.html
- `[a11y]` no <meta name="description">

### tools/aviation/Star_Fox_Lite.html
- `[a11y]` no <meta name="description">

### tools/aviation/ada-compliance-checker.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: ada_checklist_state, ada_checklist_meta

### tools/aviation/ai-meeting-note-taker.html
- `[a11y]` no <meta name="description">
- `[storage]` localStorage key not prefixed korb_: ant_key

### tools/aviation/aircraft-maintenance-calculator.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/aviation/airfield-pavement-evaluator.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: ke_pci_sections

### tools/aviation/airnav-explorer.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/aviation/airport-managers-friend.html
- `[a11y]` no <meta name="description">

### tools/aviation/alp-tracker.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)

### tools/aviation/altitude-calculator.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)

### tools/aviation/aviation-fuel-pricing.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/aviation/buildbook-project.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/aviation/contractor-bid-notification.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/aviation/critical-path-method.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/aviation/dbe-calculator.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/aviation/design-aircraft-repository.html
- `[a11y]` no <meta name="description">

### tools/aviation/dxf-viewer.html
- `[a11y]` no <meta name="description">

### tools/aviation/e6b-calculator.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)

### tools/aviation/flight-time-logger.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/aviation/fuel-burn-calculator.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)

### tools/aviation/fuel-station-designer.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/aviation/geotech-rfp-tool.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm(), prompt() (prefer KorbUI)

### tools/aviation/hangar-door-selector.html
- `[a11y]` no <meta name="description">
- `[storage]` localStorage key not prefixed korb_: hds_state

### tools/aviation/holding-pattern-calculator.html
- `[a11y]` no <meta name="description">

### tools/aviation/korb_morse_machine.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), prompt() (prefer KorbUI)

### tools/aviation/measurement-annotation-tool.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/aviation/megger-test-report.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: ke_megger_reports

### tools/aviation/metal-building-selector.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), prompt() (prefer KorbUI)

### tools/aviation/metar-decoder.html
- `[a11y]` no <meta name="description">

### tools/aviation/noise-contour-planner.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)

### tools/aviation/npv-irr-calculator.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native prompt() (prefer KorbUI)

### tools/aviation/omni-calculator.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/aviation/pavement-management-plan.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)

### tools/aviation/performance-spec-tool.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: ke_spec_last_category, ke_spec_history

### tools/aviation/pert-calculator.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/aviation/photogrammetry-studio.html
- `[a11y]` no <meta name="description">

### tools/aviation/pipe-sizing-tool.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/aviation/pre-flight-checklist.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/aviation/procore-project-manager.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/aviation/proposal-scope-fee.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm(), prompt() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: korbProposals

### tools/aviation/punch-list.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/aviation/resource-leveling.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/aviation/rfq-tracker.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/aviation/roi-calculator.html
- `[a11y]` no <meta name="description">

### tools/aviation/sociopath-identifier.html
- `[a11y]` no <meta name="description">

### tools/aviation/survey-proposal-tool.html
- `[a11y]` no <meta name="description">

### tools/aviation/swot-analysis.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/aviation/takeoff-landing-calculator.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), prompt() (prefer KorbUI)

### tools/aviation/time-distance-speed-calculator.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)

### tools/aviation/weight-balance-calculator.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), prompt() (prefer KorbUI)

### tools/aviation/wind-correction-calculator.html
- `[a11y]` no <meta name="description">

### tools/aviation/wind-rose-generator.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: ke_windrose_data

## civil (56 of 56 with findings)

### tools/civil/DailyFieldReport.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: owm_api_key

### tools/civil/ETAM_Engineering_Evaluation_Tool.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: etam_inspection_data

### tools/civil/HECRASOpen.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)

### tools/civil/TXT_2_HTML_tool.html
- `[a11y]` no <meta name="description">

### tools/civil/bid-express.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/civil/brl-cad.html
- `[a11y]` no <meta name="description">

### tools/civil/bulk-field-photos-timestamp-tool.html
- `[a11y]` no <meta name="description">

### tools/civil/capital-planning.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)

### tools/civil/claim-dispute-drafter.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/civil/clause-comparison.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/civil/compliance-checklist.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm(), prompt() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: ke_compliance_history

### tools/civil/construction-estimator.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: ke_cce_custom_templates, ke_cce_index

### tools/civil/contract-simplifier.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)

### tools/civil/digital-twin-repository.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/civil/dwg-viewer.html
- `[a11y]` no <meta name="description">

### tools/civil/dynamic-cip.html
- `[a11y]` no <meta name="description">

### tools/civil/earned-value-mgmt.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/civil/earthwork-grading-calculator.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)

### tools/civil/eisenhower-matrix.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/civil/engineering-unit-converter.html
- `[a11y]` no <meta name="description">
- `[storage]` localStorage key not prefixed korb_: ke_uc_favs, ke_uc_hist

### tools/civil/epanet-water.html
- `[a11y]` no <meta name="description">

### tools/civil/erosion-control.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native prompt() (prefer KorbUI)

### tools/civil/file-share-tool.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/civil/front-end-documents.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/civil/gantt-project.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)

### tools/civil/geospatial-tools.html
- `[a11y]` no <meta name="description">

### tools/civil/harrison-latex-editor.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/civil/hec-hms.html
- `[a11y]` no <meta name="description">

### tools/civil/invoice-generator.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/civil/korb-engineering.html
- `[a11y]` no <meta name="description">

### tools/civil/korb-logo-overlay.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)

### tools/civil/korb-taiga-config.html
- `[a11y]` no <meta name="description">

### tools/civil/kpi-watchdog.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/civil/meeting-minutes.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/civil/meeting.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)

### tools/civil/openfoam-cfd.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)

### tools/civil/openproject.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: op-check-

### tools/civil/pci-inspector.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm(), prompt() (prefer KorbUI)

### tools/civil/pdf-editor.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/civil/policy-writer.html
- `[a11y]` no <meta name="description">
- `[storage]` localStorage key not prefixed korb_: ke-policy-history

### tools/civil/pwl-calculator.html
- `[a11y]` no <meta name="description">

### tools/civil/rfp-response-generator.html
- `[a11y]` no <meta name="description">
- `[storage]` localStorage key not prefixed korb_: ke_rfp_history

### tools/civil/risk-register.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/civil/root-cause-analyzer.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: rca_history

### tools/civil/scope-creep-counselor.html
- `[a11y]` no <meta name="description">

### tools/civil/scope-gap-detector.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: sgd_checklist, sgd_history

### tools/civil/soil-classification-tool.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/civil/spreadsheet-interpreter.html
- `[a11y]` no <meta name="description">
- `[storage]` localStorage key not prefixed korb_: ke_spreadsheet_recent

### tools/civil/stakeholder-matrix.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm(), prompt() (prefer KorbUI)

### tools/civil/stormwater-drainage-calculator.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)

### tools/civil/structural-steel-calculator.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)

### tools/civil/submittal-review.html
- `[a11y]` no <meta name="description">

### tools/civil/survey-coordinate-converter.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)

### tools/civil/trend-synthesis.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/civil/unstructured-data-miner.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/civil/wbs-builder.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

## misc (115 of 116 with findings)

### tools/misc/2048.html
- `[a11y]` no <meta name="description">
- `[storage]` localStorage key not prefixed korb_: 2048_best

### tools/misc/2d-to-3d-generator.html
- `[a11y]` no <meta name="description">

### tools/misc/3d-print-library.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/TheNutritionTracker3000.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: nutrition-tracker-theme

### tools/misc/age-of-castles.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)

### tools/misc/ai-tax-counsel.html
- `[a11y]` no <meta name="description">

### tools/misc/ajs-synthesizer.html
- `[a11y]` no <meta name="description">

### tools/misc/alans-virtual-caddy.html
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: vcaddy_state, vcaddy_greens

### tools/misc/anitas-texas-garden.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm(), prompt() (prefer KorbUI)

### tools/misc/app-idea-generator.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/aprende-spanish.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/misc/audiobook-player.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), prompt() (prefer KorbUI)

### tools/misc/backyard-baseball.html
- `[a11y]` no <meta name="description">
- `[storage]` localStorage key not prefixed korb_: byb_season2

### tools/misc/battleship.html
- `[a11y]` no <meta name="description">

### tools/misc/bloomberg-terminal.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: kt_alerts, kt_watchlist, kt_portfolio

### tools/misc/book-digitizer.html
- `[a11y]` no <meta name="description">

### tools/misc/build-your-own-korb-site.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/checkers.html
- `[a11y]` no <meta name="description">

### tools/misc/chess.html
- `[a11y]` no <meta name="description">

### tools/misc/chinese-checkers.html
- `[a11y]` no <meta name="description">

### tools/misc/clicker-counter.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/clock-stopwatch.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)

### tools/misc/color-palette.html
- `[a11y]` no <meta name="description">

### tools/misc/connect-four.html
- `[a11y]` no <meta name="description">

### tools/misc/copycat-kitchen.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/misc/crossword.html
- `[a11y]` no <meta name="description">

### tools/misc/dev-toolkit.html
- `[a11y]` no <meta name="description">

### tools/misc/dfw-earth-day-game.html
- `[a11y]` no <meta name="description">

### tools/misc/dfw-events.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/dice-roller.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), prompt() (prefer KorbUI)

### tools/misc/digital-library.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/misc/dinner-recommender.html
- `[a11y]` no <meta name="description">

### tools/misc/dnd-odyssey.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm(), prompt() (prefer KorbUI)

### tools/misc/drawing-challenge.html
- `[a11y]` no <meta name="description">

### tools/misc/drum-machine.html
- `[a11y]` no <meta name="description">

### tools/misc/dungeon-quest.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: dq_autosave, dq_save_

### tools/misc/ebook-reader.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/fidget-spinner.html
- `[a11y]` no <meta name="description">

### tools/misc/file-converter.html
- `[a11y]` no <meta name="description">

### tools/misc/file-toolbox.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)

### tools/misc/flowchart-maker.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/misc/formula-forge.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/misc/frisco-weather.html
- `[a11y]` no <meta name="description">
- `[storage]` localStorage key not prefixed korb_: frisco-wx-settings

### tools/misc/frogger.html
- `[a11y]` no <meta name="description">

### tools/misc/game-deal-hunter.html
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/guitar-tuner.html
- `[a11y]` no <meta name="description">

### tools/misc/habit-tracker.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/harrisons-blog.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/misc/hendryxs-social-skills.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/home-improvements.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/horse-racing.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)

### tools/misc/inbox-sandbox.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/misc/jung-ho-bridge.html
- `[a11y]` no <meta name="description">

### tools/misc/kanban-board.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm(), prompt() (prefer KorbUI)

### tools/misc/korb-cookbook.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/misc/korb-farm-collective.html
- `[a11y]` no <meta name="description">

### tools/misc/korb-flowchart-maker.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/misc/kyles-train-set.html
- `[a11y]` no <meta name="description">

### tools/misc/leadership-principles.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/legal-advisor.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: kla_state, kla_checklists, kla_notes (+1 more)

### tools/misc/lunar-lander.html
- `[a11y]` no <meta name="description">

### tools/misc/mandala-maker.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/markdown-editor.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/mary-kays-recipes.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/misc/meal-plan-architect.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/misc/meme-generator.html
- `[a11y]` no <meta name="description">
- `[storage]` localStorage key not prefixed korb_: korb-mematic-recent, korb-mematic-prefs

### tools/misc/memory-match.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/metronome.html
- `[a11y]` no <meta name="description">

### tools/misc/mexican-grocery-guide.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/mind-map.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/misc/minesweeper.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: minesweeper_stats

### tools/misc/moving-invoice.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: movingInvoices

### tools/misc/muscle-atlas.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/misc/music-library.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/misc/olivias-digital-escape-room.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/orcaslicer_studio.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: orca_api_key, orca_chat_model

### tools/misc/painting-studio.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/paper-io.html
- `[a11y]` no <meta name="description">

### tools/misc/password-forge.html
- `[a11y]` no <meta name="description">

### tools/misc/photo-forge.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native prompt() (prefer KorbUI)

### tools/misc/piano.html
- `[a11y]` no <meta name="description">

### tools/misc/pixel-art-editor.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: korb-pixel-art

### tools/misc/podcast-player.html
- `[a11y]` no <meta name="description">

### tools/misc/pomodoro-timer.html
- `[a11y]` no <meta name="description">
- `[storage]` localStorage key not prefixed korb_: pomodoro_stats, pomodoro_settings

### tools/misc/pong.html
- `[a11y]` no <meta name="description">

### tools/misc/qr-generator.html
- `[a11y]` no <meta name="description">

### tools/misc/quick-reference-guide.html
- `[a11y]` no <meta name="description">

### tools/misc/retro-arcade.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/scandinavian-interior-design.html
- `[a11y]` no <meta name="description">
- `[storage]` localStorage key not prefixed korb_: scandi_rooms

### tools/misc/screen-recorder.html
- `[a11y]` no <meta name="description">

### tools/misc/simon.html
- `[a11y]` no <meta name="description">
- `[storage]` localStorage key not prefixed korb_: simon-high-score

### tools/misc/situation-monitor.html
- `[a11y]` no <meta name="description">

### tools/misc/snake.html
- `[a11y]` no <meta name="description">

### tools/misc/solitaire.html
- `[a11y]` no <meta name="description">

### tools/misc/soundboard.html
- `[a11y]` no <meta name="description">

### tools/misc/speak-and-spell.html
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/misc/spinner-wheel.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/misc/spirograph.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native prompt() (prefer KorbUI)

### tools/misc/spreadsheet-tool.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)

### tools/misc/sudoku.html
- `[a11y]` no <meta name="description">
- `[storage]` localStorage key not prefixed korb_: sudoku_stats

### tools/misc/tanks.html
- `[a11y]` no <meta name="description">
- `[storage]` localStorage key not prefixed korb_: tanks_records

### tools/misc/tetris.html
- `[a11y]` no <meta name="description">
- `[storage]` localStorage key not prefixed korb_: tetris_high

### tools/misc/text-to-speech.html
- `[a11y]` no <meta name="description">
- `[storage]` localStorage key not prefixed korb_: tts_history

### tools/misc/the-void.html
- `[a11y]` no <meta name="description">

### tools/misc/tic-tac-toe.html
- `[a11y]` no <meta name="description">

### tools/misc/tip-calculator.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native prompt() (prefer KorbUI)

### tools/misc/typing-test.html
- `[a11y]` no <meta name="description">
- `[storage]` localStorage key not prefixed korb_: ke_typing_records, ke_typing_history

### tools/misc/vector-drawing.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/video-conferencing.html
- `[a11y]` no <meta name="description">

### tools/misc/vintage-web-game-vault.html
- `[a11y]` no <meta name="description">

### tools/misc/whiteboard.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm(), prompt() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: ke_whiteboard_boards, ke_whiteboard_active

### tools/misc/word-puzzle.html
- `[a11y]` no <meta name="description">

### tools/misc/world-explorer.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/misc/youtube-to-mp3.html
- `[a11y]` no <meta name="description">

### tools/misc/youtube-to-mp4.html
- `[a11y]` no <meta name="description">

## hk (21 of 21 with findings)

### tools/hk/constraint-optimizer.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: korbOptHistory

### tools/hk/content-calendar.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: cc_items, cc_metrics, cc_strategy

### tools/hk/decision-journal.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/hk/email-client.html
- `[a11y]` no <meta name="description">

### tools/hk/family-coordination.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/hk/financial-planner.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: fp_

### tools/hk/gift-finder.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: giftFinderState

### tools/hk/harrisons-ipod.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm(), prompt() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: ipod_shuffle, ipod_repeat, ipod_eq (+1 more)

### tools/hk/korb-dossier.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert() (prefer KorbUI)

### tools/hk/korb-metadata-scrubber.html
- `[a11y]` no <meta name="description">

### tools/hk/meeting-adversary.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: ma-history

### tools/hk/negotiation-simulator.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: neg_history

### tools/hk/pre-mortem-generator.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: ke_premortem_history

### tools/hk/relationship-tracker.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/hk/scenario-modeler.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/hk/shopping-decision-engine.html
- `[a11y]` no <meta name="description">
- `[storage]` localStorage key not prefixed korb_: sde_history

### tools/hk/smart-home-automation.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/hk/threat-identifier.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)
- `[storage]` localStorage key not prefixed korb_: threatIdIPHistory, threatIdLog

### tools/hk/travel-planner.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native alert(), confirm() (prefer KorbUI)

### tools/hk/video-player.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)

### tools/hk/zoo-tycoon.html
- `[a11y]` no <meta name="description">
- `[a11y]` uses native confirm() (prefer KorbUI)
