import { motion } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'
import { GlowCard } from '../ui/GlowCard'

const TECH = [
  { name: 'React', icon: '⚛', category: 'Frontend' },
  { name: 'Next.js', icon: '▲', category: 'Frontend' },
  { name: 'TypeScript', icon: 'TS', category: 'Frontend' },
  { name: 'Tailwind', icon: '🌊', category: 'Frontend' },
  { name: 'Python', icon: '🐍', category: 'Backend' },
  { name: 'Node.js', icon: '⬢', category: 'Backend' },
  { name: 'Supabase', icon: '⚡', category: 'Backend' },
  { name: 'AWS', icon: '☁', category: 'Backend' },
  { name: 'OpenAI', icon: '◎', category: 'AI / ML' },
  { name: 'Claude API', icon: '◈', category: 'AI / ML' },
  { name: 'LangChain', icon: '🔗', category: 'AI / ML' },
  { name: 'TensorFlow', icon: 'TF', category: 'AI / ML' },
]

export function TechStack() {
  return (
    <section id="techstack" className="reveal-section py-24 lg:py-32 bg-nok-forest">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Our Technology Stack"
          subtitle="Modern tools for modern solutions"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {TECH.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <GlowCard className="h-full">
                <div className="flex flex-col items-center text-center gap-3 py-2">
                  <span className="text-3xl leading-none transition-transform duration-200 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-nok-body">
                      {item.name}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-nok-gold/60 mt-0.5">
                      {item.category}
                    </p>
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
