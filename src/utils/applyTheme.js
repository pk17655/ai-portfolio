import { hexToRgbChannels } from './helpers'
import themeConfig from '@/config/theme.json'

const VAR_MAP = {
  bg: '--c-bg',
  bgAlt: '--c-bg-alt',
  surface: '--c-surface',
  surfaceAlt: '--c-surface-alt',
  border: '--c-border',
  text: '--c-text',
  textMuted: '--c-text-muted',
  primary: '--c-primary',
  secondary: '--c-secondary',
  accent: '--c-accent',
  glow: '--c-glow',
}

/**
 * Apply a color mode ("dark" | "light") to :root by writing CSS variables
 * derived from theme.json. Also toggles the `dark` class for Tailwind and sets
 * the animation-speed multiplier.
 */
export function applyTheme(mode = 'dark') {
  const palette = themeConfig.colors[mode] || themeConfig.colors.dark
  const root = document.documentElement

  Object.entries(VAR_MAP).forEach(([key, cssVar]) => {
    if (palette[key]) {
      root.style.setProperty(cssVar, hexToRgbChannels(palette[key]))
    }
  })

  root.classList.toggle('dark', mode === 'dark')
  root.classList.toggle('light', mode === 'light')

  // Animation speed multiplier from presets
  const preset = themeConfig.animation?.speed || 'normal'
  const multiplier = themeConfig.animation?.presets?.[preset] ?? 1
  root.style.setProperty('--anim-speed', String(multiplier))

  // Keep the browser UI (mobile status bar) in sync
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', palette.bg)
}

export function getInitialTheme() {
  try {
    const saved = localStorage.getItem('pk-theme')
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    /* ignore storage errors */
  }
  return themeConfig.flags?.defaultTheme || 'dark'
}

export function persistTheme(mode) {
  try {
    localStorage.setItem('pk-theme', mode)
  } catch {
    /* ignore storage errors */
  }
}

/** Animation duration helper — scales a base duration by the theme multiplier. */
export function scaledDuration(base) {
  const multiplier = Number(
    getComputedStyle(document.documentElement).getPropertyValue('--anim-speed') || 1
  )
  return base * (multiplier || 1)
}
