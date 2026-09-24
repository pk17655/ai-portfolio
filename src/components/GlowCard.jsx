import { useRef, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Glassmorphism card with a spotlight glow that follows the cursor and a
 * subtle 3D tilt. Falls back to a plain card under reduced motion.
 */
export default function GlowCard({ children, className = '', tilt = true, ...rest }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  const [style, setStyle] = useState({})
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false })

  const handleMove = (e) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setGlow({ x: px * 100, y: py * 100, on: true })
    if (tilt) {
      setStyle({
        transform: `perspective(900px) rotateX(${(0.5 - py) * 6}deg) rotateY(${
          (px - 0.5) * 6
        }deg)`,
      })
    }
  }

  const reset = () => {
    setStyle({ transform: 'perspective(900px) rotateX(0) rotateY(0)' })
    setGlow((g) => ({ ...g, on: false }))
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={style}
      className={`card-surface relative overflow-hidden transition-transform duration-200 ${className}`}
      {...rest}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          opacity: glow.on ? 1 : 0,
          background: `radial-gradient(320px circle at ${glow.x}% ${glow.y}%, rgb(var(--c-primary) / 0.14), transparent 60%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
