# murli docs — Stage 3: Language Reference

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Go language reference page (full adapter API + implementation API) and stub pages for TypeScript, Rust, and Python.

**Architecture:** `lang/go.html` is the longest page in the site — it covers three adapters (cobra, cli/v2, cli/v3) plus the full implementation API (Writer, Logger, AgentError, Metadata, Profiles, Utilities). The three stub pages each have a consistent structure: planned pill, target framework list, status callout, tracking link.

**Tech Stack:** Same as stages 1–2. Requires Stage 1 complete.

**Prerequisite:** Stage 1 complete. Serve with `cd site && python3 -m http.server 8080` to validate.

---

### Task 1: lang/go.html

**Files:**
- Create: `site/lang/go.html`

- [ ] **Step 1: Create site/lang/go.html**

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Go — murli docs</title>
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

    <div class="eyebrow">&sect; Language Reference</div>
    <h1 class="page-title">Go <span class="pill stable" style="font-size:13px;margin-left:12px"><span class="dot">&#x25CF;</span> stable v1.0.0</span></h1>
    <p class="lede">Three adapters cover the major Go CLI frameworks: <code>spf13/cobra</code>, <code>urfave/cli v2</code>, and <code>urfave/cli v3</code>. Each adapter exposes the same conceptual operations with framework-idiomatic signatures.</p>

    <!-- ── Adapters ───────────────────────────────────────── -->

    <h2>cobra adapter</h2>
    <p>Import path: <code>github.com/allank/murli/cobra</code></p>

    <table class="tbl">
      <thead><tr><th>Function</th><th>Signature</th><th>Purpose</th></tr></thead>
      <tbody>
        <tr>
          <td class="mono">Execute</td>
          <td class="mono muted">Execute(root *cobra.Command) error</td>
          <td>Drop-in replacement for <code>root.Execute()</code>. Injects flags, mounts subcommands, wraps all <code>RunE</code> handlers.</td>
        </tr>
        <tr>
          <td class="mono">Enable</td>
          <td class="mono muted">Enable(root *cobra.Command)</td>
          <td>Injects without replacing <code>Execute</code>. Use when you need to call <code>root.Execute()</code> yourself.</td>
        </tr>
        <tr>
          <td class="mono">NewWriter</td>
          <td class="mono muted">NewWriter(cmd *cobra.Command) *murli.Writer</td>
          <td>Creates a <code>Writer</code> configured from the command&rsquo;s injected flags (<code>--agent</code>, <code>--force</code>, <code>--dry-run</code>).</td>
        </tr>
        <tr>
          <td class="mono">Annotate</td>
          <td class="mono muted">Annotate(cmd *cobra.Command, meta murli.Metadata)</td>
          <td>Serialises <code>Metadata</code> into <code>cmd.Annotations["agentcobra"]</code> for schema output.</td>
        </tr>
        <tr>
          <td class="mono">EmitSchema</td>
          <td class="mono muted">EmitSchema(cmd *cobra.Command) error</td>
          <td>Writes the command schema as JSON to stdout.</td>
        </tr>
        <tr>
          <td class="mono">BuildDescribeTree</td>
          <td class="mono muted">BuildDescribeTree(cmd *cobra.Command) murli.DescribeCommandSchema</td>
          <td>Builds the recursive schema tree for a command and its subcommands.</td>
        </tr>
      </tbody>
    </table>

    <h2>urfave/cli v2 adapter</h2>
    <p>Import path: <code>github.com/allank/murli/cli/v2</code></p>

    <table class="tbl">
      <thead><tr><th>Function</th><th>Signature</th><th>Purpose</th></tr></thead>
      <tbody>
        <tr>
          <td class="mono">Run</td>
          <td class="mono muted">Run(app *cli.App, args []string) error</td>
          <td>Drop-in replacement for <code>app.Run(args)</code>.</td>
        </tr>
        <tr>
          <td class="mono">NewWriter</td>
          <td class="mono muted">NewWriter(ctx *cli.Context) *murli.Writer</td>
          <td>Creates a <code>Writer</code> from the action context.</td>
        </tr>
        <tr>
          <td class="mono">Annotate</td>
          <td class="mono muted">Annotate(cmd *cli.Command, meta murli.Metadata)</td>
          <td>Attaches metadata to a command. Uses a pointer-keyed map internally (urfave/cli v2 has no native metadata field).</td>
        </tr>
        <tr>
          <td class="mono">AnnotateApp</td>
          <td class="mono muted">AnnotateApp(app *cli.App, meta murli.Metadata)</td>
          <td>Attaches metadata to the root app.</td>
        </tr>
        <tr>
          <td class="mono">EmitSchema</td>
          <td class="mono muted">EmitSchema(cmd *cli.Command, w io.Writer) error</td>
          <td>Writes the command schema as JSON to the provided writer.</td>
        </tr>
        <tr>
          <td class="mono">BuildV2DescribeTree</td>
          <td class="mono muted">BuildV2DescribeTree(cmd *cli.Command) murli.DescribeCommandSchema</td>
          <td>Builds the schema tree for a command.</td>
        </tr>
      </tbody>
    </table>

    <h2>urfave/cli v3 adapter</h2>
    <p>Import path: <code>github.com/allank/murli/cli/v3</code></p>

    <table class="tbl">
      <thead><tr><th>Function</th><th>Signature</th><th>Purpose</th></tr></thead>
      <tbody>
        <tr>
          <td class="mono">Run</td>
          <td class="mono muted">Run(app *cli.Command, args []string) error</td>
          <td>Drop-in replacement for <code>app.Run(ctx, args)</code>.</td>
        </tr>
        <tr>
          <td class="mono">Wrap</td>
          <td class="mono muted">Wrap(app *cli.Command)</td>
          <td>In-place setup: injects flags, wraps Actions, mounts subcommands. Use when you need to call <code>app.Run</code> yourself.</td>
        </tr>
        <tr>
          <td class="mono">NewWriter</td>
          <td class="mono muted">NewWriter(cmd *cli.Command) *murli.Writer</td>
          <td>Creates a <code>Writer</code> from the command context.</td>
        </tr>
        <tr>
          <td class="mono">Annotate</td>
          <td class="mono muted">Annotate(cmd *cli.Command, meta murli.Metadata)</td>
          <td>Stores metadata in <code>cmd.Metadata["murli"]</code>.</td>
        </tr>
        <tr>
          <td class="mono">EmitSchema</td>
          <td class="mono muted">EmitSchema(cmd *cli.Command, w io.Writer) error</td>
          <td>Writes the command schema as JSON.</td>
        </tr>
        <tr>
          <td class="mono">BuildV3DescribeTree</td>
          <td class="mono muted">BuildV3DescribeTree(cmd *cli.Command) murli.DescribeCommandSchema</td>
          <td>Builds the schema tree for a command.</td>
        </tr>
      </tbody>
    </table>

    <!-- ── Writer ─────────────────────────────────────────── -->

    <h2>Writer</h2>
    <p>Package: <code>github.com/allank/murli</code></p>
    <p>The <code>Writer</code> is the primary output surface. Obtain one via the adapter&rsquo;s <code>NewWriter</code> in every handler. Do not construct one directly in normal use.</p>

    <h3>Constructor</h3>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span></div>
      <pre>func NewWriter(stdout, stderr io.Writer, agentMode bool, opts ...WriterOption) *Writer</pre>
    </div>
    <p>Use the adapter&rsquo;s <code>NewWriter</code> in handlers. The bare constructor is for testing or building custom adapters.</p>

    <h3>WriterOption functions</h3>
    <table class="tbl">
      <thead><tr><th>Function</th><th>Effect</th></tr></thead>
      <tbody>
        <tr><td class="mono">WithOutputFormat(f OutputFormat)</td><td>Override the output format (<code>OutputFormatJSON</code>, <code>OutputFormatNDJSON</code>, <code>OutputFormatText</code>)</td></tr>
        <tr><td class="mono">WithProtocolVersion(v string)</td><td>Set the protocol version string in envelope output. Default: <code>"0.2"</code>.</td></tr>
        <tr><td class="mono">WithForce(force bool)</td><td>Set the forced state directly (used by adapters reading the <code>--force</code> flag)</td></tr>
        <tr><td class="mono">WithDryRun(dryRun bool)</td><td>Set the dry-run state directly</td></tr>
      </tbody>
    </table>

    <h3>Output methods</h3>
    <table class="tbl">
      <thead><tr><th>Method</th><th>Writes to</th><th>When</th></tr></thead>
      <tbody>
        <tr><td class="mono">WriteSuccess(humanText string, jsonPayload any)</td><td>stdout</td><td>Command completed successfully</td></tr>
        <tr><td class="mono">WritePlan(humanText string, plan any)</td><td>stdout</td><td>Dry-run: show what would happen</td></tr>
        <tr><td class="mono">WriteError(err *AgentError)</td><td>stderr</td><td>Command failed; calls <code>os.Exit</code> with the error code</td></tr>
        <tr><td class="mono">WriteEvent(v any)</td><td>stdout</td><td>One NDJSON line per call for streaming output</td></tr>
        <tr><td class="mono">WriteProgress(evt ProgressEvent)</td><td>stdout (agent) / stderr (TTY)</td><td>Typed progress update</td></tr>
        <tr><td class="mono">Log(msg string)</td><td>stderr</td><td>Diagnostic line with deduplication</td></tr>
        <tr><td class="mono">Progress(msg string)</td><td>stderr</td><td>Unstructured progress line</td></tr>
        <tr><td class="mono">Flush()</td><td>&mdash;</td><td>Flush buffered log/progress output</td></tr>
      </tbody>
    </table>

    <h3>State methods</h3>
    <table class="tbl">
      <thead><tr><th>Method</th><th>Returns</th></tr></thead>
      <tbody>
        <tr><td class="mono">IsTTY() bool</td><td>True if stdout is a terminal</td></tr>
        <tr><td class="mono">IsForced() bool</td><td>True if <code>--force</code> or <code>--yes</code> was passed</td></tr>
        <tr><td class="mono">IsDryRun() bool</td><td>True if <code>--dry-run</code> was passed</td></tr>
        <tr><td class="mono">Format() OutputFormat</td><td>Current output format</td></tr>
        <tr><td class="mono">ProtocolVersion() string</td><td>Protocol version string included in envelopes</td></tr>
      </tbody>
    </table>

    <h3>OutputFormat constants</h3>
    <table class="tbl">
      <thead><tr><th>Constant</th><th>Value</th><th>Meaning</th></tr></thead>
      <tbody>
        <tr><td class="mono">OutputFormatDefault</td><td><code>""</code></td><td>Auto-detect: JSON if not TTY, text if TTY</td></tr>
        <tr><td class="mono">OutputFormatJSON</td><td><code>"json"</code></td><td>Single JSON object</td></tr>
        <tr><td class="mono">OutputFormatNDJSON</td><td><code>"ndjson"</code></td><td>Newline-delimited JSON</td></tr>
        <tr><td class="mono">OutputFormatText</td><td><code>"text"</code></td><td>Plain text, no JSON envelopes</td></tr>
      </tbody>
    </table>

    <h3>ProgressEvent struct</h3>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span></div>
      <pre>type ProgressEvent struct {
    Stage   string  `json:"stage,omitempty"`
    Current int     `json:"current,omitempty"`
    Total   int     `json:"total,omitempty"`
    Percent float64 `json:"percent,omitempty"`
    EtaMs   int64   `json:"eta_ms,omitempty"`
    Message string  `json:"message,omitempty"`
}</pre>
    </div>

    <!-- ── Logger ──────────────────────────────────────────── -->

    <h2>Logger</h2>
    <p>Package: <code>github.com/allank/murli</code></p>
    <p>The <code>Logger</code> writes diagnostic output to stderr with consecutive line deduplication. <code>w.Log()</code> and <code>w.Progress()</code> use an internal logger. Use <code>NewLogger</code> directly only when building outside a standard handler context.</p>

    <table class="tbl">
      <thead><tr><th>Function / Method</th><th>Signature</th><th>Purpose</th></tr></thead>
      <tbody>
        <tr><td class="mono">NewLogger</td><td class="mono muted">NewLogger(writer io.Writer, isTTY bool) *Logger</td><td>Creates a logger writing to <code>writer</code></td></tr>
        <tr><td class="mono">Log</td><td class="mono muted">(l *Logger) Log(line string)</td><td>Writes a log line to stderr. Suppresses if identical to the previous line.</td></tr>
        <tr><td class="mono">LogProgress</td><td class="mono muted">(l *Logger) LogProgress(line string)</td><td>Writes a progress line. In TTY mode, overwrites the previous progress line.</td></tr>
        <tr><td class="mono">Flush</td><td class="mono muted">(l *Logger) Flush()</td><td>Flushes any buffered output</td></tr>
      </tbody>
    </table>

    <!-- ── AgentError ──────────────────────────────────────── -->

    <h2>AgentError</h2>
    <p>Package: <code>github.com/allank/murli</code></p>

    <h3>Constructors</h3>
    <table class="tbl">
      <thead><tr><th>Function</th><th>Exit code</th><th>Use when</th></tr></thead>
      <tbody>
        <tr><td class="mono">NewUserError(message, suggestion string) *AgentError</td><td>1</td><td>Invalid input, bad flags, user mistake</td></tr>
        <tr><td class="mono">NewToolError(message string) *AgentError</td><td>2</td><td>Internal failure, dependency error</td></tr>
      </tbody>
    </table>

    <p>For other exit codes, construct an <code>AgentError</code> directly:</p>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span></div>
      <pre>w.WriteError(&amp;murli.AgentError{
    Code:        murli.ExitNotFound,
    ErrorType:   "not_found",
    Message:     "index file does not exist",
    Suggestion:  "Run `mytool index build` to create it.",
    Recoverable: true,
})</pre>
    </div>

    <h3>AgentError fields</h3>
    <table class="tbl">
      <thead><tr><th>Field</th><th>Type</th><th>JSON key</th><th>Purpose</th></tr></thead>
      <tbody>
        <tr><td class="mono">Code</td><td class="mono muted">int</td><td><code>code</code></td><td>Exit code. Use the <code>Exit*</code> constants.</td></tr>
        <tr><td class="mono">ErrorType</td><td class="mono muted">string</td><td><code>error</code></td><td>Machine-readable error category (e.g. <code>"user_error"</code>, <code>"not_found"</code>)</td></tr>
        <tr><td class="mono">Message</td><td class="mono muted">string</td><td><code>message</code></td><td>Human-readable description of what failed</td></tr>
        <tr><td class="mono">Suggestion</td><td class="mono muted">string</td><td><code>suggestion</code></td><td>What the caller should do next</td></tr>
        <tr><td class="mono">Recoverable</td><td class="mono muted">bool</td><td><code>recoverable</code></td><td>True if retrying the same call might succeed</td></tr>
        <tr><td class="mono">ValidValues</td><td class="mono muted">[]string</td><td><code>valid_values</code></td><td>Acceptable values when an enum constraint was violated</td></tr>
        <tr><td class="mono">RetryAfterMs</td><td class="mono muted">int</td><td><code>retry_after_ms</code></td><td>Milliseconds to wait before retrying (rate-limit errors)</td></tr>
        <tr><td class="mono">DocURL</td><td class="mono muted">string</td><td><code>doc_url</code></td><td>Link to relevant documentation</td></tr>
        <tr><td class="mono">Field</td><td class="mono muted">string</td><td><code>field</code></td><td>Flag or argument name that caused the error</td></tr>
        <tr><td class="mono">SchemaVersion</td><td class="mono muted">string</td><td><code>schema_version</code></td><td>Set automatically by <code>WriteError</code></td></tr>
        <tr><td class="mono">ToolVersion</td><td class="mono muted">string</td><td><code>tool_version</code></td><td>Set automatically by <code>WriteError</code></td></tr>
      </tbody>
    </table>

    <!-- ── Metadata ────────────────────────────────────────── -->

    <h2>Metadata</h2>
    <p>Package: <code>github.com/allank/murli</code></p>
    <p>Pass to the adapter&rsquo;s <code>Annotate</code> function. All fields are optional.</p>

    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span></div>
      <pre>type Metadata struct {
    AgentDescription string
    WhenToUse        string
    Idempotent       bool
    Mutating         bool
    Arguments        []ArgumentMetadata
    Returns          *ReturnSchema
    Examples         []Example
    FlagAnnotations  map[string]FlagAnnotation
    DryRunnable      bool
    Destructive      bool
}</pre>
    </div>

    <h3>ArgumentMetadata</h3>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span></div>
      <pre>type ArgumentMetadata struct {
    Name        string `json:"name"`
    Type        string `json:"type"`
    Required    bool   `json:"required"`
    Description string `json:"description"`
}</pre>
    </div>

    <h3>ReturnSchema</h3>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span></div>
      <pre>type ReturnSchema struct {
    Type         string          `json:"type"`
    Description  string          `json:"description"`
    Shape        map[string]any  `json:"shape,omitempty"`
    OutputSchema json.RawMessage `json:"output_schema,omitempty"`
}</pre>
    </div>

    <h3>Example</h3>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span></div>
      <pre>type Example struct {
    Command          string `json:"command"`
    Description      string `json:"description,omitempty"`
    ExpectedExitCode int    `json:"expected_exit_code,omitempty"`
}</pre>
    </div>

    <!-- ── Profiles ────────────────────────────────────────── -->

    <h2>Profiles</h2>
    <p>Package: <code>github.com/allank/murli</code></p>
    <p>The <code>profile</code> subcommand handles profile management automatically. Use the <code>ProfileStore</code> API directly only when you need programmatic access to profiles outside a command handler.</p>

    <table class="tbl">
      <thead><tr><th>Function / Method</th><th>Signature</th><th>Purpose</th></tr></thead>
      <tbody>
        <tr><td class="mono">ProfilePath</td><td class="mono muted">ProfilePath(toolName string) string</td><td>Returns the path to <code>~/.config/&lt;toolName&gt;/profiles.json</code></td></tr>
        <tr><td class="mono">LoadProfileStore</td><td class="mono muted">LoadProfileStore(toolName string) (*ProfileStore, error)</td><td>Loads profiles from disk. Creates an empty store if the file does not exist.</td></tr>
        <tr><td class="mono">Save</td><td class="mono muted">(*ProfileStore) Save(toolName string) error</td><td>Writes the store to disk</td></tr>
        <tr><td class="mono">Get</td><td class="mono muted">(*ProfileStore) Get(name string) (Profile, bool)</td><td>Returns the named profile and whether it exists</td></tr>
        <tr><td class="mono">Set</td><td class="mono muted">(*ProfileStore) Set(name string, p Profile)</td><td>Creates or replaces a named profile</td></tr>
        <tr><td class="mono">Delete</td><td class="mono muted">(*ProfileStore) Delete(name string)</td><td>Removes a profile</td></tr>
        <tr><td class="mono">SetDefault</td><td class="mono muted">(*ProfileStore) SetDefault(name string) error</td><td>Sets the default profile (used when no <code>--profile</code> flag is given)</td></tr>
        <tr><td class="mono">Names</td><td class="mono muted">(*ProfileStore) Names() []string</td><td>Returns all profile names in sorted order</td></tr>
      </tbody>
    </table>

    <h3>Profile struct</h3>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span></div>
      <pre>type Profile struct {
    Flags map[string]string `json:"flags"`
}

