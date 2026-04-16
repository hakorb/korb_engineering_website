/* ============================================
   Korb.Engineering — Single Page Application
   VFD / Segmented Display Edition
   ============================================ */

// --- Security: SHA-256 hash for password gates ---
async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// --- Security: HTML escape for anything interpolated into template strings
// that will become innerHTML. Used for tool.name / tool.file in the iframe
// embed paths. SECTIONS is hand-maintained so this is defense-in-depth, but
// the auto-generated subfolder data and future dynamic sources make this
// worth having. SECURITY-REVIEW M3. ---
function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

// --- Header K logo SVG (reused for Civil Engineering tile) ---
// Charlemagne / Carolingian inspired K with serif details
const K_LOGO_SVG = `<svg viewBox="0 0 85 100" fill="currentColor" aria-hidden="true">
  <rect x="4" y="6" width="14" height="88" rx="1"/>
  <rect x="0" y="4" width="22" height="7" rx="1"/>
  <rect x="0" y="89" width="22" height="7" rx="1"/>
  <path d="M18 50 C32 48 50 30 72 8 L85 8 L85 16 C64 34 40 50 18 50Z"/>
  <rect x="67" y="4" width="18" height="7" rx="1"/>
  <path d="M18 50 C40 50 64 66 85 84 L85 92 L72 92 C50 70 32 52 18 50Z"/>
  <rect x="67" y="89" width="18" height="7" rx="1"/>
</svg>`;

