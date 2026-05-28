# murli docs — Stage 1: Shell

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete visual shell — CSS design system, theme toggle, search palette, base HTML template, and Cloudflare redirect rules — so every subsequent stage has a consistent, deployable foundation.

**Architecture:** Pure HTML/CSS with two vanilla JS files. `theme.js` runs in `<head>` to prevent flash of wrong theme. `search.js` loads `search-index.json` lazily on first Cmd+K. All pages share identical topbar and sidebar HTML copied from `_template.html`. Active nav link is set at runtime by `search.js` via pathname comparison.

**Tech Stack:** HTML5, CSS custom properties, vanilla JS (ES5-compatible), Fuse.js v7 (CDN), JetBrains Mono (Google Fonts), Cloudflare Pages.

---

### Task 1: Create directory structure

**Files:**
- Create: `site/`
- Create: `site/guides/`
- Create: `site/lang/`
- Create: `site/api/`

- [ ] **Step 1: Create directories**

```bash
mkdir -p site/guides site/lang site/api
```

Expected: no output, directories exist.

- [ ] **Step 2: Verify**

```bash
find site -type d
```

Expected:
```
site
site/guides
site/lang
site/api
```

---

### Task 2: Write style.css

**Files:**
- Create: `site/style.css`

- [ ] **Step 1: Create style.css with full design system**

