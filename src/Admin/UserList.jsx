import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch des utilisateurs depuis le backend
    fetch('http://localhost:8080/api/utilisateurs')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erreur serveur');
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data); // Met à jour l'état avec la liste des utilisateurs
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Erreur de chargement des utilisateurs');
        setLoading(false);
      });
  }, []); // L'array vide [] signifie que ce useEffect se lance une seule fois lors du montage du composant.

  if (loading) {
    return <p>Chargement des utilisateurs...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Rôle</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.nom}</td>
              <td>{user.prenom}</td>
              <td>{user.login}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/Admin/admin-dashboard">
        <button style={{ marginTop: "10px" }}>Retour à l'accueil admin</button>
      </Link>
    </div>
  );
}
