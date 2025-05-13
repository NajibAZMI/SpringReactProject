import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function AdminHome(){
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <p>Chargement...</p>; 
  }

  return (<>
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bienvenue, {user.login}</h1>
      <p>Nom ,{user.nom}</p>
      <p>Rôle : {user.role}</p>
    </div>
    <button onClick={() => {
                    localStorage.removeItem('user');
                    window.location.href = '/'; 
                  }}>
                    Déconnexion
                  </button>

      <Link to="/Admin/GestionAnntateurs">
        <button>Gérer Les Annotateurs</button>
      </Link>
      <Link to="/Admin/AddDataset">
        <button>Ajouter Une Data Set</button>
      </Link>
      <Link to="/Admin/DataSetList">
        <button>List Des DataSets</button>
      </Link>
                  </>     
  );
}