```bash
cat > site/style.css << 'ENDCSS'
/* ================================================================
   murli docs — style.css
   ================================================================ */

:root {
  --bg:        #0e1116;
  --surface:   #171b22;
  --surface2:  #1c2128;
  --border:    #21262d;
  --text:      #e6edf3;
  --muted:     #7d8590;
  --dim:       #484f58;
  --accent:    #58a6ff;
  --accent-bg: rgba(88,166,255,.10);
  --green:     #3fb950;
  --green-bg:  rgba(63,185,80,.12);
  --amber:     #d29922;
  --amber-bg:  rgba(210,153,34,.12);
  --red:       #f85149;
  --code-bg:   #161b22;
  --code-bdr:  #30363d;
  --topbar-h:  48px;
  --sidebar-w: 220px;
}

[data-theme="light"] {
  --bg:        #ffffff;
  --surface:   #f6f8fa;
  --surface2:  #eaeef2;
  --border:    #d0d7de;
  --text:      #1f2328;
  --muted:     #656d76;
  --dim:       #9198a1;
  --accent:    #0969da;
  --accent-bg: rgba(9,105,218,.08);
  --green:     #1a7f37;
  --green-bg:  rgba(26,127,55,.10);
  --amber:     #9a6700;
  --amber-bg:  rgba(154,103,0,.10);
  --red:       #cf222e;
  --code-bg:   #f6f8fa;
  --code-bdr:  #d0d7de;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { font-size: 15px; scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  line-height: 1.6;
}

/* ── Topbar ──────────────────────────────────────────────────── */

.topbar {
  position: fixed;
  inset: 0 0 auto 0;
  height: var(--topbar-h);
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 12px;
  z-index: 100;
}

.topbar-left { display: flex; align-items: center; }

.brand {
  display: flex; align-items: center; gap: 7px;
  text-decoration: none; color: var(--text);
  font-weight: 600; font-size: 15px; white-space: nowrap;
}
.brand .glyph { color: var(--accent); font-size: 18px; line-height: 1; }
.brand .ver   {
  color: var(--muted); font-size: 11px; font-weight: 400;
  background: var(--surface2); border: 1px solid var(--border);
  border-radius: 10px; padding: 1px 7px;
}

.topbar-mid { flex: 1; display: flex; justify-content: center; }

.kbar {
  display: flex; align-items: center; gap: 8px;
  background: var(--bg); border: 1px solid var(--border);
  border-radius: 6px; padding: 5px 12px;
  color: var(--muted); font-size: 13px;
  cursor: pointer; width: 260px; font-family: inherit;
}
.kbar:hover { border-color: var(--accent); color: var(--text); }
.kbar .kbd  { margin-left: auto; display: flex; gap: 2px; font-size: 11px; color: var(--dim); }
.kbar .kbd span {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 3px; padding: 0 4px; line-height: 18px;
}

.topbar-right { display: flex; align-items: center; gap: 8px; }

.iconbtn {
  background: none; border: none; cursor: pointer;
  color: var(--muted); font-size: 16px;
  padding: 4px 8px; border-radius: 4px; line-height: 1;
}
.iconbtn:hover { background: var(--surface2); color: var(--text); }

.linkbtn {
  display: inline-flex; align-items: center; gap: 5px;
  background: none; border: 1px solid var(--border); border-radius: 6px;
  color: var(--text); font-size: 13px; padding: 4px 10px;
  text-decoration: none; white-space: nowrap;
}
.linkbtn:hover { border-color: var(--accent); color: var(--accent); }

/* ── Sidebar ─────────────────────────────────────────────────── */

.sidebar {
  position: fixed;
  top: var(--topbar-h); left: 0; bottom: 0;
  width: var(--sidebar-w);
  background: var(--surface);
  border-right: 1px solid var(--border);
  overflow-y: auto;
  padding: 16px 0 48px;
  z-index: 50;
}

.sb-group { margin-bottom: 4px; }

.sb-group-title {
  padding: 10px 16px 4px;
  font-size: 10.5px; font-weight: 600;
  letter-spacing: 0.07em; color: var(--dim);
  text-transform: uppercase;
}

.sb-link {
  display: flex; align-items: center; justify-content: space-between;
  padding: 5px 16px; font-size: 13.5px; color: var(--muted);
  text-decoration: none; border-left: 2px solid transparent;
  cursor: pointer; transition: color 0.1s;
}
.sb-link:hover  { color: var(--text); background: var(--surface2); }
.sb-link.active {
  color: var(--accent); border-left-color: var(--accent);
  background: var(--accent-bg); font-weight: 500;
}

/* ── Tags / pills ────────────────────────────────────────────── */

.tag {
  font-size: 10px; font-weight: 600; padding: 1px 6px;
  border-radius: 10px; text-transform: lowercase; letter-spacing: 0.02em;
}
.tag.stable  { background: var(--green-bg); color: var(--green); }
.tag.planned { background: var(--amber-bg); color: var(--amber); }

.pill {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 12px; font-weight: 500; padding: 2px 10px;
  border-radius: 12px; vertical-align: middle;
}
.pill.stable  { background: var(--green-bg); color: var(--green); }
.pill.planned { background: var(--amber-bg); color: var(--amber); }

/* ── Content area ────────────────────────────────────────────── */

.content {
  margin-left: var(--sidebar-w);
  padding-top: var(--topbar-h);
  min-height: 100vh;
}

.page {
  max-width: 860px;
  padding: 48px 48px 96px;
}

/* ── Typography ──────────────────────────────────────────────── */

.eyebrow {
  font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--muted); margin-bottom: 10px;
  font-family: 'JetBrains Mono', monospace;
}

h1.page-title {
  font-size: 30px; font-weight: 700; line-height: 1.2;
  letter-spacing: -0.02em; margin-bottom: 16px;
}

h2 {
  font-size: 19px; font-weight: 600; line-height: 1.3;
  margin: 40px 0 12px; padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

h3 { font-size: 15px; font-weight: 600; margin: 24px 0 8px; }

h4 {
  font-size: 12px; font-weight: 600; margin: 20px 0 6px;
  text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted);
}

p { margin-bottom: 14px; }

p.lede {
  font-size: 16px; color: var(--muted); line-height: 1.65;
  max-width: 700px; margin-bottom: 28px;
}

a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }

code {
  font-family: 'JetBrains Mono', monospace; font-size: 12.5px;
  background: var(--code-bg); border: 1px solid var(--code-bdr);
  border-radius: 4px; padding: 1px 5px;
}

/* ── Code blocks ─────────────────────────────────────────────── */

.code-block {
  background: var(--code-bg); border: 1px solid var(--code-bdr);
  border-radius: 8px; margin: 16px 0; overflow: hidden;
}

.code-block-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 7px 14px; background: var(--surface);
  border-bottom: 1px solid var(--code-bdr);
  font-size: 12px; font-family: 'JetBrains Mono', monospace;
}
.code-block-header .lang     { color: var(--accent); font-weight: 500; }
.code-block-header .filename { color: var(--muted); }

.code-block pre {
  margin: 0; padding: 16px; overflow-x: auto;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px; line-height: 1.55;
  color: var(--text); background: transparent; border: none;
}

/* ── Tables ──────────────────────────────────────────────────── */

.tbl { width: 100%; border-collapse: collapse; font-size: 13.5px; margin: 16px 0; }
.tbl th {
  text-align: left; padding: 8px 12px;
  background: var(--surface); border-bottom: 1px solid var(--border);
  font-size: 11px; font-weight: 600; text-transform: uppercase;
  letter-spacing: 0.05em; color: var(--muted);
}
.tbl td { padding: 8px 12px; border-bottom: 1px solid var(--border); vertical-align: top; }
.tbl tr:last-child td { border-bottom: none; }
.tbl tr:hover td { background: var(--surface); }
.tbl .mono  { font-family: 'JetBrains Mono', monospace; font-size: 12.5px; }
.tbl .muted { color: var(--muted); }

/* ── Callouts ────────────────────────────────────────────────── */

.callout {
  border-left: 3px solid; border-radius: 0 6px 6px 0;
  padding: 12px 16px; margin: 20px 0;
  background: var(--surface); font-size: 14px;
}
.callout .h {
  display: block; font-size: 10.5px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 5px;
}
.callout.info { border-color: var(--accent); }
.callout.info .h { color: var(--accent); }
.callout.warn { border-color: var(--amber); }
.callout.warn .h { color: var(--amber); }
.callout.tip  { border-color: var(--green); }
.callout.tip  .h { color: var(--green); }

/* ── Hero (index.html only) ──────────────────────────────────── */

.hero { padding: 40px 0 32px; }

.hero h1 {
  font-size: 40px; font-weight: 700; line-height: 1.12;
  letter-spacing: -0.03em; margin-bottom: 20px;
}
.hero h1 .ac { color: var(--accent); }

.btnrow { display: flex; gap: 12px; margin-bottom: 28px; flex-wrap: wrap; }

.btn {
  display: inline-flex; align-items: center;
  padding: 9px 20px; border-radius: 6px;
  font-size: 14px; font-weight: 500; text-decoration: none;
  cursor: pointer; border: none;
  font-family: 'JetBrains Mono', monospace;
}
.btn.primary { background: var(--accent); color: #fff; }
.btn.primary:hover { opacity: .88; text-decoration: none; }
.btn.ghost   { background: transparent; border: 1px solid var(--border); color: var(--text); }
.btn.ghost:hover { border-color: var(--accent); color: var(--accent); text-decoration: none; }

.status-row {
  display: flex; flex-wrap: wrap; gap: 18px;
  font-size: 13px; color: var(--muted);
}
.dot {
  display: inline-block; width: 8px; height: 8px;
  border-radius: 50%; margin-right: 5px; vertical-align: middle;
}
.dot.stable  { background: var(--green); }
.dot.planned { background: var(--amber); }

/* ── Two-audience demo split ─────────────────────────────────── */

.demo-split {
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0;
}
.demo-label {
  font-size: 11px; font-weight: 600; text-transform: uppercase;
  letter-spacing: 0.07em; color: var(--muted); margin-bottom: 6px;
  font-family: 'JetBrains Mono', monospace;
}

/* ── Principle cards ─────────────────────────────────────────── */

.principle {
  border: 1px solid var(--border); border-radius: 8px;
  padding: 20px 24px; margin: 14px 0; background: var(--surface);
}
.principle .p-num  {
  font-family: 'JetBrains Mono', monospace; font-size: 11px;
  color: var(--dim); margin-bottom: 5px;
}
.principle .p-name { font-size: 15px; font-weight: 600; margin-bottom: 7px; }
.principle .p-body { font-size: 14px; color: var(--muted); line-height: 1.6; }

/* ── Prev / Next ─────────────────────────────────────────────── */

.pn-row {
  display: flex; justify-content: space-between;
  gap: 16px; margin-top: 64px; padding-top: 24px;
  border-top: 1px solid var(--border);
}
.pn {
  display: flex; flex-direction: column; gap: 4px;
  padding: 14px 18px; border: 1px solid var(--border);
  border-radius: 8px; text-decoration: none; color: var(--text);
  min-width: 160px; max-width: 300px; flex: 1;
}
.pn:hover { border-color: var(--accent); text-decoration: none; }
.pn.next  { text-align: right; }
.pn .lbl  { font-size: 11.5px; color: var(--muted); }
.pn .nm   { font-size: 14px; font-weight: 500; color: var(--accent); }

/* ── Search palette ──────────────────────────────────────────── */

.kpal-backdrop {
  position: fixed; inset: 0;
  background: rgba(1,4,9,.72);
  z-index: 200;
  display: flex; align-items: flex-start; justify-content: center;
  padding-top: 14vh;
}

.kpal {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 10px; width: 560px; max-width: 92vw;
  overflow: hidden; box-shadow: 0 24px 64px rgba(0,0,0,.5);
}

.kpal input {
  width: 100%; background: transparent; border: none;
  border-bottom: 1px solid var(--border);
  padding: 14px 16px; font-size: 15px; color: var(--text);
  outline: none; font-family: inherit;
}

.kpal-results { max-height: 340px; overflow-y: auto; }

.kpal-item {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 16px; cursor: pointer;
  font-size: 13.5px; text-decoration: none; color: var(--text);
}
.kpal-item:hover, .kpal-item.active { background: var(--surface2); }
.kpal-item .group { font-size: 11px; color: var(--muted); min-width: 140px; flex-shrink: 0; }
.kpal-item .title { color: var(--text); }

.kpal-empty { padding: 28px 16px; text-align: center; color: var(--muted); font-size: 14px; }

/* ── Responsive ──────────────────────────────────────────────── */

@media (max-width: 860px) {
  .demo-split { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .sidebar        { display: none; }
  .content        { margin-left: 0; }
  .page           { padding: 24px 20px 64px; }
  .hero h1        { font-size: 28px; }
  .topbar-mid     { display: none; }
  .pn-row         { flex-direction: column; }
}
ENDCSS
```

