# murli docs — Stage 2: Introduction + Guides

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the 7 content pages that form the primary documentation path: Overview, The 5 Principles, and the five guide pages (Installation, Quickstart, What you get free, What you configure, What you build).

**Architecture:** Each page is a complete HTML file using the base template from Stage 1 (`site/_template.html`). Content is accurate to murli v1.0.0 source. Active sidebar link is set at runtime by `search.js` — no manual `active` class needed in the HTML. Prev/Next navigation links the pages in order.

**Tech Stack:** HTML5, CSS from Stage 1. Requires Stage 1 to be complete (style.css, theme.js, search.js must exist in `site/`).

**Prerequisite:** Stage 1 complete. Serve with `cd site && python3 -m http.server 8080` to validate each page after creation.

---

### Task 1: index.html (Overview)

**Files:**
- Create: `site/index.html`

- [ ] **Step 1: Create site/index.html**

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Overview — murli docs</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css">
  <script src="/theme.js"></script>
</head>
<body>
<header class="topbar">
  <div class="topbar-left">
    <a class="brand" href="/"><span class="glyph">&#9834;</span><span>murli</span><span class="ver">v1.0.0</span></a>
  </div>
  <div class="topbar-mid">
    <button class="kbar" id="search-btn" type="button">
      <span style="color:var(--muted)">&#x2315;</span><span>Search docs&hellip;</span>
      <span class="kbd"><span>&#8984;</span><span>K</span></span>
    </button>
  </div>
  <div class="topbar-right">
    <button class="iconbtn" id="theme-btn" type="button" title="Toggle theme" onclick="_toggleTheme()">&#x2600;</button>
    <a class="linkbtn" href="https://github.com/allank/murli" target="_blank" rel="noopener noreferrer">
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px">{ }</span> github
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

    <section class="hero">
      <div class="eyebrow">// CLI &harr; AGENT MIDDLEWARE</div>
      <h1>Two audiences.<br>One <span class="ac">CLI</span>.</h1>
      <p class="lede">murli is a middleware layer for Go CLIs. It adds dual-audience output, runtime introspection, structured errors, and token-efficient logging to cobra, urfave/cli&nbsp;v2, and urfave/cli&nbsp;v3. Integration is a single function call.</p>
      <div class="btnrow">
        <a class="btn primary" href="/guides/installation.html">$ go get &rarr;</a>
        <a class="btn ghost" href="/principles.html">the 5 principles</a>
      </div>
      <div class="status-row">
        <span><span class="dot stable"></span>go &middot; stable v1.0.0</span>
        <span><span class="dot planned"></span>typescript &middot; planned</span>
        <span><span class="dot planned"></span>rust &middot; planned</span>
        <span><span class="dot planned"></span>python &middot; planned</span>
      </div>
    </section>

    <h2>The same command, two listeners</h2>
    <p>murli checks whether stdout is connected to a terminal and routes output accordingly. The same command produces formatted text at a TTY and JSON when piped.</p>

    <div class="demo-split">
      <div>
        <div class="demo-label">TTY &mdash; formatted</div>
        <div class="code-block"><pre>$ riffle query woodworking
Searching index...
Found 1 matching folder

  /docs/woodworking    0.95</pre></div>
      </div>
      <div>
        <div class="demo-label">Piped &mdash; JSON</div>
        <div class="code-block"><pre>$ riffle query woodworking | jq .
{
  "status": "ok",
  "schema_version": "1.0",
  "tool_version": "1.0.0",
  "message": "Found 1 matching folder",
  "result": [
    { "path": "/docs/woodworking",
      "score": 0.95 }
  ]
}</pre></div>
      </div>
    </div>

    <h2>The 5 principles</h2>
    <p>murli is built around five design principles. They describe the properties a CLI needs to be genuinely useful to both human and agent consumers.</p>
    <table class="tbl">
      <thead><tr><th>Principle</th><th>What it means in practice</th></tr></thead>
      <tbody>
        <tr><td class="mono">Unified Interface</td><td>One tool, two audiences. No code branching on output format.</td></tr>
        <tr><td class="mono">Self-Describing Tools</td><td>Complete command metadata available via <code>describe</code> and <code>--schema</code> at runtime, without consulting documentation.</td></tr>
        <tr><td class="mono">Actionable Errors</td><td>Every error carries what failed, whether retrying helps, and what to do next.</td></tr>
        <tr><td class="mono">Intentional Mutations</td><td>State-changing operations require explicit confirmation in non-interactive contexts.</td></tr>
        <tr><td class="mono">Bounded Context</td><td>Consecutive log deduplication and NDJSON streaming keep per-session token consumption in check.</td></tr>
      </tbody>
    </table>

    <p style="margin-top:40px;color:var(--muted);font-size:14px;">
      Background and research: <a href="https://allankent.com/garden/projects/murli/" target="_blank" rel="noopener noreferrer">allankent.com/garden/projects/murli</a>
    </p>

    <nav class="pn-row">
      <span></span>
      <a class="pn next" href="/principles.html">
        <div class="lbl">introduction &rarr;</div>
        <div class="nm">The 5 Principles</div>
      </a>
    </nav>

  </main>
</div>
<script src="https://cdn.jsdelivr.net/npm/fuse.js@7/dist/fuse.min.js"></script>
<script src="/search.js"></script>
</body>
</html>
```

- [ ] **Step 2: Validate**

Open `http://localhost:8080/index.html`. Verify:
- Hero renders with correct heading, lede, buttons, status dots
- "Overview" is highlighted active in sidebar
- Two-column demo split visible (stacks to single column below 860px)
- Principles table renders
- Next → "The 5 Principles" link visible

