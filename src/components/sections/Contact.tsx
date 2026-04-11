import { useState, useCallback, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'
import { MagneticButton } from '../ui/MagneticButton'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const EMAIL = 'daron@nestcalc.ai'
const EMAIL_DISPLAY = 'daron@NestCalc.ai'

const CopyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <rect x="9" y="9" width="13" height="13" rx="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const inputClass =
  'w-full bg-nok-forest border border-nok-border rounded-xl px-4 py-3 text-white placeholder:text-nok-caption outline-none transition-all duration-200 focus:border-nok-teal focus:ring-1 focus:ring-nok-teal/30 focus:shadow-[0_0_15px_rgba(13,148,136,0.1)]'

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)

  const handleEmailClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
    window.location.href = `mailto:${EMAIL}`
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value

    const body = new URLSearchParams({
      'form-name': 'contact',
      name,
      email,
      message,
    })

    try {
      const res = await fetch(window.location.origin + '/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest',
          'Referer': window.location.href,
        },
        body,
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contactus" className="reveal-section py-12 sm:py-16 lg:py-32 bg-nok-medium">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Contact Us"
          subtitle="Tell us about your project"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* LEFT — Form */}
          <motion.form
            name="contact"
            method="POST"
            action="/"
            data-netlify="true"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="contact" />

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-nok-body mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-nok-body mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-nok-body mb-2">
                Tell us about your project
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Describe your idea, goals, and timeline..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <div>
              {status === 'success' ? (
                <div className="flex items-center gap-2 text-nok-teal font-medium py-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Message sent! We&rsquo;ll be in touch soon.
                </div>
              ) : status === 'error' ? (
                <div className="relative flex items-center gap-2 text-nok-red font-medium py-4">
                  Something went wrong. Please email us directly at{' '}
                  <a
                    href={`mailto:${EMAIL}`}
                    onClick={handleEmailClick}
                    className="inline-flex items-center gap-1 hover:text-nok-gold hover:underline transition-colors"
                  >
                    {EMAIL_DISPLAY}
                    <CopyIcon className="w-3.5 h-3.5" />
                  </a>.
                  <AnimatePresence>
                    {copied && (
                      <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="absolute -bottom-8 left-0 bg-nok-gold text-nok-deep text-sm font-medium px-3 py-1.5 rounded-lg shadow-lg"
                      >
                        Email copied to clipboard!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <MagneticButton
                  className={status === 'submitting' ? '!opacity-80 pointer-events-none' : ''}
                >
                  {status === 'submitting' ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                        <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </MagneticButton>
              )}
            </div>

            <p className="text-xs text-nok-caption">
              We respect your privacy. Your information is never shared.
            </p>
          </motion.form>

          {/* RIGHT — Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col justify-center"
          >
            <h3 className="font-display text-xl text-white mb-6">
              Prefer to reach out directly?
            </h3>

            {/* Email */}
            <div className="relative mb-6">
              <a
                href={`mailto:${EMAIL}`}
                onClick={handleEmailClick}
                className="flex items-center gap-3 group cursor-hover"
              >
                <div className="w-10 h-10 rounded-xl bg-nok-surface border border-nok-border flex items-center justify-center group-hover:border-nok-teal transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-nok-gold">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <span className="text-nok-body group-hover:text-nok-gold group-hover:underline transition-colors">
                  {EMAIL_DISPLAY}
                </span>
                <CopyIcon className="w-4 h-4 text-nok-caption group-hover:text-nok-gold transition-colors" />
              </a>
              <AnimatePresence>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute top-full left-13 mt-2 bg-nok-gold text-nok-deep text-sm font-medium px-3 py-1.5 rounded-lg shadow-lg"
                  >
                    Email copied to clipboard!
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Response time */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-nok-surface border border-nok-border flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-nok-gold">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-nok-caption text-sm">
                We respond within 24 hours
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-nok-caption">
              <span>Secure & confidential</span>
              <span className="text-nok-border hidden sm:inline">|</span>
              <span>Response within 24 hours</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
