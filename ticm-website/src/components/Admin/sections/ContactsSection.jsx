import { useEffect, useState } from 'react'
import { adminApi } from '../adminApi'
import AdminPagination from '../AdminPagination'
import { HiOutlineTrash, HiOutlineEye, HiOutlineMagnifyingGlass, HiOutlineEnvelope } from 'react-icons/hi2'
import { HiX } from 'react-icons/hi'

const PER_PAGE = 10

const STATUS = { new: 'Nouveau', read: 'Lu', processed: 'Traité' }
const SC     = { new: 'badge-new', read: 'badge-read', processed: 'badge-processed' }

export default function ContactsSection() {
  const [items, setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('all')
  const [page, setPage]       = useState(1)
  const [viewing, setViewing] = useState(null)
  const [toast, setToast]     = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const load = () => {
    setLoading(true)
    adminApi.get('/api/contacts')
      .then(d => setItems(d?.data?.data || d?.data || []))
      .catch(() => showToast('Erreur chargement', 'error'))
      .finally(() => setLoading(false))
  }
  useEffect(load, [])

  const changeStatus = async (id, status) => {
    try {
      await adminApi.patch(`/api/contacts/${id}/status`, { status })
      setItems(prev => prev.map(c => c.id === id ? { ...c, status } : c))
      showToast('Statut mis à jour')
    } catch { showToast('Erreur', 'error') }
  }

  const del = async (id) => {
    if (!confirm('Supprimer ce contact ?')) return
    try {
      await adminApi.delete(`/api/contacts/${id}`)
      setItems(prev => prev.filter(c => c.id !== id))
      if (viewing?.id === id) setViewing(null)
      showToast('Contact supprimé')
    } catch { showToast('Erreur suppression', 'error') }
  }

  const filtered = items.filter(c => {
    const q = search.toLowerCase()
    const match = !q || c.fullname?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q)
    return match && (filter === 'all' || c.status === filter)
  })
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div>
      <div className="section-head">
        <div className="section-head-text">
          <h2>Contacts & Demandes</h2>
          <p>Gérez les messages reçus depuis le formulaire de contact du site.</p>
        </div>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-toolbar">
          <div className="admin-search">
            <HiOutlineMagnifyingGlass />
            <input placeholder="Rechercher un contact…" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
          </div>
          <select className="form-select" style={{ width: 'auto', padding: '7px 10px' }} value={filter} onChange={e => { setFilter(e.target.value); setPage(1) }}>
            <option value="all">Tous</option>
            <option value="new">Nouveaux</option>
            <option value="read">Lus</option>
            <option value="processed">Traités</option>
          </select>
        </div>

        {loading ? (
          <div className="admin-loading"><div className="spinner" /><span>Chargement…</span></div>
        ) : filtered.length === 0 ? (
          <div className="table-empty"><HiOutlineEnvelope /><p>Aucun contact trouvé.</p></div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr><th>Nom</th><th>Email</th><th>Téléphone</th><th>Message</th><th>Statut</th><th>Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {paginated.map(c => (
                <tr key={c.id}>
                  <td><strong>{c.fullname}</strong></td>
                  <td><a href={`mailto:${c.email}`} style={{ color: 'var(--a-gold)' }}>{c.email}</a></td>
                  <td>{c.phone || '—'}</td>
                  <td className="td-truncate" style={{ maxWidth: 180 }}>{c.message}</td>
                  <td>
                    <select className="form-select btn-sm" style={{ padding: '3px 6px', width: 'auto' }}
                      value={c.status} onChange={e => changeStatus(c.id, e.target.value)}>
                      <option value="new">Nouveau</option>
                      <option value="read">Lu</option>
                      <option value="processed">Traité</option>
                    </select>
                  </td>
                  <td style={{ color: 'var(--a-muted)', fontSize: '.74rem', whiteSpace: 'nowrap' }}>
                    {new Date(c.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="btn btn-ghost btn-icon btn-sm" title="Voir" onClick={() => setViewing(c)}><HiOutlineEye /></button>
                      <button className="btn btn-danger btn-icon btn-sm" title="Supprimer" onClick={() => del(c.id)}><HiOutlineTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <AdminPagination total={filtered.length} page={page} perPage={PER_PAGE} onChange={setPage} />
      </div>

      {/* View modal */}
      {viewing && (
        <div className="modal-overlay" onClick={() => setViewing(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 520 }}>
            <div className="modal-header">
              <h3>Message de {viewing.fullname}</h3>
              <button className="modal-close" onClick={() => setViewing(null)}><HiX /></button>
            </div>
            <div className="modal-body">
              <div className="contact-meta">
                <div className="contact-meta-item"><strong>Email :</strong> {viewing.email}</div>
                {viewing.phone && <div className="contact-meta-item"><strong>Tél :</strong> {viewing.phone}</div>}
                <div className="contact-meta-item"><strong>Date :</strong> {new Date(viewing.created_at).toLocaleString('fr-FR')}</div>
                <div className="contact-meta-item">
                  <span className={`badge ${SC[viewing.status]}`}>{STATUS[viewing.status]}</span>
                </div>
              </div>
              <div className="contact-message">{viewing.message}</div>
            </div>
            <div className="modal-footer">
              <a href={`mailto:${viewing.email}`} className="btn btn-primary">Répondre par email</a>
              <button className="btn btn-danger" onClick={() => del(viewing.id)}>Supprimer</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}
    </div>
  )
}
