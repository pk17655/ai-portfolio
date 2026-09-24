import { create } from 'zustand'
import theme from '@/config/theme.json'
import { applyTheme, getInitialTheme, persistTheme } from '@/utils/applyTheme'

/**
 * Lightweight global state (Zustand).
 *  - theme:        'dark' | 'light'
 *  - activeSection id used by the navbar highlight
 *  - splashDone:   whether the intro splash finished
 *  - menuOpen:     mobile nav state
 *  - flags:        feature toggles sourced from theme.json
 */
export const useStore = create((set, get) => ({
  theme: getInitialTheme(),
  activeSection: 'hero',
  splashDone: !theme.flags?.enableSplashScreen,
  menuOpen: false,
  flags: theme.flags || {},

  setTheme: (mode) => {
    applyTheme(mode)
    persistTheme(mode)
    set({ theme: mode })
  },

  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    persistTheme(next)
    set({ theme: next })
  },

  setActiveSection: (id) => {
    if (get().activeSection !== id) set({ activeSection: id })
  },

  finishSplash: () => set({ splashDone: true }),

  setMenuOpen: (open) => set({ menuOpen: open }),
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),
}))
