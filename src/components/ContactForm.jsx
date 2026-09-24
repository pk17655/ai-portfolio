import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import personal from '@/config/personal.json'
import { isEmail } from '@/utils/helpers'

const FIELDS = [
  { name: 'name', label: 'Identify yourself', type: 'text', placeholder: 'Your name' },
  { name: 'email', label: 'Return channel', type: 'email', placeholder: 'you@email.com' },
  { name: 'message', label: 'Transmit message', type: 'textarea', placeholder: 'Tell me about your project…' },
]

/**
 * Validated contact form. With no backend configured it composes a mailto:
 * to the address in personal.json (opens the visitor's own mail client — it
 * does not send anything automatically).
 */
export default function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const validate = () => {
    const e = {}
    if (!values.name.trim()) e.name = 'Name is required.'
    if (!isEmail(values.email)) e.email = 'A valid email is required.'
    if (values.message.trim().length < 10) e.message = 'Message must be at least 10 characters.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')

    // Simulate a transmit sequence, then hand off to the mail client.
    setTimeout(() => {
      const subject = encodeURIComponent(`Portfolio contact from ${values.name}`)
      const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`)
      window.location.href = `mailto:${personal.contact.email}?subject=${subject}&body=${body}`
      setStatus('sent')
    }, 1100)
  }

  return (
    <form onSubmit={onSubmit} className="card-surface rounded-2xl p-6 sm:p-8" noValidate>
      <div className="mb-5 flex items-center gap-2 font-mono text-xs text-muted">
        <span className="h-2 w-2 rounded-full bg-primary shadow-glow-sm" />
        contact.terminal — awaiting input
      </div>

      <div className="space-y-5">
        {FIELDS.map((f) => (
          <div key={f.name}>
            <label
              htmlFor={f.name}
              className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-primary"
            >
              &gt; {f.label}
            </label>
            {f.type === 'textarea' ? (
              <textarea
                id={f.name}
                name={f.name}
                rows={4}
                value={values[f.name]}
                onChange={onChange}
                placeholder={f.placeholder}
                aria-invalid={Boolean(errors[f.name])}
                className="w-full resize-none rounded-xl border border-borderc bg-bgalt/60 px-4 py-3 text-sm text-content placeholder:text-muted/60 outline-none transition-colors focus:border-primary focus:shadow-glow-sm"
              />
            ) : (
              <input
                id={f.name}
                name={f.name}
                type={f.type}
                value={values[f.name]}
                onChange={onChange}
                placeholder={f.placeholder}
                aria-invalid={Boolean(errors[f.name])}
                className="w-full rounded-xl border border-borderc bg-bgalt/60 px-4 py-3 text-sm text-content placeholder:text-muted/60 outline-none transition-colors focus:border-primary focus:shadow-glow-sm"
              />
            )}
            <AnimatePresence>
              {errors[f.name] && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-1.5 flex items-center gap-1 text-xs text-red-400"
                >
                  <AlertCircle className="h-3 w-3" /> {errors[f.name]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-neon mt-6 w-full disabled:opacity-70"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Transmitting…
          </>
        ) : status === 'sent' ? (
          <>
            <CheckCircle2 className="h-4 w-4" /> Channel opened
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send transmission
          </>
        )}
      </button>

      <AnimatePresence>
        {status === 'sent' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-center text-xs text-muted"
          >
            Your mail client should now be open. Prefer direct?{' '}
            <a href={`mailto:${personal.contact.email}`} className="text-primary">
              {personal.contact.email}
            </a>
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}
