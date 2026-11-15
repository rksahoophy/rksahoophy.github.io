/* Shared behaviour for every page. No dependencies. */
(function () {
  "use strict";

  /* ---- mobile navigation ---- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });
  }

  /* ---- email addresses are assembled at runtime to keep scrapers out ---- */
  document.querySelectorAll("[data-user][data-domain]").forEach(function (el) {
    var addr = el.getAttribute("data-user") + "@" + el.getAttribute("data-domain");
    el.setAttribute("href", "mailto:" + addr);
    if (!el.hasAttribute("data-keep-text")) el.textContent = addr;
  });

  /* ---- images: try local file, then data-fallback URL, then hide/initials ---- */
  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
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
      } else {
        var holder = img.closest("figure");
        if (holder) holder.hidden = true;
      }
    }
    img.addEventListener("error", onErr);
    if (img.complete && img.naturalWidth === 0) onErr();
  });

  /* ---- gallery lightbox ---- */
  var box = document.getElementById("lightbox");
  if (box && typeof box.showModal === "function") {
    var bImg = box.querySelector("img"), bCap = box.querySelector("p");
    document.querySelectorAll(".gallery button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var img = btn.querySelector("img");
        bImg.src = img.currentSrc || img.src;
        bImg.alt = img.alt;
        bCap.textContent = btn.closest("figure").querySelector("figcaption").textContent.trim();
        box.showModal();
      });
    });
    box.querySelector("button").addEventListener("click", function () { box.close(); });
    box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
  }

  /* ---- footer year ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---- hero: metal-decorated C20 cage taking up H2 ---- */
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
    svg.innerHTML =
      '<defs>' +
      '<radialGradient id="mC" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#5A6B80"/><stop offset="1" stop-color="#142235"/></radialGradient>' +
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
        items.push([z, el("line", { x1: C + a[0] * S, y1: C + a[1] * S, x2: C + b[0] * S, y2: C + b[1] * S,
          stroke: "#142235", "stroke-opacity": (.3 + .55 * (z + 1.7) / 3.4).toFixed(2), "stroke-width": 2.6, "stroke-linecap": "round" })]);
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
