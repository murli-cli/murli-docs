# murli docs — Stage 4: API + Roadmap

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the three wire-format API reference pages (Exit codes, Schema·describe, Envelopes) and the Roadmap page.

**Architecture:** These pages document the language-agnostic JSON wire format — envelope shapes, exit code values, and the describe schema. The content is identical regardless of which language adapter is used.

**Tech Stack:** Same as stages 1–3. Requires Stage 1 complete.

**Prerequisite:** Stage 1 complete. Serve with `cd site && python3 -m http.server 8080` to validate.

---

### Task 1: api/exit-codes.html

**Files:**
- Create: `site/api/exit-codes.html`

- [ ] **Step 1: Create site/api/exit-codes.html**

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Exit codes — murli docs</title>
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

    <div class="eyebrow">&sect; API</div>
    <h1 class="page-title">Exit codes</h1>
    <p class="lede">Exit codes distinguish failure categories. Agents use them to decide whether to retry, escalate, or surface the error to the user. The values are identical across all language implementations.</p>

    <h2>Code table</h2>
    <table class="tbl">
      <thead><tr><th>Code</th><th>Go constant</th><th>Meaning</th><th>Recoverable</th></tr></thead>
      <tbody>
        <tr>
          <td class="mono">0</td>
          <td class="mono">ExitOK</td>
          <td>Success</td>
          <td>&mdash;</td>
        </tr>
        <tr>
          <td class="mono">1</td>
          <td class="mono">ExitUserError</td>
          <td>Invalid input: bad flags, wrong argument type, constraint violation</td>
          <td>Yes &mdash; fix input and retry</td>
        </tr>
        <tr>
          <td class="mono">2</td>
          <td class="mono">ExitToolError</td>
          <td>Internal failure: dependency error, unexpected state, tool bug</td>
          <td>Sometimes &mdash; check <code>recoverable</code> field</td>
        </tr>
        <tr>
          <td class="mono">3</td>
          <td class="mono">ExitPartial</td>
          <td>Partial success: some operations succeeded, some failed. Check result for details.</td>
          <td>Depends on context</td>
        </tr>
        <tr>
          <td class="mono">4</td>
          <td class="mono">ExitTimeout</td>
          <td>Operation timed out before completing</td>
          <td>Yes &mdash; retry after a delay</td>
        </tr>
        <tr>
          <td class="mono">5</td>
          <td class="mono">ExitNotFound</td>
          <td>Requested resource does not exist</td>
          <td>No &mdash; unless the resource is expected to be created</td>
        </tr>
        <tr>
          <td class="mono">6</td>
          <td class="mono">ExitPermission</td>
          <td>Insufficient permissions to perform the operation</td>
          <td>No &mdash; requires permission change</td>
        </tr>
        <tr>
          <td class="mono">7</td>
          <td class="mono">ExitConflict</td>
          <td>State conflict: resource already exists, concurrent modification detected</td>
          <td>Sometimes &mdash; may resolve with a delete first</td>
        </tr>
        <tr>
          <td class="mono">8</td>
          <td class="mono">ExitRateLimited</td>
          <td>Rate limit reached. Check <code>retry_after_ms</code> field for wait duration.</td>
          <td>Yes &mdash; retry after <code>retry_after_ms</code></td>
        </tr>
        <tr>
          <td class="mono">9</td>
          <td class="mono">ExitCancelled</td>
          <td>Operation was cancelled before completing</td>
          <td>Yes &mdash; retry if still needed</td>
        </tr>
      </tbody>
    </table>

    <h2>In error envelopes</h2>
    <p>The exit code appears as <code>code</code> in the error envelope written to stderr. The process also exits with this code.</p>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">json</span><span class="filename">stderr</span></div>
      <pre>{
  "status": "error",
  "code": 5,
  "error": "not_found",
  "message": "index file does not exist at ~/.mytool/index.db",
  "suggestion": "Run `mytool index build` to create the index.",
  "recoverable": true,
  "schema_version": "1.0",
  "tool_version": "1.0.0"
}</pre>
    </div>

    <h2>ExitFunc override</h2>
    <p><code>murli.ExitFunc</code> defaults to <code>os.Exit</code>. Override it in tests to capture the exit code without terminating the process.</p>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span><span class="filename">your_test.go</span></div>
      <pre>var capturedCode int
