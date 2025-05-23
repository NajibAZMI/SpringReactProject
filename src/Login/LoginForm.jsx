import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import annotate from "../Images/annotate.png";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null);
  const [error, setError] = useState('');
  const [showInactiveModal, setShowInactiveModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: email, password }),
      });

      if (!response.ok) {
        throw new Error('Identifiants incorrects');
      }

      const data = await response.json();
      setRole(data.role);
      setError('');
      localStorage.setItem('user', JSON.stringify(data));

      if (data.role === 'ADMIN_ROLE') {
        navigate('/Admin/admin-dashboard');
      } else if (data.role === 'USER_ROLE' && data.isActive === true) {
        navigate('/User/user-dashboard');
      } else if (data.isActive === false) {
        setShowInactiveModal(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <img src={annotate} alt="Icone Annotation" style={styles.logoIcon} />
        <h1 style={styles.logo}>DataAnnotation</h1>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Se connecter
        </button>
      </form>

      {/* Modal compte inactif */}
      {showInactiveModal && (
        <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex="-1" aria-modal="true" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Compte Inactif</h5>
                <button type="button" className="btn-close" onClick={() => setShowInactiveModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Votre compte est désactivé. Veuillez contacter l'administrateur.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => setShowInactiveModal(false)}>
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #74ebd5, #ACB6E5)',
    fontFamily: 'Segoe UI, sans-serif',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  logo: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#007bff',
    letterSpacing: '1px',
  },
 
  error: {
    color: '#e74c3c',
    marginBottom: '15px',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.3s',
  },
  button: {
    width: '100%',
    padding: '12px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  logoIcon: {
  width: 32,       
  height: 32,     
  marginRight: 8,  
  verticalAlign: 'middle',
},

};