// --- Data ---
const SECTIONS = {
  aviation: {
    title: '',
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 4 L25.5 10 L25.5 34 L26 38 L25 42 L24 44 L23 42 L22 38 L22.5 34 L22.5 10 Z" stroke-width="1.2"/>
      <path d="M22.5 18 L3 22 L3 23.5 L22.5 22" stroke-width="1.2"/>
      <path d="M25.5 18 L45 22 L45 23.5 L25.5 22" stroke-width="1.2"/>
      <path d="M22.5 38 L14 40 L14 41 L22.5 40" stroke-width="1"/>
      <path d="M25.5 38 L34 40 L34 41 L25.5 40" stroke-width="1"/>
      <line x1="24" y1="36" x2="24" y2="42" stroke-width="1.8"/>
      <ellipse cx="24" cy="5" rx="5" ry="1.5" stroke-width="0.8" opacity="0.5"/>
      <ellipse cx="24" cy="14" rx="1.5" ry="2.5" stroke-width="0.7" opacity="0.5"/>
    </svg>`,
    tools: [
      { name: '360° Photo Stitcher', file: './tools/aviation/360-photo-stitcher.html' },
      { name: '360° to BIM Model', file: './tools/aviation/360-to-bim.html' },
      { name: 'ADA Compliance Checker', file: './tools/aviation/ada-compliance-checker.html' },
      { name: 'AI Meeting Note Taker', file: './tools/aviation/ai-meeting-note-taker.html' },
      { name: 'Aircraft Maintenance Calculator', file: './tools/aviation/aircraft-maintenance-calculator.html' },
      { name: 'Airfield Info', file: './tools/aviation/airnav-explorer.html' },
      { name: "Airport Manager's Friend", file: './tools/aviation/airport-managers-friend.html' },
      { name: 'ALP Guidance', file: './tools/aviation/alp-tracker.html' },
      { name: 'Altitude Calculator', file: './tools/aviation/altitude-calculator.html' },
      { name: 'Aviation Fuel Pricing', file: './tools/aviation/aviation-fuel-pricing.html' },
      { name: 'Aviation Project Planner', file: './tools/aviation/aviation-project-planner.html' },
      { name: 'BRL-CAD', file: './tools/civil/brl-cad.html' },
      { name: 'Build Orchestrator', file: './tools/civil/build-orchestrator.html' },
      { name: 'BuildBook Project', file: './tools/aviation/buildbook-project.html' },
      { name: 'Bulk Photo Timestamp', file: './tools/civil/bulk-field-photos-timestamp-tool.html' },
      { name: 'Capital Improvement Planner (CIP)', file: './tools/civil/capital-planning.html' },
      { name: 'Compliance Checklist', file: './tools/civil/compliance-checklist.html' },
      { name: 'Construction Commander', file: './tools/aviation/procore-project-manager.html' },
      { name: 'Construction Estimator', file: './tools/civil/construction-estimator.html' },
      { name: 'Contractor Background Check', file: './tools/civil/contractor-background-check.html' },
      { name: 'Contract Simplifier', file: './tools/civil/contract-simplifier.html' },
      { name: 'Contractor Bid Notification', file: './tools/aviation/contractor-bid-notification.html' },
      { name: 'Critical Path Method', file: './tools/aviation/critical-path-method.html' },
      { name: 'Daily Field Report', file: './tools/civil/DailyFieldReport.html' },
      { name: 'DBE Participation Calculator', file: './tools/aviation/dbe-calculator.html' },
      { name: 'Design Aircraft Repository', file: './tools/aviation/design-aircraft-repository.html' },
      { name: 'DFW Earth-Day Game', file: './tools/misc/dfw-earth-day-game.html' },
      { name: 'DXF Viewer', file: './tools/aviation/dxf-viewer.html' },
      { name: 'E6B Calculator', file: './tools/aviation/e6b-calculator.html' },
      { name: 'Earned Value Mgmt', file: './tools/civil/earned-value-mgmt.html' },
      { name: 'Erosion Control', file: './tools/civil/erosion-control.html' },
      { name: 'Facility Evaluation Tool', file: './tools/civil/ETAM_Engineering_Evaluation_Tool.html' },
      { name: 'Flight Time Logger', file: './tools/aviation/flight-time-logger.html' },
      { name: 'Front End Documents', file: './tools/civil/front-end-documents.html' },
      { name: 'Fuel Burn Calculator', file: './tools/aviation/fuel-burn-calculator.html' },
      { name: 'Fuel Station Designer', file: './tools/aviation/fuel-station-designer.html' },
      { name: 'Gantt Project', file: './tools/civil/gantt-project.html' },
      { name: 'Geospatial Tools', file: './tools/civil/geospatial-tools.html' },
      { name: 'Geotech Investigation RFP', file: './tools/aviation/geotech-rfp-tool.html' },
      { name: 'Graphing Calculator', file: './tools/aviation/1980s-calculator.html' },
      { name: 'Hangar Door Selector', file: './tools/aviation/hangar-door-selector.html' },
      { name: 'Holding Pattern Calculator', file: './tools/aviation/holding-pattern-calculator.html' },
      { name: 'Kanban Board', file: './tools/misc/kanban-board.html' },
      { name: 'Legal Advisor', file: './tools/misc/legal-advisor.html' },
      { name: 'Measurement & Annotation', file: './tools/aviation/measurement-annotation-tool.html' },
      { name: 'Meeting Recorder', file: './tools/civil/meeting.html' },
      { name: 'Megger Test Report', file: './tools/aviation/megger-test-report.html' },
      { name: 'Metal Building Selector', file: './tools/aviation/metal-building-selector.html' },
      { name: 'METAR/TAF Decoder', file: './tools/aviation/metar-decoder.html' },
      { name: 'Morse Machine', file: './tools/aviation/korb_morse_machine.html' },
      { name: 'Noise Contour Planner', file: './tools/aviation/noise-contour-planner.html' },
      { name: 'NPV/IRR Calculator', file: './tools/aviation/npv-irr-calculator.html' },
      { name: 'Omni Calculator', file: './tools/aviation/omni-calculator.html' },
      { name: 'OSHA Reference Guide', file: './tools/aviation/osha-reference-guide.html' },
      { name: 'Online Bidder', file: './tools/civil/bid-express.html' },
      { name: 'OpenProject', file: './tools/civil/openproject.html' },
      { name: 'Pavement Evaluator', file: './tools/aviation/airfield-pavement-evaluator.html' },
      { name: 'Pavement Management Plan', file: './tools/aviation/pavement-management-plan.html' },
      { name: 'PDF Editor', file: './tools/civil/pdf-editor.html' },
      { name: 'Performance Spec', file: './tools/aviation/performance-spec-tool.html' },
      { name: 'PERT Calculator', file: './tools/aviation/pert-calculator.html' },
      { name: 'Photogrammetry Studio', file: './tools/aviation/photogrammetry-studio.html' },
      { name: 'Photogrammetry Suite', file: './tools/aviation/KorbPhotogrammetrySuite.html' },
      { name: 'Pomodoro Timer', file: './tools/misc/pomodoro-timer.html' },
      { name: 'Pre-Flight Checklist', file: './tools/aviation/pre-flight-checklist.html' },
      { name: 'Probability Impact Matrix', file: './tools/aviation/probability-impact-matrix.html' },
      { name: 'Proposal Scope & Fee Generator', file: './tools/aviation/proposal-scope-fee.html' },
      { name: 'Punch List', file: './tools/aviation/punch-list.html' },
      { name: 'PWL Calculator', file: './tools/civil/pwl-calculator.html' },
      { name: 'QR Generator', file: './tools/misc/qr-generator.html' },
      { name: 'Resource Leveling', file: './tools/aviation/resource-leveling.html' },
      { name: 'RFP Response Generator', file: './tools/civil/rfp-response-generator.html' },
      { name: 'RFQ Tracker', file: './tools/aviation/rfq-tracker.html' },
      { name: 'ROI Calculator', file: './tools/aviation/roi-calculator.html' },
      { name: 'Scope Creep Counselor', file: './tools/civil/scope-creep-counselor.html' },
      { name: 'Scope Gap Detector', file: './tools/civil/scope-gap-detector.html' },
      { name: 'Sociopath Identifier', file: './tools/aviation/sociopath-identifier.html' },
      { name: 'Submittal Review', file: './tools/civil/submittal-review.html' },
      { name: 'Survey Proposal Generator', file: './tools/aviation/survey-proposal-tool.html' },
      { name: 'SWOT Analysis', file: './tools/aviation/swot-analysis.html' },
      { name: 'Taiga Scrum Config', file: './tools/civil/korb-taiga-config.html' },
      { name: 'Takeoff/Landing Distance', file: './tools/aviation/takeoff-landing-calculator.html' },
      { name: 'Time-Distance-Speed Calculator', file: './tools/aviation/time-distance-speed-calculator.html' },
      { name: 'Unit Converter', file: './tools/civil/engineering-unit-converter.html' },
      { name: 'Video Conference', file: './tools/misc/video-conferencing.html' },
      { name: 'Weight & Balance', file: './tools/aviation/weight-balance-calculator.html' },
      { name: 'Wind Correction Calculator', file: './tools/aviation/wind-correction-calculator.html' },
      { name: 'Wind Rose Generator', file: './tools/aviation/wind-rose-generator.html' }
    ]
  },
  civil: {
    title: '',
    icon: K_LOGO_SVG,
    tools: [
      { name: 'Build Orchestrator', file: './tools/civil/korb-engineering.html' },
      { name: 'Claim/Dispute Drafter', file: './tools/civil/claim-dispute-drafter.html' },
      { name: 'Clause Comparison', file: './tools/civil/clause-comparison.html' },
      { name: 'Digital Twin Repository', file: './tools/civil/digital-twin-repository.html' },
      { name: 'DWG Viewer', file: './tools/civil/dwg-viewer.html' },
      { name: 'Dynamic CIP', file: './tools/civil/dynamic-cip.html' },
      { name: 'Earthwork & Grading Calculator', file: './tools/civil/earthwork-grading-calculator.html' },
      { name: 'Eisenhower Priority Matrix', file: './tools/civil/eisenhower-matrix.html' },
      { name: 'EPANet Water', file: './tools/civil/epanet-water.html' },
      { name: 'File Share', file: './tools/civil/file-share-tool.html' },
      { name: 'HEC-HMS', file: './tools/civil/hec-hms.html' },
      { name: 'HEC-RAS Open', file: './tools/civil/HECRASOpen.html' },
      { name: 'Invoice Generator', file: './tools/civil/invoice-generator.html' },
      { name: 'KPI Watchdog', file: './tools/civil/kpi-watchdog.html' },
      { name: 'LaTeX Editor', file: './tools/civil/harrison-latex-editor.html' },
      { name: 'Logo Overlay', file: './tools/civil/korb-logo-overlay.html' },
      { name: 'Meeting Minutes', file: './tools/civil/meeting-minutes.html' },
      { name: 'Monte Carlo Simulation', file: './tools/civil/monte-carlo-simulation.html' },
      { name: 'OpenFOAM CFD', file: './tools/civil/openfoam-cfd.html' },
      { name: 'PCI Inspector', file: './tools/civil/pci-inspector.html' },
      { name: 'Policy Writer', file: './tools/civil/policy-writer.html' },
      { name: 'Risk Register', file: './tools/civil/risk-register.html' },
      { name: 'RoomRecon 3D', file: './tools/civil/roomrecon-3d.html' },
      { name: 'Root Cause Analyzer', file: './tools/civil/root-cause-analyzer.html' },
      { name: 'Soil Classification Tool', file: './tools/civil/soil-classification-tool.html' },
      { name: 'Spreadsheet Interpreter', file: './tools/civil/spreadsheet-interpreter.html' },
      { name: 'Stakeholder Matrix', file: './tools/civil/stakeholder-matrix.html' },
      { name: 'Stockpile Volume Scanner', file: './tools/civil/stockpile-volume-scanner.html' },
      { name: 'Stormwater Drainage Calculator', file: './tools/civil/stormwater-drainage-calculator.html' },
      { name: 'Structural Steel Calculator', file: './tools/civil/structural-steel-calculator.html' },
      { name: 'Survey Coordinate Converter', file: './tools/civil/survey-coordinate-converter.html' },
      { name: 'Trend Synthesis', file: './tools/civil/trend-synthesis.html' },
      { name: 'TXT to HTML', file: './tools/civil/TXT_2_HTML_tool.html' },
      { name: 'Unstructured Data Miner', file: './tools/civil/unstructured-data-miner.html' },
      { name: 'WBS Builder', file: './tools/civil/wbs-builder.html' }
    ]
  },
  hk: {
    title: 'HK',
    icon: `<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="6" y="16" width="24" height="16" rx="3"/>
      <path d="M12 16V10a6 6 0 0112 0v6"/>
      <circle cx="18" cy="25" r="2"/>
      <path d="M18 27v2"/>
    </svg>`,
    locked: true,
    _hash: 'f1535ce1805987f0d854e54688476a02d14f33b47db57f26d17237b390960a47',
    tools: [
      { name: 'Email Client', file: './tools/hk/email-client.html' },
      { name: 'Family Coordination', file: './tools/hk/family-coordination.html' },
      { name: 'Korb Dossier', file: './tools/hk/korb-dossier.html' },
      { name: 'Korb Travel', file: './tools/hk/super-secret-access/tripit-clone.html' },
      { name: 'Korb Zoo Tycoon', file: './tools/hk/zoo-tycoon.html' },
      { name: 'Metadata Scrubber', file: './tools/hk/korb-metadata-scrubber.html' },
      { name: 'Parkhill Command Center', file: './tools/hk/parkhill-command-center.html' },
      { name: 'Threat Source Identifier', file: './tools/hk/threat-identifier.html' },
      { name: 'Travel Planner', file: './tools/hk/travel-planner.html' },
      { name: 'Video Player', file: './tools/hk/video-player.html' }
    ]
  },
  misc: {
    title: '',
    icon: `<svg viewBox="0 0 48 42" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <path d="M1 26 L6 26 L14 40 L28 4" stroke-width="1.8" fill="none"/>
      <line x1="28" y1="4" x2="47" y2="4" stroke-width="1.8"/>
      <text x="37" y="28" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" fill="currentColor" stroke="none" text-anchor="middle">-1</text>
    </svg>`,
    tools: [
      { name: '2001: A D&D Odyssey', file: './tools/misc/dnd-odyssey.html' },
      { name: '2048', file: './tools/misc/2048.html' },
      { name: '2D to 3D Generator', file: './tools/misc/2d-to-3d-generator.html' },
      { name: 'Age of Castles', file: './tools/misc/age-of-castles.html' },
      { name: '3D Print Library', file: './tools/misc/3d-print-library.html' },
      { name: 'AI Tax Counsel', file: './tools/misc/ai-tax-counsel.html' },
      { name: "AJ's Synthesizer", file: './tools/misc/ajs-synthesizer.html' },
      { name: "Alan's Virtual Caddy", file: './tools/misc/alans-virtual-caddy.html' },
      { name: 'Angry Skeeball', file: './tools/misc/angry-skeeball.html' },
      { name: "Anita's Texas Garden", file: './tools/misc/anitas-texas-garden.html' },
      { name: 'App Idea Generator', file: './tools/misc/app-idea-generator.html' },
      { name: 'Aprende Spanish', file: './tools/misc/aprende-spanish.html' },
      { name: 'Astronomy Essentials', file: './tools/misc/astronomy-essentials.html' },
      { name: 'Audiobook Player', file: './tools/misc/audiobook-player.html' },
      { name: 'Awesome-O 4000', file: './tools/misc/awesome-o-4000.html' },
      { name: 'Backyard Baseball', file: './tools/misc/backyard-baseball.html' },
      { name: 'Battleship', file: './tools/misc/battleship.html' },
      { name: 'Book Digitizer', file: './tools/misc/book-digitizer.html' },
      { name: 'Build Your Own Korb Site', file: './tools/misc/build-your-own-korb-site.html' },
      { name: 'Checkers', file: './tools/misc/checkers.html' },
      { name: 'Chess', file: './tools/misc/chess.html' },
      { name: 'Chinese Checkers', file: './tools/misc/chinese-checkers.html' },
      { name: 'Clicker Counter', file: './tools/misc/clicker-counter.html' },
      { name: 'Clock & Stopwatch', file: './tools/misc/clock-stopwatch.html' },
      { name: 'Color Palette', file: './tools/misc/color-palette.html' },
      { name: 'Complaints Department', file: './tools/misc/complaints-department.html' },
      { name: 'Connect Four', file: './tools/misc/connect-four.html' },
      { name: 'Copycat Kitchen', file: './tools/misc/copycat-kitchen.html' },
      { name: 'Crossword', file: './tools/misc/crossword.html' },
      { name: 'Deal Hunter', file: './tools/misc/game-deal-hunter.html' },
      { name: 'Dev Toolkit', file: './tools/misc/dev-toolkit.html' },
      { name: 'DFW Events & Deals', file: './tools/misc/dfw-events.html' },
      { name: 'Dice Roller', file: './tools/misc/dice-roller.html' },
      { name: 'Dinner Recommender', file: './tools/misc/dinner-recommender.html' },
      { name: 'Drawing Challenge', file: './tools/misc/drawing-challenge.html' },
      { name: 'Drum Machine', file: './tools/misc/drum-machine.html' },
      { name: 'Dungeon Quest', file: './tools/misc/dungeon-quest.html' },
      { name: 'Ebook Reader', file: './tools/misc/ebook-reader.html' },
      { name: 'Enigma Workbench', file: './tools/misc/enigma-workbench.html' },
      { name: "Evan's Daily Sweepstakes", file: './tools/misc/evans-daily-sweepstakes.html' },
      { name: "Evan's Zoo Pals", file: './tools/misc/evans-zoo-pals.html' },
      { name: 'Fidget Spinner', file: './tools/misc/fidget-spinner.html' },
      { name: 'File Converter', file: './tools/misc/file-converter.html' },
      { name: 'File Toolbox', file: './tools/misc/file-toolbox.html' },
      { name: 'Flowchart Maker', file: './tools/misc/flowchart-maker.html' },
      { name: 'Formula Forge', file: './tools/misc/formula-forge.html' },
      { name: 'Frisco Weather', file: './tools/misc/frisco-weather.html' },
      { name: 'Frogger', file: './tools/misc/frogger.html' },
      { name: 'Guitar Tuner', file: './tools/misc/guitar-tuner.html' },
      { name: 'Habit Tracker', file: './tools/misc/habit-tracker.html' },
      { name: 'Harrison Rocks', file: './tools/misc/harrison-rocks.html' },
      { name: "Harrison's Blog", file: './tools/misc/harrisons-blog.html' },
      { name: "Harrison's iPod", file: './tools/misc/harrisons-ipod.html' },
      { name: "Hendryx's Social Skills", file: './tools/misc/hendryxs-social-skills.html' },
      { name: 'Home Improvements Guide', file: './tools/misc/home-improvements.html' },
      { name: 'Horse Racing', file: './tools/misc/horse-racing.html' },
      { name: 'Inbox Sandbox', file: './tools/misc/inbox-sandbox.html' },
      { name: 'International Radio', file: './tools/misc/international-radio.html' },
      { name: 'Jung-Ho Bridge', file: './tools/misc/jung-ho-bridge.html' },
      { name: "Kelsey's Teacher Tools", file: './tools/misc/kelseys-teacher-tools.html' },
      { name: 'Korb Cookbook', file: './tools/misc/korb-cookbook.html' },
      { name: 'Korb Data Vault', file: './tools/misc/korb-data-vault.html' },
      { name: 'Korb Digital Lending Library', file: './tools/misc/digital-library.html' },
      { name: 'Korb Farm Collective', file: './tools/misc/korb-farm-collective.html' },
      { name: 'Korb Flow Chart Maker', file: './tools/misc/korb-flowchart-maker.html' },
      { name: 'Korb Mematic', file: './tools/misc/meme-generator.html' },
      { name: 'Korb Party Pack', file: './tools/misc/korb-party-pack.html' },
      { name: 'Korb Terminal', file: './tools/misc/bloomberg-terminal.html' },
      { name: 'Korb World Factbook', file: './tools/misc/korb-world-factbook.html' },
      { name: 'Kurbstompin Patent Search', file: './tools/misc/kurbstompin-patent-search.html' },
      { name: "Kyle's Train Set", file: './tools/misc/kyles-train-set.html' },
      { name: 'Leadership Forge', file: './tools/misc/leadership-principles.html' },
      { name: 'Lunar Lander', file: './tools/misc/lunar-lander.html' },
      { name: 'Mandala Maker', file: './tools/misc/mandala-maker.html' },
      { name: 'Markdown Editor', file: './tools/misc/markdown-editor.html' },
      { name: "Mary Kay's Recipes", file: './tools/misc/mary-kays-recipes.html' },
      { name: 'Meal Plan Architect', file: './tools/misc/meal-plan-architect.html' },
      { name: 'Mechanical Football', file: './tools/misc/mechanical-football.html' },
      { name: 'Memory Match', file: './tools/misc/memory-match.html' },
      { name: 'Metronome', file: './tools/misc/metronome.html' },
      { name: 'Mexican Grocery Guide', file: './tools/misc/mexican-grocery-guide.html' },
      { name: 'Mind Map', file: './tools/misc/mind-map.html' },
      { name: 'Minesweeper', file: './tools/misc/minesweeper.html' },
      { name: 'Moving Specialist Invoice', file: './tools/misc/moving-invoice.html' },
      { name: "Alex's Muscle Atlas", file: './tools/misc/alexs-muscle-atlas.html' },
      { name: 'Nutrition Tracker 3000', file: './tools/misc/TheNutritionTracker3000.html' },
      { name: "Olivia's Digital Escape Room", file: './tools/misc/olivias-digital-escape-room.html' },
      { name: 'OrcaSlicer Studio', file: './tools/misc/orcaslicer_studio.html' },
      { name: 'Painting Studio', file: './tools/misc/painting-studio.html' },
      { name: 'Password Forge', file: './tools/misc/password-forge.html' },
      { name: 'PDF Markup Studio', file: './tools/misc/pdf-markup-studio.html' },
      { name: 'Photo Forge', file: './tools/misc/photo-forge.html' },
      { name: 'Piano', file: './tools/misc/piano.html' },
      { name: 'Pipe Sizing Tool', file: './tools/aviation/pipe-sizing-tool.html' },
      { name: 'Pixel Art Editor', file: './tools/misc/pixel-art-editor.html' },
      { name: 'Podcast Player', file: './tools/misc/podcast-player.html' },
      { name: 'Pong', file: './tools/misc/pong.html' },
      { name: 'Quick Reference Guide', file: './tools/misc/quick-reference-guide.html' },
      { name: 'Retro Arcade', file: './tools/misc/retro-arcade.html' },
      { name: 'Rigged Roulette', file: './tools/misc/rigged-roulette.html' },
      { name: 'Scandinavian Interior Design', file: './tools/misc/scandinavian-interior-design.html' },
      { name: 'Screen Recorder', file: './tools/misc/screen-recorder.html' },
      { name: 'Simon', file: './tools/misc/simon.html' },
      { name: 'Situation Monitor', file: './tools/misc/situation-monitor.html' },
      { name: 'Snake', file: './tools/misc/snake.html' },
      { name: 'SOP Creator', file: './tools/misc/sop-creator.html' },
      { name: 'Solitaire', file: './tools/misc/solitaire.html' },
      { name: 'Soundboard', file: './tools/misc/soundboard.html' },
      { name: 'Speak & Spell', file: './tools/misc/speak-and-spell.html' },
      { name: 'Spinner Wheel', file: './tools/misc/spinner-wheel.html' },
      { name: 'Spirograph', file: './tools/misc/spirograph.html' },
      { name: 'Spreadsheet Tool', file: './tools/misc/spreadsheet-tool.html' },
      { name: 'Star Fox Lite', file: './tools/aviation/Star_Fox_Lite.html' },
      { name: 'Sudoku', file: './tools/misc/sudoku.html' },
      { name: 'Tanks', file: './tools/misc/tanks.html' },
      { name: 'Territory Wars', file: './tools/misc/paper-io.html' },
      { name: 'Tetris', file: './tools/misc/tetris.html' },
      { name: 'Text to Speech', file: './tools/misc/text-to-speech.html' },
      { name: 'The Void', file: './tools/misc/the-void.html' },
      { name: 'Tic Tac Toe', file: './tools/misc/tic-tac-toe.html' },
      { name: 'Tip Calculator', file: './tools/misc/tip-calculator.html' },
      { name: 'Typing Test', file: './tools/misc/typing-test.html' },
      { name: 'Ultimate Survival Guide', file: './tools/misc/ultimate-survival-guide.html' },
      { name: 'Vector Drawing', file: './tools/misc/vector-drawing.html' },
      { name: 'Vintage Web Game Vault', file: './tools/misc/vintage-web-game-vault.html' },
      { name: 'Whiteboard', file: './tools/misc/whiteboard.html' },
      { name: 'World Cup 2026', file: './tools/misc/world-cup-2026.html' },
      { name: 'World Explorer', file: './tools/misc/world-explorer.html' },
      { name: 'World Travel Guide', file: './tools/misc/world-travel-guide.html' },
      { name: 'Word Puzzle', file: './tools/misc/word-puzzle.html' },
      { name: 'YT2MP3', file: './tools/misc/youtube-to-mp3.html' },
      { name: 'YT2MP4', file: './tools/misc/youtube-to-mp4.html' }
    ]
  }
};

// --- Dark mode locked ---
document.documentElement.setAttribute('data-theme', 'dark');

// --- Router ---
function getRoute() {
  return location.hash.replace('#', '') || 'home';
}

function navigate(route) {
  location.hash = route === 'home' ? '' : route;
}

// --- Tool Slug Helpers ---
// Derive a URL-friendly slug from a tool's file path
// e.g. './tools/misc/soundboard.html' → 'soundboard'
// e.g. './tools/misc/3d-print-library.html' → '3d-print-library'
function getToolSlug(tool) {
  const filename = tool.file.split('/').pop();
  return filename.replace(/\.html$/i, '');
}

// Find a tool by slug within a section (including subfolders)
function findToolBySlug(sec, slug) {
  for (const tool of sec.tools) {
    if (tool.type === 'folder') {
      for (const subTool of tool.tools) {
        if (getToolSlug(subTool) === slug) {
          return { tool: subTool, folder: tool };
        }
      }
    } else if (getToolSlug(tool) === slug) {
      return { tool, folder: null };
    }
  }
  return null;
}



// --- Render Views ---
const main = document.getElementById('mainContent');

// Back arrow SVG
const BACK_SVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>`;
const ARROW_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>`;

// --- Search Helpers ---
const SEARCH_SVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;
const CLEAR_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

// Build flat search index once (cached)
const _searchIndex = (() => {
  const index = [];
  const sectionLabels = { aviation: 'Aviation', civil: 'Civil', misc: 'Misc', hk: 'HK' };
  for (const [key, sec] of Object.entries(SECTIONS)) {
    if (sec.locked) continue;
    for (const tool of sec.tools) {
      if (tool.type === 'folder') continue;
      index.push({
        name: tool.name,
        section: key,
        sectionLabel: sectionLabels[key] || key,
        slug: getToolSlug(tool),
        file: tool.file
      });
    }
  }
  return index;
})();

function fuzzyMatch(query, text) {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t.includes(q)) return 2;
  let qi = 0;
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) qi++;
  }
  return qi === q.length ? 1 : 0;
}

function searchTools(query) {
  if (!query.trim()) return [];
  const index = _searchIndex;
  const results = [];
  for (const item of index) {
    const score = fuzzyMatch(query, item.name);
    if (score > 0) results.push({ ...item, score });
  }
  // Sort: exact substring first, then fuzzy, then alphabetical
  results.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  return results;
}


// --- Shared Helpers ---
function ensureStatusVisible() {
  // Status indicator now lives permanently in the header (.header-status)
  // so no floating home-status element is needed.
  const old = document.getElementById('homeStatus');
  if (old) old.remove();
}

// Section search bar HTML template
const SECTION_SEARCH_HTML = `<div class="section-search-wrap" role="search">
  <label for="sectionSearch" class="sr-only">Search tools in this folder</label>
  <div class="section-search-bar">
    <span class="search-icon" aria-hidden="true">${SEARCH_SVG}</span>
    <input type="text" class="section-search-input" id="sectionSearch" placeholder="Search this folder..." autocomplete="off" spellcheck="false" inputmode="search" aria-describedby="sectionSearchEmpty">
    <button type="button" class="search-clear" id="sectionSearchClear" aria-label="Clear search" style="display:none">${CLEAR_SVG}</button>
  </div>
</div>`;

function initSectionSearch() {
  const input = document.getElementById('sectionSearch');
  const clear = document.getElementById('sectionSearchClear');
  const empty = document.getElementById('sectionSearchEmpty');
  if (!input) return;

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    clear.style.display = q ? 'flex' : 'none';
    let visibleCount = 0;
    main.querySelectorAll('.tool-grid-card').forEach(card => {
      const name = card.querySelector('.tool-grid-name').textContent.toLowerCase();
      const match = !q || name.includes(q) || fuzzyMatch(q, name) > 0;
      // Hide the <li> wrapper (or the card itself if it's still a direct child)
      const host = card.closest('.tool-grid-cell') || card;
      host.style.display = match ? '' : 'none';
      if (match) visibleCount++;
    });
    empty.style.display = visibleCount === 0 ? 'block' : 'none';
  });

  clear.addEventListener('click', () => {
    input.value = '';
    input.dispatchEvent(new Event('input'));
    input.focus();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      input.value = '';
      input.dispatchEvent(new Event('input'));
      input.blur();
    }
  });
}

function renderHome() {
  const lockSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>`;

  const cards = Object.entries(SECTIONS).map(([key, sec]) => {
    const badge = sec.locked
      ? `<span class="card-badge">${lockSvg}</span>`
      : '';
    const titleHtml = sec.title ? `<h2 class="card-title">${sec.title}</h2>` : '';
    const label = sec.title || key;
    return `
      <a href="#${key}" class="category-card" aria-label="${label} section${sec.locked ? ' (password protected)' : ''}">
        ${badge}
        <div class="card-icon">${sec.icon}</div>
        ${titleHtml}
      </a>`;
  }).join('');

  ensureStatusVisible();

  // Live tool count across all non-locked sections (for the pitch line)
  let homeToolCount = 0;
  Object.values(SECTIONS).forEach((sec) => {
    if (!sec || sec.locked) return;
    (sec.tools || []).forEach((t) => {
      if (t.type === 'folder') { if (!t.locked) homeToolCount += (t.tools || []).length; }
      else homeToolCount++;
    });
  });

  main.innerHTML = `
    <section class="landing">
      <h1 class="sr-only">Korb Engineering — Free Aviation &amp; Civil Engineering Tools</h1>
      <div class="home-pitch reveal" aria-label="About this site">
        <p class="home-pitch-line">
          <span class="home-pitch-count">${homeToolCount}+</span>
          self-contained, mobile-first tools.
          Built by one engineer, in the browser, with no signups and no tracking.
        </p>
        <p class="home-pitch-sub">
          Aviation &amp; civil work I actually use, productivity tools I actually open,
          and a few gifts for family along the way.
        </p>
      </div>
      <div class="home-toolbar" role="search">
        <div class="search-bar-wrap">
          <label for="toolSearch" class="sr-only">Search all tools</label>
          <div class="search-bar">
            <span class="search-icon" aria-hidden="true">${SEARCH_SVG}</span>
            <input type="text" class="search-input" id="toolSearch" placeholder="Search tools..." autocomplete="off" spellcheck="false" inputmode="search" aria-controls="searchResults" aria-autocomplete="list">
            <button type="button" class="search-clear" id="searchClear" aria-label="Clear search" style="display:none">${CLEAR_SVG}</button>
          </div>
          <div class="search-results" id="searchResults" role="listbox" aria-label="Search results"></div>
        </div>
        <a href="#repository" class="repo-btn" aria-label="Open Tool Repository">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"/><path d="M8 8h6M8 12h8M8 16h5"/></svg>
          <span>Tool Repository</span>
        </a>
      </div>
      <nav class="category-grid" id="categoryGrid" aria-label="Tool categories">${cards}</nav>
      <div style="text-align:center;padding:32px 0 8px">
        <a href="mailto:harrison@korb.engineering" class="site-email-link">harrison@korb.engineering</a>
      </div>
    </section>
  `;

  // Search functionality
  const searchInput = document.getElementById('toolSearch');
  const searchResults = document.getElementById('searchResults');
  const searchClear = document.getElementById('searchClear');
  const categoryGrid = document.getElementById('categoryGrid');
  let activeIdx = -1;

  function renderResults(query) {
    const results = searchTools(query);
    activeIdx = -1;

    if (!query.trim()) {
      searchResults.innerHTML = '';
      searchResults.style.display = 'none';
      categoryGrid.style.display = '';
      searchClear.style.display = 'none';
      return;
    }

    searchClear.style.display = 'flex';

    if (results.length === 0) {
      searchResults.innerHTML = `<div class="search-empty">No tools found</div>`;
      searchResults.style.display = 'block';
      categoryGrid.style.display = 'none';
      return;
    }

    searchResults.innerHTML = results.map((r, i) => `
      <a href="#${r.section}/${r.slug}" class="search-result-item" data-index="${i}">
        <span class="search-result-name">${highlightMatch(r.name, query)}</span>
        <span class="search-result-section">${r.sectionLabel}</span>
      </a>
    `).join('');
    searchResults.style.display = 'block';
    categoryGrid.style.display = 'none';
  }

  function highlightMatch(name, query) {
    const lName = name.toLowerCase();
    const lQuery = query.toLowerCase();
    const idx = lName.indexOf(lQuery);
    if (idx >= 0) {
      return name.substring(0, idx) +
        `<mark class="search-hl">${name.substring(idx, idx + query.length)}</mark>` +
        name.substring(idx + query.length);
    }
    return name;
  }

  function setActive(idx) {
    const items = searchResults.querySelectorAll('.search-result-item');
    items.forEach(el => el.classList.remove('active'));
    if (idx >= 0 && idx < items.length) {
      items[idx].classList.add('active');
      items[idx].scrollIntoView({ block: 'nearest' });
    }
    activeIdx = idx;
  }

  searchInput.addEventListener('input', () => renderResults(searchInput.value));

  searchInput.addEventListener('keydown', (e) => {
    const items = searchResults.querySelectorAll('.search-result-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(Math.min(activeIdx + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(Math.max(activeIdx - 1, 0));
    } else if (e.key === 'Enter' && activeIdx >= 0 && items[activeIdx]) {
      e.preventDefault();
      items[activeIdx].click();
    } else if (e.key === 'Escape') {
      searchInput.value = '';
      renderResults('');
      searchInput.blur();
    }
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    renderResults('');
    searchInput.focus();
  });

  // Stagger card fade-in
  main.querySelectorAll('.category-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(6px)';
    setTimeout(() => {
      el.style.transition = 'opacity 350ms ease-out, transform 350ms ease-out';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * 80 + 60);
  });
}

// --- Tool Repository (categorized index of all tools) ---
const TOOL_DESCRIPTIONS = {
  // Aviation section
  '360° Photo Stitcher': 'Stitch overlapping field photos into a single 360-degree panorama for hangar, ramp, and terminal documentation.',
  '360° to BIM Model': 'Convert 360-degree panoramas into a rough BIM model with walls, openings, and dimensions.',
  'ADA Compliance Checker': 'Audit terminal and facility layouts against ADA clearance, slope, and signage requirements.',
  'AI Meeting Note Taker': 'Record and transcribe meetings, then summarize decisions, action items, and owners.',
  'Aircraft Maintenance Calculator': 'Track hour-based and cycle-based inspection intervals and project next maintenance due dates.',
  'Airfield Info': 'Search US airports for frequencies, runways, fuel prices, and nearby navaids.',
  "Airport Manager's Friend": 'Daily dashboard for airport managers covering NOTAMs, tenant logs, fuel, and field inspections.',
  'ALP Guidance': 'Walk through FAA Airport Layout Plan update requirements with sheet-by-sheet guidance.',
  'Altitude Calculator': 'Compute pressure, density, and true altitude from temperature, altimeter setting, and field elevation.',
  'Aviation Fuel Pricing': 'Compare Jet A and 100LL prices across regional airports with trend charts.',
  'Aviation Project Planner': 'MS Project-style Gantt chart planner with task dependencies, critical path, and resource tracking.',
  'BRL-CAD': 'Browser front-end for BRL-CAD solid modeling with constructive geometry primitives.',
  'Build Orchestrator': 'Primavera-style construction scheduling engine with CPM, resource leveling, and earned value tracking.',
  'BuildBook Project': 'Client-facing construction project tracker with daily logs, photos, and schedule updates.',
  'Bulk Photo Timestamp': 'Batch stamp field photos with date, time, GPS, and project labels exported as a zip.',
  'Capital Improvement Planner (CIP)': 'Build a multi-year CIP with project costs, funding sources, and phasing across fiscal years.',
  'Compliance Checklist': 'Run through federal and state compliance items with pass/fail notes and export.',
  'Construction Commander': 'Procore-style field management dashboard for RFIs, submittals, and daily reports.',
  'Construction Estimator': 'Itemized takeoff and unit-price estimator with markup, overhead, and total bid output.',
  'Contractor Background Check': 'Vet construction contractors before award: federal award history with Good/Bad/Ugly classification, OSHA incident lookup, solvency and competency scoring, bid PDF red-flag analyzer, lowball detector, reference cross-check, radar scorecard, and printable vetting memo. Heuristic-only, no backend.',
  'Contract Simplifier': 'Paste a construction contract and get a plain-English summary of obligations and risks.',
  'Contractor Bid Notification': 'Draft and send bid invitation letters to a contractor database with tracking.',
  'Critical Path Method': 'Enter activities and durations to compute the critical path, floats, and project finish date.',
  'Daily Field Report': 'Fill out a standardized field report with weather, crews, equipment, and progress photos.',
  'DBE Participation Calculator': 'Track Disadvantaged Business Enterprise subcontract participation against federal goals.',
  'Design Aircraft Repository': 'Searchable library of design aircraft specs for runway, taxiway, and apron sizing.',
  'DFW Earth-Day Game': 'Arcade game about sorting recyclables and cleaning up the Dallas-Fort Worth metroplex.',
  'DXF Viewer': 'Open and pan/zoom DXF drawings in the browser with layer toggles and measurements.',
  'E6B Calculator': 'Digital E6B flight computer for wind, heading, groundspeed, fuel, and time calculations.',
  'Earned Value Mgmt': 'Compute EV, PV, AC, CPI, and SPI from project cost and schedule progress.',
  'Erosion Control': 'Select and size erosion and sediment control BMPs for a construction site.',
  'Facility Evaluation Tool': 'ETAM-style scoring worksheet that rates airport facility condition and deficiencies.',
  'Flight Time Logger': 'Digital pilot logbook for flight time, landings, approaches, and endorsements.',
  'Front End Documents': 'Assemble bid-ready front-end construction documents from reusable templates.',
  'Fuel Burn Calculator': 'Estimate fuel burn for a trip from aircraft type, distance, winds, and power setting.',
  "Evan's Daily Sweepstakes": 'Find and track free sweepstakes, contests, and raffles with daily checklists and win stats.',
  "Evan's Zoo Pals": 'Interactive digital safari for kids to explore animals while eating dinner.',
  'Fuel Station Designer': 'Lay out self-serve fuel farms with tank sizing, dispenser placement, and setbacks.',
  'Gantt Project': 'Create a Gantt chart with tasks, dependencies, milestones, and drag-to-reschedule.',
  'Geospatial Tools': 'Upload shapefiles, KML, and GeoJSON to measure, buffer, and reproject geometry.',
  'Geotech Investigation RFP': 'Generate a geotechnical investigation RFP tailored to the airport project type and subgrade.',
  'Graphing Calculator': 'Retro 1980s-style graphing calculator with expressions, plots, and history.',
  'Hangar Door Selector': 'Choose hangar door style and size from wingspan, tail height, and building layout.',
  'Holding Pattern Calculator': 'Work out holding pattern entry type, leg lengths, and timing from altitude and wind.',
  'Kanban Board': 'Drag-and-drop kanban with customizable columns, WIP limits, and local persistence.',
  'Legal Advisor': 'Ask contract and construction-law questions and get AI-drafted guidance with citations.',
  'Measurement & Annotation': 'Measure distances and areas on drawings and photos with markup tools.',
  'Meeting Recorder': 'Record audio meetings, transcribe, and export minutes with speaker labels.',
  'Megger Test Report': 'Log insulation resistance (megger) readings for airfield cables and print the report.',
  'Metal Building Selector': 'Size pre-engineered metal buildings from span, height, eave, and snow/wind loads.',
  'METAR/TAF Decoder': 'Paste a METAR or TAF and see a plain-English decoded weather briefing.',
  'Morse Machine': 'Practice International Morse code with keyer input, playback, and speed control.',
  'Noise Contour Planner': 'Sketch DNL noise contours around an airport from operations mix and runway use.',
  'NPV/IRR Calculator': 'Evaluate capital projects with net present value, IRR, and payback from cash flows.',
  'Omni Calculator': 'Collection of everyday engineering conversions and quick formulas in one panel.',
  'OSHA Reference Guide': 'Comprehensive OSHA safety reference covering standards, hazards, PPE, incident reporting, and toolbox talks.',
  'Online Bidder': 'Bid Express-style portal for reviewing and submitting unit-price bids online.',
  'OpenProject': 'Browser OpenProject front-end for work packages, wikis, and project timelines.',
  'Pavement Evaluator': 'Score airfield pavement condition from distress survey inputs and compute PCI.',
  'Pavement Management Plan': 'Build a multi-year pavement M&R plan with treatments, costs, and PCI forecasts.',
  'PDF Editor': 'Annotate, merge, split, and fill PDF forms directly in the browser.',
  'Performance Spec': 'Draft performance-based specifications for airport equipment and systems.',
  'PERT Calculator': 'Compute PERT expected duration and variance from optimistic, likely, and pessimistic estimates.',
  'Photogrammetry Studio': 'Turn overlapping drone photos into orthomosaics, point clouds, and meshes.',
  'Photogrammetry Suite': 'Full photogrammetry workflow with camera calibration, dense cloud, and DEM export.',
  'Pomodoro Timer': 'Run focus sessions with configurable work and break intervals and a task list.',
  'Pre-Flight Checklist': 'Tap-through pre-flight checklist builder for general-aviation aircraft.',
  'Probability Impact Matrix': 'Visual risk assessment matrix mapping probability vs impact with heat-map scoring and mitigation tracking.',
  'Proposal Scope & Fee Generator': 'Draft engineering proposal scope language and fee tables from project parameters.',
  'Punch List': 'Track construction punch-list items by location with photos, assignee, and status.',
  'PWL Calculator': 'FAA Percent Within Limits acceptance calculator for asphalt and concrete lots.',
  'QA/QC Checklist': 'Project QA/QC review checklist covering drawings, specs, calcs, and deliverables.',
  'QR Generator': 'Create QR codes for URLs, text, WiFi, and vCards with logo overlay and export.',
  'Relationship Tracker': 'Log contacts, interactions, and follow-ups across clients, teammates, and vendors.',
  'Resource Leveling': 'Balance over-allocated staff across a project schedule to smooth resource histograms.',
  'RFP Response Generator': 'Draft a structured RFP response from a project solicitation and firm resume.',
  'RFQ Tracker': 'Track requests for quotes from vendors with due dates, pricing, and award decisions.',
  'ROI Calculator': 'Calculate return on investment for airport capital projects with payback and IRR.',
  'Scope Creep Counselor': 'Detect scope creep in change requests and draft a client response with impact.',
  'Scope Gap Detector': 'Compare RFP requirements against a proposed scope of work to flag missing items.',
  'Sociopath Identifier': 'Tongue-in-cheek personality quiz that scores workplace red flags.',
  'Submittal Review': 'Log construction submittals with review status, comments, and approval tracking.',
  'Survey Proposal Generator': 'Produce land and topographic survey proposals with scope, deliverables, and fees.',
  'SWOT Analysis': 'Build a four-quadrant SWOT worksheet for a project or business decision.',
  'Taiga Scrum Config': 'Reference configuration for a Korb Engineering Taiga Scrum workspace.',
  'Takeoff/Landing Distance': 'Compute required takeoff and landing distances from aircraft weight, elevation, temperature, and slope.',
  'Time-Distance-Speed Calculator': 'Solve any of time, distance, or speed given the other two with unit conversion.',
  'Unit Converter': 'Convert between engineering units across length, area, volume, pressure, and more.',
  'Video Conference': 'Start a peer-to-peer video call from the browser with screen share and chat.',
  'Weight & Balance': 'Compute aircraft weight and center of gravity with station loading and envelope check.',
  'Wind Correction Calculator': 'Find wind correction angle, heading, and groundspeed from true course and winds aloft.',
  'Wind Rose Generator': 'Plot wind direction and speed frequency as a polar rose chart from METAR or manual data.',

  // Civil section
  'Build Orchestrator': 'Coordinate construction phases, trades, and deliverables across a multi-project pipeline.',
  'Claim/Dispute Drafter': 'Draft construction claim and dispute letters with facts, entitlement, and damages sections.',
  'Clause Comparison': 'Diff two contract clauses side by side and summarize substantive differences.',
  'Constraint Optimizer': 'Solve small linear-programming problems with variables, constraints, and an objective.',
  'Content Calendar': 'Plan blog, newsletter, and social posts on a monthly calendar grid.',
  'Decision Journal': 'Record decisions with context, options, chosen path, and review prompts for later.',
  'Digital Twin Repository': 'Browse 3D digital twins of facilities with metadata and source model links.',
  'DWG Viewer': 'View and inspect AutoCAD DWG files with layer control and measurements in the browser.',
  'Dynamic CIP': 'Scenario-driven capital improvement planner that re-ranks projects as funding changes.',
  'Earthwork & Grading Calculator': 'Compute cut, fill, and net earthwork volumes from cross sections or grid elevations.',
  'Eisenhower Priority Matrix': 'Sort tasks into urgent/important quadrants and act on the top priorities first.',
  'EPANet Water': 'Water distribution network solver with pipes, nodes, pumps, and pressure results.',
  'File Share': 'Peer-to-peer file transfer between browsers with no server uploads.',
  'Financial Planner': 'Model household cash flow, savings, and retirement projections with scenarios.',
  'Gift Finder': 'Track gift ideas per person with budget, occasion, and purchase status.',
  "Harrison's iPod": 'Retro click-wheel music player skin over a personal audio library.',
  'HEC-HMS': 'Run watershed hydrology simulations with subbasins, reaches, and rainfall events.',
  'HEC-RAS Open': 'Open-source HEC-RAS front-end for 1D/2D hydraulic model setup and review.',
  'Invoice Generator': 'Create branded PDF invoices with line items, tax, retainage, and payment terms.',
  'Korb Dossier': 'Private profile and background dossier builder with tagged notes and timeline.',
  'KPI Watchdog': 'Monitor engineering project KPIs with thresholds and alerts when metrics drift.',
  'LaTeX Editor': 'Live LaTeX editor with preview, math shortcuts, and PDF export.',
  'Logo Overlay': 'Stamp the Korb logo and project info onto images and PDFs for branding.',
  'Meeting Adversary': 'Rehearse a tough meeting against an AI opponent playing a difficult stakeholder.',
  'Meeting Minutes': 'Capture structured meeting minutes with attendees, decisions, and action items.',
  'Monte Carlo Simulation': 'Run probabilistic simulations with configurable distributions, tornado charts, and confidence intervals.',
  'Negotiation Simulator': 'Practice negotiations against an AI counterpart with scored feedback.',
  'OpenFOAM CFD': 'Browser harness for OpenFOAM CFD case setup and result visualization.',
  'PCI Inspector': 'Field app for recording pavement distress data used to compute Pavement Condition Index.',
  'Policy Writer': 'Generate internal policy documents from a topic and organizational context.',
  'Pre-mortem Generator': 'Run a pre-mortem exercise that surfaces why a project might fail before it starts.',
  'Risk Register': 'Log project risks with probability, impact, mitigation, and owner tracking.',
  'RoomRecon 3D': 'Scan a room with your phone or tablet and build a to-scale, georeferenced 3D model with sketch, walk-AR, and OBJ/JSON export.',
  'Root Cause Analyzer': 'Walk through 5-Whys and fishbone analysis to find the root cause of an incident.',
  'Scenario Modeler': 'Compare what-if business and project scenarios side by side with key metrics.',
  'Shopping Decision Engine': 'Score competing products across weighted criteria to pick the best buy.',
  'Smart Home': 'Dashboard for home automation devices, routines, and sensor status.',
  'Soil Classification Tool': 'Classify soils using USCS and AASHTO from gradation and Atterberg limits.',
  'Spreadsheet Interpreter': 'Upload a spreadsheet and get an AI explanation of its structure and formulas.',
  'Stakeholder Matrix': 'Map project stakeholders by power and interest with engagement strategies.',
  'Stockpile Volume Scanner': 'Walk around a soil pile with GPS, compute cubic yards and tonnage, and estimate how many 16-cy dump trucks are needed to haul it away.',
  'Stormwater Drainage Calculator': 'Size storm drains, inlets, and detention using rational method and IDF curves.',
  'Structural Steel Calculator': 'Size steel beams and columns from loads, span, and AISC allowable stresses.',
  'Survey Coordinate Converter': 'Convert between state plane, UTM, geographic, and project coordinate systems.',
  'Trend Synthesis': 'Pull together market and industry trends into a themed briefing document.',
  'TXT to HTML': 'Convert plain text into clean HTML with optional Markdown and heading detection.',
  'Unstructured Data Miner': 'Extract structured fields from PDFs, emails, and notes using AI parsing.',
  'WBS Builder': 'Build a work breakdown structure with nested tasks, durations, and cost rollups.',

  // Misc section
  '2001: A D&D Odyssey': 'Text-driven D&D campaign with a HAL-style AI dungeon master in space.',
  '2048': 'Slide numbered tiles on a 4x4 grid to combine them and reach the 2048 tile.',
  '2D to 3D Generator': 'Turn flat sketches and photos into extruded 3D models ready for printing.',
  '3D Print Library': 'Browse curated STL models organized by category with print settings notes.',
  'AI Tax Counsel': 'Ask personal and small-business tax questions with AI-drafted answers and citations.',
  "AJ's Synthesizer": 'Hands-on analog-style software synth with oscillators, filters, and envelopes.',
  "Alan's Virtual Caddy": 'Golf caddy that suggests club selection from yardage, wind, and lie conditions.',
  'Angry Skeeball': 'Physics-based slingshot skeeball arcade game with special balls, power-ups, and 10 levels.',
  'App Idea Generator': 'Spin a few wheels to get a random app concept prompt with target user and feature.',
  'Aprende Spanish': 'Flashcard-driven Spanish vocabulary and phrase drills with audio playback.',
  'Astronomy Essentials': 'Interactive intro astronomy course with 14 chapters, flashcards, quizzes, and glossary covering the solar system, stars, galaxies, cosmology, and astrobiology.',
  'Audiobook Player': 'Listen to audiobooks with bookmarks, speed control, and sleep timer.',
  'Awesome-O 4000': 'Random movie premise generator. Spin a fresh title, logline, sidekick, and twist on every click with hundreds of zany combinations.',
  'Backyard Baseball': 'Arcade baseball game with kid rosters, home runs, and sandlot fields.',
  'Battleship': 'Classic ship-placement grid game played against a friend or the computer.',
  'Book Digitizer': 'Capture book pages with a webcam, OCR them, and export as searchable EPUB or PDF.',
  'Checkers': 'Play standard American checkers against a local opponent or three AI difficulty levels.',
  'Chess': 'Full-rules chess against a local partner or a browser engine with analysis.',
  'Chinese Checkers': 'Play Chinese checkers against 2-6 local or AI opponents with easy/medium/hard difficulty.',
  'Clicker Counter': 'Tap a big button to count things like people, reps, or inventory with reset and undo.',
  'Clock & Stopwatch': 'Analog and digital clock, stopwatch, and countdown timer in one panel.',
  'Color Palette': 'Build and export color palettes with contrast checks and hex/HSL swatches.',
  'Complaints Department': 'Official grievance intake form for korb.engineering critics — with one small catch: the send button is a mirage that dodges every click.',
  'Connect Four': 'Drop checkers into columns and connect four in a row before your opponent does.',
  'Copycat Kitchen': 'Copycat recipes for popular restaurant dishes with step-by-step instructions.',
  'Crossword': 'Daily-style crossword puzzles with clue hints, timer, and auto-check.',
  'Deal Hunter': 'Track wishlist items across retailers with target-price alerts, history charts, and a deal kanban.',
  'Dev Toolkit': 'Developer utilities for base64, JWT, regex, JSON, hashing, and diffing.',
  'DFW Events & Deals': 'Curated list of Dallas-Fort Worth events, concerts, and local deals by neighborhood.',
  'Dice Roller': 'Roll any combination of polyhedral dice with modifiers and a rolling history log.',
  'Dinner Recommender': 'Answer a few prompts and get a dinner suggestion with recipe and grocery list.',
  'Drawing Challenge': 'Daily drawing prompts with a timer and a gallery of past submissions.',
  'Drum Machine': 'Step-sequenced drum machine with classic samples, pattern chaining, and export.',
  'Dungeon Quest': 'Roguelike dungeon crawler with turn-based combat, loot, and procedurally generated floors.',
  'Ebook Reader': 'Read EPUB and PDF books with bookmarks, highlights, and customizable themes.',
  'Enigma Workbench': 'Historical Enigma cipher simulator with 24 rotor options, plugboard, reflectors, and copy-paste encrypted transmissions.',
  'Fidget Spinner': 'Flick to spin a virtual fidget spinner with RPM counter and custom skins.',
  'File Converter': 'Convert files between common image, document, and audio formats in the browser.',
  'File Toolbox': 'Swiss-army file utility for rename, compress, split, and checksum operations.',
  'Flowchart Maker': 'Drag nodes and edges to build flowcharts with export to PNG and SVG.',
  'Formula Forge': 'Catalog of engineering formulas with variable inputs and instant computed results.',
  'Frisco Weather': 'Hyperlocal Frisco, Texas weather with radar, alerts, and 7-day forecast.',
  'Frogger': 'Hop a frog across a busy road and river without getting squashed or drowned.',
  'Guitar Tuner': 'Use the microphone to tune a guitar against standard and alternate tunings.',
  'Habit Tracker': 'Mark daily habits on a streak calendar with reminders and long-term charts.',
  'Harrison Rocks': 'Interactive intro physical geology course with 14 chapters, flashcards, quizzes, and glossary covering minerals, rocks, plate tectonics, and surface processes.',
  "Harrison's Blog": 'Personal blog platform with markdown posts, tags, and an RSS feed.',
  "Hendryx's Social Skills": 'Kid-friendly scenarios that teach social skills through interactive choices.',
  'Home Improvements Guide': 'Step-by-step guides for common home improvement projects with tools and materials.',
  'Horse Racing': 'Pick a horse and watch a race with odds, commentary, and a betting purse.',
  'Inbox Sandbox': 'Mock email inbox for practicing triage, filters, and response drafting.',
  'International Radio': 'Listen to live radio stations from around the world organized by country and genre.',
  'Jung-Ho Bridge': 'Bridge card game with bidding, play, and scoring against AI partners.',
  "Kelsey's Teacher Tools": 'Warm, practical toolkit for primary school teachers: lesson planner, random student picker, classroom timer, group maker, seating chart, behavior points tracker, noise meter, printable worksheets, rubric builder, reward coupons, sub plan template, tips library, and curated free resources.',
  'Korb Cookbook': 'Family cookbook with searchable recipes, photos, and shopping list export.',
  'Korb Data Vault': 'Backup, restore, and inspect every Korb tool\'s saved data from one place.',
  'Korb Digital Lending Library': 'Lend and borrow ebooks within a private circle with due dates and waitlists.',
  'Korb Farm Collective': 'Manage a small farm co-op with crops, livestock, harvests, and member shares.',
  'Korb Flow Chart Maker': 'Sketch flowcharts with Korb-themed shapes, swim lanes, and exportable diagrams.',
  'Korb Mematic': 'Meme generator with top/bottom captions, image library, and one-click share.',
  'Korb Party Pack': 'Pass-and-play party game collection for 3\u20138 players with quip writing, fibber trivia, doodle guessing, and hot-take voting.',
  'Korb Terminal': 'Bloomberg-style terminal dashboard with tickers, news, and charting panels.',
  'Korb World Factbook': 'Interactive world country reference with profiles, compare mode, region browser, and leaderboards sourced from the REST Countries API.',
  'Kurbstompin Patent Search': 'Prior art search workbench: disclosure templates, multi-database queries, reference logging, and filing-ready PDF report.',
  "Kyle's Train Set": 'Kid-friendly drivable train simulator with stations, cargo, and a sandbox track.',
  'Leadership Forge': 'Interactive leadership principles coursework with scenarios and reflection prompts.',
  'Lunar Lander': 'Land a module on the moon by managing thrust, fuel, and descent angle.',
  'Mandala Maker': 'Draw symmetric mandalas with radial mirroring, color palettes, and SVG export.',
  'Markdown Editor': 'Split-pane markdown editor with live preview, outline, and HTML export.',
  "Mary Kay's Recipes": 'Curated family recipe collection with handwritten-style cards and prep notes.',
  'Meal Plan Architect': 'Plan weekly meals around nutrition goals and generate a consolidated grocery list.',
  'Mechanical Football': 'Tudor-style vibrating-field electric football: position and rotate bases, flip the switch, and watch the physics.',
  'Memory Match': 'Flip cards to find matching pairs with themed decks and a move counter.',
  'Metronome': 'Practice tempo tool with tap, subdivisions, accent patterns, and setlists.',
  'Mexican Grocery Guide': 'Reference guide to ingredients and brands found in Mexican grocery stores.',
  'Mind Map': 'Visual mind-mapping canvas with branching nodes, colors, and export.',
  'Minesweeper': 'Classic minesweeper with beginner, intermediate, expert, and custom boards.',
  'Moving Specialist Invoice': 'Build moving-company invoices with hourly crews, mileage, and materials.',
  "Alex's Muscle Atlas": 'Anatomical muscle reference with exercises targeting each group.',
  'Nutrition Tracker 3000': 'Log meals and macros with a food database and daily nutrient dashboards.',
  "Olivia's Digital Escape Room": 'Kid-friendly puzzle escape room with riddles, cipher locks, and hidden clues.',
  'OrcaSlicer Studio': 'Browser front-end for OrcaSlicer 3D-print slicing, profiles, and G-code preview.',
  'Painting Studio': 'Digital painting canvas with brushes, layers, blend modes, and pressure sensitivity.',
  'Password Forge': 'Generate strong passwords and passphrases with entropy meter and history.',
  'PDF Markup Studio': 'Bluebeam-style PDF annotation with highlights, arrows, comments, clouds, and multi-user markup.',
  'Photo Forge': 'Edit photos with crops, filters, curves, and batch export.',
  'Piano': 'Playable on-screen piano with MIDI support, octaves, and instrument voices.',
  'Pipe Sizing Tool': 'Size water and fuel pipes from flow, material, and allowable head loss.',
  'Pixel Art Editor': 'Grid-based pixel art editor with palettes, animation frames, and PNG export.',
  'Podcast Player': 'Subscribe to podcast RSS feeds with episode queue, speed, and sleep timer.',
  'Pong': 'Two-player paddle game with adjustable ball speed and AI opponent option.',
  'Quick Reference Guide': 'Searchable cheat-sheet library for engineering formulas, codes, and standards.',
  'Retro Arcade': 'Collection of retro arcade classics playable from one launcher menu.',
  'Rigged Roulette': 'Satirical European roulette with flashing marquee lights, WebAudio fanfares, and absurd mini-jobs to re-earn credits when you go broke. Entertainment only.',
  'Scandinavian Interior Design': 'Mood boards and product picks for Scandinavian-style rooms with layout tips.',
  'Screen Recorder': 'Record the screen, webcam, and microphone to a downloadable video file.',
  'Simon': 'Repeat the growing color-and-sound sequence in the classic Simon memory game.',
  'Situation Monitor': 'Personal situation-awareness dashboard with news, weather, and alert feeds.',
  'Snake': 'Guide the snake to eat food and grow longer without hitting walls or itself.',
  'SOP Creator': 'Build standard operating procedures with screenshot markup, arrows, annotations, and PDF export.',
  'Solitaire': 'Klondike solitaire with draw-one or draw-three, undo, and hint options.',
  'Soundboard': 'Hotkey-triggered sound-effect board with custom clips and volume per pad.',
  'Speak & Spell': 'Retro-style spelling game that reads words aloud for kids to type back.',
  'Spinner Wheel': 'Spin a weighted wheel of custom options for random picks and decisions.',
  'Spirograph': 'Draw geometric roulette patterns by adjusting gear ratios and colors.',
  'Spreadsheet Tool': 'Lightweight spreadsheet with formulas, charts, and CSV import/export.',
  'Star Fox Lite': 'On-rails arcade space shooter inspired by the classic Star Fox.',
  'Sudoku': 'Generate and solve sudoku puzzles across four difficulty levels with pencil marks.',
  'Tanks': 'Two-player artillery duel with destructible terrain and wind effects.',
  'Territory Wars': 'Paper.io-style claim-the-map game with AI bots and power-ups.',
  'Tetris': 'Stack and clear falling tetrominoes to reach higher levels before topping out.',
  'Text to Speech': 'Convert typed text into spoken audio with voice, rate, and pitch controls.',
  'The Void': 'Minimalist meditation space with ambient sound and breathing cues.',
  'Tic Tac Toe': 'Three-in-a-row game against a friend or a minimax AI.',
  'Tip Calculator': 'Split a restaurant bill with tip percentages, tax, and per-person totals.',
  'Typing Test': 'Time typing speed and accuracy on quotes and paragraphs with a WPM chart.',
  'Ultimate Survival Guide': 'Book-styled wilderness survival guide with 13 illustrated chapters, checklists, and search across priorities, shelter, fire, water, food, first aid, navigation, and more.',
  'Vector Drawing': 'Create and edit vector shapes with pen, paths, and SVG export.',
  'Vintage Web Game Vault': 'Launcher for classic Flash-era web games preserved in the browser.',
  'Whiteboard': 'Infinite collaborative whiteboard with sticky notes, pens, and shapes.',
  'World Cup 2026': 'All-in-one daily companion for the 2026 FIFA World Cup (USA/Canada/Mexico): full 104-match schedule, 12-group stage with live standings, knockout bracket, 48 team profiles with outlook, FIFA rankings, outright odds, personal predictions and accuracy tracker, venue guide, and watch log.',
  'World Explorer': 'Interactive globe for exploring countries with facts, flags, and photos.',
  'World Travel Guide': 'Rick Steves-inspired country-by-country travel guide with tips, customs, food, phrases, and packing lists.',
  'Word Puzzle': 'Daily word puzzles including anagrams, word ladders, and hidden-word grids.',
  'YT2MP3': 'Convert YouTube videos to downloadable MP3 audio files.',
  'YT2MP4': 'Download YouTube videos as MP4 files at selectable resolutions.'
};

function generateToolDescription(name) {
  if (TOOL_DESCRIPTIONS[name]) return TOOL_DESCRIPTIONS[name];
  const n = name.toLowerCase();
  const rules = [
    [/wind rose|pavement|airport|runway|taxiway|hangar|alp|navaid|approach|departure|airspace|atc|aviation|aircraft|fbo|airnav|altitude|fuel/, 'Aviation-focused tool for airport planning, design, or operations.'],
    [/hec-ras|hec-hms|hydraul|hydrolog|drainage|stormwater|watershed|epanet|water/, 'Hydrology / hydraulics analysis with chartable results.'],
    [/cad|dwg|brl/, 'CAD-style geometry tool that runs in the browser.'],
    [/recipe|meal|food|copycat|kitchen/, 'Cooking and recipe utility.'],
    [/workout|muscle|exercise|fitness/, 'Fitness reference and workout planning.'],
    [/calculator|calc\b/, 'Quick interactive calculator with formatted output.'],
    [/estimator/, 'Estimating worksheet with itemized line items and totals.'],
    [/tracker/, 'Tracks records over time with persistent local storage.'],
    [/manager|management/, 'Organize records with filters and detail views.'],
    [/planner|planning/, 'Plan and schedule items across a timeline.'],
    [/checklist/, 'Step-by-step checklist with progress tracking.'],
    [/report/, 'Structured form that produces a printable report.'],
    [/converter|convert/, 'Convert values between common units and formats.'],
    [/viewer/, 'Browser-based viewer for the file format.'],
    [/editor/, 'In-browser editor with live preview and export.'],
    [/generator|maker|forge/, 'Generates output from your inputs — no install required.'],
    [/timer|stopwatch|pomodoro|metronome/, 'Configurable timer with start/stop/reset controls.'],
    [/checker|validator|inspector/, 'Validates inputs against requirements and flags issues.'],
    [/chess|sudoku|tetris|2048|minesweeper|crossword|solitaire|checkers|game|arcade|tycoon|escape/, 'Browser game playable on desktop or mobile.'],
    [/board|kanban/, 'Visual board for organizing items into columns.'],
    [/diagram|chart|graph|map/, 'Visualize data with interactive diagrams.'],
    [/finder|search|explorer|atlas|library|repository|vault/, 'Browse and search a curated dataset.'],
  ];
  for (const [re, desc] of rules) if (re.test(n)) return desc;
  return 'Self-contained browser tool — no install or sign-up required.';
}

// --- Recency metadata (loaded async from tools/_generated/sections.json) ---
// Maps tool slug -> ISO date string of last file modification. Empty until
// the async load resolves; renderRepository handles the empty case.
const _RECENCY = {};
let _recencyLoaded = false;
function loadRecency() {
  if (_recencyLoaded) return Promise.resolve();
  _recencyLoaded = true;
  return fetch('./tools/_generated/sections.json', { cache: 'no-cache' })
    .then(r => r.ok ? r.json() : null)
    .then(data => {
      if (!data || !data.categories) return;
      for (const cat of Object.keys(data.categories)) {
        for (const t of data.categories[cat]) {
          if (t.slug && t.modified) _RECENCY[t.slug] = t.modified;
        }
      }
      // If the user is on the repository view when data arrives, refresh it
      if (getRoute() === 'repository') renderRepository();
    })
    .catch(() => { /* non-fatal */ });
}

function recencyChip(slug) {
  const iso = _RECENCY[slug];
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const days = Math.floor((Date.now() - d.getTime()) / 86400000);
  let label = '', cls = '';
  if (days <= 7)      { label = 'Updated this week';    cls = 'repo-chip--new'; }
  else if (days <= 30){ label = 'Updated this month';   cls = 'repo-chip--fresh'; }
  else                { return ''; } // older: no chip
  return `<span class="repo-chip ${cls}" title="${d.toISOString().slice(0,10)}">${label}</span>`;
}

function renderRepository() {
  ensureStatusVisible();
  loadRecency();
  const sectionLabels = { aviation: 'Aviation', civil: 'Civil Engineering', misc: 'Miscellaneous', hk: 'HK' };
  const sectionOrder = ['aviation', 'civil', 'misc', 'hk'];

  const sectionsHtml = sectionOrder.map(key => {
    const sec = SECTIONS[key];
    if (!sec || sec.locked) return '';
    const tools = [];
    sec.tools.forEach(t => {
      if (t.type === 'folder') {
        if (t.locked) return;
        t.tools.forEach(sub => tools.push({ name: sub.name, slug: getToolSlug(sub), folder: t.name }));
      } else {
        tools.push({ name: t.name, slug: getToolSlug(t), folder: null });
      }
    });
    if (!tools.length) return '';
    tools.sort((a, b) => a.name.localeCompare(b.name));
    const items = tools.map(t => {
      const desc = generateToolDescription(t.name);
      const folderTag = t.folder ? `<span class="repo-folder-tag">${t.folder}</span>` : '';
      const chip = recencyChip(t.slug);
      return `
        <a href="#${key}/${t.slug}" class="repo-item">
          <div class="repo-item-head">
            <span class="repo-item-name">${t.name}</span>
            ${folderTag}
            ${chip}
          </div>
          <p class="repo-item-desc">${desc}</p>
        </a>`;
    }).join('');
    return `
      <section class="repo-section" id="repo-${key}">
        <header class="repo-section-head">
          <h2 class="repo-section-title">${sectionLabels[key] || key}</h2>
          <span class="repo-section-count">${tools.length} tool${tools.length === 1 ? '' : 's'}</span>
        </header>
        <div class="repo-grid">${items}</div>
      </section>`;
  }).join('');

  const totalTools = sectionOrder.reduce((sum, key) => {
    const sec = SECTIONS[key];
    if (!sec || sec.locked) return sum;
    let n = 0;
    sec.tools.forEach(t => {
      if (t.type === 'folder') { if (!t.locked) n += t.tools.length; }
      else n++;
    });
    return sum + n;
  }, 0);

  const navLinks = sectionOrder
    .filter(k => SECTIONS[k] && !SECTIONS[k].locked)
    .map(k => `<a href="#repo-${k}" class="repo-nav-link">${sectionLabels[k] || k}</a>`)
    .join('');

  main.innerHTML = `
    <section class="repository-page">
      <div class="section-hero">
        <a href="#" class="back-link reveal" aria-label="Back to home">${BACK_SVG}</a>
      </div>
      <div class="repo-header reveal">
        <h1 class="repo-title">Tool Repository</h1>
        <p class="repo-subtitle">${totalTools} free browser tools across aviation, civil engineering, productivity, and games. Click any tool to open it.</p>
        <div class="repo-filter-wrap">
          <input type="text" id="repoFilter" class="repo-filter-input" placeholder="Filter tools..." autocomplete="off" spellcheck="false">
        </div>
        <nav class="repo-nav">${navLinks}</nav>
      </div>
      ${sectionsHtml}
    </section>
  `;

  initReveal();

  // In-page anchor scroll for category jump links
  main.querySelectorAll('.repo-nav-link').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const filter = document.getElementById('repoFilter');
  filter.addEventListener('input', () => {
    const q = filter.value.trim().toLowerCase();
    document.querySelectorAll('.repo-section').forEach(sec => {
      let visible = 0;
      sec.querySelectorAll('.repo-item').forEach(item => {
        const name = item.querySelector('.repo-item-name').textContent.toLowerCase();
        const desc = item.querySelector('.repo-item-desc').textContent.toLowerCase();
        const match = !q || name.includes(q) || desc.includes(q);
        item.style.display = match ? '' : 'none';
        if (match) visible++;
      });
      sec.style.display = visible ? '' : 'none';
      const count = sec.querySelector('.repo-section-count');
      if (count) count.textContent = `${visible} tool${visible === 1 ? '' : 's'}`;
    });
  });
}

function renderSection(key) {
  const sec = SECTIONS[key];
  if (!sec) { renderHome(); return; }

  ensureStatusVisible();

  // If locked, show password gate
  if (sec.locked && !sec._unlocked) {
    renderPasswordGate(key, sec);
    return;
  }

  // If section has tools, render tool grid
  if (sec.tools && sec.tools.length > 0) {
    renderToolGrid(key, sec);
    return;
  }

  // Empty section
  main.innerHTML = `
    <section class="section-page">
      <div class="section-hero">
        <a href="#" class="back-link reveal" aria-label="Back to home">${BACK_SVG}</a>
      </div>
      <div class="empty-section reveal">
        <div class="empty-icon">${sec.icon}</div>
      </div>
    </section>
  `;
  initReveal();

  // About button click
  const aboutLink = main.querySelector('.about-btn');
  if (aboutLink) {
    aboutLink.addEventListener('click', (e) => {
      e.preventDefault();
      renderAboutPage(key);
    });
  }
}


// --- Tool Grid (matching homepage card style) ---
function renderToolGrid(key, sec) {
  const lockIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>`;
  const folderIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>`;

  const total = sec.tools.length;
  const cards = sec.tools.map((tool, i) => {
    const isFolder = tool.type === 'folder';
    const icon = isFolder ? (tool.locked ? lockIcon : folderIcon) : ARROW_SVG;
    const extraClass = isFolder ? ' tool-folder-card' : '';
    const safeName = escapeHtml(tool.name);
    const roleLabel = isFolder ? (tool.locked ? 'locked folder' : 'folder') : 'tool';
    const ariaLabel = escapeHtml(`${tool.name}, ${roleLabel}, ${i + 1} of ${total}`);
    return `
    <li role="listitem" class="tool-grid-cell">
      <a href="#" class="tool-grid-card${extraClass} reveal" data-section="${escapeHtml(key)}" data-tool-index="${i}" aria-label="${ariaLabel}">
        <span class="tool-grid-name">${safeName}</span>
        ${icon}
      </a>
    </li>
  `;
  }).join('');

  const sectionLabels = { aviation: 'Aviation', civil: 'Civil Engineering', misc: 'Miscellaneous', hk: 'HK' };
  const folderTitle = sectionLabels[key] || key.charAt(0).toUpperCase() + key.slice(1);
  const safeTitle = escapeHtml(folderTitle);

  main.innerHTML = `
    <section class="section-page" aria-labelledby="sectionFolderTitle">
      <div class="section-hero">
        <a href="#" class="back-link reveal" aria-label="Back to home">${BACK_SVG}</a>
      </div>
      <div class="tool-grid-container">
        <h2 class="section-folder-title" id="sectionFolderTitle">${safeTitle}</h2>
        ${SECTION_SEARCH_HTML}
        <ul class="tool-grid" role="list" aria-label="${safeTitle} tools">${cards}</ul>
        <div class="section-search-empty" id="sectionSearchEmpty" role="status" aria-live="polite" style="display:none">No tools match your search</div>
      </div>
    </section>
  `;

  initSectionSearch();

  main.querySelectorAll('.tool-grid-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const sKey = card.dataset.section;
      const tIdx = parseInt(card.dataset.toolIndex);
      const s = SECTIONS[sKey];
      const tool = s.tools[tIdx];

      if (tool.type === 'folder') {
        if (tool.locked && !tool._unlocked) {
          renderFolderPasswordGate(sKey, s, tool);
        } else {
          renderSubfolderGrid(sKey, s, tool);
        }
        return;
      }

      // Set hash to section/tool-slug for shareable URLs
      const slug = getToolSlug(tool);
      location.hash = `${sKey}/${slug}`;
    });
  });

  initReveal();
}


