"""Generate the site's SVG figures (research illustrations, favicon, OG image)."""
import math, os, random, sys

OUT = sys.argv[1]
INK = "#142235"; MUTED = "#556476"; LINE = "#C9D3DB"; PAPER = "#F4F7F8"
CYAN = "#2BA3C4"; CYAN_D = "#156F8A"; GOLD = "#E2B23A"; GOLD_D = "#B8871A"
METAL = "#7B5EA7"  # decorating metal atom
H = "#FFFFFF"

def save(name, body, w, h, bg=None):
    rect = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" '
           f'font-family="Public Sans, Helvetica, Arial, sans-serif">{defs()}{rect}{body}</svg>')
    with open(os.path.join(OUT, name), "w") as f:
        f.write(svg)

def defs():
    return f'''<defs>
<radialGradient id="gC" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#5A6B80"/><stop offset="1" stop-color="{INK}"/></radialGradient>
<radialGradient id="gM" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#B9A3DA"/><stop offset="1" stop-color="{METAL}"/></radialGradient>
<radialGradient id="gH" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#C8D6E0"/></radialGradient>
<radialGradient id="gGold" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#F5D77E" stop-opacity=".9"/><stop offset="1" stop-color="{GOLD}" stop-opacity=".55"/></radialGradient>
<radialGradient id="gCyan" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#8FD3E6" stop-opacity=".9"/><stop offset="1" stop-color="{CYAN}" stop-opacity=".55"/></radialGradient>
<marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{CYAN_D}"/></marker>
<marker id="arrI" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{INK}"/></marker>
</defs>'''

# ---------- dodecahedron (C20) geometry ----------
def dodeca():
    p = (1 + 5 ** .5) / 2
    v = []
    for a in (-1, 1):
        for b in (-1, 1):
            for c in (-1, 1):
                v.append((a, b, c))
    for a in (-1, 1):
        for b in (-1, 1):
            v += [(0, a / p, b * p), (a / p, b * p, 0), (a * p, 0, b / p)]
    e = []
    for i in range(20):
        for j in range(i + 1, 20):
            d = math.dist(v[i], v[j])
            if abs(d - 2 / p) < 1e-6:
                e.append((i, j))
    return v, e

def rot(pt, ax, ay):
    x, y, z = pt
    y, z = y * math.cos(ax) - z * math.sin(ax), y * math.sin(ax) + z * math.cos(ax)
    x, z = x * math.cos(ay) + z * math.sin(ay), -x * math.sin(ay) + z * math.cos(ay)
    return x, y, z

def cage_svg(cx, cy, s, ax=.5, ay=.4, metals=(), h2=True, lobes=False, scale_atoms=1.0):
    v, e = dodeca()
    P = [rot(p, ax, ay) for p in v]
    items = []
    for i, j in e:
        z = (P[i][2] + P[j][2]) / 2
        op = .35 + .5 * (z + 1.7) / 3.4
        items.append((z, f'<line x1="{cx+P[i][0]*s:.1f}" y1="{cy+P[i][1]*s:.1f}" x2="{cx+P[j][0]*s:.1f}" y2="{cy+P[j][1]*s:.1f}" stroke="{INK}" stroke-opacity="{op:.2f}" stroke-width="{2.2*scale_atoms:.1f}" stroke-linecap="round"/>'))
    for p in P:
        r = (5.5 + 1.8 * p[2]) * scale_atoms
        items.append((p[2] + .01, f'<circle cx="{cx+p[0]*s:.1f}" cy="{cy+p[1]*s:.1f}" r="{r:.1f}" fill="url(#gC)"/>'))
    for k, (dx, dy, dz) in enumerate(metals):
        n = math.sqrt(dx*dx+dy*dy+dz*dz)
        mp = rot((dx/n*2.25, dy/n*2.25, dz/n*2.25), ax, ay)
        mx, my = cx + mp[0]*s, cy + mp[1]*s
        if lobes:
            ang = math.degrees(math.atan2(mp[1], mp[0]))
            items.append((mp[2]-.02, f'<g transform="translate({mx:.1f},{my:.1f}) rotate({ang:.0f})"><ellipse cx="{-22*scale_atoms:.1f}" cy="0" rx="{20*scale_atoms:.1f}" ry="{13*scale_atoms:.1f}" fill="url(#gCyan)"/><ellipse cx="{22*scale_atoms:.1f}" cy="0" rx="{20*scale_atoms:.1f}" ry="{13*scale_atoms:.1f}" fill="url(#gGold)"/></g>'))
        items.append((mp[2], f'<circle cx="{mx:.1f}" cy="{my:.1f}" r="{11*scale_atoms:.1f}" fill="url(#gM)"/>'))
        if h2:
            for t in range(3):
                a = t * 2.1 + k
                hx = mx + math.cos(a) * 40 * scale_atoms + mp[0] * 18 * scale_atoms
                hy = my + math.sin(a) * 40 * scale_atoms + mp[1] * 18 * scale_atoms
                o = a + .9
                d = 6.5 * scale_atoms
                items.append((mp[2] + .3, f'<g><line x1="{hx-math.cos(o)*d:.1f}" y1="{hy-math.sin(o)*d:.1f}" x2="{hx+math.cos(o)*d:.1f}" y2="{hy+math.sin(o)*d:.1f}" stroke="{MUTED}" stroke-width="{1.5*scale_atoms:.1f}"/>'
                    f'<circle cx="{hx-math.cos(o)*d:.1f}" cy="{hy-math.sin(o)*d:.1f}" r="{5.2*scale_atoms:.1f}" fill="url(#gH)" stroke="{MUTED}" stroke-width=".8"/>'
                    f'<circle cx="{hx+math.cos(o)*d:.1f}" cy="{hy+math.sin(o)*d:.1f}" r="{5.2*scale_atoms:.1f}" fill="url(#gH)" stroke="{MUTED}" stroke-width=".8"/></g>'))
    items.sort(key=lambda t: t[0])
    return "".join(s for _, s in items)

