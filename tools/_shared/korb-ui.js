/* ============================================================
   korb-ui.js — shared UI primitives for korb.engineering tools
   ------------------------------------------------------------
   OPT-IN. Loads nothing on its own, creates no global state
   beyond a single `window.KorbUI` namespace. Every function is
   safe to call multiple times and is idempotent.

       <script src="../_shared/korb-ui.js" defer></script>

   Provides:
     KorbUI.toast(msg, opts)          — transient bottom toast
     KorbUI.confirm(msg, opts)        — promise-returning confirm
     KorbUI.alert(msg, opts)          — promise-returning alert
     KorbUI.prompt(msg, def, opts)    — promise-returning text prompt
     KorbUI.modal({ title, html, actions }) — open a custom modal
     KorbUI.copyToClipboard(text)     — returns Promise<boolean>
     KorbUI.downloadFile(name, data, mime)
     KorbUI.storage(prefix)           — namespaced localStorage helper
     KorbUI.escapeHtml(str)
     KorbUI.debounce(fn, ms)

   All visuals use the VFD palette inline so the module works
   whether or not the tool has loaded korb.css.
   ============================================================ */
(function (global) {
  'use strict';

  if (global.KorbUI) return; // idempotent

  // ---------- palette (inline fallback if korb.css missing) ----------
  const C = {
    bg:       '#050a0f',
    surface:  '#0a1018',
    surface2: '#0e1520',
    border:   '#1a2535',
    border2:  '#243145',
    text:     '#e2e8f0',
    dim:      '#8892a2',
    cyan:     '#00d4ff',
    orange:   '#ff6600',
    green:    '#10b981',
    red:      '#ef4444'
  };
  const FONT = "'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace";

  // Inject a <style> block once for transient elements.
  function injectStyles() {
    if (document.getElementById('korb-ui-style')) return;
    const css = `
    .korb-ui-backdrop {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.72);
      backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center;
      padding: 16px;
      z-index: 2147483000;
      font-family: ${FONT};
      animation: korb-fade 0.15s ease-out;
    }
    @keyframes korb-fade { from { opacity: 0; } to { opacity: 1; } }
    .korb-ui-modal {
      background: ${C.surface};
      border: 1px solid ${C.border2};
      border-radius: 12px;
      box-shadow: 0 12px 32px rgba(0,0,0,0.6);
      max-width: 520px; width: 100%;
      max-height: 90vh; overflow-y: auto;
      color: ${C.text};
      padding: 24px;
    }
    .korb-ui-modal h2 {
      margin: 0 0 12px; color: ${C.cyan};
      font-size: 1.1rem; letter-spacing: 0.02em; font-weight: 600;
    }
    .korb-ui-modal .korb-ui-body { font-size: 14px; line-height: 1.5; color: ${C.text}; }
    .korb-ui-modal .korb-ui-actions {
      display: flex; gap: 8px; justify-content: flex-end;
      margin-top: 20px; flex-wrap: wrap;
    }
    .korb-ui-btn {
      -webkit-appearance: none; appearance: none;
      font-family: ${FONT}; font-size: 14px; font-weight: 500;
      min-height: 44px; padding: 0 16px;
      background: ${C.surface2}; color: ${C.text};
      border: 1px solid ${C.border2}; border-radius: 8px;
      cursor: pointer; touch-action: manipulation;
      transition: background 0.15s, border-color 0.15s;
    }
    .korb-ui-btn:hover { background: #121b28; border-color: ${C.cyan}; }
    .korb-ui-btn:focus-visible { outline: 2px solid ${C.cyan}; outline-offset: 2px; }
    .korb-ui-btn--primary { background: ${C.cyan}; color: #001018; border-color: ${C.cyan}; font-weight: 600; }
    .korb-ui-btn--primary:hover { background: #00a8cc; border-color: #00a8cc; }
    .korb-ui-btn--danger  { background: ${C.red}; color: #fff; border-color: ${C.red}; }
    .korb-ui-btn--danger:hover  { background: #b83232; border-color: #b83232; }
    .korb-ui-input {
      -webkit-appearance: none; appearance: none;
      width: 100%; box-sizing: border-box;
      font-family: ${FONT}; font-size: 16px;
      min-height: 44px; padding: 10px 12px;
      background: ${C.surface2}; color: ${C.text};
      border: 1px solid ${C.border2}; border-radius: 8px;
      outline: none; margin-top: 12px;
    }
    .korb-ui-input:focus { border-color: ${C.cyan}; box-shadow: 0 0 0 3px rgba(0,212,255,0.18); }
    .korb-ui-toast {
      position: fixed; left: 50%;
      bottom: calc(24px + env(safe-area-inset-bottom));
      transform: translateX(-50%) translateY(8px);
      background: ${C.surface2}; color: ${C.text};
      border: 1px solid ${C.cyan}; border-radius: 8px;
      padding: 12px 16px; font-size: 14px; font-family: ${FONT};
      box-shadow: 0 4px 12px rgba(0,0,0,0.5), 0 0 12px rgba(0,212,255,0.3);
      z-index: 2147483001;
      opacity: 0; pointer-events: none;
      transition: opacity 0.2s, transform 0.2s;
      max-width: calc(100vw - 32px);
    }
    .korb-ui-toast.korb-ui-show { opacity: 1; transform: translateX(-50%) translateY(0); }
    .korb-ui-toast--error   { border-color: ${C.red};    box-shadow: 0 4px 12px rgba(0,0,0,0.5), 0 0 12px rgba(239,68,68,0.3); }
    .korb-ui-toast--success { border-color: ${C.green};  box-shadow: 0 4px 12px rgba(0,0,0,0.5), 0 0 12px rgba(16,185,129,0.3); }
    .korb-ui-toast--warn    { border-color: ${C.orange}; box-shadow: 0 4px 12px rgba(0,0,0,0.5), 0 0 12px rgba(255,102,0,0.3); }
    @media (prefers-reduced-motion: reduce) {
      .korb-ui-backdrop, .korb-ui-toast { animation: none !important; transition: none !important; }
    }
    `;
    const style = document.createElement('style');
    style.id = 'korb-ui-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ---------- helpers ----------
  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function debounce(fn, ms) {
    let h;
    return function () {
      const args = arguments, self = this;
      clearTimeout(h);
      h = setTimeout(() => fn.apply(self, args), ms || 150);
    };
  }

  // ---------- toast ----------
  let toastEl = null, toastTimer = null;
  function toast(msg, opts) {
    injectStyles();
    opts = opts || {};
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'korb-ui-toast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    toastEl.className = 'korb-ui-toast';
    if (opts.type === 'error')   toastEl.classList.add('korb-ui-toast--error');
    if (opts.type === 'success') toastEl.classList.add('korb-ui-toast--success');
    if (opts.type === 'warn')    toastEl.classList.add('korb-ui-toast--warn');
    toastEl.textContent = String(msg == null ? '' : msg);
    // Force reflow for repeated toasts
    void toastEl.offsetWidth;
    toastEl.classList.add('korb-ui-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('korb-ui-show'), opts.ms || 2400);
  }

  // ---------- modal core ----------
  // actions: [{ label, value, primary, danger, autofocus }]
  function modal(spec) {
    injectStyles();
    return new Promise((resolve) => {
      const backdrop = document.createElement('div');
      backdrop.className = 'korb-ui-backdrop';
      backdrop.setAttribute('role', 'dialog');
      backdrop.setAttribute('aria-modal', 'true');

      const dialog = document.createElement('div');
      dialog.className = 'korb-ui-modal';
      dialog.innerHTML =
        (spec.title ? '<h2>' + escapeHtml(spec.title) + '</h2>' : '') +
        '<div class="korb-ui-body">' + (spec.html || '') + '</div>' +
        '<div class="korb-ui-actions"></div>';
      backdrop.appendChild(dialog);

      const actionsWrap = dialog.querySelector('.korb-ui-actions');
      const actions = spec.actions && spec.actions.length ? spec.actions : [{ label: 'OK', value: true, primary: true, autofocus: true }];

      let autofocusTarget = null;
      actions.forEach((a) => {
        const b = document.createElement('button');
        b.className = 'korb-ui-btn' +
          (a.primary ? ' korb-ui-btn--primary' : '') +
          (a.danger  ? ' korb-ui-btn--danger'  : '');
        b.type = 'button';
        b.textContent = a.label;
        b.addEventListener('click', () => close(a.value));
        actionsWrap.appendChild(b);
        if (a.autofocus) autofocusTarget = b;
      });

      function close(value) {
        document.removeEventListener('keydown', onKey, true);
        backdrop.remove();
        resolve(value);
      }
      function onKey(e) {
        if (e.key === 'Escape') { e.preventDefault(); close(undefined); }
        if (e.key === 'Enter') {
          const primary = actionsWrap.querySelector('.korb-ui-btn--primary');
          if (primary && document.activeElement && document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault(); primary.click();
          }
        }
      }
      backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close(undefined); });
      document.addEventListener('keydown', onKey, true);

      document.body.appendChild(backdrop);

      if (typeof spec.onOpen === 'function') {
        try { spec.onOpen(dialog); } catch (_) {}
      }
      const input = dialog.querySelector('.korb-ui-input');
      if (input) input.focus();
      else if (autofocusTarget) autofocusTarget.focus();
    });
  }

  function alertAsync(msg, opts) {
    opts = opts || {};
    return modal({
      title: opts.title || 'Notice',
      html: '<p>' + escapeHtml(msg) + '</p>',
      actions: [{ label: opts.okLabel || 'OK', value: true, primary: true, autofocus: true }]
    });
  }

  function confirmAsync(msg, opts) {
    opts = opts || {};
    return modal({
      title: opts.title || 'Confirm',
      html: '<p>' + escapeHtml(msg) + '</p>',
      actions: [
        { label: opts.cancelLabel || 'Cancel', value: false },
        { label: opts.okLabel || 'OK', value: true, primary: !opts.danger, danger: !!opts.danger, autofocus: true }
      ]
    }).then((v) => v === true);
  }

  function promptAsync(msg, def, opts) {
    opts = opts || {};
    let inputEl = null;
    return modal({
      title: opts.title || 'Input',
      html:
        '<p>' + escapeHtml(msg) + '</p>' +
        '<input type="text" class="korb-ui-input" value="' + escapeHtml(def || '') + '">',
      actions: [
        { label: opts.cancelLabel || 'Cancel', value: null },
        { label: opts.okLabel || 'OK', value: '__ok__', primary: true }
      ],
      onOpen: (d) => { inputEl = d.querySelector('.korb-ui-input'); }
    }).then((v) => {
      if (v === '__ok__') return inputEl ? inputEl.value : '';
      return null;
    });
  }

  // ---------- clipboard / download ----------
  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(String(text));
        return true;
      }
    } catch (_) { /* fall through */ }
    try {
      const ta = document.createElement('textarea');
      ta.value = String(text);
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (_) { return false; }
  }

  function downloadFile(name, data, mime) {
    const blob = (data instanceof Blob) ? data : new Blob([data], { type: mime || 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // ---------- namespaced storage helper ----------
  function storage(prefix) {
    if (!prefix || typeof prefix !== 'string') throw new Error('storage(prefix) requires a string prefix');
    if (!/^korb_/.test(prefix)) throw new Error('storage prefix must start with "korb_"');
    const pfx = prefix.endsWith('_') ? prefix : prefix + '_';
    return {
      get(key, fallback) {
        try {
          const raw = localStorage.getItem(pfx + key);
          if (raw == null) return (fallback === undefined ? null : fallback);
          try { return JSON.parse(raw); } catch (_) { return raw; }
        } catch (_) { return (fallback === undefined ? null : fallback); }
      },
      set(key, value) {
        try {
          localStorage.setItem(pfx + key, typeof value === 'string' ? value : JSON.stringify(value));
          return true;
        } catch (_) { return false; }
      },
      remove(key) { try { localStorage.removeItem(pfx + key); } catch (_) {} },
      keys() {
        const out = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.indexOf(pfx) === 0) out.push(k.slice(pfx.length));
        }
        return out;
      },
      clear() {
        const keys = this.keys();
        keys.forEach((k) => { try { localStorage.removeItem(pfx + k); } catch (_) {} });
        return keys.length;
      }
    };
  }

  // ---------- export ----------
  global.KorbUI = {
    toast,
    alert: alertAsync,
    confirm: confirmAsync,
    prompt: promptAsync,
    modal,
    copyToClipboard,
    downloadFile,
    storage,
    escapeHtml,
    debounce,
    version: '1.0.0'
  };
})(typeof window !== 'undefined' ? window : this);