// --- Subfolder password gate ---
function renderFolderPasswordGate(sectionKey, sec, folder) {
  const lockSvg = `<svg class="gate-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="10" y="22" width="28" height="20" rx="4"/><path d="M16 22v-6a8 8 0 0116 0v6"/><circle cx="24" cy="33" r="3"/><path d="M24 36v3"/></svg>`;

  main.innerHTML = `
    <section class="section-page">
      <div class="section-hero">
        <a href="#" class="back-link" id="folderGateBack" aria-label="Back to section">${BACK_SVG}</a>
      </div>
      <div class="password-gate">
        <div class="gate-box">
          ${lockSvg}
          <h2 class="gate-title">${folder.name}</h2>
          <form class="gate-form" id="folderGateForm">
            <label for="folderGatePassword" class="sr-only">Password</label>
            <input type="password" id="folderGatePassword" class="gate-input" placeholder="_ _ _ _ _ _" autocomplete="off" required>
            <button type="submit" class="gate-btn">Unlock</button>
          </form>
          <p class="gate-error" id="folderGateError">Access denied.</p>
        </div>
      </div>
    </section>
  `;

  document.getElementById('folderGateBack').addEventListener('click', (e) => {
    e.preventDefault();
    renderSection(sectionKey);
  });

  const form = document.getElementById('folderGateForm');
  const input = document.getElementById('folderGatePassword');
  const error = document.getElementById('folderGateError');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!folder._hash) { error.classList.add('visible'); return; }
    const fHash = await sha256(input.value);
    if (fHash === folder._hash) {
      folder._unlocked = true;
      renderSubfolderGrid(sectionKey, sec, folder);
    } else {
      error.classList.add('visible');
      input.value = '';
      input.focus();
      setTimeout(() => error.classList.remove('visible'), 3000);
    }
  });

  input.focus();
}


