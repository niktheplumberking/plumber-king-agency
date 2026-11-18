// Home "How a job goes" (Process.astro, [data-flow]): water runs the pipe, a bead leads it, stops 01-05 light up as it reaches
// them, the flow chevrons behind it brighten, the gauge needle rises. B14: each time the water passes stop 02 going forward,
// the red valve wheel spins once (+180 deg speeding up in 0.6 s, then +180 more slowing to a stop in 1.4 s, power3.out);
// under 1024 px the wheel is hidden, so stop 02's hex nut turns instead. The spin is a timed tween (it plays out even if
// the reader stops scrolling); a new forward pass during a spin waits for it to end. Writer: GSAP `rotation` (transform)
// on .wheel / the stop-02 hex svgs; idle's valve gesture uses the separate `rotate` property, so they add up. Progress follows the scroll (scrub), never a clock.
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
    // Where along the pipe each stop and chevron sits: nearest of 600 samples to its centre (in the svg's own units).
    // Round 2 (TBT): the 600 getPointAtLength samples cost ~700 ms at 4x CPU, so they are no longer taken at load. They are
    // taken in small idle chunks once the section is within ~1.5 screens (IntersectionObserver), and synchronously only if
    // the scrub needs them before that (a jump straight to the section). render(0) needs none of it.
    const N = 600; const pts: DOMPoint[] = [];
    let len = 0; let at: number[] = []; let cat: number[] = []; let gAt = 1; let ready = false;
    const near = (x: number, y: number) => { let b = 0; let d = Infinity; pts.forEach((p, i) => { const e = (p.x - x) ** 2 + (p.y - y) ** 2; if (e < d) { d = e; b = i; } }); return b / N; };
    const sample = (upTo: number) => { if (!len) len = water.getTotalLength(); for (let i = pts.length; i <= Math.min(N, upTo); i++) pts.push(water.getPointAtLength((len * i) / N) as DOMPoint); };
    const finish = () => {
      if (ready) return; sample(N);
      const inv = svg.getScreenCTM()?.inverse();
      at = stops.map((s) => { const r = s.querySelector('.hx')!.getBoundingClientRect(); const p = new DOMPoint(r.left + r.width / 2, r.top + r.height / 2).matrixTransform(inv); return near(p.x, p.y); });
      cat = chev.map((c) => near(+c.dataset.x!, +c.dataset.y!));
      gAt = needle ? near(+(needle.dataset.x ?? 0), +(needle.dataset.y ?? 0)) : 1;
      ready = true; (window as any).__flowReady = performance.now();
    };
    const idle = (fn: () => void) => ('requestIdleCallback' in window ? (window as any).requestIdleCallback(fn, { timeout: 400 }) : window.setTimeout(fn, 16));
    const chunk = () => { if (ready) return; if (pts.length > N) { finish(); return; } sample(pts.length + 40); idle(chunk); };
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); idle(chunk); } }, { rootMargin: '150% 0px 150% 0px' });
    io.observe(svg);
    const lit = stops.map(() => false);
    // B14: the valve (desktop) or the stop-02 nut (phone) spins once per forward pass of stop 02.
    const wheel = sec.querySelector<SVGSVGElement>('.wheel');
    const spinEls: Element[] = wheel && wheel.getClientRects().length ? [wheel] : $$('.hx svg', stops[1] ?? sec);
    const spinOrigin = spinEls[0] === wheel ? '50% 30.61%' : '50% 50%';
    let spinning: gsap.core.Timeline | null = null; let prevP = 0;
    const spin = () => {
      if (spinning?.isActive() || !spinEls.length) return;
      const r0 = Number(gsap.getProperty(spinEls[0], 'rotation')) || 0;
      spinning = gsap.timeline()
        .to(spinEls, { rotation: r0 + 180, transformOrigin: spinOrigin, duration: 0.6, ease: 'power2.in' })
        .to(spinEls, { rotation: r0 + 360, duration: 1.4, ease: 'power3.out' });
      (window as any).__spins = ((window as any).__spins || 0) + 1;
    };
    const setNeedle = needle ? gsap.quickSetter(needle, 'rotation', 'deg') as (v: number) => void : null;
    const render = (p: number) => {
      drawTo(water, p);
      if (p > 0 && !ready) finish();
      if (head) {
        // interpolated between the samples, not a new geometry call per frame
        const f = Math.min(N, Math.max(0, p * N)); const i0 = Math.floor(f); const i1 = Math.min(N, i0 + 1); const k = f - i0;
        const q = ready ? { x: pts[i0].x + (pts[i1].x - pts[i0].x) * k, y: pts[i0].y + (pts[i1].y - pts[i0].y) * k } : { x: 0, y: 0 };
        head.setAttribute('transform', `translate(${q.x.toFixed(1)} ${q.y.toFixed(1)})`);
        head.style.opacity = p > 0.002 && p < 0.995 ? '1' : '0';
      }
      stops.forEach((s, i) => { const on = ready && p >= at[i] - 0.004; if (on !== lit[i]) { lit[i] = on; s.classList.toggle('is-lit', on); if (on && i === 1 && p > prevP) spin(); } });
      prevP = p;
      chev.forEach((c, i) => c.classList.toggle('is-on', ready && p >= cat[i]));
      setNeedle?.(-160 + 120 * Math.min(1, p / Math.max(gAt, 0.01)));
    };
    sec.classList.add('is-scrub');
    const st = { p: 0 };
    render(0);
    const tw = gsap.to(st, { p: 1, ease: 'none', onUpdate: () => render(st.p), scrollTrigger: { trigger: svg, start, end, scrub: 0.8 } });
    return () => { io.disconnect(); finish(); spinning?.kill(); gsap.set(spinEls, { clearProps: 'transform' }); tw.scrollTrigger?.kill(); tw.kill(); sec.classList.remove('is-scrub'); render(1); stops.forEach((s) => s.classList.add('is-lit')); if (needle) gsap.set(needle, { clearProps: 'transform' }); };
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