- [ ] **Step 2: Verify file exists**

```bash
wc -l site/style.css
```

Expected: `~220 site/style.css`

---

### Task 3: Write theme.js

**Files:**
- Create: `site/theme.js`

- [ ] **Step 1: Create theme.js**

Create `site/theme.js` with this exact content:

```javascript
(function () {
  var t;
  try { t = localStorage.getItem('murli.theme') || 'dark'; } catch (e) { t = 'dark'; }
  document.documentElement.setAttribute('data-theme', t);
  window._toggleTheme = function () {
    t = t === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('murli.theme', t); } catch (e) {}
    var btn = document.getElementById('theme-btn');
    if (btn) btn.textContent = t === 'dark' ? '☀' : '☾';
  };
}());
```

- [ ] **Step 2: Verify**

```bash
wc -l site/theme.js
```

Expected: `9 site/theme.js`

---

### Task 4: Write search.js

**Files:**
- Create: `site/search.js`

- [ ] **Step 1: Create search.js**

Create `site/search.js` with this exact content:

```javascript
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
          results.innerHTML = '<div class="kpal-empty">No results for “' + q + '”</div>';
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
```

- [ ] **Step 2: Verify**

```bash
wc -l site/search.js
```

Expected: `~65 site/search.js`

---

### Task 5: Write base template

