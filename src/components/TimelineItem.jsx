import { motion } from 'framer-motion'
import { MapPin, CircleDot } from 'lucide-react'
import { slideInRight, viewportOnce } from '@/utils/animations'

/** One entry in the vertical experience timeline. */
export default function TimelineItem({ job }) {
  return (
    <motion.div
      variants={slideInRight}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="relative pl-12 sm:pl-16"
    >
      {/* Node on the line */}
      <span className="absolute left-[10px] top-1.5 flex h-5 w-5 -translate-x-1/2 items-center justify-center sm:left-[14px]">
        <span className="absolute h-5 w-5 rounded-full bg-primary/20" />
        <CircleDot className="relative h-4 w-4 text-primary" />
        {job.current && (
          <span className="absolute h-5 w-5 animate-ping rounded-full bg-primary/40" />
        )}
      </span>

      <div className="card-surface rounded-2xl p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-content">{job.role}</h3>
            <p className="text-primary">{job.company}</p>
          </div>
          <div className="text-right">
            <span className="chip border-primary/30 text-primary">
              {job.start} — {job.end}
            </span>
            {job.location && (
              <p className="mt-1 flex items-center justify-end gap-1 text-xs text-muted">
                <MapPin className="h-3 w-3" /> {job.location}
              </p>
            )}
          </div>
        </div>

        {job.summary && <p className="mt-3 text-sm text-muted">{job.summary}</p>}

        <ul className="mt-4 space-y-2">
          {job.highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-content/90">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
              {h}
            </li>
          ))}
        </ul>

        {job.stack?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {job.stack.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
