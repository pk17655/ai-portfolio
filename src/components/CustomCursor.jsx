import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'
import { useIsDesktop } from '@/hooks/useMediaQuery'

/**
 * Glowing dot cursor with a trailing ring and particle sparks.
 * Automatically disabled on touch devices and when reduced motion is set.
 */
export default function CustomCursor({ enabled = true }) {
  const dot = useRef(null)
  const ring = useRef(null)
  const [hovering, setHovering] = useState(false)
  const reduced = usePrefersReducedMotion()
  const isDesktop = useIsDesktop()
  const active = enabled && isDesktop && !reduced

  useEffect(() => {
    if (!active) {
      document.body.removeAttribute('data-cursor')
      return
    }
    document.body.setAttribute('data-cursor', 'on')

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...mouse }
    let raf = 0

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`
      }
      const t = e.target
      const interactive =
        t.closest('a, button, [role="button"], input, textarea, .cursor-pointer')
      setHovering(Boolean(interactive))
    }

    const loop = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.18
      ringPos.y += (mouse.y - ringPos.y) * 0.18
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      document.body.removeAttribute('data-cursor')
    }
  }, [active])

  if (!active) return null

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-glow"
        style={{ marginLeft: '-4px', marginTop: '-4px' }}
      />
      <div
        ref={ring}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[99] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/60 transition-[width,height,opacity,background-color] duration-200 ${
          hovering ? 'h-12 w-12 bg-primary/10' : 'h-8 w-8 bg-transparent'
        }`}
        style={{ marginLeft: '-16px', marginTop: '-16px' }}
      />
    </>
  )
}
