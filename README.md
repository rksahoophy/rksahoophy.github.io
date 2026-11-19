# rksahoo — personal academic website

A static site (plain HTML, CSS and JavaScript, no build step). It runs on GitHub Pages.

## Where to edit things

Almost everything that changes lives in **`assets/data/`** as small JSON files. You can edit them on GitHub, or in web forms with Pages CMS (see below).

| To change… | Edit |
|---|---|
| Position, affiliation, address, map, e-mails, profile links, About text, "Open to collaboration" | `assets/data/site.json` |
| Home-page News | `assets/data/news.json` |
| Awards and fellowships | `assets/data/awards.json` |
| Talks, posters and schools | `assets/data/talks.json` |
| "Reviewer for" (hidden until it has an entry) | `assets/data/reviewing.json` |
| Gallery photos, captions and descriptions | `assets/data/gallery.json` |
| Collaborators (photo + web page) | `assets/data/collaborators.json` |
| Software (hidden until it has an entry) | `assets/data/software.json` |
| Publications | `assets/js/publications.js` |
| Experience, education, skills | `cv.html` |
| Research themes | `research.html` |
| Phone, personal details, referees (CV only) | `assets/js/cv-details.js` |

### Moving to a new institution (January 2027)

Edit **`assets/data/site.json`** only: `position`, `affiliation`, `affiliationFull`, `city`, `address`, `map` (latitude/longitude), the institute e-mail, and the `about` paragraphs. The home page, footer on every page, contact page, map, search-engine data and generated CV all update from it.

Two things are written as prose in the pages themselves, so update them by hand: the "Current work / Next" labels on `research.html`, and the Experience list on `cv.html`.

### Adding a gallery photo

1. Upload the photo to `assets/img/gallery/` (on GitHub: open the folder → **Add file → Upload files**).
2. Add a block to `assets/data/gallery.json` (newest first):

```json
{
  "image": "assets/img/gallery/2026-conference.jpg",
  "title": "Poster session at ISFOE26, Thessaloniki",
  "date": "July 2026",
  "description": "A few lines about the event. This text appears below the photo and in the enlarged view.",
  "fallback": ""
}
```

Watch the commas: every block except the last ends with `},`. (Pages CMS handles this for you.)

### Collaborator photos

Put a square photo in `assets/img/people/` (e.g. `harmandaris.jpg`) and set `"photo": "assets/img/people/harmandaris.jpg"` for that person. Until then their initials are shown. `"url"` is their web page; leave it `""` for no link.

### Publications

- **Add a paper**: in `assets/js/publications.js`, copy one `{ ... }` block to the top of the list and edit it. Counts on the home page update themselves.
- **Topics**: each paper has `topics: ["hydrogen-storage"]`. The ids are listed under `window.TOPICS` at the bottom of the list. They drive the topic menu on the Publications page and the "N papers on this theme" links on the Research page.
- **First / corresponding author**: set `first: true` and/or `corresponding: true`.
- **Move a paper out of "Under review"**: change `type: "forthcoming"` to `"journal"`, delete the `status` line, and add `venue`, `details` and `doi`.
- Every published paper gets a **Cite** button (APA and BibTeX) automatically.

## Editing in web forms (Pages CMS, optional)

`.pages.yml` sets up [Pages CMS](https://pagescms.org): sign in at app.pagescms.org with your GitHub account, open this repository, and you get forms for site settings, news, awards, talks, reviewing, gallery (with photo upload), collaborators and software. Each save is a normal commit.

## Automation (GitHub Actions)

`.github/workflows/update-site.yml` runs every Monday, after every push, and on demand (**Actions → Update Scholar data and CV PDF → Run workflow**). It:

1. reads your public Google Scholar profile (`tools/sync_scholar.py`) and saves citations, h-index, i10-index and **citations per year** to `assets/data/scholar.json`. This happens on the Monday and manual runs, and also on your first push (while the citation chart has no data yet), so the chart appears as soon as the site is published;
2. rebuilds **`assets/cv/CV_Rakesh_K_Sahoo.pdf`** from the website (`tools/build_cv_pdf.sh`), only if the CV content changed. The "Download CV" buttons always serve this file.

To turn it on: open the **Actions** tab, enable workflows, and run it once. Google sometimes blocks automated requests; that run then keeps the last numbers.

## Generate CV button

`cv-generate.html` builds the CV on the spot from the site, in the style of the LaTeX CV, and opens the print dialog (**Save as PDF**). It reads `cv.html`, `research.html`, `assets/data/*.json`, `publications.js` and `cv-details.js`. Awards mentioning "travel", "grant" or "ITS" are listed under Grants. It only works from the published site or a local server (`python3 -m http.server`), not from a double-clicked file.

## Visitor statistics (optional)

Switched on: `"goatcounter": "rksahoophy"` in `site.json` sends page views to https://rksahoophy.goatcounter.com (sign in there to see them). Visits from your own computer's local preview are not counted. Set it to `""` to switch counting off.

## Dark mode

The site follows the visitor's light/dark system setting until they click the sun/moon button in the header; their choice is then remembered on every page. Colours for both modes are at the top of `assets/css/style.css`.

## Folder layout

```
index.html, research.html, publications.html, cv.html, gallery.html,
resources.html, contact.html, 404.html, cv-generate.html
assets/
  css/style.css        All styling (colours and fonts at the top)
  data/*.json          Editable content (see table above) + scholar.json (automatic)
  js/main.js           Renders the data files, menu, gallery, hero animation
  js/publications.js   Publication list, Cite, topics, citations chart
  js/cv-generate.js    Builds the printable CV
  js/cv-details.js     CV-only details (phone, personal, referees)
  img/                 figures/, photos/, gallery/, people/
  cv/                  CV PDF (rebuilt automatically)
tools/                 sync_scholar.py, build_cv_pdf.sh, make_figures.py, fetch_images.sh
.pages.yml             Pages CMS configuration
```

## Photos still on Google Sites

Gallery photos live in `assets/img/gallery/`. One photo (SimEA get-together, 2025) and your home-page portrait still load from Google Sites as a fallback. Run `bash tools/fetch_images.sh` once and commit `assets/img/photos/`, or replace that gallery entry's `image` with your own copy, so nothing depends on the old site.

## Previewing on your computer

Double-clicking an HTML file shows a yellow notice and leaves the data-driven sections empty; browsers block reading the data files that way. In the site folder run `python3 -m http.server` and open http://localhost:8000.
