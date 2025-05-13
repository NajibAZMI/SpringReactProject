import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function GestionAnntateurs() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/utilisateurs")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur serveur");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur de chargement des utilisateurs");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Chargement des utilisateurs...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Gestion des Annotateurs</h2>
      <Link to="/Admin/ajouter-utilisateur">+Ajouter</Link>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.nom}</td>
              <td>{user.prenom}</td>
              <td>
                <Link to={`/Admin/ajouter-utilisateur/${user.id}`}>
                  <button>Modifier</button>
                </Link>

                <button>Supprimer</button>
              </td>
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
