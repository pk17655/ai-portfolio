import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, Pause, Play, Square } from 'lucide-react'

const SUPPORTED =
  typeof window !== 'undefined' && 'speechSynthesis' in window

/** Prefer a synthetic / male English voice for the most "robotic" character. */
function pickRoboticVoice(voices) {
  if (!voices || !voices.length) return null
  const has = (frag) =>
    voices.find((v) => v.name.toLowerCase().includes(frag))
  return (
    has('david') ||
    has('mark') ||
    has('google uk english male') ||
    has('daniel') ||
    has('alex') ||
    voices.find((v) => /en[-_]?(us|gb)/i.test(v.lang)) ||
    voices.find((v) => (v.lang || '').toLowerCase().startsWith('en')) ||
    voices[0]
  )
}

/** Split text into sentence-sized chunks — avoids the Chrome long-utterance cutoff. */
function toSentences(text) {
  return (text.match(/[^.!?]+[.!?]*/g) || [text])
    .map((s) => s.trim())
    .filter(Boolean)
}

/**
 * A speaker button placed next to the display name. Clicking it reads the
 * provided text aloud in a robotic voice (low pitch), then exposes pause/resume
 * and stop controls. Uses the Web Speech API — no external services.
 */
export default function VoiceSummary({ text, label = 'profile summary' }) {
  const [status, setStatus] = useState('idle') // 'idle' | 'playing' | 'paused'
  const voiceRef = useRef(null)
  const sessionRef = useRef(0) // guards against stale utterance callbacks

  // Load (and keep in sync) the chosen voice.
  useEffect(() => {
    if (!SUPPORTED) return
    const synth = window.speechSynthesis
    const load = () => {
      voiceRef.current = pickRoboticVoice(synth.getVoices())
    }
    load()
    synth.addEventListener?.('voiceschanged', load)
    return () => {
      synth.removeEventListener?.('voiceschanged', load)
      synth.cancel()
    }
  }, [])

  // Chrome keep-alive: nudges the engine so long readings aren't cut off ~15s in.
  useEffect(() => {
    if (status !== 'playing') return
    const id = setInterval(() => {
      const s = window.speechSynthesis
      if (s.speaking && !s.paused) s.resume()
    }, 8000)
    return () => clearInterval(id)
  }, [status])

  const play = useCallback(() => {
    if (!SUPPORTED || !text) return
    const synth = window.speechSynthesis
    synth.cancel()
    const token = ++sessionRef.current

    const utterances = toSentences(text).map((sentence) => {
      const u = new SpeechSynthesisUtterance(sentence)
      if (voiceRef.current) u.voice = voiceRef.current
      u.rate = 0.9 // measured, machine-like cadence
      u.pitch = 0.4 // low pitch => robotic timbre
      u.volume = 1
      u.onerror = () => {
        if (sessionRef.current === token) setStatus('idle')
      }
      return u
    })

    // Reset to idle when the final sentence finishes.
    utterances[utterances.length - 1].onend = () => {
      if (sessionRef.current === token) setStatus('idle')
    }

    utterances.forEach((u) => synth.speak(u))
    setStatus('playing')
  }, [text])

  const pause = useCallback(() => {
    window.speechSynthesis.pause()
    setStatus('paused')
  }, [])

  const resume = useCallback(() => {
    window.speechSynthesis.resume()
    setStatus('playing')
  }, [])

  const stop = useCallback(() => {
    sessionRef.current++ // invalidate pending callbacks
    window.speechSynthesis.cancel()
    setStatus('idle')
  }, [])

  if (!SUPPORTED) return null

  const btn =
    'inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60'

  return (
    <div className="inline-flex items-center gap-2 align-middle">
      {status === 'idle' ? (
        <motion.button
          type="button"
          onClick={play}
          aria-label={`Play ${label} in a robotic voice`}
          title={`Hear my ${label}`}
          whileTap={{ scale: 0.9 }}
          className={`${btn} group relative border-primary/50 bg-primary/10 text-primary hover:shadow-glow`}
        >
          {/* attention pulse */}
          <span className="absolute inset-0 rounded-full border border-primary/40 animate-pulse-slow" />
          <Volume2 className="h-5 w-5" />
        </motion.button>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            key="controls"
            initial={{ opacity: 0, scale: 0.85, width: 0 }}
            animate={{ opacity: 1, scale: 1, width: 'auto' }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="inline-flex items-center gap-2 rounded-full border border-borderc bg-surface/60 px-2 py-1 backdrop-blur"
          >
            {/* animated equalizer while playing */}
            <span className="flex items-end gap-0.5 px-1" aria-hidden>
              {[0, 1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  className="w-0.5 rounded-full bg-primary"
                  animate={
                    status === 'playing'
                      ? { height: [4, 14, 6, 12, 4] }
                      : { height: 4 }
                  }
                  transition={{
                    duration: 0.9,
                    repeat: status === 'playing' ? Infinity : 0,
                    delay: i * 0.12,
                    ease: 'easeInOut',
                  }}
                  style={{ height: 4 }}
                />
              ))}
            </span>

            {status === 'playing' ? (
              <button
                type="button"
                onClick={pause}
                aria-label={`Pause ${label}`}
                title="Pause"
                className={`${btn} h-9 w-9 border-primary/40 bg-primary/10 text-primary hover:shadow-glow-sm`}
              >
                <Pause className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={resume}
                aria-label={`Resume ${label}`}
                title="Resume"
                className={`${btn} h-9 w-9 border-primary/40 bg-primary/10 text-primary hover:shadow-glow-sm`}
              >
                <Play className="h-4 w-4" />
              </button>
            )}

            <button
              type="button"
              onClick={stop}
              aria-label={`Stop ${label}`}
              title="Stop"
              className={`${btn} h-9 w-9 border-borderc bg-surfacealt/60 text-muted hover:border-red-400/60 hover:text-red-400`}
            >
              <Square className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