murli.ExitFunc = func(code int) {
    capturedCode = code
}
defer func() { murli.ExitFunc = os.Exit }()

// run your command handler
// ...
// assert capturedCode == murli.ExitNotFound</pre>
    </div>

    <nav class="pn-row">
      <a class="pn" href="/lang/python.html">
        <div class="lbl">&larr; language reference</div>
        <div class="nm">Python</div>
      </a>
      <a class="pn next" href="/api/schema.html">
        <div class="lbl">api &rarr;</div>
        <div class="nm">Schema &middot; describe</div>
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

Open `http://localhost:8080/api/exit-codes.html`. Verify the 10-row code table, error envelope example, ExitFunc override example, and prev/next links.

- [ ] **Step 3: Commit**

```bash
git add site/api/exit-codes.html
git commit -m "feat: add Exit codes API page"
```

---

### Task 2: api/schema.html

**Files:**
- Create: `site/api/schema.html`

- [ ] **Step 1: Create site/api/schema.html**

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Schema · describe — murli docs</title>
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

    <div class="eyebrow">&sect; API</div>
    <h1 class="page-title">Schema &middot; describe</h1>
    <p class="lede">The <code>describe</code> subcommand and <code>--schema</code> flag produce JSON documents that describe a CLI&rsquo;s structure, capabilities, and output contracts. These are the types that appear in that output.</p>

    <h2>DescribeOutput</h2>
    <p>The root type returned by <code>mytool describe</code>.</p>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span></div>
      <pre>type DescribeOutput struct {
    Name          string                  // tool binary name
    Summary       string                  // short description
    SchemaVersion string                  // "1.0"
    ToolVersion   string                  // from ToolVersion var or ldflags
    Capabilities  Capabilities
    Profiles      *ProfilesInfo           // nil if no profileable flags
    Commands      []DescribeCommandSchema
}</pre>
    </div>

    <h2>Capabilities</h2>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span></div>
      <pre>type Capabilities struct {
    Streaming       bool     // true if WriteEvent / NDJSON is used
    DryRun          bool     // true if --dry-run is supported
    Profiles        bool     // true if profiles are configured
    OutputFormats   []string // e.g. ["json", "ndjson", "text"]
    SchemaVersion   string
    ToolVersion     string
    ProtocolVersion string
}</pre>
    </div>

    <h2>DescribeCommandSchema</h2>
    <p>Recursive type: each command contains its subcommands at the same shape.</p>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span></div>
      <pre>type DescribeCommandSchema struct {
    Name             string
    Summary          string
    AgentDescription string
    WhenToUse        string
    Idempotent       bool
    Mutating         bool
    Arguments        []ArgumentMetadata
    Flags            []FlagSchema
    Returns          *ReturnSchema
    Examples         []Example
    Subcommands      []DescribeCommandSchema
    Safety           SafetyBlock
}</pre>
    </div>

    <h2>FlagSchema</h2>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span></div>
      <pre>type FlagSchema struct {
    Name                  string
    Type                  string   // "string", "int", "bool", "float64", etc.
    Description           string
    Default               any
    Env                   string
    Pattern               string
    Sensitive             bool
    Persistent            bool
    Profileable           bool
    MutuallyExclusiveWith []string
    Enum                  []string
}</pre>
    </div>

    <h2>SafetyBlock</h2>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span></div>
      <pre>type SafetyBlock struct {
    ReadOnly    bool `json:"read_only"`
    Idempotent  bool `json:"idempotent"`
    Destructive bool `json:"destructive,omitempty"`
    DryRunnable bool `json:"dry_run_supported,omitempty"`
}</pre>
    </div>

    <h2>ProfilesInfo</h2>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span></div>
      <pre>type ProfilesInfo struct {
    Available        []string `json:"available,omitempty"`
    Default          string   `json:"default,omitempty"`
    ProfileableFlags []string `json:"profileable_flags"`
}</pre>
    </div>

    <h2>Example describe output</h2>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">shell</span></div>
      <pre>$ mytool describe | jq .</pre>
    </div>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">json</span></div>
      <pre>{
  "name": "mytool",
  "summary": "Document search and indexing tool",
  "schema_version": "1.0",
  "tool_version": "1.0.0",
  "capabilities": {
    "streaming": false,
    "dry_run": false,
    "profiles": true,
    "output_formats": ["json", "text"],
    "schema_version": "1.0",
    "tool_version": "1.0.0",
    "protocol_version": "0.2"
  },
  "profiles": {
    "available": ["dev", "prod"],
    "default": "dev",
    "profileable_flags": ["format", "top"]
  },
  "commands": [
    {
      "name": "query",
      "summary": "Search the index",
      "agent_description": "Search the document index for semantically similar content.",
      "when_to_use": "When the user wants to find documents by meaning.",
      "idempotent": true,
      "mutating": false,
      "flags": [
        {
          "name": "top",
          "type": "int",
          "description": "Number of results to return",
          "default": 10,
          "enum": ["5", "10", "20", "50"],
          "profileable": true
        }
      ],
      "returns": {
        "type": "json",
        "description": "Ranked list of search results",
        "shape": { "path": "string", "score": "float32" }
      },
      "safety": {
        "read_only": true,
        "idempotent": true
      }
    }
  ]
}</pre>
    </div>

    <nav class="pn-row">
      <a class="pn" href="/api/exit-codes.html">
        <div class="lbl">&larr; api</div>
        <div class="nm">Exit codes</div>
      </a>
      <a class="pn next" href="/api/envelopes.html">
        <div class="lbl">api &rarr;</div>
        <div class="nm">Envelopes</div>
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