type ProfileStore struct {
    Default  string             `json:"default,omitempty"`
    Profiles map[string]Profile `json:"profiles"`
}</pre>
    </div>

    <!-- ── Utilities ───────────────────────────────────────── -->

    <h2>Utilities</h2>
    <p>Package: <code>github.com/allank/murli</code></p>

    <h3>CheckConventions</h3>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span></div>
      <pre>func CheckConventions(commandNames, flagNames []string, w io.Writer) int</pre>
    </div>
    <p>Checks command and flag names against the conventional vocabulary. Writes advisory warnings to <code>w</code> for non-standard names. Returns the count of issues found. Does not modify any state. Use in tests or CI to enforce naming standards.</p>
    <p><strong>Non-standard verbs flagged</strong> (with suggested replacement): <code>fetch</code>&rarr;<code>get</code>, <code>info</code>&rarr;<code>get</code>, <code>retrieve</code>&rarr;<code>get</code>, <code>show-all</code>&rarr;<code>list</code>, <code>remove</code>&rarr;<code>delete</code>, <code>rm</code>&rarr;<code>delete</code>, <code>add</code>&rarr;<code>create</code>, <code>edit</code>&rarr;<code>update</code>, <code>modify</code>&rarr;<code>update</code>.</p>
    <p><strong>Non-standard flags flagged</strong>: <code>skip-confirmations</code>&rarr;<code>force</code>, <code>silent</code>&rarr;<code>quiet</code>, <code>preview</code>&rarr;<code>dry-run</code>, <code>format</code>&rarr;<code>output</code>.</p>

    <h3>FormatAgentsMD</h3>
    <div class="code-block">
      <div class="code-block-header"><span class="lang">go</span></div>
      <pre>func FormatAgentsMD(out DescribeOutput) string</pre>
    </div>
    <p>Generates an <code>AGENTS.md</code> stub from a <code>DescribeOutput</code>. Produces a Markdown document that lists each command, its description, flags, and examples. Intended as a starting point for agent-facing documentation.</p>

    <!-- ── Version ─────────────────────────────────────────── -->

    <h2>Version constants</h2>
    <table class="tbl">
      <thead><tr><th>Identifier</th><th>Type</th><th>Value / Purpose</th></tr></thead>
      <tbody>
        <tr><td class="mono">SchemaVersion</td><td class="mono muted">const string</td><td><code>"1.0"</code> — included in all envelope output as <code>schema_version</code></td></tr>
        <tr><td class="mono">ToolVersion</td><td class="mono muted">var string</td><td>Set at build time via <code>-ldflags "-X github.com/allank/murli.ToolVersion=1.0.0"</code>. Included in envelopes as <code>tool_version</code>.</td></tr>
        <tr><td class="mono">ExitFunc</td><td class="mono muted">var func(int)</td><td>Defaults to <code>os.Exit</code>. Override in tests to prevent process exit: <code>murli.ExitFunc = func(code int) { ... }</code></td></tr>
      </tbody>
    </table>

    <nav class="pn-row">
      <a class="pn" href="/guides/build.html">
        <div class="lbl">&larr; guides</div>
        <div class="nm">What you build</div>
      </a>
      <a class="pn next" href="/lang/typescript.html">
        <div class="lbl">language reference &rarr;</div>
        <div class="nm">TypeScript</div>
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

