import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LegalModalProps {
  open: boolean
  onClose: () => void
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export function LegalModal({ open, onClose, title, lastUpdated, children }: LegalModalProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-nok-deep/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Top bar */}
          <div className="fixed top-0 left-0 right-0 z-[101] bg-nok-deep/90 backdrop-blur-md border-b border-nok-border/50 px-6 py-4 flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-nok-body hover:text-white transition-colors text-sm font-medium"
            >
              &larr; Back to NestCalc
            </button>
            <span className="font-display font-bold text-lg">
              <span style={{ color: '#6ee7b7' }}>Nest</span>
              <span style={{ color: '#fcd34d' }}>Calc.ai</span>
            </span>
          </div>

          {/* Content */}
          <div className="max-w-3xl w-full px-6 pt-24 pb-16">
            <h1 className="font-display text-section text-white mb-2">{title}</h1>
            <p className="text-sm text-nok-caption italic mb-10">Last Updated: {lastUpdated}</p>
            <div className="legal-content text-nok-body text-base leading-relaxed">
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
