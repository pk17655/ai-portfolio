import { useEffect, useRef, useState } from 'react'

/**
 * Tracks mouse position. Returns { x, y } in pixels and a normalized
 * { nx, ny } in the range [-1, 1] relative to the viewport center — handy for
 * parallax and 3D head-tracking. Reads are throttled to animation frames.
 */
export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0, nx: 0, ny: 0 })
  const frame = useRef(0)

  useEffect(() => {
    const onMove = (e) => {
      if (frame.current) return
      frame.current = requestAnimationFrame(() => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1
        const ny = (e.clientY / window.innerHeight) * 2 - 1
        setPos({ x: e.clientX, y: e.clientY, nx, ny })
        frame.current = 0
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [])

  return pos
}
