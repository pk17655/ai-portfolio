import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, ExternalLink, CheckCircle2 } from 'lucide-react'

/** Accessible modal showing full project details. */
export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    if (project) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} details`}
        >
          <div
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="card-surface relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl"
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-2xl bg-bgalt">
              <img
                src={project.image}
                alt=""
                className="h-full w-full object-cover"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-borderc bg-bg/70 text-content backdrop-blur transition-colors hover:border-primary hover:text-primary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-semibold text-content">{project.title}</h3>
              <p className="text-primary">{project.subtitle}</p>
              <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

              {project.highlights?.length > 0 && (
                <ul className="mt-5 space-y-2.5">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-content/90">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6">
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">
                  Tech stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <span key={t} className="chip border-primary/25 text-content">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {(project.liveUrl || project.repoUrl) && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="btn-neon"
                    >
                      <ExternalLink className="h-4 w-4" /> Live
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="btn-ghost"
                    >
                      <Github className="h-4 w-4" /> Source
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
