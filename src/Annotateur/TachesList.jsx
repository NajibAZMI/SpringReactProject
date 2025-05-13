import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

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
    <div className="container mt-5">
      <h2 className="text-center mb-4">Liste des Tâches</h2>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>Nom DataSet</th>
            <th>Date Limite</th>
            <th>Avancement</th>
            <th>Taille</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Taches.length > 0 ? (
            Taches.map((Tache) => (
              <tr key={Tache.id}>
                <td>{Tache.id}</td>
                <td>{Tache.nomDataset || "N/A"}</td>
                <td>{Tache.datelimite}</td>
                <td>{Tache.avancement}%</td>
                <td>{Tache.taille}</td>
                <td>
                  <Link
                    to={`/User/TravaillerTache/${Tache.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Travailler
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                Aucune tâche disponible
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Link to="/User/user-dashboard" className="btn btn-secondary mt-3">
        Retour à l'accueil
      </Link>
    </div>
  );
}
