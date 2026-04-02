/* ============================================
   Korb.Engineering — Single Page Application
   VFD / Segmented Display Edition
   ============================================ */

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
      { name: 'ALP Tracker', file: './tools/aviation/alp-tracker.html' },
      { name: 'Fuel Station Designer', file: './tools/aviation/fuel-station-designer.html' },
      { name: 'Graphing Calculator', file: './tools/aviation/1980s Calculator.html' },
      { name: 'Hangar Door Selector', file: './tools/aviation/hangar-door-selector.html' },
      { name: 'Megger Test Report', file: './tools/aviation/megger-test-report.html' },
      { name: 'Morse Machine', file: './tools/aviation/korb_morse_machine.html' },
      { name: 'Pavement Evaluator', file: './tools/aviation/airfield-pavement-evaluator.html' },
      { name: 'Performance Spec', file: './tools/aviation/performance-spec-tool.html' },
      { name: 'Pre-Flight Checklist', file: './tools/aviation/pre-flight-checklist.html' },
      { name: 'RFQ Tracker', file: './tools/aviation/rfq-tracker.html' },
      { name: 'Star Fox Lite', file: './tools/aviation/Star_Fox_Lite.html' },
      { name: 'Wind Rose Generator', file: './tools/aviation/wind-rose-generator.html' }
    ]
  },
  civil: {
    title: '',
    icon: K_LOGO_SVG,
    tools: [
      { name: 'AssetMax', file: './tools/civil/assetmax.html' },
      { name: 'BRL-CAD', file: './tools/civil/brl-cad.html' },
      { name: 'Build Orchestrator', file: './tools/civil/korb-engineering.html' },
      { name: 'Bulk Photo Timestamp', file: './tools/civil/bulk-field-photos-timestamp-tool.html' },
      { name: 'Capital Improvement Planner (CIP)', file: './tools/civil/capital-planning.html' },
      { name: 'Construction Estimator', file: './tools/civil/construction-estimator.html' },
      { name: 'Daily Field Report', file: './tools/civil/DailyFieldReport.html' },
      { name: 'DWG Viewer', file: './tools/civil/dwg-viewer.html' },
      { name: 'Dynamic CIP', file: './tools/civil/dynamic-cip.html' },
      { name: 'EPANet Water', file: './tools/civil/epanet-water.html' },
      { name: 'Earned Value Mgmt', file: './tools/civil/earned-value-mgmt.html' },
      { name: 'Erosion Control', file: './tools/civil/erosion-control.html' },
      { name: 'Facility Evaluation Tool', file: './tools/civil/ETAM_Engineering_Evaluation_Tool.html' },
      { name: 'File Share', file: './tools/civil/file-share-tool.html' },
      { name: 'Front End Documents', file: './tools/civil/front-end-documents.html' },
      { name: 'Gantt Project', file: './tools/civil/gantt-project.html' },
      { name: 'Geospatial Tools', file: './tools/civil/geospatial-tools.html' },
      { name: 'HEC-HMS', file: './tools/civil/hec-hms.html' },
      { name: 'HEC-RAS Open', file: './tools/civil/HECRASOpen.html' },
      { name: 'LaTeX Editor', file: './tools/civil/harrison-latex-editor.html' },
      { name: 'Logo Overlay', file: './tools/civil/korb-logo-overlay.html' },
      { name: 'Meeting Recorder', file: './tools/civil/meeting.html' },
      { name: 'Online Bidder', file: './tools/civil/bid-express.html' },
      { name: 'OpenFOAM CFD', file: './tools/civil/openfoam-cfd.html' },
      { name: 'OpenProject', file: './tools/civil/openproject.html' },
      { name: 'PCI Inspector', file: './tools/civil/pci-inspector.html' },
      { name: 'PDF Editor', file: './tools/civil/pdf-editor.html' },
      { name: 'PWL Calculator', file: './tools/civil/pwl-calculator.html' },
      { name: 'Submittal Review', file: './tools/civil/submittal-review.html' },
      { name: 'Taiga Scrum Config', file: './tools/civil/korb-taiga-config.html' },
      { name: 'TXT to HTML', file: './tools/civil/TXT_2_HTML_tool.html' },
      { name: 'Unit Converter', file: './tools/civil/engineering-unit-converter.html' }
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
    password: 'potato1',
    tools: [
      { name: 'Family Coordination', file: './tools/hk/family-coordination.html' },
      { name: 'Korb Dossier', file: './tools/hk/korb-dossier.html' },
      { name: 'Metadata Scrubber', file: './tools/hk/korb-metadata-scrubber.html' },
      {
        name: 'Super Secret Access!',
        type: 'folder',
        locked: true,
        password: 'potato2',
        _unlocked: false,
        tools: [
          { name: 'Korb Travel', file: './tools/hk/super-secret-access/tripit-clone.html' },
          { name: 'QA/QC Checklist', file: './tools/hk/super-secret-access/qaqc-checklist.html' }
        ]
      }
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
      { name: 'AI Tax Counsel', file: './tools/misc/ai-tax-counsel.html' },
      { name: "Alan's Virtual Caddy", file: './tools/misc/alans-virtual-caddy.html' },
      { name: 'Aprende Spanish', file: './tools/misc/aprende-spanish.html' },
      { name: 'ASL Learning Tool', file: './tools/misc/asl-learning-tool.html' },
      { name: 'Backyard Baseball', file: './tools/misc/backyard-baseball.html' },
      { name: "Boston Lee's ASL", file: './tools/misc/boston-lees-asl.html' },
      { name: 'Digital Library', file: './tools/misc/digital-library.html' },
      { name: 'Dinner Recommender', file: './tools/misc/dinner-recommender.html' },
      { name: 'F-Zero Lite', file: './tools/aviation/F_Zero_Lite.html' },
      { name: 'Jung-Ho Bridge', file: './tools/misc/jung-ho-bridge.html' },
      { name: 'Korb Cookbook', file: './tools/misc/korb-cookbook.html' },
      { name: 'Korb Mematic', file: './tools/misc/meme-generator.html' },
      { name: 'Korb Terminal', file: './tools/misc/bloomberg-terminal.html' },
      { name: 'Lunar Lander', file: './tools/misc/lunar-lander.html' },
      { name: 'Nutrition Tracker 3000', file: './tools/misc/TheNutritionTracker3000.html' },
      { name: 'OrcaSlicer Studio', file: './tools/misc/orcaslicer_studio.html' },
      { name: 'Podcast Player', file: './tools/misc/podcast-player.html' },
      { name: 'QR Generator', file: './tools/misc/qr-generator.html' },
      { name: 'Scandinavian Interior Design', file: './tools/misc/scandinavian-interior-design.html' },
      { name: 'Simon', file: './tools/misc/simon.html' },
      { name: 'Situation Monitor', file: './tools/misc/situation-monitor.html' },
      { name: 'Soundboard', file: './tools/misc/soundboard.html' },
      { name: 'Speak & Spell', file: './tools/misc/speak-and-spell.html' },
      { name: 'Tanks', file: './tools/misc/tanks.html' },
      { name: 'Tetris', file: './tools/misc/tetris.html' },
      { name: 'Text to Speech', file: './tools/misc/text-to-speech.html' },
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


// --- VFD Character Animation ---
function vfdAnimate(element, text, delay = 40) {
  element.innerHTML = '';
  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.className = 'vfd-char';
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.animationDelay = `${i * delay}ms`;
    element.appendChild(span);
  });
}

function addCursor(element) {
  const cursor = document.createElement('span');
  cursor.className = 'vfd-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  element.appendChild(cursor);
}


// --- Render Views ---
const main = document.getElementById('mainContent');

// Back arrow SVG
const BACK_SVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>`;
const ARROW_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>`;

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

  main.innerHTML = `
    <section class="landing">
      <div class="category-grid">${cards}</div>
      <div class="landing-about">
        <a href="#about" class="about-btn">About</a>
      </div>
      <div style="text-align:center;padding:32px 0 8px;opacity:0.35">
        <a href="mailto:harrison@korb.engineering" style="color:var(--vfd-cyan-dim);font-size:11px;letter-spacing:0.08em;text-decoration:none;font-family:var(--font-mono)">harrison@korb.engineering</a>
      </div>
    </section>
  `;

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
  const aboutBtn = '';

  main.innerHTML = `
    <section class="section-page">
      <div class="section-hero">
        <a href="#" class="back-link reveal">${BACK_SVG}</a>
      </div>
      <div class="empty-section reveal">
        <div class="empty-icon">${sec.icon}</div>
      </div>
      ${aboutBtn}
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

  main.innerHTML = `
    <section class="section-page">
      <div class="section-hero">
        <a href="#" class="back-link reveal">${BACK_SVG}</a>
      </div>
      <div class="tool-grid-container">
        <div class="tool-grid">${cards}</div>
      </div>
    </section>
  `;

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

      renderToolEmbed(sKey, s, tool);
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

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value === folder.password) {
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
        <div class="tool-grid">${cards}</div>
      </div>
    </section>
  `;

  document.getElementById('subfolderBack').addEventListener('click', (e) => {
    e.preventDefault();
    renderSection(sectionKey);
  });

  main.querySelectorAll('.tool-grid-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const tIdx = parseInt(card.dataset.folderToolIndex);
      const tool = folder.tools[tIdx];
      renderSubfolderToolEmbed(sectionKey, sec, folder, tool);
    });
  });

  initReveal();
}


