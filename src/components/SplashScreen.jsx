import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import theme from '@/config/theme.json'
import personal from '@/config/personal.json'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'

/**
 * "AI System Initializing" boot splash. Shows a sequence of status messages
 * and a progress bar, then calls onComplete. Skippable via button or any key.
 */
export default function SplashScreen({ onComplete }) {
  const messages = theme.splash?.messages || ['Initializing...']
  const duration = theme.splash?.durationMs || 2600
  const reduced = usePrefersReducedMotion()

  const [progress, setProgress] = useState(0)
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    if (reduced) {
      onComplete()
      return
    }
    const start = performance.now()
    let raf = 0
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      setProgress(p)
      setMsgIndex(Math.min(messages.length - 1, Math.floor(p * messages.length)))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(onComplete, 250)
    }
    raf = requestAnimationFrame(tick)

    const skip = () => onComplete()
    window.addEventListener('keydown', skip)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', skip)
    }
  }, [duration, messages.length, onComplete, reduced])

  return (
    <AnimatePresence>
      <motion.div
        className="scanlines fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-bg"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, filter: 'blur(8px)' }}
        transition={{ duration: 0.5 }}
      >
        <div className="pointer-events-none absolute inset-0 bg-grid [background-size:44px_44px] opacity-20" />

        {/* Boot mark */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-2xl border border-primary/40 bg-surface/40"
        >
          <span className="gradient-text text-4xl font-bold">{theme.brand || 'PK'}</span>
          <motion.span
            className="absolute inset-0 rounded-2xl border border-primary/60"
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.08, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </motion.div>

        <div className="mb-2 font-mono text-xs uppercase tracking-[0.35em] text-primary">
          {personal.name}
        </div>

        <div className="h-5 font-mono text-sm text-muted">
          <span className="text-primary">&gt;</span> {messages[msgIndex]}
          <span className="ml-1 inline-block h-3 w-1.5 translate-y-[1px] bg-primary animate-blink" />
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-1.5 w-64 overflow-hidden rounded-full bg-surfacealt">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary shadow-glow"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
        <div className="mt-2 font-mono text-[11px] text-muted">
          {Math.round(progress * 100)}%
        </div>

        <button
          onClick={onComplete}
          className="absolute bottom-8 right-8 rounded-lg border border-borderc px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-primary hover:text-primary"
        >
          Skip →
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
