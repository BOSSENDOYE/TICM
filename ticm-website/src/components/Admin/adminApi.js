import { API_BASE } from '../../api'

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  ...(localStorage.getItem('auth_token')
    ? { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
    : {}),
})

async function req(url, opts = {}) {
  const res = await fetch(`${API_BASE}${url}`, { ...opts, headers: getHeaders() })
  if (res.status === 204) return null
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || `Erreur ${res.status}`)
  return data
}

async function uploadFile(file) {
  const token = localStorage.getItem('auth_token')
  const fd = new FormData()
  fd.append('file', file)
  const res = await fetch(`${API_BASE}/api/upload`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: fd,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || `Erreur upload ${res.status}`)
  return data // { url: '/storage/uploads/...' }
}

export const adminApi = {
  get:        (url)       => req(url),
  post:       (url, body) => req(url, { method: 'POST',   body: JSON.stringify(body) }),
  put:        (url, body) => req(url, { method: 'PUT',    body: JSON.stringify(body) }),
  patch:      (url, body) => req(url, { method: 'PATCH',  body: JSON.stringify(body) }),
  delete:     (url)       => req(url, { method: 'DELETE' }),
  uploadFile: (file)      => uploadFile(file),
}
