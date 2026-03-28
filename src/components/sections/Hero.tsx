import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { MagneticButton } from '../ui/MagneticButton'
import { ParticleField } from '../effects/ParticleField'
import { GradientMesh } from '../effects/GradientMesh'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' as const, delay },
})

const AVATARS = [
  'https://i.pravatar.cc/80?img=1',
  'https://i.pravatar.cc/80?img=2',
  'https://i.pravatar.cc/80?img=3',
  'https://i.pravatar.cc/80?img=4',
  'https://i.pravatar.cc/80?img=5',
]

export function Hero() {
  const [btnHovered, setBtnHovered] = useState(false)

  const primaryBtnRef = useRef<HTMLDivElement>(null)
  const secondaryBtnRef = useRef<HTMLAnchorElement>(null)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-nok-deep"
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <GradientMesh colors={['#F59E0B', '#0d9488', '#0f2920']} className="opacity-40" />
      </div>
      <div
        className="absolute inset-0 transition-none"
        style={{ zIndex: btnHovered ? 20 : 0 }}
      >
        <ParticleField buttonRefs={[primaryBtnRef, secondaryBtnRef]} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-nok-gold/30 bg-nok-gold/5 text-nok-gold text-sm font-medium mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-nok-gold animate-pulse" />
            AI-Powered Development Studio
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display text-hero mb-6"
            {...fadeUp(0.5)}
          >
            <span className="text-white">We Build What </span>
            <span
              className="bg-gradient-to-r from-nok-gold to-nok-teal bg-clip-text text-transparent"
              style={{ textShadow: '0 0 20px rgba(245,158,11,0.3)' }}
            >
              AI Makes Possible
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg lg:text-xl text-nok-body max-w-2xl mx-auto mb-10"
            {...fadeUp(0.7)}
          >
            Custom AI applications, intelligent automation, and next-gen digital
            products — built fast, built right.
          </motion.p>

          {/* CTA row */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
            {...fadeUp(0.9)}
          >
            <div
              ref={primaryBtnRef}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
            >
              <MagneticButton href="#contact">Start Your Project</MagneticButton>
            </div>
            <a
              ref={secondaryBtnRef}
              href="#casestudies"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#casestudies')?.scrollIntoView({ behavior: 'smooth' })
              }}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              className="cursor-hover inline-block px-8 py-4 rounded-xl border border-nok-border text-nok-body font-semibold hover:border-nok-gold hover:text-nok-gold transition-colors duration-200"
            >
              View Our Work &rarr;
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            {...fadeUp(1.1)}
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {AVATARS.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    width={32}
                    height={32}
                    loading="lazy"
                    decoding="async"
                    className="w-8 h-8 rounded-full border-2 border-nok-deep object-cover"
                  />
                ))}
              </div>
              <span className="text-sm text-nok-gold font-medium">★ 5.0</span>
            </div>
            <span className="text-sm text-nok-caption">
              Trusted by <span className="text-white font-medium">40+ businesses</span> worldwide
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
