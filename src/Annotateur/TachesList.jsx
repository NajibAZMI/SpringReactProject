import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import UserLayout from "./UserLayout";

export default function TachesList() {
  const { id } = useParams();
  const [Taches, setTaches] = useState([]);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/utilisateurs/userTaches/DTO/${id}`
        );
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des datasets");
        }
        const data = await response.json();
        setTaches(data);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchDatasets();
  }, [id]);

  return (
    <UserLayout>
      <div className="container mt-5">
        <h2 className="text-center text-primary fw-bold mb-4">
          📋 Liste des Tâches
        </h2>

        <div className="table-responsive">
          <table className="table table-hover align-middle shadow-sm rounded">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Nom du Dataset</th>
                <th>Date Limite</th>
                <th>Avancement</th>
                <th>Taille</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {Taches.length > 0 ? (
                Taches.map((Tache) => (
                  <tr key={Tache.id}>
                    <td className="fw-medium">{Tache.id}</td>
                    <td>{Tache.nomDataset || "N/A"}</td>
                    <td>{Tache.datelimite}</td>
                    <td>
                      <div className="progress" style={{ height: "20px" }}>
                        <div
                          className={`progress-bar ${
                            Tache.avancement === 100
                              ? "bg-success"
                              : "bg-info"
                          }`}
                          role="progressbar"
                          style={{ width: `${Tache.avancement}%` }}
                          aria-valuenow={Tache.avancement}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {Tache.avancement}%
                        </div>
                      </div>
                    </td>
                    <td>{Tache.taille}</td>
                    <td className="text-center">
                      <Link
                        to={`/User/TravaillerTache/${Tache.id}`}
                        className={`btn btn-sm ${
                          Tache.avancement === 100
                            ? "btn-success"
                            : "btn-primary"
                        }`}
                      >
                        {Tache.avancement === 100 ? "Terminé" : "Travailler"}
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    Aucune tâche disponible pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

       
      </div>
    </UserLayout>
  );
}
