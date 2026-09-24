import { motion } from 'framer-motion'
import { ArrowUpRight, Github, ExternalLink, Star } from 'lucide-react'
import GlowCard from './GlowCard'
import { fadeUp, viewportOnce } from '@/utils/animations'

/** A project tile. Click anywhere (or the button) to open the detail modal. */
export default function ProjectCard({ project, onOpen }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
      <GlowCard className="flex h-full flex-col rounded-2xl">
        {/* Preview media */}
        <button
          onClick={() => onOpen(project)}
          className="group relative block aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-bgalt text-left"
          aria-label={`Open ${project.title} details`}
        >
          <img
            src={project.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
          <div className="scanlines absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {project.featured && (
            <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full border border-primary/40 bg-bg/70 px-2.5 py-1 text-[11px] font-medium text-primary backdrop-blur">
              <Star className="h-3 w-3 fill-primary" /> Featured
            </span>
          )}

          <span className="absolute bottom-3 right-3 flex translate-y-2 items-center gap-1 rounded-full border border-borderc bg-bg/70 px-3 py-1 text-xs text-content opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View details <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </button>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold text-content">{project.title}</h3>
              <p className="text-sm text-primary">{project.subtitle}</p>
            </div>
          </div>

          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="chip">+{project.stack.length - 4}</span>
            )}
          </div>

          <div className="mt-5 flex items-center gap-3 border-t border-borderc/60 pt-4">
            <button
              onClick={() => onOpen(project)}
              className="text-sm font-medium text-primary transition-colors hover:text-accent"
            >
              Case study →
            </button>
            <div className="ml-auto flex items-center gap-2">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Repository"
                  className="text-muted transition-colors hover:text-primary"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Live site"
                  className="text-muted transition-colors hover:text-primary"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  )
}
