import { useEffect, useState } from 'react'
import { adminApi } from '../adminApi'
import AdminPagination from '../AdminPagination'
import { HiOutlineTrash, HiOutlineEye, HiOutlinePencil, HiOutlineMagnifyingGlass, HiOutlinePlus, HiOutlineCog6Tooth } from 'react-icons/hi2'
import { HiX } from 'react-icons/hi'

const PER_PAGE = 10

const EMPTY = { title: '', slug: '', summary: '', content: '', icon: '', order_index: 0, is_active: true }

function slugify(str) {
  return str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}

export default function ServicesSection() {
  const [items, setItems]     = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')
  const [page, setPage]       = useState(1)
  const [modal, setModal]     = useState(null)   // null | 'form' | 'view'
  const [editing, setEditing] = useState(null)   // null = new
  const [form, setForm]       = useState(EMPTY)
  const [saving, setSaving]   = useState(false)
  const [toast, setToast]     = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const load = () => {
    setLoading(true)
    adminApi.get('/api/services')
      .then(d => setItems(d?.data || d || []))
      .catch(() => showToast('Erreur chargement', 'error'))
      .finally(() => setLoading(false))
  }
  useEffect(load, [])

  const openNew  = () => { setEditing(null); setForm(EMPTY); setModal('form') }
  const openEdit = (item) => { setEditing(item); setForm({ ...item, summary: item.summary ?? '', content: item.content ?? '', icon: item.icon ?? '' }); setModal('form') }
  const openView = (item) => { setEditing(item); setModal('view') }

  const handleField = (k, v) => {
    setForm(f => {
      const next = { ...f, [k]: v }
      if (k === 'title' && !editing) next.slug = slugify(v)
      return next
    })
  }

  const save = async () => {
    if (!form.title.trim()) return showToast('Le titre est requis', 'error')
    setSaving(true)
    try {
      if (editing) {
        await adminApi.put(`/api/services/${editing.id}`, form)
        setItems(prev => prev.map(i => i.id === editing.id ? { ...i, ...form } : i))
        showToast('Service mis à jour')
      } else {
        const res = await adminApi.post('/api/services', form)
        setItems(prev => [...prev, res?.data || res])
        showToast('Service créé')
      }
      setModal(null)
    } catch (e) { showToast(e.message || 'Erreur', 'error') }
    finally { setSaving(false) }
  }

  const del = async (id) => {
    if (!confirm('Supprimer ce service ?')) return
    try {
      await adminApi.delete(`/api/services/${id}`)
      setItems(prev => prev.filter(i => i.id !== id))
      if (modal) setModal(null)
      showToast('Service supprimé')
    } catch { showToast('Erreur suppression', 'error') }
  }

  const toggleActive = async (item) => {
    try {
      await adminApi.patch(`/api/services/${item.id}/status`, { is_active: !item.is_active })
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, is_active: !i.is_active } : i))
    } catch { showToast('Erreur', 'error') }
  }

  const filtered = items.filter(i => {
    const q = search.toLowerCase()
    return !q || i.title?.toLowerCase().includes(q) || i.summary?.toLowerCase().includes(q)
  })
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div>
      <div className="section-head">
        <div className="section-head-text">
          <h2>Expertises / Services</h2>
          <p>Gérez les services et expertises affichés sur la page vitrine.</p>
        </div>
        <button className="btn btn-primary" onClick={openNew}><HiOutlinePlus /> Nouveau service</button>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-toolbar">
          <div className="admin-search">
            <HiOutlineMagnifyingGlass />
            <input placeholder="Rechercher un service…" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
          </div>
        </div>

        {loading ? (
          <div className="admin-loading"><div className="spinner" /><span>Chargement…</span></div>
        ) : filtered.length === 0 ? (
          <div className="table-empty"><HiOutlineCog6Tooth /><p>Aucun service trouvé.</p></div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr><th>#</th><th>Titre</th><th>Résumé</th><th>Ordre</th><th>Statut</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {paginated.map(item => (
                <tr key={item.id}>
                  <td style={{ color: 'var(--a-muted)', fontSize: '.74rem' }}>{item.id}</td>
                  <td><strong>{item.title}</strong>{item.icon && <span style={{ marginLeft: 6, opacity: .6 }}>{item.icon}</span>}</td>
                  <td className="td-truncate" style={{ maxWidth: 220 }}>{item.summary}</td>
                  <td>{item.order_index ?? '—'}</td>
                  <td>
                    <button
                      className={`toggle-btn ${item.is_active ? 'toggle-on' : 'toggle-off'}`}
                      onClick={() => toggleActive(item)}
                      title={item.is_active ? 'Actif — cliquer pour désactiver' : 'Inactif — cliquer pour activer'}
                    >
                      {item.is_active ? 'Actif' : 'Inactif'}
                    </button>
                  </td>
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
          <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 620 }}>
            <div className="modal-header">
              <h3>{editing ? 'Modifier le service' : 'Nouveau service'}</h3>
              <button className="modal-close" onClick={() => setModal(null)}><HiX /></button>
            </div>
            <div className="modal-body">
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Titre *</label>
                  <input className="form-input" value={form.title} onChange={e => handleField('title', e.target.value)} placeholder="Ex: Charpente Métallique" />
                </div>
                <div className="form-group">
                  <label className="form-label">Slug</label>
                  <input className="form-input" value={form.slug} onChange={e => handleField('slug', e.target.value)} placeholder="charpente-metallique" />
                </div>
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Icône (emoji ou code)</label>
                  <input className="form-input" value={form.icon} onChange={e => handleField('icon', e.target.value)} placeholder="🏗️" />
                </div>
                <div className="form-group">
                  <label className="form-label">Ordre d'affichage</label>
                  <input className="form-input" type="number" value={form.order_index} onChange={e => handleField('order_index', parseInt(e.target.value) || 0)} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Résumé</label>
                <input className="form-input" value={form.summary} onChange={e => handleField('summary', e.target.value)} placeholder="Courte description visible sur la carte" />
              </div>
              <div className="form-group">
                <label className="form-label">Contenu détaillé</label>
                <textarea className="form-input form-textarea" rows={5} value={form.content} onChange={e => handleField('content', e.target.value)} placeholder="Description complète du service…" />
              </div>
              <div className="form-group">
                <label className="form-label form-label-inline">
                  <input type="checkbox" checked={!!form.is_active} onChange={e => handleField('is_active', e.target.checked)} style={{ marginRight: 8 }} />
                  Afficher sur le site
                </label>
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
              <h3>{editing.icon} {editing.title}</h3>
              <button className="modal-close" onClick={() => setModal(null)}><HiX /></button>
            </div>
            <div className="modal-body">
              <div className="contact-meta">
                <div className="contact-meta-item"><strong>Slug :</strong> {editing.slug || '—'}</div>
                <div className="contact-meta-item"><strong>Ordre :</strong> {editing.order_index ?? '—'}</div>
                <div className="contact-meta-item"><strong>Statut :</strong> <span className={`badge ${editing.is_active ? 'badge-processed' : 'badge-read'}`}>{editing.is_active ? 'Actif' : 'Inactif'}</span></div>
              </div>
              {editing.summary && <p style={{ marginBottom: 12, color: 'var(--a-muted)' }}>{editing.summary}</p>}
              {editing.content && <div className="contact-message">{editing.content}</div>}
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
