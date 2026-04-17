import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logoImg from '../../assets/logofaw.png'
import {
  HiOutlineHome, HiOutlineEnvelope, HiOutlineCog6Tooth,
  HiOutlineBriefcase, HiOutlineAcademicCap, HiOutlineCheckBadge,
  HiOutlineCube, HiOutlineInformationCircle, HiOutlineArrowRightOnRectangle,
  HiOutlineBars3, HiOutlinePhoto,
} from 'react-icons/hi2'
import DashboardHome         from './sections/DashboardHome'
import ContactsSection       from './sections/ContactsSection'
import ServicesSection       from './sections/ServicesSection'
import RealisationsSection   from './sections/RealisationsSection'
import ReferencesSection     from './sections/ReferencesSection'
import CertificationsSection from './sections/CertificationsSection'
import CommitmentsSection    from './sections/CommitmentsSection'
import MaterialsSection      from './sections/MaterialsSection'
import AboutSection          from './sections/AboutSection'
import { API_BASE } from '../../api'
import './AdminDashboard.css'

const SECTIONS = [
  { id: 'home',           label: 'Tableau de bord',  icon: <HiOutlineHome /> },
  { id: 'contacts',       label: 'Contacts',          icon: <HiOutlineEnvelope />,          badge: true },
  { id: 'services',       label: 'Expertises',        icon: <HiOutlineCog6Tooth /> },
  { id: 'realisations',   label: 'Réalisations',      icon: <HiOutlinePhoto /> },
  { id: 'references',     label: 'Références',        icon: <HiOutlineBriefcase /> },
  { id: 'certifications', label: 'Certifications',    icon: <HiOutlineAcademicCap /> },
  { id: 'commitments',    label: 'Engagements',       icon: <HiOutlineCheckBadge /> },
  { id: 'materials',      label: 'Matériaux',         icon: <HiOutlineCube /> },
  { id: 'about',          label: 'À Propos',          icon: <HiOutlineInformationCircle /> },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [active, setActive]     = useState('home')
  const [user, setUser]         = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [newContacts, setNewContacts] = useState(0)

  useEffect(() => {
    const token    = localStorage.getItem('auth_token')
    const userData = localStorage.getItem('user')
    if (!token || !userData) { navigate('/admin/login'); return }
    setUser(JSON.parse(userData))
    fetch(`${API_BASE}/api/admin/stats`, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } })
      .then(r => r.json()).then(d => setNewContacts(d.contacts_new || 0)).catch(() => {})
  }, [navigate])

  const handleLogout = () => {
    const token = localStorage.getItem('auth_token')
    fetch(`${API_BASE}/api/auth/logout`, { method: 'POST', headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } })
      .finally(() => { localStorage.clear(); navigate('/admin/login') })
  }

  const go = (id) => { setActive(id); setSidebarOpen(false) }

  const titles = {
    home: 'Tableau de bord', contacts: 'Contacts & Demandes',
    services: 'Expertises / Services', realisations: 'Réalisations & Médiathèque',
    references: 'Références Clients', certifications: 'Certifications',
    commitments: 'Engagements', materials: 'Matériaux', about: 'À Propos',
  }

  const content = {
    home:           <DashboardHome onNavigate={go} />,
    contacts:       <ContactsSection />,
    services:       <ServicesSection />,
    realisations:   <RealisationsSection />,
    references:     <ReferencesSection />,
    certifications: <CertificationsSection />,
    commitments:    <CommitmentsSection />,
    materials:      <MaterialsSection />,
    about:          <AboutSection />,
  }

  if (!user) return <div className="admin-loading"><div className="spinner" /><span>Chargement…</span></div>

  return (
    <div className="admin-shell">
      {/* Sidebar overlay (mobile) */}
      <div className={`sidebar-overlay ${sidebarOpen ? 'show' : ''}`} onClick={() => setSidebarOpen(false)} />

      {/* SIDEBAR */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo" onClick={() => go('home')}>
          <img src={logoImg} alt="TICM" style={{ height: 40, width: 'auto', objectFit: 'contain' }} />
          <div className="sidebar-logo-text">
            <span className="sidebar-logo-name">TICM</span>
            <span className="sidebar-logo-sub">Administration</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <span className="sidebar-sec-label">Navigation</span>
          {SECTIONS.map(s => (
            <button key={s.id} className={`sidebar-item ${active === s.id ? 'active' : ''}`} onClick={() => go(s.id)}>
              {s.icon}
              <span>{s.label}</span>
              {s.badge && newContacts > 0 && <span className="sidebar-badge">{newContacts}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">{user.name?.charAt(0).toUpperCase()}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user.name}</div>
              <div className="sidebar-user-role">Administrateur</div>
            </div>
          </div>
          <button className="sidebar-logout" onClick={handleLogout}>
            <HiOutlineArrowRightOnRectangle />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="admin-main">
        <header className="admin-topbar">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
            <HiOutlineBars3 />
          </button>
          <span className="topbar-title">{titles[active]}</span>
          <div className="topbar-dot" title="Serveur actif" />
          <span style={{ fontSize: '.75rem', color: 'var(--a-muted)' }}>TICM Admin v1.0</span>
        </header>
        <main className="admin-content">
          {content[active]}
        </main>
      </div>
    </div>
  )
}
