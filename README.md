# rksahoo — personal academic website

A static site (plain HTML, CSS and JavaScript, no build step). It runs on GitHub Pages, Netlify, or any web host.

## Folder layout

```
index.html            Home: intro, about, news, research, selected papers
research.html         Research themes with figures, interests, collaborators
publications.html     Searchable, filterable publication list
cv.html               Experience, education, awards, skills, conferences
gallery.html          Photo gallery with click-to-enlarge
resources.html        Learning links (DFT, codes, Python)
contact.html          Email, address, profiles, map
404.html              Not-found page
favicon.svg
assets/
  css/style.css       All styling (colours and fonts are at the top)
  js/main.js          Menu, email protection, image fallback, gallery, hero animation
  js/publications.js  ← YOUR PUBLICATION LIST lives here
  img/figures/        Original SVG research figures (editable in Inkscape/Illustrator)
  img/photos/         Your photos (run tools/fetch_images.sh to fill this)
  img/og-image.png    Preview image shown when the site is shared on social media
  cv/                 Put CV_Rakesh_K_Sahoo.pdf here
tools/
  fetch_images.sh     Downloads your existing photos from the Google Site
  make_figures.py     Regenerates the SVG figures and OG image (Python 3)
```

## Before you publish

1. **Photos**: from the site folder, run `bash tools/fetch_images.sh`. Until you do, pages load the photos directly from Google Sites. Those links can stop working, so keep local copies.
2. **CV**: copy your PDF to `assets/cv/CV_Rakesh_K_Sahoo.pdf`.
3. **Check the facts** marked in the notes I sent with this site (journal volumes, co-author lists, IWAM year).

## Common updates

- **Add a paper**: open `assets/js/publications.js`, copy one `{ ... }` block to the top of the list, and edit it. Counts on the home page update themselves.
- **Mark yourself as first or corresponding author**: in that paper's block, set `first: true` and/or add `corresponding: true`. Either one gives the gold marker and puts the paper under the "First/Corresponding Author" filter; `corresponding: true` also adds * after your name.
- **Move a paper out of "Under review"**: change `type: "forthcoming"` to `"journal"`, delete the `status` line, and add `venue`, `details` and `doi`.

## Automatic Google Scholar sync

`.github/workflows/sync-scholar.yml` runs every Monday on GitHub. It runs `tools/sync_scholar.py`, which reads your public Scholar profile and saves `assets/data/scholar.json`. The site then:
- shows the latest citations, h-index and i10-index
- updates each paper's "Cited by" count
- adds any new Scholar paper that isn't in `publications.js` yet, using Scholar's basic details

New papers appear without DOI links or the corresponding-author marker, so add a proper entry to `publications.js` when you can. To stop a Scholar entry from appearing, such as a duplicate, add its exact Scholar title to the `ignore` list in `scholar.json`.

To turn it on: push the site to GitHub, open the **Actions** tab and enable workflows, then select **Sync Google Scholar → Run workflow** once to test it. Google sometimes blocks automated requests. When that happens, the run changes nothing and the site keeps the last numbers. You can also run `python3 tools/sync_scholar.py` on your own computer and push the result.
- **Add news**: in `index.html`, copy one `<li>` inside the News `<ol class="timeline">`.
- **Add a gallery photo**: put the image in `assets/img/photos/` and copy one `<figure>` block in `gallery.html`.
- **Change colours or fonts**: edit the variables at the top of `assets/css/style.css`.

## Publish on GitHub Pages (rksahoo.github.io)

1. Put these files at the root of the `rksahoo.github.io` repository (replace the old ones).
2. Commit and push. Settings → Pages → deploy from the `main` branch, root folder.
3. To keep the Google Sites address useful, replace its home page with one line linking to the new site.

If you host somewhere other than rksahoo.github.io, change `SITE` in the `<head>` meta tags (search for `rksahoo.github.io`).
