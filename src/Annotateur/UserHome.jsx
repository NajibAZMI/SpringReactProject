import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function UserHome() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <div className="text-center mt-5">Chargement...</div>;
  }

  return (
    <div className="container mt-5 text-center">
      <div className="card p-4 shadow-sm">
        <h1 className="mb-3">Bienvenue,Mr. {user.nom} {user.prenom} </h1>

        <Link to={`/User/TachesList/${user.id}`} className="btn btn-primary me-3">
          Consulter les Tâches
        </Link>

        <button
          className="btn btn-outline-danger"
          onClick={() => {
            localStorage.removeItem('user');
            window.location.href = '/';
          }}
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}
