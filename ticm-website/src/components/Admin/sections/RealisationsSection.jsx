import { useEffect, useState } from 'react'
import { adminApi } from '../adminApi'
import ImageUpload from '../ImageUpload'
import AdminPagination from '../AdminPagination'

const PER_PAGE = 10
import {
  HiOutlineTrash, HiOutlineEye, HiOutlinePencil,
  HiOutlineMagnifyingGlass, HiOutlinePlus, HiOutlinePhoto,
  HiOutlineXMark,
} from 'react-icons/hi2'
import { HiX } from 'react-icons/hi'

const EMPTY = {
  title: '', description: '', comments: '',
  cover_image: '', client: '', location: '', period: '', category: '',
  order_index: 0, is_active: true,
}

function slugify(s) { return s.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '') }

export default function RealisationsSection() {
  const [items, setItems]     = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')
  const [page, setPage]       = useState(1)
  const [modal, setModal]     = useState(null)   // 'form' | 'view' | 'images'
  const [editing, setEditing] = useState(null)
  const [form, setForm]       = useState(EMPTY)
  const [saving, setSaving]   = useState(false)
  const [toast, setToast]     = useState(null)

  // Image management state
  const [newImgCaption, setNewImgCaption] = useState('')

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const load = () => {
    setLoading(true)
    adminApi.get('/api/realizations')
      .then(d => setItems(d?.data || d || []))
      .catch(() => showToast('Erreur chargement', 'error'))
      .finally(() => setLoading(false))
  }
  useEffect(load, [])

  const openNew  = () => { setEditing(null); setForm(EMPTY); setModal('form') }
  const openEdit = (item) => { setEditing(item); setForm({ ...item }); setModal('form') }
  const openView = (item) => { setEditing(item); setModal('view') }
  const openImgs = (item) => { setEditing(item); setNewImgCaption(''); setModal('images') }

  const f = (k, v) => {
    setForm(p => {
      const n = { ...p, [k]: v }
      if (k === 'title' && !editing) n.slug = slugify(v)
      return n
    })
  }

  const save = async () => {
    if (!form.title.trim()) return showToast('Le titre est requis', 'error')
    setSaving(true)
    try {
      if (editing) {
        await adminApi.put(`/api/realizations/${editing.id}`, form)
        const updated = await adminApi.get(`/api/realizations/${editing.id}`)
        setItems(prev => prev.map(i => i.id === editing.id ? (updated?.data || updated) : i))
        showToast('Réalisation mise à jour')
      } else {
        const res = await adminApi.post('/api/realizations', form)
        setItems(prev => [...prev, res?.data || res])
        showToast('Réalisation créée')
      }
      setModal(null)
    } catch (e) { showToast(e.message || 'Erreur', 'error') }
    finally { setSaving(false) }
  }

  const del = async (id) => {
    if (!confirm('Supprimer cette réalisation et toutes ses images ?')) return
    try {
      await adminApi.delete(`/api/realizations/${id}`)
      setItems(prev => prev.filter(i => i.id !== id))
      if (modal) setModal(null)
      showToast('Réalisation supprimée')
    } catch { showToast('Erreur suppression', 'error') }
  }

  const addImages = async (urls) => {
    try {
      const base = editing.images?.length || 0
      await Promise.all(urls.map((url, i) =>
        adminApi.post(`/api/realizations/${editing.id}/images`, {
          path: url, caption: newImgCaption, order_index: base + i,
        })
      ))
      const updated = await adminApi.get(`/api/realizations/${editing.id}`)
      const data = updated?.data || updated
      setEditing(data)
      setItems(prev => prev.map(i => i.id === editing.id ? data : i))
      setNewImgCaption('')
      showToast(`${urls.length} image(s) ajoutée(s)`)
    } catch (e) { showToast(e.message || 'Erreur', 'error') }
  }

  const removeImage = async (imageId) => {
    if (!confirm('Supprimer cette image ?')) return
    try {
      await adminApi.delete(`/api/realizations/${editing.id}/images/${imageId}`)
      const updated = await adminApi.get(`/api/realizations/${editing.id}`)
      const data = updated?.data || updated
      setEditing(data)
      setItems(prev => prev.map(i => i.id === editing.id ? data : i))
      showToast('Image supprimée')
    } catch { showToast('Erreur', 'error') }
  }

  const filtered = items.filter(i => {
    const q = search.toLowerCase()
    return !q || i.title?.toLowerCase().includes(q) || i.client?.toLowerCase().includes(q) || i.location?.toLowerCase().includes(q)
  })
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div>
      <div className="section-head">
        <div className="section-head-text">
          <h2>Réalisations</h2>
          <p>Gérez les projets et leur médiathèque d'images affichés sur la page vitrine.</p>
        </div>
        <button className="btn btn-primary" onClick={openNew}><HiOutlinePlus /> Nouvelle réalisation</button>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-toolbar">
          <div className="admin-search">
            <HiOutlineMagnifyingGlass />
            <input placeholder="Rechercher une réalisation…" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
          </div>
        </div>

        {loading ? (
          <div className="admin-loading"><div className="spinner" /><span>Chargement…</span></div>
        ) : filtered.length === 0 ? (
          <div className="table-empty"><HiOutlinePhoto /><p>Aucune réalisation trouvée.</p></div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr><th>Titre</th><th>Client</th><th>Lieu</th><th>Période</th><th>Catégorie</th><th>Images</th><th>Statut</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {paginated.map(item => (
                <tr key={item.id}>
                  <td><strong>{item.title}</strong></td>
                  <td>{item.client || '—'}</td>
                  <td style={{ fontSize: '.78rem', color: 'var(--a-muted)' }}>{item.location || '—'}</td>
                  <td style={{ fontSize: '.74rem', whiteSpace: 'nowrap', color: 'var(--a-muted)' }}>{item.period || '—'}</td>
                  <td>{item.category ? <span className="badge badge-read">{item.category}</span> : '—'}</td>
                  <td>
                    <button className="btn btn-ghost btn-sm" onClick={() => openImgs(item)} style={{ gap: 5 }}>
                      <HiOutlinePhoto />
                      <span>{item.images?.length || 0}</span>
                    </button>
                  </td>
                  <td>
                    <button
                      className={`toggle-btn ${item.is_active ? 'toggle-on' : 'toggle-off'}`}
                      onClick={async () => {
                        await adminApi.put(`/api/realizations/${item.id}`, { is_active: !item.is_active })
                        setItems(prev => prev.map(i => i.id === item.id ? { ...i, is_active: !i.is_active } : i))
                      }}
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

      {/* ── Form modal ── */}
      {modal === 'form' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 680 }}>
            <div className="modal-header">
              <h3>{editing ? 'Modifier la réalisation' : 'Nouvelle réalisation'}</h3>
              <button className="modal-close" onClick={() => setModal(null)}><HiX /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Titre *</label>
                <input className="form-input" value={form.title} onChange={e => f('title', e.target.value)} placeholder="Nom du projet" />
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Client</label>
                  <input className="form-input" value={form.client} onChange={e => f('client', e.target.value)} placeholder="Nom du client" />
                </div>
                <div className="form-group">
                  <label className="form-label">Catégorie</label>
                  <input className="form-input" value={form.category} onChange={e => f('category', e.target.value)} placeholder="Ex: Offshore, Énergie…" />
                </div>
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Lieu</label>
                  <input className="form-input" value={form.location} onChange={e => f('location', e.target.value)} placeholder="Ex: Dakar, Sénégal" />
                </div>
                <div className="form-group">
                  <label className="form-label">Période</label>
                  <input className="form-input" value={form.period} onChange={e => f('period', e.target.value)} placeholder="2023–2024" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input form-textarea" rows={4} value={form.description} onChange={e => f('description', e.target.value)} placeholder="Description du projet…" />
              </div>
              <div className="form-group">
                <label className="form-label">Notes / Commentaires</label>
                <textarea className="form-input form-textarea" rows={3} value={form.comments} onChange={e => f('comments', e.target.value)} placeholder="Observations, points clés…" />
              </div>
              <div className="form-group">
                <label className="form-label">Image de couverture</label>
                <ImageUpload
                  value={form.cover_image}
                  onChange={url => f('cover_image', url)}
                  label="Choisir une image de couverture"
                />
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Ordre d'affichage</label>
                  <input className="form-input" type="number" value={form.order_index} onChange={e => f('order_index', parseInt(e.target.value) || 0)} />
                </div>
                <div className="form-group">
                  <label className="form-label form-label-inline">
                    <input type="checkbox" checked={!!form.is_active} onChange={e => f('is_active', e.target.checked)} style={{ marginRight: 8 }} />
                    Afficher sur le site
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(null)}>Annuler</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? 'Enregistrement…' : 'Enregistrer'}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Images modal ── */}
      {modal === 'images' && editing && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 700 }}>
            <div className="modal-header">
              <h3>Images — {editing.title}</h3>
              <button className="modal-close" onClick={() => setModal(null)}><HiX /></button>
            </div>
            <div className="modal-body">
              {/* Add images */}
              <div className="form-group">
                <label className="form-label">Ajouter des images</label>
                <ImageUpload
                  multiple
                  label="Choisir une ou plusieurs photos"
                  accept="image/*"
                  onMultiAdd={addImages}
                />
                <input
                  className="form-input"
                  style={{ marginTop: 8 }}
                  value={newImgCaption}
                  onChange={e => setNewImgCaption(e.target.value)}
                  placeholder="Légende commune (optionnel)"
                />
              </div>

              {/* Images list */}
              {editing.images?.length > 0 ? (
                <div className="real-images-grid">
                  {editing.images.map(img => (
                    <div key={img.id} className="real-img-item">
                      <div className="real-img-thumb">
                        <img src={img.path} alt={img.caption || ''} />
                      </div>
                      {img.caption && <p className="real-img-caption">{img.caption}</p>}
                      <button className="btn btn-danger btn-icon btn-sm" style={{ marginTop: 6, width: '100%' }} onClick={() => removeImage(img.id)}>
                        <HiOutlineXMark /> Supprimer
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="table-empty" style={{ padding: '24px 0' }}>
                  <HiOutlinePhoto />
                  <p>Aucune image. Ajoutez des URLs ci-dessus.</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(null)}>Fermer</button>
            </div>
          </div>
        </div>
      )}

      {/* ── View modal ── */}
      {modal === 'view' && editing && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 540 }}>
            <div className="modal-header">
              <h3>{editing.title}</h3>
              <button className="modal-close" onClick={() => setModal(null)}><HiX /></button>
            </div>
            <div className="modal-body">
              <div className="contact-meta">
                {editing.client   && <div className="contact-meta-item"><strong>Client :</strong> {editing.client}</div>}
                {editing.location && <div className="contact-meta-item"><strong>Lieu :</strong> {editing.location}</div>}
                {editing.period   && <div className="contact-meta-item"><strong>Période :</strong> {editing.period}</div>}
                {editing.category && <div className="contact-meta-item"><strong>Catégorie :</strong> <span className="badge badge-read">{editing.category}</span></div>}
                <div className="contact-meta-item"><strong>Images :</strong> {editing.images?.length || 0}</div>
              </div>
              {editing.description && <div className="contact-message">{editing.description}</div>}
              {editing.comments && (
                <div className="contact-message" style={{ marginTop: 8, borderLeftColor: 'var(--a-muted)' }}>
                  <strong style={{ fontSize: '.72rem', display: 'block', marginBottom: 4, opacity: .6 }}>Notes</strong>
                  {editing.comments}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => openImgs(editing)}>Gérer les images</button>
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
