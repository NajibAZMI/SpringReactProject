import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DatasetList() {
  const [datasets, setDatasets] = useState([]);
  const [avancements, setAvancements] = useState({});

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/datasets");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des datasets");
        }
        const data = await response.json();
        setDatasets(data);

        // Charger l'avancement pour chaque dataset
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

  return (
    <div style={{ padding: "20px" }}>
      <h2>Liste des Datasets</h2>
      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
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
                  style={{ marginRight: "10px" }}
                >
                  Voir
                </Link>
                <Link to={`/Admin/datasets/AddAnnotateurs/${dataset.id}`}>
                  Ajouter Annotateurs
                </Link>
              </td>
              <td>
                {avancements[dataset.id] === 100 ? (
                  <button
                    onClick={() =>
                      window.open(
                        `http://localhost:8080/api/datasets/${dataset.id}/export`,
                        "_blank"
                      )
                    }
                    style={{ padding: "5px 10px", cursor: "pointer" }}
                  >
                    Exporter CSV
                  </button>
                ) : (
                  <span style={{ color: "gray" }}>Incomplet</span>
                )}
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
