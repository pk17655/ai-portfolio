import { useEffect } from 'react'
import { useStore } from '@/store/useStore'

/**
 * Observes section elements (by id) and updates the active section in the
 * store, so the navbar can highlight where the user is.
 */
export function useActiveSection(ids = []) {
  const setActiveSection = useStore((s) => s.setActiveSection)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Choose the most visible section currently intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, setActiveSection])
}
