import { MagneticButton } from '../ui/MagneticButton'
import { GradientMesh } from '../effects/GradientMesh'

const FLOATERS = [
  { size: 'w-3 h-3', pos: 'top-12 left-[10%]', delay: '0s', color: '#F59E0B' },
  { size: 'w-2 h-2', pos: 'bottom-16 right-[12%]', delay: '-1.5s', color: '#0d9488' },
  { size: 'w-2.5 h-2.5', pos: 'top-1/3 right-[20%]', delay: '-2.5s', color: '#F59E0B' },
]

export function CTABand() {
  return (
    <section
      id="ctaband"
      className="reveal-section relative py-24 overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #1a3a2a 0%, #2d5a42 50%, #1a3a2a 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradient-shift 6s ease infinite',
      }}
    >
      <GradientMesh
        colors={['#F59E0B', '#0d9488', '#0f2920']}
        className="opacity-30"
      />

      {/* Floating decorative circles */}
      {FLOATERS.map((f, i) => (
        <div
          key={i}
          className={`absolute ${f.size} ${f.pos} rounded-full animate-float pointer-events-none`}
          style={{
            backgroundColor: f.color,
            boxShadow: `0 0 20px ${f.color}60`,
            animationDelay: f.delay,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h2 className="font-display text-4xl lg:text-5xl text-white max-w-3xl mx-auto">
          Ready to Build Something Extraordinary?
        </h2>
        <p className="text-lg text-nok-body mt-4 max-w-xl mx-auto">
          Let&rsquo;s turn your idea into a product your users love.
        </p>
        <div className="mt-8">
          <MagneticButton href="#contact" className="!px-10 !py-5 !text-lg">
            Start Your Project &rarr;
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