- [ ] **Step 3: Commit**

```bash
git add site/index.html
git commit -m "feat: add Overview page"
```

---

### Task 2: principles.html

**Files:**
- Create: `site/principles.html`

- [ ] **Step 1: Create site/principles.html**

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>The 5 Principles — murli docs</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css">
  <script src="/theme.js"></script>
</head>
<body>
<header class="topbar">
  <div class="topbar-left">
    <a class="brand" href="/"><span class="glyph">&#9834;</span><span>murli</span><span class="ver">v1.0.0</span></a>
  </div>
  <div class="topbar-mid">
    <button class="kbar" id="search-btn" type="button">
      <span style="color:var(--muted)">&#x2315;</span><span>Search docs&hellip;</span>
      <span class="kbd"><span>&#8984;</span><span>K</span></span>
    </button>
  </div>
  <div class="topbar-right">
    <button class="iconbtn" id="theme-btn" type="button" title="Toggle theme" onclick="_toggleTheme()">&#x2600;</button>
    <a class="linkbtn" href="https://github.com/allank/murli" target="_blank" rel="noopener noreferrer">
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px">{ }</span> github
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

    <div class="eyebrow">&sect; Introduction</div>
    <h1 class="page-title">The 5 Principles</h1>
    <p class="lede">The five principles describe what a CLI needs to be genuinely useful to both human and agent consumers. They inform every design decision in murli and are reflected in its public API.</p>

    <div class="principle">
      <div class="p-num">01</div>
      <div class="p-name">Unified Interface</div>
      <div class="p-body">One tool, two audiences. Humans and agents call the same commands with the same flags. murli routes output based on context &mdash; whether stdout is a TTY, or whether <code>--agent</code> is passed &mdash; without branching in application code.</div>
    </div>

    <div class="principle">
      <div class="p-num">02</div>
      <div class="p-name">Self-Describing Tools</div>
      <div class="p-body">Agents do not read documentation. They query tools at runtime. Every command wrapped by murli exposes <code>--schema</code> (per-command JSON schema) automatically. The root command exposes a <code>describe</code> subcommand that dumps the full command tree as a single JSON document. Both are mounted with no engineer involvement.</div>
    </div>

    <div class="principle">
      <div class="p-num">03</div>
      <div class="p-name">Actionable Errors</div>
      <div class="p-body">An error that states "something went wrong" gives an agent nothing actionable. Every error in murli carries structure: what failed (<code>message</code>), whether retrying will help (<code>recoverable</code>), what to do next (<code>suggestion</code>), valid alternatives (<code>valid_values</code>), and how long to wait if applicable (<code>retry_after_ms</code>). The exit code distinguishes the failure category: user error (1), tool error (2), timeout (4), not found (5), permission (6), conflict (7), rate limited (8), cancelled (9).</div>
    </div>

    <div class="principle">
      <div class="p-num">04</div>
      <div class="p-name">Intentional Mutations</div>
      <div class="p-body">State-changing operations should not execute silently when called non-interactively. murli injects <code>--force</code> / <code>--yes</code> on all commands. Handlers check <code>w.IsForced()</code> to decide whether to proceed. <code>--dry-run</code> is also injected; handlers check <code>w.IsDryRun()</code> and call <code>w.WritePlan()</code> to show what would happen without doing it.</div>
    </div>

    <div class="principle">
      <div class="p-num">05</div>
      <div class="p-name">Bounded Context</div>
      <div class="p-body">Agent sessions run many commands. Output designed for human reading &mdash; repeated status lines, progress bars, ANSI decoration &mdash; consumes tokens at scale. murli provides consecutive line deduplication in the logger (identical adjacent lines are collapsed), structured <code>ProgressEvent</code> for typed progress over NDJSON, and a <code>--quiet</code> flag convention to suppress everything except the final result.</div>
    </div>

    <p style="color:var(--muted);font-size:13px;margin-top:36px;border-top:1px solid var(--border);padding-top:20px;">
      These principles are drawn from practitioner research: Cloudflare&rsquo;s Wrangler rebuild, Google Workspace CLI, Trevin Chow&rsquo;s agent-native CLI work, the RTK project, and Speakeasy&rsquo;s documentation on retrofitting structured output. The full background is at <a href="https://allankent.com/garden/projects/murli/" target="_blank" rel="noopener noreferrer">allankent.com/garden/projects/murli</a>.
    </p>

    <nav class="pn-row">
      <a class="pn" href="/index.html">
        <div class="lbl">&larr; introduction</div>
        <div class="nm">Overview</div>
      </a>
      <a class="pn next" href="/guides/installation.html">
        <div class="lbl">guides &rarr;</div>
        <div class="nm">Installation</div>
      </a>
    </nav>

  </main>
</div>
<script src="https://cdn.jsdelivr.net/npm/fuse.js@7/dist/fuse.min.js"></script>
<script src="/search.js"></script>
</body>
</html>
```

- [ ] **Step 2: Validate**

Open `http://localhost:8080/principles.html`. Verify:
- "The 5 Principles" is active in sidebar
- Five principle cards render with correct numbers, names, body text
- Attribution note and blog post link visible at bottom
- Prev/Next navigation shows Overview ← and → Installation

- [ ] **Step 3: Commit**

```bash
git add site/principles.html
git commit -m "feat: add The 5 Principles page"
```

---

