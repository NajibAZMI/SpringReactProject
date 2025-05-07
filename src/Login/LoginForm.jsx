import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login: email, password }),
    });

    if (!response.ok) {
      throw new Error('Identifiants incorrects');
    }

    const data = await response.json();
    setRole(data.role);
    setError('');
    localStorage.setItem("user", JSON.stringify(data));
    if (data.role === 'ADMIN_ROLE') {
      navigate('/admin-dashboard');
    } else if (data.role === 'USER_ROLE') {
      navigate('/user-dashboard');
    }
  } catch (err) {
    setError(err.message);
  }
};


  return (
    <div style={styles.container}>
      <h2>Connexion</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
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
        <button type="submit" style={styles.button}>Se connecter</button>
      </form>
      {role && <p>Rôle détecté : <strong>{role}</strong></p>}
    </div>
  );
}

const styles = {
  container: {
    width: '300px',
    margin: '100px auto',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '10px',
    textAlign: 'center',
    fontFamily: 'Arial',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};
