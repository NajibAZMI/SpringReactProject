import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import annotate from "../Images/annotate.png"; 
export default function AdminLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.style.transition = "background-color 0.4s, color 0.4s";
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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

  const bgClass = darkMode ? "bg-dark text-white" : "bg-light text-dark";
  const navClass = darkMode ? "navbar-dark bg-secondary" : "navbar-light bg-white";
  const sidebarClass = darkMode ? "bg-secondary text-white" : "bg-white";

  return (
    <div className={`${bgClass} min-vh-100`} style={{ transition: "all 0.4s" }}>
      {/* NAVBAR */}
      <nav
  className={`navbar sticky-top ${navClass} shadow px-3 py-2`}
  style={{ transition: "background-color 0.4s, color 0.4s" }}
>
  <div className="container-fluid d-flex flex-wrap align-items-center justify-content-between">
    {/* Date */}
    <div className="d-flex align-items-center text-muted mb-2 mb-md-0">
      <i className="bi bi-calendar-event me-2 fs-5"></i>
      <span className="text-capitalize">{currentDate}</span>
    </div>

    {/* Barre de recherche */}
    <input
      type="search"
      className="form-control mx-3 flex-grow-1 flex-md-grow-0 w-100 w-md-50"
      placeholder="🔍 Rechercher..."
      aria-label="Rechercher"
      style={{ maxWidth: 400 }}
    />

    {/* Boutons */}
    <div className="d-flex align-items-center gap-2 mt-2 mt-md-0">
      {/* Toggle thème */}
      <button
        onClick={toggleDarkMode}
        className="btn btn-outline-primary"
        title="Basculer le thème"
        aria-label="Toggle Dark Mode"
      >
        <i className={`bi ${darkMode ? "bi-brightness-high-fill" : "bi-moon-fill"}`}></i>
      </button>

      {/* Profil */}
      <button
        className="btn btn-outline-secondary"
        data-bs-toggle="modal"
        data-bs-target="#userInfoModal"
        title="Voir le profil"
        aria-label="Voir le profil"
      >
        <i className="bi bi-person-circle fs-5"></i>
      </button>
    </div>
  </div>
</nav>


      {/* LAYOUT */}
      <div className="container-fluid">
        <div className="row flex-nowrap">
          {/* SIDEBAR */}
          <aside className={`col-12 col-md-3 col-lg-2 p-3 shadow-sm ${sidebarClass} min-vh-100`}>
            <div className="text-center mb-4">
               <img src={annotate} alt="Icone Annotation" style={styles.logoIcon} />
              <h5 className="text-primary fw-bold mt-2">DataAnnotation</h5>
            </div>
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
                  <i className="bi bi-people-fill me-2"></i> Annotateurs
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link btn text-start" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i> Déconnexion
                </button>
              </li>
            </ul>
          </aside>

          {/* CONTENU */}
          <main className="col p-4">{children}</main>
        </div>
      </div>

      {/* MODAL */}
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
              <h5 className="modal-title">
                <i className="bi bi-person-lines-fill me-2"></i> Informations Utilisateur
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
            </div>
            <div className="modal-body">
              <p><strong>Nom :</strong> {user?.nom || "Invité"}</p>
              <p><strong>Email :</strong> {user?.login || "Non défini"}</p>
              <p><strong>Rôle :</strong> Admin</p>
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
const styles = {
  logoIcon: {
    width: 32,         
    height: 32,        
    marginRight: 8,   
    verticalAlign: 'middle',
  },
};