// --- Subfolder tool embed (back goes to subfolder, not section) ---
function renderSubfolderToolEmbed(sectionKey, sec, folder, tool) {
  main.innerHTML = `
    <section class="section-page tool-embed-page">
      <div class="tool-topbar">
        <button type="button" class="back-link tool-back-btn" aria-label="Back to folder">${BACK_SVG}</button>
      </div>
      <iframe class="tool-iframe" src="${tool.file}" title="${tool.name}" sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads" allowfullscreen></iframe>
    </section>
  `;

  main.querySelector('.tool-back-btn').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const iframe = main.querySelector('.tool-iframe');
    if (iframe) iframe.remove();
    renderSubfolderGrid(sectionKey, sec, folder);
  });
}


function renderToolEmbed(key, sec, tool) {
  main.innerHTML = `
    <section class="section-page tool-embed-page">
      <div class="tool-topbar">
        <button type="button" class="back-link tool-back-btn" aria-label="Back to section">${BACK_SVG}</button>
      </div>
      <iframe class="tool-iframe" src="${tool.file}" title="${tool.name}" sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads" allowfullscreen></iframe>
    </section>
  `;

  // Use button + JS navigation to reliably exit iframe context
  main.querySelector('.tool-back-btn').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Remove iframe first to stop any running content
    const iframe = main.querySelector('.tool-iframe');
    if (iframe) iframe.remove();
    // If hash is already the section key, hashchange won't fire, so render directly
    if (location.hash === '#' + key) {
      renderSection(key);
    } else {
      location.hash = key;
    }
  });
}


