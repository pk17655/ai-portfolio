import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import experience from '@/config/experience.json'
import SectionHeading from '@/components/SectionHeading'
import TimelineItem from '@/components/TimelineItem'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const trackRef = useRef(null)
  const lineRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced || !lineRef.current || !trackRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 70%',
            end: 'bottom 75%',
            scrub: true,
          },
        }
      )
    }, trackRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-5 py-24 sm:px-8">
      <SectionHeading
        index="03"
        kicker="Experience"
        title="Mission log"
        description={experience.intro}
      />

      <div ref={trackRef} className="relative">
        {/* Base line */}
        <span className="absolute left-[10px] top-0 h-full w-px bg-borderc sm:left-[14px]" />
        {/* Animated progress line */}
        <span
          ref={lineRef}
          className="absolute left-[10px] top-0 h-full w-px origin-top bg-gradient-to-b from-primary via-accent to-secondary shadow-glow sm:left-[14px]"
          style={{ transform: reduced ? 'scaleY(1)' : 'scaleY(0)' }}
        />

        <div className="space-y-8">
          {experience.jobs.map((job) => (
            <TimelineItem key={`${job.company}-${job.start}`} job={job} />
          ))}
        </div>
      </div>
    </section>
  )
}