METALS = [(1, .3, .6), (-1, -.4, .5), (.2, -1, -.2), (-.3, 1, -.4)]

# 1. Hydrogen storage
def fig_h2():
    w, h = 800, 500
    b = cage_svg(400, 215, 74, metals=METALS, lobes=True)
    b += f'<g font-size="15" fill="{MUTED}"><text x="40" y="460">C₂₀ cage</text><circle cx="30" cy="455" r="6" fill="url(#gC)"/>'
    b += f'<circle cx="150" cy="455" r="7" fill="url(#gM)"/><text x="162" y="460">decorating metal (Li, Sc, Ti, Zr)</text>'
    b += f'<circle cx="410" cy="455" r="5" fill="url(#gH)" stroke="{MUTED}"/><text x="422" y="460">adsorbed H₂</text>'
    b += f'<ellipse cx="540" cy="455" rx="9" ry="6" fill="url(#gGold)"/><ellipse cx="558" cy="455" rx="9" ry="6" fill="url(#gCyan)"/><text x="575" y="460">charge-density difference</text></g>'
    save("hydrogen-storage.svg", b, w, h)

# 2. Charge transport (hopping lattice)
def fig_ct():
    random.seed(4)
    w, h = 800, 500
    sites = []
    for r in range(4):
        for c in range(6):
            x = 95 + c * 122 + random.uniform(-18, 18) + (r % 2) * 30
            y = 85 + r * 105 + random.uniform(-14, 14)
            sites.append((x, y, random.uniform(-40, 40)))
    b = ""
    path = [0, 7, 8, 15, 16, 23]
    for i in range(len(path) - 1):
        x1, y1, _ = sites[path[i]]; x2, y2, _ = sites[path[i+1]]
        mx, my = (x1+x2)/2, (y1+y2)/2 - 28
        b += f'<path d="M{x1:.0f},{y1:.0f} Q{mx:.0f},{my:.0f} {x2:.0f},{y2:.0f}" fill="none" stroke="{CYAN_D}" stroke-width="2.4" stroke-dasharray="6 5" marker-end="url(#arr)"/>'
    for k, (x, y, a) in enumerate(sites):
        hl = k in path
        b += (f'<g transform="translate({x:.0f},{y:.0f}) rotate({a:.0f})">'
              f'<rect x="-42" y="-9" width="84" height="18" rx="9" fill="{INK if hl else "#8796A6"}" opacity="{1 if hl else .55}"/>'
              f'<ellipse cx="-14" cy="-17" rx="16" ry="10" fill="url(#gGold)" opacity="{1 if hl else .5}"/><ellipse cx="14" cy="17" rx="16" ry="10" fill="url(#gCyan)" opacity="{1 if hl else .5}"/></g>')
    x1, y1, _ = sites[7]; x2, y2, _ = sites[8]
    b += f'<text x="{(x1+x2)/2-14:.0f}" y="{(y1+y2)/2-38:.0f}" font-size="18" font-style="italic" fill="{CYAN_D}" font-family="Literata, Georgia, serif">k<tspan font-size="12" dy="4">ij</tspan></text>'
    save("charge-transport.svg", b, w, 445)

