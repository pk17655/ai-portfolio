import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'

/**
 * A button/anchor that magnetically leans toward the cursor on hover, with a
 * glow ripple. Renders as <a> when `href` is provided, else <button>.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'neon', // 'neon' | 'ghost'
  className = '',
  strength = 22,
  download,
  target,
  rel,
  ...rest
}) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 200, damping: 15 })
  const y = useSpring(my, { stiffness: 200, damping: 15 })
  const rotate = useTransform(x, [-strength, strength], [-4, 4])

  const handleMove = (e) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    mx.set((relX / rect.width) * strength)
    my.set((relY / rect.height) * strength)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  const Comp = href ? motion.a : motion.button
  const base = variant === 'ghost' ? 'btn-ghost' : 'btn-neon'

  return (
    <Comp
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x, y, rotate }}
      className={`group ${base} ${className}`}
      download={download}
      target={target}
      rel={rel}
      {...rest}
    >
      {/* hover ripple / glow sweep */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Comp>
  )
}
