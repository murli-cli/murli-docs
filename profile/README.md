# murli-cli

**murli** is a middleware layer that makes Go CLIs usable by both humans and AI agents — without branching your code for each audience.

Wrap your CLI in one function call. Everything else is automatic.

```go
// cobra — replace root.Execute() with this:
_ = murliCobra.Execute(root)

// urfave/cli v2 — replace app.Run(os.Args) with this:
_ = murliCli.Run(app, os.Args)

// urfave/cli v3 — replace app.Run(ctx, os.Args) with this:
_ = murliCli.Run(app, os.Args)
```

## What you get

**Automatic** — no code changes beyond the entry point:

- TTY detection: formatted text at a terminal, JSON when piped
- `--agent` flag to force JSON mode
- `--schema` on every command (per-command JSON schema)
- `describe` subcommand (full command tree as a single JSON document)
- `--force` / `--yes` guards on mutating commands in non-interactive contexts
- `--dry-run` support
- Structured error envelopes with exit codes, recoverability signals, and suggestions
- Log deduplication (consecutive identical stderr lines collapsed to one)

**Opt-in** — call once per command, outside your handlers:

- `Annotate(cmd, Metadata{...})` — agent description, idempotency, return shape, examples
- `FlagAnnotation` — mark flags as sensitive, profileable, enum-constrained
- Named flag profiles via `--profile`

**In your handlers** — the output surface:

- `w.WriteSuccess(humanText, jsonPayload)` — dual-audience result
- `w.WriteError(err)` — structured error + exit
- `w.WriteEvent(v)` — NDJSON streaming
- `w.WriteProgress(evt)` — typed progress updates
- `w.WritePlan(humanText, plan)` — dry-run plan envelope

## The 5 principles

| # | Principle | What it means |
|---|---|---|
| 1 | **Unified Interface** | One tool, two audiences. No output branching in application code. |
| 2 | **Self-Describing Tools** | `--schema` and `describe` expose full command metadata at runtime, without documentation. |
| 3 | **Actionable Errors** | Every error carries what failed, whether retrying helps, and what to do next. |
| 4 | **Intentional Mutations** | State-changing commands require explicit confirmation in non-interactive contexts. |
| 5 | **Bounded Context** | Log deduplication and NDJSON streaming keep per-session token consumption in check. |

## Repositories

| Repository | Description |
|---|---|
| [murli-go](https://github.com/murli-cli/murli-go) | The Go library — cobra, urfave/cli v2, and urfave/cli v3 adapters |
| [murli-demo](https://github.com/murli-cli/murli-demo) | Reference integrations — `murli-work`, a sprint task tracker, integrated across all three frameworks |
| [murli-docs](https://github.com/murli-cli/murli-docs) | Documentation site source — built with Eleventy, deployed to Cloudflare Workers |

## Wire format

The JSON envelope shapes and exit codes are language-agnostic and stable across the 1.x series. Future language implementations (TypeScript, Rust, Python) will share the same wire format.

```json
{ "status": "ok", "schema_version": "1.0", "tool_version": "1.0.2", "message": "...", "result": {} }
{ "status": "error", "code": 5, "error": "not_found", "message": "...", "suggestion": "...", "recoverable": true }
{ "status": "plan", "message": "...", "plan": {} }
```

Exit codes 0–9 distinguish success, user error, tool error, partial success, timeout, not found, permission, conflict, rate-limited, and cancelled.

## Status

| Language | Frameworks | Status |
|---|---|---|
| Go | cobra, urfave/cli v2, urfave/cli v3 | stable v1.0.2 |
| TypeScript | commander, yargs, oclif, citty | planned |
| Rust | clap (derive + builder), argh | planned |
| Python | click, typer, argparse | planned |

## Links

- **Docs** — [murli-cli.github.io](https://murli-cli.github.io) _(or wherever the docs site is hosted)_
- **pkg.go.dev** — [pkg.go.dev/github.com/murli-cli/murli-go](https://pkg.go.dev/github.com/murli-cli/murli-go)
- **Background** — [allankent.com/garden/projects/murli](https://allankent.com/garden/projects/murli)
