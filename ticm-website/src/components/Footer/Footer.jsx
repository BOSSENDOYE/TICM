import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiArrowUp, HiEnvelope, HiPhone, HiMapPin } from 'react-icons/hi2'
import logoImg from '../../assets/logo.png'
import './Footer.css'

const nav = [
  { label: 'À Propos',       href: '#about' },
  { label: 'Expertises',     href: '#expertise' },
  { label: 'Réalisations',   href: '#realisations' },
  { label: 'Références',     href: '#references' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact' },
]

const services = ['Tuyauterie Industrielle', 'Chaudronnerie', 'Charpente Métallique']

export default function Footer() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const scroll = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer-body">
        <div className="container">
          <motion.div
            ref={ref}
            className="footer-grid"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-logo">
                <img src={logoImg} alt="TICM" className="logo-img" style={{ height: 44, width: 'auto' }} />
                <div>
                  <div className="footer-logo-name">TICM</div>
                  <div className="footer-logo-sub">Construction Métallique</div>
                </div>
              </div>
              <p className="footer-tagline">
                Solutions industrielles complètes en tuyauterie, chaudronnerie et charpente métallique
                au Sénégal et en Afrique de l'Ouest.
              </p>
              <div className="footer-services">
                {services.map(s => (
                  <span key={s} className="footer-service-tag">{s}</span>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="footer-col">
              <div className="footer-col-title">Navigation</div>
              <ul className="footer-nav">
                {nav.map(l => (
                  <li key={l.href}>
                    <a href={l.href} onClick={e => scroll(e, l.href)}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <div className="footer-col-title">Contact</div>
              <div className="footer-contacts">
                <a href="mailto:thiamchd7@gmail.com" className="footer-contact-item">
                  <HiEnvelope /> thiamchd7@gmail.com
                </a>
                <a href="tel:+221784486731" className="footer-contact-item">
                  <HiPhone /> +221 78 448 67 31 (DG)
                </a>
                <a href="tel:+221777626497" className="footer-contact-item">
                  <HiPhone /> +221 77 762 64 97
                </a>
                <div className="footer-contact-item">
                  <HiMapPin /> Dakar, Sénégal
                </div>
              </div>
            </div>

            {/* Legal */}
            <div className="footer-col">
              <div className="footer-col-title">Informations légales</div>
              <div className="footer-legal">
                <div className="footer-legal-row"><span>NINEA</span><span>008947501 1E1</span></div>
                <div className="footer-legal-row"><span>RCC</span><span>SN DKR 2021 A34789</span></div>
                <div className="footer-legal-row"><span>Zone</span><span>Sénégal & Afrique de l'Ouest</span></div>
              </div>
              <div className="footer-certif-badge">
                <span>ISO 3834 · EN 1090</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="footer-bar">
        <div className="container">
          <div className="footer-bar-inner">
            <span>© {new Date().getFullYear()} TICM — Touba International Construction Métallique. Tous droits réservés.</span>
            <button className="footer-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Haut">
              <HiArrowUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
