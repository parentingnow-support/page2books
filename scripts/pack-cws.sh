#!/usr/bin/env bash
# Pack extension files for Chrome Web Store upload.
# Usage: bash scripts/pack-cws.sh
# Includes src/ (feature.js + src/expense/*) — runtime only, no docs/scripts/.git
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

NAME="$(node -p "JSON.parse(require('fs').readFileSync('package.json','utf8')).name" 2>/dev/null || echo extension)"
VERSION="$(node -p "JSON.parse(require('fs').readFileSync('manifest.json','utf8')).version" 2>/dev/null || echo 0)"
OUT_DIR="$ROOT/dist"
UNPACKED="$OUT_DIR/unpacked"
ZIP="$OUT_DIR/${NAME}-cws.zip"

rm -rf "$OUT_DIR"
mkdir -p "$UNPACKED"

# Extension runtime only — no docs, scripts, .cursor, .git
cp manifest.json background.js \
  popup.html popup.css popup.js \
  print.html print.css print.js \
  "$UNPACKED/"
cp -R src icons "$UNPACKED/"

test -f "$UNPACKED/src/expense/csv.js" || { echo "missing src/expense in package"; exit 1; }

(cd "$UNPACKED" && zip -r "$ZIP" .)
echo "Wrote $ZIP (v${VERSION})"
ls -la "$ZIP"
