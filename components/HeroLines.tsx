'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * Animated flowing-line background for the hero.
 *
 * Motion: a single continuous horizontal drift — LEFT → RIGHT.
 * Seamless infinite loop via a duplicate field offset by the exact travel
 * vector (marquee technique), so it flows one way with no reset or flicker.
 * Transform-only (GPU friendly); respects reduced motion.
 */

const VB_W = 1600
const VB_H = 900

// Travel vector as % of the layer — purely horizontal (left → right).
const DX = 18
const DURATION = 6 // seconds (lower = faster)

type Line = { d: string; opacity: number; width: number }

// Deterministic pseudo-random so server and client render identically (no hydration flicker).
function rand(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

function buildLines(count: number, salt: number): Line[] {
  const lines: Line[] = []
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1)
    // Long, gentle, mostly-horizontal sweeps fanned across the full height.
    const sy = -140 + t * (VB_H + 280) + (rand(i, salt) - 0.5) * 60
    const slope = VB_H * 0.1 + rand(i, salt + 1) * VB_H * 0.09
    const ey = sy + slope
    const c1x = VB_W * (0.28 + rand(i, salt + 2) * 0.06)
    const c1y = sy + slope * 0.2 - (30 + rand(i, salt + 3) * 70)
    const c2x = VB_W * (0.62 + rand(i, salt + 4) * 0.06)
    const c2y = sy + slope * 0.72 + (30 + rand(i, salt + 5) * 70)
    // Extend well past the edges so the slice never reveals a line end.
    const d = `M -340 ${sy.toFixed(1)} C ${c1x.toFixed(0)} ${c1y.toFixed(1)}, ${c2x.toFixed(0)} ${c2y.toFixed(1)}, ${VB_W + 340} ${ey.toFixed(1)}`

    const depth = rand(i, salt + 6)
    const opacity = 0.1 + depth * 0.42 // some subtle, some bright → depth
    const width = depth > 0.82 ? 2.2 : depth > 0.5 ? 1.3 : 0.7
    lines.push({ d, opacity, width })
  }
  return lines
}

const LINES = buildLines(24, 7)

function Field({ gradId }: { gradId: string }) {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      fill="none"
      aria-hidden="true"
    >
      {LINES.map((l, i) => (
        <path
          key={i}
          d={l.d}
          stroke={`url(#${gradId})`}
          strokeWidth={l.width}
          strokeLinecap="round"
          opacity={l.opacity}
        />
      ))}
    </svg>
  )
}

// Shared gradient sheen (grey → white → soft violet) so the lines read premium on black.
function Defs({ id }: { id: string }) {
  return (
    <svg className="absolute w-0 h-0" aria-hidden="true">
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={VB_W} y2="0">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="20%" stopColor="#22c55e" />
          <stop offset="42%" stopColor="#4ade80" />
          <stop offset="55%" stopColor="#bbf7d0" />
          <stop offset="70%" stopColor="#a3e635" />
          <stop offset="85%" stopColor="#84cc16" />
          <stop offset="100%" stopColor="#166534" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const GRAD_ID = 'hero-line-grad'

export default function HeroLines() {
  const reduce = useReducedMotion()

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <Defs id={GRAD_ID} />
      {reduce ? (
        <Field gradId={GRAD_ID} />
      ) : (
        <motion.div
          className="absolute inset-0 will-change-transform"
          animate={{ x: ['0%', `${DX}%`] }}
          transition={{ duration: DURATION, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}
        >
          {/* Primary field */}
          <Field gradId={GRAD_ID} />
          {/* Duplicate offset left by the travel vector → fills in as the group drifts right */}
          <div className="absolute inset-0" style={{ transform: `translateX(-${DX}%)` }}>
            <Field gradId={GRAD_ID} />
          </div>
        </motion.div>
      )}
    </div>
  )
}
