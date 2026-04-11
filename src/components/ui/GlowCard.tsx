import { useRef, useState, type ReactNode, type MouseEvent } from 'react'

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export function GlowCard({
  children,
  className = '',
  glowColor = '#F59E0B',
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')
  const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    const rotateX = (y - 0.5) * -12
    const rotateY = (x - 0.5) * 12

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    )
    setGradientPos({ x: x * 100, y: y * 100 })
  }

  const handleMouseLeave = () => {
    setTransform('')
    setHovered(false)
  }

  const handleMouseEnter = () => {
    setHovered(true)
  }

  return (
    <div
      ref={cardRef}
      className={`relative rounded-2xl transition-transform duration-300 ease-out overflow-visible ${className}`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow halo (blurred, behind everything) */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 transition-opacity duration-500 -z-10"
        style={{
          opacity: hovered ? 0.6 : 0,
          background: `conic-gradient(from 0deg at ${gradientPos.x}% ${gradientPos.y}%, ${glowColor}, #0d9488, ${glowColor})`,
          filter: 'blur(16px)',
        }}
      />

      {/* Animated gradient border */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: `conic-gradient(from 0deg at ${gradientPos.x}% ${gradientPos.y}%, ${glowColor}, #0d9488, ${glowColor})`,
        }}
      />

      {/* Card content layer */}
      <div className="relative rounded-2xl bg-nok-surface border border-nok-border p-7 overflow-visible">
        {children}
      </div>
    </div>
  )
}