// --- Subfolder tool grid ---
function renderSubfolderGrid(sectionKey, sec, folder) {
  const total = folder.tools.length;
  const folderTitle = folder.name || 'Subfolder';
  const safeTitle = escapeHtml(folderTitle);
  const cards = folder.tools.map((tool, i) => {
    const safeName = escapeHtml(tool.name);
    const ariaLabel = escapeHtml(`${tool.name}, tool, ${i + 1} of ${total}`);
    return `
    <li role="listitem" class="tool-grid-cell">
      <a href="#" class="tool-grid-card reveal" data-folder-tool-index="${i}" aria-label="${ariaLabel}">
        <span class="tool-grid-name">${safeName}</span>
        ${ARROW_SVG}
      </a>
    </li>
  `;
  }).join('');

  main.innerHTML = `
    <section class="section-page" aria-labelledby="subfolderTitle">
      <div class="section-hero">
        <a href="#" class="back-link reveal" id="subfolderBack" aria-label="Back to section">${BACK_SVG}</a>
      </div>
      <div class="tool-grid-container">
        <h2 class="section-folder-title" id="subfolderTitle">${safeTitle}</h2>
        ${SECTION_SEARCH_HTML}
        <ul class="tool-grid" role="list" aria-label="${safeTitle} tools">${cards}</ul>
        <div class="section-search-empty" id="sectionSearchEmpty" role="status" aria-live="polite" style="display:none">No tools match your search</div>
      </div>
    </section>
  `;

  document.getElementById('subfolderBack').addEventListener('click', (e) => {
    e.preventDefault();
    renderSection(sectionKey);
  });

  initSectionSearch();

  main.querySelectorAll('.tool-grid-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const tIdx = parseInt(card.dataset.folderToolIndex);
      const tool = folder.tools[tIdx];
      // Set hash to section/tool-slug for shareable URLs
      const slug = getToolSlug(tool);
      location.hash = `${sectionKey}/${slug}`;
    });
  });

  initReveal();
}


