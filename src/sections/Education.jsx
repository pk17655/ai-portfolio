import { motion } from 'framer-motion'
import { GraduationCap, ExternalLink, Award } from 'lucide-react'
import education from '@/config/education.json'
import certifications from '@/config/certifications.json'
import SectionHeading from '@/components/SectionHeading'
import GlowCard from '@/components/GlowCard'
import Icon from '@/components/Icon'
import { fadeUp, staggerContainer, viewportOnce } from '@/utils/animations'

export default function Education() {
  return (
    <section id="education" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <SectionHeading
        index="05"
        kicker="Education & Credentials"
        title="Training & certifications"
        description="Where the foundations were built and the badges earned."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Education */}
        <div>
          <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
            <GraduationCap className="h-4 w-4" /> Education
          </h3>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-4"
          >
            {education.degrees.map((d) => (
              <motion.div key={d.degree} variants={fadeUp}>
                <GlowCard className="rounded-2xl p-5" tilt={false}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-semibold text-content">{d.degree}</h4>
                      <p className="text-sm text-primary">{d.institution}</p>
                    </div>
                    <span className="chip border-primary/30 text-primary">
                      {d.start} — {d.end}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted">
                    {d.grade && <span className="chip">{d.grade}</span>}
                    {d.honors?.map((h) => (
                      <span key={h} className="chip">
                        {h}
                      </span>
                    ))}
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Certifications + Achievements */}
        <div className="space-y-8">
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
              <Award className="h-4 w-4" /> Certifications
            </h3>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {certifications.certifications.map((c) => (
                <motion.div key={c.name} variants={fadeUp}>
                  <GlowCard className="flex h-full items-start gap-3 rounded-2xl p-4" tilt={false}>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                      <Icon name={c.icon} className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-content">{c.name}</p>
                      <p className="text-xs text-muted">
                        {c.issuer}
                        {c.date ? ` · ${c.date}` : ''}
                      </p>
                      {c.credentialUrl && (
                        <a
                          href={c.credentialUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:text-accent"
                        >
                          Verify <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
              <Icon name="Trophy" className="h-4 w-4" /> Achievements
            </h3>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex flex-wrap gap-2"
            >
              {certifications.achievements.map((a) => (
                <motion.span
                  key={a.name}
                  variants={fadeUp}
                  className="chip border-primary/20 py-2 text-content"
                >
                  <Icon name={a.icon} className="h-3.5 w-3.5 text-primary" />
                  {a.name}
                  <span className="text-muted"> · {a.issuer}</span>
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
