import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { useIsDesktop } from '@/hooks/useMediaQuery'

/**
 * Fixed full-screen neural-network particle background rendered on <canvas>.
 * Nodes drift and connect with lines when near each other. Colors are read
 * from the live CSS theme variables, so it recolors with the theme.
 *
 * Respects prefers-reduced-motion (renders a static frame) and reduces the
 * node count on smaller screens for performance.
 */
export default function ParticleField({ enabled = true }) {
  const canvasRef = useRef(null)
  const reduced = usePrefersReducedMotion()
  const isDesktop = useIsDesktop()

  useEffect(() => {
    if (!enabled) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf = 0
    let width = 0
    let height = 0

    const readColor = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue('--c-primary')
        .trim() || '34 211 238'

    const density = isDesktop ? 90 : 40
    let nodes = []

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      const count = Math.min(
        density,
        Math.floor((width * height) / 22000)
      )
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }))
    }

    const draw = () => {
      const rgb = readColor()
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        if (!reduced) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < 0 || n.x > width) n.vx *= -1
          if (n.y < 0 || n.y > height) n.vy *= -1
        }
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgb(${rgb} / 0.7)`
        ctx.fill()

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j]
          const dx = n.x - m.x
          const dy = n.y - m.y
          const dist = Math.hypot(dx, dy)
          if (dist < 130) {
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(m.x, m.y)
            ctx.strokeStyle = `rgb(${rgb} / ${0.12 * (1 - dist / 130)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      if (!reduced) raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [enabled, reduced, isDesktop])

  if (!enabled) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-60"
    />
  )
}