// --- Operating Instructions Panel ---
const INFO_SVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
const CLOSE_INFO_SVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
const COPY_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`;

function getToolInstructionsHTML(tool, sectionKey) {
  const slug = getToolSlug(tool);
  const shareUrl = `${location.origin}${location.pathname}#${sectionKey}/${slug}`;

  return `
    <div class="info-panel-backdrop" id="infoPanelBackdrop"></div>
    <div class="info-panel" id="infoPanel">
      <div class="info-panel-header">
        <h3 class="info-panel-title">${tool.name}</h3>
        <button class="info-panel-close" id="infoPanelClose" aria-label="Close">${CLOSE_INFO_SVG}</button>
      </div>
      <div class="info-panel-body">
        <div class="info-section">
          <ul class="info-list">
            <li>Tap <strong>←</strong> to return to tools</li>
            <li>All data is stored <strong>locally</strong> on your device</li>
            <li>No data is transmitted to any server</li>
            <li>For <strong>reference only</strong> — not a substitute for professional engineering judgment</li>
          </ul>
        </div>
        <div class="info-section">
          <h4 class="info-heading">Share</h4>
          <div class="info-share-row">
            <input type="text" class="info-share-input" id="infoShareUrl" value="${shareUrl}" readonly>
            <button class="info-share-copy" id="infoShareCopy" aria-label="Copy link">${COPY_SVG}</button>
          </div>
          <div class="info-copy-toast" id="infoCopyToast">Copied!</div>
        </div>
        <div class="info-section info-footer">
          <span><strong>Korb Engineering</strong> · korb.engineering</span>
        </div>
      </div>
    </div>
  `;
}

