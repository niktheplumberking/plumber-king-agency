// Home "How a job goes" (Process.astro, [data-flow]): water runs the pipe, a bead leads it, stops 01-05 light up as it reaches
// them, the flow chevrons behind it brighten, the gauge needle rises. Progress follows the scroll (scrub), never a clock.
// Built on the kit (kit/scrub.ts drawTo, kit/settle.ts): the water path is written unitless by one writer; stop and chevron
// positions are measured once per build (layout is never read during the scroll); the CSS start state under html.motion
// (Process.astro) equals render(0). Without html.motion nothing runs and the markup's final state shows.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { drawTo } from '../kit/scrub';
import { settled, requestRefresh } from '../kit/settle';

gsap.registerPlugin(ScrollTrigger);
const html = document.documentElement;
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

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
    const setNeedle = needle ? gsap.quickSetter(needle, 'rotation', 'deg') as (v: number) => void : null;
    const render = (p: number) => {
      drawTo(water, p);
      if (head) {
        const q = water.getPointAtLength(len * p); // geometry, not layout
        head.setAttribute('transform', `translate(${q.x.toFixed(1)} ${q.y.toFixed(1)})`);
        head.style.opacity = p > 0.002 && p < 0.995 ? '1' : '0';
      }
      stops.forEach((s, i) => { const on = p >= at[i] - 0.004; if (on !== lit[i]) { lit[i] = on; s.classList.toggle('is-lit', on); } });
      chev.forEach((c, i) => c.classList.toggle('is-on', p >= cat[i]));
      setNeedle?.(-160 + 120 * Math.min(1, p / Math.max(gAt, 0.01)));
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

let built = false;
function build() {
  if (built || !html.classList.contains('motion')) return;
  built = true;
  flow();
  settled().then(() => requestRefresh(0));
}
window.addEventListener('pbp:handoff', () => requestAnimationFrame(build), { once: true });
window.setTimeout(build, 4500);
