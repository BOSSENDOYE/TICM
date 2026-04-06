import { useEffect, useState } from 'react'
import { adminApi } from '../adminApi'
import ImageUpload from '../ImageUpload'
import AdminPagination from '../AdminPagination'
import { HiOutlineTrash, HiOutlineEye, HiOutlinePencil, HiOutlineMagnifyingGlass, HiOutlinePlus, HiOutlineBriefcase } from 'react-icons/hi2'
import { HiX } from 'react-icons/hi'

const PER_PAGE = 10

const EMPTY = { client_name: '', project_name: '', location: '', period: '', tag: '', description: '', category: '', result: '', image: '' }

export default function ReferencesSection() {
  const [items, setItems]     = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')
  const [page, setPage]       = useState(1)
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
    adminApi.get('/api/references')
      .then(d => setItems(d?.data || d || []))
      .catch(() => showToast('Erreur chargement', 'error'))
      .finally(() => setLoading(false))
  }
  useEffect(load, [])

  const openNew  = () => { setEditing(null); setForm(EMPTY); setModal('form') }
  const openEdit = (item) => { setEditing(item); setForm({ ...item }); setModal('form') }
  const openView = (item) => { setEditing(item); setModal('view') }

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const save = async () => {
    if (!form.client_name.trim() || !form.project_name.trim()) return showToast('Client et projet requis', 'error')
    setSaving(true)
    try {
      if (editing) {
        await adminApi.put(`/api/references/${editing.id}`, form)
        setItems(prev => prev.map(i => i.id === editing.id ? { ...i, ...form } : i))
        showToast('Référence mise à jour')
      } else {
        const res = await adminApi.post('/api/references', form)
        setItems(prev => [...prev, res?.data || res])
        showToast('Référence créée')
      }
      setModal(null)
    } catch (e) { showToast(e.message || 'Erreur', 'error') }
    finally { setSaving(false) }
  }

  const del = async (id) => {
    if (!confirm('Supprimer cette référence ?')) return
    try {
      await adminApi.delete(`/api/references/${id}`)
      setItems(prev => prev.filter(i => i.id !== id))
      if (modal) setModal(null)
      showToast('Référence supprimée')
    } catch { showToast('Erreur suppression', 'error') }
  }

  const filtered = items.filter(i => {
    const q = search.toLowerCase()
    return !q || i.client_name?.toLowerCase().includes(q) || i.project_name?.toLowerCase().includes(q) || i.location?.toLowerCase().includes(q)
  })
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div>
      <div className="section-head">
        <div className="section-head-text">
          <h2>Références Clients</h2>
          <p>Gérez les projets réalisés affichés dans le carrousel de références.</p>
        </div>
        <button className="btn btn-primary" onClick={openNew}><HiOutlinePlus /> Nouvelle référence</button>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-toolbar">
          <div className="admin-search">
            <HiOutlineMagnifyingGlass />
            <input placeholder="Rechercher une référence…" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
          </div>
        </div>

        {loading ? (
          <div className="admin-loading"><div className="spinner" /><span>Chargement…</span></div>
        ) : filtered.length === 0 ? (
          <div className="table-empty"><HiOutlineBriefcase /><p>Aucune référence trouvée.</p></div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr><th>Client</th><th>Projet</th><th>Lieu</th><th>Période</th><th>Catégorie</th><th>Tag</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {paginated.map(item => (
                <tr key={item.id}>
                  <td><strong>{item.client_name}</strong></td>
                  <td className="td-truncate" style={{ maxWidth: 180 }}>{item.project_name}</td>
                  <td>{item.location || '—'}</td>
                  <td style={{ whiteSpace: 'nowrap', fontSize: '.74rem', color: 'var(--a-muted)' }}>{item.period || '—'}</td>
                  <td>{item.category || '—'}</td>
                  <td>{item.tag ? <span className="badge badge-read">{item.tag}</span> : '—'}</td>
                  <td>
                    <div className="table-actions">
                      <button className="btn btn-ghost btn-icon btn-sm" title="Voir" onClick={() => openView(item)}><HiOutlineEye /></button>
                      <button className="btn btn-ghost btn-icon btn-sm" title="Modifier" onClick={() => openEdit(item)}><HiOutlinePencil /></button>
                      <button className="btn btn-danger btn-icon btn-sm" title="Supprimer" onClick={() => del(item.id)}><HiOutlineTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <AdminPagination total={filtered.length} page={page} perPage={PER_PAGE} onChange={setPage} />
      </div>

      {/* Form modal */}
      {modal === 'form' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 660 }}>
            <div className="modal-header">
              <h3>{editing ? 'Modifier la référence' : 'Nouvelle référence'}</h3>
              <button className="modal-close" onClick={() => setModal(null)}><HiX /></button>
            </div>
            <div className="modal-body">
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Client *</label>
                  <input className="form-input" value={form.client_name} onChange={e => f('client_name', e.target.value)} placeholder="Nom du client" />
                </div>
                <div className="form-group">
                  <label className="form-label">Projet *</label>
                  <input className="form-input" value={form.project_name} onChange={e => f('project_name', e.target.value)} placeholder="Intitulé du projet" />
                </div>
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Lieu</label>
                  <input className="form-input" value={form.location} onChange={e => f('location', e.target.value)} placeholder="Ex: Dakar, Sénégal" />
                </div>
                <div className="form-group">
                  <label className="form-label">Période</label>
                  <input className="form-input" value={form.period} onChange={e => f('period', e.target.value)} placeholder="Ex: 2023 – 2024" />
                </div>
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Catégorie</label>
                  <input className="form-input" value={form.category} onChange={e => f('category', e.target.value)} placeholder="Ex: Bâtiment industriel" />
                </div>
                <div className="form-group">
                  <label className="form-label">Tag / Badge</label>
                  <input className="form-input" value={form.tag} onChange={e => f('tag', e.target.value)} placeholder="Ex: Livré" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input form-textarea" rows={3} value={form.description} onChange={e => f('description', e.target.value)} placeholder="Description du projet réalisé…" />
              </div>
              <div className="form-group">
                <label className="form-label">Résultat / Impact</label>
                <input className="form-input" value={form.result} onChange={e => f('result', e.target.value)} placeholder="Ex: +2 500 m² livrés en 18 mois" />
              </div>
              <div className="form-group">
                <label className="form-label">Image / Logo du client</label>
                <ImageUpload
                  value={form.image}
                  onChange={url => f('image', url)}
                  label="Choisir une image"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(null)}>Annuler</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? 'Enregistrement…' : 'Enregistrer'}</button>
            </div>
          </div>
        </div>
      )}

      {/* View modal */}
      {modal === 'view' && editing && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 520 }}>
            <div className="modal-header">
              <h3>{editing.project_name}</h3>
              <button className="modal-close" onClick={() => setModal(null)}><HiX /></button>
            </div>
            <div className="modal-body">
              <div className="contact-meta">
                <div className="contact-meta-item"><strong>Client :</strong> {editing.client_name}</div>
                {editing.location && <div className="contact-meta-item"><strong>Lieu :</strong> {editing.location}</div>}
                {editing.period   && <div className="contact-meta-item"><strong>Période :</strong> {editing.period}</div>}
                {editing.category && <div className="contact-meta-item"><strong>Catégorie :</strong> {editing.category}</div>}
                {editing.tag      && <div className="contact-meta-item"><strong>Tag :</strong> <span className="badge badge-read">{editing.tag}</span></div>}
                {editing.result   && <div className="contact-meta-item"><strong>Résultat :</strong> {editing.result}</div>}
              </div>
              {editing.description && <div className="contact-message">{editing.description}</div>}
              {editing.image && <img src={editing.image} alt="" style={{ width: '100%', borderRadius: 8, marginTop: 12 }} />}
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => openEdit(editing)}>Modifier</button>
              <button className="btn btn-danger" onClick={() => del(editing.id)}>Supprimer</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}
    </div>
  )
}