Open `http://localhost:8080/lang/go.html`. Verify:
- Page title shows "Go" with stable pill
- All 8 sections render: cobra adapter, cli/v2, cli/v3, Writer, Logger, AgentError, Metadata, Profiles, Utilities, Version constants
- All tables render correctly
- Prev/Next shows ← What you build and → TypeScript

- [ ] **Step 3: Commit**

```bash
git add site/lang/go.html
git commit -m "feat: add Go language reference"
```

---

### Task 2: Language stub pages (TypeScript, Rust, Python)

**Files:**
- Create: `site/lang/typescript.html`
- Create: `site/lang/rust.html`
- Create: `site/lang/python.html`

- [ ] **Step 1: Create site/lang/typescript.html**

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>TypeScript — murli docs</title>
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

    <div class="eyebrow">&sect; Language Reference</div>
    <h1 class="page-title">TypeScript <span class="pill planned" style="font-size:13px;margin-left:12px"><span>&#x25D0;</span> planned</span></h1>
    <p class="lede">Adapters for <code>commander</code>, <code>yargs</code>, <code>oclif</code>, and <code>citty</code>. The TypeScript implementation will follow the same conceptual API as the Go reference with idiomatic TypeScript signatures.</p>

    <div class="callout warn">
      <span class="h">// Status</span>
      Not yet published. The Go implementation is the reference. TypeScript adapters are planned for a future release. Track progress at <a href="https://github.com/allank/murli" target="_blank" rel="noopener noreferrer">github.com/allank/murli</a>.
    </div>

    <h2>Planned adapters</h2>
    <table class="tbl">
      <thead><tr><th>Package</th><th>Framework</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td class="mono">@murli/commander</td><td>commander</td><td class="muted">planned</td></tr>
        <tr><td class="mono">@murli/yargs</td><td>yargs</td><td class="muted">planned</td></tr>
        <tr><td class="mono">@murli/oclif</td><td>oclif</td><td class="muted">planned</td></tr>
        <tr><td class="mono">@murli/citty</td><td>citty</td><td class="muted">planned</td></tr>
      </tbody>
    </table>

    <p>When available, this page will contain the full TypeScript API reference, installation instructions, and framework-specific quickstart examples.</p>

    <nav class="pn-row">
      <a class="pn" href="/lang/go.html">
        <div class="lbl">&larr; language reference</div>
        <div class="nm">Go</div>
      </a>
      <a class="pn next" href="/lang/rust.html">
        <div class="lbl">language reference &rarr;</div>
        <div class="nm">Rust</div>
      </a>
    </nav>

  </main>