function initInfoPanel() {
  const infoBtn = main.querySelector('.info-btn');
  const panel = document.getElementById('infoPanel');
  const closeBtn = document.getElementById('infoPanelClose');
  const copyBtn = document.getElementById('infoShareCopy');
  const urlInput = document.getElementById('infoShareUrl');
  const toast = document.getElementById('infoCopyToast');

  const backdrop = document.getElementById('infoPanelBackdrop');
  if (!infoBtn || !panel) return;

  function openInfo() { panel.classList.add('open'); if (backdrop) backdrop.classList.add('open'); }
  function closeInfo() { panel.classList.remove('open'); if (backdrop) backdrop.classList.remove('open'); }

  infoBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.contains('open') ? closeInfo() : openInfo();
  });

  closeBtn.addEventListener('click', closeInfo);
  if (backdrop) backdrop.addEventListener('click', closeInfo);

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(urlInput.value).then(() => {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 1500);
    });
  });
}


// --- Subfolder tool embed (back goes to subfolder, not section) ---
function renderSubfolderToolEmbed(sectionKey, sec, folder, tool) {
  // NOTE on sandbox: the iframe below carries both allow-scripts AND
  // allow-same-origin, which per the HTML spec means sandbox provides NO
  // origin isolation — the framed tool runs with full same-origin access
  // to the parent shell. This is intentional: the tools read/write their
  // own localStorage under the korb_ prefix, need File API, etc., and we
  // own every tool in the repo. The sandbox attribute here is effectively
  // a layout/UX hint, not a security boundary. See SECURITY-REVIEW M1.
  const safeFile = escapeHtml(tool.file);
  const safeName = escapeHtml(tool.name);
  main.innerHTML = `
    <section class="section-page tool-embed-page">
      <div class="tool-topbar">
        <button type="button" class="back-link tool-back-btn" aria-label="Back to folder">${BACK_SVG}</button>
        <button type="button" class="info-btn" aria-label="Operating Instructions">${INFO_SVG}</button>
      </div>
      ${getToolInstructionsHTML(tool, sectionKey)}
      <iframe class="tool-iframe" src="${safeFile}" title="${safeName}" aria-label="${safeName} tool" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads allow-modals" allow="geolocation; microphone; camera; clipboard-write; display-capture" allowfullscreen></iframe>
    </section>
  `;

  main.querySelector('.tool-back-btn').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const iframe = main.querySelector('.tool-iframe');
    if (iframe) iframe.remove();
    // Navigate back to section grid
    location.hash = sectionKey;
  });

  initInfoPanel();
}


