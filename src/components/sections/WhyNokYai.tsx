import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'
import { GlowCard } from '../ui/GlowCard'

/* ── Count-up hook ──────────────────────────────────────────────── */
function useCountUp(target: number, duration = 2000) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()

          const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            // easeOut: 1 - (1-t)^3
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { value, ref }
}

/* ── Stats data ─────────────────────────────────────────────────── */
const STATS: { target: number; suffix: string; label: string }[] = [
  { target: 40, suffix: '+', label: 'Projects Delivered' },
  { target: 6, suffix: ' Weeks', label: 'Average Time to Launch' },
  { target: 5, suffix: '.0 ★', label: 'Client Satisfaction' },
  { target: 3, suffix: 'x', label: 'Faster Than Traditional Dev' },
]

function StatItem({ target, suffix, label }: (typeof STATS)[number]) {
  const { value, ref } = useCountUp(target)

  return (
    <div ref={ref} className="text-center">
      <span className="font-display text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-nok-gold to-nok-body bg-clip-text text-transparent">
        {value}
        {suffix}
      </span>
      <p className="text-sm text-nok-caption mt-2">{label}</p>
    </div>
  )
}

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
    title: 'Builder-Investor Mindset',
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
export function WhyNokYai() {
  return (
    <section id="whynokyai" className="reveal-section bg-nok-deep">
      {/* Part 1 — Stats bar */}
      <div className="bg-nok-forest/50 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      {/* Part 2 — Differentiator cards */}
      <div className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Why NokYai"
            subtitle="What makes us different"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {CARDS.map((card, i) => (
              <motion.div
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
                    <h3 className="font-display text-card-title text-white">
                      {card.title}
                    </h3>
                    <p className="text-nok-body text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