</div>
<script src="https://cdn.jsdelivr.net/npm/fuse.js@7/dist/fuse.min.js"></script>
<script src="/search.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create site/lang/rust.html**

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Rust — murli docs</title>
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

    <div class="eyebrow">&sect; Language Reference</div>
    <h1 class="page-title">Rust <span class="pill planned" style="font-size:13px;margin-left:12px"><span>&#x25D0;</span> planned</span></h1>
    <p class="lede">Adapters for <code>clap</code> (derive and builder APIs) and <code>argh</code>. The Rust implementation will share the same wire format and design principles as the Go reference.</p>

    <div class="callout warn">
      <span class="h">// Status</span>
      Not yet published. Crates not yet available on crates.io. Track progress at <a href="https://github.com/allank/murli" target="_blank" rel="noopener noreferrer">github.com/allank/murli</a>.
    </div>

    <h2>Planned crates</h2>
    <table class="tbl">
      <thead><tr><th>Crate</th><th>Framework</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td class="mono">murli-clap</td><td>clap (derive + builder)</td><td class="muted">planned</td></tr>
        <tr><td class="mono">murli-argh</td><td>argh</td><td class="muted">planned</td></tr>
      </tbody>
    </table>

    <p>When available, this page will contain the full Rust API reference, Cargo.toml configuration, and framework-specific quickstart examples.</p>

    <nav class="pn-row">
      <a class="pn" href="/lang/typescript.html">
        <div class="lbl">&larr; language reference</div>
        <div class="nm">TypeScript</div>
      </a>
      <a class="pn next" href="/lang/python.html">
        <div class="lbl">language reference &rarr;</div>
        <div class="nm">Python</div>
      </a>
    </nav>

  </main>
