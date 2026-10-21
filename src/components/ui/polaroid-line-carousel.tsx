"use client"

import * as React from "react"
import Link from "@/components/Link"
import { useStill } from "@/lib/useStill"

/*
 * Polaroid Line Carousel — instant photos pegged to a sagging string. Drag the
 * line (or use the arrows) and the prints slide along it, swinging on their
 * pegs with the speed you give them and settling back with a little
 * overshoot; even at rest they sway in a light breeze. The one in the middle
 * is the one you're looking at.
 *
 * Drag, click a print, ←/→ and autoplay.
 *
 * 21st.dev component sent by Nick 2026-10-18 ("Everything it takes to own your town"). Copied as given, with these
 * changes only: brand type and colours, 44 px arrow buttons, an optional link per slide in the caption bar, the
 * page's Pause button and reduced motion stop the sway and the autoplay, and the painted-landscape fallback is left
 * out (every slide here has a photo).
 *
 * Nick 2026-10-20: `scrub` mode. The section holds still on screen (its sticky stage, set up by the page) and the
 * visitor's own scrolling slides the prints from the first to the last, and back again on the way up. Nothing moves
 * by itself; arrows, keys and a click scroll the page to that print. `capIcon` puts a small picture under each
 * caption title with the paragraph beside it.
 */

export type Slide = {
  image?: string
  title?: string
  /** One word of the title drawn in the main pink in the caption bar (Nick 2026-10-21: "convert" ... "lead"). */
  accent?: string
  caption?: string
  alt?: string
  /** Optional link shown in the caption bar while this print is in the middle. */
  href?: string
  linkText?: string
}

export type PolaroidLineCarouselProps = {
  slides: Slide[]
  /** Any CSS length. Default 100svh. */
  height?: number | string
  /** Width of a print in px (it shrinks on narrow screens). */
  cardWidth?: number
  /** How far the string sags in the middle, px. */
  sag?: number
  /** How much the prints swing; 0 holds them still. */
  swing?: number
  /** ms per print; 0 turns autoplay off. It waits while someone is interacting. */
  autoplay?: number
  /** Colour of the string and pegs. */
  string?: string
  background?: string
  ink?: string
  onChange?: (index: number) => void
  className?: string
  style?: React.CSSProperties
  ariaLabel?: string
  /** Drive the prints from the scroll position of the closest <section> (it must be taller than the screen). */
  scrub?: boolean
  /** Image shown under the caption title, left of the paragraph. */
  capIcon?: string
  /**
   *  Wide screens (1024 px+): the prints hang still in one row across the stage with the caption, count and buttons
   *  under them; the print the counter shows is 1.25x and swaps at an even rate with the next (Nick 2026-10-20). */
  side?: boolean
}

// #region logic
export function wrap(i: number, n: number): number {
  return n ? ((i % n) + n) % n : 0
}

export function clamp(v: number, a: number, b: number): number {
  return Math.min(b, Math.max(a, v))
}

/** Height of a string sagging by `sag` between (0, y0) and (w, y0), at x. */
export function stringY(x: number, w: number, y0: number, sag: number): number {
  const t = clamp(x / w, 0, 1)
  return y0 + 4 * sag * t * (1 - t)
}

/** One step of a critically damped spring toward target. */
export function springStep(x: number, v: number, target: number, dt: number, k = 70): [number, number] {
  const c = 2 * Math.sqrt(k)
  const nv = v + (k * (target - x) - c * v) * dt
  return [x + nv * dt, nv]
}

/** One step of a print's swing. lineVel is the prints' on-screen speed (px/s, + = moving right); a print lags behind the motion, is pulled back by gravity and damped. */
export function swingStep(a: number, w: number, lineVel: number, dt: number, gain: number): [number, number] {
  const nw = w + (-38 * a - 4.2 * w + lineVel * 0.0034 * gain) * dt
  return [clamp(a + nw * dt, -0.6, 0.6), nw]
}

