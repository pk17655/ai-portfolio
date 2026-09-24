import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { SECTIONS } from '@/utils/sections'
import { useStore } from '@/store/useStore'
import { scrollToId } from '@/hooks/useSmoothScroll'
import personal from '@/config/personal.json'
import theme from '@/config/theme.json'
import ThemeToggle from './ThemeToggle'
import Icon from './Icon'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const active = useStore((s) => s.activeSection)
  const menuOpen = useStore((s) => s.menuOpen)
  const setMenuOpen = useStore((s) => s.setMenuOpen)
  const toggleMenu = useStore((s) => s.toggleMenu)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => {
    setMenuOpen(false)
    scrollToId(id)
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-borderc/80 bg-bg/70 py-2 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent py-4'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Brand */}
          <button
            onClick={() => go('hero')}
            className="group flex items-center gap-2"
            aria-label="Back to top"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/50 bg-surface/50 font-bold text-primary shadow-glow-sm">
              {theme.brand || 'PK'}
            </span>
            <span className="hidden font-mono text-sm text-content sm:inline">
              {personal.name}
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => go(s.id)}
                  className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${
                    active === s.id
                      ? 'text-primary'
                      : 'text-muted hover:text-content'
                  }`}
                >
                  {s.label}
                  {active === s.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-primary shadow-glow"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={personal.resumePdf}
              download
              className="hidden items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-sm font-medium text-content transition-all hover:shadow-glow-sm sm:inline-flex"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-borderc bg-surface/50 text-content lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-bg/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-50 h-full w-72 border-l border-borderc bg-bgalt/95 p-6 pt-24 backdrop-blur-xl lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            >
              <ul className="flex flex-col gap-1">
                {SECTIONS.map((s, i) => (
                  <motion.li
                    key={s.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <button
                      onClick={() => go(s.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition-colors ${
                        active === s.id
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted hover:bg-surface/60 hover:text-content'
                      }`}
                    >
                      <Icon name={s.icon} className="h-4 w-4" />
                      {s.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
              <a
                href={personal.resumePdf}
                download
                className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-3 text-sm font-medium text-content"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
