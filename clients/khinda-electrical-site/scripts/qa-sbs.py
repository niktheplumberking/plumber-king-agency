import sys
from PIL import Image
# sbs.py ref.png build.png out.png refY refH buildY buildH
ref, bld, out, ry, rh, by, bh = sys.argv[1:8]; ry, rh, by, bh = map(int, (ry, rh, by, bh))
a = Image.open(ref).crop((0, ry, Image.open(ref).width, ry + rh)); b = Image.open(bld).crop((0, by, Image.open(bld).width, by + bh))
W = a.width; H = max(rh, bh); im = Image.new('RGB', (W * 2 + 20, H), (255, 0, 255)); im.paste(a, (0, 0)); im.paste(b, (W + 20, 0)); im.save(out)