### Task 3: guides/installation.html

**Files:**
- Create: `site/guides/installation.html`

- [ ] **Step 1: Create site/guides/installation.html**

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Installation — murli docs</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css">
  <script src="/theme.js"></script>
</head>
<body>
<header class="topbar">
  <div class="topbar-left">
    <a class="brand" href="/"><span class="glyph">&#9834;</span><span>murli</span><span class="ver">v1.0.0</span></a>
  </div>
  <div class="topbar-mid">
    <button class="kbar" id="search-btn" type="button">
      <span style="color:var(--muted)">&#x2315;</span><span>Search docs&hellip;</span>
      <span class="kbd"><span>&#8984;</span><span>K</span></span>
    </button>
  </div>
  <div class="topbar-right">
    <button class="iconbtn" id="theme-btn" type="button" title="Toggle theme" onclick="_toggleTheme()">&#x2600;</button>
    <a class="linkbtn" href="https://github.com/allank/murli" target="_blank" rel="noopener noreferrer">
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px">{ }</span> github
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

    <div class="eyebrow">&sect; Guides</div>
    <h1 class="page-title">Installation</h1>
    <p class="lede">Install the core package and one adapter for your CLI framework. Both are required &mdash; the core provides types, the adapter provides the framework-specific wiring.</p>

    <h2>Requirements</h2>
    <table class="tbl">
      <thead><tr><th>Requirement</th><th>Version</th></tr></thead>
      <tbody>
        <tr><td>Go</td><td>1.21 or later</td></tr>
        <tr><td>Module path</td><td><code>github.com/allank/murli</code></td></tr>
      </tbody>
    </table>

    <h2>Install</h2>

    <div class="code-block">
      <div class="code-block-header"><span class="lang">shell</span><span class="filename">cobra</span></div>
      <pre>go get github.com/allank/murli
go get github.com/allank/murli/cobra</pre>
    </div>

    <div class="code-block">
      <div class="code-block-header"><span class="lang">shell</span><span class="filename">urfave/cli v2</span></div>
      <pre>go get github.com/allank/murli
go get github.com/allank/murli/cli/v2</pre>
    </div>

    <div class="code-block">
      <div class="code-block-header"><span class="lang">shell</span><span class="filename">urfave/cli v3</span></div>
      <pre>go get github.com/allank/murli
go get github.com/allank/murli/cli/v3</pre>
    </div>

    <h2>Module layout</h2>
    <table class="tbl">
      <thead><tr><th>Module</th><th>Contents</th><th>When</th></tr></thead>
      <tbody>
        <tr>
          <td class="mono">github.com/allank/murli</td>
          <td>Core types: <code>Writer</code>, <code>Logger</code>, <code>AgentError</code>, <code>Metadata</code>, <code>ProfileStore</code>, schema types, exit code constants</td>
          <td>Always</td>
        </tr>
        <tr>
          <td class="mono">github.com/allank/murli/cobra</td>
          <td><code>Execute</code>, <code>Enable</code>, <code>NewWriter</code>, <code>Annotate</code>, <code>EmitSchema</code>, <code>BuildDescribeTree</code></td>
          <td>cobra only</td>
        </tr>
        <tr>
          <td class="mono">github.com/allank/murli/cli/v2</td>
          <td><code>Run</code>, <code>NewWriter</code>, <code>Annotate</code>, <code>AnnotateApp</code>, <code>EmitSchema</code>, <code>BuildV2DescribeTree</code></td>
          <td>urfave/cli v2 only</td>
        </tr>
        <tr>
          <td class="mono">github.com/allank/murli/cli/v3</td>
          <td><code>Run</code>, <code>Wrap</code>, <code>NewWriter</code>, <code>Annotate</code>, <code>EmitSchema</code>, <code>BuildV3DescribeTree</code></td>
          <td>urfave/cli v3 only</td>
        </tr>
      </tbody>
    </table>

    <h2>Verify</h2>
    <p>Every CLI wrapped by murli exposes a <code>describe</code> subcommand automatically. Run it to confirm the integration is working:</p>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">shell</span></div>
      <pre>mytool describe | jq '.murli'
# {
#   "version": "1.0.0",
#   "adapter": "cobra"
# }</pre>
    </div>

    <nav class="pn-row">
      <a class="pn" href="/principles.html">
        <div class="lbl">&larr; introduction</div>
        <div class="nm">The 5 Principles</div>
      </a>
      <a class="pn next" href="/guides/quickstart.html">
        <div class="lbl">guides &rarr;</div>
        <div class="nm">Quickstart</div>
      </a>
    </nav>

  </main>
</div>
<script src="https://cdn.jsdelivr.net/npm/fuse.js@7/dist/fuse.min.js"></script>
<script src="/search.js"></script>
</body>
</html>
```

- [ ] **Step 2: Validate**

Open `http://localhost:8080/guides/installation.html`. Verify:
- "Installation" is active in sidebar
- Three install code blocks render (cobra, cli/v2, cli/v3)
- Module layout table renders correctly
- Verify step shows correctly

- [ ] **Step 3: Commit**

```bash
git add site/guides/installation.html
git commit -m "feat: add Installation guide"
```

---

### Task 4: guides/quickstart.html

**Files:**
- Create: `site/guides/quickstart.html`

- [ ] **Step 1: Create site/guides/quickstart.html**

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Quickstart — murli docs</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css">
  <script src="/theme.js"></script>