Open `http://localhost:8080/api/schema.html`. Verify all type definitions render and the example describe output is properly formatted.

- [ ] **Step 3: Commit**

```bash
git add site/api/schema.html
git commit -m "feat: add Schema · describe API page"
```

---

### Task 3: api/envelopes.html

**Files:**
- Create: `site/api/envelopes.html`

- [ ] **Step 1: Create site/api/envelopes.html**

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Envelopes — murli docs</title>
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

    <div class="eyebrow">&sect; API</div>
    <h1 class="page-title">Envelopes</h1>
    <p class="lede">Every murli output method writes a JSON envelope to stdout. The envelope shape is consistent across all language implementations and all versions within the 1.x series.</p>

    <div class="callout info">
      <span class="h">// Output channel</span>
      Success, plan, and event envelopes are written to <strong>stdout</strong>. Error envelopes are written to <strong>stderr</strong>. Progress lines (non-NDJSON) are also written to stderr. Agents should read stdout and stderr independently.
    </div>

    <h2>Success envelope</h2>
    <p>Written by <code>WriteSuccess(humanText, jsonPayload)</code>.</p>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">json</span><span class="filename">stdout</span></div>
      <pre>{
  "status": "ok",
  "schema_version": "1.0",
  "tool_version": "1.0.0",
  "message": "Found 1 result",
  "result": { ... }
}</pre>
    </div>
    <table class="tbl">
      <thead><tr><th>Field</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td class="mono">status</td><td>Always <code>"ok"</code></td></tr>
        <tr><td class="mono">schema_version</td><td>Always <code>"1.0"</code> in the v1.x series</td></tr>
        <tr><td class="mono">tool_version</td><td>Value of <code>murli.ToolVersion</code>. Empty string if not set at build time.</td></tr>
        <tr><td class="mono">message</td><td>The <code>humanText</code> argument to <code>WriteSuccess</code></td></tr>
        <tr><td class="mono">result</td><td>The <code>jsonPayload</code> argument, marshalled as JSON. <code>null</code> if nil.</td></tr>
      </tbody>
    </table>

    <h2>Error envelope</h2>
    <p>Written to stderr by <code>WriteError(err)</code>. The process exits with <code>err.Code</code> immediately after writing.</p>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">json</span><span class="filename">stderr</span></div>
      <pre>{
  "status": "error",
  "code": 1,
  "error": "user_error",
  "message": "flag --top: invalid value \"abc\" for int flag",
  "suggestion": "Valid values are 5, 10, 20, 50.",
  "valid_values": ["5", "10", "20", "50"],
  "recoverable": true,
  "retry_after_ms": 0,
  "schema_version": "1.0",
  "tool_version": "1.0.0"
}</pre>
    </div>
    <table class="tbl">
      <thead><tr><th>Field</th><th>Always present</th><th>Notes</th></tr></thead>
      <tbody>
        <tr><td class="mono">status</td><td>Yes</td><td>Always <code>"error"</code></td></tr>
        <tr><td class="mono">code</td><td>Yes</td><td>Exit code (0&ndash;9). See <a href="/api/exit-codes.html">Exit codes</a>.</td></tr>
        <tr><td class="mono">error</td><td>Yes</td><td>Machine-readable error category string</td></tr>
        <tr><td class="mono">message</td><td>Yes</td><td>Human-readable description</td></tr>
        <tr><td class="mono">suggestion</td><td>No</td><td>What to do next</td></tr>
        <tr><td class="mono">valid_values</td><td>No</td><td>Acceptable values when an enum was violated</td></tr>
        <tr><td class="mono">recoverable</td><td>Yes</td><td>Whether retrying the same call may succeed</td></tr>
        <tr><td class="mono">retry_after_ms</td><td>No</td><td>Milliseconds to wait before retrying (rate-limit errors)</td></tr>
        <tr><td class="mono">field</td><td>No</td><td>Flag or argument that caused the error</td></tr>
        <tr><td class="mono">doc_url</td><td>No</td><td>Link to relevant documentation</td></tr>
        <tr><td class="mono">schema_version</td><td>Yes</td><td>Always <code>"1.0"</code></td></tr>
        <tr><td class="mono">tool_version</td><td>Yes</td><td>Value of <code>murli.ToolVersion</code></td></tr>
      </tbody>
    </table>

    <h2>Plan envelope</h2>
    <p>Written by <code>WritePlan(humanText, plan)</code> when the handler detects <code>w.IsDryRun() == true</code>.</p>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">json</span><span class="filename">stdout</span></div>
      <pre>{
  "status": "plan",
  "schema_version": "1.0",
  "tool_version": "1.0.0",
  "message": "Would delete 3 files",
  "plan": {
    "would_delete": ["/tmp/a.db", "/tmp/b.db", "/tmp/c.db"],
    "count": 3
  }
}</pre>
    </div>

    <h2>Event envelope (NDJSON)</h2>
    <p>Written by <code>WriteEvent(v)</code>. One JSON object per line on stdout. Agents should read stdout line by line and parse each line as a separate JSON object.</p>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">ndjson</span><span class="filename">stdout — one line per call</span></div>
      <pre>{"event":"chunk","index":0,"data":"first batch of results"}
{"event":"chunk","index":1,"data":"second batch of results"}
{"status":"ok","schema_version":"1.0","tool_version":"1.0.0","message":"Done","result":{"total":2}}</pre>
    </div>
    <p>The final line is always a success or error envelope. Intermediate lines are application-defined event objects.</p>

    <h2>Progress envelope (NDJSON)</h2>
    <p>Written by <code>WriteProgress(evt)</code> when in agent mode. In TTY mode, progress is written as plain text to stderr instead.</p>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">ndjson</span><span class="filename">stdout (agent mode only)</span></div>
      <pre>{"event":"progress","stage":"read","current":1,"total":3,"percent":33,"message":"reading corpus"}
{"event":"progress","stage":"embed","current":2,"total":3,"percent":66,"eta_ms":4200}
{"event":"progress","stage":"write","current":3,"total":3,"percent":100}
{"status":"ok","schema_version":"1.0","tool_version":"1.0.0","message":"Reindexed 4213 docs","result":{"count":4213}}</pre>
    </div>

    <nav class="pn-row">
      <a class="pn" href="/api/schema.html">
        <div class="lbl">&larr; api</div>
        <div class="nm">Schema &middot; describe</div>
      </a>
      <a class="pn next" href="/roadmap.html">
        <div class="lbl">project &rarr;</div>
        <div class="nm">Roadmap</div>
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

