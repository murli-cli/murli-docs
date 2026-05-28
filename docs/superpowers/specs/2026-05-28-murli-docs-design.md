# murli documentation site — design spec
_2026-05-28_

## Overview

A static HTML documentation site for murli v1.0.0, preserving the visual design and structural approach of the reference SPA (`refs/murli-siteref.html`) but rebuilt as plain HTML/CSS files, deployable to Cloudflare Pages without a build step.

---

## Decisions

| Question | Decision |
|---|---|
| Build tooling | Pure HTML/CSS — no build step, no SSG |
| Deployment | Cloudflare Pages — deploy `site/` folder directly |
| JavaScript | Minimal: theme toggle (~15 lines) + Fuse.js search palette |
| LLM format | `/llms.txt` index + `/llms-full.txt` complete reference |
| Language nav | LANGUAGE REFERENCE group retained; Go (stable) + TS/Rust/Python as individual stubs |
| API structure | `/api/` = wire format only (language-agnostic); language-specific implementation API lives in `/lang/<lang>.html` |
| Principles | 5 core principles from README (not the 10-principle essay from the blog) |
| Philosophy section | Removed from site; link to blog post retained on Overview page |

---

## Site structure

### Navigation groups

```
INTRODUCTION
  Overview                    index.html
  The 5 Principles            principles.html

GUIDES
  Installation                guides/installation.html
  Quickstart                  guides/quickstart.html
  What you get free           guides/free.html
  What you configure          guides/configure.html
  What you build              guides/build.html

LANGUAGE REFERENCE
  Go                [stable]  lang/go.html
  TypeScript        [planned] lang/typescript.html
  Rust              [planned] lang/rust.html
  Python            [planned] lang/python.html

API
  Exit codes                  api/exit-codes.html        ← codes 0–9, ExitFunc
  Schema · describe           api/schema.html            ← DescribeOutput, CommandSchema, Capabilities, ProfilesInfo, SafetyBlock
  Envelopes                   api/envelopes.html         ← success/error/event/plan JSON shapes + schema_version/tool_version fields

PROJECT
  Roadmap                     roadmap.html

EXTERNAL (sidebar links only)
  github ↗                   https://github.com/allank/murli
  pkg.go.dev ↗               https://pkg.go.dev/github.com/allank/murli
```

### API split rationale

The API section documents only the **wire format** — JSON envelope shapes, exit code values, and `describe` schema output — which is identical across all language implementations.

Language-specific implementation APIs (Writer, Logger, Metadata/Annotate, Profiles, Utilities) live within each `/lang/` page. When TypeScript, Rust, or Python ship, their pages carry their own full API reference. No restructuring of URLs required.

### Language stubs

Each planned language (`typescript.html`, `rust.html`, `python.html`) is a real page with a stable URL. Content is a brief stub: what frameworks will be supported, target timeline, and a link to track. When a language ships, the stub is replaced in-place.

---

## File layout

```
site/
├── index.html
├── principles.html
├── roadmap.html
├── guides/
│   ├── installation.html
│   ├── quickstart.html
│   ├── free.html
│   ├── configure.html
│   └── build.html
├── lang/
│   ├── go.html
│   ├── typescript.html
│   ├── rust.html
│   └── python.html
├── api/
│   ├── exit-codes.html
│   ├── schema.html
│   └── envelopes.html
├── style.css
├── theme.js
├── search.js
├── search-index.json
├── llms.txt
├── llms-full.txt
└── _redirects
```

Total: 15 HTML pages + 2 LLM text files + 4 supporting assets.

---

## Visual design

Faithful port of the reference SPA design. No visual changes.

### Layout
- Fixed topbar (48px height)
- Fixed sidebar (220px wide)
- Scrolling content area with max-width ~860px

### CSS custom properties (theme system)

```css
/* dark (default) / light (data-theme="light" on <html>) */
--bg:       #0e1116 / #ffffff
--surface:  #171b22 / #f6f8fa
--border:   #21262d / #d0d7de
--text:     #e6edf3 / #1f2328
--muted:    #7d8590 / #656d76
--accent:   #58a6ff / #0969da
--code-bg:  #161b22 / #f6f8fa
```

### Typography
- Body: `-apple-system, BlinkMacSystemFont, sans-serif`
- Code: `JetBrains Mono, monospace` (Google Fonts)
- Base size: 15px