</head>
<body>
<header class="topbar">
  <div class="topbar-left">
    <a class="brand" href="/"><span class="glyph">&#9834;</span><span>murli</span><span class="ver">v1.0.0</span></a>
  </div>
  <div class="topbar-mid">
    <button class="kbar" id="search-btn" type="button">
      <span style="color:var(--muted)">&#x2315;</span><span>Search docs&hellip;</span>
      <span class="kbd"><span>&#8984;</span><span>K</span></span>
    </button>
  </div>
  <div class="topbar-right">
    <button class="iconbtn" id="theme-btn" type="button" title="Toggle theme" onclick="_toggleTheme()">&#x2600;</button>
    <a class="linkbtn" href="https://github.com/allank/murli" target="_blank" rel="noopener noreferrer">
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px">{ }</span> github
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

    <div class="eyebrow">&sect; Guides</div>
    <h1 class="page-title">Quickstart</h1>
    <p class="lede">A minimal working integration for each framework. The only change from a standard application is replacing one function call.</p>

    <h2>cobra</h2>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span><span class="filename">main.go</span></div>
      <pre>package main

import (
	"github.com/allank/murli"
	murliCobra "github.com/allank/murli/cobra"
	"github.com/spf13/cobra"
)

var queryCmd = &amp;cobra.Command{
	Use:   "query &lt;text&gt;",
	Short: "Search the index",
	RunE: func(cmd *cobra.Command, args []string) error {
		w := murliCobra.NewWriter(cmd)
		w.Progress("searching...")

		results := []map[string]any{
			{"path": "/docs/woodworking", "score": 0.95},
		}
		w.WriteSuccess("Found 1 result", results)
		return nil
	},
}

func main() {
	root := &amp;cobra.Command{Use: "mytool"}
	root.AddCommand(queryCmd)

	murliCobra.Annotate(queryCmd, murli.Metadata{
		AgentDescription: "Search the document index.",
		Idempotent:       true,
	})

	_ = murliCobra.Execute(root) // replaces root.Execute()
}</pre>
    </div>

    <h2>urfave/cli v2</h2>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span><span class="filename">main.go</span></div>
      <pre>package main

import (
	"os"

	"github.com/allank/murli"
	murliCli "github.com/allank/murli/cli/v2"
	"github.com/urfave/cli/v2"
)

func main() {
	queryCmd := &amp;cli.Command{
		Name:  "query",
		Usage: "Search the index",
		Action: func(ctx *cli.Context) error {
			w := murliCli.NewWriter(ctx)
			w.Progress("searching...")
			results := []map[string]any{
				{"path": "/docs/woodworking", "score": 0.95},
			}
			w.WriteSuccess("Found 1 result", results)
			return nil
		},
	}

	murliCli.Annotate(queryCmd, murli.Metadata{
		AgentDescription: "Search the document index.",
		Idempotent:       true,
	})

	app := &amp;cli.App{
		Name:     "mytool",
		Commands: []*cli.Command{queryCmd},
	}
	_ = murliCli.Run(app, os.Args) // replaces app.Run(os.Args)
}</pre>
    </div>

    <h2>urfave/cli v3</h2>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span><span class="filename">main.go</span></div>
      <pre>package main

import (
	"context"
	"os"

	"github.com/allank/murli"
	murliCli "github.com/allank/murli/cli/v3"
	"github.com/urfave/cli/v3"
)

func main() {
	queryCmd := &amp;cli.Command{
		Name:  "query",
		Usage: "Search the index",
		Action: func(ctx context.Context, cmd *cli.Command) error {
			w := murliCli.NewWriter(cmd)
			w.Progress("searching...")
			results := []map[string]any{
				{"path": "/docs/woodworking", "score": 0.95},
			}
			w.WriteSuccess("Found 1 result", results)
			return nil
		},
	}

	murliCli.Annotate(queryCmd, murli.Metadata{
		AgentDescription: "Search the document index.",
		Idempotent:       true,
	})

	app := &amp;cli.Command{
		Name:     "mytool",
		Commands: []*cli.Command{queryCmd},
	}
	_ = murliCli.Run(app, os.Args) // replaces app.Run(context.Background(), os.Args)
}</pre>
    </div>

    <h2>What this gives you immediately</h2>
    <table class="tbl">
      <thead><tr><th>Feature</th><th>How to invoke</th></tr></thead>
      <tbody>
        <tr><td>Dual-audience output</td><td>Run at a TTY for formatted output; pipe to any command for JSON</td></tr>
        <tr><td><code>--agent</code></td><td>Forces JSON output at a TTY: <code>mytool query foo --agent</code></td></tr>
        <tr><td><code>--schema</code></td><td>Prints command schema as JSON and exits: <code>mytool query --schema</code></td></tr>
        <tr><td><code>describe</code></td><td>Dumps full command tree: <code>mytool describe</code></td></tr>
        <tr><td><code>doctor</code></td><td>Health and config check: <code>mytool doctor</code></td></tr>
        <tr><td><code>profile</code></td><td>Named flag profiles: <code>mytool profile list</code></td></tr>
        <tr><td><code>--force</code> / <code>--yes</code></td><td>Non-interactive confirmation bypass</td></tr>
        <tr><td><code>--dry-run</code></td><td>Dry-run mode (handler checks <code>w.IsDryRun()</code>)</td></tr>
      </tbody>
    </table>

    <nav class="pn-row">
      <a class="pn" href="/guides/installation.html">
        <div class="lbl">&larr; guides</div>
        <div class="nm">Installation</div>
      </a>
      <a class="pn next" href="/guides/free.html">
        <div class="lbl">guides &rarr;</div>
        <div class="nm">What you get free</div>
      </a>
    </nav>

  </main>
