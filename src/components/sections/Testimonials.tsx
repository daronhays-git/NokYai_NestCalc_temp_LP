import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'

const TESTIMONIALS = [
  {
    quote:
      'NokYai transformed our manual processes into an AI-powered system that saves us 20 hours per week.',
    name: 'Sarah Chen',
    role: 'COO',
    company: 'TechFlow',
    gradient: 'from-nok-gold to-nok-teal',
  },
  {
    quote:
      'The speed and quality of delivery was unlike anything we\'ve experienced. Our app was live in 6 weeks.',
    name: 'Marcus Rivera',
    role: 'Founder',
    company: 'DataPulse',
    gradient: 'from-nok-teal to-nok-gold',
  },
  {
    quote:
      'They didn\'t just build what we asked for — they showed us what was possible.',
    name: 'Anika Patel',
    role: 'VP Product',
    company: 'Meridian Health',
    gradient: 'from-nok-gold to-nok-teal',
  },
  {
    quote:
      'Our AI tool went from idea to revenue in under 3 months. The ROI speaks for itself.',
    name: 'James Okonkwo',
    role: 'CEO',
    company: 'ScaleWise',
    gradient: 'from-nok-teal to-nok-gold',
  },
]

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 120 : -120, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -120 : 120, opacity: 0 }),
}

export function Testimonials() {
  const [[active, direction], setActive] = useState([0, 1])

  const paginate = useCallback(
    (newDir: number) => {
      setActive(([prev]) => {
        const next = (prev + newDir + TESTIMONIALS.length) % TESTIMONIALS.length
        return [next, newDir]
      })
    },
    []
  )

  const goTo = useCallback(
    (index: number) => {
      setActive(([prev]) => [index, index > prev ? 1 : -1])
    },
    []
  )

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000)
    return () => clearInterval(timer)
  }, [paginate])

  // Drag handling
  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) paginate(1)
    else if (info.offset.x > 50) paginate(-1)
  }

  const t = TESTIMONIALS[active]

  return (
    <section id="testimonials" className="reveal-section py-24 lg:py-32 bg-nok-forest">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="What Our Clients Say" />

        <div className="max-w-3xl mx-auto">
          {/* Card area */}
          <div className="relative overflow-hidden min-h-[280px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 cursor-grab active:cursor-grabbing"
              >
                {/* Quote icon */}
                <svg
                  className="absolute top-6 right-6 w-12 h-12 text-nok-gold/20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.3 2.7c-4.2 1.8-7 5.6-7 10.2 0 3.4 2.1 5.8 4.7 5.8 2.3 0 4-1.7 4-4.1 0-2.2-1.5-3.8-3.5-3.8-.4 0-.9.1-1.2.2.5-2.7 2.8-5.4 5.5-6.7L11.3 2.7zm10.2 0c-4.2 1.8-7 5.6-7 10.2 0 3.4 2.1 5.8 4.7 5.8 2.3 0 4-1.7 4-4.1 0-2.2-1.5-3.8-3.5-3.8-.4 0-.9.1-1.2.2.5-2.7 2.8-5.4 5.5-6.7L21.5 2.7z" />
                </svg>

                {/* Quote text */}
                <p className="text-lg lg:text-xl text-nok-body italic leading-relaxed mb-8 pr-12">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author row */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.gradient} shrink-0`}
                  />
                  <div>
                    <p className="font-bold text-white">{t.name}</p>
                    <p className="text-sm">
                      <span className="text-nok-caption">{t.role}, </span>
                      <span className="text-nok-teal">{t.company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot navigation */}
          <div className="flex items-center justify-center gap-0 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="p-3 cursor-hover"
              >
                <span className={`block h-2 rounded-full transition-all duration-300 ${
                  i === active
                    ? 'bg-nok-gold w-6'
                    : 'bg-nok-caption/30 hover:bg-nok-caption w-2'
                }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
