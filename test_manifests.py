"""Smoke: manifests are valid JSON with names."""
import os, json, pathlib
os.chdir(pathlib.Path(__file__).parent)


for p in pathlib.Path("plugins").glob("*.json"):
    d = json.loads(p.read_text())
    assert d.get("name"), p
print("bluefin-plugins smoke OK")
