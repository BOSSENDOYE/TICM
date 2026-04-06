import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiOutlineMapPin, HiOutlineGlobeAlt, HiArrowUpRight } from 'react-icons/hi2'
import { API_BASE } from '../../api'
import './About.css'

function Counter({ to, suffix = '', duration = 2200 }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  const done = useRef(false)
  useEffect(() => {
    if (!inView || done.current) return
    done.current = true
    let start = 0
    const step = to / (duration / 16)
    const t = setInterval(() => {
      start += step
      if (start >= to) { setCount(to); clearInterval(t) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(t)
  }, [inView, to, duration])
  return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
  { to: 5,  suffix: '+', label: 'Années d\'exp.' },
  { to: 15, suffix: '+', label: 'Projets livrés' },
  { to: 8,  suffix: '+', label: 'Clients référence' },
  { to: 3,  suffix: '',  label: 'Pays d\'intervention' },
]

const DEFAULT_DESC = [
  'Touba International Construction Métallique (TICM) est une entreprise sénégalaise spécialisée dans la réalisation d\'ouvrages industriels de haute technicité.',
  'Implantée au Sénégal, TICM intervient sur des projets majeurs en Afrique de l\'Ouest pour des opérateurs de renommée internationale dans les secteurs de l\'énergie, du pétrole & gaz et de l\'eau.',
  'Notre force : une équipe technique qualifiée, la maîtrise des normes les plus exigeantes et un engagement total sur la qualité, la sécurité et les délais.',
]

export default function About() {
  const [about, setAbout] = useState(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    fetch(`${API_BASE}/api/about`, { headers: { Accept: 'application/json' } })
      .then(r => r.json())
      .then(d => { const data = d?.data || d; if (data?.company_name) setAbout(data) })
      .catch(() => {})
  }, [])

  const nav = (e, href) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <section id="about" className="about-section">
      <div className="about-deco-line" />
      <div className="container">
        <div ref={ref} className="about-layout">

          {/* ── Left: text ── */}
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -48 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
          >
            <div className="eyebrow">À propos</div>
            <h2 className="section-title section-title-light">
              {about?.company_name ? `À propos de ${about.company_name}` : 'À Propos de TICM'}
            </h2>
            <div className="about-accent" />

            <div className="about-body">
              {about?.description
                ? about.description.split('\n').filter(Boolean).map((p, i) => <p key={i}>{p}</p>)
                : DEFAULT_DESC.map((p, i) => <p key={i}>{p}</p>)
              }
            </div>

            <div className="about-locations">
              <div className="about-loc">
                <HiOutlineMapPin />
                <span>{about?.address || 'Dakar, Sénégal'}</span>
              </div>
              <div className="about-loc">
                <HiOutlineGlobeAlt />
                <span>Zone d'intervention : Afrique de l'Ouest</span>
              </div>
            </div>

            <a href="#expertise" className="about-cta" onClick={e => nav(e, '#expertise')}>
              Voir nos expertises <HiArrowUpRight />
            </a>
          </motion.div>

          {/* ── Right: stats ── */}
          <motion.div
            className="about-right"
            initial={{ opacity: 0, x: 48 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22,1,0.36,1] }}
          >
            <div className="about-stats-card">
              <div className="stats-card-pattern" />
              <div className="about-stats-grid">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    className="astat"
                    initial={{ opacity: 0, y: 28 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  >
                    <div className="astat-val">
                      <Counter to={s.to} suffix={s.suffix} />
                    </div>
                    <div className="astat-label">{s.label}</div>
                    <div className="astat-bar" />
                  </motion.div>
                ))}
              </div>
              <div className="about-tagline">
                <span>Votre partenaire industriel de confiance en Afrique de l'Ouest</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
