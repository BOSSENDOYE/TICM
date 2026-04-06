import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { API_BASE } from '../../api'
import './Materials.css'

const SWATCHES = ['#5A6475','#B8B8BE','#1E1E1E','#8A7A64','#C87A12','#2E4E4E']

const fallback = [
  { name: 'Acier noir',  description: 'Haute pression, charpentes, réservoirs' },
  { name: 'Inox 316L',   description: 'Agroalimentaire, chimique, pharma' },
  { name: 'PEHD PE100',  description: 'Eau, assainissement, gaz basse pression' },
  { name: 'PVC',         description: 'Drainage, ventilation industrielle' },
  { name: 'PPH',         description: 'Eau chaude, produits chimiques' },
  { name: 'PRV / GRP',   description: 'Effluents, eau potable, milieux marins' },
]

export default function Materials() {
  const [materials, setMaterials] = useState(fallback)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })

  useEffect(() => {
    fetch(`${API_BASE}/api/materials`, { headers: { Accept: 'application/json' } })
      .then(r => r.json())
      .then(d => { const l = d?.data || d || []; if (Array.isArray(l) && l.length) setMaterials(l) })
      .catch(() => {})
  }, [])

  return (
    <section id="materials" className="materials-section section-anthracite">
      <div className="materials-noise" aria-hidden />
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow">Matériaux maîtrisés</div>
          <h2 className="section-title section-title-dark">Expertise matériaux</h2>
          <div className="title-accent" />
          <p className="section-subtitle section-subtitle-dark">
            Une maîtrise étendue de l'ensemble des matériaux industriels, du métal aux polymères.
          </p>
        </motion.div>

        <div ref={ref} className="materials-grid">
          {materials.map((mat, i) => (
            <motion.div
              key={mat.id || mat.name}
              className="mat-card"
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {mat.image ? (
                <div className="mat-visual mat-visual--img">
                  <img src={mat.image} alt={mat.name} loading="lazy" />
                </div>
              ) : (
                <div className="mat-visual" style={{ background: `linear-gradient(135deg, ${SWATCHES[i % SWATCHES.length]}, ${SWATCHES[(i + 1) % SWATCHES.length]})` }}>
                  <div className="mat-shine" />
                  <span className="mat-initial">{mat.name.charAt(0)}</span>
                </div>
              )}
              <div className="mat-info">
                <h3 className="mat-name">{mat.name}</h3>
                <p className="mat-desc">{mat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
