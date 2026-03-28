const LOGOS = [
  { name: 'React', icon: '⚛' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Python', icon: '🐍' },
  { name: 'OpenAI', icon: '◎' },
  { name: 'Claude', icon: '◈' },
  { name: 'AWS', icon: '☁' },
  { name: 'Vercel', icon: '▲' },
  { name: 'Supabase', icon: '⚡' },
  { name: 'Stripe', icon: 'S' },
  { name: 'TailwindCSS', icon: '🌊' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'Node.js', icon: '⬢' },
]

function LogoItem({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="flex items-center gap-2 shrink-0 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-300 select-none">
      <span className="text-2xl" aria-hidden="true">{icon}</span>
      <span className="text-sm font-medium text-nok-caption whitespace-nowrap">{name}</span>
    </div>
  )
}

export function LogoBar() {
  const doubled = [...LOGOS, ...LOGOS]

  return (
    <section id="logobar" className="reveal-section py-12 bg-nok-forest border-y border-nok-border-light">
      <p className="text-xs font-medium uppercase tracking-widest text-nok-caption text-center mb-6">
        Trusted Technologies
      </p>

      <div className="overflow-hidden group">
        <div
          className="flex gap-16 w-max group-hover:[animation-play-state:paused]"
          style={{ animation: 'marquee-scroll 30s linear infinite' }}
        >
          {doubled.map((logo, i) => (
            <LogoItem key={`${logo.name}-${i}`} name={logo.name} icon={logo.icon} />
          ))}
        </div>
      </div>
    </section>
  )
}