# 3. Metal-ion batteries (intercalation)
def fig_batt():
    w, h = 800, 500
    b = ""
    for L in range(4):
        y = 110 + L * 90
        pts = []
        for i in range(19):
            x = 120 + i * 32
            yy = y + (8 if i % 2 else -8)
            pts.append(f"{x},{yy}")
        b += f'<polyline points="{" ".join(pts)}" fill="none" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>'
        for i in range(19):
            x = 120 + i * 32; yy = y + (8 if i % 2 else -8)
            b += f'<circle cx="{x}" cy="{yy}" r="5" fill="url(#gC)"/>'
    random.seed(2)
    for L in range(3):
        y = 155 + L * 90
        for i in range(5):
            x = 170 + i * 105 + random.uniform(-10, 10) + L * 20
            b += f'<circle cx="{x:.0f}" cy="{y}" r="13" fill="url(#gM)"/><text x="{x:.0f}" y="{y+5}" text-anchor="middle" font-size="12" fill="#fff" font-weight="600">+</text>'
    for k, y in enumerate((155, 245)):
        b += f'<path d="M40,{y} L100,{y}" stroke="{CYAN_D}" stroke-width="2.5" marker-end="url(#arr)"/>'
        b += f'<circle cx="28" cy="{y}" r="13" fill="url(#gM)"/><text x="28" y="{y+5}" text-anchor="middle" font-size="12" fill="#fff" font-weight="600">+</text>'
    b += f'<text x="745" y="205" font-size="15" fill="{MUTED}" text-anchor="middle">layered</text><text x="745" y="225" font-size="15" fill="{MUTED}" text-anchor="middle">electrode</text>'
    save("metal-ion-batteries.svg", b, w, 420)

# 4. Solar thermal fuels (energy diagram)
def fig_most():
    w, h = 800, 500
    def E(x):  # x in 0..1
        return (-.0 * x) + 1.25 * math.exp(-((x - .5) / .11) ** 2) + .55 * (1 / (1 + math.exp(-(x - .5) * 30)))
    pts = []
    for i in range(201):
        x = i / 200
        X = 90 + x * 600; Y = 400 - E(x) * 230
        pts.append(f"{X:.1f},{Y:.1f}")
    b = f'<line x1="70" y1="420" x2="730" y2="420" stroke="{LINE}" stroke-width="2"/><line x1="70" y1="420" x2="70" y2="60" stroke="{LINE}" stroke-width="2" marker-end="url(#arrI)"/>'
    b += f'<text x="58" y="70" font-size="15" fill="{MUTED}" text-anchor="end" transform="rotate(-90 50 70)">energy</text>'
    b += f'<polyline points="{" ".join(pts)}" fill="none" stroke="{INK}" stroke-width="3.5" stroke-linecap="round"/>'
    # photon arrow
    b += f'<path d="M150,395 L150,170" stroke="{GOLD_D}" stroke-width="3" marker-end="url(#arr)"/><path d="M118,250 q8,-10 16,0 t16,0 t16,0" fill="none" stroke="{GOLD_D}" stroke-width="2.5"/>'
    b += f'<text x="100" y="160" font-size="20" fill="{GOLD_D}" font-family="Literata, Georgia, serif" font-style="italic">hν</text>'
    b += f'<path d="M650,272 L650,395" stroke="{CYAN_D}" stroke-width="3" marker-end="url(#arr)"/><text x="664" y="345" font-size="20" fill="{CYAN_D}" font-family="Literata, Georgia, serif" font-style="italic">ΔH<tspan font-size="13" dy="4">storage</tspan></text>'
    b += f'<text x="530" y="120" font-size="15" fill="{MUTED}">back-conversion barrier</text>'
    b += f'<text x="150" y="445" font-size="15" fill="{INK}" text-anchor="middle">parent isomer</text><text x="600" y="445" font-size="15" fill="{INK}" text-anchor="middle">metastable photo-isomer</text>'
    save("solar-thermal-fuels.svg", b, w, 460)

