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

function TechCard({ name, icon, category }: (typeof TECH)[number]) {
  return (
    <div className="shrink-0">
      <GlowCard>
        <div className="flex items-center gap-2.5 px-1 py-0.5">
          <span className="text-xl leading-none">{icon}</span>
          <div>
            <p className="text-xs font-medium text-nok-body whitespace-nowrap">{name}</p>
            <p className="text-[9px] uppercase tracking-wider text-nok-caption">{category}</p>
          </div>
        </div>
      </GlowCard>
    </div>
  )
}

export function TechStack() {
  const doubled = [...TECH, ...TECH]

  return (
    <section id="ourtech" className="reveal-section py-16 lg:py-20 bg-nok-forest">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <SectionHeading
          title="Our Trusted Technologies"
          subtitle="Modern tools for modern solutions"
        />
      </div>

      <div className="overflow-hidden group">
        <div
          className="flex gap-4 w-max group-hover:[animation-play-state:paused]"
          style={{ animation: 'marquee-scroll 35s linear infinite' }}
        >
          {doubled.map((item, i) => (
            <TechCard key={`${item.name}-${i}`} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
