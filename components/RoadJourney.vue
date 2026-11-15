<script setup lang="ts">
/**
 * The homepage journey. One SVG road, one mile marker, one scrubbed timeline.
 *
 * Everything the road needs comes from the DOM: elements marked data-road-anchor are the points it
 * passes through, in document order. Service stops are rendered from content/services.ts, so the
 * number of stops, their spacing and their labels follow that file with nothing hard coded here.
 *
 * Server HTML has no SVG road at all. Without JavaScript a CSS rail and lit nodes stand in for it
 * (see .journey styles). GSAP loads after first paint and only then is the road drawn.
 */
import { cleanPath, prefixPath, sketchPaths, segment, type Anchor, type AnchorKind } from '~/utils/road'

const journey = ref<HTMLElement | null>(null)
const svg = ref<SVGSVGElement | null>(null)
const lit = ref<SVGPathElement | null>(null)
const marker = ref<SVGGElement | null>(null)
const glow = ref<SVGCircleElement | null>(null)
const ready = ref(false)

const geo = reactive({
  w: 0,
  h: 0,
  lit: '',
  rough: '',
  calm: '',
  mergeL: '',
  mergeR: '',
})

type Gsap = typeof import('gsap').gsap
let gsap: Gsap | null = null
let ST: typeof import('gsap/ScrollTrigger').ScrollTrigger | null = null
let mm: gsap.MatchMedia | null = null
let ro: ResizeObserver | null = null
let lastW = 0
let lastH = 0
let timer: ReturnType<typeof setTimeout> | undefined

function readAnchors(): Anchor[] {
  const root = journey.value!
  const box = root.getBoundingClientRect()
  return [...root.querySelectorAll<HTMLElement>('[data-road-anchor]')]
    .map((el) => {
      const b = el.getBoundingClientRect()
      return {
        x: b.left + b.width / 2 - box.left,
        y: b.top + b.height / 2 - box.top,
        kind: el.dataset.roadAnchor as AnchorKind,
        id: el.dataset.roadId,
      }
    })
    .filter((a) => Number.isFinite(a.x) && Number.isFinite(a.y))
    .sort((a, b) => a.y - b.y)
}

function mergeLines(pts: Anchor[], spread: number, rise: number) {
  const m = pts.find((p) => p.kind === 'merge')
  if (!m) return { l: '', r: '' }
  const side = (dx: number): string => {
    const a: Anchor = { x: m.x + dx, y: m.y - rise, kind: 'via' }
    return `M${a.x} ${a.y}` + segment(a, m)
  }
  return { l: side(-spread), r: side(spread) }
}

function lengthsAt(pts: Anchor[]) {
  const tmp = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  svg.value!.appendChild(tmp)
  const out = [0]
  for (let i = 1; i < pts.length; i++) {
    tmp.setAttribute('d', prefixPath(pts, i))
    out.push(tmp.getTotalLength())
  }
  tmp.remove()
  return out
}

function setLit(els: NodeListOf<HTMLElement> | HTMLElement[], on: boolean) {
  for (const el of els) el.classList.toggle('is-lit', on)
}

