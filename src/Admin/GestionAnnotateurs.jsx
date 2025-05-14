import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";

export default function GestionAnntateurs() {
  const location = useLocation();
  const successMessage = location.state?.successMessage;
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
    return <div className="text-center mt-5">Chargement des utilisateurs...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
   
    <div className="container mt-5">
       {successMessage && (
  <div className="alert alert-success text-center">{successMessage}</div>
)}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestion des Annotateurs</h2>
        <Link to="/Admin/ajouter-utilisateur" className="btn btn-primary">
          + Ajouter Annotateur
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
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
                  <Link
                    to={`/Admin/ajouter-utilisateur/${user.id}`}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Modifier 
                  </Link>
                  <button className="btn btn-sm btn-danger">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <Link to="/Admin/admin-dashboard" className="btn btn-secondary">
          Retour à l'accueil admin
        </Link>
      </div>
    </div>
  );
}
