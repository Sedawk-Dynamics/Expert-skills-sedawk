'use client'

import { useEffect, useState } from 'react'

/**
 * HeroLines — radial speed-line animation matching the webel.io reference.
 *
 * Style: ~55 ultra-thin lines that all converge toward / diverge from a single
 * focal point (bottom-right quadrant). Each line is a long straight or very
 * gently curved path; every line animates with its own stroke-dashoffset so it
 * appears to *travel along its own path* continuously — the visual result is a
 * premium "speed burst / light rays / fiber optic" feel.
 *
 * Brand colors: XpertsEdge greens only (deep → lime).
 * Depth layers: bg (slow, very dim) / mid / fg (fast, slightly brighter).
 * No container translateX. No Math.random (deterministic → no hydration diff).
 * prefers-reduced-motion: pauses animation, lines shown at rest.
 * pointer-events-none, z-0.
 */

// ─── viewport coordinate space ────────────────────────────────────────────────
const VW = 1440
const VH = 900

// ─── focal point — lines converge here (bottom-right, slightly outside) ───────
const FX = VW * 0.78   // 1123  — right of centre
const FY = VH * 1.10   // 990   — below the bottom edge

// ─── brand greens ─────────────────────────────────────────────────────────────
const GREENS = [
  '#14532d', // deep forest
  '#166534', // dark green
  '#15803d', // mid green
  '#16a34a', // green
  '#22c55e', // emerald
  '#4ade80', // bright green
  '#86efac', // light green
  '#a3e635', // lime
  '#84cc16', // yellow-green
]

