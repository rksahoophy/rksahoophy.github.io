/* ==========================================================================
   Publication list. To add a paper, copy one block and edit it.
   Synced with Google Scholar on 15 Nov 2026 (duplicates merged).
   type:  "journal" | "proceedings" | "chapter" | "thesis" | "preprint"
   first: true      → you are first author
   corresponding: true → you are corresponding author (adds * after your name)
   Both give the gold "First/Corresponding Author" marker.
   type "forthcoming" + status: under review / in press items, listed separately and not counted.
   cites: Google Scholar citation count (update occasionally)
   ========================================================================== */
window.PUBLICATIONS_UPDATED = "15 November 2026";
window.SCHOLAR = { citations: 354, h: 10, i10: 10 };
window.PUBLICATIONS = [
  { year: 2026, type: "journal", first: true, cites: 0,
    authors: "R. K. Sahoo, V. Harmandaris",
    title: "Hydrogen storage properties and capacity of Li decorated C₁₂B₈ nano-cage: a computational quest",
    venue: "Structural Chemistry", details: "1–14, online first",
    doi: "10.1007/s11224-026-02941-z" },

  { year: 2026, type: "journal", first: false, corresponding: true, cites: 0,
    authors: "K. K. Barik, R. K. Sahoo, S. R. Parida, P. Kour, S. Sahu",
    title: "Reversible hydrogen storage on Li-, Na- and K-decorated C₁₂N₈ nanocages: a combined DFT and ab initio molecular dynamics study",
    venue: "Structural Chemistry", details: "1–19, online first",
    doi: "10.1007/s11224-026-02930-2" },

  { year: 2025, type: "journal", first: false, cites: 3,
    authors: "M. K. Dash, S. Bhowmick, S. Bhattacharyya, R. K. Sahoo, A. Bag, D. K. Das, S. Ouchenane, G. Roymahapatra",
    title: "A quest to high-capacity reversible hydrogen storage on Li-decorated triazole and tetrazole systems: an in-silico approach",
    venue: "ES Chemistry and Sustainability", details: "5, 1934",
    doi: "10.30919/cs1934" },

  { year: 2025, type: "journal", first: false, cites: 13,
    authors: "N. Praveer, R. K. Sahoo, S. Sahu",
    title: "Density functional study of physisorption of H₂ molecules on scandium and yttrium decorated C₂₀ fullerene: prospect for hydrogen storage",
    venue: "Journal of Molecular Modeling", details: "31(1), 31",
    doi: "10.1007/s00894-024-06260-0" },

  { year: 2025, type: "chapter", first: false, cites: 0,
    authors: "D. Nayak, S. Mourya, S. Ansari, R. K. Sahoo, R. B. Choudhary",
    title: "Graphene and its derivatives: synthesis, properties, and applications",
    venue: "Graphene–Metal Oxide Composites: Synthesis, Properties, and Applications (Royal Society of Chemistry)", details: "pp. 80–118",
    doi: "10.1039/9781837673391-00080" },

  { year: 2024, type: "journal", first: false, cites: 8,
    authors: "S. R. Parida, R. K. Sahoo, A. Jaiswal, P. Kour, B. Chakraborty, S. Sahu",
    title: "Room-temperature reversible hydrogen storage in scandium-decorated [6]cycloparaphenylene: computational insights",
    venue: "Energy Storage", details: "6(8), e70093",
    doi: "10.1002/est2.70093" },

  { year: 2024, type: "journal", first: false, corresponding: true, cites: 10,
    authors: "D. Sen, R. K. Sahoo, A. Jaiswal, S. Mohanty, P. Kour, S. Sahu",
    title: "Reversible hydrogen storage in Li-functionalized [1,1,1,1]paracyclophane: a computational insight",
    venue: "International Journal of Hydrogen Energy", details: "53, 308–317",
    doi: "10.1016/j.ijhydene.2023.12.025" },

  { year: 2024, type: "preprint", first: false, cites: 1,
    authors: "A. Jaiswal, R. K. Sahoo, S. Sahu",
    title: "Feasibility of Li decorated Si₆C₁₄ and Si₈C₁₂ nanocages as promising hydrogen storage media: a computational study",
    venue: "arXiv", details: "2407.16420; under revision at Journal of Energy Storage",
    url: "https://arxiv.org/abs/2407.16420" },

  { year: 2023, type: "journal", first: true, cites: 44,
    authors: "R. K. Sahoo, S. Sahu",
    title: "Transition from chemisorption to physisorption of H₂ on Ti functionalized [2,2,2]paracyclophane: a computational search for hydrogen storage",
    venue: "Journal of Energy Storage", details: "63, 106951",
    doi: "10.1016/j.est.2023.106951" },

  { year: 2023, type: "journal", first: true, cites: 9,
    authors: "R. K. Sahoo, S. Sahu",
    title: "Reversible hydrogen storage in Li-functionalized [2,2,2]paracyclophane at cryogenic to room temperatures: a computational quest",
    venue: "Energy Storage", details: "5(8), e474",
    doi: "10.1002/est2.474", arxiv: "2301.03974" },

  { year: 2023, type: "journal", first: false, cites: 13,
    authors: "S. S. Ray, R. K. Sahoo, S. Sahu",
    title: "Reversible hydrogen storage in Ti decorated small boron clusters: insights from molecular dynamics simulations",
    venue: "Journal of Physics and Chemistry of Solids", details: "181, 111496",
    doi: "10.1016/j.jpcs.2023.111496" },

  { year: 2023, type: "thesis", first: true, cites: 0,
    authors: "R. K. Sahoo",
    title: "Computational studies of functionalized fullerenes and cyclophanes for hydrogen storage applications",
    venue: "Ph.D. thesis, Indian Institute of Technology (ISM) Dhanbad", details: "Best Ph.D. Thesis Award" },

  { year: 2022, type: "journal", first: true, cites: 39,
    authors: "R. K. Sahoo, S. Sahu",
    title: "Reversible hydrogen storage capacity of Li and Sc doped novel C₈N₈ cage: insights from density functional theory",
    venue: "International Journal of Energy Research", details: "46(15), 22585–22600",
    doi: "10.1002/er.8562" },

  { year: 2022, type: "journal", first: false, cites: 22,
    authors: "S. S. Ray, R. K. Sahoo, S. Sahu",
    title: "Reversible hydrogen storage capacity of vanadium decorated small boron clusters (BₙV₂, n = 6–10): a dispersion corrected density functional study",
    venue: "Computational and Theoretical Chemistry", details: "1217, 113899",
    doi: "10.1016/j.comptc.2022.113899" },

  { year: 2022, type: "journal", first: true, cites: 19,
    authors: "R. K. Sahoo, P. Kour, S. Sahu",
    title: "Reversible hydrogen storage capacity of Sc and Y functionalized [1,1]paracyclophane: insights from density functional study",
    venue: "International Journal of Hydrogen Energy", details: "47(69), 29881–29895",
    doi: "10.1016/j.ijhydene.2022.06.294", arxiv: "2202.13362" },

  { year: 2022, type: "proceedings", first: true, cites: 2,
    authors: "R. K. Sahoo, R. Khatua, S. Sahu",
    title: "Theoretical study of linear and non-linear optical properties of small CaCₙ (n = 2–7) clusters",
    venue: "Materials Today: Proceedings", details: "66, 3397–3400",
    doi: "10.1016/j.matpr.2022.07.304" },

  { year: 2022, type: "proceedings", first: true, cites: 2,
    authors: "R. K. Sahoo, S. B. Barik, S. Sahu",
    title: "Hydrogen storage capacity of vanadium functionalized [2,2]paracyclophane: a density functional theory study",
    venue: "Materials Today: Proceedings", details: "66, 3360–3363",
    doi: "10.1016/j.matpr.2022.07.125" },

  { year: 2021, type: "journal", first: false, cites: 40,
    authors: "A. Jaiswal, R. K. Sahoo, S. S. Ray, S. Sahu",
    title: "Alkali metals decorated silicon clusters (SiₙMₙ, n = 6, 10; M = Li, Na) as potential hydrogen storage materials: a DFT study",
    venue: "International Journal of Hydrogen Energy", details: "47(3), 1775–1789",
    doi: "10.1016/j.ijhydene.2021.10.228" },

  { year: 2021, type: "journal", first: true, cites: 107,
    authors: "R. K. Sahoo, B. Chakraborty, S. Sahu",
    title: "Reversible hydrogen storage on alkali metal (Li and Na) decorated C₂₀ fullerene: a density functional study",
    venue: "International Journal of Hydrogen Energy", details: "46(80), 40251–40261",
    doi: "10.1016/j.ijhydene.2021.09.219" },

  { year: 2021, type: "journal", first: true, cites: 19,
    authors: "R. K. Sahoo, S. S. Ray, S. Sahu",
    title: "A first principle study of hydrogen storage in titanium-doped small carbon clusters (C₂ₙTiₙ, n = 2–6)",
    venue: "Structural Chemistry", details: "32, 1673–1683",
    doi: "10.1007/s11224-020-01692-9" },

  { year: 2020, type: "proceedings", first: true, cites: 2,
    authors: "R. K. Sahoo, S. S. Ray, S. Sahu",
    title: "A density functional study of hydrogen storage in Li decorated C₂₀ fullerene",
    venue: "AIP Conference Proceedings", details: "2269(1), 030110",
    doi: "10.1063/5.0019528" },

  { year: 2020, type: "proceedings", first: false, cites: 0,
    authors: "S. S. Ray, R. K. Sahoo, S. Sahu",
    title: "A theoretical study of non-linear optical responses and photo-absorption in carbon doped boron cluster",
    venue: "AIP Conference Proceedings", details: "2269(1), 030111",
    doi: "10.1063/5.0019812" },

  { year: 2019, type: "proceedings", first: true, cites: 1,
    authors: "R. K. Sahoo, S. S. Ray, S. Sahu",
    title: "Optical absorption in Al₂N₂ cluster: a time dependent density functional study",
    venue: "AIP Conference Proceedings", details: "2115(1), 030583",
    doi: "10.1063/1.5113422" },
  /* ---- under review / in press (from CV, April 2026) ---- */
  { year: 2026, type: "forthcoming", first: true, status: "In production",
    authors: "R. K. Sahoo, V. Harmandaris",
    title: "Mixed-coordination Cu-based metal–organic frameworks for efficient nitrite adsorption and catalytic reduction" },
  { year: 2026, type: "forthcoming", first: false, status: "In production",
    authors: "D. Nayak, P. Panigrahi, M. K. Mallick, R. K. Sahoo",
    title: "High-performance electrospun PVDF-HFP/PMMA-BN separator with enhanced ion transport and thermal reliability for sodium-ion batteries" },
  { year: 2026, type: "forthcoming", first: false, status: "Under revision, ChemSusChem",
    authors: "D. Nayak, S. Mohanty, R. B. Choudhary, A. Mishra, R. K. Sahoo",
    title: "A comprehensive review of morphological engineering and electrochemical performance of polyaniline–carbon composites for supercapacitors" },
  { year: 2026, type: "forthcoming", first: true, status: "Book chapter, in production",
    authors: "R. K. Sahoo, D. Nayak",
    title: "Theoretical foundations of luminescence: from theory to multiscale simulations",
    venue: "Exploring Luminescent Materials through Artificial Intelligence and Machine Learning" },
  { year: 2025, type: "forthcoming", first: true, status: "Under review",
    authors: "R. K. Sahoo, P. Kour, S. Sahu",
    title: "Cooperative adsorption of methane and hydrogen on transition metal functionalized C₂₄N₂₄ cage: a computational quest for enhanced energy storage applications" },
  { year: 2025, type: "forthcoming", first: false, status: "Submitted",
    authors: "P. Panigrahi, M. K. Mallick, R. K. Sahoo, D. Nayak, S. Mohanty, A. K. Palai",
    title: "Bridging visible to near-infrared light: a DPP-based metal-free sensitizer with enhanced charge transfer for DSSC applications" }
];