</div>
<script src="https://cdn.jsdelivr.net/npm/fuse.js@7/dist/fuse.min.js"></script>
<script src="/search.js"></script>
</body>
</html>
```

- [ ] **Step 2: Validate**

Open `http://localhost:8080/guides/quickstart.html`. Verify all three framework examples render, table is correct, prev/next links work.

- [ ] **Step 3: Commit**

```bash
git add site/guides/quickstart.html
git commit -m "feat: add Quickstart guide"
```

---

### Task 5: guides/free.html

**Files:**
- Create: `site/guides/free.html`

- [ ] **Step 1: Create site/guides/free.html**

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>What you get free — murli docs</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css">
  <script src="/theme.js"></script>
</head>
<body>
<header class="topbar">
  <div class="topbar-left">
    <a class="brand" href="/"><span class="glyph">&#9834;</span><span>murli</span><span class="ver">v1.0.0</span></a>
  </div>
  <div class="topbar-mid">
    <button class="kbar" id="search-btn" type="button">
      <span style="color:var(--muted)">&#x2315;</span><span>Search docs&hellip;</span>
      <span class="kbd"><span>&#8984;</span><span>K</span></span>
    </button>
  </div>
  <div class="topbar-right">
    <button class="iconbtn" id="theme-btn" type="button" title="Toggle theme" onclick="_toggleTheme()">&#x2600;</button>
    <a class="linkbtn" href="https://github.com/allank/murli" target="_blank" rel="noopener noreferrer">
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px">{ }</span> github
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

    <div class="eyebrow">&sect; Guides</div>
    <h1 class="page-title">What you get free</h1>
    <p class="lede">Everything in this section is automatic when you call <code>murliCobra.Execute(root)</code>, <code>murliCli.Run(app, args)</code>, or <code>murliCli.Wrap(app)</code>. No additional code is required.</p>

    <h2>TTY detection and output routing</h2>
    <p>When stdout is connected to a terminal, commands produce formatted human-readable output. When stdout is piped, commands produce JSON. The <code>--agent</code> flag forces JSON mode at a TTY for testing or explicit agent invocation.</p>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">shell</span></div>
      <pre># TTY — formatted
$ mytool query foo
Found 1 result

# Piped — JSON automatically
$ mytool query foo | jq .result

# Force JSON at TTY
$ mytool query foo --agent</pre>
    </div>
    <p>This routing requires no code in your handlers. murli detects the TTY state when <code>NewWriter</code> is called and sets the output format accordingly.</p>

    <h2>Auto-injected flags</h2>
    <p>The following flags are added to every command in your CLI automatically:</p>
    <table class="tbl">
      <thead><tr><th>Flag</th><th>Effect</th></tr></thead>
      <tbody>
        <tr><td class="mono">--agent</td><td>Forces JSON output regardless of TTY state</td></tr>
        <tr><td class="mono">--schema</td><td>Prints the command schema as JSON and exits</td></tr>
        <tr><td class="mono">--force, --yes</td><td>Bypasses non-interactive confirmation guards. Handlers check <code>w.IsForced()</code>.</td></tr>
        <tr><td class="mono">--dry-run</td><td>Signals dry-run intent. Handlers check <code>w.IsDryRun()</code> and call <code>w.WritePlan()</code>.</td></tr>
        <tr><td class="mono">--profile &lt;name&gt;</td><td>Loads a named flag profile before the handler runs</td></tr>
      </tbody>
    </table>

    <h2>Auto-mounted subcommands</h2>
    <p>Three subcommands are mounted on the root command automatically:</p>
    <table class="tbl">
      <thead><tr><th>Subcommand</th><th>Output</th></tr></thead>
      <tbody>
        <tr>
          <td class="mono">describe</td>
          <td>Full command tree as a single JSON document. Includes every subcommand, flag, return schema, examples, and capabilities. See <a href="/api/schema.html">Schema &middot; describe</a>.</td>
        </tr>
        <tr>
          <td class="mono">doctor</td>
          <td>Health and configuration check output as JSON. Useful for verifying the integration is correctly wired.</td>
        </tr>
        <tr>
          <td class="mono">profile</td>
          <td>Profile management subcommands: <code>list</code>, <code>set</code>, <code>use</code>, <code>delete</code>.</td>
        </tr>
      </tbody>
    </table>

    <div class="code-block">
      <div class="code-block-header"><span class="lang">shell</span></div>
      <pre># Full command tree — one JSON document
$ mytool describe | jq .

# Per-command schema
$ mytool query --schema | jq .

# Health check
$ mytool doctor</pre>
    </div>

    <h2>Structured error envelopes</h2>
    <p>Any error returned from a command handler is wrapped into an <code>AgentError</code> envelope automatically. The envelope includes an exit code, error type, message, and recoverability signal. Errors are written to stderr; the process exits with the appropriate code.</p>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">json</span><span class="filename">stderr (piped or --agent mode)</span></div>
      <pre>{
  "status": "error",
  "code": 1,
  "error": "user_error",
  "message": "flag --top: invalid value \"abc\" for int flag",
  "suggestion": "Check command usage with --schema or --help.",
  "recoverable": true,
  "schema_version": "1.0",
  "tool_version": "1.0.0"
}</pre>
    </div>

    <h2>Log deduplication</h2>
    <p>The <code>Logger</code> used by <code>w.Log()</code> and <code>w.Progress()</code> suppresses consecutive identical lines. If your command loops and emits the same status message repeatedly, only the first occurrence is written to stderr. This prevents token waste in agent sessions that run many commands.</p>

    <nav class="pn-row">
      <a class="pn" href="/guides/quickstart.html">
        <div class="lbl">&larr; guides</div>
        <div class="nm">Quickstart</div>
      </a>
      <a class="pn next" href="/guides/configure.html">
        <div class="lbl">guides &rarr;</div>
        <div class="nm">What you configure</div>
      </a>
    </nav>

  </main>