// --- About Page ---
let aboutAudioEl = null;

function stopAboutAudio() {
  if (aboutAudioEl) {
    aboutAudioEl.pause();
    aboutAudioEl.currentTime = 0;
    aboutAudioEl = null;
  }
}

function renderAboutPage() {
  const nameStyle = 'font-family:Cinzel,\"Palatino Linotype\",\"Book Antiqua\",Palatino,Georgia,serif;font-size:var(--text-sm);letter-spacing:0.12em;color:var(--vfd-cyan);margin-top:10px;text-align:center;text-shadow:0 0 8px rgba(0,212,255,0.25);';

  const companyEntryStyle = 'margin-bottom:28px;';
  const companyNameStyle = 'font-family:Cinzel,\"Palatino Linotype\",\"Book Antiqua\",Palatino,Georgia,serif;font-size:var(--text-base);letter-spacing:0.08em;color:var(--vfd-cyan);margin:0;text-shadow:0 0 8px rgba(0,212,255,0.25);';
  const companyDatesStyle = 'color:#ff6600;font-size:var(--text-sm);margin-left:6px;text-shadow:0 0 6px rgba(255,102,0,0.3);';
  const companyDetailStyle = 'color:rgba(0,212,255,0.45);font-size:var(--text-xs);letter-spacing:0.04em;margin:4px 0 0;line-height:1.6;';

  main.innerHTML = `
    <section class="section-page">
      <div class="section-hero">
        <a href="#" class="back-link reveal">${BACK_SVG}</a>
      </div>
      <div class="about-content reveal">
        <h1 class="about-heading" style="display:flex;justify-content:center;"><span style="width:80px;height:100px;color:var(--vfd-cyan);">${K_LOGO_SVG}</span></h1>
        <p class="about-text" style="font-style:italic;max-width:520px;margin:var(--space-4) auto 0;line-height:1.8;font-size:var(--text-base);color:var(--vfd-cyan);text-shadow:0 0 12px rgba(0,212,255,0.3);">"If I have seen further, it is by standing on the shoulders of giants."</p>
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
          <h2 style="font-family:Cinzel,serif;font-size:var(--text-lg);letter-spacing:0.25em;color:var(--vfd-cyan);text-align:center;margin-bottom:32px;text-shadow:0 0 12px rgba(0,212,255,0.3);">KORB ENGINEERING</h2>

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
  stopAboutAudio();

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
        <a href="#" class="back-link">${BACK_SVG}</a>
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



  const form = document.getElementById('gateForm');
  const input = document.getElementById('gatePassword');
  const error = document.getElementById('gateError');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value === sec.password) {
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
  stopAboutAudio();
  const route = getRoute();
  window.scrollTo(0, 0);

  if (route === 'home' || route === '') {
    renderHome();
  } else if (route === 'about') {
    renderAboutPage();
  } else if (SECTIONS[route]) {
    renderSection(route);
  } else {
    renderHome();
  }
}

// --- Init ---
window.addEventListener('hashchange', handleRoute);
document.getElementById('homeLink').addEventListener('click', (e) => {
  e.preventDefault();
  navigate('home');
});

handleRoute();
