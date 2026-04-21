import { useEffect, useState } from 'react'
import { adminApi } from '../adminApi'
import { HiOutlineTrash, HiOutlinePencil, HiOutlineMagnifyingGlass, HiOutlinePlus, HiOutlineCheckBadge } from 'react-icons/hi2'
import { HiX } from 'react-icons/hi'

const EMPTY = { title: '', description: '', icon: '' }

export default function CommitmentsSection() {
  const [items, setItems]     = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')
  const [modal, setModal]     = useState(null)
  const [editing, setEditing] = useState(null)
  const [form, setForm]       = useState(EMPTY)
  const [saving, setSaving]   = useState(false)
  const [toast, setToast]     = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const load = () => {
    setLoading(true)
    adminApi.get('/api/commitments')
      .then(d => setItems(d?.data || d || []))
      .catch(() => showToast('Erreur chargement', 'error'))
      .finally(() => setLoading(false))
  }
  useEffect(load, [])

  const openNew  = () => { setEditing(null); setForm(EMPTY); setModal('form') }
  const openEdit = (item) => { setEditing(item); setForm({ ...item, description: item.description ?? '', icon: item.icon ?? '' }); setModal('form') }

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const save = async () => {
    if (!form.title.trim()) return showToast('Le titre est requis', 'error')
    setSaving(true)
    try {
      if (editing) {
        await adminApi.put(`/api/commitments/${editing.id}`, form)
        setItems(prev => prev.map(i => i.id === editing.id ? { ...i, ...form } : i))
        showToast('Engagement mis à jour')
      } else {
        const res = await adminApi.post('/api/commitments', form)
        setItems(prev => [...prev, res?.data || res])
        showToast('Engagement créé')
      }
      setModal(null)
    } catch (e) { showToast(e.message || 'Erreur', 'error') }
    finally { setSaving(false) }
  }

  const del = async (id) => {
    if (!confirm('Supprimer cet engagement ?')) return
    try {
      await adminApi.delete(`/api/commitments/${id}`)
      setItems(prev => prev.filter(i => i.id !== id))
      if (modal) setModal(null)
      showToast('Engagement supprimé')
    } catch { showToast('Erreur suppression', 'error') }
  }

  const filtered = items.filter(i => {
    const q = search.toLowerCase()
    return !q || i.title?.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q)
  })

  return (
    <div>
      <div className="section-head">
        <div className="section-head-text">
          <h2>Engagements</h2>
          <p>Gérez les engagements qualité et valeurs affichés sur la page vitrine.</p>
        </div>
        <button className="btn btn-primary" onClick={openNew}><HiOutlinePlus /> Nouvel engagement</button>
      </div>

      <div className="admin-search" style={{ marginBottom: 16 }}>
        <HiOutlineMagnifyingGlass />
        <input placeholder="Rechercher un engagement…" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {loading ? (
        <div className="admin-loading"><div className="spinner" /><span>Chargement…</span></div>
      ) : filtered.length === 0 ? (
        <div className="table-empty"><HiOutlineCheckBadge /><p>Aucun engagement trouvé.</p></div>
      ) : (
        <div className="cards-grid">
          {filtered.map(item => (
            <div key={item.id} className="info-card">
              <div className="info-card-header">
                <div className="info-card-icon">{item.icon || '✓'}</div>
                <div className="table-actions">
                  <button className="btn btn-ghost btn-icon btn-sm" title="Modifier" onClick={() => openEdit(item)}><HiOutlinePencil /></button>
                  <button className="btn btn-danger btn-icon btn-sm" title="Supprimer" onClick={() => del(item.id)}><HiOutlineTrash /></button>
                </div>
              </div>
              <div className="info-card-title">{item.title}</div>
              <div className="info-card-desc">{item.description}</div>
            </div>
          ))}
        </div>
      )}

      {/* Form modal */}
      {modal === 'form' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <div className="modal-header">
              <h3>{editing ? 'Modifier l\'engagement' : 'Nouvel engagement'}</h3>
              <button className="modal-close" onClick={() => setModal(null)}><HiX /></button>
            </div>
            <div className="modal-body">
              <div className="form-grid-2">
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Titre *</label>
                  <input className="form-input" value={form.title} onChange={e => f('title', e.target.value)} placeholder="Ex: Qualité certifiée ISO" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Icône (emoji)</label>
                <input className="form-input" value={form.icon} onChange={e => f('icon', e.target.value)} placeholder="🏆" style={{ fontSize: '1.4rem' }} />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input form-textarea" rows={4} value={form.description} onChange={e => f('description', e.target.value)} placeholder="Détail de l'engagement…" />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(null)}>Annuler</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? 'Enregistrement…' : 'Enregistrer'}</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}
    </div>
  )
}
