import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, FolderGit2, MapPin, Sparkles } from 'lucide-react'
import personal from '@/config/personal.json'
import theme from '@/config/theme.json'
import TypingText from '@/components/TypingText'
import MagneticButton from '@/components/MagneticButton'
import SocialLinks from '@/components/SocialLinks'
import VoiceSummary from '@/components/VoiceSummary'
import CircuitBackground from '@/components/CircuitBackground'
import OrbFallback from '@/components/OrbFallback'
import ErrorBoundary from '@/components/ErrorBoundary'
import { scrollToId } from '@/hooks/useSmoothScroll'
import { useIsDesktop } from '@/hooks/useMediaQuery'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'

// Heavy 3D scene is lazy-loaded so it never blocks first paint.
const RobotScene = lazy(() => import('@/three/RobotScene'))

export default function Hero() {
  const isDesktop = useIsDesktop()
  const reduced = usePrefersReducedMotion()
  const use3D = theme.flags?.enable3DRobot && isDesktop && !reduced

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* Backgrounds */}
      <div className="pointer-events-none absolute inset-0 bg-grid [background-size:48px_48px] opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      {theme.flags?.enableCircuitBackground && (
        <CircuitBackground className="opacity-40" />
      )}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-secondary/10 blur-[120px]" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-2">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="order-2 lg:order-1"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-borderc bg-surface/50 px-3 py-1.5 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-muted">{personal.availability}</span>
          </div>

          <p className="mb-3 font-mono text-sm text-primary">
            <Sparkles className="mr-1 inline h-4 w-4" />
            {personal.title}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <h1 className="h-display font-bold text-content">
              {personal.firstName}{' '}
              <span className="gradient-text animate-gradient-x">
                {personal.name.split(' ').slice(1).join(' ')}
              </span>
            </h1>
            {/* Listen to the profile summary in a robotic voice */}
            <VoiceSummary text={personal.bio} label="profile summary" />
          </div>

          {/* Typing roles */}
          <div className="mt-4 h-8 font-mono text-lg text-muted sm:text-xl">
            <span className="text-primary">$ </span>
            <TypingText
              strings={theme.flags?.enableTypingEffect ? personal.roles : [personal.title]}
              className="text-content"
            />
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            {personal.shortBio}
          </p>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted">
            <MapPin className="h-4 w-4 text-primary" />
            {personal.location}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton onClick={() => scrollToId('projects')}>
              <FolderGit2 className="h-4 w-4" />
              View Work
            </MagneticButton>
            <MagneticButton
              href={personal.resumePdf}
              download
              variant="ghost"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </MagneticButton>
          </div>

          <div className="mt-8">
            <SocialLinks />
          </div>
        </motion.div>

        {/* Right: avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.15 }}
          className="order-1 h-[340px] sm:h-[440px] lg:order-2 lg:h-[520px]"
        >
          {use3D ? (
            <ErrorBoundary fallback={<OrbFallback />}>
              <Suspense fallback={<OrbFallback />}>
                <RobotScene />
              </Suspense>
            </ErrorBoundary>
          ) : (
            <OrbFallback />
          )}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollToId('about')}
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <ArrowDown className="h-5 w-5" />
      </motion.button>
    </section>
  )
}
