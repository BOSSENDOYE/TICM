import { useEffect, useState } from 'react'
import { adminApi } from '../adminApi'
import {
  HiOutlineEnvelope, HiOutlineCog6Tooth, HiOutlineBriefcase,
  HiOutlineAcademicCap, HiOutlineCube, HiOutlineCheckBadge,
  HiOutlineExclamationCircle,
} from 'react-icons/hi2'

export default function DashboardHome({ onNavigate }) {
  const [stats, setStats]     = useState(null)
  const [recents, setRecents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      adminApi.get('/api/admin/stats'),
      adminApi.get('/api/contacts'),
    ]).then(([s, c]) => {
      setStats(s)
      const list = c?.data?.data || c?.data || []
      setRecents(Array.isArray(list) ? list.slice(0, 5) : [])
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const CARDS = stats ? [
    { id: 'contacts', icon: <HiOutlineEnvelope />, val: stats.contacts, lbl: 'Contacts reçus', sub: `${stats.contacts_new} non lus`, color: '#3B82F6', bg: 'rgba(59,130,246,.1)' },
    { id: 'services', icon: <HiOutlineCog6Tooth />, val: stats.services, lbl: 'Services / Expertises', color: '#C9A84C', bg: 'rgba(201,168,76,.1)' },
    { id: 'references', icon: <HiOutlineBriefcase />, val: stats.references, lbl: 'Références clients', color: '#8B5CF6', bg: 'rgba(139,92,246,.1)' },
    { id: 'certifications', icon: <HiOutlineAcademicCap />, val: stats.certifications, lbl: 'Certifications', color: '#EC4899', bg: 'rgba(236,72,153,.1)' },
    { id: 'materials', icon: <HiOutlineCube />, val: stats.materials, lbl: 'Matériaux', color: '#14B8A6', bg: 'rgba(20,184,166,.1)' },
    { id: 'commitments', icon: <HiOutlineCheckBadge />, val: stats.commitments, lbl: 'Engagements', color: '#F59E0B', bg: 'rgba(245,158,11,.1)' },
  ] : []

  const statusLabel = { new: 'Nouveau', read: 'Lu', processed: 'Traité' }
  const statusClass = { new: 'badge-new', read: 'badge-read', processed: 'badge-processed' }

  if (loading) return <div className="admin-loading"><div className="spinner" /><span>Chargement…</span></div>

  return (
    <div>
      <div className="section-head">
        <div className="section-head-text">
          <h2>Vue d'ensemble</h2>
          <p>Gérez l'ensemble du contenu de votre site vitrine depuis ce tableau de bord.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {CARDS.map(c => (
          <div key={c.id} className="stat-card" onClick={() => onNavigate(c.id)}>
            <div className="stat-card-icon" style={{ background: c.bg, color: c.color }}>{c.icon}</div>
            <span className="stat-card-val">{c.val ?? '—'}</span>
            <span className="stat-card-lbl">{c.lbl}</span>
            {c.sub && <span className="stat-card-sub" style={{ color: c.sub.includes('0') ? 'var(--a-muted)' : '#EF4444' }}>{c.sub}</span>}
          </div>
        ))}
      </div>

      {/* Recent contacts */}
      <div className="admin-table-wrap">
        <div className="recent-head">
          <h3>Derniers messages reçus</h3>
          <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('contacts')}>Voir tout →</button>
        </div>
        {recents.length === 0 ? (
          <div className="table-empty">
            <HiOutlineExclamationCircle />
            <p>Aucun contact reçu pour l'instant.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nom</th><th>Email</th><th>Objet</th><th>Statut</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recents.map(c => (
                <tr key={c.id}>
                  <td><strong>{c.fullname}</strong></td>
                  <td>{c.email}</td>
                  <td className="td-truncate">{c.message}</td>
                  <td><span className={`badge ${statusClass[c.status] || 'badge-new'}`}>{statusLabel[c.status] || c.status}</span></td>
                  <td style={{ color: 'var(--a-muted)', fontSize: '.75rem' }}>
                    {new Date(c.created_at).toLocaleDateString('fr-FR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
