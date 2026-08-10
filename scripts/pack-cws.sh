#!/usr/bin/env bash
# Pack extension files for Chrome Web Store upload.
# Usage: bash scripts/pack-cws.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

NAME="$(node -p "JSON.parse(require('fs').readFileSync('package.json','utf8')).name" 2>/dev/null || echo extension)"
OUT_DIR="$ROOT/dist"
UNPACKED="$OUT_DIR/unpacked"
ZIP="$OUT_DIR/${NAME}-cws.zip"

rm -rf "$OUT_DIR"
mkdir -p "$UNPACKED"

# Extension runtime only — no docs, scripts, .cursor, .git
cp manifest.json background.js popup.html popup.css popup.js "$UNPACKED/"
cp -R src icons "$UNPACKED/"

(cd "$UNPACKED" && zip -r "$ZIP" .)
echo "Wrote $ZIP"
ls -la "$ZIP"
