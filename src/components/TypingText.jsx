import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Terminal-style typing effect that cycles through an array of strings,
 * typing then deleting each — like an AI "generating" text.
 *
 * @param strings     string[] to cycle through
 * @param typeSpeed   ms per character while typing
 * @param deleteSpeed ms per character while deleting
 * @param pause       ms to hold a completed string
 * @param loop        whether to cycle forever (else stops on last string)
 */
export default function TypingText({
  strings = [],
  typeSpeed = 55,
  deleteSpeed = 28,
  pause = 1400,
  loop = true,
  className = '',
}) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const reduced = usePrefersReducedMotion()
  const timeout = useRef()

  useEffect(() => {
    if (!strings.length) return
    // Reduced motion: show the first string statically, no animation.
    if (reduced) {
      setText(strings[0])
      return
    }

    const current = strings[index % strings.length]
    const isLast = index === strings.length - 1

    let delay = deleting ? deleteSpeed : typeSpeed

    if (!deleting && text === current) {
      if (!loop && isLast) return // stop at the end
      delay = pause
      timeout.current = setTimeout(() => setDeleting(true), delay)
      return
    }

    if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % strings.length)
      return
    }

    timeout.current = setTimeout(() => {
      setText((prev) =>
        deleting
          ? current.slice(0, prev.length - 1)
          : current.slice(0, prev.length + 1)
      )
    }, delay)

    return () => clearTimeout(timeout.current)
  }, [text, deleting, index, strings, typeSpeed, deleteSpeed, pause, loop, reduced])

  return (
    <span className={className} aria-live="polite">
      {text}
      {!reduced && (
        <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-primary align-middle animate-blink" />
      )}
    </span>
  )
}