/** Index of the print nearest the centre for a line offset. */
export function nearestAt(off: number, spacing: number, n: number): number {
  return clamp(Math.round(off / spacing), 0, Math.max(0, n - 1))
}

export function pad2(n: number): string {
  return n < 10 ? "0" + n : String(n)
}
// #endregion logic

const PL_CSS = [
  ".pl-root{position:relative;width:100%;overflow:hidden;overflow:clip;background:var(--pl-bg);color:var(--pl-ink);user-select:none;-webkit-user-select:none;touch-action:pan-y;outline:none;cursor:grab}",
  ".pl-root[data-drag='1']{cursor:grabbing}",
  ".pl-root:focus-visible{box-shadow:inset 0 0 0 3px #c2185b}",
  ".pl-string{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;overflow:visible}",
  ".pl-card{position:absolute;left:0;top:0;width:var(--pl-cw);transform-origin:50% 0;will-change:transform;cursor:inherit}",
  ".pl-print{margin-top:10px;background:#fff;padding:10px 10px 0;box-shadow:0 1px 2px rgba(0,0,0,.12),0 18px 30px -16px rgba(0,0,0,.4);transition:transform .5s cubic-bezier(.2,.7,.2,1),filter .5s ease}",
  ".pl-card[data-on='0'] .pl-print{transform:scale(.9);filter:saturate(.7) brightness(.96)}",
  ".pl-shot{position:relative;aspect-ratio:1;overflow:hidden;background:#ffd6e7}",
  ".pl-shot img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;display:block;pointer-events:none}",
  ".pl-note{height:56px;display:flex;align-items:center;justify-content:center;padding:0 6px;font:800 var(--text-t3)/1.1 var(--font-display);color:#141414;text-align:center;text-wrap:balance;overflow:hidden}",
  ".pl-peg{position:absolute;left:50%;top:0;width:10px;height:26px;margin-left:-5px;border-radius:2px;background:linear-gradient(90deg,#c2185b,#ff3d8b 45%,#9c1249);box-shadow:0 2px 3px rgba(0,0,0,.25)}",
  ".pl-peg::after{content:'';position:absolute;left:4px;top:8px;width:2px;height:7px;background:rgba(255,255,255,.55);border-radius:1px}",
  ".pl-bar{position:absolute;left:clamp(16px,4vw,56px);right:clamp(16px,4vw,56px);bottom:clamp(20px,4vh,40px);display:flex;flex-wrap:wrap;align-items:center;gap:12px clamp(12px,2vw,24px);cursor:default}",
  ".pl-cap{flex:1;min-width:0;overflow:hidden;padding-bottom:.15em}",
  ".pl-cap>*{display:block;animation:pl-in .55s cubic-bezier(.2,.8,.2,1) both}",
  ".pl-title{font:900 var(--text-t2)/1.15 var(--font-display);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
  ".pl-sub{margin-top:4px;max-width:44rem;font:400 var(--text-t3)/1.5 var(--font-sans);color:var(--pl-muted)}",
  ".pl-subrow{display:flex!important;align-items:center;gap:clamp(.75rem,1.5vw,1.25rem);margin-top:.6rem}",
  ".pl-subrow .pl-sub{margin-top:0}",
  ".pl-ico{flex-shrink:0;width:clamp(2.5rem,3.6vw,3.5rem);aspect-ratio:1;background:center/contain no-repeat}",
  ".pl-count{font:800 var(--text-t3)/1 var(--font-display);letter-spacing:.14em;color:var(--pl-muted)}",
  ".pl-count b{color:var(--pl-ink);font-weight:900}",
  ".pl-btn{appearance:none;width:44px;height:44px;border-radius:50%;border:2px solid var(--pl-ink);background:#fff;color:inherit;display:grid;place-items:center;cursor:pointer;transition:background .2s ease,color .2s ease}",
  ".pl-btn:hover{background:var(--pl-ink);color:#fff}",
  ".pl-link{display:inline-flex;min-height:44px;align-items:center;gap:.4rem;border-radius:999px;border:2px solid var(--pl-ink);background:#fff;padding:0 1.1rem;font:700 var(--text-t3)/1 var(--font-sans);color:var(--pl-ink);transition:background-color .2s ease,color .2s ease}",
  ".pl-link:hover{background:var(--color-ribbon);color:#fff}",
  ".pl-btn:focus-visible,.pl-link:focus-visible{outline:3px solid #c2185b;outline-offset:2px}",
  ".pl-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}",
  "@keyframes pl-in{from{transform:translateY(100%);opacity:0}to{transform:none;opacity:1}}",
  ".pl-root[data-side] .pl-card[data-on='0'] .pl-print{transform:none}",
  ".pl-bar[data-side]{bottom:clamp(28px,6vh,64px)}.pl-bar[data-side] .pl-cap{flex-basis:100%}.pl-bar[data-side] .pl-title{white-space:normal}",
  "@media (max-width:640px){.pl-cap{flex-basis:100%}.pl-count{margin-right:auto}.pl-title{white-space:normal}}",
  "@media (prefers-reduced-motion:reduce){.pl-cap>*{animation:none}.pl-print{transition:none}}",
].join("\n")

