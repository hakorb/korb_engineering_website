/* ============================================
   Korb.Engineering — Single Page Application
   VFD / Segmented Display Edition
   ============================================ */

// --- Security: SHA-256 hash for password gates ---
async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
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
      { name: 'ADA Compliance Checker', file: './tools/aviation/ada-compliance-checker.html' },
      { name: 'Aircraft Maintenance Calculator', file: './tools/aviation/aircraft-maintenance-calculator.html' },
      { name: "Airport Manager's Friend", file: './tools/aviation/airport-managers-friend.html' },
      { name: 'AirNav Explorer', file: './tools/aviation/airnav-explorer.html' },
      { name: 'ALP Guidance', file: './tools/aviation/alp-tracker.html' },
      { name: 'Altitude Calculator', file: './tools/aviation/altitude-calculator.html' },
      { name: 'Aviation Fuel Pricing', file: './tools/aviation/aviation-fuel-pricing.html' },
      { name: 'BRL-CAD', file: './tools/civil/brl-cad.html' },
      { name: 'BuildBook Project', file: './tools/aviation/buildbook-project.html' },
      { name: 'Bulk Photo Timestamp', file: './tools/civil/bulk-field-photos-timestamp-tool.html' },
      { name: 'Capital Improvement Planner (CIP)', file: './tools/civil/capital-planning.html' },
      { name: 'Compliance Checklist', file: './tools/civil/compliance-checklist.html' },
      { name: 'Construction Estimator', file: './tools/civil/construction-estimator.html' },
      { name: 'Contract Simplifier', file: './tools/civil/contract-simplifier.html' },
      { name: 'Critical Path Method', file: './tools/aviation/critical-path-method.html' },
      { name: 'Daily Field Report', file: './tools/civil/DailyFieldReport.html' },
      { name: 'DXF Viewer', file: './tools/aviation/dxf-viewer.html' },
      { name: 'E6B Calculator', file: './tools/aviation/e6b-calculator.html' },
      { name: 'Earned Value Mgmt', file: './tools/civil/earned-value-mgmt.html' },
      { name: 'Erosion Control', file: './tools/civil/erosion-control.html' },
      { name: 'Facility Evaluation Tool', file: './tools/civil/ETAM_Engineering_Evaluation_Tool.html' },
      { name: 'Flight Time Logger', file: './tools/aviation/flight-time-logger.html' },
      { name: 'Front End Documents', file: './tools/civil/front-end-documents.html' },
      { name: '360° Photo Stitcher', file: './tools/aviation/360-photo-stitcher.html' },
      { name: 'DBE Participation Calculator', file: './tools/aviation/dbe-calculator.html' },
      { name: 'Design Aircraft Repository', file: './tools/aviation/design-aircraft-repository.html' },
      { name: 'Fuel Burn Calculator', file: './tools/aviation/fuel-burn-calculator.html' },
      { name: 'Fuel Station Designer', file: './tools/aviation/fuel-station-designer.html' },
      { name: 'Gantt Project', file: './tools/civil/gantt-project.html' },
      { name: 'Geotech Investigation RFP', file: './tools/aviation/geotech-rfp-tool.html' },
      { name: 'Geospatial Tools', file: './tools/civil/geospatial-tools.html' },
      { name: 'Graphing Calculator', file: './tools/aviation/1980s-calculator.html' },
      { name: 'Hangar Door Selector', file: './tools/aviation/hangar-door-selector.html' },
      { name: 'Holding Pattern Calculator', file: './tools/aviation/holding-pattern-calculator.html' },
      { name: 'Kanban Board', file: './tools/misc/kanban-board.html' },
      { name: 'Legal Advisor', file: './tools/misc/legal-advisor.html' },
      { name: 'Measurement & Annotation', file: './tools/aviation/measurement-annotation-tool.html' },
      { name: 'Meeting Recorder', file: './tools/civil/meeting.html' },
      { name: 'Metal Building Selector', file: './tools/aviation/metal-building-selector.html' },
      { name: 'METAR/TAF Decoder', file: './tools/aviation/metar-decoder.html' },
      { name: 'Megger Test Report', file: './tools/aviation/megger-test-report.html' },
      { name: 'Morse Machine', file: './tools/aviation/korb_morse_machine.html' },
      { name: 'Noise Contour Planner', file: './tools/aviation/noise-contour-planner.html' },
      { name: 'NPV/IRR Calculator', file: './tools/aviation/npv-irr-calculator.html' },
      { name: 'Omni Calculator', file: './tools/aviation/omni-calculator.html' },
      { name: 'Online Bidder', file: './tools/civil/bid-express.html' },
      { name: 'OpenProject', file: './tools/civil/openproject.html' },
      { name: 'Pavement Evaluator', file: './tools/aviation/airfield-pavement-evaluator.html' },
      { name: 'Pavement Management Plan', file: './tools/aviation/pavement-management-plan.html' },
      { name: 'PDF Editor', file: './tools/civil/pdf-editor.html' },
      { name: 'Performance Spec', file: './tools/aviation/performance-spec-tool.html' },
      { name: 'PERT Calculator', file: './tools/aviation/pert-calculator.html' },
      { name: 'Pomodoro Timer', file: './tools/misc/pomodoro-timer.html' },
      { name: 'Pre-Flight Checklist', file: './tools/aviation/pre-flight-checklist.html' },
      { name: 'Construction Commander', file: './tools/aviation/procore-project-manager.html' },
      { name: 'Proposal Scope & Fee Generator', file: './tools/aviation/proposal-scope-fee.html' },
      { name: 'Punch List', file: './tools/aviation/punch-list.html' },
      { name: 'PWL Calculator', file: './tools/civil/pwl-calculator.html' },
      { name: 'QA/QC Checklist', file: './tools/hk/super-secret-access/qaqc-checklist.html' },
      { name: 'QR Generator', file: './tools/misc/qr-generator.html' },
      { name: 'Relationship Tracker', file: './tools/hk/relationship-tracker.html' },
      { name: 'Resource Leveling', file: './tools/aviation/resource-leveling.html' },
      { name: 'RFP Response Generator', file: './tools/civil/rfp-response-generator.html' },
      { name: 'RFQ Tracker', file: './tools/aviation/rfq-tracker.html' },
      { name: 'ROI Calculator', file: './tools/aviation/roi-calculator.html' },
      { name: 'Survey Proposal Generator', file: './tools/aviation/survey-proposal-tool.html' },
      { name: 'Contractor Bid Notification', file: './tools/aviation/contractor-bid-notification.html' },
      { name: 'SWOT Analysis', file: './tools/aviation/swot-analysis.html' },
      { name: 'Scope Creep Counselor', file: './tools/civil/scope-creep-counselor.html' },
      { name: 'Scope Gap Detector', file: './tools/civil/scope-gap-detector.html' },
      { name: 'Sociopath Identifier', file: './tools/aviation/sociopath-identifier.html' },
      { name: 'Submittal Review', file: './tools/civil/submittal-review.html' },
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
      { name: 'Constraint Optimizer', file: './tools/hk/constraint-optimizer.html' },
      { name: 'Content Calendar', file: './tools/hk/content-calendar.html' },
      { name: 'Decision Journal', file: './tools/hk/decision-journal.html' },
      { name: 'DWG Viewer', file: './tools/civil/dwg-viewer.html' },
      { name: 'Dynamic CIP', file: './tools/civil/dynamic-cip.html' },
      { name: 'Earthwork & Grading Calculator', file: './tools/civil/earthwork-grading-calculator.html' },
      { name: 'Eisenhower Priority Matrix', file: './tools/civil/eisenhower-matrix.html' },
      { name: 'EPANet Water', file: './tools/civil/epanet-water.html' },
      { name: 'File Share', file: './tools/civil/file-share-tool.html' },
      { name: 'Financial Planner', file: './tools/hk/financial-planner.html' },
      { name: 'Gift Finder', file: './tools/hk/gift-finder.html' },
      { name: "Harrison's iPod", file: './tools/hk/harrisons-ipod.html' },
      { name: 'HEC-HMS', file: './tools/civil/hec-hms.html' },
      { name: 'HEC-RAS Open', file: './tools/civil/HECRASOpen.html' },
      { name: 'Korb Dossier', file: './tools/hk/korb-dossier.html' },
      { name: 'Invoice Generator', file: './tools/civil/invoice-generator.html' },
      { name: 'KPI Watchdog', file: './tools/civil/kpi-watchdog.html' },
      { name: 'LaTeX Editor', file: './tools/civil/harrison-latex-editor.html' },
      { name: 'Logo Overlay', file: './tools/civil/korb-logo-overlay.html' },
      { name: 'Meeting Adversary', file: './tools/hk/meeting-adversary.html' },
      { name: 'Meeting Minutes', file: './tools/civil/meeting-minutes.html' },
      { name: 'Negotiation Simulator', file: './tools/hk/negotiation-simulator.html' },
      { name: 'OpenFOAM CFD', file: './tools/civil/openfoam-cfd.html' },
      { name: 'PCI Inspector', file: './tools/civil/pci-inspector.html' },
      { name: 'Policy Writer', file: './tools/civil/policy-writer.html' },
      { name: 'Pre-mortem Generator', file: './tools/hk/pre-mortem-generator.html' },
      { name: 'Risk Register', file: './tools/civil/risk-register.html' },
      { name: 'Root Cause Analyzer', file: './tools/civil/root-cause-analyzer.html' },
      { name: 'Scenario Modeler', file: './tools/hk/scenario-modeler.html' },
      { name: 'Shopping Decision Engine', file: './tools/hk/shopping-decision-engine.html' },
      { name: 'Smart Home', file: './tools/hk/smart-home-automation.html' },
      { name: 'Soil Classification Tool', file: './tools/civil/soil-classification-tool.html' },
      { name: 'Spreadsheet Interpreter', file: './tools/civil/spreadsheet-interpreter.html' },
      { name: 'Stakeholder Matrix', file: './tools/civil/stakeholder-matrix.html' },
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
      { name: 'Korb Travel', file: './tools/hk/super-secret-access/tripit-clone.html' },
      { name: 'Metadata Scrubber', file: './tools/hk/korb-metadata-scrubber.html' },
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
      { name: '2D to 3D Generator', file: './tools/misc/2d-to-3d-generator.html' },
      { name: '2048', file: './tools/misc/2048.html' },
      { name: "AJ's Synthesizer", file: './tools/misc/ajs-synthesizer.html' },
      { name: '3D Print Library', file: './tools/misc/3d-print-library.html' },
      { name: 'AI Tax Counsel', file: './tools/misc/ai-tax-counsel.html' },
      { name: "Alan's Virtual Caddy", file: './tools/misc/alans-virtual-caddy.html' },
      { name: 'Aprende Spanish', file: './tools/misc/aprende-spanish.html' },
      { name: 'Audiobook Player', file: './tools/misc/audiobook-player.html' },
      { name: 'Backyard Baseball', file: './tools/misc/backyard-baseball.html' },
      { name: 'Battleship', file: './tools/misc/battleship.html' },
      { name: 'Chess', file: './tools/misc/chess.html' },
      { name: 'Chinese Checkers', file: './tools/misc/chinese-checkers.html' },
      { name: 'Clock & Stopwatch', file: './tools/misc/clock-stopwatch.html' },
      { name: 'Color Palette', file: './tools/misc/color-palette.html' },
      { name: 'Connect Four', file: './tools/misc/connect-four.html' },
      { name: 'Crossword', file: './tools/misc/crossword.html' },
      { name: 'Dev Toolkit', file: './tools/misc/dev-toolkit.html' },
      { name: 'DFW Events & Deals', file: './tools/misc/dfw-events.html' },
      { name: 'Korb Digital Lending Library', file: './tools/misc/digital-library.html' },
      { name: 'Dinner Recommender', file: './tools/misc/dinner-recommender.html' },
      { name: 'Dungeon Quest', file: './tools/misc/dungeon-quest.html' },
      { name: 'Ebook Reader', file: './tools/misc/ebook-reader.html' },
      { name: 'File Converter', file: './tools/misc/file-converter.html' },
      { name: 'Fidget Spinner', file: './tools/misc/fidget-spinner.html' },
      { name: 'Flowchart Maker', file: './tools/misc/flowchart-maker.html' },
      { name: 'Frogger', file: './tools/misc/frogger.html' },
      { name: 'Frisco Weather', file: './tools/misc/frisco-weather.html' },
      { name: 'Guitar Tuner', file: './tools/misc/guitar-tuner.html' },
      { name: 'Habit Tracker', file: './tools/misc/habit-tracker.html' },
      { name: "Harrison's Blog", file: './tools/misc/harrisons-blog.html' },
      { name: 'Home Improvements Guide', file: './tools/misc/home-improvements.html' },
      { name: 'Horse Racing', file: './tools/misc/horse-racing.html' },
      { name: 'Jung-Ho Bridge', file: './tools/misc/jung-ho-bridge.html' },
      { name: 'Korb Cookbook', file: './tools/misc/korb-cookbook.html' },
      { name: 'Korb Flow Chart Maker', file: './tools/misc/korb-flowchart-maker.html' },
      { name: 'Korb Farm Collective', file: './tools/misc/korb-farm-collective.html' },
      { name: 'Korb Mematic', file: './tools/misc/meme-generator.html' },
      { name: 'Korb Terminal', file: './tools/misc/bloomberg-terminal.html' },
      { name: 'Leadership Forge', file: './tools/misc/leadership-principles.html' },
      { name: 'Lunar Lander', file: './tools/misc/lunar-lander.html' },
      { name: "Mary Kay's Recipes", file: './tools/misc/mary-kays-recipes.html' },
      { name: 'Markdown Editor', file: './tools/misc/markdown-editor.html' },
      { name: 'Mexican Grocery Guide', file: './tools/misc/mexican-grocery-guide.html' },
      { name: 'Metronome', file: './tools/misc/metronome.html' },
      { name: 'Minesweeper', file: './tools/misc/minesweeper.html' },
      { name: 'Music Library', file: './tools/misc/music-library.html' },
      { name: 'Moving Specialist Invoice', file: './tools/misc/moving-invoice.html' },
      { name: 'Nutrition Tracker 3000', file: './tools/misc/TheNutritionTracker3000.html' },
      { name: 'OrcaSlicer Studio', file: './tools/misc/orcaslicer_studio.html' },
      { name: 'Painting Studio', file: './tools/misc/painting-studio.html' },
      { name: 'Paper.io', file: './tools/misc/paper-io.html' },
      { name: 'Password Forge', file: './tools/misc/password-forge.html' },
      { name: 'Pixel Art Editor', file: './tools/misc/pixel-art-editor.html' },
      { name: 'Pipe Sizing Tool', file: './tools/aviation/pipe-sizing-tool.html' },
      { name: 'Pong', file: './tools/misc/pong.html' },
      { name: 'Quick Reference Guide', file: './tools/misc/quick-reference-guide.html' },
      { name: 'Podcast Player', file: './tools/misc/podcast-player.html' },
      { name: 'Scandinavian Interior Design', file: './tools/misc/scandinavian-interior-design.html' },
      { name: 'Screen Recorder', file: './tools/misc/screen-recorder.html' },
      { name: 'Simon', file: './tools/misc/simon.html' },
      { name: 'Situation Monitor', file: './tools/misc/situation-monitor.html' },
      { name: 'Soundboard', file: './tools/misc/soundboard.html' },
      { name: 'Speak & Spell', file: './tools/misc/speak-and-spell.html' },
      { name: 'Spreadsheet Tool', file: './tools/misc/spreadsheet-tool.html' },
      { name: 'Star Fox Lite', file: './tools/aviation/Star_Fox_Lite.html' },
      { name: 'Sudoku', file: './tools/misc/sudoku.html' },
      { name: 'Tanks', file: './tools/misc/tanks.html' },
      { name: 'Tetris', file: './tools/misc/tetris.html' },
      { name: 'Tic Tac Toe', file: './tools/misc/tic-tac-toe.html' },
      { name: 'The Void', file: './tools/misc/the-void.html' },
      { name: 'Text to Speech', file: './tools/misc/text-to-speech.html' },
      { name: 'Typing Test', file: './tools/misc/typing-test.html' },
      { name: 'Whiteboard', file: './tools/misc/whiteboard.html' },
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
  let el = document.getElementById('homeStatus');
  if (!el) {
    el = document.createElement('div');
    el.id = 'homeStatus';
    el.className = 'home-status';
    el.innerHTML = '<span class="status-dot"></span><span class="vfd-label">Online</span>';
    document.body.appendChild(el);
  }
  el.style.display = 'flex';
}

