# murli docs — Stage 5: Search + LLM files

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the search index (one entry per page), write `llms.txt` (short index for LLM discovery), and write `llms-full.txt` (complete API reference for LLM consumption).

**Architecture:** `search-index.json` is a flat JSON array fetched lazily by `search.js`. `llms.txt` and `llms-full.txt` are plain text files at the site root, fetchable directly without JavaScript. All three files depend on stages 1–4 being complete.

**Tech Stack:** JSON, Markdown-formatted plain text. No build tooling.

**Prerequisite:** All pages from Stages 1–4 must exist. Serve with `cd site && python3 -m http.server 8080` to validate.

---

### Task 1: search-index.json

**Files:**
- Create: `site/search-index.json`

- [ ] **Step 1: Create site/search-index.json**

```json
[
  {
    "title": "Overview",
    "group": "Introduction",
    "url": "/index.html",
    "keywords": "home start murli overview introduction two audiences cli agent middleware"
  },
  {
    "title": "The 5 Principles",
    "group": "Introduction",
    "url": "/principles.html",
    "keywords": "principles unified interface self-describing actionable errors intentional mutations bounded context"
  },
  {
    "title": "Installation",
    "group": "Guides",
    "url": "/guides/installation.html",
    "keywords": "install setup go get module cobra urfave cli v2 v3 requirements verify"
  },
  {
    "title": "Quickstart",
    "group": "Guides",
    "url": "/guides/quickstart.html",
    "keywords": "quickstart quick start minimal integration example cobra urfave cli execute run wrap"
  },
  {
    "title": "What you get free",
    "group": "Guides",
    "url": "/guides/free.html",
    "keywords": "free automatic tty detection agent flag schema describe doctor profile force yes dry-run json log deduplication subcommands injected"
  },
  {
    "title": "What you configure",
    "group": "Guides",
    "url": "/guides/configure.html",
    "keywords": "configure metadata annotate flag annotation profileable sensitive enum profiles check conventions linter"
  },
  {
    "title": "What you build",
    "group": "Guides",
    "url": "/guides/build.html",
    "keywords": "build write success error event progress plan logger agents md format agents dry run ndjson streaming"
  },
  {
    "title": "Go",
    "group": "Language Reference",
    "url": "/lang/go.html",
    "keywords": "go cobra urfave cli v2 v3 writer logger metadata profiles utilities agent error new writer annotate execute enable run wrap build describe tree"
  },
  {
    "title": "TypeScript",
    "group": "Language Reference",
    "url": "/lang/typescript.html",
    "keywords": "typescript planned commander yargs oclif citty"
  },
  {
    "title": "Rust",
    "group": "Language Reference",
    "url": "/lang/rust.html",
    "keywords": "rust planned clap argh derive builder crates"
  },
  {
    "title": "Python",
    "group": "Language Reference",
    "url": "/lang/python.html",
    "keywords": "python planned click typer argparse pip packages"
  },
  {
    "title": "Exit codes",
    "group": "API",
    "url": "/api/exit-codes.html",
    "keywords": "exit codes 0 1 2 3 4 5 6 7 8 9 ok user error tool error partial timeout not found permission conflict rate limited cancelled exit func"
  },
  {
    "title": "Schema · describe",
    "group": "API",
    "url": "/api/schema.html",
    "keywords": "schema describe describe output command schema flag schema capabilities profiles info safety block idempotent destructive dry run supported"
  },
  {
    "title": "Envelopes",
    "group": "API",
    "url": "/api/envelopes.html",
    "keywords": "envelopes json success error event plan progress ndjson schema version tool version stdout stderr"
  },
  {
    "title": "Roadmap",
    "group": "Project",
    "url": "/roadmap.html",
    "keywords": "roadmap v1.0 chapter 2 typescript rust python planned future"
  }
]
```

- [ ] **Step 2: Validate search**

Open `http://localhost:8080/index.html`. Press Cmd+K (or `/`). Type:
- `install` — should show "Installation" as top result
- `exit` — should show "Exit codes"
- `cobra` — should show "Go" and "Quickstart"
- `profiles` — should show "What you configure" and "Go"

- [ ] **Step 3: Commit**

```bash
git add site/search-index.json
git commit -m "feat: add search index — all 15 pages indexed"
```

---

### Task 2: llms.txt

**Files:**
- Create: `site/llms.txt`

- [ ] **Step 1: Create site/llms.txt**