### Components (all in `style.css`)
- `.topbar` — fixed header with logo, search trigger, theme toggle, GitHub link
- `.sidebar` — fixed left nav; `.sb-group`, `.sb-group-title`, `.sb-link`, `.active`
- `.content` — scrolling main area
- `.tag.stable` / `.tag.planned` — green/amber nav pills
- `pre.code-block` — filename + language label bar above code
- `.callout.info` / `.callout.warn` / `.callout.tip` — coloured left-border callout boxes
- `.tbl` — documentation tables
- `.pn-row` — prev/next page navigation at bottom of each page
- `.hero` — overview page only: h1, lede paragraph, CTA buttons, language status row
- `.eyebrow` — small all-caps label above page h1

### JavaScript

**`theme.js`** (~15 lines, runs in `<head>` before paint):
- Reads `localStorage('murli.theme')`
- Applies `data-theme` attribute to `<html>`
- Toggles on button click, persists to localStorage
- No flash of wrong theme on load

**`search.js`** (~60 lines):
- Loads `search-index.json` on first Cmd+K or `/` keypress
- Fuse.js fuzzy search over `{title, group, keywords, url}` per page
- Renders a modal palette; Enter navigates, Escape closes
- Pages remain fully usable with JS disabled (content is in HTML)

---

## LLM files

### `/llms.txt`
Short Markdown index (~30 lines). Project name, one-line description, install command, links to full reference and GitHub. Key entry points for each adapter (cobra, cli/v2, cli/v3).

### `/llms-full.txt`
Complete reference in Markdown (~600–800 lines). Structure:
1. Overview and install
2. Quickstart (minimal working integration)
3. What's automatic (no code required)
4. What needs annotation (opt-in metadata)
5. What you write in handlers
6. Full Go API reference (Writer, Logger, Metadata, Profiles, Utilities, AgentError)
7. Wire format (envelope shapes, exit codes, describe schema)

Both files are plain text, fetchable without JavaScript.

---

## Content approach

### Tone
Factual, technical, direct. Active voice, present tense. No subjective performance claims. Describe what the library does and what the engineer must do.

### The 5 core principles
Sourced from the library README. Appear in full on `principles.html` and summarised on the `index.html` hero.

1. **Unified Interface** — one tool, two audiences, no code branching on output
2. **Self-Describing Tools** — complete metadata available via runtime introspection
3. **Actionable Errors** — structured: what failed, whether retryable, corrective steps
4. **Intentional Mutations** — state-changing operations require explicit confirmation in non-interactive contexts
5. **Bounded Context** — log deduplication and streaming to control token consumption

### Blog post reference
Appears on `index.html` as a single link: _"Background and research — allankent.com/garden/projects/murli"_. Attribution to referenced research (Cloudflare, Google, Trevin Chow, RTK, Speakeasy, Anthropic) retained on `principles.html` as a brief inline note, not an essay.

### Three-tier guide framing
The Guides section is structured around how an engineer evaluates a library:

**What you get free** (`guides/free.html`)
Automatic on `Execute`/`Run`/`Wrap` — no further code required:
- TTY detection and output routing (JSON vs formatted text)
- `--agent` flag for forcing JSON mode
- `--schema` on every command
- `describe` subcommand (full command tree as JSON)
- `doctor` subcommand (health/config check)
- Structured `AgentError` envelopes on all errors
- `--force` / `--yes` guards on non-interactive execution
- Consecutive log line deduplication

**What you configure** (`guides/configure.html`)
Opt-in annotations — call once per command, no handler changes:
- `Metadata` struct: `AgentDescription`, `WhenToUse`, `Idempotent`, `Mutating`, `DryRunnable`, `Destructive`, `Returns`, `Examples`
- `FlagAnnotation`: `Sensitive`, `Profileable`, `Enum`, `MutuallyExclusiveWith`, `Pattern`
- Profiles: `ProfileStore`, named flag configurations, `--profile` flag
- `CheckConventions` for advisory linting of verb/flag names

**What you build** (`guides/build.html`)
Code that lives in your command handlers:
- `WriteSuccess(humanText, jsonPayload)` — dual-output result
- `WriteError(err)` — structured error + exit
- `WriteEvent(v)` — NDJSON streaming for long-running operations
- `WriteProgress(evt)` — typed stage/current/total/percent/eta_ms
- `WritePlan(humanText, plan)` — dry-run plan envelope
- `Logger.Log` / `Logger.LogProgress` for stderr diagnostics
- `FormatAgentsMD` for generating AGENTS.md stubs

---

## Cloudflare Pages deployment

- Connect repo to Cloudflare Pages
- Build output directory: `site/`
- Build command: none
- Every push to `main` deploys
- `_redirects` handles any needed URL rewrites
- Cloudflare serves `lang/go.html` at `/lang/go` automatically (no extension in URL)
