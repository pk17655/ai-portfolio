import { ArrowUp } from 'lucide-react'
import personal from '@/config/personal.json'
import theme from '@/config/theme.json'
import { scrollToId } from '@/hooks/useSmoothScroll'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-borderc/60 bg-bgalt/40">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
        <div className="flex items-center gap-2 text-sm text-muted">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-primary/40 text-xs font-bold text-primary">
            {theme.brand || 'PK'}
          </span>
          <span>
            © {year} {personal.name}. Built with React, Three.js & Framer Motion.
          </span>
        </div>

        <button
          onClick={() => scrollToId('hero')}
          className="inline-flex items-center gap-2 rounded-lg border border-borderc px-3 py-1.5 text-sm text-muted transition-colors hover:border-primary hover:text-primary"
        >
          Back to top <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </footer>
  )
}
