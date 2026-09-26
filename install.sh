#!/usr/bin/env bash
# Install Gauntlet plugin manifests into ~/.local/share/gauntlet/plugins
set -euo pipefail
DEST="${HOME}/.local/share/gauntlet/plugins"
mkdir -p "${DEST}"
for p in plugins/*.json; do
  name="$(basename "${p}")"
  cp "${p}" "${DEST}/${name}"
  python3 -c "import json,sys; json.load(open('${DEST}/${name}')); print('ok ${name}')"
done
echo "installed -> ${DEST}"
