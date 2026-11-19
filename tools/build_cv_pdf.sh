#!/usr/bin/env bash
# Rebuilds assets/cv/CV_Rakesh_K_Sahoo.pdf from the website (cv-generate.html).
# Used by .github/workflows/update-site.yml; also works on your own computer
# if Google Chrome or Chromium is installed:   bash tools/build_cv_pdf.sh
# The PDF is only rewritten when the CV content has actually changed.
set -euo pipefail
cd "$(dirname "$0")/.."

OUT="assets/cv/CV_Rakesh_K_Sahoo.pdf"
STAMP="assets/cv/.cv-content.sha256"
PORT=8765
URL="http://localhost:$PORT/cv-generate.html"

CHROME="$(command -v google-chrome || command -v google-chrome-stable || command -v chromium || command -v chromium-browser || true)"
[ -n "$CHROME" ] || { echo "Chrome/Chromium not found"; exit 1; }
FLAGS=(--headless=new --no-sandbox --disable-gpu --hide-scrollbars --virtual-time-budget=20000)

python3 -m http.server "$PORT" >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true' EXIT
sleep 1

DOM="$(mktemp)"
"$CHROME" "${FLAGS[@]}" --dump-dom "$URL" > "$DOM" 2>/dev/null
NEW="$(python3 - "$DOM" <<'PY'
import hashlib, re, sys
html = open(sys.argv[1], encoding="utf-8").read()
m = re.search(r'<main class="sheet" id="cv">(.*?)</main>', html, re.S)
if not m or 'class="cv-head"' not in m.group(1):
    sys.exit("The CV page did not render; PDF left unchanged.")
print(hashlib.sha256(m.group(1).encode()).hexdigest())
PY
)"
OLD="$(cat "$STAMP" 2>/dev/null || true)"
if [ "$NEW" = "$OLD" ] && [ -f "$OUT" ]; then
  echo "CV content unchanged; PDF left as it is."
  exit 0
fi

mkdir -p assets/cv
"$CHROME" "${FLAGS[@]}" --no-pdf-header-footer --print-to-pdf="$OUT" "$URL" 2>/dev/null
echo "$NEW" > "$STAMP"
echo "CV PDF rebuilt: $OUT"
