# Draws static/favicon.svg, a flat likeness of the Liquid Glass app icon, from the
# layer SVGs Icon Composer was built from (1024 canvas, back to front). Points are
# scaled to the 100 grid and thinned to 0.4 apart, which no favicon size can show.
# Usage: python3 scripts/build-favicon-svg.py
import math, os, re
F = os.path.expanduser('~/Code/ios/Meontor/docs/design/icon/final/')
OUT = os.path.join(os.path.dirname(__file__), '..', 'static', 'favicon.svg')
K=100/1024
def path(name, tol=0.4):
    d=re.search(r' d="([^"]+)"', open(F+name+'.svg').read()).group(1)
    out=[]
    for sub in re.findall(r'M[^M]*', d):
        pts=[(float(x)*K,float(y)*K) for x,y in re.findall(r'(-?[\d.]+),(-?[\d.]+)', sub)]
        keep=[pts[0]]
        for p in pts[1:]:
            if math.dist(p,keep[-1])>=tol: keep.append(p)
        f=lambda v: ('%.2f'%v).rstrip('0').rstrip('.')
        out.append('M'+' '.join(f'{f(x)},{f(y)}' for x,y in keep)+'Z')
    return ''.join(out)
svg=('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
 '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1C1F29"/><stop offset="1" stop-color="#0A0D14"/></linearGradient></defs>'
 '<rect width="100" height="100" rx="22" fill="url(#g)"/>'
 f'<path fill="#6378E0" fill-opacity="0.65" fill-rule="evenodd" d="{path("petals-b")}"/>'
 f'<path fill="#7D94F0" fill-opacity="0.85" fill-rule="evenodd" d="{path("petals-a")}"/>'
 f'<path fill="#7D94F0" fill-rule="evenodd" d="{path("star")}"/>'
 f'<path fill="#7D94F0" fill-rule="evenodd" d="{path("dot")}"/>'
 '</svg>')
open(OUT, 'w').write(svg)
print(len(svg))
