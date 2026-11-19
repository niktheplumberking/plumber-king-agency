"""Cut named Figma layers into one SVG with a TIGHT viewBox = a Figma rect (page px), at any page's own export scale.
Part 3 tool (art.py assumes Home's 0.291676 scale; other pages were exported at their own scale, read here from the
frame's tf in sec/bbox-<page>.json).
usage: python3 scripts/cut-obj.py <page> <d|m> "<section name>" <x,y,w,h page px> <out.svg> "<layer>" [...]
layer syntax as art.py: name | name#k | name* | name@class | "." (the whole section); "!name" / "!prefix*" drops
matching descendants from every picked layer (e.g. a frame without its text-bearing child frames); "~name@class"
adds a class to matching descendants (states driven by CSS).
The SVG gets width=w height=h, so place it at the rect's x/y with width w (desktop) or scale it (mobile)."""
import os, sys, re, copy, json
from lxml import etree
CACHE = os.environ.get('KCACHE') or '/mnt/project-files/plumber-king-agency/clients/khinda-electrical/handoff/build-cache'
pg, fr, secname, rect, out = sys.argv[1:6]; layers = sys.argv[6:]
x, y, w, h = [float(v) for v in rect.split(',')]
ox = oy = s = None
for f in json.load(open(f'{CACHE}/sec/bbox-{pg}.json'))['frames']:
    if not f.get('tf') or not re.search('desktop' if fr == 'd' else 'mobile', f['id'], re.I): continue
    t = re.search(r'translate\(([-0-9.]+) ([-0-9.]+)\)(?: scale\(([-0-9.]+)\))?', f['tf'])
    ox, oy, s = float(t.group(1)), float(t.group(2)), float(t.group(3) or 1); break
tree = etree.parse(f'{CACHE}/sec/{pg}.svg', etree.XMLParser(huge_tree=True))
root = tree.getroot(); NS = '{http://www.w3.org/2000/svg}'
def name(e):
    i = e.get('id') or ''
    try: i = i.encode('latin1').decode('utf8')
    except Exception: pass
    return re.sub(r'_\d+$', '', i)
frame = [e for e in root.iter(NS + 'g') if ('desktop' if fr == 'd' else 'mobile') in name(e).lower()][0]
sec = frame if secname == '*' else next(e for e in frame.iter() if name(e) == secname)
picked, tagged, drop, sub = [], {}, [], []
TXT, NOIMG = set(), False
norm = lambda t: re.sub(r'\s+', '', t)
for L in layers:
    if L == '!@img': NOIMG = True; continue
    if L == '!@text':
        # copy texts that sit directly in the section (depth 2 rows): HTML renders them instead
        rows = json.load(open(f"{CACHE}/{pg}/{'desktop' if fr == 'd' else 'mobile'}.json"))['rows']; on = False
        for r in rows:
            if r[0] == 1: on = secname == '*' or r[2] == secname or secname.startswith(r[2])
            elif on and r[0] == 2 and r[1] == 'T': TXT.add(norm(r[7])[:30]); TXT.add(norm(r[7]))
        continue
    if L.startswith('!'): drop.append(L[1:]); continue
    if L.startswith('~'): n_, c_ = L[1:].rsplit('@', 1); sub.append((n_, c_)); continue
    cls = None
    if '@' in L: L, cls = L.rsplit('@', 1)
    allm = L.endswith('*'); k = 1
    if allm: L = L[:-1]
    elif '#' in L: L, k = L.rsplit('#', 1); k = int(k)
    ms = [e for e in sec.iter() if name(e) == L and e is not sec] if L != '.' else [sec]
    if not ms: print('MISSING', L, file=sys.stderr); continue
    new = ms if allm else [ms[k - 1]]
    for e in new:
        if cls: tagged[id(e)] = cls
    picked += new
