import { useState } from 'react'
import nokYaiLogo from '../../assets/NokYai-logo-gold-green.png'
import { LegalModal } from '../legal/LegalModal'
import { PrivacyPolicyContent } from '../legal/PrivacyPolicy'
import { TermsOfServiceContent } from '../legal/TermsOfService'
import { DisclaimerContent } from '../legal/Disclaimer'

type LegalPage = 'privacy' | 'terms' | 'disclaimer' | null

const SERVICES = [
  { label: 'AI Apps', href: '#solutions' },
  { label: 'Websites', href: '#solutions' },
  { label: 'Web / Mobile', href: '#solutions' },
  { label: 'Consulting', href: '#solutions' },
]

const COMPANY = [
  { label: 'Why NestCalc', href: '#whynestcalc' },
  { label: 'Our Tech', href: '#ourtech' },
  { label: 'Contact Us', href: '#contactus' },
]

const LEGAL_LINKS: { label: string; key: LegalPage }[] = [
  { label: 'Privacy Policy', key: 'privacy' },
  { label: 'Terms of Service', key: 'terms' },
  { label: 'Disclaimer', key: 'disclaimer' },
]

function FooterLinks({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
      <ul className="space-y-1">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="inline-block py-1.5 text-sm text-nok-caption hover:text-white transition-colors duration-200">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  const [activeLegal, setActiveLegal] = useState<LegalPage>(null)

  return (
    <>
      <footer className="bg-nok-deep border-t border-nok-border py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <a href="#hero" className="inline-flex flex-col items-start mb-3">
                <img src={nokYaiLogo} alt="NestCalc" className="h-12 w-auto mb-2" />
                <span className="font-display font-extrabold text-xl">
                  <span style={{ color: '#6ee7b7', textShadow: '0 0 20px rgba(110,231,183,0.3)' }}>Nest</span>
                  <span style={{ color: '#fcd34d', textShadow: '0 0 20px rgba(252,211,77,0.4)' }}>Calc.ai</span>
                </span>
              </a>
              <p className="text-sm text-nok-caption mb-5">
                AI-powered development studio building the future, fast.
              </p>

              {/* Social icons — hidden until accounts are set up */}
            </div>

            <FooterLinks title="Services" links={SERVICES} />
            <FooterLinks title="Company" links={COMPANY} />

            {/* Legal — clickable buttons instead of anchor links */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-1">
                {LEGAL_LINKS.map((l) => (
                  <li key={l.key}>
                    <button
                      onClick={() => setActiveLegal(l.key)}
                      className="inline-block py-1.5 text-sm text-nok-caption hover:text-white transition-colors duration-200"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-nok-border/50 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-nok-caption">
              &copy; 2026 NestCalc.ai. All rights reserved.
            </p>
            <p className="text-sm text-nok-caption">
              Built with AI. Perfected by humans.
            </p>
          </div>
        </div>
      </footer>

      {/* Legal Modals */}
      <LegalModal
        open={activeLegal === 'privacy'}
        onClose={() => setActiveLegal(null)}
        title="Privacy Policy"
        lastUpdated="March 29, 2026"
      >
        <PrivacyPolicyContent />
      </LegalModal>

      <LegalModal
        open={activeLegal === 'terms'}
        onClose={() => setActiveLegal(null)}
        title="Terms of Service"
        lastUpdated="March 29, 2026"
      >
        <TermsOfServiceContent />
      </LegalModal>

      <LegalModal
        open={activeLegal === 'disclaimer'}
        onClose={() => setActiveLegal(null)}
        title="Financial & AI Disclaimer"
        lastUpdated="March 29, 2026"
      >
        <DisclaimerContent />
      </LegalModal>
    </>
  )
}
