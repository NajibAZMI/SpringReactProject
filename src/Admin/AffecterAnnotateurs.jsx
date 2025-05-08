import React, { useEffect, useState } from 'react';

export default function AffecterAnnotateurs() {
  const [annotateurs, setAnnotateurs] = useState([]);
  const [selectedAnnotateurs, setSelectedAnnotateurs] = useState({});

  // Fonction pour récupérer les annotateurs depuis l'API
  useEffect(() => {
    const fetchAnnotateurs = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/utilisateurs/Annotateurs');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des annotateurs');
        }
        const data = await response.json();
        setAnnotateurs(data);
      } catch (error) {
        console.error('Erreur :', error);
      }
    };

    fetchAnnotateurs();
  }, []);

  // Gérer le changement de sélection des annotateurs
  const handleCheckboxChange = (id) => {
    setSelectedAnnotateurs((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Inverser l'état de la case à cocher
    }));
  };

  return (
    <div>
      <h2>Liste des Annotateurs</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
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

     
    </div>
  );
}
