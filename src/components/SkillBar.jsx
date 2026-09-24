import { motion } from 'framer-motion'
import { viewportOnce } from '@/utils/animations'

/**
 * A single "processing power" skill meter that fills to `level`% when in view.
 */
export default function SkillBar({ name, level = 0, delay = 0 }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm text-content">{name}</span>
        <span className="font-mono text-xs text-primary">{level}%</span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-surfacealt">
        {/* track ticks */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_9px,rgb(var(--c-border)/0.6)_10px)]" />
        <motion.div
          className="relative h-full rounded-full bg-gradient-to-r from-primary to-accent shadow-glow-sm"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={viewportOnce}
          transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-accent shadow-glow" />
        </motion.div>
      </div>
    </div>
  )
}
