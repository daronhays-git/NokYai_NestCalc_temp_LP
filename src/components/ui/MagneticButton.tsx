import {
  useRef,
  useState,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from 'react'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
}

export function MagneticButton({
  children,
  className = '',
  href,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: ReactMouseEvent) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distX = e.clientX - centerX
    const distY = e.clientY - centerY
    const distance = Math.sqrt(distX * distX + distY * distY)
    const radius = 100

    if (distance < radius) {
      const strength = 1 - distance / radius
      setOffset({
        x: distX * strength * 0.3,
        y: distY * strength * 0.3,
      })
    }
  }

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 })
  }

  const style = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    transition: offset.x === 0 && offset.y === 0
      ? 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      : 'transform 0.15s ease-out',
  }

  const baseClass = [
    'cursor-hover inline-block font-bold px-8 py-4 rounded-xl',
    'bg-nok-gold text-nok-deep',
    'hover:scale-[1.02] active:scale-[0.98]',
    'hover:shadow-[0_0_24px_rgba(245,158,11,0.4)]',
    'transition-[transform,box-shadow] duration-200',
    className,
  ].join(' ')

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseClass}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={baseClass}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
