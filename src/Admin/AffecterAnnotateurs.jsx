import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AffecterAnnotateurs() {
  const { datasetId } = useParams(); // 👈 récupération de l'ID du dataset
  const [annotateurs, setAnnotateurs] = useState([]);
  const [selectedAnnotateurs, setSelectedAnnotateurs] = useState({});
  const [message, setMessage] = useState('');

  // Récupération des annotateurs
  useEffect(() => {
    const fetchAnnotateurs = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/utilisateurs/Annotateurs');
        if (!response.ok) throw new Error('Erreur lors du chargement des annotateurs');
        const data = await response.json();
        setAnnotateurs(data);
      } catch (error) {
        console.error('Erreur :', error);
      }
    };

    fetchAnnotateurs();
  }, []);

  // Gestion des cases à cocher
  const handleCheckboxChange = (id) => {
    setSelectedAnnotateurs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Fonction d'affectation
  const handleAffecter = async () => {
    const selectedIds = Object.keys(selectedAnnotateurs).filter((id) => selectedAnnotateurs[id]);

    if (selectedIds.length === 0) {
      alert('Veuillez sélectionner au moins un annotateur.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/utilisateurs/taches/affecter/${datasetId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedIds.map((id) => parseInt(id))),
      });

      if (!response.ok) throw new Error('Erreur lors de l\'affectation');

      setMessage('Tâches affectées avec succès.');
    } catch (error) {
      console.log("id :",datasetId)
      console.error('Erreur :', error);
      setMessage('Erreur lors de l\'affectation.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Affecter des Annotateurs au Dataset #{datasetId}</h2>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Nom de l'Annotateur</th>
            <th>Sélectionner</th>
          </tr>
        </thead>
        <tbody>
          {annotateurs.map((annotateur) => (
            <tr key={annotateur.id}>
              <td>{annotateur.nom}</td>
              <td>
                <input
                  type="checkbox"
                  checked={!!selectedAnnotateurs[annotateur.id]}
                  onChange={() => handleCheckboxChange(annotateur.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleAffecter}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Affecter
      </button>

      {message && (
        <p style={{ marginTop: '20px', color: message.includes('succès') ? 'green' : 'red' }}>{message}</p>
      )}
    </div>
  );
}