// DNA helix loading animation SVG-free markup
const HELIX_LOADER_HTML = `<div class="helix-loader" id="helixLoader">
  <div class="strand strand-a"><div class="node"></div><div class="node"></div><div class="node"></div><div class="node"></div></div>
  <div class="strand strand-b"><div class="node"></div><div class="node"></div><div class="node"></div><div class="node"></div></div>
  <div class="strand"><div class="rung"></div><div class="rung"></div><div class="rung"></div><div class="rung"></div></div>
</div>`;

function renderToolEmbed(key, sec, tool) {
  const hs = document.getElementById('homeStatus');
  if (hs) hs.remove();
  // sandbox note: see renderSubfolderToolEmbed above. allow-scripts +
  // allow-same-origin means this is NOT a security boundary.
  const safeFile = escapeHtml(tool.file);
  const safeName = escapeHtml(tool.name);
  main.innerHTML = `
    <section class="section-page tool-embed-page">
      <div class="tool-topbar">
        <button type="button" class="back-link tool-back-btn" aria-label="Back to section">${BACK_SVG}</button>
        ${HELIX_LOADER_HTML}
        <button type="button" class="info-btn" aria-label="Operating Instructions">${INFO_SVG}</button>
      </div>
      ${getToolInstructionsHTML(tool, key)}
      <iframe class="tool-iframe" src="${safeFile}" title="${safeName}" aria-label="${safeName} tool" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads allow-modals" allow="geolocation; microphone; camera; clipboard-write; display-capture" allowfullscreen></iframe>
    </section>
  `;

  // Fade out helix loader when iframe finishes loading
  const iframe = main.querySelector('.tool-iframe');
  const loader = document.getElementById('helixLoader');
  if (iframe && loader) {
    iframe.addEventListener('load', () => {
      loader.classList.add('done');
    });
    // Safety timeout — hide loader after 12s even if load event doesn't fire
    setTimeout(() => { if (loader) loader.classList.add('done'); }, 12000);
  }

  // Use button + JS navigation to reliably exit iframe context
  main.querySelector('.tool-back-btn').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Remove iframe first to stop any running content
    const iframe = main.querySelector('.tool-iframe');
    if (iframe) iframe.remove();
    // Navigate back to section grid
    location.hash = key;
  });

  initInfoPanel();
}