def dump(e):
    c = copy.deepcopy(e)
    if id(e) in tagged: c.set('class', tagged[id(e)])
    for n_, c_ in sub:
        for z in c.iter():
            if name(z) == n_ or (n_.endswith('*') and name(z).startswith(n_[:-1])): z.set('class', c_)
    for d in drop:
        for z in [q for q in c.iter() if name(q) == d or (d.endswith('*') and name(q).startswith(d[:-1]))]:
            if z.getparent() is not None: z.getparent().remove(z)
    if TXT:
        for z in [q for q in c if q.tag == NS + 'path' and (norm(name(q)) in TXT or norm(name(q))[:30] in TXT)]:
            c.remove(z)
    if NOIMG:
        for z in [q for q in c.iter() if 'url(#pattern' in (q.get('fill') or '')]:
            if z.getparent() is not None: z.getparent().remove(z)
    return etree.tostring(c).decode()
body = ''.join(dump(e) for e in picked)
body = re.sub(r'\sxmlns(:\w+)?="[^"]*"', '', body)
defs = root.find(NS + 'defs')
refs = set(re.findall(r'url\(#([^)]+)\)', body)) | set(re.findall(r'href="#([^"]+)"', body))
dd = ''
if defs is not None:
    for d in defs:
        if d.get('id') in refs: dd += re.sub(r'\sxmlns(:\w+)?="[^"]*"', '', etree.tostring(d).decode())
refs |= set(re.findall(r'url\(#([^)]+)\)', dd)) | set(re.findall(r'href="#([^"]+)"', dd))
if defs is not None:
    for d in defs:
        if d.get('id') in refs and d.get('id') not in dd: dd += re.sub(r'\sxmlns(:\w+)?="[^"]*"', '', etree.tostring(d).decode())
keep = lambda m: m.group(0) if m.group(1) in refs else ''
body = re.sub(r'\sid="([^"]*)"', keep, body); dd = re.sub(r'\sid="([^"]*)"', keep, dd)
# unique ids per file (several cuts inline on one page)
tag = re.sub(r'\W', '', os.path.basename(out).split('.')[0])[:12]
for r in sorted(refs, key=len, reverse=True):
    body = body.replace(f'"{r}"', f'"{tag}{r}"').replace(f'#{r})', f'#{tag}{r})').replace(f'"#{r}"', f'"#{tag}{r}"')
    dd = dd.replace(f'"{r}"', f'"{tag}{r}"').replace(f'#{r})', f'#{tag}{r})').replace(f'"#{r}"', f'"#{tag}{r}"')
vb = f'{ox + x * s:.3f} {oy + y * s:.3f} {w * s:.3f} {h * s:.3f}'
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" width="{int(w)}" height="{int(h)}" fill="none" aria-hidden="true" focusable="false" overflow="visible">' + (f'<defs>{dd}</defs>' if dd else '') + body + '</svg>'
sys.path.insert(0, f'{CACHE}/tools')
try:
    import fixrx; fixrx.K = s
    svg = fixrx.fix(svg)
    # Figma's scaled export also leaves stroke widths / dashes of rect / circle / ellipse / line primitives in node px
    # (a 1.5 px outline came out 3x thick); flattened <path> strokes are already in export units.
    def _sw(tag):
        return re.sub(r'\b(stroke-width|stroke-dasharray)="([-0-9. ,]+)"', lambda m: m.group(1) + '="' + ' '.join(str(round(float(v) * s, 4)) for v in re.split(r'[ ,]+', m.group(2).strip())) + '"', tag.group(0))
    svg = re.sub(r'<(rect|circle|ellipse|line)\b[^>]*>', _sw, svg)
    # stroke-inset rects keep px radii like 17.25 (r 18 minus half the stroke): fixrx only catches whole / half numbers
    svg = re.sub(r'\b(r[xy])="([0-9.]+)"', lambda m: f'{m.group(1)}="{round(float(m.group(2)) * s, 4)}"' if float(m.group(2)) >= 2 and abs(float(m.group(2)) * 4 - round(float(m.group(2)) * 4)) < 1e-6 and abs(float(m.group(2)) * 2 - round(float(m.group(2)) * 2)) > 1e-6 else m.group(0), svg)
except Exception as ex: print('fixrx skipped', ex, file=sys.stderr)
open(out, 'w').write(svg)
print(out, len(svg), 'bytes', len(picked), 'els', 'scale', s)
