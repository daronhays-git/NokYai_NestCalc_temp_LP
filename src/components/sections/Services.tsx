import { motion } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'
import { GlowCard } from '../ui/GlowCard'

const SERVICES = [
  {
    title: 'AI Applications',
    description:
      'Custom AI-powered apps and intelligent tools built for your specific workflows.',
    gradient: 'from-nok-gold to-nok-teal',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
      </svg>
    ),
  },
  {
    title: 'Automation & Integration',
    description:
      'Connect your systems with smart automation that eliminates repetitive work.',
    gradient: 'from-nok-teal to-nok-gold',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
  {
    title: 'Web & Mobile Apps',
    description:
      'Beautiful, performant applications with modern frameworks and exceptional UX.',
    gradient: 'from-nok-gold to-nok-amber',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
  {
    title: 'AI Strategy & Consulting',
    description:
      'Navigate the AI landscape with expert guidance on what to build and when.',
    gradient: 'from-nok-teal to-nok-gold',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
]

export function Services() {
  return (
    <section id="services" className="reveal-section py-24 lg:py-32 bg-nok-medium">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="What We Build"
          subtitle="End-to-end AI solutions tailored to your business"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <GlowCard>
                <div className="flex flex-col gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center shrink-0`}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-card-title text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-nok-body text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <span className="text-nok-teal text-sm font-medium cursor-hover">
                      Learn more &rarr;
                    </span>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