```
# murli v1.0.0

> CLI middleware for AI agent integration. Pure Go. Wraps cobra, urfave/cli v2, and urfave/cli v3.
> Integration is a single function call. Language-agnostic wire format (JSON envelopes, exit codes, describe schema).

## Install

go get github.com/allank/murli
go get github.com/allank/murli/cobra    # cobra users
go get github.com/allank/murli/cli/v2   # urfave/cli v2 users
go get github.com/allank/murli/cli/v3   # urfave/cli v3 users

## Key entry points

cobra:    murliCobra.Execute(root)         — replaces root.Execute()
          murliCobra.NewWriter(cmd)        — creates Writer in handler
          murliCobra.Annotate(cmd, meta)   — attaches agent metadata

cli/v2:   murliCli.Run(app, os.Args)       — replaces app.Run(os.Args)
          murliCli.NewWriter(ctx)          — creates Writer in handler
          murliCli.Annotate(cmd, meta)     — attaches agent metadata

cli/v3:   murliCli.Run(app, os.Args)       — replaces app.Run(ctx, os.Args)
          murliCli.Wrap(app)              — in-place setup
          murliCli.NewWriter(cmd)         — creates Writer in handler

## Documentation

Full API reference (this file): /llms-full.txt
Human docs: /index.html
GitHub: https://github.com/allank/murli
pkg.go.dev: https://pkg.go.dev/github.com/allank/murli
```

- [ ] **Step 2: Validate**

```bash
curl http://localhost:8080/llms.txt
```

Expected: file content printed, no HTML, no JavaScript.

- [ ] **Step 3: Commit**

```bash
git add site/llms.txt
git commit -m "feat: add llms.txt discovery file"
```

---

### Task 3: llms-full.txt

**Files:**
- Create: `site/llms-full.txt`

- [ ] **Step 1: Create site/llms-full.txt**

