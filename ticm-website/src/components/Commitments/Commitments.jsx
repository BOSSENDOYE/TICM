import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiOutlineClipboardDocumentCheck, HiOutlineShieldCheck, HiOutlineClock, HiOutlineUserGroup } from 'react-icons/hi2'
import { API_BASE } from '../../api'
import './Commitments.css'

const ICONS = [<HiOutlineClipboardDocumentCheck />, <HiOutlineShieldCheck />, <HiOutlineClock />, <HiOutlineUserGroup />]
const ACCENTS = ['Traçabilité totale', 'Zéro accident', 'Respect des délais', 'Accompagnement dédié']

const fallback = [
  { title: 'Qualité', description: 'Plan qualité par chantier, traçabilité totale des matériaux et des procédés. Contrôles non-destructifs systématiques.', icon: '' },
  { title: 'Sécurité HSE', description: 'Zéro accident comme objectif absolu. Job Safety Analysis (JSA) systématique. Formation continue de tout le personnel.', icon: '' },
  { title: 'Délais', description: 'Reporting hebdomadaire d\'avancement. Alertes proactives en cas de dérive. Engagement contractuel sur les échéances.', icon: '' },
  { title: 'Client', description: 'Interlocuteur dédié sur chaque projet. Support post-livraison et garantie complète. Flexibilité et réactivité permanente.', icon: '' },
]

export default function Commitments() {
  const [pillars, setPillars] = useState(fallback)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })

  useEffect(() => {
    fetch(`${API_BASE}/api/commitments`, { headers: { Accept: 'application/json' } })
      .then(r => r.json())
      .then(d => { const l = d?.data || d || []; if (Array.isArray(l) && l.length) setPillars(l) })
      .catch(() => {})
  }, [])

  return (
    <section id="commitments" className="commitments-section">
      <div className="commitments-bg" aria-hidden />
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow">Nos engagements</div>
          <h2 className="section-title section-title-light">Quatre piliers fondamentaux</h2>
          <div className="title-accent-dark" />
          <p className="section-subtitle section-subtitle-light">
            Ces engagements guident chacune de nos interventions, quel que soit le projet.
          </p>
        </motion.div>

        <div ref={ref} className="commitments-grid">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.id || pillar.title}
              className="commitment-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="cc-num">0{i + 1}</div>
              <div className="cc-icon">
                {pillar.icon || ICONS[i % ICONS.length]}
              </div>
              <h3 className="cc-title">{pillar.title}</h3>
              <div className="cc-accent">{ACCENTS[i] || ''}</div>
              <p className="cc-desc">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
