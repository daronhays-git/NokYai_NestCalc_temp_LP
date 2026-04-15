import { SectionHeading } from '../ui/SectionHeading'

export function Testimonials() {
  return (
    <section id="trust" className="reveal-section py-12 sm:py-16 lg:py-32 bg-nok-forest">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="What Our Clients Say" />

        <div className="max-w-3xl mx-auto">
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 md:p-12 text-center">
            <svg
              className="mx-auto mb-4 w-12 h-12 text-nok-gold/30"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.3 2.7c-4.2 1.8-7 5.6-7 10.2 0 3.4 2.1 5.8 4.7 5.8 2.3 0 4-1.7 4-4.1 0-2.2-1.5-3.8-3.5-3.8-.4 0-.9.1-1.2.2.5-2.7 2.8-5.4 5.5-6.7L11.3 2.7zm10.2 0c-4.2 1.8-7 5.6-7 10.2 0 3.4 2.1 5.8 4.7 5.8 2.3 0 4-1.7 4-4.1 0-2.2-1.5-3.8-3.5-3.8-.4 0-.9.1-1.2.2.5-2.7 2.8-5.4 5.5-6.7L21.5 2.7z" />
            </svg>
            <span className="inline-block text-xs font-medium uppercase tracking-widest text-nok-caption">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
