/* ==========================================================================
   Publication list. To add a paper, copy one block and edit it.
   Synced with Google Scholar on 15 Nov 2026 (duplicates merged).
   type:  "journal" | "proceedings" | "chapter" | "thesis" | "preprint"
   first: true      → you are first author
   corresponding: true → you are corresponding author (adds * after your name)
   Both give the gold "First/Corresponding Author" marker.
   type "forthcoming" + status: under review / in press items, listed separately and not counted.
   cites: Google Scholar citation count (update occasionally)
   topics: one or more of the TOPICS ids below; links papers to research themes
           and drives the topic filter on the Publications page
   ========================================================================== */
window.PUBLICATIONS_UPDATED = "15 November 2026";
window.SCHOLAR = { citations: 354, h: 10, i10: 10 };
window.PUBLICATIONS = [
  { topics: ["hydrogen-storage"], year: 2026, type: "journal", first: true, cites: 0,
    authors: "R. K. Sahoo, V. Harmandaris",
    title: "Hydrogen storage properties and capacity of Li decorated C₁₂B₈ nano-cage: a computational quest",
    venue: "Structural Chemistry", details: "1–14, online first",
    doi: "10.1007/s11224-026-02941-z" },

  { topics: ["hydrogen-storage"], year: 2026, type: "journal", first: false, corresponding: true, cites: 0,
    authors: "K. K. Barik, R. K. Sahoo, S. R. Parida, P. Kour, S. Sahu",
    title: "Reversible hydrogen storage on Li-, Na- and K-decorated C₁₂N₈ nanocages: a combined DFT and ab initio molecular dynamics study",
    venue: "Structural Chemistry", details: "1–19, online first",
    doi: "10.1007/s11224-026-02930-2" },

  { topics: ["hydrogen-storage"], year: 2025, type: "journal", first: false, cites: 3,
    authors: "M. K. Dash, S. Bhowmick, S. Bhattacharyya, R. K. Sahoo, A. Bag, D. K. Das, S. Ouchenane, G. Roymahapatra",
    title: "A quest to high-capacity reversible hydrogen storage on Li-decorated triazole and tetrazole systems: an in-silico approach",
    venue: "ES Chemistry and Sustainability", details: "5, 1934",
    doi: "10.30919/cs1934" },

  { topics: ["hydrogen-storage"], year: 2025, type: "journal", first: false, cites: 13,
    authors: "N. Praveer, R. K. Sahoo, S. Sahu",
    title: "Density functional study of physisorption of H₂ molecules on scandium and yttrium decorated C₂₀ fullerene: prospect for hydrogen storage",
    venue: "Journal of Molecular Modeling", details: "31(1), 31",
    doi: "10.1007/s00894-024-06260-0" },

  { topics: ["materials"], year: 2025, type: "chapter", first: false, cites: 0,
    authors: "D. Nayak, S. Mourya, S. Ansari, R. K. Sahoo, R. B. Choudhary",
    title: "Graphene and its derivatives: synthesis, properties, and applications",
    venue: "Graphene–Metal Oxide Composites: Synthesis, Properties, and Applications (Royal Society of Chemistry)", details: "pp. 80–118",
    doi: "10.1039/9781837673391-00080" },

  { topics: ["hydrogen-storage"], year: 2024, type: "journal", first: false, cites: 8,
    authors: "S. R. Parida, R. K. Sahoo, A. Jaiswal, P. Kour, B. Chakraborty, S. Sahu",
    title: "Room-temperature reversible hydrogen storage in scandium-decorated [6]cycloparaphenylene: computational insights",
    venue: "Energy Storage", details: "6(8), e70093",
    doi: "10.1002/est2.70093" },

  { topics: ["hydrogen-storage"], year: 2024, type: "journal", first: false, corresponding: true, cites: 10,
    authors: "D. Sen, R. K. Sahoo, A. Jaiswal, S. Mohanty, P. Kour, S. Sahu",
    title: "Reversible hydrogen storage in Li-functionalized [1,1,1,1]paracyclophane: a computational insight",
    venue: "International Journal of Hydrogen Energy", details: "53, 308–317",
    doi: "10.1016/j.ijhydene.2023.12.025" },

  { topics: ["hydrogen-storage"], year: 2024, type: "preprint", first: false, cites: 1,
    authors: "A. Jaiswal, R. K. Sahoo, S. Sahu",
    title: "Feasibility of Li decorated Si₆C₁₄ and Si₈C₁₂ nanocages as promising hydrogen storage media: a computational study",
    venue: "arXiv", details: "2407.16420; under revision at Journal of Energy Storage",
    url: "https://arxiv.org/abs/2407.16420" },

  { topics: ["hydrogen-storage"], year: 2023, type: "journal", first: true, cites: 44,
    authors: "R. K. Sahoo, S. Sahu",
    title: "Transition from chemisorption to physisorption of H₂ on Ti functionalized [2,2,2]paracyclophane: a computational search for hydrogen storage",
    venue: "Journal of Energy Storage", details: "63, 106951",
    doi: "10.1016/j.est.2023.106951" },

  { topics: ["hydrogen-storage"], year: 2023, type: "journal", first: true, cites: 9,
    authors: "R. K. Sahoo, S. Sahu",
    title: "Reversible hydrogen storage in Li-functionalized [2,2,2]paracyclophane at cryogenic to room temperatures: a computational quest",
    venue: "Energy Storage", details: "5(8), e474",
    doi: "10.1002/est2.474", arxiv: "2301.03974" },

  { topics: ["hydrogen-storage"], year: 2023, type: "journal", first: false, cites: 13,
    authors: "S. S. Ray, R. K. Sahoo, S. Sahu",
    title: "Reversible hydrogen storage in Ti decorated small boron clusters: insights from molecular dynamics simulations",
    venue: "Journal of Physics and Chemistry of Solids", details: "181, 111496",
    doi: "10.1016/j.jpcs.2023.111496" },

  { topics: ["hydrogen-storage"], year: 2023, type: "thesis", first: true, cites: 0,
    authors: "R. K. Sahoo",
    title: "Computational studies of functionalized fullerenes and cyclophanes for hydrogen storage applications",
    venue: "Ph.D. thesis, Indian Institute of Technology (ISM) Dhanbad", details: "Best Ph.D. Thesis Award" },

  { topics: ["hydrogen-storage"], year: 2022, type: "journal", first: true, cites: 39,
    authors: "R. K. Sahoo, S. Sahu",
    title: "Reversible hydrogen storage capacity of Li and Sc doped novel C₈N₈ cage: insights from density functional theory",
    venue: "International Journal of Energy Research", details: "46(15), 22585–22600",
    doi: "10.1002/er.8562" },

  { topics: ["hydrogen-storage"], year: 2022, type: "journal", first: false, cites: 22,
    authors: "S. S. Ray, R. K. Sahoo, S. Sahu",
    title: "Reversible hydrogen storage capacity of vanadium decorated small boron clusters (BₙV₂, n = 6–10): a dispersion corrected density functional study",
    venue: "Computational and Theoretical Chemistry", details: "1217, 113899",
    doi: "10.1016/j.comptc.2022.113899" },

  { topics: ["hydrogen-storage"], year: 2022, type: "journal", first: true, cites: 19,
    authors: "R. K. Sahoo, P. Kour, S. Sahu",
    title: "Reversible hydrogen storage capacity of Sc and Y functionalized [1,1]paracyclophane: insights from density functional study",
    venue: "International Journal of Hydrogen Energy", details: "47(69), 29881–29895",
    doi: "10.1016/j.ijhydene.2022.06.294", arxiv: "2202.13362" },

  { topics: ["optoelectronics"], year: 2022, type: "proceedings", first: true, cites: 2,
    authors: "R. K. Sahoo, R. Khatua, S. Sahu",
    title: "Theoretical study of linear and non-linear optical properties of small CaCₙ (n = 2–7) clusters",
    venue: "Materials Today: Proceedings", details: "66, 3397–3400",
    doi: "10.1016/j.matpr.2022.07.304" },

  { topics: ["hydrogen-storage"], year: 2022, type: "proceedings", first: true, cites: 2,
    authors: "R. K. Sahoo, S. B. Barik, S. Sahu",
    title: "Hydrogen storage capacity of vanadium functionalized [2,2]paracyclophane: a density functional theory study",
    venue: "Materials Today: Proceedings", details: "66, 3360–3363",
    doi: "10.1016/j.matpr.2022.07.125" },

  { topics: ["hydrogen-storage"], year: 2021, type: "journal", first: false, cites: 40,
    authors: "A. Jaiswal, R. K. Sahoo, S. S. Ray, S. Sahu",
    title: "Alkali metals decorated silicon clusters (SiₙMₙ, n = 6, 10; M = Li, Na) as potential hydrogen storage materials: a DFT study",
    venue: "International Journal of Hydrogen Energy", details: "47(3), 1775–1789",
    doi: "10.1016/j.ijhydene.2021.10.228" },

  { topics: ["hydrogen-storage"], year: 2021, type: "journal", first: true, cites: 107,
    authors: "R. K. Sahoo, B. Chakraborty, S. Sahu",
    title: "Reversible hydrogen storage on alkali metal (Li and Na) decorated C₂₀ fullerene: a density functional study",
    venue: "International Journal of Hydrogen Energy", details: "46(80), 40251–40261",
    doi: "10.1016/j.ijhydene.2021.09.219" },

  { topics: ["hydrogen-storage"], year: 2021, type: "journal", first: true, cites: 19,
    authors: "R. K. Sahoo, S. S. Ray, S. Sahu",
    title: "A first principle study of hydrogen storage in titanium-doped small carbon clusters (C₂ₙTiₙ, n = 2–6)",
    venue: "Structural Chemistry", details: "32, 1673–1683",
    doi: "10.1007/s11224-020-01692-9" },

  { topics: ["hydrogen-storage"], year: 2020, type: "proceedings", first: true, cites: 2,
    authors: "R. K. Sahoo, S. S. Ray, S. Sahu",
    title: "A density functional study of hydrogen storage in Li decorated C₂₀ fullerene",
    venue: "AIP Conference Proceedings", details: "2269(1), 030110",
    doi: "10.1063/5.0019528" },

  { topics: ["optoelectronics"], year: 2020, type: "proceedings", first: false, cites: 0,
    authors: "S. S. Ray, R. K. Sahoo, S. Sahu",
    title: "A theoretical study of non-linear optical responses and photo-absorption in carbon doped boron cluster",
    venue: "AIP Conference Proceedings", details: "2269(1), 030111",
    doi: "10.1063/5.0019812" },

  { topics: ["optoelectronics"], year: 2019, type: "proceedings", first: true, cites: 1,
    authors: "R. K. Sahoo, S. S. Ray, S. Sahu",
    title: "Optical absorption in Al₂N₂ cluster: a time dependent density functional study",
    venue: "AIP Conference Proceedings", details: "2115(1), 030583",
    doi: "10.1063/1.5113422" },
  /* ---- under review / in press (from CV, April 2026) ---- */
  { topics: ["catalysis"], year: 2026, type: "forthcoming", first: true, status: "In production",
    authors: "R. K. Sahoo, V. Harmandaris",
    title: "Mixed-coordination Cu-based metal–organic frameworks for efficient nitrite adsorption and catalytic reduction" },
  { topics: ["batteries"], year: 2026, type: "forthcoming", first: false, status: "In production",
    authors: "D. Nayak, P. Panigrahi, M. K. Mallick, R. K. Sahoo",
    title: "High-performance electrospun PVDF-HFP/PMMA-BN separator with enhanced ion transport and thermal reliability for sodium-ion batteries" },
  { topics: ["batteries"], year: 2026, type: "forthcoming", first: false, status: "Under revision, ChemSusChem",
    authors: "D. Nayak, S. Mohanty, R. B. Choudhary, A. Mishra, R. K. Sahoo",
    title: "A comprehensive review of morphological engineering and electrochemical performance of polyaniline–carbon composites for supercapacitors" },
  { topics: ["optoelectronics"], year: 2026, type: "forthcoming", first: true, status: "Book chapter, in production",
    authors: "R. K. Sahoo, D. Nayak",
    title: "Theoretical foundations of luminescence: from theory to multiscale simulations",
    venue: "Exploring Luminescent Materials through Artificial Intelligence and Machine Learning" },
  { topics: ["hydrogen-storage"], year: 2025, type: "forthcoming", first: true, status: "Under review",
    authors: "R. K. Sahoo, P. Kour, S. Sahu",
    title: "Cooperative adsorption of methane and hydrogen on transition metal functionalized C₂₄N₂₄ cage: a computational quest for enhanced energy storage applications" },
  { topics: ["optoelectronics"], year: 2025, type: "forthcoming", first: false, status: "Submitted",
    authors: "P. Panigrahi, M. K. Mallick, R. K. Sahoo, D. Nayak, S. Mohanty, A. K. Palai",
    title: "Bridging visible to near-infrared light: a DPP-based metal-free sensitizer with enhanced charge transfer for DSSC applications" }
];