</div>
<script src="https://cdn.jsdelivr.net/npm/fuse.js@7/dist/fuse.min.js"></script>
<script src="/search.js"></script>
</body>
</html>
```

- [ ] **Step 2: Validate**

Open `http://localhost:8080/guides/free.html`. Verify all sections render, tables are correct, code blocks display properly.

- [ ] **Step 3: Commit**

```bash
git add site/guides/free.html
git commit -m "feat: add What you get free guide"
```

---

### Task 6: guides/configure.html

**Files:**
- Create: `site/guides/configure.html`

- [ ] **Step 1: Create site/guides/configure.html**

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>What you configure — murli docs</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css">
  <script src="/theme.js"></script>
</head>
<body>
<header class="topbar">
  <div class="topbar-left">
    <a class="brand" href="/"><span class="glyph">&#9834;</span><span>murli</span><span class="ver">v1.0.0</span></a>
  </div>
  <div class="topbar-mid">
    <button class="kbar" id="search-btn" type="button">
      <span style="color:var(--muted)">&#x2315;</span><span>Search docs&hellip;</span>
      <span class="kbd"><span>&#8984;</span><span>K</span></span>
    </button>
  </div>
  <div class="topbar-right">
    <button class="iconbtn" id="theme-btn" type="button" title="Toggle theme" onclick="_toggleTheme()">&#x2600;</button>
    <a class="linkbtn" href="https://github.com/allank/murli" target="_blank" rel="noopener noreferrer">
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px">{ }</span> github
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

    <div class="eyebrow">&sect; Guides</div>
    <h1 class="page-title">What you configure</h1>
    <p class="lede">These are opt-in annotations. They add agent-useful metadata to your commands and flags without changing handler logic. Call them once per command, outside your handlers.</p>

    <h2>Metadata annotations</h2>
    <p><code>Annotate</code> attaches a <code>Metadata</code> struct to a command. The fields appear in <code>--schema</code> and <code>describe</code> output so agents can understand the command without running it.</p>

    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span><span class="filename">cobra example</span></div>
      <pre>murliCobra.Annotate(queryCmd, murli.Metadata{
	AgentDescription: "Search the document index for semantically similar content.",
	WhenToUse:        "When the user wants to find documents by meaning rather than keyword.",
	Idempotent:       true,
	Returns: &amp;murli.ReturnSchema{
		Type:        "json",
		Description: "Ranked list of search results",
		Shape: map[string]any{
			"path":  "string",
			"score": "float32",
		},
	},
	Examples: []murli.Example{
		{
			Command:          "mytool query woodworking",
			Description:      "Find documents about woodworking",
			ExpectedExitCode: 0,
		},
	},
})</pre>
    </div>

    <h3>Metadata fields</h3>
    <table class="tbl">
      <thead><tr><th>Field</th><th>Type</th><th>Purpose</th></tr></thead>
      <tbody>
        <tr><td class="mono">AgentDescription</td><td class="mono muted">string</td><td>Human-readable description optimised for agent consumption. Appears in schema output.</td></tr>
        <tr><td class="mono">WhenToUse</td><td class="mono muted">string</td><td>Guidance on when an agent should choose this command over alternatives.</td></tr>
        <tr><td class="mono">Idempotent</td><td class="mono muted">bool</td><td>True if the command can be called multiple times with the same result. Surfaced in schema as <code>safety.idempotent</code>.</td></tr>
        <tr><td class="mono">Mutating</td><td class="mono muted">bool</td><td>True if the command changes state. Surfaced as <code>safety.read_only: false</code>.</td></tr>
        <tr><td class="mono">DryRunnable</td><td class="mono muted">bool</td><td>True if the command supports <code>--dry-run</code>. Surfaced as <code>safety.dry_run_supported</code>.</td></tr>
        <tr><td class="mono">Destructive</td><td class="mono muted">bool</td><td>True if the command deletes or irreversibly modifies data.</td></tr>
        <tr><td class="mono">Returns</td><td class="mono muted">*ReturnSchema</td><td>Shape and description of the JSON payload written by <code>WriteSuccess</code>.</td></tr>
        <tr><td class="mono">Arguments</td><td class="mono muted">[]ArgumentMetadata</td><td>Positional argument descriptions (name, type, required, description).</td></tr>
        <tr><td class="mono">Examples</td><td class="mono muted">[]Example</td><td>Worked examples with command string, description, and expected exit code.</td></tr>
        <tr><td class="mono">FlagAnnotations</td><td class="mono muted">map[string]FlagAnnotation</td><td>Per-flag annotations. Key is the flag name.</td></tr>
      </tbody>
    </table>

    <h2>Flag annotations</h2>
    <p>Use <code>FlagAnnotations</code> in the <code>Metadata</code> struct to attach per-flag metadata. This is where you mark sensitive flags, declare enum values, and flag profileable parameters.</p>

    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span></div>
      <pre>murliCobra.Annotate(queryCmd, murli.Metadata{
	FlagAnnotations: map[string]murli.FlagAnnotation{
		"top":     {Enum: []string{"5", "10", "20", "50"}},
		"token":   {Sensitive: true},
		"format":  {Profileable: true},
	},
})</pre>
    </div>

    <h3>FlagAnnotation fields</h3>
    <table class="tbl">
      <thead><tr><th>Field</th><th>Type</th><th>Effect</th></tr></thead>
      <tbody>
        <tr><td class="mono">Sensitive</td><td class="mono muted">bool</td><td>Value is redacted in schema output and logs</td></tr>
        <tr><td class="mono">Profileable</td><td class="mono muted">bool</td><td>Flag can be saved and recalled via named profiles</td></tr>
        <tr><td class="mono">Persistent</td><td class="mono muted">bool</td><td>Flag applies to all subcommands</td></tr>
        <tr><td class="mono">Enum</td><td class="mono muted">[]string</td><td>Valid values. Surfaced in schema and error envelopes.</td></tr>
        <tr><td class="mono">MutuallyExclusiveWith</td><td class="mono muted">[]string</td><td>Flag names that cannot be used together with this flag</td></tr>
        <tr><td class="mono">Pattern</td><td class="mono muted">string</td><td>Regex pattern the value must match (informational, not enforced by murli)</td></tr>
        <tr><td class="mono">Env</td><td class="mono muted">string</td><td>Environment variable that sets this flag when present</td></tr>
      </tbody>
    </table>

    <h2>Profiles</h2>
    <p>Profiles let users save named sets of flag values and recall them with <code>--profile &lt;name&gt;</code>. The <code>profile</code> subcommand is auto-mounted. Mark any flag as <code>Profileable: true</code> in its <code>FlagAnnotation</code> to include it in profile operations.</p>

    <div class="code-block">
      <div class="code-block-header"><span class="lang">shell</span></div>
      <pre># Save current flags as a named profile
