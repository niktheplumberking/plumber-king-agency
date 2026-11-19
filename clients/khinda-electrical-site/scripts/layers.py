"""List layer ids inside a section (or one object in it) of the page SVG, with depth.  Part 3 helper for cut-obj.py.
usage: python3 scripts/layers.py <page> <d|m> "<section name>" [maxdepth=3] ["<object name>"]"""
import os, sys, re
from lxml import etree
CACHE = os.environ.get('KCACHE') or '/mnt/project-files/plumber-king-agency/clients/khinda-electrical/handoff/build-cache'
pg, fr, secname = sys.argv[1:4]; md = int(sys.argv[4]) if len(sys.argv) > 4 else 3; obj = sys.argv[5] if len(sys.argv) > 5 else None
root = etree.parse(f'{CACHE}/sec/{pg}.svg', etree.XMLParser(huge_tree=True)).getroot(); NS = '{http://www.w3.org/2000/svg}'
def name(e):
    i = e.get('id') or ''
    try: i = i.encode('latin1').decode('utf8')
    except Exception: pass
    return i
frame = [e for e in root.iter(NS + 'g') if ('desktop' if fr == 'd' else 'mobile') in name(e).lower()][0]
sec = frame if secname == '*' else next(e for e in frame.iter() if re.sub(r'_\d+$', '', name(e)) == secname)
if obj: sec = next(e for e in sec.iter() if re.sub(r'_\d+$', '', name(e)) == obj)
def walk(e, d):
    for c in e:
        if not isinstance(c.tag, str) or c.tag in (NS + 'defs',): continue
        n = name(c)
        if n: print('  ' * d + f'{c.tag.replace(NS, "")} {n}')
        if d < md: walk(c, d + 1 if n else d)
walk(sec, 0)
