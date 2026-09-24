import { motion } from 'framer-motion'
import personal from '@/config/personal.json'
import Icon from './Icon'

/** Renders social/contact links from personal.json. */
export default function SocialLinks({ className = '', iconClass = 'h-4 w-4' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {personal.social.map((s) => (
        <motion.a
          key={s.label}
          href={s.url}
          target={s.url.startsWith('http') ? '_blank' : undefined}
          rel="noreferrer noopener"
          aria-label={s.label}
          whileHover={{ y: -3 }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-borderc bg-surface/50 text-muted transition-colors hover:border-primary/60 hover:text-primary hover:shadow-glow-sm"
        >
          <Icon name={s.icon} className={iconClass} />
        </motion.a>
      ))}
    </div>
  )
}
