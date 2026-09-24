import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import skills from '@/config/skills.json'
import SectionHeading from '@/components/SectionHeading'
import GlowCard from '@/components/GlowCard'
import SkillBar from '@/components/SkillBar'
import Icon from '@/components/Icon'
import { fadeUp, staggerContainer, viewportOnce } from '@/utils/animations'

// Defer Recharts (its own chunk) until the Skills section renders.
const RadarChartCard = lazy(() => import('@/components/RadarChartCard'))

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <SectionHeading
        index="02"
        kicker="Skills"
        title="Systems & capabilities"
        description={skills.intro}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Radar + soft skills */}
        <div className="space-y-6 lg:col-span-1">
          <GlowCard className="rounded-2xl p-5" tilt={false}>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">
              Core competency map
            </p>
            <Suspense
              fallback={
                <div className="flex h-[320px] items-center justify-center text-sm text-muted">
                  Loading chart…
                </div>
              }
            >
              <RadarChartCard />
            </Suspense>
          </GlowCard>

          <GlowCard className="rounded-2xl p-5" tilt={false}>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
              Soft skills
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.softSkills.map((s) => (
                <span key={s} className="chip border-primary/20">
                  {s}
                </span>
              ))}
            </div>
          </GlowCard>
        </div>

        {/* Category meters */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2"
        >
          {skills.categories.map((cat) => (
            <motion.div key={cat.name} variants={fadeUp}>
              <GlowCard className="h-full rounded-2xl p-5" tilt={false}>
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                    <Icon name={cat.icon} className="h-4 w-4" />
                  </span>
                  <h3 className="font-semibold text-content">{cat.name}</h3>
                </div>
                <div className="space-y-4">
                  {cat.skills.map((sk, i) => (
                    <SkillBar key={sk.name} name={sk.name} level={sk.level} delay={i * 0.05} />
                  ))}
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
