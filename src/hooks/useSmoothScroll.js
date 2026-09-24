import { useEffect } from 'react'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from './useReducedMotion'

/**
 * Initializes Lenis smooth scrolling and exposes a global `window.__lenis`
 * instance so anchor links can scroll smoothly. Disabled when the user
 * prefers reduced motion.
 */
export function useSmoothScroll(enabled = true) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!enabled || reduced) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    window.__lenis = lenis

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      window.__lenis = null
    }
  }, [enabled, reduced])
}

/** Smoothly scroll to a section id, respecting Lenis when available. */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -72 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
