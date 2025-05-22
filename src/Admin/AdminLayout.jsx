// src/components/AdminLayout.jsx
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

  return (
    <div className={`${darkMode ? "bg-dark text-white" : "bg-light text-dark"} min-vh-100`}>
      <nav className={`navbar ${darkMode ? "navbar-dark bg-secondary" : "navbar-light bg-white"} shadow-sm px-3`}>
        <div className="d-flex w-100 justify-content-between align-items-center">
          <input type="text" className="form-control w-50" placeholder="🔍 Rechercher..." />

          <div>
            <button
              onClick={toggleDarkMode}
              className="btn btn-outline-primary me-3"
              title="Basculer le thème"
            >
              <i className="bi bi-moon-fill"></i>
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

      <div className="container-fluid">
        <div className="row">
          <div className={`col-md-2 p-3 shadow-sm d-flex flex-column justify-content-between min-vh-100 ${darkMode ? "bg-secondary text-white" : "bg-white"}`}>
            <div>
              <h4 className="text-primary fw-bold">Annotopia</h4>
              <ul className="nav flex-column mt-4">
                <li className="nav-item">
                  <Link className="nav-link" to="/Admin/admin-dashboard">
                    <i className="bi bi-speedometer2 me-2"></i> Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Admin/DataSetList">
                    <i className="bi bi-folder2-open me-2"></i> Datasets
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Admin/GestionAnntateurs">
                    <i className="bi bi-people-fill me-2"></i> Annotateurs
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

          <div className="col-md-10">
            <div className="container py-10">{children}</div>
          </div>
        </div>
      </div>

      {/* Modal infos utilisateur */}
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
              <p><strong>Email :</strong> {user?.email || "Non défini"}</p>
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