# 5. Natural hydrogen (subsurface)
def fig_nat():
    w, h = 800, 500
    b = f'<rect x="0" y="0" width="800" height="70" fill="#E6EEF2"/>'
    layers = [(70, 150, "#D9CDB5"), (150, 225, "#8C9AA8"), (225, 380, "#C7B08C"), (380, 460, "#5E5148")]
    for y1, y2, c in layers:
        b += f'<path d="M0,{y1} C200,{y1-12} 500,{y1+14} 800,{y1-4} L800,{y2} C500,{y2+10} 200,{y2-12} 0,{y2} Z" fill="{c}"/>'
    b += f'<text x="20" y="200" font-size="14" fill="#fff">caprock (seal)</text><text x="20" y="300" font-size="14" fill="{INK}">porous reservoir</text><text x="20" y="430" font-size="14" fill="#fff">iron-bearing basement rock</text>'
    random.seed(9)
    for _ in range(26):
        x = random.uniform(330, 620); y = random.uniform(240, 440)
        b += f'<g><circle cx="{x-4:.0f}" cy="{y:.0f}" r="4.5" fill="url(#gH)" stroke="{MUTED}" stroke-width=".8"/><circle cx="{x+4:.0f}" cy="{y:.0f}" r="4.5" fill="url(#gH)" stroke="{MUTED}" stroke-width=".8"/></g>'
    for x in (380, 470, 560):
        b += f'<path d="M{x},440 C{x-20},380 {x+20},320 {x},250" fill="none" stroke="{CYAN_D}" stroke-width="2.4" stroke-dasharray="6 5" marker-end="url(#arr)"/>'
    b += f'<text x="640" y="420" font-size="14" fill="#fff">Fe²⁺ + H₂O → Fe³⁺ + H₂</text>'
    save("natural-hydrogen.svg", b, w, 465)

# 6. Multiscale pipeline
def fig_multi():
    w, h = 800, 300
    stages = [("Electronic", "DFT, TD-DFT", "Å, fs"), ("Atomistic", "MD, AIMD, ML potentials", "nm, ns"), ("Mesoscale", "kinetic Monte Carlo", "µm, µs–s")]
    b = ""
    for i, (t, m, s) in enumerate(stages):
        x = 40 + i * 255; r = 10 + i * 6
        b += f'<rect x="{x}" y="50" width="210" height="170" rx="{r}" fill="#fff" stroke="{LINE}" stroke-width="2"/>'
        b += f'<text x="{x+20}" y="92" font-size="22" fill="{INK}" font-family="Literata, Georgia, serif" font-weight="600">{t}</text>'
        b += f'<text x="{x+20}" y="124" font-size="15" fill="{CYAN_D}">{m}</text><text x="{x+20}" y="196" font-size="14" fill="{MUTED}">{s}</text>'
        if i < 2:
            b += f'<path d="M{x+216},135 L{x+249},135" stroke="{INK}" stroke-width="2.5" marker-end="url(#arrI)"/>'
    save("multiscale-pipeline.svg", b, w, 250)

def favicon():
    b = f'<rect width="64" height="64" rx="14" fill="{INK}"/>'
    b += f'<ellipse cx="22" cy="32" rx="15" ry="11" fill="{GOLD}"/><ellipse cx="42" cy="32" rx="15" ry="11" fill="{CYAN}"/><circle cx="32" cy="32" r="6" fill="#fff"/>'
    save("favicon.svg", b, 64, 64)

def og():
    w, h = 1200, 630
    b = cage_svg(975, 315, 92, metals=METALS, lobes=True, scale_atoms=1.15)
    b += f'<text x="80" y="250" font-size="58" fill="{INK}" font-family="Literata, Georgia, serif" font-weight="600">Rakesh Kumar Sahoo</text>'
    b += f'<text x="80" y="315" font-size="30" fill="{MUTED}">Computational materials physicist</text>'
    b += f'<text x="80" y="360" font-size="30" fill="{MUTED}">Hydrogen storage, charge transport, DFT</text>'
    b += f'<rect x="80" y="410" width="90" height="6" rx="3" fill="{GOLD}"/><rect x="176" y="410" width="90" height="6" rx="3" fill="{CYAN}"/>'
    save("og-image.svg", b, w, h, bg=PAPER)

fig_h2(); fig_ct(); fig_batt(); fig_most(); fig_nat(); fig_multi(); favicon(); og()
print("done")