Open `http://localhost:8080/api/envelopes.html`. Verify all 5 envelope types render correctly with their JSON examples and field tables.

- [ ] **Step 3: Commit**

```bash
git add site/api/envelopes.html
git commit -m "feat: add Envelopes API page"
```

---

### Task 4: roadmap.html

**Files:**
- Create: `site/roadmap.html`

- [ ] **Step 1: Create site/roadmap.html**

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Roadmap — murli docs</title>
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

    <div class="eyebrow">&sect; Project</div>
    <h1 class="page-title">Roadmap</h1>
    <p class="lede">murli is at v1.0.0. The current release delivers complete Go support. Chapter 2 begins when v1.0 stabilises in production use.</p>

    <h2>v1.0.0 &mdash; current</h2>
    <p>The Go implementation is complete and stable.</p>

    <table class="tbl">
      <thead><tr><th>Feature</th><th>Notes</th></tr></thead>
      <tbody>
        <tr><td>TTY detection and output routing</td><td>Automatic; no handler code required</td></tr>
        <tr><td><code>--agent</code> flag</td><td>Forces JSON output at a TTY</td></tr>
        <tr><td><code>--schema</code> on every command</td><td>Auto-injected by <code>Execute</code> / <code>Run</code> / <code>Wrap</code></td></tr>
        <tr><td><code>describe</code> subcommand</td><td>Full command tree as JSON; auto-mounted</td></tr>
        <tr><td><code>doctor</code> subcommand</td><td>Health and config check; auto-mounted</td></tr>
        <tr><td><code>profile</code> subcommand</td><td>Profile management; auto-mounted</td></tr>
        <tr><td>Structured <code>AgentError</code></td><td>Exit codes 0&ndash;9, all fields</td></tr>
        <tr><td><code>Metadata</code> annotations</td><td><code>AgentDescription</code>, <code>WhenToUse</code>, <code>Idempotent</code>, <code>Returns</code>, <code>Examples</code></td></tr>
        <tr><td><code>FlagAnnotation</code></td><td><code>Sensitive</code>, <code>Profileable</code>, <code>Enum</code>, <code>MutuallyExclusiveWith</code>, <code>Pattern</code></td></tr>
        <tr><td><code>WriteProgress</code> / <code>WriteEvent</code></td><td>NDJSON streaming with typed <code>ProgressEvent</code></td></tr>
        <tr><td><code>WritePlan</code></td><td>Dry-run plan envelopes</td></tr>
        <tr><td>Log deduplication</td><td>Consecutive identical lines collapsed</td></tr>
        <tr><td><code>CheckConventions</code></td><td>Advisory linter for verb and flag names</td></tr>
        <tr><td><code>FormatAgentsMD</code></td><td>AGENTS.md stub generation from describe output</td></tr>
        <tr><td>cobra adapter</td><td><code>spf13/cobra v1.8+</code></td></tr>
        <tr><td>urfave/cli v2 adapter</td><td><code>urfave/cli v2.27+</code></td></tr>
        <tr><td>urfave/cli v3 adapter</td><td><code>urfave/cli v3.9+</code></td></tr>
      </tbody>
    </table>

    <h2>Chapter 2 &mdash; language adapters</h2>
    <p>After v1.0 stabilises in production use, the next phase adds adapters for other languages. Each language implementation will ship its own module / package with framework-idiomatic signatures, sharing the same wire format and design principles as the Go reference.</p>

    <table class="tbl">
      <thead><tr><th>Language</th><th>Target frameworks</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td>TypeScript</td><td>commander, yargs, oclif, citty</td><td class="muted">planned</td></tr>
        <tr><td>Rust</td><td>clap (derive + builder), argh</td><td class="muted">planned</td></tr>
        <tr><td>Python</td><td>click, typer, argparse</td><td class="muted">planned</td></tr>
      </tbody>
    </table>

    <p>Track progress at <a href="https://github.com/allank/murli" target="_blank" rel="noopener noreferrer">github.com/allank/murli</a>.</p>

    <p style="color:var(--muted);font-size:13px;margin-top:32px;border-top:1px solid var(--border);padding-top:20px;">
      Background on the design decisions behind murli: <a href="https://allankent.com/garden/projects/murli/" target="_blank" rel="noopener noreferrer">allankent.com/garden/projects/murli</a>
    </p>

    <nav class="pn-row">
      <a class="pn" href="/api/envelopes.html">
        <div class="lbl">&larr; api</div>
        <div class="nm">Envelopes</div>
      </a>
      <span></span>
    </nav>

  </main>
</div>
<script src="https://cdn.jsdelivr.net/npm/fuse.js@7/dist/fuse.min.js"></script>
<script src="/search.js"></script>
</body>
</html>
```

- [ ] **Step 2: Validate**

Open `http://localhost:8080/roadmap.html`. Verify both tables render, blog post link is present, prev link shows ← Envelopes with no next link.

- [ ] **Step 3: Commit**

```bash
git add site/roadmap.html
git commit -m "feat: add Roadmap page"
```
