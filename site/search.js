(function () {
  var idx = null, fuse = null, isOpen = false;

  function loadIndex(cb) {
    if (idx) { cb(); return; }
    fetch('/search-index.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        idx = data;
        fuse = new Fuse(data, { keys: ['title', 'group', 'keywords'], threshold: 0.35 });
        cb();
      })
      .catch(function () {
        idx = []; fuse = { search: function () { return []; } }; cb();
      });
  }

  function open() {
    if (isOpen) return;
    isOpen = true;
    var bd = document.createElement('div');
    bd.id = 'kpal'; bd.className = 'kpal-backdrop';
    bd.innerHTML =
      '<div class="kpal">' +
      '<input id="kpal-input" type="text" placeholder="Search docs…" autocomplete="off" spellcheck="false">' +
      '<div class="kpal-results" id="kpal-results">' +
      '<div class="kpal-empty">Type to search…</div>' +
      '</div></div>';
    document.body.appendChild(bd);

    var input = document.getElementById('kpal-input');
    var results = document.getElementById('kpal-results');
    var ai = -1;

    input.focus();

    bd.addEventListener('click', function (e) { if (e.target === bd) close(); });

    input.addEventListener('input', function () {
      var q = input.value.trim();
      ai = 0;
      if (!q) { results.innerHTML = '<div class="kpal-empty">Type to search…</div>'; return; }
      loadIndex(function () {
        var hits = fuse.search(q).slice(0, 8);
        if (!hits.length) {
          results.innerHTML = '<div class="kpal-empty">No results for "' + q + '"</div>';
          return;
        }
        results.innerHTML = hits.map(function (h, i) {
          return '<a class="kpal-item' + (i === 0 ? ' active' : '') + '" href="' + h.item.url + '">' +
            '<span class="group">' + h.item.group + '</span>' +
            '<span class="title">' + h.item.title + '</span></a>';
        }).join('');
      });
    });

    input.addEventListener('keydown', function (e) {
      var items = results.querySelectorAll('.kpal-item');
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); ai = Math.min(ai + 1, items.length - 1); hl(items); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); ai = Math.max(ai - 1, 0); hl(items); }
      if (e.key === 'Enter' && items[ai]) { window.location.href = items[ai].href; close(); }
    });
  }

  function hl(items) {
    items.forEach(function (el, i) { el.classList.toggle('active', i === ai); });
    if (items[ai]) items[ai].scrollIntoView({ block: 'nearest' });
  }

  function close() {
    var el = document.getElementById('kpal');
    if (el) el.remove();
    isOpen = false;
  }

  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault(); isOpen ? close() : open(); return;
    }
    if (e.key === '/' && !isOpen) {
      var tag = ((document.activeElement || {}).tagName || '');
      if (/^(input|textarea|select)$/i.test(tag)) return;
      e.preventDefault(); open();
    }
    if (e.key === 'Escape' && isOpen) close();
  });

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('search-btn');
    if (btn) btn.addEventListener('click', open);

    var path = window.location.pathname
      .replace(/\/index\.html$/, '/')
      .replace(/\.html$/, '');
    document.querySelectorAll('.sb-link[href]').forEach(function (el) {
      var lp = el.getAttribute('href')
        .replace(/\/index\.html$/, '/')
        .replace(/\.html$/, '');
      if (path === lp || (path === '/' && lp === '/')) el.classList.add('active');
    });
  });
}());