```
# murli v1.0.0 — Complete Reference

CLI middleware for AI agent integration. Pure Go. Wraps cobra, urfave/cli v2, and urfave/cli v3.
Replace one function call to get dual-audience output, runtime introspection, structured errors,
and token-efficient logging.

Source: https://github.com/allank/murli
Docs: https://pkg.go.dev/github.com/allank/murli


## Install

go get github.com/allank/murli

Pick one adapter:
  go get github.com/allank/murli/cobra      # spf13/cobra
  go get github.com/allank/murli/cli/v2     # urfave/cli v2
  go get github.com/allank/murli/cli/v3     # urfave/cli v3

Requires Go 1.21 or later.


## Quick integration (cobra)

package main

import (
    "github.com/allank/murli"
    murliCobra "github.com/allank/murli/cobra"
    "github.com/spf13/cobra"
)

var queryCmd = &cobra.Command{
    Use:   "query <text>",
    Short: "Search the index",
    RunE: func(cmd *cobra.Command, args []string) error {
        w := murliCobra.NewWriter(cmd)
        w.Progress("searching...")
        results := []map[string]any{{"path": "/docs", "score": 0.95}}
        w.WriteSuccess("Found 1 result", results)
        return nil
    },
}

func main() {
    root := &cobra.Command{Use: "mytool"}
    root.AddCommand(queryCmd)
    murliCobra.Annotate(queryCmd, murli.Metadata{
        AgentDescription: "Search the document index.",
        Idempotent:       true,
    })
    _ = murliCobra.Execute(root) // only change from standard cobra
}


## What you get automatically (no additional code)

Calling Execute/Run/Wrap injects on every command:
  --agent           Forces JSON output regardless of TTY state
  --schema          Prints command schema as JSON and exits
  --force / --yes   Bypasses non-interactive confirmation guards
  --dry-run         Signals dry-run intent; handler checks w.IsDryRun()
  --profile <name>  Loads a named flag profile

Auto-mounted subcommands on the root:
  describe          Full command tree as JSON (see DescribeOutput below)
  doctor            Health and config check
  profile           Profile management: list, set, use, delete

TTY detection: stdout connected to terminal -> formatted text output
               stdout piped -> JSON output
               --agent flag -> JSON output regardless

Log deduplication: consecutive identical lines to stderr are collapsed to one.


## Adapter entry points

### cobra (github.com/allank/murli/cobra)

Execute(root *cobra.Command) error
  Drop-in replacement for root.Execute(). Injects flags, mounts subcommands,
  wraps all RunE handlers.

Enable(root *cobra.Command)
  Same as Execute but does not replace the Execute call. Use when you need
  to call root.Execute() yourself.

NewWriter(cmd *cobra.Command) *murli.Writer
  Creates a Writer from the command's injected flags. Call this at the
  start of every handler.

Annotate(cmd *cobra.Command, meta murli.Metadata)
  Attaches Metadata to a command. Call once per command, outside handlers.

EmitSchema(cmd *cobra.Command) error
  Writes command schema as JSON to stdout.

BuildDescribeTree(cmd *cobra.Command) murli.DescribeCommandSchema
  Builds the recursive schema tree for a command and its subcommands.


### urfave/cli v2 (github.com/allank/murli/cli/v2)

Run(app *cli.App, args []string) error
  Drop-in replacement for app.Run(args).

NewWriter(ctx *cli.Context) *murli.Writer
  Creates a Writer from the action context.

Annotate(cmd *cli.Command, meta murli.Metadata)
  Attaches metadata to a command.

AnnotateApp(app *cli.App, meta murli.Metadata)
  Attaches metadata to the root app.

EmitSchema(cmd *cli.Command, w io.Writer) error
BuildV2DescribeTree(cmd *cli.Command) murli.DescribeCommandSchema


### urfave/cli v3 (github.com/allank/murli/cli/v3)

Run(app *cli.Command, args []string) error
  Drop-in replacement for app.Run(ctx, args).

Wrap(app *cli.Command)
  In-place setup: injects flags, wraps Actions, mounts subcommands.

NewWriter(cmd *cli.Command) *murli.Writer
Annotate(cmd *cli.Command, meta murli.Metadata)
EmitSchema(cmd *cli.Command, w io.Writer) error
BuildV3DescribeTree(cmd *cli.Command) murli.DescribeCommandSchema


## Writer API (github.com/allank/murli)

Obtain via the adapter's NewWriter in every handler. Do not construct directly
in normal use.

Constructor (for testing / custom adapters only):
  NewWriter(stdout, stderr io.Writer, agentMode bool, opts ...WriterOption) *Writer

WriterOption functions:
  WithOutputFormat(f OutputFormat)    Override output format
  WithProtocolVersion(v string)       Set protocol version in envelopes
  WithForce(force bool)               Set forced state
  WithDryRun(dryRun bool)             Set dry-run state

OutputFormat constants:
  OutputFormatDefault  ""        Auto-detect: JSON if not TTY, text if TTY
  OutputFormatJSON     "json"    Single JSON object
  OutputFormatNDJSON   "ndjson"  Newline-delimited JSON
  OutputFormatText     "text"    Plain text, no envelopes

Output methods:
  WriteSuccess(humanText string, jsonPayload any)
    Writes success envelope to stdout. Human text at TTY, JSON when piped.

  WritePlan(humanText string, plan any)
    Writes plan envelope to stdout. Use when w.IsDryRun() == true.

  WriteError(err *AgentError)
    Writes error envelope to stderr and calls os.Exit(err.Code).
    Do not return from handler after calling WriteError.

  WriteEvent(v any)
    Writes one NDJSON line to stdout. Use for streaming output.
    Final call should be WriteSuccess.

  WriteProgress(evt ProgressEvent)
    In agent mode: writes NDJSON progress line to stdout.
    In TTY mode: writes progress text to stderr.

  Log(msg string)
    Writes diagnostic line to stderr. Deduplicates consecutive identical lines.

  Progress(msg string)
    Writes unstructured progress line to stderr.

  Flush()
    Flushes buffered log/progress output.

State methods:
  IsTTY() bool              True if stdout is a terminal
  IsForced() bool           True if --force or --yes was passed
  IsDryRun() bool           True if --dry-run was passed
  Format() OutputFormat     Current output format
  ProtocolVersion() string  Protocol version included in envelopes

ProgressEvent struct:
  type ProgressEvent struct {
      Stage   string  // stage name
      Current int     // current step
      Total   int     // total steps
      Percent float64 // 0-100
      EtaMs   int64   // estimated ms remaining
      Message string  // human-readable status
  }


## Logger API (github.com/allank/murli)

NewLogger(writer io.Writer, isTTY bool) *Logger
  Creates a logger. Use when building outside a standard handler context.
  w.Log() and w.Progress() use an internal logger automatically.

(*Logger).Log(line string)
  Writes line to stderr. Suppresses if identical to previous line.

(*Logger).LogProgress(line string)
  Writes progress line. In TTY mode, overwrites previous progress line.

(*Logger).Flush()
  Flushes buffered output.


## AgentError (github.com/allank/murli)

Constructors:
  NewUserError(message, suggestion string) *AgentError   exit code 1
  NewToolError(message string) *AgentError               exit code 2

For other exit codes, construct directly:
  &AgentError{
      Code:        murli.ExitNotFound,  // 5
      ErrorType:   "not_found",
      Message:     "index file does not exist",
      Suggestion:  "Run `mytool index build` to create it.",
      Recoverable: true,
  }

AgentError fields:
  Code          int       Exit code (use Exit* constants)
  ErrorType     string    Machine-readable category (json: "error")
  Message       string    Human-readable description
  Suggestion    string    What to do next (omitempty)
  Recoverable   bool      Whether retrying may succeed
  ValidValues   []string  Acceptable values for enum violations (omitempty)
  RetryAfterMs  int       Ms to wait before retrying (omitempty)
  DocURL        string    Link to documentation (omitempty)
  Field         string    Flag or argument that caused error (omitempty)
  SchemaVersion string    Set automatically by WriteError
  ToolVersion   string    Set automatically by WriteError


## Exit codes

  0  ExitOK           Success
  1  ExitUserError    Invalid input, bad flags, constraint violation
  2  ExitToolError    Internal failure, dependency error
  3  ExitPartial      Partial success; some operations failed
  4  ExitTimeout      Operation timed out
  5  ExitNotFound     Resource does not exist
  6  ExitPermission   Insufficient permissions
  7  ExitConflict     State conflict (already exists, concurrent modification)
  8  ExitRateLimited  Rate limit reached; check retry_after_ms
  9  ExitCancelled    Operation cancelled

ExitFunc defaults to os.Exit. Override in tests:
  murli.ExitFunc = func(code int) { capturedCode = code }


## Metadata struct (github.com/allank/murli)

Pass to adapter Annotate. All fields optional.

  type Metadata struct {
      AgentDescription string                      // description for agents
      WhenToUse        string                      // when to choose this command
      Idempotent       bool                        // safe to call multiple times
      Mutating         bool                        // modifies state
      DryRunnable      bool                        // supports --dry-run
      Destructive      bool                        // deletes or irreversibly modifies
      Arguments        []ArgumentMetadata          // positional args
      Returns          *ReturnSchema               // output shape
      Examples         []Example                   // worked examples
      FlagAnnotations  map[string]FlagAnnotation   // per-flag metadata
  }

  type ArgumentMetadata struct {
      Name        string
      Type        string
      Required    bool
      Description string
  }

  type ReturnSchema struct {
      Type         string          // "json", "text", etc.
      Description  string
      Shape        map[string]any  // field name -> type string
      OutputSchema json.RawMessage // JSON Schema (optional)
  }

  type Example struct {
      Command          string
      Description      string
      ExpectedExitCode int
  }

  type FlagAnnotation struct {
      Env                   string
      Sensitive             bool     // redact value in schema/logs
      Persistent            bool     // applies to all subcommands
      Profileable           bool     // can be saved in profiles
      MutuallyExclusiveWith []string // flag names that conflict
      Enum                  []string // valid values
      Pattern               string   // regex constraint (informational)
  }


## Profiles API (github.com/allank/murli)

The profile subcommand is auto-mounted. Use ProfileStore directly only for
programmatic access outside a command handler.

  ProfilePath(toolName string) string
    Returns ~/.config/<toolName>/profiles.json

  LoadProfileStore(toolName string) (*ProfileStore, error)
    Loads profiles from disk. Creates empty store if file absent.

  (*ProfileStore).Save(toolName string) error
  (*ProfileStore).Get(name string) (Profile, bool)
  (*ProfileStore).Set(name string, p Profile)
  (*ProfileStore).Delete(name string)
  (*ProfileStore).SetDefault(name string) error
  (*ProfileStore).Names() []string    // sorted

  type Profile struct {
      Flags map[string]string
  }

  type ProfileStore struct {
      Default  string
      Profiles map[string]Profile
  }


## Utilities (github.com/allank/murli)

CheckConventions(commandNames, flagNames []string, w io.Writer) int
  Checks names against conventional vocabulary. Writes advisory warnings.
  Returns count of issues. Use in tests or CI.

  Non-standard verbs (with recommendation):
    fetch/info/retrieve -> get
    show-all/ls         -> list
    remove/rm           -> delete
    add/new/make        -> create
    edit/modify/set     -> update

  Non-standard flags (with recommendation):
    skip-confirmations/no-confirm -> force
    silent/no-output              -> quiet
    preview/what-if               -> dry-run
    format/output-format          -> output

FormatAgentsMD(out DescribeOutput) string
  Generates AGENTS.md stub from describe output. Returns Markdown string.


## Wire format — JSON envelopes

All envelopes include schema_version ("1.0") and tool_version.
Success, plan, event envelopes -> stdout
Error envelopes -> stderr

Success:
  {"status":"ok","schema_version":"1.0","tool_version":"1.0.0",
   "message":"...","result":{...}}

Error:
  {"status":"error","code":1,"error":"user_error",
   "message":"...","suggestion":"...","recoverable":true,
   "valid_values":["a","b"],"retry_after_ms":0,
   "schema_version":"1.0","tool_version":"1.0.0"}

Plan (dry-run):
  {"status":"plan","schema_version":"1.0","tool_version":"1.0.0",
   "message":"...","plan":{...}}

Event (NDJSON streaming) — one line per WriteEvent call:
  {"event":"chunk","data":"..."}
  {"event":"chunk","data":"..."}
  {"status":"ok",...}     <- final line is always success or error

Progress (NDJSON, agent mode only) — one line per WriteProgress call:
  {"event":"progress","stage":"read","current":1,"total":3,"percent":33,"eta_ms":4200}


## Schema — describe output types

DescribeOutput:
  name, summary, schema_version, tool_version
  capabilities: Capabilities
  profiles: ProfilesInfo (optional)
  commands: []DescribeCommandSchema

Capabilities:
  streaming bool, dry_run bool, profiles bool
  output_formats []string
  schema_version, tool_version, protocol_version string

DescribeCommandSchema (recursive):
  name, summary, agent_description, when_to_use
  idempotent bool, mutating bool
  arguments []ArgumentMetadata
  flags []FlagSchema
  returns *ReturnSchema
  examples []Example
  subcommands []DescribeCommandSchema
  safety SafetyBlock

FlagSchema:
  name, type, description, env, pattern string
  default any
  sensitive, persistent, profileable bool
  mutually_exclusive_with, enum []string

SafetyBlock:
  read_only bool, idempotent bool
  destructive bool (omitempty)
  dry_run_supported bool (omitempty)

ProfilesInfo:
  available []string, default string
  profileable_flags []string


## Version

SchemaVersion const = "1.0"  (included in all envelopes as schema_version)

ToolVersion var = ""          (set at build time via ldflags)
  -ldflags "-X github.com/allank/murli.ToolVersion=1.0.0"

ValidOutputFormats = ["json", "ndjson", "text"]
ValidProtocolVersions = ["0.2"]
```

