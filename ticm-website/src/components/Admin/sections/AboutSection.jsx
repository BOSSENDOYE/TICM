import { useEffect, useState } from 'react'
import { adminApi } from '../adminApi'
import { HiOutlineInformationCircle } from 'react-icons/hi2'

const EMPTY = {
  company_name: '',
  tagline: '',
  description: '',
  mission: '',
  vision: '',
  founded_year: '',
  employees_count: '',
  address: '',
  phone: '',
  email: '',
  website: '',
  linkedin: '',
}

export default function AboutSection() {
  const [form, setForm]     = useState(EMPTY)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving]   = useState(false)
  const [toast, setToast]     = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  useEffect(() => {
    adminApi.get('/api/about')
      .then(d => {
        const data = d?.data || d || {}
        setForm(prev => ({ ...prev, ...data }))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const save = async () => {
    setSaving(true)
    try {
      await adminApi.post('/api/about', form)
      showToast('Informations mises à jour avec succès')
    } catch (e) {
      showToast(e.message || 'Erreur lors de la sauvegarde', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="admin-loading"><div className="spinner" /><span>Chargement…</span></div>

  return (
    <div>
      <div className="section-head">
        <div className="section-head-text">
          <h2>À Propos</h2>
          <p>Informations générales de l'entreprise affichées sur la page vitrine.</p>
        </div>
        <button className="btn btn-primary" onClick={save} disabled={saving}>
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </div>

      <div className="about-form-wrap">
        {/* Identité */}
        <div className="about-section-block">
          <div className="about-block-title"><HiOutlineInformationCircle /> Identité de l'entreprise</div>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Nom de l'entreprise</label>
              <input className="form-input" value={form.company_name} onChange={e => f('company_name', e.target.value)} placeholder="Ex: TICM" />
            </div>
            <div className="form-group">
              <label className="form-label">Accroche / Tagline</label>
              <input className="form-input" value={form.tagline} onChange={e => f('tagline', e.target.value)} placeholder="Ex: L'excellence métallique au Sénégal" />
            </div>
          </div>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Année de fondation</label>
              <input className="form-input" type="number" value={form.founded_year} onChange={e => f('founded_year', e.target.value)} placeholder="Ex: 2010" />
            </div>
            <div className="form-group">
              <label className="form-label">Nombre d'employés</label>
              <input className="form-input" type="number" value={form.employees_count} onChange={e => f('employees_count', e.target.value)} placeholder="Ex: 120" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Description générale</label>
            <textarea className="form-input form-textarea" rows={5} value={form.description} onChange={e => f('description', e.target.value)} placeholder="Présentation de l'entreprise, son histoire, ses activités…" />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="about-section-block">
          <div className="about-block-title">Mission & Vision</div>
          <div className="form-group">
            <label className="form-label">Mission</label>
            <textarea className="form-input form-textarea" rows={4} value={form.mission} onChange={e => f('mission', e.target.value)} placeholder="La mission de l'entreprise…" />
          </div>
          <div className="form-group">
            <label className="form-label">Vision</label>
            <textarea className="form-input form-textarea" rows={4} value={form.vision} onChange={e => f('vision', e.target.value)} placeholder="La vision et les ambitions à long terme…" />
          </div>
        </div>

        {/* Contact */}
        <div className="about-section-block">
          <div className="about-block-title">Coordonnées</div>
          <div className="form-group">
            <label className="form-label">Adresse</label>
            <input className="form-input" value={form.address} onChange={e => f('address', e.target.value)} placeholder="Ex: Zone Industrielle, Dakar, Sénégal" />
          </div>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Téléphone</label>
              <input className="form-input" value={form.phone} onChange={e => f('phone', e.target.value)} placeholder="+221 33 XXX XX XX" />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" value={form.email} onChange={e => f('email', e.target.value)} placeholder="contact@ticm.sn" />
            </div>
          </div>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Site web</label>
              <input className="form-input" value={form.website} onChange={e => f('website', e.target.value)} placeholder="https://www.ticm.sn" />
            </div>
            <div className="form-group">
              <label className="form-label">LinkedIn</label>
              <input className="form-input" value={form.linkedin} onChange={e => f('linkedin', e.target.value)} placeholder="https://linkedin.com/company/ticm" />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 8 }}>
          <button className="btn btn-primary" onClick={save} disabled={saving} style={{ minWidth: 160 }}>
            {saving ? 'Enregistrement…' : 'Enregistrer les modifications'}
          </button>
        </div>
      </div>

      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}
    </div>
  )
}
