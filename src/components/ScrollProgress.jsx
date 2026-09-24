import { useScrollProgress } from '@/hooks/useScrollProgress'

/** Thin gradient progress bar fixed to the top of the viewport. */
export default function ScrollProgress() {
  const progress = useScrollProgress()
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-primary via-accent to-secondary shadow-glow-sm"
        style={{ transform: `scaleX(${progress})`, transformOrigin: 'left' }}
      />
    </div>
  )
}