- [ ] **Step 2: Validate**

```bash
curl http://localhost:8080/llms-full.txt | wc -l
```

Expected: ~250 or more lines.

```bash
curl http://localhost:8080/llms-full.txt | head -20
```

Expected: plain text starting with `# murli v1.0.0`.

- [ ] **Step 3: Commit**

```bash
git add site/llms-full.txt
git commit -m "feat: add llms-full.txt complete API reference for LLM consumption"
```

---

### Task 4: Final validation

- [ ] **Step 1: Serve and check all pages**

```bash
cd site && python3 -m http.server 8080
```

Visit each page and verify it loads, the active nav link is correct, and prev/next links work:

```
http://localhost:8080/index.html
http://localhost:8080/principles.html
http://localhost:8080/guides/installation.html
http://localhost:8080/guides/quickstart.html
http://localhost:8080/guides/free.html
http://localhost:8080/guides/configure.html
http://localhost:8080/guides/build.html
http://localhost:8080/lang/go.html
http://localhost:8080/lang/typescript.html
http://localhost:8080/lang/rust.html
http://localhost:8080/lang/python.html
http://localhost:8080/api/exit-codes.html
http://localhost:8080/api/schema.html
http://localhost:8080/api/envelopes.html
http://localhost:8080/roadmap.html
```

- [ ] **Step 2: Verify LLM files are plain text**

```bash
curl -s http://localhost:8080/llms.txt | head -5
curl -s http://localhost:8080/llms-full.txt | head -5
```

Expected: both start with `#` (Markdown heading), no HTML tags.

- [ ] **Step 3: Verify search works end to end**

Open `http://localhost:8080/index.html`, press Cmd+K:
- Type `write` — "What you build" should appear
- Type `profile` — "What you configure" should appear
- Press Escape to close

- [ ] **Step 4: Verify theme toggle persists**

On any page: click theme toggle to switch to light. Reload. Verify light theme persists. Toggle back to dark. Reload. Verify dark theme persists.

- [ ] **Step 5: Commit**

```bash
git add site/llms.txt site/search-index.json site/llms-full.txt
git commit -m "feat: stage 5 complete — search index, llms.txt, llms-full.txt"
```

Note: `llms.txt` and `search-index.json` were committed separately in tasks 1 and 2. If they were staged but not committed yet, include them in this final commit instead.