// ─── deterministic PRNG (no Math.random) ─────────────────────────────────────
function rand(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

// ─── line data type ───────────────────────────────────────────────────────────
interface LineData {
  id: string
  d: string        // SVG path string
  stroke: string
  opacity: number
  width: number
  dashLen: number  // visible portion of the stroke
  totalLen: number // estimated path length
  duration: number // animation duration in seconds
  delay: number    // animation delay in seconds
}

// ─── line builder ─────────────────────────────────────────────────────────────
function buildLines(): LineData[] {
  const lines: LineData[] = []

  /**
   * Strategy: cast a ray from the focal point (FX, FY) outward in a given
   * direction angle θ. The ray extends far off-screen in both directions so
   * it always crosses the viewport regardless of angle. A slight quadratic
   * bow is added to each line so they look organic rather than perfectly
   * straight.
   *
   * Angles are distributed across a ~180° fan that covers the full hero:
   *   θ = 90°–270° means rays going left / upper-left / lower-left from focal
   */

  // Total lines
  const TOTAL = 55

  // Angle range: spread from ~100° to ~260° (going upper-left to lower-left)
  // This fans lines from focal point (bottom-right) across the whole canvas
  const ANGLE_START = 95   // degrees
  const ANGLE_END   = 265  // degrees

  for (let i = 0; i < TOTAL; i++) {
    const s = (n: number) => rand(i * 37 + n * 7919)

    // ── angular position in the fan ──────────────────────────────────────────
    // Slightly cluster lines toward 130°–200° (upper-left sweep) so the hero
    // gets the dense centre burst of the reference image.
    const t = i / (TOTAL - 1)
    // Non-uniform distribution: bias toward mid-range using sin curve
    const biased = 0.5 + 0.5 * Math.sin((t - 0.5) * Math.PI)
    const angleDeg = ANGLE_START + biased * (ANGLE_END - ANGLE_START)
      + (s(1) - 0.5) * 18  // ±9° jitter per line
    const angle = (angleDeg * Math.PI) / 180

    const cosA = Math.cos(angle)
    const sinA = Math.sin(angle)

    // Extend the ray 2200 units in the outward direction and 800 in reverse
    const t1 = -800          // behind focal point
    const t2 = 2200 + s(2) * 400  // out into / past the canvas

    const x1 = FX + cosA * t1
    const y1 = FY + sinA * t1
    const x2 = FX + cosA * t2
    const y2 = FY + sinA * t2

    // ── gentle quadratic bow so lines aren't perfectly straight ──────────────
    // Control point offset perpendicular to the ray direction
    const perp = (s(3) - 0.5) * 180  // ±90 units perpendicular bow
    const mx = (x1 + x2) / 2 + (-sinA) * perp
    const my = (y1 + y2) / 2 + cosA  * perp

    const d = `M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`

    // ── depth layer by index bucket ───────────────────────────────────────────
    const depthT = s(4)  // 0–1
    let opacity: number
    let width: number
    let duration: number
    let colorPool: string[]

    if (depthT < 0.65) {
      // background: very dim, thin, slow
      opacity = 0.05 + s(5) * 0.10       // 0.05–0.15
      width   = 0.3 + s(6) * 0.35        // 0.3–0.65 px
      duration = 20 + s(7) * 16          // 20–36 s
      colorPool = GREENS.slice(0, 5)
    } else if (depthT < 0.88) {
      // mid: moderate
      opacity = 0.15 + s(5) * 0.18       // 0.15–0.33
      width   = 0.5 + s(6) * 0.55        // 0.5–1.05 px
      duration = 12 + s(7) * 10          // 12–22 s
      colorPool = GREENS.slice(2, 7)
    } else {
      // foreground: a handful of slightly brighter accent lines
      opacity = 0.32 + s(5) * 0.22       // 0.32–0.54
      width   = 0.9 + s(6) * 0.55        // 0.9–1.45 px
      duration = 7 + s(7) * 7            // 7–14 s
      colorPool = GREENS.slice(4)
    }

    const delay = s(8) * duration * 0.9  // stagger across one full cycle

    // Estimated path length: roughly the chord length (bow is small)
    const chord = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    const totalLen = chord * 1.05

    // Visible dash: short enough to look like a travelling streak
    const dashLen = 250 + s(9) * 550     // 250–800 units

    const color = colorPool[Math.floor(s(10) * colorPool.length)]

    lines.push({
      id: `hl-${i}`,
      d,
      stroke: color,
      opacity,
      width,
      dashLen,
      totalLen,
      duration,
      delay,
    })
  }

  return lines
}

// Computed once at module level — deterministic, safe for SSR / hydration
const LINES = buildLines()

// ─── CSS keyframe string ──────────────────────────────────────────────────────
const KEYFRAMES = `
@keyframes hl-dash {
  from { stroke-dashoffset: var(--hl-from); }
  to   { stroke-dashoffset: var(--hl-to);   }
}
`

// ─── component ────────────────────────────────────────────────────────────────
export default function HeroLines() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = () => setReduced(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <style>{KEYFRAMES}</style>

      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        fill="none"
      >
        <defs>
          {/*
            Radial fade mask: opaque in the main viewing area, fades toward
            all edges so lines appear and disappear naturally.
          */}
          <radialGradient
            id="hl-radial-fade"
            cx="50%" cy="50%" r="65%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%"   stopColor="white" stopOpacity="1" />
            <stop offset="70%"  stopColor="white" stopOpacity="0.85" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          {/* Linear fade on left edge — lines entering from left fade in */}
          <linearGradient id="hl-left-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor="white" stopOpacity="0" />
            <stop offset="12%" stopColor="white" stopOpacity="1" />
            <stop offset="88%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          {/*
            Combined mask: use the left-fade gradient so lines smoothly appear/
            disappear at the horizontal edges, which is the most visible seam.
          */}
          <mask id="hl-mask">
            <rect width={VW} height={VH} fill="url(#hl-left-fade)" />
          </mask>
        </defs>

        <g mask="url(#hl-mask)">
          {LINES.map((line) => {
            /*
             * Animate stroke-dashoffset from totalLen → -(dashLen) so the
             * visible dash travels from the "behind the focal point" tail all
             * the way to the far end of the ray and then disappears, looping
             * seamlessly.
             */
            const fromOffset = line.totalLen
            const toOffset   = -(line.dashLen)

            const pathStyle: React.CSSProperties = reduced
              ? {}
              : ({
                  '--hl-from': `${fromOffset}`,
                  '--hl-to':   `${toOffset}`,
                  strokeDasharray:  `${line.dashLen} ${line.totalLen}`,
                  strokeDashoffset: fromOffset,
                  animation: `hl-dash ${line.duration}s linear ${line.delay}s infinite`,
                } as React.CSSProperties)

            return (
              <path
                key={line.id}
                d={line.d}
                stroke={line.stroke}
                strokeWidth={line.width}
                strokeLinecap="round"
                opacity={reduced ? line.opacity * 0.35 : line.opacity}
                style={pathStyle}
              />
            )
          })}
        </g>
      </svg>
    </div>
  )
}
