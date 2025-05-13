import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminHome() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div className="container text-center mt-5">
      <div className="card shadow p-4">
       <h1 className="mb-3">Bienvenue,Mr. {user.nom}{user.prenom} </h1>

        <div className="d-grid gap-2 col-6 mx-auto mt-4">
          <button className="btn btn-danger" onClick={handleLogout}>
            Déconnexion
          </button>

          <Link to="/Admin/GestionAnntateurs" className="btn btn-primary">
            Gérer Les Annotateurs
          </Link>
          <Link to="/Admin/AddDataset" className="btn btn-success">
            Ajouter Une Data Set
          </Link>
          <Link to="/Admin/DataSetList" className="btn btn-info">
            Liste Des DataSets
          </Link>
        </div>
      </div>
    </div>
  );
}
