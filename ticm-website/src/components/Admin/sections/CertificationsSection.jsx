import { useEffect, useState } from 'react'
import { adminApi } from '../adminApi'
import ImageUpload from '../ImageUpload'
import AdminPagination from '../AdminPagination'
import { HiOutlineTrash, HiOutlineEye, HiOutlinePencil, HiOutlineMagnifyingGlass, HiOutlinePlus, HiOutlineAcademicCap } from 'react-icons/hi2'
import { HiX } from 'react-icons/hi'

const PER_PAGE = 10

const EMPTY = { code: '', title: '', category: '', issuer: '', date_obtained: '', expiration_date: '', certificate_file: '' }

export default function CertificationsSection() {
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
    adminApi.get('/api/certifications')
      .then(d => setItems(d?.data || d || []))
      .catch(() => showToast('Erreur chargement', 'error'))
      .finally(() => setLoading(false))
  }
  useEffect(load, [])

  const openNew  = () => { setEditing(null); setForm(EMPTY); setModal('form') }
  const openEdit = (item) => { setEditing(item); setForm({ ...item, code: item.code ?? '', category: item.category ?? '', issuer: item.issuer ?? '', date_obtained: item.date_obtained ?? '', expiration_date: item.expiration_date ?? '', certificate_file: item.certificate_file ?? '' }); setModal('form') }
  const openView = (item) => { setEditing(item); setModal('view') }

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const save = async () => {
    if (!form.title.trim()) return showToast('Le titre est requis', 'error')
    setSaving(true)
    try {
      if (editing) {
        await adminApi.put(`/api/certifications/${editing.id}`, form)
        setItems(prev => prev.map(i => i.id === editing.id ? { ...i, ...form } : i))
        showToast('Certification mise à jour')
      } else {
        const res = await adminApi.post('/api/certifications', form)
        setItems(prev => [...prev, res?.data || res])
        showToast('Certification créée')
      }
      setModal(null)
    } catch (e) { showToast(e.message || 'Erreur', 'error') }
    finally { setSaving(false) }
  }

  const del = async (id) => {
    if (!confirm('Supprimer cette certification ?')) return
    try {
      await adminApi.delete(`/api/certifications/${id}`)
      setItems(prev => prev.filter(i => i.id !== id))
      if (modal) setModal(null)
      showToast('Certification supprimée')
    } catch { showToast('Erreur suppression', 'error') }
  }

  const isExpired = (date) => date && new Date(date) < new Date()
  const isExpiringSoon = (date) => {
    if (!date) return false
    const d = new Date(date)
    const now = new Date()
    const diff = (d - now) / (1000 * 60 * 60 * 24)
    return diff > 0 && diff <= 90
  }

  const filtered = items.filter(i => {
    const q = search.toLowerCase()
    return !q || i.title?.toLowerCase().includes(q) || i.code?.toLowerCase().includes(q) || i.issuer?.toLowerCase().includes(q) || i.category?.toLowerCase().includes(q)
  })
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div>
      <div className="section-head">
        <div className="section-head-text">
          <h2>Certifications</h2>
          <p>Gérez les certifications et accréditations de l'entreprise.</p>
        </div>
        <button className="btn btn-primary" onClick={openNew}><HiOutlinePlus /> Nouvelle certification</button>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-toolbar">
          <div className="admin-search">
            <HiOutlineMagnifyingGlass />
            <input placeholder="Rechercher une certification…" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
          </div>
        </div>

        {loading ? (
          <div className="admin-loading"><div className="spinner" /><span>Chargement…</span></div>
        ) : filtered.length === 0 ? (
          <div className="table-empty"><HiOutlineAcademicCap /><p>Aucune certification trouvée.</p></div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr><th>Code</th><th>Titre</th><th>Catégorie</th><th>Émetteur</th><th>Obtenu le</th><th>Expiration</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {paginated.map(item => (
                <tr key={item.id}>
                  <td><code style={{ fontSize: '.74rem', color: 'var(--a-gold)' }}>{item.code || '—'}</code></td>
                  <td><strong>{item.title}</strong></td>
                  <td>{item.category || '—'}</td>
                  <td style={{ color: 'var(--a-muted)', fontSize: '.8rem' }}>{item.issuer || '—'}</td>
                  <td style={{ fontSize: '.74rem', whiteSpace: 'nowrap' }}>
                    {item.date_obtained ? new Date(item.date_obtained).toLocaleDateString('fr-FR') : '—'}
                  </td>
                  <td style={{ fontSize: '.74rem', whiteSpace: 'nowrap' }}>
                    {item.expiration_date ? (
                      <span style={{ color: isExpired(item.expiration_date) ? '#EF4444' : isExpiringSoon(item.expiration_date) ? '#F59E0B' : 'var(--a-text)' }}>
                        {new Date(item.expiration_date).toLocaleDateString('fr-FR')}
                        {isExpired(item.expiration_date) && ' ⚠️'}
                        {isExpiringSoon(item.expiration_date) && ' ⏳'}
                      </span>
                    ) : '—'}
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
              <h3>{editing ? 'Modifier la certification' : 'Nouvelle certification'}</h3>
              <button className="modal-close" onClick={() => setModal(null)}><HiX /></button>
            </div>
            <div className="modal-body">
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Code</label>
                  <input className="form-input" value={form.code} onChange={e => f('code', e.target.value)} placeholder="Ex: ISO 9001:2015" />
                </div>
                <div className="form-group">
                  <label className="form-label">Catégorie</label>
                  <input className="form-input" value={form.category} onChange={e => f('category', e.target.value)} placeholder="Ex: Qualité, Sécurité…" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Titre *</label>
                <input className="form-input" value={form.title} onChange={e => f('title', e.target.value)} placeholder="Intitulé complet de la certification" />
              </div>
              <div className="form-group">
                <label className="form-label">Organisme émetteur</label>
                <input className="form-input" value={form.issuer} onChange={e => f('issuer', e.target.value)} placeholder="Ex: Bureau Veritas, AFNOR…" />
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Date d'obtention</label>
                  <input className="form-input" type="date" value={form.date_obtained} onChange={e => f('date_obtained', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Date d'expiration</label>
                  <input className="form-input" type="date" value={form.expiration_date} onChange={e => f('expiration_date', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Fichier certificat (image ou PDF)</label>
                <ImageUpload
                  value={form.certificate_file}
                  onChange={url => f('certificate_file', url)}
                  label="Choisir le certificat"
                  accept="image/*,application/pdf"
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
          <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <div className="modal-header">
              <h3>{editing.title}</h3>
              <button className="modal-close" onClick={() => setModal(null)}><HiX /></button>
            </div>
            <div className="modal-body">
              <div className="contact-meta">
                {editing.code     && <div className="contact-meta-item"><strong>Code :</strong> <code style={{ color: 'var(--a-gold)' }}>{editing.code}</code></div>}
                {editing.category && <div className="contact-meta-item"><strong>Catégorie :</strong> {editing.category}</div>}
                {editing.issuer   && <div className="contact-meta-item"><strong>Émetteur :</strong> {editing.issuer}</div>}
                {editing.date_obtained    && <div className="contact-meta-item"><strong>Obtenu le :</strong> {new Date(editing.date_obtained).toLocaleDateString('fr-FR')}</div>}
                {editing.expiration_date  && <div className="contact-meta-item">
                  <strong>Expire le :</strong>{' '}
                  <span style={{ color: isExpired(editing.expiration_date) ? '#EF4444' : 'inherit' }}>
                    {new Date(editing.expiration_date).toLocaleDateString('fr-FR')}
                    {isExpired(editing.expiration_date) && ' — Expirée'}
                  </span>
                </div>}
                {editing.certificate_file && <div className="contact-meta-item">
                  <a href={editing.certificate_file} target="_blank" rel="noreferrer" style={{ color: 'var(--a-gold)' }}>Voir le certificat →</a>
                </div>}
              </div>
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
