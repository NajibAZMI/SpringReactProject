import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function DatasetDetail() {
  const { id } = useParams();
  const [dataset, setDataset] = useState(null);

  useEffect(() => {
    const fetchDataset = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/datasets/${id}`);
        if (!response.ok) throw new Error('Erreur lors du chargement du dataset');

        const data = await response.json();
        setDataset(data);
       
      } catch (error) {
        console.error('Erreur :', error);
      }
    };

    fetchDataset();
  }, [id]);

 
  if (!dataset) return <p>Dataset non trouvé.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Détails du Dataset</h2>
      <p><strong>Nom :</strong> {dataset.nomDataset}</p>
      <p><strong>Description :</strong> {dataset.descriptionDataset}</p>
      <p><strong>Avancement :</strong> 0%</p>
      <p><strong>Classes :</strong> {dataset.classesPossibles.map(c => c.textclass).join(", ")}</p><h3>Couples de textes</h3>
      {dataset.coupleTextList && dataset.coupleTextList.length > 0 ? (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Texte 1</th>
              <th>Texte 2</th>
            </tr>
          </thead>
          <tbody>
            {dataset.coupleTextList.map((couple) => (
              <tr key={couple.id}>
                <td>{couple.text1}</td>
                <td>{couple.text2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun couple de textes trouvé pour ce dataset.</p>
      )}

      <Link to="/datasets">
        <button style={{ marginTop: '10px' }}>Retour à la liste</button>
      </Link>
    </div>
  );
}
