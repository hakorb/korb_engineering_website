/* Korb Repo Library loader — opt-in helper for tools that play/read
 * media files hosted in the repo's /content/<slug>/ folders.
 *
 * Usage from a tool:
 *   <script src="../_shared/repo-library.js"></script>
 *   KorbRepoLibrary.attach({
 *     slug: 'harrisons-ipod',
 *     fileInputId: 'file-input',          // existing <input type=file>
 *     button: { label: 'Sync Repo Library', mountTo: '#some-toolbar' }, // optional
 *     onItem: (item, file) => {},          // optional per-item hook
 *     onComplete: (count, manifest) => {}  // optional
 *   });
 *
 * On load, fetches ../../content/<slug>/manifest.json. If the manifest
 * has items, downloads each file, wraps it in a File object, assigns
 * the resulting FileList to the configured <input type=file>, and
 * dispatches a 'change' event so the tool's existing import flow runs.
 *
 * Silent on 404 / network error — tools work fine even if no library
 * is published. All work is opt-in (button click), never automatic.
 */
(function(global) {
  if (global.KorbRepoLibrary) return;

  async function fetchManifest(slug) {
    try {
      const r = await fetch('../../content/' + slug + '/manifest.json', { cache: 'no-cache' });
      if (!r.ok) return null;
      const m = await r.json();
      if (!m || !Array.isArray(m.items)) return null;
      return m;
    } catch (e) { return null; }
  }

  // Hard limits so a malicious or malformed manifest can't exhaust memory or
  // smuggle executable payloads into the file input. Extensions mirror the
  // guessType() map below. Paths must be simple relative segments under the
  // tool's own content folder — no `..`, no leading `/`, no URL schemes.
  var MAX_BYTES = 50 * 1024 * 1024; // 50 MB per item
  var ALLOWED_EXT = /\.(mp3|m4a|m4b|wav|ogg|flac|mp4|webm|mov|m4v|epub|pdf|jpg|jpeg|png|webp|json)$/i;

  async function fetchAsFile(slug, item) {
    if (!item || typeof item.file !== 'string') return null;
    // Reject path traversal, absolute paths, and anything that looks like a
    // URL scheme (http:, data:, javascript:, file:, etc.). We intentionally
    // do NOT support remote manifests — content must live in the repo.
    if (item.file.indexOf('..') !== -1) return null;
    if (item.file.charAt(0) === '/' || item.file.charAt(0) === '\\') return null;
    if (/^[a-z][a-z0-9+.-]*:/i.test(item.file)) return null;
    if (!ALLOWED_EXT.test(item.file)) return null;
    var url = '../../content/' + slug + '/' + item.file;
    try {
      const r = await fetch(url, { cache: 'no-cache' });
      if (!r.ok) return null;
      // Pre-check Content-Length so we don't start buffering a huge file.
      var len = parseInt(r.headers.get('content-length') || '0', 10);
      if (len && len > MAX_BYTES) return null;
      const blob = await r.blob();
      if (blob.size > MAX_BYTES) return null;
      const filename = item.file.split('/').pop();
      // File constructor available in all modern browsers
      try {
        return new File([blob], filename, { type: blob.type || guessType(filename) });
      } catch (e) {
        // Some older Safari versions: fall back to a Blob with .name set
        const b = new Blob([blob], { type: blob.type || guessType(filename) });
        b.name = filename;
        return b;
      }
    } catch (e) { return null; }
  }

  function guessType(name) {
    var ext = (name.split('.').pop() || '').toLowerCase();
    var map = {
      mp3: 'audio/mpeg', m4a: 'audio/mp4', m4b: 'audio/mp4',
      wav: 'audio/wav', ogg: 'audio/ogg', flac: 'audio/flac',
      mp4: 'video/mp4', webm: 'video/webm', mov: 'video/quicktime', m4v: 'video/x-m4v',
      pdf: 'application/pdf', epub: 'application/epub+zip',
      jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp',
      json: 'application/json'
    };
    return map[ext] || 'application/octet-stream';
  }

  function buildFileList(files) {
    try {
      var dt = new DataTransfer();
      files.forEach(function(f) { try { dt.items.add(f); } catch (e) {} });
      return dt.files;
    } catch (e) {
      // No DataTransfer support; return the array, callers can iterate it
      return files;
    }
  }

  function showToast(msg) {
    try {
      var d = document.createElement('div');
      d.textContent = msg;
      d.setAttribute('role', 'status');
      d.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);' +
        'background:#0e1520;color:#e2e8f0;border:1px solid #1a2535;padding:10px 14px;' +
        'border-radius:8px;font:13px/1.4 \'JetBrains Mono\',monospace;z-index:2147483647;' +
        'max-width:90vw;box-shadow:0 10px 30px rgba(0,0,0,0.5);pointer-events:none;text-align:center';
      document.body.appendChild(d);
      setTimeout(function() {
        d.style.transition = 'opacity .3s';
        d.style.opacity = '0';
        setTimeout(function() { d.remove(); }, 320);
      }, 2400);
    } catch (e) {}
  }

  function attach(opts) {
    if (!opts || !opts.slug) return;
    var slug = opts.slug;
    var btn = null;
    var status = 'idle';
    var manifest = null;

    function ensureButton(count) {
      if (!opts.button) return;
      if (btn) {
        btn.textContent = (opts.button.label || 'Sync Repo Library') + ' (' + count + ')';
        return;
      }
      btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = (opts.button.label || 'Sync Repo Library') + ' (' + count + ')';
      btn.setAttribute('data-korb-repo-sync', slug);
      var inline = opts.button.mountTo ? '' :
        'position:fixed;top:12px;right:12px;z-index:2147483640;';
      btn.style.cssText = inline +
        'background:#0e1520;color:#00d4ff;border:1px solid #00d4ff;' +
        'padding:8px 14px;border-radius:6px;font:12px/1 \'JetBrains Mono\',monospace;' +
        'cursor:pointer;min-height:44px;touch-action:manipulation;';
      btn.addEventListener('click', sync);
      if (opts.button.mountTo) {
        var host = document.querySelector(opts.button.mountTo);
        if (host) host.appendChild(btn);
        else document.body.appendChild(btn);
      } else {
        document.body.appendChild(btn);
      }
    }

    async function sync() {
      if (status === 'syncing' || !manifest) return;
      status = 'syncing';
      var label = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Syncing...'; }
      var files = [];
      for (var i = 0; i < manifest.items.length; i++) {
        var item = manifest.items[i];
        if (btn) btn.textContent = 'Syncing ' + (i + 1) + '/' + manifest.items.length + '...';
        var f = await fetchAsFile(slug, item);
        if (f) {
          files.push(f);
          if (typeof opts.onItem === 'function') {
            try { opts.onItem(item, f); } catch (e) {}
          }
        }
      }
      // Hand the FileList to the configured input
      if (opts.fileInputId) {
        var input = document.getElementById(opts.fileInputId);
        if (input) {
          try {
            var fl = buildFileList(files);
            if (fl && fl.length !== undefined) input.files = fl;
            input.dispatchEvent(new Event('change', { bubbles: true }));
          } catch (e) {}
        }
      }
      if (typeof opts.onComplete === 'function') {
        try { opts.onComplete(files.length, manifest); } catch (e) {}
      }
      showToast('Repo library sync: ' + files.length + ' item' + (files.length === 1 ? '' : 's'));
      status = 'idle';
      if (btn) { btn.disabled = false; btn.textContent = label; }
    }

    fetchManifest(slug).then(function(m) {
      if (!m || !m.items.length) return;
      manifest = m;
      ensureButton(m.items.length);
    });

    return { sync: sync, getManifest: function() { return manifest; } };
  }

  global.KorbRepoLibrary = { attach: attach, fetchManifest: fetchManifest, fetchAsFile: fetchAsFile };
})(window);
