import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AdminLayout from "./AdminLayout";

export default function DatasetList() {
  const [datasets, setDatasets] = useState([]);
  const [avancements, setAvancements] = useState({});
  const location = useLocation();
  const successMessage = location.state?.successMessage;

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/datasets");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des datasets");
        }
        const data = await response.json();
        setDatasets(data);

        data.forEach(async (dataset) => {
          try {
            const res = await fetch(
              `http://localhost:8080/api/datasets/Avancement/${dataset.id}`
            );
            if (!res.ok) {
              throw new Error(
                `Erreur lors du chargement de l'avancement pour le dataset ${dataset.id}`
              );
            }
            const avancement = await res.json();
            setAvancements((prev) => ({ ...prev, [dataset.id]: avancement }));
          } catch (err) {
            console.error(err);
            setAvancements((prev) => ({ ...prev, [dataset.id]: 0 }));
          }
        });
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchDatasets();
  }, []);

  // Nettoyer le message après affichage
  useEffect(() => {
    if (successMessage) {
      window.history.replaceState({}, document.title);
    }
  }, [successMessage]);

  return (
   <AdminLayout>
  <div className="container mt-5">
    {/* En-tête avec titre et bouton */}
    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
      <h2 className="fw-bold text-primary mb-0">Liste des Datasets</h2>
      <Link
        to="/Admin/AddDataset"
        className="btn btn-primary btn-lg shadow-sm"
        style={{ minWidth: 180 }}
      >
        <i className="bi bi-plus-lg me-2"></i> Ajouter DataSet
      </Link>
    </div>

    {/* Message succès */}
    {successMessage && (
      <div className="alert alert-success text-center rounded shadow-sm" role="alert">
        {successMessage}
      </div>
    )}

    <div className="table-responsive shadow-sm rounded" style={{ overflowX: "auto" }}>
      <table className="table table-hover align-middle mb-0" style={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
        <thead className="bg-primary text-white rounded-3">
          <tr>
            <th className="rounded-start ps-3">Nom</th>
            <th>Description</th>
            <th>Avancement</th>
            <th>Action</th>
            <th className="rounded-end pe-3">Exporter</th>
          </tr>
        </thead>
        <tbody>
          {datasets.map((dataset) => (
            <tr key={dataset.id} className="shadow-sm bg-white rounded-3" style={{ transition: "background-color 0.3s" }}>
              <td className="ps-3 fw-semibold">{dataset.nomDataset}</td>
              <td>{dataset.descriptionDataset}</td>
              <td>
                {avancements[dataset.id] !== undefined ? (
                  <div className="progress" style={{ height: "18px", maxWidth: "150px" }}>
                    <div
                      className={`progress-bar ${avancements[dataset.id] === 100 ? "bg-success" : "bg-info"}`}
                      role="progressbar"
                      style={{ width: `${avancements[dataset.id]}%` }}
                      aria-valuenow={avancements[dataset.id]}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {avancements[dataset.id].toFixed(2)}%
                    </div>
                  </div>
                ) : (
                  <span className="text-muted fst-italic">Chargement...</span>
                )}
              </td>
              <td>
                <Link
                  to={`/Admin/datasets/${dataset.id}`}
                  className="btn btn-sm btn-outline-primary me-2"
                  title="Voir le dataset"
                >
                  <i className="bi bi-eye"></i> Voir
                </Link>
                <Link
                  to={`/Admin/datasets/AddAnnotateurs/${dataset.id}`}
                  className="btn btn-sm btn-outline-secondary"
                  title="Ajouter annotateurs"
                >
                  <i className="bi bi-person-plus"></i> Ajouter Annotateurs
                </Link>
              </td>
              <td>
                {avancements[dataset.id] === 100 ? (
                  <button
                    className="btn btn-success btn-sm shadow-sm"
                    onClick={() =>
                      window.open(
                        `http://localhost:8080/api/datasets/${dataset.id}/export`,
                        "_blank"
                      )
                    }
                    title="Exporter en CSV"
                    style={{ transition: "transform 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <i className="bi bi-file-earmark-arrow-down me-1"></i> Exporter CSV
                  </button>
                ) : (
                  <span className="text-muted fst-italic">Incomplet</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</AdminLayout>

  );
}