function build(desktop: boolean, reduce: boolean) {
  if (!gsap || !ST || !journey.value) return
  const g = gsap
  const root = journey.value
  const pts = readAnchors()
  if (pts.length < 2) return

  geo.w = root.offsetWidth
  geo.h = root.offsetHeight
  geo.lit = cleanPath(pts)
  const sk = sketchPaths(pts, desktop ? { amplitude: 22, scribble: 46 } : { amplitude: 7, scribble: 18 })
  geo.rough = sk.rough
  geo.calm = sk.calm
  const ml = mergeLines(pts, desktop ? 64 : 16, desktop ? 240 : 140)
  geo.mergeL = ml.l
  geo.mergeR = ml.r
  root.classList.add('road-ready')
  ready.value = true

  return nextTick().then(() => {
    const path = lit.value!
    const L = path.getTotalLength()
    const at = lengthsAt(pts)
    const litEls = (id?: string) =>
      id ? root.querySelectorAll<HTMLElement>(`[data-road-lit="${id}"]`) : ([] as unknown as NodeListOf<HTMLElement>)
    const merges = root.querySelectorAll<SVGPathElement>('.road-merge')
    const mergeLen = merges[0]?.getTotalLength() ?? 0
    const stops = pts.filter((p) => p.kind === 'stop').length
    const glowBase = 0.28

    g.set(path, { strokeDasharray: L, strokeDashoffset: L })
    merges.forEach((m) => g.set(m, { strokeDasharray: mergeLen, strokeDashoffset: mergeLen }))
    g.set(marker.value, { x: pts[0].x, y: pts[0].y })
    g.set(glow.value, { opacity: glowBase })

    if (reduce) {
      // Finished state: road fully drawn and lit, every stop lit, marker parked at the end.
      const end = pts[pts.length - 1]
      g.set(path, { strokeDashoffset: 0 })
      merges.forEach((m) => g.set(m, { strokeDashoffset: 0 }))
      g.set(marker.value, { x: end.x, y: end.y })
      g.set(glow.value, { opacity: 1 })
      root.querySelectorAll<HTMLElement>('[data-road-lit]').forEach((el) => el.classList.add('is-lit'))
      return
    }

    // Gentle rise for blocks that start below the fold. Transform only: the text is never hidden.
    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) return
      g.from(el, { y: 28, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 94%', once: true } })
    })

    // One master timeline. Each segment lasts as long as its vertical distance, so the marker keeps
    // a steady place in the viewport while the road scrolls beneath it.
    const tl = g.timeline({ paused: true, defaults: { ease: 'none' } })
    const times: { t: number; id?: string }[] = []
    let t = 0
    let stopIndex = 0
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1]
      const b = pts[i]
      const dur = Math.max(1, b.y - a.y)
      // Ease into and out of service stops so the marker settles at each one.
      const ease = b.kind === 'stop' || a.kind === 'stop' ? 'sine.inOut' : 'none'
      tl.fromTo(path, { strokeDashoffset: L - at[i - 1] }, { strokeDashoffset: L - at[i], duration: dur, ease }, t)
      tl.to(
        marker.value,
        { duration: dur, ease, motionPath: { path, start: at[i - 1] / L, end: at[i] / L } },
        t,
      )
      t += dur
      if (b.kind === 'stop') {
        stopIndex++
        tl.to(glow.value, { opacity: glowBase + ((1 - glowBase) * stopIndex) / (stops + 1), duration: dur * 0.15 }, t - dur * 0.1)
      }
      if (b.kind === 'merge') {
        merges.forEach((m) => tl.to(m, { strokeDashoffset: 0, duration: dur * 0.8 }, t - dur * 0.8))
      }
      if (b.kind === 'end') tl.to(glow.value, { opacity: 1, duration: dur * 0.2 }, t - dur * 0.2)
      times.push({ t, id: b.id })
    }
    // The first segment untangles the scribble: it fades back as the clean road leaves it.
    if (pts.length > 1) tl.to('.road-rough-scribble', { opacity: 0.35, duration: times[0].t }, 0)

    const start = 0
    const end = Math.max(1, pts[pts.length - 1].y - pts[0].y)
    const total = t
    let lastLit = -1
    ST!.create({
      trigger: root,
      start: () => start,
      end: () => Math.min(end, ST!.maxScroll(window)),
      scrub: desktop ? 0.6 : 0.4,
      animation: tl,
      invalidateOnRefresh: false,
      onUpdate(self) {
        const now = self.progress * total
        let n = -1
        for (let k = 0; k < times.length; k++) if (times[k].t <= now + 2) n = k
        if (n === lastLit) return
        for (let k = 0; k < times.length; k++) {
          if (times[k].id) setLit(litEls(times[k].id), k <= n)
        }
        lastLit = n
      },
    })
  })
}

