import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function DatasetList() {
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
   
    const fetchDatasets = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/datasets');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des datasets');
        }
        const data = await response.json();
        setDatasets(data);
      } catch (error) {
        console.error('Erreur :', error);

      }
    };

    fetchDatasets();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Liste des Datasets</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Avancement</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {datasets.map((dataset) => (
            <tr key={dataset.id}>
              <td>{dataset.nomDataset}</td>
              <td>{dataset.descriptionDataset}</td>
              <td>0%</td>
              <td>
                <Link to={`/Admin/datasets/${dataset.id}`}>Voir</Link>
                <Link to={`/Admin/datasets/AddAnnotateurs/${dataset.id}`}>Ajouter Annotateurs</Link>

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