$ mytool profile set dev --top 10 --format table

# Use the profile in a subsequent call
$ mytool query woodworking --profile dev
# equivalent to: mytool query woodworking --top 10 --format table

# List available profiles
$ mytool profile list</pre>
    </div>

    <p>Profile data is stored in <code>~/.config/&lt;toolname&gt;/profiles.json</code>. The path is returned by <code>murli.ProfilePath(toolName)</code>. Engineers who need direct access to the store can use <code>murli.LoadProfileStore(toolName)</code>. See the <a href="/lang/go.html">Go reference</a> for the full <code>ProfileStore</code> API.</p>

    <h2>Conventions linter</h2>
    <p><code>murli.CheckConventions</code> checks command and flag names against the conventional vocabulary (get/list/delete, --json/--force/--quiet) and writes advisory warnings. It returns the number of issues found. Run it in CI or as a test.</p>

    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span><span class="filename">conventions_test.go</span></div>
      <pre>func TestConventions(t *testing.T) {
	issues := murli.CheckConventions(
		[]string{"get", "list", "delete", "fetch"}, // "fetch" will warn
		[]string{"json", "force", "format"},         // "format" will warn
		os.Stderr,
	)
	if issues &gt; 0 {
		t.Errorf("found %d convention issues", issues)
	}
}</pre>
    </div>

    <nav class="pn-row">
      <a class="pn" href="/guides/free.html">
        <div class="lbl">&larr; guides</div>
        <div class="nm">What you get free</div>
      </a>
      <a class="pn next" href="/guides/build.html">
        <div class="lbl">guides &rarr;</div>
        <div class="nm">What you build</div>
      </a>
    </nav>

  </main>
</div>
<script src="https://cdn.jsdelivr.net/npm/fuse.js@7/dist/fuse.min.js"></script>
<script src="/search.js"></script>
</body>
</html>
```

- [ ] **Step 2: Validate**

Open `http://localhost:8080/guides/configure.html`. Verify all sections, tables, and code blocks render correctly.

- [ ] **Step 3: Commit**

```bash
git add site/guides/configure.html
git commit -m "feat: add What you configure guide"
```

---

### Task 7: guides/build.html

**Files:**
- Create: `site/guides/build.html`

- [ ] **Step 1: Create site/guides/build.html**

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>What you build — murli docs</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css">
  <script src="/theme.js"></script>
</head>
<body>
<header class="topbar">
  <div class="topbar-left">
    <a class="brand" href="/"><span class="glyph">&#9834;</span><span>murli</span><span class="ver">v1.0.0</span></a>
  </div>
  <div class="topbar-mid">
    <button class="kbar" id="search-btn" type="button">
      <span style="color:var(--muted)">&#x2315;</span><span>Search docs&hellip;</span>
      <span class="kbd"><span>&#8984;</span><span>K</span></span>
    </button>
  </div>
  <div class="topbar-right">
    <button class="iconbtn" id="theme-btn" type="button" title="Toggle theme" onclick="_toggleTheme()">&#x2600;</button>
    <a class="linkbtn" href="https://github.com/allank/murli" target="_blank" rel="noopener noreferrer">
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px">{ }</span> github
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

    <div class="eyebrow">&sect; Guides</div>
    <h1 class="page-title">What you build</h1>
    <p class="lede">These are the calls you write inside your command handlers. murli provides the output methods; you call them with your data.</p>

    <h2>WriteSuccess</h2>
    <p>Call <code>WriteSuccess</code> at the end of a successful handler. At a TTY it prints <code>humanText</code>; when piped or in agent mode it prints the JSON success envelope with <code>jsonPayload</code> as the <code>result</code> field.</p>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span></div>
      <pre>func queryHandler(cmd *cobra.Command, args []string) error {
	w := murliCobra.NewWriter(cmd)

	results := []map[string]any{
		{"path": "/docs/woodworking", "score": 0.95},
	}
	w.WriteSuccess("Found 1 result", results)
	return nil
}</pre>
    </div>
    <p>JSON output:</p>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">json</span></div>
      <pre>{
  "status": "ok",
  "schema_version": "1.0",
  "tool_version": "1.0.0",
  "message": "Found 1 result",
  "result": [{ "path": "/docs/woodworking", "score": 0.95 }]
}</pre>
    </div>

    <h2>WriteError</h2>
    <p>Call <code>WriteError</code> when a command fails. It writes the error envelope to stderr and calls <code>os.Exit</code> with the code from the <code>AgentError</code>. Do not return an error from the handler after calling <code>WriteError</code>.</p>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span></div>
      <pre>if !indexExists {
	w.WriteError(murli.NewUserError(
		"index not found",
		"Run `mytool index build` to create the index.",
	))
	// execution stops here — WriteError calls os.Exit(1)
}