</div>
<script src="https://cdn.jsdelivr.net/npm/fuse.js@7/dist/fuse.min.js"></script>
<script src="/search.js"></script>
</body>
</html>
```

- [ ] **Step 3: Create site/lang/python.html**

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Python — murli docs</title>
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

    <div class="eyebrow">&sect; Language Reference</div>
    <h1 class="page-title">Python <span class="pill planned" style="font-size:13px;margin-left:12px"><span>&#x25D0;</span> planned</span></h1>
    <p class="lede">Adapters for <code>click</code>, <code>typer</code>, and <code>argparse</code>. The Python implementation will share the same wire format and design principles as the Go reference.</p>

    <div class="callout warn">
      <span class="h">// Status</span>
      Not yet published. Packages not yet available on PyPI. Track progress at <a href="https://github.com/allank/murli" target="_blank" rel="noopener noreferrer">github.com/allank/murli</a>.
    </div>

    <h2>Planned packages</h2>
    <table class="tbl">
      <thead><tr><th>Package</th><th>Framework</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td class="mono">murli-click</td><td>click</td><td class="muted">planned</td></tr>
        <tr><td class="mono">murli-typer</td><td>typer</td><td class="muted">planned</td></tr>
        <tr><td class="mono">murli-argparse</td><td>argparse</td><td class="muted">planned</td></tr>
      </tbody>
    </table>

    <p>When available, this page will contain the full Python API reference, pip installation instructions, and framework-specific quickstart examples.</p>

    <nav class="pn-row">
      <a class="pn" href="/lang/rust.html">
        <div class="lbl">&larr; language reference</div>
        <div class="nm">Rust</div>
      </a>
      <a class="pn next" href="/api/exit-codes.html">
        <div class="lbl">api &rarr;</div>
        <div class="nm">Exit codes</div>
      </a>
    </nav>

  </main>
</div>
<script src="https://cdn.jsdelivr.net/npm/fuse.js@7/dist/fuse.min.js"></script>
<script src="/search.js"></script>
</body>
</html>
```

- [ ] **Step 4: Validate**

Open each stub page and verify:
- `http://localhost:8080/lang/typescript.html` — planned pill, frameworks table, warn callout
- `http://localhost:8080/lang/rust.html` — planned pill, crates table, warn callout
- `http://localhost:8080/lang/python.html` — planned pill, packages table, warn callout
- Prev/Next chain: TypeScript ↔ Rust ↔ Python ↔ Exit codes

- [ ] **Step 5: Commit**

```bash
git add site/lang/typescript.html site/lang/rust.html site/lang/python.html
git commit -m "feat: add language stub pages (TypeScript, Rust, Python)"
```