// Section search bar HTML template
const SECTION_SEARCH_HTML = `<div class="section-search-wrap">
  <div class="section-search-bar">
    <span class="search-icon">${SEARCH_SVG}</span>
    <input type="text" class="section-search-input" id="sectionSearch" placeholder="Search this folder..." autocomplete="off" spellcheck="false" inputmode="search">
    <button class="search-clear" id="sectionSearchClear" aria-label="Clear search" style="display:none">${CLEAR_SVG}</button>
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
      card.style.display = match ? '' : 'none';
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

  main.innerHTML = `
    <section class="landing">
      <h1 class="sr-only">Korb Engineering — Free Aviation &amp; Civil Engineering Tools</h1>
      <div class="search-bar-wrap">
        <div class="search-bar">
          <span class="search-icon">${SEARCH_SVG}</span>
          <input type="text" class="search-input" id="toolSearch" placeholder="Search tools..." autocomplete="off" spellcheck="false" inputmode="search">
          <button class="search-clear" id="searchClear" aria-label="Clear search" style="display:none">${CLEAR_SVG}</button>
        </div>
        <div class="search-results" id="searchResults"></div>
      </div>
      <div class="category-grid" id="categoryGrid">${cards}</div>
      <div class="landing-about">
        <a href="#about" class="about-btn">About</a>
      </div>
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
        <a href="#" class="back-link reveal">${BACK_SVG}</a>
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

  const cards = sec.tools.map((tool, i) => {
    const isFolder = tool.type === 'folder';
    const icon = isFolder ? (tool.locked ? lockIcon : folderIcon) : ARROW_SVG;
    const extraClass = isFolder ? ' tool-folder-card' : '';
    return `
    <a href="#" class="tool-grid-card${extraClass} reveal" data-section="${key}" data-tool-index="${i}">
      <span class="tool-grid-name">${tool.name}</span>
      ${icon}
    </a>
  `;
  }).join('');

  const sectionLabels = { aviation: 'Aviation', civil: 'Civil Engineering', misc: 'Miscellaneous', hk: 'HK' };
  const folderTitle = sectionLabels[key] || key.charAt(0).toUpperCase() + key.slice(1);

  main.innerHTML = `
    <section class="section-page">
      <div class="section-hero">
        <a href="#" class="back-link reveal">${BACK_SVG}</a>
      </div>
      <div class="tool-grid-container">
        <div class="section-folder-title">${folderTitle}</div>
        ${SECTION_SEARCH_HTML}
        <div class="tool-grid">${cards}</div>
        <div class="section-search-empty" id="sectionSearchEmpty" style="display:none">No tools match your search</div>
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
        <a href="#" class="back-link" id="folderGateBack">${BACK_SVG}</a>
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
  const cards = folder.tools.map((tool, i) => `
    <a href="#" class="tool-grid-card reveal" data-folder-tool-index="${i}">
      <span class="tool-grid-name">${tool.name}</span>
      ${ARROW_SVG}
    </a>
  `).join('');

  main.innerHTML = `
    <section class="section-page">
      <div class="section-hero">
        <a href="#" class="back-link reveal" id="subfolderBack">${BACK_SVG}</a>
      </div>
      <div class="tool-grid-container">
        <div class="section-folder-title">${folder.name || 'Subfolder'}</div>
        ${SECTION_SEARCH_HTML}
        <div class="tool-grid">${cards}</div>
        <div class="section-search-empty" id="sectionSearchEmpty" style="display:none">No tools match your search</div>
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
  main.innerHTML = `
    <section class="section-page tool-embed-page">
      <div class="tool-topbar">
        <button type="button" class="back-link tool-back-btn" aria-label="Back to folder">${BACK_SVG}</button>
        <button type="button" class="info-btn" aria-label="Operating Instructions">${INFO_SVG}</button>
      </div>
      ${getToolInstructionsHTML(tool, sectionKey)}
      <iframe class="tool-iframe" src="${tool.file}" title="${tool.name}" sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads allow-modals" allow="geolocation; microphone; camera; clipboard-write; display-capture" allowfullscreen></iframe>
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
  if (hs) hs.style.display = 'none';
  main.innerHTML = `
    <section class="section-page tool-embed-page">
      <div class="tool-topbar">
        <button type="button" class="back-link tool-back-btn" aria-label="Back to section">${BACK_SVG}</button>
        ${HELIX_LOADER_HTML}
        <button type="button" class="info-btn" aria-label="Operating Instructions">${INFO_SVG}</button>
      </div>
      ${getToolInstructionsHTML(tool, key)}
      <iframe class="tool-iframe" src="${tool.file}" title="${tool.name}" sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads allow-modals" allow="geolocation; microphone; camera; clipboard-write; display-capture" allowfullscreen></iframe>
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
    <section class="section-page">
      <div class="section-hero">
        <a href="#" class="back-link reveal">${BACK_SVG}</a>
      </div>
      <div class="about-content reveal">
        <h1 class="about-heading" style="display:flex;justify-content:center;"><span style="width:80px;height:100px;color:var(--vfd-cyan);">${K_LOGO_SVG}</span></h1>
        <p class="about-text" style="font-style:italic;max-width:520px;margin:var(--space-4) auto 0;line-height:1.8;font-size:var(--text-base);color:var(--vfd-cyan);text-shadow:0 0 14px rgba(0,212,255,0.45);">"If I have seen further, it is by standing on the shoulders of giants."</p>
        <p class="about-text" style="color:var(--vfd-cyan);opacity:0.75;font-size:var(--text-sm);margin-top:8px;letter-spacing:0.05em;">— Isaac Newton, 1675</p>

        <div style="text-align:center;">
          <img id="about-photo-1" src="./tools/misc/images/monte-and-harrison.jpg" alt="Monte Walter Korb" class="about-photo">
          <p id="about-name-1" style="${nameStyle};display:none;">Monte Walter Korb</p>
        </div>

        <div style="text-align:center;margin-top:16px;">
          <img id="about-photo-2" src="./tools/misc/images/andy-and-harrison.jpg" alt="Andrew Douglas Korb" class="about-photo" style="object-fit:contain;background:transparent;">
          <p id="about-name-2" style="${nameStyle};display:none;">Andrew Douglas Korb</p>
        </div>

        <div style="text-align:center;margin-top:16px;">
          <img id="about-photo-3" src="./tools/misc/images/alan-and-harrison.jpg" alt="Monte Alan Korb" class="about-photo">
          <p id="about-name-3" style="${nameStyle};display:none;">Monte Alan Korb</p>
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


  // Names stay hidden until photo is visible
  function revealName(nameId) {
    const n = document.getElementById(nameId);
    if (n) { n.style.display = 'block'; }
  }

  // Photo 1: name after 5s
  setTimeout(() => revealName('about-name-1'), 5000);
  // Photo 2: name after 10s
  setTimeout(() => revealName('about-name-2'), 10000);
  // Photo 3: name after 15s
  setTimeout(() => revealName('about-name-3'), 15000);
}


function renderPasswordGate(key, sec) {
  const lockSvg = `<svg class="gate-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="10" y="22" width="28" height="20" rx="4"/><path d="M16 22v-6a8 8 0 0116 0v6"/><circle cx="24" cy="33" r="3"/><path d="M24 36v3"/></svg>`;

  main.innerHTML = `
    <section class="section-page">
      <div class="section-hero">
        <a href="#" class="back-link" id="gateBack">${BACK_SVG}</a>
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

// --- Route Handler ---
function handleRoute() {

  const route = getRoute();
  window.scrollTo(0, 0);

  if (route === 'home' || route === '') {
    renderHome();
  } else if (route === 'about') {
    renderAboutPage();
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
