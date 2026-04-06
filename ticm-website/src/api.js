// URL de base de l'API — vide en dev (proxy Vite), domaine complet en prod
export const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

export async function fetchServices() {
  const res = await fetch(`${API_BASE}/api/services`, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error('Impossible de charger les services')
  const data = await res.json()
  return data.data
}

export async function postContact(payload) {
  const res = await fetch(`${API_BASE}/api/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || 'Envoi du contact échoué')
  }
  return res.json()
}
