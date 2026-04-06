import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../../api';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('Login attempt', { email, password });

    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      let data = null;
      try {
        data = await response.json();
      } catch (jsonErr) {
        console.warn('Impossible de parser la réponse JSON', jsonErr);
      }

      console.log('Login response', { status: response.status, ok: response.ok, data });

      if (!response.ok) {
        if (data && data.message) {
          setError(`${response.status} - ${data.message}`);
        } else if (data && data.errors) {
          const firstError = Object.values(data.errors)[0]?.[0];
          setError(`${response.status} - ${firstError || 'Erreur de connexion'}`);
        } else if (response.status === 0) {
          setError('Erreur réseau : impossible de joindre l’API.');
        } else {
          setError(`${response.status} - Erreur de connexion. Veuillez vérifier vos identifiants.`);
        }
        return;
      }

      // Sauvegarder le token et les infos utilisateur
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Rediriger vers le dashboard admin
      navigate('/admin/dashboard');
    } catch (err) {
      const errMsg = err?.message || 'Erreur lors de la connexion. Vérifiez votre connexion réseau.';
      setError(`Erreur réseau : ${errMsg}`);
      console.error('Login fetch error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Administration TICM</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@ticm.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Entrez votre mot de passe"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
