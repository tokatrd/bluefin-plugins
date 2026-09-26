"""Smoke: every plugin dir matches the Gauntlet spec (gauntlet.toml + src)."""

import os, json, pathlib, re, tomllib

os.chdir(pathlib.Path(__file__).parent)

ALLOWED_TYPES = {"command", "view", "inline-view", "entrypoint-generator"}
ALLOWED_PERMS = {"clipboard", "network", "filesystem"}
ALLOWED_IMPORTS = {"@project-gauntlet/api", "react"}

plugins = sorted(p for p in pathlib.Path("plugins").iterdir() if p.is_dir())
assert len(plugins) == 3, plugins

for plug in plugins:
    man = tomllib.loads((plug / "gauntlet.toml").read_text())
    assert "entrypoint" in man and isinstance(man["entrypoint"], list), plug
    for ep in man["entrypoint"]:
        for key in ("id", "name", "path", "type"):
            assert key in ep, (plug, ep)
        assert ep["type"] in ALLOWED_TYPES, (plug, ep["type"])
        assert (plug / ep["path"]).exists(), (plug, ep["path"])
    for key in man.get("permissions", {}):
        assert key in ALLOWED_PERMS, (plug, key)
    pkg = json.loads((plug / "package.json").read_text())
    assert "@project-gauntlet/api" in pkg.get("dependencies", {}), plug
    assert (plug / "tsconfig.json").exists(), plug
    for src in (plug / "src").glob("*.tsx"):
        imports = set(re.findall(r'from\s+["\']([^"\']+)["\']', src.read_text()))
        bad = {
            i
            for i in imports
            if not any(i == a or i.startswith(a + "/") for a in ALLOWED_IMPORTS)
            and not i.startswith(".")
        }
        assert not bad, (plug, src, bad)

# old invented JSON manifests must be gone
assert not list(pathlib.Path("plugins").glob("*.json")), "stale manifests"
assert not pathlib.Path("install.sh").exists(), "stale installer"
print("bluefin-plugins smoke OK")
