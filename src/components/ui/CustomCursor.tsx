import { useEffect, useState } from 'react'
import { m, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false)
  const [hovered, setHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const ringX = useSpring(mouseX, { stiffness: 250, damping: 20, mass: 0.5 })
  const ringY = useSpring(mouseY, { stiffness: 250, damping: 20, mass: 0.5 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    document.body.style.cursor = 'none'

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.cursor-hover')
      ) {
        setHovered(true)
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.cursor-hover')
      ) {
        setHovered(false)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
    }
  }, [mouseX, mouseY])

  if (isTouch) return null

  return (
    <>
      {/* Inner dot */}
      <m.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-2 h-2 rounded-full bg-white"
        aria-hidden="true"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Outer ring */}
      <m.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full mix-blend-difference"
        aria-hidden="true"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: 32,
          height: 32,
        }}
        animate={{
          scale: hovered ? 1.5 : 1,
          borderColor: hovered ? '#F59E0B' : 'rgba(255, 255, 255, 0.4)',
          borderWidth: 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </>
  )
}
