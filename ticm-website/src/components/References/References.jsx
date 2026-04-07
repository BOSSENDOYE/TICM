import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import {
  HiOutlineMapPin, HiOutlineCalendar, HiArrowLeft, HiArrowRight,
  HiOutlineTag, HiArrowUpRight,
} from 'react-icons/hi2'
import eiffageLogo from '../../assets/Eiffage.png'
import lasLogo     from '../../assets/las.jpg'
import orsenLogo   from '../../assets/orsen.jpg'
import suezLogo    from '../../assets/suez.png'
import { API_BASE } from '../../api'
import './References.css'

const LOGO_MAP = { eiffage: eiffageLogo, suez: suezLogo, las: lasLogo, orsen: orsenLogo, ortec: orsenLogo }

const fallback = [
  { client_name: 'Eiffage',       project_name: 'Usine dessalement Les Mamelles', location: 'Dakar',                period: '2024–2026', tag: 'Dessalement',     logo: eiffageLogo },
  { client_name: 'Suez',          project_name: 'STEP Baie de Hann',              location: 'Dakar',                period: '2023–2026', tag: 'Traitement eaux', logo: suezLogo    },
  { client_name: 'LAS',           project_name: 'Plateforme Offshore GTA',        location: 'Grand Tortue Ahmeyim', period: '2023–2024', tag: 'Offshore',        logo: lasLogo     },
  { client_name: 'Orsen / Ortec', project_name: 'Plateforme Sangomar',            location: 'Offshore Sénégal',     period: '2022–2024', tag: 'Pétrole & Gaz',   logo: orsenLogo   },
  { client_name: 'LAS',           project_name: 'Dépôt hydrocarbures Sendou',     location: 'Projet ELTON',         period: '2022–2023', tag: 'Hydrocarbures',   logo: lasLogo     },
  { client_name: 'LAS',           project_name: 'Centrale Électrique Malicounda', location: 'Malicounda',           period: '2020–2021', tag: 'Énergie',         logo: lasLogo     },
  { client_name: 'China Harbour', project_name: 'Dépôt de Gaz',                  location: 'Burkina Faso',         period: '2021',      tag: 'Gaz',             logo: null        },
  { client_name: 'Suez',          project_name: 'Usine eau KMS',                  location: 'Keur Momar Sarr',      period: '2018–2020', tag: 'Eau potable',     logo: suezLogo    },
]

function resolveLogo(item) {
  if (item.image) return item.image
  if (item.logo) return item.logo
  const key = item.client_name?.toLowerCase().split('/')[0].trim()
  return LOGO_MAP[key] || null
}

const TAG_COLORS = {
  'Dessalement':    { bg: 'rgba(6,182,212,.10)',  border: 'rgba(6,182,212,.25)',  text: '#0891B2' },
  'Traitement eaux':{ bg: 'rgba(34,197,94,.10)',  border: 'rgba(34,197,94,.25)',  text: '#15803D' },
  'Offshore':       { bg: 'rgba(139,92,246,.10)', border: 'rgba(139,92,246,.25)', text: '#7C3AED' },
  'Pétrole & Gaz':  { bg: 'rgba(245,158,11,.10)', border: 'rgba(245,158,11,.25)', text: '#B45309' },
  'Hydrocarbures':  { bg: 'rgba(239,68,68,.10)',  border: 'rgba(239,68,68,.25)',  text: '#B91C1C' },
  'Énergie':        { bg: 'rgba(249,115,22,.10)', border: 'rgba(249,115,22,.25)', text: '#C2410C' },
  'Gaz':            { bg: 'rgba(59,130,246,.10)', border: 'rgba(59,130,246,.25)', text: '#1D4ED8' },
  'Eau potable':    { bg: 'rgba(16,185,129,.10)', border: 'rgba(16,185,129,.25)', text: '#065F46' },
}

