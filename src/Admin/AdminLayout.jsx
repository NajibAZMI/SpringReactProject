import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function AdminLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const currentDate = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={`${darkMode ? "bg-dark text-white" : "bg-light text-dark"} min-vh-100`}>
      
      {/* NAVBAR */}
      <nav className={`navbar ${darkMode ? "navbar-dark bg-secondary" : "navbar-light bg-white"} shadow-sm px-4 py-2`}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Gauche : Date */}
          <span className="text-muted">
            <i className="bi bi-calendar-event me-2"></i>
            {currentDate}
          </span>

          {/* Centre : Barre de recherche */}
          <input
            type="text"
            className="form-control w-50 mx-3"
            placeholder="🔍 Rechercher..."
          />

          {/* Droite : Boutons */}
          <div className="d-flex align-items-center">
            <button
              onClick={toggleDarkMode}
              className="btn btn-outline-primary me-2"
              title="Basculer le thème"
            >
              <i className={`bi ${darkMode ? "bi-brightness-high" : "bi-moon-fill"}`}></i>
            </button>

            <button
              className="btn btn-outline-secondary"
              data-bs-toggle="modal"
              data-bs-target="#userInfoModal"
              title="Voir le profil"
            >
              <i className="bi bi-person-circle fs-5"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* CONTENU */}
      <div className="container-fluid">
        <div className="row">
          {/* SIDEBAR */}
          <div className={`col-md-2 p-3 shadow-sm d-flex flex-column justify-content-between min-vh-100 ${darkMode ? "bg-secondary text-white" : "bg-white"}`}>
            <div>
              <h4 className="text-primary fw-bold mb-4">DataAnnota</h4>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link" to="/Admin/admin-dashboard">
                    <i className="bi bi-speedometer2 me-2"></i> Tableau de bord
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Admin/DataSetList">
                    <i className="bi bi-folder2-open me-2"></i> DataSets
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Admin/GestionAnntateurs">
                    <i class="fa-solid fa-users"></i> Annotateurs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i> Déconnexion
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* CONTENU CENTRAL */}
          <div className="col-md-10">
            <div className="container py-4">{children}</div>
          </div>
        </div>
      </div>

      {/* MODAL D'INFOS UTILISATEUR */}
      <div
        className="modal fade"
        id="userInfoModal"
        tabIndex="-1"
        aria-labelledby="userInfoModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className={`modal-content ${darkMode ? "bg-dark text-white" : ""}`}>
            <div className="modal-header">
              <h5 className="modal-title" id="userInfoModalLabel">
                <i className="bi bi-person-lines-fill me-2"></i> Informations Utilisateur
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
            </div>
            <div className="modal-body">
              <p><strong>Nom :</strong> {user?.nom || "Invité"}</p>
              <p><strong>Email :</strong> {user?.login || "Non défini"}</p>
              <p><strong>Role :</strong> Admin</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
