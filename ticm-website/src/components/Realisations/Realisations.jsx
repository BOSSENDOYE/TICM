import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import 'swiper/css'
import {
  HiOutlinePhoto, HiArrowUpRight, HiXMark,
  HiChevronLeft, HiChevronRight, HiOutlineMapPin,
  HiOutlineCalendar, HiOutlineTag,
} from 'react-icons/hi2'
import { API_BASE } from '../../api'
import './Realisations.css'

/* ── Demo data shown when API returns nothing ── */
const DEMO = [
  {
    id: 1,
    title: 'Usine de Dessalement Les Mamelles',
    description: 'Réalisation complète des travaux de tuyauterie industrielle pour l\'usine de dessalement d\'eau de mer de grande capacité. Pose de réseaux haute pression, supports et instrumentation.',
    comments: 'Projet phare de l\'infrastructure hydrique du Sénégal. Livré dans les délais contractuels.',
    client: 'Eiffage', location: 'Dakar, Sénégal', period: '2024–2026', category: 'Dessalement',
    images: [],
  },
  {
    id: 2,
    title: 'Plateforme Offshore GTA',
    description: 'Fabrication et installation de structures de tuyauterie offshore pour la plateforme gazière Grand Tortue Ahmeyim, opération en milieu marin hostile.',
    comments: 'Intervention technique sur site offshore avec contraintes environnementales spécifiques.',
    client: 'LAS', location: 'Grand Tortue Ahmeyim', period: '2023–2024', category: 'Offshore',
    images: [],
  },
  {
    id: 3,
    title: 'STEP Baie de Hann',
    description: 'Station d\'épuration des eaux usées de la Baie de Hann. Travaux de tuyauterie, chaudronnerie et structures métalliques pour l\'ensemble du génie civil.',
    comments: 'Projet environnemental majeur visant à dépolluer l\'un des sites les plus sensibles du Sénégal.',
    client: 'Suez', location: 'Dakar, Sénégal', period: '2023–2026', category: 'Traitement des eaux',
    images: [],
  },
  {
    id: 4,
    title: 'Plateforme Sangomar',
    description: 'Structures métalliques et tuyauteries pour la plateforme pétrolière Sangomar. Charpente, supports de tuyauteries et équipements mécano-soudés.',
    comments: 'Premier champ pétrolier offshore du Sénégal, livré avec les standards internationaux Oil & Gas.',
    client: 'Orsen / Ortec', location: 'Offshore Sénégal', period: '2022–2024', category: 'Pétrole & Gaz',
    images: [],
  },
  {
    id: 5,
    title: 'Centrale Électrique Malicounda',
    description: 'Travaux de tuyauterie vapeur et eau pour la centrale thermique. Réseaux haute et basse pression, échangeurs et équipements de chaudronnerie.',
    comments: 'Centrale stratégique contribuant à l\'autonomie énergétique nationale.',
    client: 'LAS', location: 'Malicounda, Sénégal', period: '2020–2021', category: 'Énergie',
    images: [],
  },
  {
    id: 6,
    title: 'Dépôt de Gaz Burkina Faso',
    description: 'Construction d\'un dépôt de stockage et de distribution de gaz. Réservoirs sous pression, tuyauteries et structures métalliques.',
    comments: 'Extension de nos activités à l\'international, démontrant notre capacité opérationnelle régionale.',
    client: 'China Harbour', location: 'Burkina Faso', period: '2021', category: 'Gaz',
    images: [],
  },
]