function RefCard({ item, index, inView }) {
  const logo  = resolveLogo(item)
  const tc    = TAG_COLORS[item.tag] || { bg: 'rgba(201,168,76,.10)', border: 'rgba(201,168,76,.3)', text: '#92713A' }
  const initials = item.client_name?.split('/').map(s => s.trim().charAt(0)).join('').slice(0, 2).toUpperCase()

  return (
    <motion.div
      className="ref-card"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.06 * index, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Top stripe accent */}
      <div className="ref-card-stripe" style={{ background: tc.text }} />

      {/* Header: logo + tag */}
      <div className="ref-card-header">
        <div className="ref-logo-box">
          {logo
            ? <img src={logo} alt={item.client_name} />
            : <span className="ref-initials">{initials}</span>
          }
        </div>
        {item.tag && (
          <span className="ref-tag" style={{ background: tc.bg, borderColor: tc.border, color: tc.text }}>
            {item.tag}
          </span>
        )}
      </div>

      {/* Client name */}
      <div className="ref-client-name">{item.client_name}</div>

      {/* Project name */}
      <h3 className="ref-project-title">{item.project_name}</h3>

      {/* Divider */}
      <div className="ref-divider" />

      {/* Meta */}
      <div className="ref-meta">
        {item.location && (
          <div className="ref-meta-row">
            <HiOutlineMapPin />
            <span>{item.location}</span>
          </div>
        )}
        {item.period && (
          <div className="ref-meta-row">
            <HiOutlineCalendar />
            <span>{item.period}</span>
          </div>
        )}
        {item.category && (
          <div className="ref-meta-row">
            <HiOutlineTag />
            <span>{item.category}</span>
          </div>
        )}
      </div>

      {/* Arrow */}
      <div className="ref-card-arrow"><HiArrowUpRight /></div>
    </motion.div>
  )
}

export default function References() {
  const [refs, setRefs] = useState(fallback)
  const [ref, inView]   = useInView({ triggerOnce: true, threshold: 0.08 })
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/references`, { headers: { Accept: 'application/json' } })
      .then(r => r.json())
      .then(d => { const l = d?.data || d || []; if (Array.isArray(l) && l.length) setRefs(l) })
      .catch(() => {})
  }, [])

  return (
    <section id="references" className="references-section">
      {/* Background decoration */}
      <div className="references-bg" aria-hidden />
      <div className="references-dots" aria-hidden />

      <div className="container">
        {/* Header */}
        <motion.div
          className="references-header"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="references-header-left">
            <div className="eyebrow">Références clients</div>
            <h2 className="section-title section-title-light">Ils nous ont fait confiance</h2>
            <div className="title-accent-dark" />
            <p className="section-subtitle section-subtitle-light" style={{ marginTop: 14 }}>
              Des projets industriels d'envergure pour des opérateurs de renommée internationale.
            </p>
          </div>
          <div className="ref-controls">
            <div className="ref-counter">
              <span className="ref-counter-num">{refs.length}</span>
              <span className="ref-counter-lbl">références</span>
            </div>
            <div className="ref-nav-btns">
              <button ref={prevRef} className="ref-nav-btn ref-prev" aria-label="Précédent">
                <HiArrowLeft />
              </button>
              <button ref={nextRef} className="ref-nav-btn ref-next" aria-label="Suivant">
                <HiArrowRight />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Carousel */}
        <div ref={ref} className="references-swiper-wrap">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={22}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current
              swiper.params.navigation.nextEl = nextRef.current
            }}
            breakpoints={{
              520:  { slidesPerView: 2 },
              820:  { slidesPerView: 3 },
              1160: { slidesPerView: 4 },
            }}
            className="references-swiper"
          >
            {refs.map((item, i) => (
              <SwiperSlide key={item.id || i} className="ref-slide">
                <RefCard item={item} index={i} inView={inView} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Logo strip */}
        <motion.div
          className="ref-logos-strip"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {[eiffageLogo, suezLogo, lasLogo, orsenLogo].map((logo, i) => (
            <div key={i} className="ref-logo-strip-item">
              <img src={logo} alt="" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