// --- About Page ---
function renderAboutPage() {
  const nameStyle = 'font-family:var(--font-mono);font-size:var(--text-sm);letter-spacing:0.12em;color:var(--vfd-cyan);margin-top:10px;text-align:center;text-shadow:0 0 12px rgba(0,212,255,0.4);';

  const companyEntryStyle = 'margin-bottom:28px;';
  const companyNameStyle = 'font-family:var(--font-mono);font-size:var(--text-base);letter-spacing:0.08em;color:var(--vfd-cyan);margin:0;text-shadow:0 0 12px rgba(0,212,255,0.4);';
  const companyDatesStyle = 'color:#ff6600;font-size:var(--text-sm);margin-left:6px;text-shadow:0 0 6px rgba(255,102,0,0.3);';
  const companyDetailStyle = 'color:rgba(0,212,255,0.6);font-size:var(--text-xs);letter-spacing:0.04em;margin:4px 0 0;line-height:1.7;';

  main.innerHTML = `
    <section class="section-page section-page--about">
      <div class="section-hero">
        <a href="#" class="back-link reveal" aria-label="Back to home">${BACK_SVG}</a>
      </div>
      <div class="about-content reveal">
        <h1 class="about-heading" style="display:flex;justify-content:center;"><span style="width:80px;height:100px;color:var(--vfd-cyan);">${K_LOGO_SVG}</span></h1>
        <p class="about-text" style="font-style:italic;max-width:520px;margin:var(--space-4) auto 0;line-height:1.8;font-size:var(--text-base);color:var(--vfd-cyan);text-shadow:0 0 14px rgba(0,212,255,0.45);">"If I have seen further, it is by standing on the shoulders of giants."</p>
        <p class="about-text" style="color:var(--vfd-cyan);opacity:0.75;font-size:var(--text-sm);margin-top:8px;letter-spacing:0.05em;">— Isaac Newton, 1675</p>

        <div style="text-align:center;">
          <img id="about-photo-1" src="./tools/misc/images/monte-and-harrison.jpg" alt="Monte Walter Korb" class="about-photo">
          <p id="about-name-1" style="${nameStyle}">Monte Walter Korb</p>
        </div>

        <div style="text-align:center;margin-top:16px;">
          <img id="about-photo-2" src="./tools/misc/images/andy-and-harrison.jpg" alt="Andrew Douglas Korb" class="about-photo" style="object-fit:contain;background:transparent;border:none;box-shadow:none;">
          <p id="about-name-2" style="${nameStyle}">Andrew Douglas Korb</p>
        </div>

        <div style="text-align:center;margin-top:16px;">
          <img id="about-photo-3" src="./tools/misc/images/alan-and-harrison.jpg" alt="Monte Alan Korb" class="about-photo">
          <p id="about-name-3" style="${nameStyle}">Monte Alan Korb</p>
        </div>

        <div id="company-history" style="max-width:640px;margin:48px auto 0;text-align:left;">
          <h2 style="font-family:var(--font-mono);font-size:var(--text-lg);letter-spacing:0.25em;color:var(--vfd-cyan);text-align:center;margin-bottom:32px;text-shadow:0 0 14px rgba(0,212,255,0.45);">KORB ENGINEERING</h2>

          <div style="${companyEntryStyle}">
            <p style="${companyNameStyle}">Korb Engineering Company <span style="${companyDatesStyle}">1972 - 2014</span></p>
            <p style="${companyDetailStyle}">Established in 1972</p>
            <p style="${companyDetailStyle}">Closed in 2014</p>
            <p style="${companyDetailStyle}">Key Principal: Monte Walter Korb</p>
            <p style="${companyDetailStyle};margin-top:10px;line-height:1.8;">Monte attended Georgia Institute of Technology under the GI bill and received his Bachelors of Mechanical Engineering in 1950. Monte worked with Werner Von Braun at Redstone Arsenal in Huntsville, Alabama. He was a visionary and received a patent for a nozzle attachment for the control of the range and thrust of solid propellant rocket motors in 1965. He was licensed as a Professional Engineer in the state of Georgia in 1968. Monte formed Korb Engineering Company on St. Simons Island, Georgia in 1972. He practiced engineering for forty-plus years before retiring in 2014.</p>
          </div>

          <div style="${companyEntryStyle}">
            <p style="${companyNameStyle}">Korb Engineering of Florida <span style="${companyDatesStyle}">1986 - ?</span></p>
            <p style="${companyDetailStyle}">Florida Profit Corporation</p>
            <p style="${companyDetailStyle}">Engineering Business Registry License no. 4550</p>
            <p style="${companyDetailStyle}">Established in 1986</p>
            <p style="${companyDetailStyle}">Closed in ?</p>
            <p style="${companyDetailStyle}">Key Principal: Monte Alan Korb</p>
          </div>

          <div style="${companyEntryStyle}">
            <p style="${companyNameStyle}">Korb Engineering of Florida, Inc. <span style="${companyDatesStyle}">1996 - 2025</span></p>
            <p style="${companyDetailStyle}">Florida Profit Corporation</p>
            <p style="${companyDetailStyle}">Engineering Business Registry License no. 26329</p>
            <p style="${companyDetailStyle}">Established in 1996 (using the same name dissolved earlier)</p>
            <p style="${companyDetailStyle}">Closed in 2025</p>
            <p style="${companyDetailStyle}">Key Principal: Andrew Douglas Korb</p>
          </div>

          <div style="${companyEntryStyle}">
            <p style="${companyNameStyle}">McAllister-Gates, Inc. <span style="${companyDatesStyle}">1998 - 1999</span></p>
            <p style="${companyDetailStyle}">Florida Profit Corporation</p>
            <p style="${companyDetailStyle}">Established in 1998</p>
            <p style="${companyDetailStyle}">Closed in 1999</p>
            <p style="${companyDetailStyle}">Key Principal: Monte Alan Korb</p>
          </div>

          <div style="${companyEntryStyle}">
            <p style="${companyNameStyle}">Korb Engineered Systems, Inc. <span style="${companyDatesStyle}">2004 - 2012</span></p>
            <p style="${companyDetailStyle}">Florida Profit Corporation</p>
            <p style="${companyDetailStyle}">Established in 2004</p>
            <p style="${companyDetailStyle}">Closed in 2012</p>
            <p style="${companyDetailStyle}">Key Principal: Monte Alan Korb</p>
          </div>
        </div>
      </div>
    </section>
  `;
  initReveal();

  // Audio removed — was auto-playing on iPhone and triggering reader mode
}


function renderPasswordGate(key, sec) {
  const lockSvg = `<svg class="gate-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="10" y="22" width="28" height="20" rx="4"/><path d="M16 22v-6a8 8 0 0116 0v6"/><circle cx="24" cy="33" r="3"/><path d="M24 36v3"/></svg>`;

  main.innerHTML = `
    <section class="section-page">
      <div class="section-hero">
        <a href="#" class="back-link" id="gateBack" aria-label="Back to home">${BACK_SVG}</a>
      </div>
      <div class="password-gate">
        <div class="gate-box">
          ${lockSvg}
          <h2 class="gate-title">HK</h2>
          <form class="gate-form" id="gateForm">
            <label for="gatePassword" class="sr-only">Password</label>
            <input type="password" id="gatePassword" class="gate-input" placeholder="_ _ _ _ _ _" autocomplete="off" required>
            <button type="submit" class="gate-btn">Unlock</button>
          </form>
          <p class="gate-error" id="gateError">Access denied.</p>
        </div>
      </div>
    </section>
  `;

  document.getElementById('gateBack').addEventListener('click', (e) => {
    e.preventDefault();
    navigate('home');
  });

  const form = document.getElementById('gateForm');
  const input = document.getElementById('gatePassword');
  const error = document.getElementById('gateError');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const hash = await sha256(input.value);
    if (hash === sec._hash) {
      sec._unlocked = true;
      renderSection(key);
    } else {
      error.classList.add('visible');
      input.value = '';
      input.focus();
      setTimeout(() => error.classList.remove('visible'), 3000);
    }
  });

  input.focus();
}

// --- Scroll Reveal ---
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 50);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

// --- Accessibility: announce route changes to screen readers ---
function announceRoute(label) {
  const el = document.getElementById('routeAnnouncer');
  if (!el) return;
  // Clear then set so SR re-announces even if text hasn't changed
  el.textContent = '';
  setTimeout(() => { el.textContent = label; }, 30);
}

function routeToLabel(route) {
  if (!route || route === 'home') return 'Home';
  if (route === 'about') return 'About Korb Engineering';
  if (route === 'repository') return 'Tool repository';
  if (route.includes('/')) {
    const parts = route.split('/');
    return parts.map((p) => p.replace(/-/g, ' ')).join(' — ');
  }
  return route.replace(/-/g, ' ');
}

// --- Route Handler ---
function handleRoute() {

  const route = getRoute();
  window.scrollTo(0, 0);
  announceRoute(routeToLabel(route));
  // Move focus to main for keyboard users after navigation
  const main = document.getElementById('mainContent');
  if (main && document.activeElement !== main) {
    // Defer so renders complete first
    setTimeout(() => { try { main.focus({ preventScroll: true }); } catch (_) { main.focus(); } }, 0);
  }

  if (route === 'home' || route === '') {
    renderHome();
  } else if (route === 'about') {
    renderAboutPage();
  } else if (route === 'repository') {
    renderRepository();
  } else if (route.includes('/')) {
    // Tool-level route: section/tool-slug
    const slashIdx = route.indexOf('/');
    const sectionKey = route.substring(0, slashIdx);
    const toolSlug = route.substring(slashIdx + 1);
    const sec = SECTIONS[sectionKey];

    if (sec) {
      // For locked sections, check if unlocked
      if (sec.locked && !sec._unlocked) {
        renderPasswordGate(sectionKey, sec);
        return;
      }

      const result = findToolBySlug(sec, toolSlug);
      if (result) {
        if (result.folder) {
          // Subfolder tool — check folder lock
          if (result.folder.locked && !result.folder._unlocked) {
            renderFolderPasswordGate(sectionKey, sec, result.folder);
          } else {
            renderSubfolderToolEmbed(sectionKey, sec, result.folder, result.tool);
          }
        } else {
          renderToolEmbed(sectionKey, sec, result.tool);
        }
      } else {
        // Tool slug not found, show section
        renderSection(sectionKey);
      }
    } else {
      renderHome();
    }
  } else if (SECTIONS[route]) {
    renderSection(route);
  } else {
    renderHome();
  }
}

// --- Init ---
window.addEventListener('hashchange', handleRoute);
window.addEventListener('popstate', handleRoute);
document.getElementById('homeLink').addEventListener('click', (e) => {
  e.preventDefault();
  navigate('home');
});

handleRoute();

// --- Scroll-to-top button ---
(function() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  const scrollHost = main; // main is the SPA content container
  function checkScroll() {
    const y = scrollHost.scrollTop || window.scrollY || 0;
    btn.classList.toggle('visible', y > 400);
  }
  main.addEventListener('scroll', checkScroll, { passive: true });
  window.addEventListener('scroll', checkScroll, { passive: true });
  btn.addEventListener('click', () => {
    main.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