// For internal/unexpected errors:
if err != nil {
	w.WriteError(murli.NewToolError(err.Error()))
}</pre>
    </div>

    <h2>WriteEvent — NDJSON streaming</h2>
    <p>Use <code>WriteEvent</code> for commands that produce output incrementally. Each call writes one JSON object on one line to stdout. The final <code>WriteSuccess</code> call closes the stream.</p>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span></div>
      <pre>for _, chunk := range chunks {
	w.WriteEvent(map[string]any{
		"event": "chunk",
		"index": chunk.Index,
		"data":  chunk.Text,
	})
}
w.WriteSuccess("Processed all chunks", summary)</pre>
    </div>
    <p>Output format (NDJSON — one JSON object per line):</p>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">ndjson</span></div>
      <pre>{"event":"chunk","index":0,"data":"..."}
{"event":"chunk","index":1,"data":"..."}
{"status":"ok","message":"Processed all chunks","result":{...}}</pre>
    </div>

    <h2>WriteProgress</h2>
    <p>Use <code>WriteProgress</code> for structured progress reporting. In TTY mode the progress is written to stderr. In agent mode each progress event is written as an NDJSON line to stdout. Use <code>w.Progress(msg)</code> for simple unstructured progress messages.</p>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span></div>
      <pre>for i, item := range items {
	w.WriteProgress(murli.ProgressEvent{
		Stage:   "processing",
		Current: i + 1,
		Total:   len(items),
		Percent: float64(i+1) / float64(len(items)) * 100,
		EtaMs:   estimatedRemainingMs,
		Message: item.Name,
	})
	process(item)
}
w.WriteSuccess("Done", summary)</pre>
    </div>

    <h2>WritePlan — dry-run</h2>
    <p>Use <code>WritePlan</code> when the handler is running in dry-run mode. It writes a plan envelope and exits cleanly. Check <code>w.IsDryRun()</code> before executing mutations.</p>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span></div>
      <pre>if w.IsDryRun() {
	plan := map[string]any{
		"would_delete": filesToDelete,
		"count":        len(filesToDelete),
	}
	w.WritePlan("Would delete 3 files", plan)
	return nil
}

// proceed with actual deletion
for _, f := range filesToDelete {
	os.Remove(f)
}
w.WriteSuccess("Deleted 3 files", nil)</pre>
    </div>

    <h2>Log and Progress</h2>
    <p><code>w.Log(msg)</code> writes a diagnostic line to stderr. Consecutive identical lines are deduplicated. Use <code>w.Progress(msg)</code> for progress lines that should overwrite each other in TTY mode.</p>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span></div>
      <pre>w := murliCobra.NewWriter(cmd)
w.Log("connecting to index...")
w.Progress("[1/3] reading corpus")
// repeated identical Progress calls are collapsed to one line</pre>
    </div>

    <h2>FormatAgentsMD</h2>
    <p><code>murli.FormatAgentsMD</code> generates an <code>AGENTS.md</code> stub from the <code>describe</code> output of your CLI. Useful for bootstrapping agent documentation.</p>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span><span class="filename">cmd/gen-agents-md/main.go</span></div>
      <pre>describeOut := murliCobra.BuildDescribeTree(rootCmd)
agentsMD := murli.FormatAgentsMD(murli.DescribeOutput{
	Name:     rootCmd.Use,
	Commands: []murli.DescribeCommandSchema{describeOut},
})
fmt.Print(agentsMD)</pre>
    </div>

    <nav class="pn-row">
      <a class="pn" href="/guides/configure.html">
        <div class="lbl">&larr; guides</div>
        <div class="nm">What you configure</div>
      </a>
      <a class="pn next" href="/lang/go.html">
        <div class="lbl">language reference &rarr;</div>
        <div class="nm">Go</div>
      </a>
    </nav>

  </main>
</div>
<script src="https://cdn.jsdelivr.net/npm/fuse.js@7/dist/fuse.min.js"></script>
<script src="/search.js"></script>
</body>
</html>
```

- [ ] **Step 2: Validate**

Open `http://localhost:8080/guides/build.html`. Verify all 7 sections render (WriteSuccess through FormatAgentsMD), code blocks display correctly, prev/next links point to configure ← and → Go.

- [ ] **Step 3: Commit**

```bash
git add site/guides/build.html
git commit -m "feat: add What you build guide"
```
