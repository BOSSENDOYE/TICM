import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { HiArrowUpRight, HiOutlinePlay } from 'react-icons/hi2'
import eiffageLogo from '../../assets/Eiffage.png'
import lasLogo from '../../assets/las.jpg'
import orsenLogo from '../../assets/orsen.jpg'
import suezLogo from '../../assets/suez.png'
import './Hero.css'

const stats = [
  { val: '5+',  lbl: 'Années d\'exp.' },
  { val: '15+', lbl: 'Projets majeurs' },
  { val: '8+',  lbl: 'Clients référence' },
  { val: '3',   lbl: 'Pays d\'intervention' },
]

const clientLogos = [
  { name: 'Eiffage', logo: eiffageLogo },
  { name: 'Suez',    logo: suezLogo    },
  { name: 'LAS',     logo: lasLogo     },
  { name: 'Orsen',   logo: orsenLogo   },
]

const services = ['Tuyauterie Industrielle', 'Chaudronnerie', 'Charpente Métallique']

export default function Hero() {
  const nav = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const particles = useMemo(() =>
    Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: `${5 + (i * 4.7) % 90}%`,
      y: `${5 + (i * 7.3) % 90}%`,
      size: 1 + (i % 3),
      dur: 3 + (i * 0.4) % 4,
      delay: (i * 0.6) % 6,
    })), [])

  return (
    <section id="hero" className="hero">
      {/* Deep dark gradient */}
      <div className="hero-bg" />

      {/* Fine grid */}
      <div className="hero-grid" aria-hidden />

      {/* Glow blobs */}
      <div className="hero-blob hero-blob-1" aria-hidden />
      <div className="hero-blob hero-blob-2" aria-hidden />

      {/* Animated particles */}
      <div className="hero-particles" aria-hidden>
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="particle"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Decorative vertical lines */}
      <div className="hero-lines" aria-hidden>
        {[14, 28, 50, 72, 86].map((x, i) => (
          <motion.div
            key={i} className="hero-vline"
            style={{ left: `${x}%` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>

      <div className="hero-layout container">

        {/* ── LEFT ── */}
        <div className="hero-left">

          {/* Service ticker */}
          <motion.div
            className="hero-ticker"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="ticker-dot" />
            <div className="ticker-track">
              {services.map((s, i) => (
                <span key={i} className="ticker-item">{s}</span>
              ))}
            </div>
          </motion.div>

          {/* H1 */}
          <div className="hero-title-block">
            <motion.p
              className="hero-pre"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              Bâtir l'industrie africaine
            </motion.p>
            <motion.h1
              className="hero-h1"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              Avec <span className="hero-h1-gold">acier</span><br />
              &amp; précision.
            </motion.h1>
            <motion.p
              className="hero-desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
            >
              Solutions industrielles complètes pour les projets les plus
              exigeants d'Afrique de l'Ouest.
            </motion.p>
          </div>

          {/* CTAs */}
          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <a href="#realisations" className="cta-main" onClick={e => nav(e, '#realisations')}>
              Voir nos réalisations
              <HiArrowUpRight />
            </a>
            <a href="#contact" className="cta-ghost" onClick={e => nav(e, '#contact')}>
              Demander un devis
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.1 }}
          >
            {stats.map((s, i) => (
              <div key={i} className="hstat">
                <span className="hstat-val">{s.val}</span>
                <span className="hstat-lbl">{s.lbl}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT ── */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Main visual card */}
          <div className="hero-card">
            <div className="hero-card-bg" />

            {/* Industrial SVG */}
            <svg viewBox="0 0 380 420" fill="none" className="hero-svg">
              <defs>
                <linearGradient id="gGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%"   stopColor="#C9A84C"/>
                  <stop offset="100%" stopColor="#7A5E22"/>
                </linearGradient>
                <linearGradient id="gVert" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#C9A84C" stopOpacity=".8"/>
                  <stop offset="100%" stopColor="#C9A84C" stopOpacity=".05"/>
                </linearGradient>
                <filter id="glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                <pattern id="pg" width="38" height="38" patternUnits="userSpaceOnUse">
                  <path d="M38 0H0V38" fill="none" stroke="rgba(201,168,76,.05)" strokeWidth=".5"/>
                </pattern>
              </defs>
              <rect width="380" height="420" fill="url(#pg)"/>

              {/* Main structure columns */}
              <rect x="44" y="28" width="5" height="364" rx="1" fill="rgba(201,168,76,.10)"/>
              <rect x="188" y="28" width="5" height="364" rx="1" fill="rgba(201,168,76,.10)"/>
              <rect x="331" y="28" width="5" height="364" rx="1" fill="rgba(201,168,76,.10)"/>

              {/* Horizontal beams */}
              <rect x="44" y="28"  width="292" height="5" rx="1" fill="rgba(201,168,76,.10)"/>
              <rect x="44" y="148" width="292" height="4" rx="1" fill="rgba(201,168,76,.07)"/>
              <rect x="44" y="268" width="292" height="4" rx="1" fill="rgba(201,168,76,.07)"/>
              <rect x="44" y="387" width="292" height="5" rx="1" fill="rgba(201,168,76,.10)"/>

              {/* Diagonals */}
              <line x1="49" y1="33"  x2="188" y2="148" stroke="rgba(201,168,76,.12)" strokeWidth="1"/>
              <line x1="193" y1="33" x2="331" y2="148" stroke="rgba(201,168,76,.12)" strokeWidth="1"/>
              <line x1="49" y1="152" x2="188" y2="268" stroke="rgba(201,168,76,.12)" strokeWidth="1"/>
              <line x1="193" y1="152" x2="331" y2="268" stroke="rgba(201,168,76,.12)" strokeWidth="1"/>
              <line x1="188" y1="33" x2="49"  y2="148" stroke="rgba(201,168,76,.05)" strokeWidth=".8"/>
              <line x1="331" y1="33" x2="193" y2="148" stroke="rgba(201,168,76,.05)" strokeWidth=".8"/>

              {/* Highlighted beam */}
              <motion.rect
                x="80" y="192" width="220" height="16" rx="2"
                fill="url(#gGold)" opacity=".9"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                style={{ transformOrigin: 'left center' }}
                transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* Supports */}
              <rect x="110" y="208" width="5" height="60" rx="1" fill="url(#gVert)" opacity=".7"/>
              <rect x="168" y="208" width="5" height="60" rx="1" fill="url(#gVert)" opacity=".7"/>
              <rect x="262" y="208" width="5" height="60" rx="1" fill="url(#gVert)" opacity=".7"/>

              {/* Joint dots */}
              {[[46,30],[190,30],[333,30],[46,150],[190,150],[333,150],[46,390],[190,390],[333,390]].map(([cx,cy],i) => (
                <circle key={i} cx={cx} cy={cy} r={i<3||i>5?5:3.5}
                  fill="#C9A84C" opacity={i<3||i>5?.75:.45}
                  filter={i<3||i>5?"url(#glow)":undefined}
                />
              ))}

              {/* Corner marks */}
              <line x1="0" y1="0" x2="36" y2="0"   stroke="rgba(201,168,76,.45)" strokeWidth="2"/>
              <line x1="0" y1="0" x2="0"  y2="36"   stroke="rgba(201,168,76,.45)" strokeWidth="2"/>
              <line x1="380" y1="420" x2="344" y2="420" stroke="rgba(201,168,76,.45)" strokeWidth="2"/>
              <line x1="380" y1="420" x2="380" y2="384" stroke="rgba(201,168,76,.45)" strokeWidth="2"/>
            </svg>

            {/* Float badges */}
            <motion.div
              className="hero-badge hero-badge--tr"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="badge-code">ISO 3834</span>
              <span className="badge-text">Certification soudage</span>
            </motion.div>

            <motion.div
              className="hero-badge hero-badge--bl"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <span className="badge-code">EN 1090 EXC3</span>
              <span className="badge-text">Charpentes métalliques</span>
            </motion.div>
          </div>

          {/* Client logos */}
          <motion.div
            className="hero-clients"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <div className="clients-header">
              <span className="clients-divider" />
              <span className="clients-label">Ils nous font confiance</span>
              <span className="clients-divider" />
            </div>
            <div className="clients-row">
              {clientLogos.map((c, i) => (
                <motion.div
                  key={c.name}
                  className="client-logo-card"
                  title={c.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.45 + i * 0.08 }}
                >
                  <div className="client-logo-img-wrap">
                    <img src={c.logo} alt={c.name} />
                  </div>
                  <span className="client-logo-name">{c.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="hero-scroll"
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="scroll-track"><div className="scroll-thumb" /></div>
        <span>Défiler</span>
      </motion.div>
    </section>
  )
}
