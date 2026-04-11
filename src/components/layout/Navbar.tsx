import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagneticButton } from '../ui/MagneticButton'
import nokYaiLogo from '../../assets/NokYai-logo-gold-green.png'

const NAV_LINKS = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Trust', href: '#trust' },
  { label: 'Our Tech', href: '#ourtech' },
  { label: 'Why NestCalc', href: '#whynestcalc' },
  { label: 'Contact Us', href: '#contactus' },
]

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1))

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Intersection observer for active section
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={[
          'fixed top-0 left-0 right-0 z-[50] transition-all duration-300 ease-in-out',
          scrolled
            ? 'bg-nok-deep/80 backdrop-blur-xl border-b border-nok-border/50'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
            className="flex items-center gap-2 font-display font-extrabold text-xl cursor-hover"
          >
            <img src={nokYaiLogo} alt="NestCalc" className="h-10 w-auto" />
            <span><span style={{ color: '#6DC99E', textShadow: '0 0 20px rgba(109,201,158,0.3)' }}>Nest</span><span style={{ color: '#fcd34d', textShadow: '0 0 20px rgba(252,211,77,0.4)' }}>Calc.ai</span></span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                  className={[
                    'relative text-sm font-body font-medium transition-colors duration-200 cursor-hover',
                    isActive ? 'text-white' : 'text-nok-caption hover:text-white',
                  ].join(' ')}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0.5 h-0.5 rounded-full bg-nok-gold" />
                  )}
                </a>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <MagneticButton
              href="#contactus"
              className="!px-5 !py-3 !text-sm !rounded-lg"
              onClick={() => scrollTo('#contactus')}
            >
              Start a Project
            </MagneticButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-1.5 cursor-hover"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.span
              className="block w-5 h-px bg-white origin-center"
              animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-px bg-white origin-center"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block w-5 h-px bg-white origin-center"
              animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[49] bg-nok-deep/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                className={[
                  'text-2xl font-body font-medium transition-colors py-2',
                  activeId === link.href.slice(1) ? 'text-white' : 'text-nok-caption',
                ].join(' ')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.05 + i * 0.07, duration: 0.3 }}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.05 + NAV_LINKS.length * 0.07, duration: 0.3 }}
            >
              <MagneticButton
                href="#contactus"
                className="!text-base"
                onClick={() => scrollTo('#contactus')}
              >
                Start a Project
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
