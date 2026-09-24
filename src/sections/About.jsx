import { motion } from 'framer-motion'
import { Cpu, MapPin, Mail, BadgeCheck } from 'lucide-react'
import personal from '@/config/personal.json'
import SectionHeading from '@/components/SectionHeading'
import GlowCard from '@/components/GlowCard'
import StatCounter from '@/components/StatCounter'
import { fadeUp, staggerContainer, viewportOnce } from '@/utils/animations'

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <SectionHeading
        index="01"
        kicker="About"
        title="The engineer behind the interface"
        description="A quick system profile — who I am and the impact I've shipped."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Bio */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="lg:col-span-2"
        >
          <GlowCard className="h-full rounded-2xl p-6 sm:p-8" tilt={false}>
            <div className="mb-4 flex items-center gap-2 font-mono text-xs text-primary">
              <Cpu className="h-4 w-4" /> profile.md
            </div>
            <p className="text-lg leading-relaxed text-content/90">{personal.bio}</p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoRow icon={MapPin} label="Location" value={personal.location} />
              <InfoRow icon={Mail} label="Email" value={personal.contact.email} />
              <InfoRow icon={BadgeCheck} label="Status" value={personal.availability} />
              <InfoRow icon={Cpu} label="Focus" value="Frontend architecture · GenAI UX" />
            </div>
          </GlowCard>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-4"
        >
          {personal.stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp}>
              <GlowCard className="flex h-full flex-col justify-center rounded-2xl p-5 text-center">
                <div className="gradient-text text-4xl font-bold">
                  <StatCounter value={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-xs leading-tight text-muted">{s.label}</p>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-borderc/60 bg-bgalt/40 px-4 py-3">
      <Icon className="h-4 w-4 shrink-0 text-primary" />
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-muted">{label}</p>
        <p className="truncate text-sm text-content">{value}</p>
      </div>
    </div>
  )
}