/* ---------- topics: ids used in "topics" above ---------- */
window.TOPICS = {
  "hydrogen-storage": "Hydrogen storage",
  "charge-transport": "Charge transport",
  "natural-hydrogen": "Natural hydrogen",
  "batteries": "Batteries and supercapacitors",
  "solar-thermal": "Solar thermal fuels",
  "optoelectronics": "Optical and optoelectronic properties",
  "catalysis": "Catalysis",
  "materials": "Carbon nanomaterials"
};

/* ---------- renderer (publications page, home page, research page) ---------- */
(function () {
  "use strict";
  var pubs = window.PUBLICATIONS, TOPICS = window.TOPICS;
  var LABEL = { journal: "Journal article", proceedings: "Conference proceedings", chapter: "Book chapter", thesis: "Ph.D. thesis", preprint: "Preprint", forthcoming: "Forthcoming" };
  function lead(p) { return p.first || p.corresponding; }
  function norm(t) { return String(t).toLowerCase().normalize("NFKD").replace(/[^a-z0-9]/g, ""); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function authors(p) {
    return esc(p.authors).replace(/R\. K\. Sahoo/g, '<span class="me">R. K. Sahoo' + (p.corresponding ? '<sup title="Corresponding author">*</sup>' : "") + '</span>');
  }

  /* ---- citation formats (also used by cv-generate.js) ---- */
  function splitNames(list) {
    var etal = /(\.\.\.|…)\s*$/.test(list);
    var names = list.replace(/(\.\.\.|…)\s*$/, "").split(/\s*,\s*|\s+&\s+|\s+and\s+/).filter(Boolean).map(function (n) {
      var t = n.trim().split(/\s+/), last = t.pop();
      var ini = t.map(function (w) {
        w = w.replace(/\./g, "");
        return /^[A-Z]{2,3}$/.test(w) ? w.split("").map(function (c) { return c + "."; }).join(" ") : w.charAt(0) + ".";
      }).join(" ");
      return { last: last, ini: ini, me: /^sahoo$/i.test(last) && /^R/.test(ini) };
    });
    return { names: names, etal: etal };
  }
  // APA author list. html=true returns markup with your name in bold (and * if corresponding)
  function apaAuthors(list, corresponding, html) {
    var s = splitNames(list);
    var fmt = s.names.map(function (n) {
      if (n.me && html) return '<span class="me">Sahoo, Rakesh K.' + (corresponding ? "*" : "") + "</span>";
      var t = n.last + (n.ini ? ", " + n.ini : "");
      return html ? esc(t) : t;
    });
    var amp = html ? "&amp;" : "&";
    if (s.etal) return fmt.join(", ") + ", et al.";
    if (fmt.length < 2) return fmt.join("");
    return fmt.slice(0, -1).join(", ") + ", " + amp + " " + fmt[fmt.length - 1];
  }
  var SUB = { "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9", "ₙ": "n" };
  function plainTitle(t) { return t.replace(/[₀-₉ₙ]/g, function (c) { return SUB[c]; }); }
  function texTitle(t) { return t.replace(/[₀-₉ₙ]+/g, function (run) { return "$_{" + run.replace(/./g, function (c) { return SUB[c]; }) + "}$"; }); }
  function endDot(s) { s = s.trim(); return /[.!?]$/.test(s) ? s : s + "."; }
  function apaText(p) {
    var s = apaAuthors(p.authors, false, false) + " (" + p.year + "). " + endDot(plainTitle(p.title)) + " ";
    if (p.type === "chapter") s += "In " + p.venue + (p.details ? " (" + p.details + ")" : "") + ".";
    else if (p.venue) s += p.venue + (p.details ? ", " + p.details : "") + ".";
    if (p.doi) s += " https://doi.org/" + p.doi;
    else if (p.url) s += " " + p.url;
    return s;
  }
  function bibtex(p) {
    var s = splitNames(p.authors);
    var first = s.names[0] ? s.names[0].last.replace(/[^A-Za-z]/g, "") : "Sahoo";
    var word = (plainTitle(p.title).toLowerCase().match(/[a-z]{4,}/) || ["paper"])[0];
    var kind = { journal: "article", proceedings: "inproceedings", chapter: "incollection", thesis: "phdthesis", preprint: "misc" }[p.type] || "misc";
    var f = [["author", s.names.map(function (n) { return n.last + (n.ini ? ", " + n.ini : ""); }).join(" and ") + (s.etal ? " and others" : "")],
             ["title", "{" + texTitle(p.title) + "}"]];
    if (kind === "article") f.push(["journal", p.venue]);
    if (kind === "inproceedings" || kind === "incollection") f.push(["booktitle", p.venue]);
    if (kind === "phdthesis") f.push(["school", p.venue.replace(/^Ph\.D\. thesis,\s*/i, "")]);
    var m = /^(\d+)(?:\((\d+)\))?,\s*(.+)$/.exec(p.details || "");
    if (m && kind !== "misc") { f.push(["volume", m[1]]); if (m[2]) f.push(["number", m[2]]); f.push(["pages", m[3].replace(/–/g, "--")]); }
    else if (p.details && kind !== "phdthesis") {
      var pg = /^(pp\.\s*)?\d+\s*[–-]\s*\d+$/.test(p.details);
      f.push([pg && kind !== "misc" ? "pages" : "note", p.details.replace(/^pp\.\s*/, "").replace(/–/g, pg ? "--" : "–")]);
    }
    f.push(["year", String(p.year)]);
    if (p.doi) f.push(["doi", p.doi]);
    if (p.url) f.push(["url", p.url]);
    return "@" + kind + "{" + first + p.year + word + ",\n" + f.map(function (x) { return "  " + x[0] + " = {" + x[1] + "}"; }).join(",\n") + "\n}";
  }
  window.PUB_TOOLS = { apaAuthors: apaAuthors, apaText: apaText, bibtex: bibtex, plainTitle: plainTitle };

  function item(p) {
    var links = [];
    if (p.doi) links.push('<a href="https://doi.org/' + esc(p.doi) + '">DOI ' + esc(p.doi) + '</a>');
    if (p.url) links.push('<a href="' + esc(p.url) + '">' + (p.type === "preprint" ? "Read preprint" : "Link") + '</a>');
    if (p.arxiv) links.push('<a href="https://arxiv.org/abs/' + esc(p.arxiv) + '">arXiv</a>');
    if (p.type !== "forthcoming") links.push('<button type="button" class="cite-btn" data-cite="' + pubs.indexOf(p) + '" aria-expanded="false">Cite</button>');
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
  function hasTopic(p, t) { return (p.topics || []).indexOf(t) !== -1; }

  /* ---- Cite panel (one handler for every list on the page) ---- */
  function copy(text, btn) {
    function done() { var o = btn.textContent; btn.textContent = "Copied"; setTimeout(function () { btn.textContent = o; }, 1500); }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); done(); } catch (e) {} ta.remove();
    }
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".cite-btn");
    if (b) {
      var host = b.closest(".pub > div"), open = host.querySelector(".cite-box");
      if (open) { open.remove(); b.setAttribute("aria-expanded", "false"); return; }
      var p = pubs[+b.getAttribute("data-cite")];
      var box = document.createElement("div");
      box.className = "cite-box";
      box.innerHTML = '<div class="cite-row"><span class="cite-label">APA</span><button type="button" class="cite-copy" data-fmt="apa">Copy</button></div><p class="cite-apa"></p>' +
        '<div class="cite-row"><span class="cite-label">BibTeX</span><button type="button" class="cite-copy" data-fmt="bib">Copy</button></div><pre class="cite-bib"></pre>';
      box.querySelector(".cite-apa").textContent = apaText(p);
      box.querySelector(".cite-bib").textContent = bibtex(p);
      box._pub = p;
      host.appendChild(box);
      b.setAttribute("aria-expanded", "true");
      return;
    }
    var c = e.target.closest && e.target.closest(".cite-copy");
    if (c) {
      var bx = c.closest(".cite-box");
      copy(c.getAttribute("data-fmt") === "apa" ? apaText(bx._pub) : bibtex(bx._pub), c);
    }
  });

  /* ---- citations per year (from the weekly Scholar sync) ---- */
  function chart(fig, perYear) {
    var years = Object.keys(perYear || {}).map(Number).sort(function (a, b) { return a - b; });
    if (years.length < 2) return;
    var vals = years.map(function (y) { return +perYear[y] || 0; });
    var max = Math.max.apply(null, vals) || 1, raw = max / 4, mag = Math.pow(10, Math.floor(Math.log10(raw))), nrm = raw / mag;
    var step = (nrm <= 1 ? 1 : nrm <= 2 ? 2 : nrm <= 5 ? 5 : 10) * mag;
    step = Math.max(1, step);
    var top = Math.ceil(max / step) * step;
    var W = 640, H = 200, L = 34, R = 8, T = 12, B = 26, pw = W - L - R, ph = H - T - B;
    var slot = pw / years.length, bw = Math.min(28, slot * .56);
    var y = function (v) { return T + ph - v / top * ph; };
    var g = "";
    for (var v = 0; v <= top + 1e-9; v += step) {
      g += '<line class="cc-grid" x1="' + L + '" x2="' + (W - R) + '" y1="' + y(v).toFixed(1) + '" y2="' + y(v).toFixed(1) + '"/>' +
        '<text class="cc-axis" x="' + (L - 6) + '" y="' + (y(v) + 4).toFixed(1) + '" text-anchor="end">' + v + "</text>";
    }
    var peak = vals.indexOf(max);
    years.forEach(function (yr, i) {
      var x = L + slot * i + (slot - bw) / 2, h = Math.max(0, y(0) - y(vals[i])), r = Math.min(4, h, bw / 2);
      var top0 = y(vals[i]);
      var d = h > 0 ? "M" + x + "," + y(0) + "V" + (top0 + r) + "Q" + x + "," + top0 + " " + (x + r) + "," + top0 + "H" + (x + bw - r) + "Q" + (x + bw) + "," + top0 + " " + (x + bw) + "," + (top0 + r) + "V" + y(0) + "Z" : "";
      g += '<g class="cc-bar" data-tip="' + yr + ": " + vals[i] + ' citations"><rect class="cc-hit" x="' + (L + slot * i) + '" y="' + T + '" width="' + slot + '" height="' + (ph + B) + '"/>' +
        (d ? '<path d="' + d + '"/>' : "") + "</g>";
      if (years.length <= 14 || i % 2 === 0 || i === years.length - 1)
        g += '<text class="cc-axis" x="' + (L + slot * i + slot / 2).toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle">' + yr + "</text>";
      if (i === peak || i === years.length - 1)
        g += '<text class="cc-label" x="' + (x + bw / 2).toFixed(1) + '" y="' + (top0 - 5).toFixed(1) + '" text-anchor="middle">' + vals[i] + "</text>";
    });
    fig.innerHTML = '<figcaption>Citations per year <span class="muted">(Google Scholar)</span></figcaption>' +
      '<div class="cc-wrap"><svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Bar chart of citations per year">' + g + '</svg><div class="cc-tip" hidden></div></div>' +
      '<table class="sr"><caption>Citations per year</caption><tr><th>Year</th><th>Citations</th></tr>' +
      years.map(function (yr, i) { return "<tr><td>" + yr + "</td><td>" + vals[i] + "</td></tr>"; }).join("") + "</table>";
    fig.hidden = false;
    var tip = fig.querySelector(".cc-tip"), wrap = fig.querySelector(".cc-wrap");
    fig.querySelectorAll(".cc-bar").forEach(function (bar) {
      bar.addEventListener("mouseenter", function () { bar.classList.add("on"); tip.textContent = bar.getAttribute("data-tip"); tip.hidden = false; });
      bar.addEventListener("mousemove", function (e) {
        var r = wrap.getBoundingClientRect();
        tip.style.left = Math.min(e.clientX - r.left + 12, r.width - tip.offsetWidth) + "px"; tip.style.top = (e.clientY - r.top - 34) + "px";
      });
      bar.addEventListener("mouseleave", function () { bar.classList.remove("on"); tip.hidden = true; });
    });
  }

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
    if (snap.perYear) window.SCHOLAR_PER_YEAR = snap.perYear;
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

    // research page: "N papers on this theme"
    document.querySelectorAll("[data-topic-link]").forEach(function (a) {
      var n = pubs.filter(function (p) { return hasTopic(p, a.getAttribute("data-topic-link")); }).length;
      if (n) { a.textContent = n + (n === 1 ? " paper" : " papers") + " on this theme →"; a.hidden = false; }
    });

    var fig = document.getElementById("cite-chart");
    if (fig) chart(fig, window.SCHOLAR_PER_YEAR);

    var list = document.getElementById("pub-list");
    if (!list) return;
    var q = document.getElementById("pub-search");
    var count = document.getElementById("pub-count");
    var topicSel = document.getElementById("pub-topic");
    var state = { type: "all", role: "all", q: "", topic: "all" };

    if (topicSel) {
      var used = Object.keys(TOPICS).filter(function (t) { return pubs.some(function (p) { return hasTopic(p, t); }); });
      topicSel.innerHTML = '<option value="all">All topics</option>' + used.map(function (t) {
        return '<option value="' + t + '">' + esc(TOPICS[t]) + " (" + pubs.filter(function (p) { return hasTopic(p, t); }).length + ")</option>";
      }).join("");
      var want = (location.search.match(/[?&]topic=([a-z-]+)/) || [])[1];
      if (want && used.indexOf(want) !== -1) { topicSel.value = want; state.topic = want; }
      topicSel.addEventListener("change", function () {
        state.topic = topicSel.value;
        history.replaceState(null, "", state.topic === "all" ? location.pathname : "?topic=" + state.topic);
        render();
      });
    }

    function render() {
      var words = state.q.toLowerCase().split(/\s+/).filter(Boolean);
      var shown = pubs.filter(function (p) {
        if (state.type !== "all" && p.type !== state.type) return false;
        if (state.role === "first" && !lead(p)) return false;
        if (state.topic !== "all" && !hasTopic(p, state.topic)) return false;
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
  var done = false, ready;
  // Resolves with the merged list once Scholar data is in (used by cv-generate.html)
  window.PUBLICATIONS_READY = new Promise(function (r) { ready = r; });
  function go(snap) { if (done) return; done = true; try { merge(snap); } catch (e) {} try { start(); } finally { ready(pubs); } }
  if (window.fetch) {
    fetch("assets/data/scholar.json", { cache: "no-cache" }).then(function (r) { return r.ok ? r.json() : null; }).then(go, function () { go(null); });
    setTimeout(function () { go(null); }, 2500);
  } else go(null);
})();
