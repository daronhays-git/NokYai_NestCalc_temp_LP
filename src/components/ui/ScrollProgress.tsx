import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf: number

    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

      if (barRef.current) {
        barRef.current.style.width = `${progress}%`
      }

      raf = requestAnimationFrame(update)
    }

    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px]" aria-hidden="true">
      <div
        ref={barRef}
        className="h-full"
        style={{
          background: 'linear-gradient(to right, #F59E0B, #0d9488)',
          boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)',
          width: '0%',
        }}
      />
    </div>
  )
}
