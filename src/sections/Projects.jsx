import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import projects from '@/config/projects.json'
import SectionHeading from '@/components/SectionHeading'
import ProjectCard from '@/components/ProjectCard'
import ProjectModal from '@/components/ProjectModal'

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null)

  const filtered = useMemo(() => {
    if (filter === 'All') return projects.items
    return projects.items.filter((p) => p.category?.includes(filter))
  }, [filter])

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <SectionHeading
        index="04"
        kicker="Projects"
        title="Selected builds"
        description={projects.intro}
      />

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {projects.categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`relative rounded-full border px-4 py-1.5 text-sm transition-colors ${
              filter === cat
                ? 'border-primary/60 text-primary'
                : 'border-borderc text-muted hover:border-primary/40 hover:text-content'
            }`}
          >
            {filter === cat && (
              <motion.span
                layoutId="filter-active"
                className="absolute inset-0 rounded-full bg-primary/10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">{cat}</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
            >
              <ProjectCard project={project} onOpen={setActive} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted">No projects in this category yet.</p>
      )}

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  )
}
