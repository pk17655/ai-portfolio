/** Convert a #rrggbb hex string into "r g b" space-separated channels
 *  for use in CSS `rgb(var(--x) / <alpha>)`. */
export function hexToRgbChannels(hex) {
  const clean = String(hex).replace('#', '').trim()
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean
  const int = parseInt(full, 16)
  const r = (int >> 16) & 255
  const g = (int >> 8) & 255
  const b = int & 255
  return `${r} ${g} ${b}`
}

/** Clamp a number between min and max. */
export const clamp = (n, min, max) => Math.min(Math.max(n, min), max)

/** Simple debounce. */
export function debounce(fn, wait = 120) {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), wait)
  }
}

/** Format a "start"–"end" duration string. */
export const formatRange = (start, end) => `${start} — ${end}`

/** Very small, dependency-free email validity check. */
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim())
