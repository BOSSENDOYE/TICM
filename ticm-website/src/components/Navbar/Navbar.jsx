import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX } from 'react-icons/hi'
import { HiArrowUpRight, HiOutlinePhone } from 'react-icons/hi2'
import logoImg from '../../assets/logofaw.png'
import './Navbar.css'

const navLinks = [
  { label: 'Accueil',        href: '#hero' },
  { label: 'À Propos',       href: '#about' },
  { label: 'Expertises',     href: '#expertise' },
  { label: 'Réalisations',   href: '#realisations' },
  { label: 'Références',     href: '#references' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact' },
]

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false)
  const [mobileOpen,     setMobileOpen]     = useState(false)
  const [activeSection,  setActiveSection]  = useState('hero')
  const [indicator,      setIndicator]      = useState({ left: 0, width: 0, opacity: 0 })
  const linksRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 160) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!linksRef.current) return
    const el = linksRef.current.querySelector(`[data-sec="${activeSection}"]`)
    if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 })
  }, [activeSection])

  const nav = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="navbar-inner">
          {/* Logo */}
          <a href="#hero" className="navbar-logo" onClick={e => nav(e, '#hero')}>
            <img src={logoImg} alt="TICM" className="logo-img" />
            <div className="logo-text">
              <span className="logo-name">TICM</span>
              <span className="logo-sub">Construction Métallique</span>
            </div>
          </a>

          {/* Desktop links */}
          <nav className="navbar-links" ref={linksRef}>
            <motion.span
              className="nav-pill-indicator"
              animate={indicator}
              transition={{ type: 'spring', stiffness: 500, damping: 42 }}
            />
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                data-sec={link.href.replace('#', '')}
                className={`nav-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                onClick={e => nav(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a href="#contact" className="navbar-cta" onClick={e => nav(e, '#contact')}>
            <HiOutlinePhone className="cta-phone" />
            <span>Devis Gratuit</span>
            <HiArrowUpRight className="cta-arrow" />
          </a>

          {/* Burger */}
          <button className={`navbar-burger ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mobile-inner">
              <div className="mobile-top">
                <div className="mobile-logo">
                  <img src={logoImg} alt="TICM" className="logo-img" style={{ height: 36, width: 'auto' }} />
                  <span>TICM</span>
                </div>
                <button className="mobile-close" onClick={() => setMobileOpen(false)}><HiX size={20}/></button>
              </div>

              <div className="mobile-nav">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className={`mobile-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                    onClick={e => nav(e, link.href)}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="mobile-num">0{i + 1}</span>
                    <span className="mobile-label">{link.label}</span>
                    <HiArrowUpRight className="mobile-arrow" />
                  </motion.a>
                ))}
              </div>

              <motion.div
                className="mobile-bottom"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <a href="#contact" className="mobile-cta-btn" onClick={e => nav(e, '#contact')}>
                  Demander un devis <HiArrowUpRight />
                </a>
                <p className="mobile-tagline">Tuyauterie · Chaudronnerie · Charpente</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