**Files:**
- Create: `site/_template.html`

This file is the reference for all pages. It is not deployed — every page in stages 2–4 is a copy of this with the `<!-- PAGE CONTENT -->` section replaced.

- [ ] **Step 1: Create _template.html**

Create `site/_template.html` with this exact content:

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PAGE TITLE — murli docs</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css">
  <script src="/theme.js"></script>
</head>
<body>

<header class="topbar">
  <div class="topbar-left">
    <a class="brand" href="/">
      <span class="glyph">&#9834;</span>
      <span>murli</span>
      <span class="ver">v1.0.0</span>
    </a>
  </div>
  <div class="topbar-mid">
    <button class="kbar" id="search-btn" type="button">
      <span style="color:var(--muted)">&#x2315;</span>
      <span>Search docs&hellip;</span>
      <span class="kbd"><span>&#8984;</span><span>K</span></span>
    </button>
  </div>
  <div class="topbar-right">
    <button class="iconbtn" id="theme-btn" type="button" title="Toggle theme" onclick="_toggleTheme()">&#x2600;</button>
    <a class="linkbtn" href="https://github.com/allank/murli" target="_blank" rel="noopener noreferrer">
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px">{ }</span>
      github
    </a>
  </div>
</header>

<nav class="sidebar">
  <div class="sb-group">
    <div class="sb-group-title">Introduction</div>
    <a class="sb-link" href="/index.html">Overview</a>
    <a class="sb-link" href="/principles.html">The 5 Principles</a>
  </div>
  <div class="sb-group">
    <div class="sb-group-title">Guides</div>
    <a class="sb-link" href="/guides/installation.html">Installation</a>
    <a class="sb-link" href="/guides/quickstart.html">Quickstart</a>
    <a class="sb-link" href="/guides/free.html">What you get free</a>
    <a class="sb-link" href="/guides/configure.html">What you configure</a>
    <a class="sb-link" href="/guides/build.html">What you build</a>
  </div>
  <div class="sb-group">
    <div class="sb-group-title">Language Reference</div>
    <a class="sb-link" href="/lang/go.html">Go <span class="tag stable">stable</span></a>
    <a class="sb-link" href="/lang/typescript.html">TypeScript <span class="tag planned">planned</span></a>
    <a class="sb-link" href="/lang/rust.html">Rust <span class="tag planned">planned</span></a>
    <a class="sb-link" href="/lang/python.html">Python <span class="tag planned">planned</span></a>
  </div>
  <div class="sb-group">
    <div class="sb-group-title">API</div>
    <a class="sb-link" href="/api/exit-codes.html">Exit codes</a>
    <a class="sb-link" href="/api/schema.html">Schema &middot; describe</a>
    <a class="sb-link" href="/api/envelopes.html">Envelopes</a>
  </div>
  <div class="sb-group">
    <div class="sb-group-title">Project</div>
    <a class="sb-link" href="/roadmap.html">Roadmap</a>
  </div>
  <div class="sb-group">
    <div class="sb-group-title">External</div>
    <a class="sb-link" href="https://github.com/allank/murli" target="_blank" rel="noopener noreferrer">github &#x2197;</a>
    <a class="sb-link" href="https://pkg.go.dev/github.com/allank/murli" target="_blank" rel="noopener noreferrer">pkg.go.dev &#x2197;</a>
  </div>