export default function PolaroidLineCarousel({
  slides,
  height = "100svh",
  cardWidth = 300,
  sag = 46,
  swing = 1,
  autoplay = 4500,
  string = "#8a7f72",
  background = "var(--color-background, #efece6)",
  ink = "var(--color-foreground, #161513)",
  onChange,
  className,
  style,
  ariaLabel = "Image carousel",
  scrub = false,
  capIcon,
  side = false,
}: PolaroidLineCarouselProps) {
  const n = slides.length
  const srcs = slides.map((sl) => sl.image || "")
  const still = useStill()
  const stillRef = React.useRef(false)
  stillRef.current = still
  const [active, setActive] = React.useState(0)
  const [dragging, setDragging] = React.useState(false)
  const [size, setSize] = React.useState({ w: 1200, h: 800, cw: cardWidth, y: 0, side: false })
  const rootRef = React.useRef(null as HTMLDivElement | null)
  const pathRef = React.useRef(null as SVGPathElement | null)
  const cards = React.useRef([] as (HTMLDivElement | null)[])
  // Side layout: highest the caption bar has reached (px from the stage top) since the last resize; the row of
  // finished prints has to stay above it whichever caption is showing.
  const barTop = React.useRef(Infinity)
  const sim = React.useRef({ off: 0, vel: 0, target: 0, exit: 0, a: [] as number[], w: [] as number[] })
  const drag = React.useRef(null as null | { x: number; off: number; lx: number; lt: number; v: number; moved: boolean })
  const lastTouch = React.useRef(0)
  const activeRef = React.useRef(0)
  const opts = React.useRef({ sag, swing })
  opts.current = { sag, swing }

  const spacing = size.cw * 1.08
  // Scrub mode is on only while the page has made the section tall (motion allowed); reduced motion keeps the plain carousel.
  const scrubbing = React.useRef(false)
  // The run is the closest [data-scrub] element; its sticky child (the stage holding this carousel) stays on screen
  // while the run scrolls past, and progress 0..1 is how far through that the page is.
  const scrubRun = () => {
    const run = rootRef.current ? (rootRef.current.closest("[data-scrub]") as HTMLElement | null) : null
    const stage = rootRef.current?.parentElement
    if (!run || !stage) return null
    const top0 = parseFloat(getComputedStyle(stage).top) || 0
    return { run, top0, len: run.offsetHeight - stage.offsetHeight }
  }
  const scrubProgress = () => {
    const g = scrubRun()
    if (!g || g.len <= 0) return 0
    return clamp((g.top0 - g.run.getBoundingClientRect().top) / g.len, 0, 1)
  }
  /** 0..1 over the first 15% of a screen of scrolling after the stage lets go (the hold has ended). */
  const scrubExit = () => {
    const g = scrubRun()
    if (!g || g.len <= 0) return 0
    return clamp((g.top0 - g.run.getBoundingClientRect().top - g.len) / (window.innerHeight * 0.15), 0, 1)
  }
  React.useEffect(() => {
    const g = scrubRun()
    scrubbing.current = scrub && !!g && g.len > 80
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrub, size])
  /** Scroll the page so print i is the one in the middle. */
  const scrollToPrint = (i: number) => {
    const g = scrubRun()
    if (!g) return
    const top = g.run.getBoundingClientRect().top + window.scrollY - g.top0
    window.scrollTo({ top: top + (clamp(i, 0, n - 1) / Math.max(1, n - 1)) * g.len, behavior: "smooth" })
  }
  const goTo = React.useCallback(
    (i: number) => {
      sim.current.target = clamp(i, 0, n - 1) * spacing
    },
    [n, spacing],
  )

  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const ro = new ResizeObserver(() => {
      const r = root.getBoundingClientRect()
      // Optional fixed string height from CSS (--pl-line-y), so the page can raise the line without resizing the stage.
      const y = parseFloat(getComputedStyle(root).getPropertyValue("--pl-line-y")) || 0
      // The print is a square photo plus ~86 px of frame and note, hanging from the string. Below the caption bar, or
      // (side layout) beside it, where only the stage height limits it.
      const wide = side && r.width >= 1024
      const bar = root.querySelector(".pl-bar") as HTMLElement | null
      const room = wide ? r.height - y - sag - 86 - 40 : y ? r.height - y - sag - 86 - 24 - (bar ? r.bottom - bar.getBoundingClientRect().top : 0) : r.height * 0.42
      // Side layout: four prints side by side across the stage, each with room to grow to 1.25x beside its neighbours
      // (centre to centre is a quarter of the row; 1.25/2 + 1/2 = 1.125 print widths plus a 24 px gap).
      const rowPad = Math.max(16, Math.min(56, r.width * 0.04))
      const cw = wide
        ? Math.round(Math.max(150, Math.min(cardWidth, ((r.width - 2 * rowPad) / Math.max(1, n) - 24) / 1.125)))
        : Math.round(Math.max(150, Math.min(cardWidth, r.width * 0.42, room)))
      barTop.current = bar ? bar.getBoundingClientRect().top - r.top : Infinity
      setSize({ w: r.width, h: r.height, cw, y, side: wide })
    })
    ro.observe(root)
    const bar = root.querySelector(".pl-bar")
    const rb = new ResizeObserver(() => {
      if (bar) barTop.current = Math.min(barTop.current, bar.getBoundingClientRect().top - root.getBoundingClientRect().top)
    })
    if (bar) rb.observe(bar)
    return () => { ro.disconnect(); rb.disconnect() }
  }, [cardWidth, sag, side, n])

  // keep the target on the active print when the spacing changes
  React.useEffect(() => {
    sim.current.target = activeRef.current * spacing
    sim.current.off = activeRef.current * spacing
  }, [spacing])

  React.useEffect(() => {
    onChange?.(active)
  }, [active, onChange])

  // the simulation, written straight to the DOM each frame
  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let visible = true
    let raf = 0
    let prev = performance.now()
    const S = sim.current
    const frame = (now: number) => {
      raf = 0
      if (!visible) return
      const dt = Math.min(0.033, (now - prev) / 1000)
      prev = now
      const { w, h, cw } = size
      const pad = Math.max(16, Math.min(56, w * 0.04))
      const y0 = size.y || Math.max(40, h * 0.2)
      if (scrubbing.current) S.target = scrubProgress() * (n - 1) * spacing
      // Side layout (Nick 2026-10-20): the four prints hang still in one row and the one the counter shows is 1.25x.
      // Between two counts the old one shrinks and the new one grows at an even rate, over the middle 40% of the scroll
      // between them (the counter flips halfway). Once the hold ends, the last one goes back to 1x.
      // fit: shrinks the whole row if the grown print would reach the caption on a short screen.
      const rowX = (i: number) => pad + ((w - 2 * pad) * (i + 0.5)) / Math.max(1, n)
      const fit = Number.isFinite(barTop.current) ? clamp((barTop.current - 24 - (y0 + opts.current.sag)) / (1.25 * (cw + 56)), 0.5, 1) : 1
      S.exit += ((scrubbing.current && size.side ? scrubExit() : 0) - S.exit) * Math.min(1, dt * 12)
      const d = drag.current
      let lineVel: number
      if (d && d.moved) {
        lineVel = d.v * 1000
      } else {
        const before = S.off
        ;[S.off, S.vel] = springStep(S.off, S.vel, S.target, dt)
        // The row itself never moves, so scrolling gives it no swing.
        lineVel = size.side ? 0 : -(S.off - before) / Math.max(dt, 1e-3)
      }
      const o = opts.current
      const g = reduce || stillRef.current ? 0 : o.swing
      const near = nearestAt(S.off, spacing, n)
      for (let i = 0; i < n; i++) {
        const el = cards.current[i]
        if (!el) continue
        let x = w / 2 + i * spacing - S.off
        let sc = 1
        if (size.side) {
          x = rowX(i)
          const k = S.off / spacing
          let grow = clamp(1 - (Math.abs(i - k) - 0.3) / 0.4, 0, 1)
          if (i === n - 1) grow *= 1 - S.exit
          sc = fit * (1 + 0.25 * grow)
        }
        if (x < -cw * 1.5 || x > w + cw * 1.5) {
          el.style.visibility = "hidden"
          continue
        }
        el.style.visibility = "visible"
        let a = S.a[i] || 0
        let av = S.w[i] || 0
        ;[a, av] = swingStep(a, av, lineVel, dt, g)
        if (g) a += Math.sin(now / 1300 + i * 1.7) * 0.0009 * g
        S.a[i] = a
        S.w[i] = av
        const y = stringY(x, w, y0, o.sag) - 6
        el.style.transform = "translate(" + (x - cw / 2).toFixed(1) + "px," + y.toFixed(1) + "px) rotate(" + a.toFixed(4) + "rad)" + (sc !== 1 ? " scale(" + sc.toFixed(4) + ")" : "")
        el.style.zIndex = String(i === near ? n + 1 : n - Math.abs(i - near))
      }
      pathRef.current?.setAttribute("d", "M0 " + y0 + " Q" + w / 2 + " " + (y0 + 2 * o.sag) + " " + w + " " + y0)
      if (near !== activeRef.current) {
        activeRef.current = near
        setActive(near)
      }
      raf = requestAnimationFrame(frame)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !raf) {
        prev = performance.now()
        raf = requestAnimationFrame(frame)
      }
    })
    io.observe(root)
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [size, spacing, n])

  // autoplay, back to the first print after the last
  React.useEffect(() => {
    if (!autoplay || n < 2) return
    const t = window.setInterval(() => {
      if (stillRef.current || document.hidden || drag.current || performance.now() - lastTouch.current < autoplay) return
      goTo(activeRef.current >= n - 1 ? 0 : activeRef.current + 1)
    }, autoplay)
    return () => window.clearInterval(t)
  }, [autoplay, n, goTo])

  const onDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest(".pl-bar")) return
    if (scrubbing.current) {
      const card = (e.target as HTMLElement).closest("[data-i]")
      if (card) scrollToPrint(Number(card.getAttribute("data-i")))
      return
    }
    lastTouch.current = performance.now()
    drag.current = { x: e.clientX, off: sim.current.off, lx: e.clientX, lt: e.timeStamp, v: 0, moved: false }
  }
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true
      setDragging(true)
      rootRef.current?.setPointerCapture(e.pointerId)
    }
    if (!d.moved) return
    const dt = Math.max(1, e.timeStamp - d.lt)
    d.v = 0.7 * ((e.clientX - d.lx) / dt) + 0.3 * d.v
    d.lx = e.clientX
    d.lt = e.timeStamp
    const max = (n - 1) * spacing
    let off = d.off - dx
    if (off < 0) off *= 0.35
    if (off > max) off = max + (off - max) * 0.35
    sim.current.off = off
  }
  const onUp = (e: React.PointerEvent) => {
    const d = drag.current
    drag.current = null
    lastTouch.current = performance.now()
    if (!d) return
    if (d.moved) {
      setDragging(false)
      sim.current.vel = -d.v * 1000
      goTo(nearestAt(sim.current.off - d.v * 180, spacing, n))
      return
    }
    const card = (e.target as HTMLElement).closest("[data-i]")
    if (card) goTo(Number(card.getAttribute("data-i")))
  }
  const step = (dir: number) => {
    lastTouch.current = performance.now()
    if (scrubbing.current) return scrollToPrint(activeRef.current + dir)
    goTo(clamp(activeRef.current + dir, 0, n - 1))
  }
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") step(1)
    else if (e.key === "ArrowLeft") step(-1)
    else return
    e.preventDefault()
  }

  const s = slides[active] || {}

  return (
    <div
      ref={rootRef}
      className={["pl-root", className].filter(Boolean).join(" ")}
      style={{
        height,
        ["--pl-bg" as string]: background,
        ["--pl-ink" as string]: ink,
        ["--pl-muted" as string]: "color-mix(in srgb, var(--pl-ink) 55%, transparent)",
        ["--pl-line" as string]: "color-mix(in srgb, var(--pl-ink) 18%, transparent)",
        ["--pl-cw" as string]: size.cw + "px",
        ...style,
      }}
      data-drag={dragging ? "1" : "0"}
      data-side={size.side ? "1" : undefined}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKey}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <style>{PL_CSS}</style>
      <svg className="pl-string" aria-hidden="true">
        <path ref={pathRef} fill="none" stroke={string} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {slides.map((sl, i) => (
        <div key={i} className="pl-card" data-i={i} data-on={i === active ? "1" : "0"} ref={(el) => void (cards.current[i] = el)} aria-hidden={i === active ? undefined : true}>
          <div className="pl-print">
            <div className="pl-shot">{srcs[i] ? <img src={srcs[i]} alt={sl.alt || sl.title || ""} draggable={false} /> : null}</div>
            <div className="pl-note">{sl.title || ""}</div>
          </div>
          <div className="pl-peg" />
        </div>
      ))}
      <div className="pl-bar" data-side={size.side ? "1" : undefined} >
        <div className="pl-cap" key={active}>
          {s.title ? <span className="pl-title">{s.accent && s.title.includes(s.accent) ? <>{s.title.slice(0, s.title.indexOf(s.accent))}<span style={{ color: "var(--color-ribbon)" }}>{s.accent}</span>{s.title.slice(s.title.indexOf(s.accent) + s.accent.length)}</> : s.title}</span> : null}
          {s.caption && capIcon ? (
            <span className="pl-subrow">
              <span className="pl-ico" aria-hidden="true" style={{ backgroundImage: "url(" + capIcon + ")" }} />
              <span className="pl-sub">{s.caption}</span>
            </span>
          ) : s.caption ? <span className="pl-sub">{s.caption}</span> : null}
        </div>
        <span className="pl-count" aria-hidden="true">
          <b>{pad2(active + 1)}</b> / {pad2(n)}
        </span>
        <button type="button" className="pl-btn" aria-label="Previous" onClick={() => step(-1)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
        <button type="button" className="pl-btn" aria-label="Next" onClick={() => step(1)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
        {s.href ? (
          <Link href={s.href} className="pl-link">
            {s.linkText || "Learn more"}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </Link>
        ) : null}
      </div>
      <div className="pl-sr" aria-live="polite">
        {"Print " + (active + 1) + " of " + n + (s.title ? ": " + s.title : "")}
      </div>
    </div>
  )
}

