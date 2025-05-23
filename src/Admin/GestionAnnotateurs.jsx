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
      <div className="alert alert-success text-center rounded shadow-sm">
        {successMessage}
      </div>
    )}

    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
      <h2 className="fw-bold text-primary mb-0">Gestion des Annotateurs</h2>
      <Link
        to="/Admin/ajouter-utilisateur"
        className="btn btn-primary btn-lg shadow-sm"
        style={{ minWidth: 180 }}
      >
        <i className="bi bi-plus-lg me-2"></i> Ajouter Annotateur
      </Link>
    </div>

    <div className="table-responsive shadow-sm rounded" style={{ overflowX: "auto" }}>
      <table
        className="table table-hover align-middle mb-0"
        style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}
      >
        <thead className="bg-primary text-white rounded-3">
          <tr>
            <th className="ps-3 rounded-start">Nom</th>
            <th>Prénom</th>
            <th className="rounded-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="bg-white shadow-sm rounded-3"
              style={{ transition: "background-color 0.3s" }}
            >
              <td className="ps-3 fw-semibold">{user.nom}</td>
              <td>{user.prenom}</td>
              <td>
                {user.isActive ? (
                  <>
                    <Link
                      to={`/Admin/ajouter-utilisateur/${user.id}`}
                      className="btn btn-sm btn-warning me-2 shadow-sm"
                      title="Modifier cet annotateur"
                      style={{ transition: "transform 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      <i className="bi bi-pencil-square me-1"></i> Modifier
                    </Link>
                    <button
                      className="btn btn-sm btn-danger shadow-sm"
                      onClick={() => openModal(user.id, "desactiver")}
                      title="Désactiver cet annotateur"
                      style={{ transition: "transform 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      <i className="bi bi-person-x me-1"></i> Désactiver
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-sm btn-success shadow-sm"
                    onClick={() => openModal(user.id, "activer")}
                    title="Activer cet annotateur"
                    style={{ transition: "transform 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <i className="bi bi-person-check me-1"></i> Activer
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* Modal confirmation */}
  <div
    className="modal fade"
    id="confirmModal"
    tabIndex="-1"
    aria-labelledby="confirmModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content shadow">
        <div
          className={`modal-header ${
            actionType === "desactiver" ? "bg-danger text-white" : "bg-success text-white"
          } rounded-top`}
        >
          <h5 className="modal-title" id="confirmModalLabel">
            Confirmation
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Fermer"
          ></button>
        </div>
        <div className="modal-body text-center fs-5">
          Voulez-vous vraiment{" "}
          <span className="fw-bold">
            {actionType === "desactiver" ? "désactiver" : "activer"}
          </span>{" "}
          ce compte ?
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary btn-lg"
            data-bs-dismiss="modal"
          >
            Annuler
          </button>
          <button
            type="button"
            className={`btn btn-lg ${
              actionType === "desactiver" ? "btn-danger" : "btn-success"
            }`}
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
