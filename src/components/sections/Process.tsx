import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '../ui/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We learn your business, goals, and technical needs.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Wireframes, prototypes, and architecture planning.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Rapid development with weekly demos and feedback loops.',
  },
  {
    number: '04',
    title: 'Launch & Scale',
    description: 'Deploy, monitor, and optimize for growth.',
  },
]

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Desktop: horizontal line draws left-to-right
      const mmDesktop = gsap.matchMedia()

      mmDesktop.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: false,
            once: true,
          },
        })

        tl.fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: 'power2.out' }
        )

        nodesRef.current.forEach((node, i) => {
          if (!node) return
          tl.fromTo(
            node,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
            0.25 + i * 0.2
          )
        })
      })

      // Mobile: vertical line draws top-to-bottom
      mmDesktop.add('(max-width: 767px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        })

        tl.fromTo(
          lineRef.current,
          { scaleY: 0 },
          { scaleY: 1, duration: 1.2, ease: 'power2.out' }
        )

        nodesRef.current.forEach((node, i) => {
          if (!node) return
          tl.fromTo(
            node,
            { opacity: 0, x: -15 },
            { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
            0.25 + i * 0.2
          )
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="process" className="reveal-section py-12 sm:py-16 lg:py-32 bg-nok-medium" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="How We Work"
          subtitle="From concept to launch in weeks, not months"
        />

        {/* Timeline container */}
        <div className="relative">
          {/* ── Desktop: horizontal ──────────────────────── */}
          <div className="hidden md:block">
            {/* Gradient line */}
            <div className="relative mx-8">
              <div
                ref={lineRef}
                className="h-[2px] origin-left"
                style={{
                  background: 'linear-gradient(to right, #F59E0B, #0d9488, #F59E0B)',
                  transform: 'scaleX(0)',
                }}
              />
            </div>

            {/* Step nodes */}
            <div className="grid grid-cols-4 -mt-[9px]">
              {STEPS.map((step, i) => (
                <div
                  key={step.number}
                  ref={(el) => { nodesRef.current[i] = el }}
                  className="flex flex-col items-center text-center opacity-0"
                >
                  {/* Step number circle */}
                  <div className="w-8 h-8 rounded-full bg-nok-gold flex items-center justify-center mb-4 shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.4)]">
                    <span className="text-xs font-bold text-nok-deep">
                      {step.number}
                    </span>
                  </div>

                  {/* Text */}
                  <h3 className="font-display text-lg text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-nok-body max-w-[200px]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Mobile: vertical ─────────────────────────── */}
          <div className="md:hidden relative pl-10">
            {/* Vertical gradient line */}
            <div
              ref={(el) => {
                // On mobile, reuse lineRef for the vertical line
                if (window.matchMedia('(max-width: 767px)').matches) {
                  (lineRef as React.MutableRefObject<HTMLDivElement | null>).current = el
                }
              }}
              className="absolute left-[7px] top-0 bottom-0 w-[2px] origin-top"
              style={{
                background: 'linear-gradient(to bottom, #F59E0B, #0d9488, #F59E0B)',
                transform: 'scaleY(0)',
              }}
            />

            {/* Step nodes */}
            <div className="flex flex-col gap-8 lg:gap-12">
              {STEPS.map((step, i) => (
                <div
                  key={step.number}
                  ref={(el) => {
                    if (window.matchMedia('(max-width: 767px)').matches) {
                      nodesRef.current[i] = el
                    }
                  }}
                  className="relative opacity-0"
                >
                  {/* Circle indicator on the line */}
                  <div className="absolute -left-10 top-0.5 w-6 h-6 rounded-full bg-nok-gold flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.4)]">
                    <span className="text-[10px] font-bold text-nok-deep">
                      {step.number}
                    </span>
                  </div>

                  {/* Text */}
                  <h3 className="font-display text-lg text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-nok-body">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