</nav>

<div class="content">
  <main class="page">

    <!-- PAGE CONTENT -->

  </main>
</div>

<script src="https://cdn.jsdelivr.net/npm/fuse.js@7/dist/fuse.min.js"></script>
<script src="/search.js"></script>
</body>
</html>
```

---

### Task 6: Write _redirects

**Files:**
- Create: `site/_redirects`

- [ ] **Step 1: Create _redirects**

Create `site/_redirects` with this content:

```
/     /index.html   200
```

---

### Task 7: Validate the shell

- [ ] **Step 1: Serve locally**

```bash
cd site && python3 -m http.server 8080
```

- [ ] **Step 2: Open in browser**

Open `http://localhost:8080/_template.html`

Verify:
- Dark background (#0e1116)
- Topbar visible with ♪ murli v1.0.0, search button, theme toggle, github link
- Sidebar visible with all nav groups and links
- Content area is empty (expected — template has no content yet)
- Clicking the theme button switches to light theme and persists on reload
- Cmd+K opens search palette (shows "Type to search…" — no index yet, that's correct)
- Escape closes the palette

- [ ] **Step 3: Stop server**

`Ctrl+C`

---

### Task 8: Commit

- [ ] **Step 1: Stage and commit**

```bash
git add site/style.css site/theme.js site/search.js site/_template.html site/_redirects
git commit -m "feat: add docs site shell — CSS design system, theme toggle, search palette"
```

Expected: commit succeeds, 5 files added.
