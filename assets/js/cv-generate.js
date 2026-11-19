/* ==========================================================================
   "Generate CV": builds a print-ready CV from the website's own content.
   Sources: cv.html, research.html (fetched and parsed), assets/data/site.json,
            awards.json, talks.json, reviewing.json, publications.js (+ scholar.json),
            cv-details.js.
   Edit those pages as usual; the generated CV follows automatically.
   ========================================================================== */
(function () {
  "use strict";

  var out = document.getElementById("cv");
  var status = document.getElementById("status");
  var saveBtn = document.getElementById("save");
  var EXTRA = window.CV_DETAILS || {};

  var ICON = {
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1 2.6V17h16V7.6l-8 5.2-8-5.2zM5.6 7 12 11.2 18.4 7H5.6z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 3v13h10V5H7zm5 14.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>',
    web: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm-1 2.1A8 8 0 0 0 4.1 11H8c.1-2.5.9-4.9 3-6.9zm2 0c2.1 2 2.9 4.4 3 6.9h3.9A8 8 0 0 0 13 4.1zM14 11c-.1-2.1-.8-4-2-5.6-1.2 1.6-1.9 3.5-2 5.6h4zm-4 2c.1 2.1.8 4 2 5.6 1.2-1.6 1.9-3.5 2-5.6h-4zm-2 0H4.1a8 8 0 0 0 6.9 6.9c-2.1-2-2.9-4.4-3-6.9zm8 0c-.1 2.5-.9 4.9-3 6.9a8 8 0 0 0 6.9-6.9H16z"/></svg>',
    link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.6 13.4a1 1 0 0 1 0-1.4l3.5-3.5a1 1 0 1 1 1.4 1.4L12 13.4a1 1 0 0 1-1.4 0zM8.5 19.8a4.3 4.3 0 0 1-3-7.3l2.1-2.1a1 1 0 0 1 1.4 1.4l-2.1 2.1a2.3 2.3 0 0 0 3.2 3.2l2.1-2.1a1 1 0 0 1 1.4 1.4l-2.1 2.1a4.3 4.3 0 0 1-3 1.3zm7.9-6.2a1 1 0 0 1-.7-1.7l2.1-2.1a2.3 2.3 0 0 0-3.2-3.2l-2.1 2.1a1 1 0 0 1-1.4-1.4l2.1-2.1a4.3 4.3 0 0 1 6 6l-2.1 2.1a1 1 0 0 1-.7.3z"/></svg>'
  };

  /* ---------- helpers ---------- */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function txt(el) { return el ? el.textContent.replace(/\s+/g, " ").trim() : ""; }
  function $(root, sel) { return root.querySelector(sel); }
  function $$(root, sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); }
  function endDot(s) { s = s.trim(); return /[.!?]$/.test(s) ? s : s + "."; }
  function firstYear(s) { var m = String(s).match(/(19|20)\d{2}/); return m ? +m[0] : 0; }
  function sectionByTitle(doc, title) {
    return $$(doc, "section").filter(function (s) { var h = $(s, "h2"); return h && txt(h).toLowerCase() === title.toLowerCase(); })[0] || null;
  }
  function fetchDoc(url) {
    return fetch(url, { cache: "no-cache" }).then(function (r) {
      if (!r.ok) throw new Error(url + " returned " + r.status);
      return r.text();
    }).then(function (html) { return new DOMParser().parseFromString(html, "text/html"); });
  }
  function sec(title, body) { return '<section><h2 class="sec">' + esc(title) + "</h2>" + body + "</section>"; }
  function bmList(items) { return items.length ? '<ul class="list">' + items.map(function (i) { return '<li class="bm">' + i + "</li>"; }).join("") + "</ul>" : ""; }
  function rows(pairs, wide) {
    return '<div class="rows' + (wide ? " wide" : "") + '">' + pairs.map(function (p) {
      return '<div class="k">' + p[0] + '</div><div class="v bm">' + p[1] + "</div>";
    }).join("") + "</div>";
  }

  /* ---------- timeline items from cv.html ---------- */
  function timeline(section) {
    if (!section) return [];
    return $$(section, "ol.timeline > li").map(function (li) {
      var body = li.children[1] || li;
      var whereEl = $(body, ".where"), pEl = $(body, "p"), strongEl = $(body, "strong");
      var own = body.cloneNode(true);
      $$(own, ".where, p, strong").forEach(function (n) { n.remove(); });
      return { when: txt($(li, ".when")), title: txt(strongEl), where: txt(whereEl), note: txt(pEl), rest: txt(own) };
    });
  }

  /* ---------- authors → "Last, I. I." with me in bold ---------- */
  function apaAuthors(list, corresponding) {
    if (window.PUB_TOOLS) return window.PUB_TOOLS.apaAuthors(list, corresponding, true);
    var etal = /(\.\.\.|…)\s*$/.test(list);
    var names = list.replace(/(\.\.\.|…)\s*$/, "").split(/\s*,\s*|\s+&\s+|\s+and\s+/).filter(Boolean);
    var fmt = names.map(function (n) {
      var t = n.trim().split(/\s+/);
      var last = t.pop();
      var initials = t.map(function (w) {
        w = w.replace(/\./g, "");
        return /^[A-Z]{2,3}$/.test(w) ? w.split("").map(function (c) { return c + "."; }).join(" ") : w.charAt(0) + ".";
      }).join(" ");
      if (/^sahoo$/i.test(last) && /^R/.test(initials)) return '<span class="me">Sahoo, Rakesh K.' + (corresponding ? "*" : "") + "</span>";
      return esc(last + (initials ? ", " + initials : ""));
    });
    if (etal) return fmt.join(", ") + ", et al.";
    if (fmt.length < 2) return fmt.join("");
    return fmt.slice(0, -1).join(", ") + ", &amp; " + fmt[fmt.length - 1];
  }

  function pubEntry(p) {
    var chapter = p.type === "chapter" || /chapter/i.test(p.status || "");
    var when = p.type === "forthcoming" ? '<span class="state">' + esc(p.status) + ", " + p.year + "</span>"
      : p.type === "preprint" ? '<span class="state">' + p.year + ", preprint</span>" : String(p.year);
    var s = apaAuthors(p.authors, p.corresponding) + " (" + when + "). " + esc(endDot(p.title)) + " ";
    if (p.venue) {
      s += chapter ? "In <i>" + esc(p.venue) + "</i>" + (p.details ? " (" + esc(p.details) + ")" : "") + "."
                   : "<i>" + esc(p.venue) + "</i>" + (p.details ? ", " + esc(p.details) : "") + ".";
    }
    if (p.doi) s += ' <a class="doi" href="https://doi.org/' + esc(p.doi) + '">' + ICON.link + "doi:<code>" + esc(p.doi) + "</code></a>";
    else if (p.url) s += ' <a class="doi" href="' + esc(p.url) + '">' + ICON.link + "<code>" + esc(p.url.replace(/^https?:\/\//, "")) + "</code></a>";
    return s;
  }

  /* ---------- build ---------- */
  function build(cvDoc, resDoc, data, pubs) {
    var html = "";

    /* header (assets/data/site.json) */
    var site = data.site || {};
    var nameUp = (site.honorific ? site.honorific + " " : "") + String(site.name || "").toUpperCase();
    var emails = (site.emails || []).map(function (e) { return e.address; });
    var profiles = {};
    (site.profiles || []).forEach(function (p) { profiles[p.label] = p.url; });
    var home = site.url || location.origin + "/";
    var linkBits = ['<span><a href="' + esc(home) + '">Home Page</a></span>'];
    ["Google Scholar", "ORCID", "LinkedIn", "GitHub"].forEach(function (k) {
      if (profiles[k]) linkBits.push('<span><a href="' + esc(profiles[k]) + '">' + esc(k) + "</a></span>");
    });
    html += '<header class="cv-head"><div><h1>' + esc(nameUp) + '</h1><ul class="contact">' +
      (emails.length ? "<li>" + ICON.mail + '<span class="mono">' + emails.map(function (e) { return '<a href="mailto:' + esc(e) + '">' + esc(e) + "</a>"; }).join(", ") + "</span></li>" : "") +
      ((EXTRA.phones || []).length ? "<li>" + ICON.phone + '<span class="mono">' + EXTRA.phones.map(esc).join(", ") + "</span></li>" : "") +
      "<li>" + ICON.web + '<span class="links">' + linkBits.join("") + "</span></li>" +
      '</ul></div><img class="photo" src="' + esc(site.photo || "assets/img/photos/profile.jpg") + '" alt="" onerror="this.remove()"></header>';

    /* academic credentials = experience + education, newest first */
    var exp = timeline(sectionByTitle(cvDoc, "Experience"));
    var edu = timeline(sectionByTitle(cvDoc, "Education"));
    var eduWhen = edu.map(function (e) { return e.when; });
    var lecturing = exp.filter(function (e) { return /lectur/i.test(e.title); });
    var creds = exp.filter(function (e) { return lecturing.indexOf(e) === -1 && eduWhen.indexOf(e.when) === -1; })
      .map(function (e, i) { return { e: e, edu: false, i: i }; })
      .concat(edu.map(function (e, i) { return { e: e, edu: true, i: 100 + i }; }))
      .sort(function (a, b) { return firstYear(b.e.when) - firstYear(a.e.when) || a.i - b.i; });
    html += sec("Academic Credentials", rows(creds.map(function (c) {
      var e = c.e, note = e.note;
      var v = "<b>" + esc(e.title) + "</b>" + (e.where ? ", " + esc(endDot(e.where)) : "");
      if (note) {
        note = note.replace(/;\s*HPC training[^;]*/i, "");
        if (c.edu) note = note.replace(/^Thesis:\s*/, "Thesis title: ");
        v += '<br><span class="note">' + esc(endDot(note)) + "</span>";
      }
      return [esc(e.when), v];
    })));

    /* research interests */
    var themes = $$(resDoc, "article.theme").map(function (a) { return esc(txt($(a, "h3"))); });
    var other = sectionByTitle(resDoc, "Other interests");
    var others = other ? $$(other, "li").map(function (li) { return esc(txt(li)); }) : [];
    html += sec("Research Interests", bmList(themes.concat(others)));

    /* research skills */
    var skills = $$(cvDoc, ".skills > div").map(function (d) { return { k: txt($(d, "h3")), v: txt($(d, "p")) }; });
    var languages = skills.filter(function (s) { return /^languages?$/i.test(s.k); })[0];
    var teachSkill = skills.filter(function (s) { return /teach/i.test(s.k); })[0];
    html += sec("Research Skills", rows(skills.filter(function (s) { return s !== languages && s !== teachSkill; })
      .map(function (s) { return [esc(s.k), esc(s.v)]; }), true));

    /* achievements, fellowships and grants */
    var awards = (data.awards || []).map(function (a) { return { yr: a.year, t: a.text }; });
    var isGrant = function (a) { return /travel|\bITS\b|grant/i.test(a.t); };
    html += sec("Achievements, Fellowships and Scholarships", rows(awards.filter(function (a) { return !isGrant(a); })
      .map(function (a) { return [esc(a.yr), esc(a.t)]; })));
    var grants = awards.filter(isGrant);
    if (grants.length) html += sec("Grants", bmList(grants.map(function (a) { return esc(a.t) + ", " + esc(a.yr); })));

    /* reviewing (assets/data/reviewing.json) */
    var rev = (data.reviewing || []).filter(function (r) { return r && r.journal; });
    if (rev.length) html += sec("Reviewer for", bmList(rev.map(function (r) { return "<i>" + esc(r.journal) + "</i>" + (r.publisher ? " (" + esc(r.publisher) + ")" : ""); })));

    /* teaching: sentences about teaching in the experience notes, plus lecturing posts */
    var teach = [];
    exp.forEach(function (e) {
      (e.note || "").split(/;\s*|\.\s+(?=[A-Z])/).forEach(function (part) {
        if (!/taught|teach|training/i.test(part) || lecturing.indexOf(e) !== -1) return;
        part = part.replace(/^Also\s+/i, "").replace(/\.$/, "");
        part = part.charAt(0).toUpperCase() + part.slice(1);
        teach.push("<b>" + esc(part) + "</b>: " + esc(e.where) + " (" + esc(e.when) + ")");
      });
    });
    lecturing.forEach(function (e) { teach.push("<b>" + esc(e.title) + "</b>: " + esc(e.where) + " (" + esc(e.when) + ")"); });
    if (teach.length) html += sec("Teaching Experience", bmList(teach));

    /* personal details */
    var personal = (EXTRA.personal || []).slice();
    if (languages) personal.push(["Language", esc(languages.v)]);
    if (personal.length) html += sec("Personal Details", bmList(personal.map(function (p) { return esc(p[0]) + ": &nbsp;" + p[1]; })));

    /* publications */
    var isChapter = function (p) { return p.type === "chapter" || (p.type === "forthcoming" && /chapter/i.test(p.status || "")); };
    var order = function (a, b) { return (b.type === "forthcoming") - (a.type === "forthcoming") || b.year - a.year; };
    var groups = [
      ["Peer-Reviewed Journals", pubs.filter(function (p) { return !isChapter(p) && (p.type === "journal" || p.type === "forthcoming" || p.type === "preprint"); })],
      ["Conference Proceedings", pubs.filter(function (p) { return p.type === "proceedings"; })],
      ["Book Chapters", pubs.filter(isChapter)]
    ];
    var S = window.SCHOLAR || {};
    var pubHtml = S.citations ? '<p class="metrics">Google Scholar' + (window.PUBLICATIONS_UPDATED ? " (" + esc(window.PUBLICATIONS_UPDATED) + ")" : "") +
      ": " + S.citations + " citations, h-index " + S.h + ", i10-index " + S.i10 + ". * Corresponding author.</p>" : "";
    groups.forEach(function (g) {
      if (!g[1].length) return;
      pubHtml += '<h3 class="sub">' + g[0] + '</h3><ol class="num">' + g[1].slice().sort(order).map(function (p) { return "<li>" + pubEntry(p) + "</li>"; }).join("") + "</ol>";
    });
    html += sec("Research Publications", pubHtml);

    /* conferences and workshops (assets/data/talks.json) */
    var talks = data.talks || [];
    if (talks.length) {
      html += sec("Conferences and Workshops", '<ol class="num">' + talks.map(function (t) {
        var yr = String(firstYear(t.when));
        if (t.title) return "<li>" + esc(endDot(t.title)) + (t.type ? " (<i>" + esc(t.type) + "</i>)." : "") + " " + esc(t.event) + ", " + esc(t.when) + ".</li>";
        return "<li>" + (t.type ? esc(t.type) + ", " : "") + esc(t.event) + (t.event.indexOf(yr) === -1 ? ", " + esc(t.when) : "") + ".</li>";
      }).join("") + "</ol>");
    }

    /* referees */
    var refs = EXTRA.referees || [];
    if (refs.length) {
      html += sec("Referees", '<div class="refs">' + refs.map(function (r) {
        return "<div><b>" + esc(r.name) + "</b>" + (r.lines || []).map(esc).join("<br>") +
          (r.email ? '<br>E-mail: <a href="mailto:' + esc(r.email) + '">' + esc(r.email) + "</a>" : "") + "</div>";
      }).join("") + "</div>");
    }

    var today = new Date();

    out.innerHTML = html;
    document.title = "CV_Rakesh_K_Sahoo_" + today.toISOString().slice(0, 7);
  }

  /* ---------- run ---------- */
  function pubsReady() {
    if (window.PUBLICATIONS_READY) return window.PUBLICATIONS_READY;
    return new Promise(function (r) { setTimeout(function () { r(window.PUBLICATIONS || []); }, 2600); });
  }

  function fetchJSON(name) {
    return fetch("assets/data/" + name + ".json", { cache: "no-cache" }).then(function (r) { return r.ok ? r.json() : null; }, function () { return null; });
  }

  Promise.all([fetchDoc("cv.html"), fetchDoc("research.html"), fetchJSON("site"), fetchJSON("awards"), fetchJSON("talks"), fetchJSON("reviewing"), pubsReady()])
    .then(function (r) {
      if (!r[2]) throw new Error("assets/data/site.json could not be read");
      build(r[0], r[1], { site: r[2], awards: r[3], talks: r[4], reviewing: r[5] }, r[6] || window.PUBLICATIONS || []);
      var imgs = $$(out, "img").map(function (i) { return i.complete ? null : new Promise(function (ok) { i.onload = i.onerror = ok; }); });
      return Promise.all([document.fonts ? document.fonts.ready : null].concat(imgs));
    })
    .then(function () {
      saveBtn.disabled = false;
      status.textContent = "Up to date with the website. Choose “Save as PDF” in the print dialog.";
      if (location.hash === "#print") setTimeout(function () { window.print(); }, 300);
    })
    .catch(function (err) {
      out.innerHTML = '<p class="error">Could not read the website pages (' + esc(err.message) + '). ' +
        "This page has to be opened from the published site (or a local web server such as <code>python3 -m http.server</code>), not by double-clicking the file.</p>";
      status.textContent = "Failed";
    });

  saveBtn.addEventListener("click", function () { window.print(); });
})();
