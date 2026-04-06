import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { HiOutlineCog6Tooth, HiOutlineCube, HiOutlineBuildingOffice2, HiArrowUpRight } from 'react-icons/hi2'
import { fetchServices } from '../../api'
import './Expertise.css'

const ICONS = [<HiOutlineCube />, <HiOutlineCog6Tooth />, <HiOutlineBuildingOffice2 />]

const fallback = [
  {
    icon: <HiOutlineCube />, number: '01',
    title: 'Tuyauterie Industrielle',
    subtitle: 'Réseaux haute & basse pression',
    description: 'Conception, fabrication et installation de réseaux de tuyauterie pour fluides industriels : vapeur, hydrocarbures, eau, produits chimiques.',
    features: ['Soudage TIG / MIG / MAG', 'Haute & basse pression', 'Fluides industriels', 'As-built & traçabilité'],
  },
  {
    icon: <HiOutlineCog6Tooth />, number: '02',
    title: 'Chaudronnerie',
    subtitle: 'Réservoirs & équipements soudés',
    description: 'Fabrication sur mesure de réservoirs, bacs, échangeurs et équipements mécano-soudés. De l\'étude à la mise en service.',
    features: ['Réservoirs sur mesure', 'Échangeurs thermiques', 'Équipements ATEX', 'Contrôle qualité intégral'],
  },
  {
    icon: <HiOutlineBuildingOffice2 />, number: '03',
    title: 'Charpente Métallique',
    subtitle: 'Structures industrielles',
    description: 'Conception et montage de structures métalliques pour l\'industrie : hangars, plateformes, passerelles, supports techniques.',
    features: ['Structures EN 1090 EXC3', 'Hangars industriels', 'Plateformes & passerelles', 'Montage sur site'],
  },
]

export default function Expertise() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [services, setServices] = useState(fallback)

  useEffect(() => {
    fetchServices()
      .then(data => {
        if (data?.length) {
          setServices(data.map((item, i) => ({
            icon: ICONS[i % ICONS.length],
            number: String(i + 1).padStart(2, '0'),
            title: item.title,
            subtitle: item.summary || '',
            description: item.content || '',
            features: item.content ? item.content.split('\n').filter(Boolean).slice(0, 4) : [],
          })))
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section id="expertise" className="expertise-section section-dark">
      <div className="expertise-bg-grid" aria-hidden />
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow">Nos expertises</div>
          <h2 className="section-title section-title-dark">Domaines d'excellence</h2>
          <div className="title-accent" />
          <p className="section-subtitle section-subtitle-dark">
            Trois métiers complémentaires au service de vos projets industriels les plus ambitieux.
          </p>
        </motion.div>

        <div ref={ref} className="expertise-grid">
          {services.map((item, i) => (
            <motion.div
              key={item.title}
              className="exp-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="exp-card-top" />
              <div className="exp-num">{item.number}</div>
              <div className="exp-icon">{item.icon}</div>
              <h3 className="exp-title">{item.title}</h3>
              <p className="exp-sub">{item.subtitle}</p>
              <p className="exp-desc">{item.description}</p>
              {item.features?.length > 0 && (
                <ul className="exp-features">
                  {item.features.map((f, j) => (
                    <li key={j}>
                      <span className="exp-dot" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              <div className="exp-card-footer">
                <a href="#contact" className="exp-link">
                  En savoir plus <HiArrowUpRight />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
