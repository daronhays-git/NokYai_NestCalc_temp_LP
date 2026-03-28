import { useRef, useEffect, useCallback, type RefObject } from 'react'
import { BIRD_PATHS, BIRD_BOUNDS } from '../../lib/birdPaths'

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

interface ParticleFieldProps {
  buttonRefs?: RefObject<HTMLElement | null>[]
}

export function ParticleField({ buttonRefs }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })
  const trailRef = useRef<{ x: number; y: number }[]>([])
  const timeRef = useRef(0)
  const visibleRef = useRef(true)
  const sizeRef = useRef({ w: 0, h: 0 })

  // Bird (Path2D) refs
  const birdPathsRef = useRef<Path2D[]>([])
  const birdReadyRef = useRef(false)
  const birdPosRef = useRef({ x: 0, y: 0 })
  const birdScaleRef = useRef(0.1)
  const birdStateRef = useRef<'idle' | 'flying' | 'returning'>('idle')
  const birdVelRef = useRef({ x: 0, y: 0 })
  const birdTargetRef = useRef({ x: 0, y: 0 })
  const birdPerchRef = useRef({ x: 0, y: 0 })
  const birdTrailRef = useRef<{ x: number; y: number; age: number }[]>([])

  // Button interaction refs
  const buttonHoverActiveRef = useRef(false)
  const buttonZonesRef = useRef<{ x: number; y: number; w: number; h: number }[]>([])

  const getCount = useCallback(() => {
    return window.matchMedia('(max-width: 768px)').matches ? 60 : 120
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // --- Sizing ---
    const dprRef = { value: 1 }
    function resize() {
      const parent = canvas!.parentElement
      if (!parent) return
      const dpr = Math.min(window.devicePixelRatio, 2)
      dprRef.value = dpr
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

      // Update bird perch position on resize
      const perch = { x: w * 0.82, y: h * 0.42 }
      birdPerchRef.current = perch
      birdPosRef.current = { x: perch.x, y: perch.y }

      // Measure button exclusion zones
      if (buttonRefs && canvas) {
        const cRect = canvas.getBoundingClientRect()
        buttonZonesRef.current = buttonRefs
          .map((ref) => ref.current)
          .filter(Boolean)
          .map((el) => {
            const r = el!.getBoundingClientRect()
            return {
              x: r.left - cRect.left,
              y: r.top - cRect.top,
              w: r.width,
              h: r.height,
            }
          })
      }
    }
    resize()

    // --- Build Path2D objects from SVG path data ---
    birdPathsRef.current = BIRD_PATHS.map((d) => new Path2D(d))
    birdScaleRef.current = 128 / (BIRD_BOUNDS.maxX - BIRD_BOUNDS.minX)

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

      // Trigger bird flight toward cursor
      if (birdReadyRef.current) {
        birdStateRef.current = 'flying'
        birdTargetRef.current = { x: mouseRef.current.x, y: mouseRef.current.y }
      }
    }

    function onMouseLeave() {
      mouseRef.current.active = false
      trailRef.current = []

      // Send bird back to perch
      birdStateRef.current = 'returning'
      birdTargetRef.current = { x: birdPerchRef.current.x, y: birdPerchRef.current.y }
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
            ctx!.strokeStyle = `rgba(245, 158, 11, ${alpha})`
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.stroke()
          }
        }
      }

      // --- Draw cursor glow ---
      if (mouse.active) {
        const glow = ctx!.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 150)
        glow.addColorStop(0, 'rgba(245, 158, 11, 0.08)')
        glow.addColorStop(1, 'rgba(245, 158, 11, 0)')
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
          grad.addColorStop(0, `rgba(245, 158, 11, ${alpha})`)
          grad.addColorStop(1, 'rgba(245, 158, 11, 0)')
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

      // --- Per-frame button hover check ---
      if (mouseRef.current.active && buttonRefs) {
        const cvs = canvasRef.current
        if (cvs) {
          const cRect = cvs.getBoundingClientRect()
          let hovering = false
          let hx = 0
          let hy = 0

          for (const ref of buttonRefs) {
            const el = ref.current
            if (!el) continue
            const r = el.getBoundingClientRect()
            const mx = mouseRef.current.x + cRect.left
            const my = mouseRef.current.y + cRect.top

            if (mx >= r.left && mx <= r.right &&
                my >= r.top && my <= r.bottom) {
              hovering = true
              hx = (r.left + r.width / 2) - cRect.left
              hy = r.top - cRect.top
              break
            }
          }

          buttonHoverActiveRef.current = hovering
          if (hovering) {
            birdTargetRef.current.x = hx
            birdTargetRef.current.y = hy - 80
          }
        }
      } else {
        buttonHoverActiveRef.current = false
      }

      // --- Bird flight physics ---
      if (birdReadyRef.current) {
        const state = birdStateRef.current
        const pos = birdPosRef.current
        const vel = birdVelRef.current
        const target = birdTargetRef.current

        if (state === 'flying') {
          if (buttonHoverActiveRef.current) {
            // Snappier acceleration toward button
            const dx = target.x - pos.x
            const dy = target.y - pos.y
            vel.x += dx * 0.004
            vel.y += dy * 0.004
          } else {
            // Update target to current mouse position each frame
            if (mouseRef.current.active) {
              target.x = mouseRef.current.x
              target.y = mouseRef.current.y
            }

            const dx = target.x - pos.x
            const dy = target.y - pos.y
            vel.x += dx * 0.002
            vel.y += dy * 0.002
          }

          // Friction for momentum/overshoot feel
          vel.x *= 0.95
          vel.y *= 0.95

          // Cap max speed
          const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y)
          if (speed > 6) {
            vel.x = (vel.x / speed) * 6
            vel.y = (vel.y / speed) * 6
          }

          pos.x += vel.x
          pos.y += vel.y

          // Button exclusion — push bird upward out of button zones
          {
            const bScale = birdScaleRef.current
            const birdHeight = (BIRD_BOUNDS.maxY - BIRD_BOUNDS.minY) * bScale
            const birdBottom = pos.y + birdHeight / 2
            for (const zone of buttonZonesRef.current) {
              const pad = 15
              const left = zone.x - pad
              const top = zone.y - pad
              const right = zone.x + zone.w + pad
              const bottom = zone.y + zone.h + pad
              if (pos.x > left && pos.x < right &&
                  birdBottom > top && pos.y < bottom) {
                pos.y = top - birdHeight / 2
                vel.y = Math.min(vel.y, 0)
              }
            }
          }

          // Emit trail dots
          if (speed > 1 && timeRef.current % 3 === 0) {
            birdTrailRef.current.unshift({ x: pos.x, y: pos.y, age: 0 })
            if (birdTrailRef.current.length > 15) {
              birdTrailRef.current.pop()
            }
          }
        }

        if (state === 'returning') {
          const dx = target.x - pos.x
          const dy = target.y - pos.y
          vel.x += dx * 0.003
          vel.y += dy * 0.003
          vel.x *= 0.93
          vel.y *= 0.93

          pos.x += vel.x
          pos.y += vel.y

          // Button exclusion — push bird upward out of button zones
          {
            const bScale = birdScaleRef.current
            const birdHeight = (BIRD_BOUNDS.maxY - BIRD_BOUNDS.minY) * bScale
            const birdBottom = pos.y + birdHeight / 2
            for (const zone of buttonZonesRef.current) {
              const pad = 15
              const left = zone.x - pad
              const top = zone.y - pad
              const right = zone.x + zone.w + pad
              const bottom = zone.y + zone.h + pad
              if (pos.x > left && pos.x < right &&
                  birdBottom > top && pos.y < bottom) {
                pos.y = top - birdHeight / 2
                vel.y = Math.min(vel.y, 0)
              }
            }
          }

          // Settle back to idle when close and slow
          const dist = Math.sqrt(dx * dx + dy * dy)
          const spd = Math.sqrt(vel.x * vel.x + vel.y * vel.y)
          if (dist < 3 && spd < 0.3) {
            pos.x = target.x
            pos.y = target.y
            vel.x = 0
            vel.y = 0
            birdStateRef.current = 'idle'
          }
        }

        if (state === 'idle') {
          // Gentle breathing/bobbing at perch
          pos.x = birdPerchRef.current.x + Math.sin(t * 0.8) * 2
          pos.y = birdPerchRef.current.y + Math.sin(t * 1.2) * 1.5
        }

        // Age and cull trail dots
        const bt = birdTrailRef.current
        for (let i = bt.length - 1; i >= 0; i--) {
          bt[i].age += 1
          if (bt[i].age > 30) bt.splice(i, 1)
        }
      }

      // --- Draw bird trail ---
      for (let i = 0; i < birdTrailRef.current.length; i++) {
        const dot = birdTrailRef.current[i]
        const alpha = (1 - dot.age / 30) * 0.25
        const radius = (1 - dot.age / 30) * 2
        ctx!.beginPath()
        ctx!.arc(dot.x, dot.y, radius, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(245, 158, 11, ${alpha})`
        ctx!.fill()
      }

      // --- Draw bird (Path2D eagle logo) ---
      if (birdReadyRef.current) {
        const hovering = buttonHoverActiveRef.current
        const scale = birdScaleRef.current
        const bw = (BIRD_BOUNDS.maxX - BIRD_BOUNDS.minX) * scale
        const bh = (BIRD_BOUNDS.maxY - BIRD_BOUNDS.minY) * scale
        const bx = birdPosRef.current.x - bw / 2
        const by = birdPosRef.current.y - bh / 2
        const cx = bx + bw / 2
        const cy = by + bh / 2

        ctx!.save()

        // Mirror horizontally when flying left
        const facingLeft = birdVelRef.current.x < -0.3
        ctx!.translate(cx, cy)
        if (facingLeft) {
          ctx!.scale(-1, 1)
        }

        // Pulse scale when button is hovered
        if (hovering) {
          const pulseScale = 1.0 + Math.sin(timeRef.current * 0.15) * 0.05
          ctx!.scale(pulseScale, pulseScale)
        }

        ctx!.translate(-cx, -cy)

        ctx!.translate(bx, by)
        ctx!.scale(scale, scale)
        ctx!.translate(-BIRD_BOUNDS.minX, -BIRD_BOUNDS.minY)

        // Conditional glow/stroke based on button hover
        const glowAlpha = hovering ? 0.3 : 0.12
        const strokeAlpha = hovering ? 1.0 : 0.85
        const strokeWidth = hovering ? 5 : 4

        // Glow layer (wider, transparent)
        ctx!.strokeStyle = `rgba(245, 158, 11, ${glowAlpha})`
        ctx!.lineWidth = 12
        ctx!.lineCap = 'round'
        ctx!.lineJoin = 'round'
        for (const p of birdPathsRef.current) {
          ctx!.stroke(p)
        }

        // Main gold stroke
        ctx!.strokeStyle = `rgba(245, 158, 11, ${strokeAlpha})`
        ctx!.lineWidth = strokeWidth
        for (const p of birdPathsRef.current) {
          ctx!.stroke(p)
        }

        ctx!.restore()
      }
    }

    animate()

    // --- Bird reveal after 1.2 seconds ---
    const birdTimer = setTimeout(() => {
      birdReadyRef.current = true
    }, 1200)

    // --- Event listeners ---
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', resize)

    return () => {
      clearTimeout(birdTimer)
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
