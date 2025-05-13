import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AffecterAnnotateurs() {
  const { datasetId } = useParams();
  const [annotateurs, setAnnotateurs] = useState([]);
  const [selectedAnnotateurs, setSelectedAnnotateurs] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

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
        setMessage("Impossible de charger les annotateurs.");
      } finally {
        setLoading(false);
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

    setSending(true);
    setMessage('');

    try {
      const response = await fetch(`http://localhost:8080/api/utilisateurs/taches/affecter/${datasetId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedIds.map((id) => parseInt(id))),
      });

      if (!response.ok) throw new Error("Erreur lors de l'affectation");

      setMessage('✅ Tâches affectées avec succès.');
    } catch (error) {
      console.error('Erreur :', error);
      setMessage("❌ Une erreur s'est produite lors de l'affectation.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center text-success mb-4">Affecter des Annotateurs au Dataset #{datasetId}</h2>

      {loading ? (
        <p className="text-center">Chargement des annotateurs...</p>
      ) : (
        <>
          <table className="table table-bordered table-striped">
            <thead className="table-success">
              <tr>
                <th className="text-center">Nom de l'Annotateur</th>
                <th className="text-center">Sélectionner</th>
              </tr>
            </thead>
            <tbody>
              {annotateurs.map((annotateur) => (
                <tr key={annotateur.id}>
                  <td>{annotateur.nom}</td>
                  <td className="text-center">
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

          <div className="text-center">
            <button
              onClick={handleAffecter}
              disabled={sending}
              className={`btn btn-success ${sending ? 'disabled' : ''} mt-3`}
            >
              {sending ? 'Affectation en cours...' : 'Valider'}
            </button>
          </div>

          {message && (
            <p className={`mt-3 text-center ${message.includes('succès') ? 'text-success' : 'text-danger'}`}>
              {message}
            </p>
          )}
        </>
      )}
    </div>
  );
}
