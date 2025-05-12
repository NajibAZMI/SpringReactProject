import { useParams ,Link} from "react-router-dom";
import { useState,useEffect } from "react";
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
  }, []);
  return (
    <>
      <div>id :{id}</div>
      <div>liste Des Taches</div>

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
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
          {Taches.map((Tache) => (
            <tr key={Tache.id}>
              <td>{Tache.id}</td>
              <td>{Tache.nomDataset|| "N/A"}</td>
              <td>{Tache.datelimite}</td>
              <td>Avancement</td>
              <td>{Tache.taille}</td>
              <td>  <Link to={`/User/TravaillerTache/${Tache.id}`}>Travailler</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
