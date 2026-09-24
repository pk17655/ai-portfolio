import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '@/utils/animations'

/**
 * Consistent section header: a mono "index" label, a big title, and an
 * optional description. Animates in on scroll.
 */
export default function SectionHeading({ index, kicker, title, description }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="mb-12 max-w-2xl"
    >
      {(index || kicker) && (
        <div className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">
          {index && <span className="text-muted">{index}</span>}
          <span className="h-px w-8 bg-primary/50" />
          {kicker}
        </div>
      )}
      <h2 className="h-section font-semibold text-content">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
      )}
    </motion.div>
  )
}
