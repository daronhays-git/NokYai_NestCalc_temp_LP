import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initScrollAnimations() {
  // Reveal sections: fade up when 20% in viewport
  // Uses transform + opacity only for GPU compositing
  gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => {
    gsap.set(section, { willChange: 'transform, opacity' })

    gsap.fromTo(
      section,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
        onComplete() {
          gsap.set(section, { willChange: 'auto' })
        },
      }
    )
  })

  // Stagger children within marked containers
  gsap.utils.toArray<HTMLElement>('.stagger-children').forEach((container) => {
    const children = container.children
    if (!children.length) return

    gsap.fromTo(
      children,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          once: true,
        },
      }
    )
  })
}

export function cleanupScrollAnimations() {
  ScrollTrigger.killAll()
}
