// src/components/AdminLayout.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`${darkMode ? "bg-dark text-white" : "bg-light text-dark"} min-vh-100`}>
      {/* Barre de navigation */}
      <nav className={`navbar ${darkMode ? 'navbar-dark bg-secondary' : 'navbar-light bg-white'} shadow-sm px-3`}>
        <button onClick={toggleDarkMode} className="btn btn-outline-primary me-3">
          🌙
        </button>
        <input type="text" className="form-control w-50" placeholder="Search..." />
      </nav>

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className={`col-md-2 p-3 shadow-sm d-flex flex-column justify-content-between min-vh-100 ${darkMode ? 'bg-secondary text-white' : 'bg-white'}`}>
            <div>
              <h4 className="text-primary fw-bold">Annotopia</h4>
              <ul className="nav flex-column mt-4">
                <li className="nav-item"><Link className="nav-link" to="/Admin/admin-dashboard">📊 Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/Admin/GestionDatasets">📁 Datasets</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/Admin/GestionAnntateurs">👤 Annotateurs</Link></li>
                <li className="nav-item"><Link className="nav-link" to="#">⚙️ Paramètres</Link></li>
              </ul>
            </div>
            <div className="pt-3">
              <p className="text-muted mb-1">admin (ADMIN)</p>
              <button className="btn btn-outline-danger btn-sm">Logout</button>
            </div>
          </div>

        
          <div className="col-md-10">
            <div className="container py-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
