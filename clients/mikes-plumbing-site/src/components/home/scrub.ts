// Home scroll-scrubbed moments (Nick, 17 Nov): progress follows the scroll (ScrollTrigger scrub on the Lenis scroll that
// motion.ts drives), never a clock. Only transform, opacity and stroke-dashoffset are written, each by one writer here.
// Without html.motion (reduced motion, no JS) nothing runs and the markup's final state shows: water full, stops lit,
// needles at rest, routes drawn.
//   [data-pipe-water]  seam pipes (pathLength=1): water fills as the seam crosses the viewport
//   [data-flow]        "How a job goes": water runs the pipe, a bead leads it, stops 01-05 light up as it reaches them,
//                      the flow chevrons behind it brighten, the gauge needle rises
//   [data-dial]        24h dial: [data-dial-needle] sweeps from data-from to data-to degrees as the section crosses
//   [data-route-scrub] map routes (pathLength=1, dashed via mask): draw out from Riverside with the scroll
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const html = document.documentElement;
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

function seams() {
  $$<SVGPathElement>('[data-pipe-water]').forEach((p) => {
    const svg = p.ownerSVGElement ?? p;
    gsap.fromTo(p, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: svg, start: 'top 92%', end: 'bottom 45%', scrub: 0.8 } });
  });
}

function flow() {
  const sec = document.querySelector<HTMLElement>('[data-flow]');
  if (!sec) return;
  const stops = $$('.stp', sec);
  const mm = gsap.matchMedia();
  const setup = (sel: string, start: string, end: string) => {
    const svg = sec.querySelector<SVGSVGElement>(sel);
    const water = svg?.querySelector<SVGPathElement>('.pw-water');
    if (!svg || !water) return;
    const head = svg.querySelector<SVGGElement>('.pw-head');
    const needle = sec.querySelector<HTMLElement>('[data-gauge-needle]');
    const chev = $$<SVGGElement>('.chev', svg);
    const len = water.getTotalLength();
    // Where along the pipe each stop and chevron sits: nearest of 600 samples to its centre (in the svg's own units).
    const N = 600; const pts: DOMPoint[] = [];
    for (let i = 0; i <= N; i++) pts.push(water.getPointAtLength((len * i) / N) as DOMPoint);
    const near = (x: number, y: number) => { let b = 0; let d = Infinity; pts.forEach((p, i) => { const e = (p.x - x) ** 2 + (p.y - y) ** 2; if (e < d) { d = e; b = i; } }); return b / N; };
    const inv = svg.getScreenCTM()?.inverse();
    const at = stops.map((s) => {
      const r = s.querySelector('.hx')!.getBoundingClientRect();
      const p = new DOMPoint(r.left + r.width / 2, r.top + r.height / 2).matrixTransform(inv);
      return near(p.x, p.y);
    });
    const cat = chev.map((c) => near(+c.dataset.x!, +c.dataset.y!));
    const gAt = needle ? near(+(needle.dataset.x ?? 0), +(needle.dataset.y ?? 0)) : 1;
    const lit = stops.map(() => false);
    const render = (p: number) => {
      water.style.strokeDashoffset = String(1 - p);
      if (head) {
        const q = water.getPointAtLength(len * p);
        head.setAttribute('transform', `translate(${q.x.toFixed(1)} ${q.y.toFixed(1)})`);
        head.style.opacity = p > 0.002 && p < 0.995 ? '1' : '0';
      }
      stops.forEach((s, i) => { const on = p >= at[i] - 0.004; if (on !== lit[i]) { lit[i] = on; s.classList.toggle('is-lit', on); } });
      chev.forEach((c, i) => c.classList.toggle('is-on', p >= cat[i]));
      if (needle) gsap.set(needle, { rotation: -160 + 120 * Math.min(1, p / Math.max(gAt, 0.01)) });
    };
    sec.classList.add('is-scrub');
    const st = { p: 0 };
    render(0);
    const tw = gsap.to(st, { p: 1, ease: 'none', onUpdate: () => render(st.p), scrollTrigger: { trigger: svg, start, end, scrub: 0.8 } });
    return () => { tw.scrollTrigger?.kill(); tw.kill(); sec.classList.remove('is-scrub'); render(1); stops.forEach((s) => s.classList.add('is-lit')); if (needle) gsap.set(needle, { clearProps: 'transform' }); };
  };
  mm.add('(min-width: 1024px)', () => setup('.pw-d', 'top 90%', 'bottom 68%'));
  mm.add('(max-width: 1023px)', () => setup('.pw-m', 'top 80%', 'bottom 70%'));
}

function dial() {
  $$('[data-dial]').forEach((d) => {
    const n = d.querySelector<HTMLElement>('[data-dial-needle]');
    if (!n) return;
    const from = +(n.dataset.from ?? -120); const to = +(n.dataset.to ?? 0);
    const svgO = n.dataset.origin ? { svgOrigin: n.dataset.origin } : {};
    gsap.fromTo(n, { rotation: from, ...svgO }, { rotation: to, ...svgO, ease: 'none', scrollTrigger: { trigger: d, start: 'top 85%', end: 'center 45%', scrub: 0.8 } });
  });
}

function routes() {
  $$<SVGPathElement>('[data-route-scrub]').forEach((p, i) => {
    const svg = p.ownerSVGElement ?? p;
    gsap.fromTo(p, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: svg, start: `top ${80 - i * 3}%`, end: `center ${45 - i * 3}%`, scrub: 0.8 } });
  });
}

let built = false;
function build() {
  if (built || !html.classList.contains('motion')) return;
  built = true;
  seams(); flow(); dial(); routes();
  ScrollTrigger.refresh();
}
window.addEventListener('pbp:handoff', () => requestAnimationFrame(build), { once: true });
window.setTimeout(build, 4500);
