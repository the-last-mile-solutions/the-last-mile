/**
 * Road geometry. Pure functions, no DOM, so they are easy to reason about and test.
 *
 * The lit road is a chain of cubic curves through the anchors with vertical tangents at every anchor.
 * That gives smooth S curves between stops that sit at different x positions, and a path whose
 * y always increases, which keeps the marker moving down the page with the scroll.
 *
 * The sketch road follows the same anchors but is jittery and broken at the start (the prototype)
 * and calms down to a plain dashed guide line from the first service stop onward.
 */

export type AnchorKind = 'start' | 'hero' | 'kink' | 'stop' | 'mark' | 'merge' | 'end' | 'via'

export interface Anchor {
  x: number
  y: number
  kind: AnchorKind
  /** Optional id of the element this anchor belongs to, used to toggle lit states */
  id?: string
}

const r = (n: number) => Math.round(n * 10) / 10

/** Control points for the segment a to b with vertical tangents at both ends. */
function ctrl(a: Anchor, b: Anchor) {
  const dy = b.y - a.y
  const k = Math.abs(b.x - a.x) > 4 ? 0.5 : 0.35
  return { c1: { x: a.x, y: a.y + dy * k }, c2: { x: b.x, y: b.y - dy * k } }
}

/** One cubic segment as path data, without the leading move. */
export function segment(a: Anchor, b: Anchor) {
  const { c1, c2 } = ctrl(a, b)
  return `C${r(c1.x)} ${r(c1.y)} ${r(c2.x)} ${r(c2.y)} ${r(b.x)} ${r(b.y)}`
}

export function cleanPath(pts: Anchor[]) {
  if (pts.length < 2) return ''
  let d = `M${r(pts[0].x)} ${r(pts[0].y)}`
  for (let i = 1; i < pts.length; i++) d += segment(pts[i - 1], pts[i])
  return d
}

/** Path data for the first n segments, used to measure the length at each anchor. */
export function prefixPath(pts: Anchor[], n: number) {
  return cleanPath(pts.slice(0, n + 1))
}

/** Small seeded random so the sketch looks the same on every load and every resize. */
function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

function cubicAt(a: Anchor, b: Anchor, t: number) {
  const { c1, c2 } = ctrl(a, b)
  const u = 1 - t
  return {
    x: u * u * u * a.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * b.x,
    y: u * u * u * a.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * b.y,
  }
}

export interface SketchOptions {
  /** Max sideways wobble in px at the very start. Shrinks to 0 by the first stop. */
  amplitude: number
  /** Size of the starting scribble in px. */
  scribble: number
  seed?: number
}

/**
 * Returns two path strings:
 * rough: the scribble plus a jittery, broken line from the start to the first service stop.
 * calm: a clean guide line from the first service stop to the end, drawn dashed in CSS.
 */
export function sketchPaths(pts: Anchor[], opts: SketchOptions) {
  const rand = rng(opts.seed ?? 7)
  const firstStop = Math.max(1, pts.findIndex((p) => p.kind === 'stop'))
  const p0 = pts[0]
  const s = opts.scribble

  // The scribble: a few overlapping loops tangled around the start, like a pen testing ideas.
  let rough = `M${r(p0.x - s * 0.2)} ${r(p0.y - s * 1.1)}`
  const loops = 4
  for (let i = 0; i < loops; i++) {
    const w = s * (0.9 - i * 0.12) * (0.8 + rand() * 0.4)
    const cy = p0.y - s * 0.6 + i * s * 0.28
    rough += `C${r(p0.x + w)} ${r(cy - w * 0.6)} ${r(p0.x + w * 0.9)} ${r(cy + w * 0.7)} ${r(p0.x)} ${r(cy + w * 0.5)}`
    rough += `C${r(p0.x - w * 0.9)} ${r(cy + w * 0.3)} ${r(p0.x - w * 0.8)} ${r(cy - w * 0.5)} ${r(p0.x + (rand() - 0.5) * 8)} ${r(cy - w * 0.1)}`
  }
  rough += `L${r(p0.x)} ${r(p0.y)}`

  // Jittery, broken line from the start to the first stop.
  const steps = 7
  for (let i = 1; i <= firstStop; i++) {
    const a = pts[i - 1]
    const b = pts[i]
    const fade = 1 - (i - 1) / firstStop
    const amp = opts.amplitude * fade * fade
    const gapAt = b.kind === 'kink' ? Math.floor(steps * 0.55) : -1
    for (let j = 1; j <= steps; j++) {
      const t = j / steps
      const p = cubicAt(a, b, t)
      const jx = j === steps ? 0 : (rand() - 0.5) * 2 * amp
      const jy = j === steps ? 0 : (rand() - 0.5) * amp * 0.6
      rough += `${j === gapAt ? 'M' : 'L'}${r(p.x + jx)} ${r(p.y + jy)}`
    }
  }

  const calm = cleanPath(pts.slice(firstStop))
  return { rough, calm }
}
