import { useEffect, useState } from 'react'
import { adminApi } from '../adminApi'
import { HiOutlineTrash, HiOutlinePencil, HiOutlineMagnifyingGlass, HiOutlinePlus, HiOutlineCube, HiOutlinePhoto } from 'react-icons/hi2'
import { HiX } from 'react-icons/hi'

const EMPTY = { name: '', description: '', image: '', url: '' }

export default function MaterialsSection() {
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
    adminApi.get('/api/materials')
      .then(d => setItems(d?.data || d || []))
      .catch(() => showToast('Erreur chargement', 'error'))
      .finally(() => setLoading(false))
  }
  useEffect(load, [])

  const openNew  = () => { setEditing(null); setForm(EMPTY); setModal('form') }
  const openEdit = (item) => { setEditing(item); setForm({ ...item }); setModal('form') }

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const save = async () => {
    if (!form.name.trim()) return showToast('Le nom est requis', 'error')
    setSaving(true)
    try {
      if (editing) {
        await adminApi.put(`/api/materials/${editing.id}`, form)
        setItems(prev => prev.map(i => i.id === editing.id ? { ...i, ...form } : i))
        showToast('Matériau mis à jour')
      } else {
        const res = await adminApi.post('/api/materials', form)
        setItems(prev => [...prev, res?.data || res])
        showToast('Matériau créé')
      }
      setModal(null)
    } catch (e) { showToast(e.message || 'Erreur', 'error') }
    finally { setSaving(false) }
  }

  const del = async (id) => {
    if (!confirm('Supprimer ce matériau ?')) return
    try {
      await adminApi.delete(`/api/materials/${id}`)
      setItems(prev => prev.filter(i => i.id !== id))
      if (modal) setModal(null)
      showToast('Matériau supprimé')
    } catch { showToast('Erreur suppression', 'error') }
  }

  const filtered = items.filter(i => {
    const q = search.toLowerCase()
    return !q || i.name?.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q)
  })

  return (
    <div>
      <div className="section-head">
        <div className="section-head-text">
          <h2>Matériaux</h2>
          <p>Gérez les matériaux et produits utilisés affichés sur la page vitrine.</p>
        </div>
        <button className="btn btn-primary" onClick={openNew}><HiOutlinePlus /> Nouveau matériau</button>
      </div>

      <div className="admin-search" style={{ marginBottom: 16 }}>
        <HiOutlineMagnifyingGlass />
        <input placeholder="Rechercher un matériau…" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {loading ? (
        <div className="admin-loading"><div className="spinner" /><span>Chargement…</span></div>
      ) : filtered.length === 0 ? (
        <div className="table-empty"><HiOutlineCube /><p>Aucun matériau trouvé.</p></div>
      ) : (
        <div className="cards-grid">
          {filtered.map(item => (
            <div key={item.id} className="info-card material-card">
              {item.image ? (
                <div className="material-card-img">
                  <img src={item.image} alt={item.name} loading="lazy" />
                </div>
              ) : (
                <div className="material-card-img material-card-img--empty"><HiOutlinePhoto /></div>
              )}
              <div className="info-card-body">
                <div className="info-card-title">{item.name}</div>
                <div className="info-card-desc">{item.description}</div>
                {item.url && <a href={item.url} target="_blank" rel="noreferrer" className="info-card-link" style={{ color: 'var(--a-gold)', fontSize: '.8rem' }}>En savoir plus →</a>}
                <div className="table-actions" style={{ marginTop: 'auto', paddingTop: 10 }}>
                  <button className="btn btn-ghost btn-icon btn-sm" title="Modifier" onClick={() => openEdit(item)}><HiOutlinePencil /></button>
                  <button className="btn btn-danger btn-icon btn-sm" title="Supprimer" onClick={() => del(item.id)}><HiOutlineTrash /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form modal */}
      {modal === 'form' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <div className="modal-header">
              <h3>{editing ? 'Modifier le matériau' : 'Nouveau matériau'}</h3>
              <button className="modal-close" onClick={() => setModal(null)}><HiX /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Nom *</label>
                <input className="form-input" value={form.name} onChange={e => f('name', e.target.value)} placeholder="Ex: Acier S355" />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input form-textarea" rows={3} value={form.description} onChange={e => f('description', e.target.value)} placeholder="Caractéristiques, usages…" />
              </div>
              <div className="form-group">
                <label className="form-label">URL Image</label>
                <input className="form-input" value={form.image} onChange={e => f('image', e.target.value)} placeholder="https://…" />
                {form.image && (
                  <img src={form.image} alt="" style={{ width: '100%', maxHeight: 120, objectFit: 'cover', borderRadius: 8, marginTop: 8 }} />
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Lien externe</label>
                <input className="form-input" value={form.url} onChange={e => f('url', e.target.value)} placeholder="https://…" />
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
