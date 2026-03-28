import { useRef, useEffect, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  radius: number
  opacity: number
  tier: 'large' | 'medium' | 'small'
  phaseX: number
  phaseY: number
  ampX: number
  ampY: number
  speed: number
  // displacement from mouse push
  pushX: number
  pushY: number
}

function createParticles(width: number, height: number, count: number): Particle[] {
  const particles: Particle[] = []
  for (let i = 0; i < count; i++) {
    const roll = Math.random()
    let tier: Particle['tier']
    let radius: number
    let opacity: number

    if (roll < 0.2) {
      tier = 'large'
      radius = 4 + Math.random() * 2
      opacity = 0.8 + Math.random() * 0.2
    } else if (roll < 0.7) {
      tier = 'medium'
      radius = 2 + Math.random()
      opacity = 0.5 + Math.random() * 0.3
    } else {
      tier = 'small'
      radius = 1 + Math.random() * 0.5
      opacity = 0.2 + Math.random() * 0.2
    }

    const x = Math.random() * width
    const y = Math.random() * height

    particles.push({
      x,
      y,
      baseX: x,
      baseY: y,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius,
      opacity,
      tier,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      ampX: 0.3 + Math.random() * 0.5,
      ampY: 0.3 + Math.random() * 0.5,
      speed: 0.2 + Math.random() * 0.3,
      pushX: 0,
      pushY: 0,
    })
  }
  return particles
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })
  const trailRef = useRef<{ x: number; y: number }[]>([])
  const timeRef = useRef(0)
  const visibleRef = useRef(true)
  const sizeRef = useRef({ w: 0, h: 0 })

  const getCount = useCallback(() => {
    return window.matchMedia('(max-width: 768px)').matches ? 60 : 120
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // --- Sizing ---
    function resize() {
      const parent = canvas!.parentElement
      if (!parent) return
      const dpr = Math.min(window.devicePixelRatio, 2)
      const w = parent.clientWidth
      const h = parent.clientHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = `${w}px`
      canvas!.style.height = `${h}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      const oldW = sizeRef.current.w
      const oldH = sizeRef.current.h
      sizeRef.current = { w, h }

      // Reinit particles on first load or large resize
      if (oldW === 0 || Math.abs(w - oldW) > 200 || Math.abs(h - oldH) > 200) {
        particlesRef.current = createParticles(w, h, getCount())
      }
    }
    resize()

    // --- Mouse tracking ---
    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
      mouseRef.current.active = true

      // Update trail
      const trail = trailRef.current
      trail.unshift({ x: mouseRef.current.x, y: mouseRef.current.y })
      if (trail.length > 20) trail.length = 20
    }

    function onMouseLeave() {
      mouseRef.current.active = false
      trailRef.current = []
    }

    // --- Intersection Observer ---
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    // --- Animation loop ---
    function animate() {
      rafRef.current = requestAnimationFrame(animate)

      if (!visibleRef.current) return

      const { w, h } = sizeRef.current
      const particles = particlesRef.current
      const mouse = mouseRef.current
      const trail = trailRef.current

      timeRef.current += 1
      const t = timeRef.current * 0.01

      ctx!.clearRect(0, 0, w, h)

      const PUSH_RADIUS = 200
      const LINE_RADIUS = 150
      const MOUSE_LINE_RADIUS = 200

      // --- Update particles ---
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Sine-wave drift
        const sineX = Math.sin(t * p.speed + p.phaseX) * p.ampX
        const sineY = Math.cos(t * p.speed * 0.7 + p.phaseY) * p.ampY

        // Base movement
        p.baseX += p.vx
        p.baseY += p.vy

        // Wrap around
        if (p.baseX < -20) p.baseX = w + 20
        else if (p.baseX > w + 20) p.baseX = -20
        if (p.baseY < -20) p.baseY = h + 20
        else if (p.baseY > h + 20) p.baseY = -20

        // Target position (base + sine)
        const targetX = p.baseX + sineX
        const targetY = p.baseY + sineY

        // Mouse push
        if (mouse.active) {
          const dx = targetX + p.pushX - mouse.x
          const dy = targetY + p.pushY - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < PUSH_RADIUS && dist > 0.1) {
            const force = ((PUSH_RADIUS - dist) / PUSH_RADIUS) * 8
            p.pushX += (dx / dist) * force
            p.pushY += (dy / dist) * force
          }
        }

        // Spring return — ease push displacement back to 0
        p.pushX *= 0.96
        p.pushY *= 0.96

        // Final position
        p.x = targetX + p.pushX
        p.y = targetY + p.pushY
      }

      // --- Draw connection lines between nearby particles ---
      ctx!.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < LINE_RADIUS) {
            const alpha = (1 - dist / LINE_RADIUS) * 0.08
            ctx!.beginPath()
            ctx!.strokeStyle = `rgba(0, 240, 255, ${alpha})`
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.stroke()
          }
        }
      }

      // --- Draw cursor glow ---
      if (mouse.active) {
        const glow = ctx!.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 150)
        glow.addColorStop(0, 'rgba(0, 240, 255, 0.08)')
        glow.addColorStop(1, 'rgba(0, 240, 255, 0)')
        ctx!.fillStyle = glow
        ctx!.beginPath()
        ctx!.arc(mouse.x, mouse.y, 150, 0, Math.PI * 2)
        ctx!.fill()
      }

      // --- Draw mouse-to-particle gold lines ---
      if (mouse.active) {
        ctx!.lineWidth = 1
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_LINE_RADIUS) {
            const alpha = (1 - dist / MOUSE_LINE_RADIUS) * 0.6
            ctx!.beginPath()
            ctx!.strokeStyle = `rgba(245, 158, 11, ${alpha})`
            ctx!.moveTo(mouse.x, mouse.y)
            ctx!.lineTo(p.x, p.y)
            ctx!.stroke()
          }
        }
      }

      // --- Draw cursor trail ---
      if (mouse.active && trail.length > 1) {
        for (let i = 0; i < trail.length; i++) {
          const alpha = (1 - i / trail.length) * 0.4
          const r = 2
          const grad = ctx!.createRadialGradient(
            trail[i].x, trail[i].y, 0,
            trail[i].x, trail[i].y, r
          )
          grad.addColorStop(0, `rgba(0, 240, 255, ${alpha})`)
          grad.addColorStop(1, 'rgba(0, 240, 255, 0)')
          ctx!.fillStyle = grad
          ctx!.beginPath()
          ctx!.arc(trail[i].x, trail[i].y, r, 0, Math.PI * 2)
          ctx!.fill()
        }
      }

      // --- Draw particles (glowing orbs with radial gradient) ---
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const grad = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius)
        grad.addColorStop(0, `rgba(255, 255, 255, ${p.opacity})`)
        grad.addColorStop(0.4, `rgba(255, 255, 255, ${p.opacity * 0.6})`)
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx!.fillStyle = grad
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    animate()

    // --- Event listeners ---
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', resize)
    }
  }, [getCount])

  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  )
}
