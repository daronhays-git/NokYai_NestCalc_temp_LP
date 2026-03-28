import { motion } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'

const PROJECTS = [
  {
    category: 'AI Application',
    title: 'Intelligent Document Processing',
    description: 'Automated extraction and classification for a Fortune 500 insurer.',
    gradient: 'from-nok-gold/60 to-nok-teal/40',
    metrics: ['3x faster processing', '95% accuracy'],
  },
  {
    category: 'Automation',
    title: 'E-Commerce Fulfillment Engine',
    description: 'End-to-end order orchestration replacing manual workflows.',
    gradient: 'from-nok-teal/60 to-nok-gold/40',
    metrics: ['40% cost reduction', '2-day → 4-hour cycle'],
  },
  {
    category: 'Web Platform',
    title: 'Real-Time Analytics Dashboard',
    description: 'Live data visualization platform serving 10k concurrent users.',
    gradient: 'from-nok-gold/60 to-nok-teal/40',
    metrics: ['50ms p99 latency', '10k concurrent users'],
  },
]

const OFFSETS = [
  'lg:translate-y-0 z-30',
  'lg:-translate-y-4 z-20',
  'lg:translate-y-2 z-10',
]

export function CaseStudies() {
  return (
    <section id="casestudies" className="reveal-section py-24 lg:py-32 overflow-hidden bg-nok-forest">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Our Work"
          subtitle="Selected projects that moved the needle"
        />

        <div className="flex gap-6 lg:gap-8 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory lg:snap-none no-scrollbar lg:-mr-4">
          {PROJECTS.map((project, i) => (
            <motion.a
              key={project.title}
              href="#"
              className={`group cursor-hover flex-shrink-0 w-[85vw] sm:w-[70vw] lg:w-auto lg:flex-1 lg:min-w-0 snap-center ${OFFSETS[i]}`}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.15, ease: 'easeOut' }}
              onClick={(e) => e.preventDefault()}
            >
              {/* Image area */}
              <div className="aspect-video rounded-xl overflow-hidden relative mb-5">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-500 group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-nok-deep/0 group-hover:bg-nok-deep/20 transition-colors duration-300" />
              </div>

              {/* Category tag */}
              <span className="inline-block text-xs font-medium text-nok-gold border border-nok-gold/30 rounded-full px-3 py-1 mb-3">
                {project.category}
              </span>

              {/* Title + description */}
              <h3 className="font-display text-xl text-white mb-1">{project.title}</h3>
              <p className="text-nok-body text-sm mb-4">{project.description}</p>

              {/* Metrics */}
              <div className="flex flex-wrap gap-3">
                {project.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="text-xs font-medium text-nok-gold bg-nok-gold/10 rounded-full px-3 py-1"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
