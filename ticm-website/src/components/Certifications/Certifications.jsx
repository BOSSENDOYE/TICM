import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiOutlineShieldCheck } from 'react-icons/hi2'
import { API_BASE } from '../../api'
import './Certifications.css'

const fallback = [
  { code: 'ASME B31.3',   title: 'Process Piping',                        category: 'Tuyauterie' },
  { code: 'EN 13480',     title: 'Tuyauteries métalliques industrielles',  category: 'Tuyauterie' },
  { code: 'ISO 3834',     title: 'Exigences qualité en soudage',           category: 'Soudage' },
  { code: 'EN 1090',      title: 'Structures métalliques et aluminium',    category: 'Charpente' },
  { code: 'ISO 9001',     title: 'Management de la qualité',               category: 'Management' },
  { code: 'ISO 45001',    title: 'Santé & Sécurité au travail',            category: 'HSE' },
]

const CAT_COLORS = {
  Tuyauterie: '#3B82F6', Soudage: '#F59E0B', Charpente: '#10B981',
  Management: '#8B5CF6', HSE: '#EF4444',
}

export default function Certifications() {
  const [certs, setCerts] = useState(fallback)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    fetch(`${API_BASE}/api/certifications`, { headers: { Accept: 'application/json' } })
      .then(r => r.json())
      .then(d => { const l = d?.data || d || []; if (Array.isArray(l) && l.length) setCerts(l) })
      .catch(() => {})
  }, [])

  return (
    <section id="certifications" className="certifications-section section-dark">
      <div className="certifications-bg" aria-hidden />
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow">Normes & Certifications</div>
          <h2 className="section-title section-title-dark">Notre engagement qualité</h2>
          <div className="title-accent" />
          <p className="section-subtitle section-subtitle-dark">
            Maîtrise des normes internationales les plus exigeantes, gage de qualité sur chaque projet.
          </p>
        </motion.div>

        <div ref={ref} className="certs-grid">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.id || cert.code}
              className="cert-card"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="cert-card-glow" style={{ '--cat-color': CAT_COLORS[cert.category] || '#C9A84C' }} />
              <div className="cert-icon-wrap">
                <HiOutlineShieldCheck className="cert-shield" />
              </div>
              <div className="cert-info">
                <span className="cert-code">{cert.code}</span>
                <span className="cert-name">{cert.title}</span>
                {cert.category && (
                  <span className="cert-cat" style={{ color: CAT_COLORS[cert.category] || 'var(--gold)' }}>
                    {cert.category}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