async function init() {
  const [{ gsap: g }, { ScrollTrigger }, { MotionPathPlugin }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('gsap/MotionPathPlugin'),
  ])
  g.registerPlugin(ScrollTrigger, MotionPathPlugin)
  gsap = g
  ST = ScrollTrigger
  await document.fonts?.ready
  setup()

  ro = new ResizeObserver(() => {
    const el = journey.value
    if (!el) return
    // Ignore tiny height changes (mobile browser bars). Rebuild on width or real layout changes.
    if (el.offsetWidth === lastW && Math.abs(el.offsetHeight - lastH) < 40) return
    clearTimeout(timer)
    timer = setTimeout(setup, 200)
  })
  ro.observe(journey.value!)
}

function setup() {
  if (!gsap || !journey.value) return
  lastW = journey.value.offsetWidth
  lastH = journey.value.offsetHeight
  mm?.revert()
  mm = gsap.matchMedia()
  mm.add(
    {
      desktop: '(min-width: 1024px)',
      mobile: '(max-width: 1023.98px)',
      reduce: '(prefers-reduced-motion: reduce)',
    },
    (ctx) => {
      const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean }
      build(desktop, reduce)?.then(() => ST?.refresh())
      return () => {
        journey.value?.querySelectorAll('.is-lit').forEach((el) => el.classList.remove('is-lit'))
      }
    },
  )
}

onMounted(() => {
  const go = () => init().catch(() => {
    /* Motion is an enhancement. If it fails, the CSS road and full copy remain. */
  })
  if ('requestIdleCallback' in window) requestIdleCallback(go, { timeout: 1200 })
  else setTimeout(go, 300)
})

onBeforeUnmount(() => {
  clearTimeout(timer)
  ro?.disconnect()
  mm?.revert()
  journey.value?.classList.remove('road-ready')
})
</script>

<template>
  <div ref="journey" class="journey relative">
    <svg
      v-show="ready"
      ref="svg"
      class="road-svg pointer-events-none absolute left-0 top-0"
      :width="geo.w"
      :height="geo.h"
      :viewBox="`0 0 ${geo.w || 1} ${geo.h || 1}`"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="marker-glow">
          <stop offset="0" stop-color="rgb(var(--c-accent))" stop-opacity=".55" />
          <stop offset=".45" stop-color="rgb(var(--c-accent))" stop-opacity=".16" />
          <stop offset="1" stop-color="rgb(var(--c-accent))" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="lit-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="rgb(var(--c-lit))" stop-opacity=".55" />
          <stop offset=".25" stop-color="rgb(var(--c-lit))" stop-opacity=".9" />
          <stop offset="1" stop-color="rgb(var(--c-lit))" stop-opacity="1" />
        </linearGradient>
      </defs>
      <path class="road-rough road-rough-scribble" :d="geo.rough" />
      <path class="road-calm" :d="geo.calm" />
      <path v-if="geo.mergeL" class="road-merge" :d="geo.mergeL" />
      <path v-if="geo.mergeR" class="road-merge" :d="geo.mergeR" />
      <path ref="lit" class="road-lit" :d="geo.lit" />
      <g ref="marker" class="road-marker">
        <circle ref="glow" r="44" fill="url(#marker-glow)" />
        <rect x="-7" y="-10" width="14" height="20" rx="4" class="marker-post" />
        <rect x="-3.5" y="-4.5" width="7" height="1.8" rx=".9" class="marker-line" />
      </g>
    </svg>
    <slot />
  </div>
</template>

<style>
.road-svg {
  z-index: 0;
  overflow: visible;
}
.road-rough {
  fill: none;
  stroke: rgb(var(--c-muted) / 0.38);
  stroke-width: 1.25;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 7 6 2 6;
}
.road-calm {
  fill: none;
  stroke: rgb(var(--c-muted) / 0.28);
  stroke-width: 1.25;
  stroke-dasharray: 2 9;
  stroke-linecap: round;
}
.road-merge {
  fill: none;
  stroke: rgb(var(--c-lit) / 0.6);
  stroke-width: 1.5;
  stroke-linecap: round;
}
.road-lit {
  fill: none;
  stroke: url(#lit-fade);
  stroke-width: 2.25;
  stroke-linecap: round;
}
.marker-post {
  fill: rgb(var(--c-accent));
}
.marker-line {
  fill: rgb(var(--c-accent-ink));
}
.road-marker {
  will-change: transform;
}
</style>
