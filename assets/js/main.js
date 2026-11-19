/* Shared behaviour for every page. No dependencies.
   Content that changes over time lives in assets/data/*.json and is rendered here:
     site.json          name, position, affiliation, address, e-mails, profiles, About text
     news.json          home-page News
     awards.json        CV page awards
     talks.json         CV page talks, posters and schools
     reviewing.json     CV page "Reviewer for" (hidden while empty)
     gallery.json       Gallery photos with captions and descriptions
     collaborators.json Research page collaborators (photo + web page)
     software.json      Research page software (hidden while empty)                */
(function () {
  "use strict";

  /* ---------- data loading ---------- */
  var cache = {};
  function load(name) {
    if (!cache[name]) {
      cache[name] = fetch("assets/data/" + name + ".json", { cache: "no-cache" })
        .then(function (r) { return r.ok ? r.json() : null; })
        .catch(function () { return null; });
    }
    return cache[name];
  }
  window.SiteData = { load: load };

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function initials(name) {
    return String(name).replace(/^(Prof|Dr|Mr|Ms|Mrs)\.?\s+/i, "").split(/\s+/).filter(Boolean)
      .map(function (w) { return w.charAt(0); }).join("").replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase();
  }

  /* ---------- mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });
  }

  /* ---------- light / dark toggle (choice is remembered; otherwise follows the system) ---------- */
  var root = document.documentElement;
  var sysDark = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : { matches: false };
  $$(".theme-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cur = root.getAttribute("data-theme") || (sysDark.matches ? "dark" : "light");
      var next = cur === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  });

  /* ---------- opened by double-clicking a file: explain why parts are empty ---------- */
  if (location.protocol === "file:") {
    var note = document.createElement("div");
    note.className = "file-notice";
    note.innerHTML = "Preview mode: news, awards, gallery and other content load only from a web server. " +
      "Run <code>python3 -m http.server</code> in this folder and open <code>http://localhost:8000</code>, or view the published site.";
    document.body.insertBefore(note, document.body.firstChild);
  }

  /* ---------- images: try local file, then data-fallback URL, then hide/initials ---------- */
  function wireImage(img) {
    function onErr() {
      var fb = img.getAttribute("data-fallback");
      if (fb && img.src !== fb) { img.removeAttribute("data-fallback"); img.src = fb; return; }
      img.removeEventListener("error", onErr);
      if (img.classList.contains("portrait")) {
        var d = document.createElement("div");
        d.className = "portrait portrait-fallback";
        d.setAttribute("aria-hidden", "true");
        d.textContent = "RS";
        img.replaceWith(d);
      } else if (img.closest(".avatar")) {
        img.closest(".avatar").textContent = img.getAttribute("data-initials") || "";
      } else {
        var holder = img.closest("figure");
        if (holder) holder.hidden = true;
      }
    }
    img.addEventListener("error", onErr);
    if (img.complete && img.naturalWidth === 0 && img.src) onErr();
  }
  $$("img[data-fallback]").forEach(wireImage);

  /* ---------- e-mail links: assembled at runtime ---------- */
  function wireEmails(root) {
    $$("[data-user][data-domain]", root).forEach(function (el) {
      var addr = el.getAttribute("data-user") + "@" + el.getAttribute("data-domain");
      el.setAttribute("href", "mailto:" + addr);
      if (!el.hasAttribute("data-keep-text")) el.textContent = addr;
    });
  }
  function mailLink(address) {
    var p = String(address).split("@");
    return '<a data-user="' + esc(p[0]) + '" data-domain="' + esc(p[1] || "") + '" href="contact.html">e-mail</a>';
  }
  function profilesList(site) {
    return (site.profiles || []).map(function (p) { return '<li><a href="' + esc(p.url) + '" rel="me noopener">' + esc(p.label) + "</a></li>"; }).join("");
  }

  /* ---------- site settings (assets/data/site.json) ---------- */
  load("site").then(function (site) {
    if (!site) return;
    var full = (site.honorific ? site.honorific + " " : "") + site.name;

    $$("[data-site]").forEach(function (el) {
      var k = el.getAttribute("data-site");
      if (k === "position-affiliation") el.innerHTML = esc(site.position) + "<br>" + esc(site.affiliation);
      else if (k === "full-name") el.textContent = full;
      else if (site[k] != null) el.textContent = site[k];
    });
    $$("[data-site-about]").forEach(function (el) {
      el.innerHTML = (site.about || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    });
    $$("[data-site-emails]").forEach(function (el) {
      el.innerHTML = (site.emails || []).map(function (e) { return "<dt>" + esc(e.label) + "</dt><dd>" + mailLink(e.address) + "</dd>"; }).join("");
    });
    $$("[data-site-address]").forEach(function (el) {
      el.innerHTML = (site.address || []).map(esc).join("<br>");
    });
    $$("[data-site-profiles]").forEach(function (el) { el.innerHTML = profilesList(site); });
    $$("[data-site-map]").forEach(function (el) {
      if (!site.map) return;
      el.innerHTML = '<iframe class="map" title="Map showing ' + esc(site.map.label || site.affiliation) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=' +
        encodeURIComponent(site.map.lat + "," + site.map.lng) + '&amp;z=16&amp;output=embed"></iframe>';
    });

    /* footer, identical on every page */
    $$("[data-site-footer]").forEach(function (el) {
      var first = (site.emails || [])[0];
      el.innerHTML = '<div class="wrap"><div><p><strong class="footer-name">' + esc(full) + "</strong></p><p>" +
        esc(site.affiliation) + (site.city ? ", " + esc(site.city.split(",")[0]) : "") + "</p>" +
        (first ? "<p>" + mailLink(first.address) + "</p>" : "") + '</div><ul class="profiles">' + profilesList(site) + "</ul></div>" +
        '<div class="wrap" style="margin-top:1.5rem"><p>© ' + new Date().getFullYear() + " " + esc(site.name) + ". Figures on this site are original illustrations.</p></div>";
    });
    wireEmails(document);

    /* structured data for search engines (home page) */
    var ld = document.getElementById("ld-person");
    if (ld) {
      ld.textContent = JSON.stringify({
        "@context": "https://schema.org", "@type": "Person", name: site.name, honorificPrefix: site.honorific,
        jobTitle: site.position, affiliation: { "@type": "Organization", name: site.affiliation },
        alumniOf: { "@type": "CollegeOrUniversity", name: "IIT (ISM) Dhanbad" }, url: site.url,
        sameAs: (site.profiles || []).map(function (p) { return p.url; })
      });
    }

    /* visitor statistics (GoatCounter), only if a code is set */
    if (site.goatcounter && !/^(localhost|127\.)/.test(location.hostname)) {
      var s = document.createElement("script");
      s.async = true; s.src = "https://gc.zgo.at/count.js";
      s.setAttribute("data-goatcounter", "https://" + site.goatcounter + ".goatcounter.com/count");
      document.body.appendChild(s);
    }
  });

  /* ---------- lists ---------- */
  var RENDER = {
    news: function (n) {
      return '<li><span class="when">' + esc(n.when) + "</span><div>" + (n.highlight ? '<span class="news-flag" aria-hidden="true"></span>' : "") +
        (n.title ? "<strong>" + esc(n.title.replace(/\.$/, "")) + ".</strong> " : "") + esc(n.text) + "</div></li>";
    },
    awards: function (a) { return '<li><span class="yr">' + esc(a.year) + "</span><span>" + esc(a.text) + "</span></li>"; },
    talks: function (t) {
      return '<li><span class="when">' + esc(t.when) + "</span><div>" + (t.type ? esc(t.type) + ", " : "") + esc(t.event) +
        (t.title ? '<span class="where">' + esc(t.title) + "</span>" : "") + "</div></li>";
    },
    reviewing: function (r) { return "<li>" + esc(r.journal) + (r.publisher ? ' <span class="muted sans small">' + esc(r.publisher) + "</span>" : "") + "</li>"; },
    gallery: function (g) {
      return '<figure><button type="button" aria-label="Enlarge photo: ' + esc(g.title) + '"><img src="' + esc(g.image) + '"' +
        (g.fallback ? ' data-fallback="' + esc(g.fallback) + '"' : "") + ' alt="' + esc(g.title) + '" loading="lazy" decoding="async"></button>' +
        "<figcaption><strong>" + esc(g.title) + "</strong>" + (g.date ? "<time>" + esc(g.date) + "</time>" : "") + "</figcaption>" +
        (g.description ? '<p class="gallery-desc">' + esc(g.description) + "</p>" : "") + "</figure>";
    },
    collaborators: function (c) {
      var ini = initials(c.name);
      var avatar = '<span class="avatar" aria-hidden="true">' + (c.photo ? '<img src="' + esc(c.photo) + '" alt="" loading="lazy" data-initials="' + esc(ini) + '">' : esc(ini)) + "</span>";
      var body = '<span class="pname">' + esc(c.name) + '</span><span class="aff">' + esc(c.affiliation) + "</span>";
      return "<li>" + (c.url ? '<a class="person" href="' + esc(c.url) + '" rel="noopener">' + avatar + "<span>" + body + "</span></a>"
                             : '<div class="person">' + avatar + "<span>" + body + "</span></div>") + "</li>";
    },
    software: function (s) {
      return '<article class="soft">' + (s.image ? '<img src="' + esc(s.image) + '" alt="" loading="lazy">' : "") + "<div><h3>" +
        (s.url ? '<a href="' + esc(s.url) + '">' + esc(s.name) + "</a>" : esc(s.name)) + "</h3><p>" + esc(s.description) + "</p>" +
        (s.tags ? '<p class="soft-tags">' + esc(s.tags) + "</p>" : "") +
        (s.url ? '<p><a class="soft-link" href="' + esc(s.url) + '">View the code →</a></p>' : "") + "</div></article>";
    }
  };
  $$("[data-list]").forEach(function (el) {
    var name = el.getAttribute("data-list");
    load(name).then(function (items) {
      items = (items || []).filter(function (x) { return x && Object.keys(x).some(function (k) { return x[k] !== "" && x[k] != null && x[k] !== false; }); });
      el.innerHTML = items.map(RENDER[name]).join("");
      var holder = el.closest("[data-hide-empty]");
      if (holder) holder.hidden = !items.length;
      $$("img", el).forEach(wireImage);
    });
  });

  /* ---------- gallery lightbox (works for photos added later) ---------- */
  var box = document.getElementById("lightbox");
  if (box && typeof box.showModal === "function") {
    var bImg = box.querySelector("img"), bCap = box.querySelector("p");
    document.addEventListener("click", function (e) {
      var btn = e.target.closest && e.target.closest(".gallery button");
      if (!btn) return;
      var img = btn.querySelector("img"), fig = btn.closest("figure");
      bImg.src = img.currentSrc || img.src;
      bImg.alt = img.alt;
      var cap = fig.querySelector("figcaption"), desc = fig.querySelector(".gallery-desc");
      bCap.innerHTML = "<strong>" + esc(cap.querySelector("strong") ? cap.querySelector("strong").textContent : "") + "</strong>" +
        (cap.querySelector("time") ? " · " + esc(cap.querySelector("time").textContent) : "") +
        (desc ? '<span class="lb-desc">' + esc(desc.textContent) + "</span>" : "");
      box.showModal();
    });
    box.querySelector("button").addEventListener("click", function () { box.close(); });
    box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
  }

  /* ---------- footer year (pages that still carry a static footer) ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- hero: metal-decorated C20 cage taking up H2 ---------- */
  var stage = document.getElementById("molecule");
  if (stage) drawMolecule(stage);

  function drawMolecule(svg) {
    var NS = "http://www.w3.org/2000/svg";
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var phi = (1 + Math.sqrt(5)) / 2, V = [], E = [];
    [-1, 1].forEach(function (a) { [-1, 1].forEach(function (b) { [-1, 1].forEach(function (c) { V.push([a, b, c]); }); }); });
    [-1, 1].forEach(function (a) { [-1, 1].forEach(function (b) {
      V.push([0, a / phi, b * phi]); V.push([a / phi, b * phi, 0]); V.push([a * phi, 0, b / phi]);
    }); });
    for (var i = 0; i < 20; i++) for (var j = i + 1; j < 20; j++) {
      var d = Math.hypot(V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]);
      if (Math.abs(d - 2 / phi) < 1e-6) E.push([i, j]);
    }
    var M = [[1, .3, .6], [-1, -.4, .5], [.2, -1, -.2], [-.3, 1, -.4]].map(function (m) {
      var n = Math.hypot(m[0], m[1], m[2]); return [m[0] / n * 2.3, m[1] / n * 2.3, m[2] / n * 2.3];
    });
    // three H2 per metal, each with its own arrival delay
    var H2 = [];
    M.forEach(function (m, k) {
      for (var t = 0; t < 3; t++) H2.push({ m: k, a: t * 2.09 + k * .7, delay: 600 + (k * 3 + t) * 260 });
    });

    var S = 90, C = 250;
    svg.setAttribute("viewBox", "-25 -25 550 550");
    // carbon colours and bond colour come from CSS variables so the cage adapts to dark mode
    svg.innerHTML =
      '<defs>' +
      '<radialGradient id="mC" cx="35%" cy="30%" r="70%"><stop offset="0" style="stop-color:var(--mol-c1)"/><stop offset="1" style="stop-color:var(--mol-c2)"/></radialGradient>' +
      '<radialGradient id="mM" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#C3B0E0"/><stop offset="1" stop-color="#7B5EA7"/></radialGradient>' +
      '<radialGradient id="mH" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#C8D6E0"/></radialGradient>' +
      '<radialGradient id="mG" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#F5D77E" stop-opacity=".85"/><stop offset="1" stop-color="#E2B23A" stop-opacity=".5"/></radialGradient>' +
      '<radialGradient id="mY" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#8FD3E6" stop-opacity=".85"/><stop offset="1" stop-color="#2BA3C4" stop-opacity=".5"/></radialGradient>' +
      '</defs><g id="mol"></g>';
    var g = svg.querySelector("#mol");

    function rot(p, ax, ay) {
      var x = p[0], y = p[1], z = p[2], c = Math.cos(ax), s = Math.sin(ax);
      var y1 = y * c - z * s, z1 = y * s + z * c;
      c = Math.cos(ay); s = Math.sin(ay);
      return [x * c + z1 * s, y1, -x * s + z1 * c];
    }
    function el(name, attrs) {
      var e = document.createElementNS(NS, name);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      return e;
    }
    function ease(t) { return t < 0 ? 0 : t > 1 ? 1 : 1 - Math.pow(1 - t, 3); }

    var t0 = performance.now();
    function frame(now) {
      var t = reduce ? 4200 : now - t0;
      var ay = .4 + t * .00018, ax = .45 + Math.sin(t * .00011) * .18;
      var P = V.map(function (p) { return rot(p, ax, ay); });
      var items = [];
      E.forEach(function (e) {
        var a = P[e[0]], b = P[e[1]], z = (a[2] + b[2]) / 2;
        items.push([z, el("line", { x1: C + a[0] * S, y1: C + a[1] * S, x2: C + b[0] * S, y2: C + b[1] * S, style: "stroke:var(--mol-bond)",
          "stroke-opacity": (.3 + .55 * (z + 1.7) / 3.4).toFixed(2), "stroke-width": 2.6, "stroke-linecap": "round" })]);
      });
      P.forEach(function (p) {
        items.push([p[2] + .01, el("circle", { cx: C + p[0] * S, cy: C + p[1] * S, r: (6.5 + 2 * p[2]).toFixed(1), fill: "url(#mC)" })]);
      });
      var MP = M.map(function (m) { return rot(m, ax, ay); });
      MP.forEach(function (mp, k) {
        var mx = C + mp[0] * S, my = C + mp[1] * S;
        var grow = ease((t - 200 - k * 150) / 700);
        var ang = Math.atan2(mp[1], mp[0]) * 180 / Math.PI;
        var lobe = el("g", { transform: "translate(" + mx.toFixed(1) + "," + my.toFixed(1) + ") rotate(" + ang.toFixed(1) + ") scale(" + grow.toFixed(3) + ")" });
        lobe.appendChild(el("ellipse", { cx: -24, cy: 0, rx: 23, ry: 15, fill: "url(#mY)" }));
        lobe.appendChild(el("ellipse", { cx: 24, cy: 0, rx: 23, ry: 15, fill: "url(#mG)" }));
        items.push([mp[2] - .02, lobe]);
        items.push([mp[2], el("circle", { cx: mx, cy: my, r: 12.5, fill: "url(#mM)" })]);
      });
      H2.forEach(function (h) {
        var mp = MP[h.m];
        var p = ease((t - h.delay) / 1400);
        var dist = 46 + (1 - p) * 170;
        var a = h.a + (reduce ? 0 : t * .0004);
        var dir = [Math.cos(a), Math.sin(a)];
        var hx = C + mp[0] * S + (dir[0] * dist) + mp[0] * 22;
        var hy = C + mp[1] * S + (dir[1] * dist) + mp[1] * 22;
        var o = a + 1.1 + (reduce ? 0 : t * .001), dd = 7;
        var grp = el("g", { opacity: p.toFixed(2) });
        grp.appendChild(el("line", { x1: hx - Math.cos(o) * dd, y1: hy - Math.sin(o) * dd, x2: hx + Math.cos(o) * dd, y2: hy + Math.sin(o) * dd, stroke: "#556476", "stroke-width": 1.6 }));
        grp.appendChild(el("circle", { cx: hx - Math.cos(o) * dd, cy: hy - Math.sin(o) * dd, r: 5.6, fill: "url(#mH)", stroke: "#556476", "stroke-width": .9 }));
        grp.appendChild(el("circle", { cx: hx + Math.cos(o) * dd, cy: hy + Math.sin(o) * dd, r: 5.6, fill: "url(#mH)", stroke: "#556476", "stroke-width": .9 }));
        items.push([mp[2] + .3, grp]);
      });
      items.sort(function (a, b) { return a[0] - b[0]; });
      g.replaceChildren.apply(g, items.map(function (x) { return x[1]; }));
      if (!reduce && !document.hidden) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    document.addEventListener("visibilitychange", function () { if (!document.hidden && !reduce) requestAnimationFrame(frame); });
  }
})();
