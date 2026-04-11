import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'
import { MagneticButton } from '../ui/MagneticButton'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const inputClass =
  'w-full bg-nok-forest border border-nok-border rounded-xl px-4 py-3 text-white placeholder:text-nok-caption outline-none transition-all duration-200 focus:border-nok-teal focus:ring-1 focus:ring-nok-teal/30 focus:shadow-[0_0_15px_rgba(13,148,136,0.1)]'

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const data = new FormData(form)
    data.append('form-name', 'contact')

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
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
    <section id="contactus" className="reveal-section py-24 lg:py-32 bg-nok-medium">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Contact Us"
          subtitle="Tell us about your project"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT — Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Netlify honeypot */}
            <p className="hidden">
              <label>Don't fill this out: <input name="bot-field" /></label>
            </p>

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
                <div className="flex items-center gap-2 text-nok-red font-medium py-4">
                  Something went wrong. Please email us directly at daron@NestCalc.ai.
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
            <a
              href="mailto:daron@NestCalc.ai"
              className="flex items-center gap-3 group cursor-hover mb-6"
            >
              <div className="w-10 h-10 rounded-xl bg-nok-surface border border-nok-border flex items-center justify-center group-hover:border-nok-teal transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-nok-gold">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <span className="text-nok-body group-hover:text-white transition-colors">
                daron@NestCalc.ai
              </span>
            </a>

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

            {/* Decorative terminal element */}
            <div className="bg-nok-surface border border-nok-border rounded-xl p-5 font-mono text-sm text-nok-caption animate-float">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <p>
                <span className="text-nok-teal">const</span>{' '}
                <span className="text-nok-gold">project</span>{' '}
                <span className="text-nok-caption">=</span>{' '}
                <span className="text-nok-teal">await</span>{' '}
                <span className="text-nok-gold">nestcalc</span>
                <span className="text-nok-caption">.build(</span>
                <span className="text-nok-body">yourIdea</span>
                <span className="text-nok-caption">)</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