/* ---------- renderer (publications page + selected list on home) ---------- */
(function () {
  "use strict";
  var pubs = window.PUBLICATIONS;
  var LABEL = { journal: "Journal article", proceedings: "Conference proceedings", chapter: "Book chapter", thesis: "Ph.D. thesis", preprint: "Preprint", forthcoming: "Forthcoming" };
  function lead(p) { return p.first || p.corresponding; }
  function norm(t) { return String(t).toLowerCase().normalize("NFKD").replace(/[^a-z0-9]/g, ""); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function authors(p) {
    return esc(p.authors).replace(/R\. K\. Sahoo/g, '<span class="me">R. K. Sahoo' + (p.corresponding ? '<sup title="Corresponding author">*</sup>' : "") + '</span>');
  }
  function item(p) {
    var links = [];
    if (p.doi) links.push('<a href="https://doi.org/' + esc(p.doi) + '">DOI ' + esc(p.doi) + '</a>');
    if (p.url) links.push('<a href="' + esc(p.url) + '">' + (p.type === "preprint" ? "Read preprint" : "Link") + '</a>');
    if (p.arxiv) links.push('<a href="https://arxiv.org/abs/' + esc(p.arxiv) + '">arXiv</a>');
    if (p.cites) links.push('<span class="muted">Cited by ' + p.cites + '</span>');
    var tag = (p.type === "journal" || p.type === "forthcoming") ? "" : '<span class="tag">' + LABEL[p.type] + '</span>';
    var venue = p.type === "forthcoming"
      ? '<p class="pub-venue">' + esc(p.status) + (p.venue ? ', <em>' + esc(p.venue) + '</em>' : "") + '</p>'
      : '<p class="pub-venue"><em>' + esc(p.venue) + '</em>' + (p.details ? ', ' + esc(p.details) : "") + ' (' + p.year + ')</p>';
    return '<li class="pub"><span class="pub-mark ' + (lead(p) ? "first" : "co") + '" title="' + (lead(p) ? "First or corresponding author" : "Co-author") + '"></span><div>' +
      '<p class="pub-title">' + esc(p.title) + tag + '</p>' +
      '<p class="pub-authors">' + authors(p) + '</p>' + venue +
      (links.length ? '<div class="pub-links">' + links.join("") + '</div>' : "") +
      '</div></li>';
  }
  function counted(p) { return p.type === "journal" || p.type === "proceedings" || p.type === "chapter"; }

  /* Merge the weekly Google Scholar snapshot (assets/data/scholar.json), if present.
     It updates citation counts and the h-index, and adds papers that are on Scholar
     but not yet in the list above. Manual fields above (DOIs, corresponding author) always win. */
  function merge(snap) {
    if (!snap || !snap.works) return;
    var byTitle = {};
    pubs.forEach(function (p) { byTitle[norm(p.title)] = p; });
    var ignore = (snap.ignore || []).map(norm);
    snap.works.forEach(function (w) {
      var key = norm(w.title), hit = byTitle[key];
      if (!hit) {
      // Scholar sometimes truncates titles: accept a prefix match
        for (var k in byTitle) if (key.length > 30 && k.length > 30 && (k.indexOf(key) === 0 || key.indexOf(k) === 0)) { hit = byTitle[k]; break; }
      }
      if (hit) { if (typeof w.cites === "number" && w.cites > (hit.cites || 0)) hit.cites = w.cites; return; }
      if (ignore.indexOf(key) !== -1 || !w.year) return;
      var p = { year: +w.year, type: /arxiv/i.test(w.venue) ? "preprint" : "journal", first: /^(R ?K|Rakesh)[^,]* Sahoo/i.test(w.authors),
        authors: w.authors, title: w.title, venue: w.venue || "", details: "", cites: w.cites || 0, fromScholar: true };
      pubs.push(p); byTitle[key] = p;
    });
    pubs.sort(function (a, b) { return (a.type === "forthcoming") - (b.type === "forthcoming") || b.year - a.year; });
    if (snap.stats) window.SCHOLAR = snap.stats;
    if (snap.updated) window.PUBLICATIONS_UPDATED = snap.updated;
  }

  function start() {
    var sel = document.getElementById("selected-pubs");
    if (sel) sel.innerHTML = pubs.filter(function (p) { return lead(p) && p.type === "journal"; }).slice(0, 4).map(item).join("");

    document.querySelectorAll("[data-pubcount]").forEach(function (el) {
      var k = el.getAttribute("data-pubcount");
      el.textContent = pubs.filter(function (p) { return counted(p) && (k === "all" || lead(p)); }).length;
    });
    document.querySelectorAll("[data-scholar]").forEach(function (el) { el.textContent = window.SCHOLAR[el.getAttribute("data-scholar")]; });
    document.querySelectorAll("[data-updated]").forEach(function (el) { el.textContent = window.PUBLICATIONS_UPDATED; });

    var list = document.getElementById("pub-list");
    if (!list) return;
    var q = document.getElementById("pub-search");
    var count = document.getElementById("pub-count");
    var state = { type: "all", role: "all", q: "" };

    function render() {
      var words = state.q.toLowerCase().split(/\s+/).filter(Boolean);
      var shown = pubs.filter(function (p) {
        if (state.type !== "all" && p.type !== state.type) return false;
        if (state.role === "first" && !lead(p)) return false;
        var hay = (p.title + " " + p.authors + " " + (p.venue || "") + " " + (p.status || "") + " " + p.year).toLowerCase();
        return words.every(function (w) { return hay.indexOf(w) !== -1; });
      });
      count.textContent = shown.length + " of " + pubs.length + " shown";
      if (!shown.length) {
        list.innerHTML = '<p class="empty">No publications match these filters. Clear the search box or choose “All”.</p>';
        return;
      }
      var html = "", group = null;
      shown.forEach(function (p) {
        var g = p.type === "forthcoming" ? "Under review and in press" : p.year;
        if (g !== group) {
          if (group !== null) html += "</ol>";
          group = g;
          html += '<h2 class="pub-year">' + g + '</h2><ol class="pub-list">';
        }
        html += item(p);
      });
      list.innerHTML = html + "</ol>";
    }

    document.querySelectorAll(".seg").forEach(function (grp) {
      grp.addEventListener("click", function (e) {
        var b = e.target.closest("button");
        if (!b) return;
        grp.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        state[grp.getAttribute("data-key")] = b.getAttribute("data-val");
        render();
      });
    });
    q.addEventListener("input", function () { state.q = q.value; render(); });
    render();
  }

  // forthcoming items go last
  pubs.sort(function (a, b) { return (a.type === "forthcoming") - (b.type === "forthcoming") || b.year - a.year; });
  var done = false;
  function go(snap) { if (done) return; done = true; try { merge(snap); } catch (e) {} start(); }
  if (window.fetch) {
    fetch("assets/data/scholar.json", { cache: "no-cache" }).then(function (r) { return r.ok ? r.json() : null; }).then(go, function () { go(null); });
    setTimeout(function () { go(null); }, 2500);
  } else go(null);
})();
