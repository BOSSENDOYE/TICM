import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  HiOutlinePhone, HiOutlineEnvelope, HiOutlineMapPin,
  HiOutlineClock, HiArrowUpRight, HiOutlineCheckCircle,
} from 'react-icons/hi2'
import { postContact } from '../../api'
import './Contact.css'

const team = [
  { name: 'Ibrahima THIAM',        role: 'Directeur Général',           phone: '+221 78 448 67 31' },
  { name: 'Ibra SECK',             role: 'Directeur Associé',           phone: '+221 77 762 64 97' },
  { name: 'Ndeye Yacine GUEYE',    role: 'Responsable Administrative',  phone: '+221 77 142 92 31' },
]

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  const [form, setForm]         = useState({ fullname: '', email: '', phone: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent]         = useState(false)
  const [error, setError]       = useState('')

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await postContact(form)
      setSent(true)
      setForm({ fullname: '', email: '', phone: '', message: '' })
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'envoi')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div ref={ref} className="contact-layout">

          {/* ── LEFT: info ── */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -48 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="eyebrow">Nous contacter</div>
            <h2 className="section-title section-title-dark">Parlons de<br />votre projet.</h2>
            <div className="title-accent" />
            <p className="section-subtitle section-subtitle-dark" style={{ marginTop: 12 }}>
              Décrivez votre projet industriel et obtenez une réponse sous 48 heures.
            </p>

            <div className="ci-details">
              <a href="mailto:thiamchd7@gmail.com" className="ci-item">
                <span className="ci-icon"><HiOutlineEnvelope /></span>
                <div>
                  <span className="ci-label">Email</span>
                  <span className="ci-value">thiamchd7@gmail.com</span>
                </div>
              </a>
              <div className="ci-item">
                <span className="ci-icon"><HiOutlineMapPin /></span>
                <div>
                  <span className="ci-label">Localisation</span>
                  <span className="ci-value">Sénégal — Afrique de l'Ouest</span>
                </div>
              </div>
              <div className="ci-item">
                <span className="ci-icon"><HiOutlineClock /></span>
                <div>
                  <span className="ci-label">Horaires</span>
                  <span className="ci-value">Lun – Ven : 08h00 – 18h00</span>
                </div>
              </div>
            </div>

            <div className="ci-team">
              <div className="ci-team-label">Notre équipe</div>
              {team.map(t => (
                <a key={t.name} href={`tel:${t.phone.replace(/\s/g,'')}`} className="ci-member">
                  <div className="ci-member-avatar">{t.name.charAt(0)}</div>
                  <div className="ci-member-info">
                    <span className="ci-member-name">{t.name}</span>
                    <span className="ci-member-role">{t.role}</span>
                  </div>
                  <span className="ci-member-phone">
                    <HiOutlinePhone /> {t.phone}
                  </span>
                </a>
              ))}
            </div>

            <div className="ci-legal">
              <span>NINEA : 008947501 1E1</span>
              <span>RCC : SN DKR 2021 A34789</span>
            </div>
          </motion.div>

          {/* ── RIGHT: form ── */}
          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, x: 48 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {sent ? (
              <div className="form-success">
                <HiOutlineCheckCircle className="form-success-icon" />
                <h3>Message envoyé !</h3>
                <p>Merci pour votre message. Notre équipe vous répondra sous 48 heures.</p>
                <button className="form-reset-btn" onClick={() => setSent(false)}>Envoyer un autre message</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit}>
                <div className="form-title">Votre demande</div>

                {error && <div className="form-error">{error}</div>}

                <div className="form-row-2">
                  <div className="field-group">
                    <label>Nom complet *</label>
                    <input name="fullname" value={form.fullname} onChange={handle} required placeholder="Jean Dupont" />
                  </div>
                  <div className="field-group">
                    <label>Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handle} required placeholder="jean@societe.com" />
                  </div>
                </div>

                <div className="field-group">
                  <label>Téléphone</label>
                  <input name="phone" type="tel" value={form.phone} onChange={handle} placeholder="+221 77 000 00 00" />
                </div>

                <div className="field-group">
                  <label>Votre projet *</label>
                  <textarea name="message" rows={6} value={form.message} onChange={handle} required placeholder="Décrivez votre projet : type de travaux, localisation, délai souhaité…" />
                </div>

                <button type="submit" className="form-submit-btn" disabled={submitting}>
                  <span>{submitting ? 'Envoi en cours…' : 'Envoyer ma demande'}</span>
                  {!submitting && <HiArrowUpRight />}
                </button>

                <p className="form-note">Réponse garantie sous 48h. Vos données restent confidentielles.</p>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
