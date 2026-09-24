import { motion } from 'framer-motion'

/**
 * Decorative animated SVG circuit / neural traces. Purely aesthetic (aria
 * hidden). Lines draw themselves in on mount and pulse subtly.
 */
export default function CircuitBackground({ className = '' }) {
  const paths = [
    'M0 120 H180 L220 160 H420 L460 120 H700',
    'M0 260 H120 L160 220 H360 L400 260 H560 L600 300 H900',
    'M0 400 H240 L280 360 H520 L560 400 H820',
    'M120 0 V80 L160 120 V260',
    'M540 0 V60 L500 100 V220',
  ]

  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 900 480"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="trace" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgb(var(--c-primary))" stopOpacity="0.05" />
          <stop offset="50%" stopColor="rgb(var(--c-primary))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="rgb(var(--c-secondary))" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {paths.map((d, i) => (
        <g key={i}>
          <motion.path
            d={d}
            stroke="url(#trace)"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.4, delay: i * 0.25, ease: 'easeInOut' }}
          />
          {/* traveling pulse node */}
          <motion.circle
            r="2.5"
            fill="rgb(var(--c-accent))"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 3,
              delay: i * 0.4,
              repeat: Infinity,
              repeatDelay: 1.5,
            }}
          >
            <animateMotion dur={`${4 + i}s`} repeatCount="indefinite" path={d} />
          </motion.circle>
        </g>
      ))}
    </svg>
  )
}
