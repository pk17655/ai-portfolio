import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import personal from '@/config/personal.json'
import SectionHeading from '@/components/SectionHeading'
import ContactForm from '@/components/ContactForm'
import SocialLinks from '@/components/SocialLinks'
import { slideInLeft, viewportOnce } from '@/utils/animations'

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading
        index="06"
        kicker="Contact"
        title="Open a channel"
        description="Have a role, a project, or a question? Send a transmission — I usually reply within a day."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left: info */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col justify-between gap-6"
        >
          <div className="space-y-3">
            <ContactRow icon={Mail} label="Email" value={personal.contact.email} href={`mailto:${personal.contact.email}`} />
            <ContactRow icon={Phone} label="Phone" value={personal.contact.phone} href={`tel:${personal.contact.phone}`} />
            <ContactRow icon={MapPin} label="Location" value={personal.location} />
          </div>

          <div className="card-surface rounded-2xl p-6">
            <p className="mb-4 text-sm text-muted">Find me across the network:</p>
            <SocialLinks />
          </div>

          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <p className="font-mono text-sm text-content">
              <span className="text-primary">●</span> {personal.availability}
            </p>
          </div>
        </motion.div>

        {/* Right: form */}
        <ContactForm />
      </div>
    </section>
  )
}

function ContactRow({ icon: Icon, label, value, href }) {
  const Wrapper = href ? 'a' : 'div'
  return (
    <Wrapper
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-borderc bg-surface/40 p-4 transition-colors hover:border-primary/50"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-[11px] uppercase tracking-wider text-muted">{label}</p>
        <p className="text-sm text-content transition-colors group-hover:text-primary">{value}</p>
      </div>
    </Wrapper>
  )
}
