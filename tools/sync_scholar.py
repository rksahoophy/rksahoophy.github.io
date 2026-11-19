#!/usr/bin/env python3
"""
Fetch the public Google Scholar profile and write assets/data/scholar.json.

The website reads that file on every visit to:
  * update citation counts, h-index and i10-index
  * add any paper that is on Scholar but not yet in assets/js/publications.js

Run by hand:      python3 tools/sync_scholar.py
Run automatically: .github/workflows/update-site.yml (weekly on GitHub)

It also saves citations per year ("perYear") for the chart on the Publications page.

Google Scholar has no official API and sometimes blocks automated requests with a
CAPTCHA. When that happens this script changes nothing and exits quietly, so the
site keeps the last good numbers.
"""
import json, os, re, sys, time, datetime, urllib.request
from html.parser import HTMLParser

USER = "6tgTCVIAAAAJ"
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "data", "scholar.json")
URL = ("https://scholar.google.com/citations?user={u}&hl=en&cstart={s}&pagesize=100"
       "&view_op=list_works&sortby=pubdate")
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")


class Profile(HTMLParser):
    """Pulls the stats table and publication rows out of the profile HTML."""

    def __init__(self):
        super().__init__()
        self.stats, self.works = [], []
        self.hist_years, self.hist_bars = [], []   # citations-per-year histogram
        self._row = None
        self._field = None   # which text we are collecting
        self._gray = 0
        self._buf = ""

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        cls = a.get("class", "") or ""
        if tag == "span" and "gsc_g_t" in cls:
            self._field, self._buf = "hyear", ""
            return
        if tag == "a" and "gsc_g_a" in cls:
            m = re.search(r"z-index:\s*(\d+)", a.get("style", "") or "")
            self._zi = int(m.group(1)) if m else None
            return
        if tag == "span" and "gsc_g_al" in cls:
            self._field, self._buf = "hcount", ""
            return
        if tag == "td" and "gsc_rsb_std" in cls:
            self._field, self._buf = "stat", ""
        elif tag == "tr" and "gsc_a_tr" in cls:
            self._row, self._gray = {"title": "", "authors": "", "venue": "", "cites": 0, "year": ""}, 0
        elif self._row is not None:
            if tag == "a" and "gsc_a_at" in cls:
                self._field, self._buf = "title", ""
            elif tag == "div" and "gs_gray" in cls:
                self._field, self._buf = ("authors" if self._gray == 0 else "venue"), ""
                self._gray += 1
            elif tag == "a" and "gsc_a_ac" in cls:
                self._field, self._buf = "cites", ""
            elif tag == "span" and ("gsc_a_h" in cls or "gsc_a_hc" in cls):
                self._field, self._buf = "year", ""

    def handle_data(self, data):
        if self._field:
            self._buf += data

    def handle_endtag(self, tag):
        if self._field == "hyear" and tag == "span":
            if self._buf.strip().isdigit():
                self.hist_years.append(int(self._buf.strip()))
            self._field = None
            return
        if self._field == "hcount" and tag == "span":
            if self._buf.strip().isdigit():
                self.hist_bars.append((getattr(self, "_zi", None), int(self._buf.strip())))
            self._field = None
            return
        if self._field == "stat" and tag == "td":
            self.stats.append(self._buf.strip())
            self._field = None
        elif self._field in ("title", "cites") and tag == "a":
            self._set()
        elif self._field in ("authors", "venue") and tag == "div":
            self._set()
        elif self._field == "year" and tag == "span":
            self._set()
        elif tag == "tr" and self._row is not None:
            if self._row["title"]:
                self.works.append(self._row)
            self._row = None

    def _set(self):
        v = re.sub(r"\s+", " ", self._buf).strip()
        if self._field == "venue":
            v = re.sub(r",\s*\d{4}$", "", v)
        if self._field == "cites":
            v = int(v) if v.isdigit() else 0
        self._row[self._field] = v
        self._field = None


def histogram(years, bars):
    """Map Scholar's bar chart to {year: citations}. Each bar's z-index counts
    from the right-hand (latest) year, so years with no bar stay at 0."""
    if not years:
        return {}
    counts = [0] * len(years)
    if bars and all(z for z, _ in bars):
        for z, c in bars:
            if 1 <= z <= len(years):
                counts[-z] = c
    elif len(bars) == len(years):
        counts = [c for _, c in bars]
    else:
        return {}
    return {str(y): c for y, c in zip(years, counts)}


def fetch(start):
    req = urllib.request.Request(URL.format(u=USER, s=start), headers={"User-Agent": UA, "Accept-Language": "en"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")


def main():
    works, stats, per_year = [], [], {}
    for start in range(0, 1000, 100):
        try:
            html = fetch(start)
        except Exception as e:
            print(f"Could not reach Google Scholar ({e}). Keeping the previous data.")
            return 0
        if "gsc_a_tr" not in html and start == 0:
            print("Google Scholar returned a page without the publication table (probably a CAPTCHA). Keeping the previous data.")
            return 0
        p = Profile()
        p.feed(html)
        if start == 0:
            stats = p.stats
            per_year = histogram(p.hist_years, p.hist_bars)
        works += p.works
        if len(p.works) < 100:
            break
        time.sleep(3)

    if len(stats) < 6 or not works:
        print("Unexpected page layout. Keeping the previous data.")
        return 0

    old = {}
    if os.path.exists(OUT):
        with open(OUT, encoding="utf-8") as f:
            old = json.load(f)

    snap = {
        "source": f"https://scholar.google.com/citations?user={USER}",
        "updated": datetime.date.today().strftime("%-d %B %Y"),
        "stats": {"citations": int(stats[0]), "h": int(stats[2]), "i10": int(stats[4])},
        "perYear": per_year or old.get("perYear", {}),
        # Titles listed here are never added to the site (e.g. Scholar duplicates).
        "ignore": old.get("ignore", []),
        "works": works,
    }
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(snap, f, ensure_ascii=False, indent=1)
    print(f"Saved {len(works)} works; citations {snap['stats']['citations']}, h-index {snap['stats']['h']}.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
