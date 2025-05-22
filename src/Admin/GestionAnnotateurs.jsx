import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AdminLayout from "./AdminLayout";

// ✅ Import Bootstrap CSS & JS proprement
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap; // 🔥 expose Bootstrap JS à window.bootstrap

export default function GestionAnntateurs() {
  const location = useLocation();
  const successMessage = location.state?.successMessage;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalUserId, setModalUserId] = useState(null);
  const [actionType, setActionType] = useState("desactiver");

  useEffect(() => {
    fetch("http://localhost:8080/api/utilisateurs")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur serveur");
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

  const openModal = (id, type) => {
    setModalUserId(id);
    setActionType(type);
    const modal = new window.bootstrap.Modal(
      document.getElementById("confirmModal")
    );
    modal.show();
  };

  const handleConfirmAction = async () => {
    const endpoint = `http://localhost:8080/api/utilisateurs/${modalUserId}/${actionType}`;
    try {
      const response = await fetch(endpoint, { method: "PUT" });
      if (!response.ok) throw new Error("Erreur HTTP");
      window.location.reload();
    } catch (error) {
      console.error("Erreur :", error);
      alert("❌ Échec de l'opération.");
    }
  };

  if (loading)
    return <div className="text-center mt-5">Chargement des utilisateurs...</div>;

  if (error)
    return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <AdminLayout>
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
                    {user.isActive ? (
                      <>
                        <Link
                          to={`/Admin/ajouter-utilisateur/${user.id}`}
                          className="btn btn-sm btn-warning me-2"
                        >
                          Modifier
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => openModal(user.id, "desactiver")}
                        >
                          Désactiver
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => openModal(user.id, "activer")}
                      >
                        Activer
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
      </div>

     
      <div
        className="modal fade"
        id="confirmModal"
        tabIndex="-1"
        aria-labelledby="confirmModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div
  className={`modal-header ${
    actionType === "desactiver" ? "bg-danger" : "bg-success"
  }`}
>
              <h5 className="modal-title" id="confirmModalLabel">
                Confirmation
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Fermer"
              ></button>
            </div>
            <div className="modal-body text-center">
              Voulez-vous vraiment{" "}
              {actionType === "desactiver" ? "désactiver" : "activer"} ce compte ?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Annuler
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleConfirmAction}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
