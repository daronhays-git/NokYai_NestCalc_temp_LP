import { type ReactNode } from 'react'
import { m } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'
import { GlowCard } from '../ui/GlowCard'

/* ── Differentiator cards ───────────────────────────────────────── */
const CARDS: { icon: ReactNode; title: string; description: string }[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-nok-gold">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
      </svg>
    ),
    title: 'AI-Native Process',
    description:
      "We don't bolt AI on as an afterthought. Every project is architected AI-first.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-nok-gold">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
    title: 'We Create Custom Solutions for Small Business Needs',
    description:
      'We think like business owners, not just developers. ROI is always the goal.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-nok-gold">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
    title: 'Rapid Delivery',
    description:
      'Production-ready in weeks. We move fast without cutting corners.',
  },
]

/* ── Component ──────────────────────────────────────────────────── */
export function WhyNestCalc() {
  return (
    <section id="whynestcalc" className="reveal-section bg-nok-deep">
      {/* Differentiator cards */}
      <div className="py-12 sm:py-16 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Why NestCalc"
            subtitle="What makes us different"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CARDS.map((card, i) => (
              <m.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <GlowCard className="h-full">
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-nok-gold to-nok-teal flex items-center justify-center shrink-0">
                      {card.icon}
                    </div>
                    <h3 className="font-display text-xl font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="text-nok-body text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </GlowCard>
              </m.div>
            ))}
          </div>

          {/* Founder bio */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mt-16 text-center"
          >
            <p className="text-nok-gold uppercase tracking-widest text-sm">
              About the Founder
            </p>
            <h3 className="text-white text-2xl font-display font-bold mt-2">
              Daron R. Hays
            </h3>
            <p className="text-nok-caption text-sm mt-1">
              Founder &amp; Developer — NestCalc.ai, LLC
            </p>
            <p className="text-nok-body text-base leading-relaxed mt-4 max-w-3xl mx-auto">
              Engineer, builder, and real estate investor with 30+ years of hands-on
              experience. A structural engineer by training and licensed General
              Contractor, Daron has built 52 homes, completed over $15 million in
              construction contracts, managed rental portfolios, structured private
              investments, and owned a yoga studio and fitness center for nine years.
              He builds the analytical tools that serious investors need — because
              he's been the investor who needed them.
            </p>
          </m.div>
        </div>
      </div>
    </section>
  )
}
