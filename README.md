# bluefin-plugins

Gauntlet is my launcher on Bluefin and I wanted a few plugins that weren't available, so I made my own: clipboard manager, homelab SSH launcher, local Ollama prompt runner.

## Install
```bash
bash install.sh
python3 test_manifests.py
```
Manifests land in `~/.local/share/gauntlet/plugins`. The Ollama runner degrades gracefully when offline.

*Put together with some AI help.*