/* ── Lightbox ── */
function Lightbox({ project, onClose }) {
  const [slide, setSlide] = useState(0)
  const imgs = project.images || []

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      className="lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="lightbox-panel"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button className="lb-close" onClick={onClose}><HiXMark /></button>

        {/* Image area */}
        <div className="lb-images">
          {imgs.length > 0 ? (
            <>
              <div className="lb-main-img">
                <img src={imgs[slide].path} alt={imgs[slide].caption || project.title} />
                {imgs[slide].caption && <div className="lb-caption">{imgs[slide].caption}</div>}
              </div>
              {imgs.length > 1 && (
                <>
                  <button className="lb-nav lb-nav--prev" onClick={() => setSlide(s => (s - 1 + imgs.length) % imgs.length)}>
                    <HiChevronLeft />
                  </button>
                  <button className="lb-nav lb-nav--next" onClick={() => setSlide(s => (s + 1) % imgs.length)}>
                    <HiChevronRight />
                  </button>
                  <div className="lb-dots">
                    {imgs.map((_, i) => (
                      <button key={i} className={`lb-dot ${i === slide ? 'active' : ''}`} onClick={() => setSlide(i)} />
                    ))}
                  </div>
                  {/* Thumbnails */}
                  <div className="lb-thumbs">
                    {imgs.map((img, i) => (
                      <button key={i} className={`lb-thumb ${i === slide ? 'active' : ''}`} onClick={() => setSlide(i)}>
                        <img src={img.path} alt={img.caption || ''} />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : project.cover_image ? (
            <div className="lb-main-img">
              <img src={project.cover_image} alt={project.title} />
            </div>
          ) : (
            <div className="lb-no-img">
              <HiOutlinePhoto />
              <span>Images à venir</span>
            </div>
          )}
        </div>

        {/* Info panel */}
        <div className="lb-info">
          <div className="lb-category">{project.category}</div>
          <h2 className="lb-title">{project.title}</h2>
          <div className="lb-meta">
            {project.client   && <span className="lb-meta-item"><HiOutlineTag /> {project.client}</span>}
            {project.location && <span className="lb-meta-item"><HiOutlineMapPin /> {project.location}</span>}
            {project.period   && <span className="lb-meta-item"><HiOutlineCalendar /> {project.period}</span>}
          </div>
          {project.description && (
            <p className="lb-desc">{project.description}</p>
          )}
          {project.comments && (
            <div className="lb-comments">
              <div className="lb-comment-label">Notes</div>
              <p>{project.comments}</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Project card ── */
function ProjectCard({ project, index, inView, onClick }) {
  const thumb = project.cover_image || project.images?.[0]?.path || null
  return (
    <motion.button
      className="real-card"
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onClick(project)}
    >
      {/* Image */}
      <div className="real-card-img">
        {thumb ? (
          <img src={thumb} alt={project.title} loading="lazy" />
        ) : (
          <div className="real-card-placeholder">
            <HiOutlinePhoto />
          </div>
        )}
        <div className="real-card-overlay">
          <span className="real-card-cta">Voir le projet <HiArrowUpRight /></span>
        </div>
        {project.category && <span className="real-card-badge">{project.category}</span>}
        {project.images?.length > 0 && (
          <span className="real-card-count"><HiOutlinePhoto /> {project.images.length}</span>
        )}
      </div>

      {/* Content */}
      <div className="real-card-body">
        <div className="real-card-meta">
          {project.client && <span>{project.client}</span>}
          {project.period && <><span>·</span><span>{project.period}</span></>}
        </div>
        <h3 className="real-card-title">{project.title}</h3>
        {project.location && (
          <p className="real-card-location"><HiOutlineMapPin />{project.location}</p>
        )}
        {project.description && (
          <p className="real-card-desc">{project.description.slice(0, 120)}{project.description.length > 120 ? '…' : ''}</p>
        )}
      </div>
    </motion.button>
  )
}

/* ── Main section ── */
export default function Realisations() {
  const [projects, setProjects] = useState(DEMO)
  const [active, setActive]     = useState(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  useEffect(() => {
    fetch(`${API_BASE}/api/realizations`, { headers: { Accept: 'application/json' } })
      .then(r => r.json())
      .then(d => { const l = d?.data || d || []; if (Array.isArray(l) && l.length) setProjects(l) })
      .catch(() => {})
  }, [])

  return (
    <section id="realisations" className="realisations-section section-dark">
      <div className="realisations-bg" aria-hidden />

      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow">Nos réalisations</div>
          <h2 className="section-title section-title-dark">Projets industriels réalisés</h2>
          <div className="title-accent" />
          <p className="section-subtitle section-subtitle-dark">
            Une sélection de nos réalisations pour des opérateurs d'envergure internationale.
            Cliquez sur un projet pour explorer les détails et les images.
          </p>
        </motion.div>

        <div ref={ref} className="realisations-grid">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              inView={inView}
              onClick={setActive}
            />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="realisations-empty">
            <HiOutlinePhoto />
            <p>Aucune réalisation à afficher pour l'instant.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && <Lightbox project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}
