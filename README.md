# bluefin-plugins

Gauntlet is my launcher on Bluefin and I wanted a few plugins that fit my homelab, so I made my own — real plugins against the documented spec (`gauntlet.toml` + TypeScript source, per [the Gauntlet docs](https://gauntlet.sh/docs/plugin-development/getting-started)).

| Plugin | What it does |
|---|---|
| `plugins/clipboard` | View: read the clipboard into the list, write it back, clear it |
| `plugins/ssh` | Entrypoint generator: one entry per host (from the `hosts` preference) that copies `ssh <host>` to your clipboard |
| `plugins/ollama` | Form: prompt + model fields, asks your local Ollama (`ollama serve` must run), answer shown and copyable |

## Prerequisites

- Gauntlet installed and running, plus Node.js + npm.
- For `ollama`: `ollama serve` with a pulled model.

## Try one

```bash
git clone https://github.com/tokatrd/bluefin-plugins
cd bluefin-plugins/plugins/clipboard
npm install
npm run dev   # compiles, type-checks, installs into Gauntlet; edits hot-reload
```

`npm run build` builds without the dev server. To share a plugin, `npm run publish` (stores it on the `gauntlet/release` branch — plugin IDs are just git URLs).

## Check

```bash
cd ../..
python3 test_manifests.py  # expect: bluefin-plugins smoke OK
```

Validates every `gauntlet.toml` (entrypoint ids/paths/types, permissions) and that sources only import `@project-gauntlet/api` + `react`.

## Notes

- The SSH plugin copies the command instead of opening a terminal — Gauntlet's sandbox has no terminal-open API I could rely on, and copy-paste always works.
- `test_manifests.py` checks structure, not UI behavior — that part needs `npm run dev` with Gauntlet running.

MIT — see LICENSE.

*Put together with some AI help.*
