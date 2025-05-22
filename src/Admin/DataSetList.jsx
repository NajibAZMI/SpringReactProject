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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Liste des Datasets</h2>
          <Link to="/Admin/AddDataset" className="btn btn-primary">
            + Ajouter DataSet
          </Link>
        </div>

        {/* Message de succès */}
        {successMessage && (
          <div className="alert alert-success text-center" role="alert">
            {successMessage}
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Avancement</th>
                <th>Action</th>
                <th>Exporter</th>
              </tr>
            </thead>
            <tbody>
              {datasets.map((dataset) => (
                <tr key={dataset.id}>
                  <td>{dataset.nomDataset}</td>
                  <td>{dataset.descriptionDataset}</td>
                  <td>
                    {avancements[dataset.id] !== undefined
                      ? `${avancements[dataset.id].toFixed(2)}%`
                      : "Chargement..."}
                  </td>
                  <td>
                    <Link
                      to={`/Admin/datasets/${dataset.id}`}
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      Voir
                    </Link>
                    <Link
                      to={`/Admin/datasets/AddAnnotateurs/${dataset.id}`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Ajouter Annotateurs
                    </Link>
                  </td>
                  <td>
                    {avancements[dataset.id] === 100 ? (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() =>
                          window.open(
                            `http://localhost:8080/api/datasets/${dataset.id}/export`,
                            "_blank"
                          )
                        }
                      >
                        Exporter CSV
                      </button>
                    ) : (
                      <span className="text-muted">Incomplet</span>
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
