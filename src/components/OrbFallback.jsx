import { motion } from 'framer-motion'

/**
 * Lightweight CSS/SVG "AI orb" used instead of the 3D scene on mobile,
 * on reduced-motion, or when enable3DRobot is off. No WebGL cost.
 */
export default function OrbFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <motion.div
        className="relative h-56 w-56 sm:h-72 sm:w-72"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Glow core */}
        <div className="absolute inset-8 rounded-full bg-primary/20 blur-2xl" />
        <div className="absolute inset-12 rounded-full bg-gradient-to-br from-primary/60 to-secondary/50 shadow-glow-lg" />
        <div className="absolute inset-16 rounded-full border border-accent/40 bg-bg/40 backdrop-blur-sm" />

        {/* Rotating rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-primary/30"
            style={{ transform: `scale(${1 - i * 0.14})` }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 14 + i * 6, repeat: Infinity, ease: 'linear' }}
          >
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-glow" />
          </motion.div>
        ))}

        {/* Pupil */}
        <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-glow animate-pulse-slow" />
      </motion.div>
    </div>
  )
}
