import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function UserHome(){
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <p>Chargement...</p>; // Ou redirection
  }

  return (<>
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                      <h1>Bienvenue, {user.login}</h1>
                      <p>Rôle : {user.role}</p>
                       <Link to={`/User/TachesList/${user.id}`}>
                        <button>Consulté Utilisiateur</button>
                       </Link>
                    </div>
                    <button onClick={() => {
                                    localStorage.removeItem('user');
                                    window.location.href = '/'; 
                                  }}>
                                    Déconnexion
                                  </button>
                                  </>     
                  );
}