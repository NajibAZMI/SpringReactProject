import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from "./AdminLayout";

export default function AffecterAnnotateurs() {
  const { datasetId } = useParams();
  const [annotateurs, setAnnotateurs] = useState([]);
  const [selectedAnnotateurs, setSelectedAnnotateurs] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchAnnotateurs = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/utilisateurs/Annotateurs');
        if (!response.ok) throw new Error('Erreur lors du chargement des annotateurs');
        const data = await response.json();
        setAnnotateurs(data);
      } catch (error) {
        console.error('Erreur :', error);
        setMessage(" Impossible de charger les annotateurs.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnotateurs();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedAnnotateurs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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

      setMessage(' Tâches affectées avec succès.');
    } catch (error) {
      console.error('Erreur :', error);
      setMessage(" Une erreur s'est produite lors de l'affectation.");
    } finally {
      setSending(false);
    }
  };

  return (
    <AdminLayout>
      <div className="container my-5">
        <h2 className="text-center text-primary mb-4">
          📌 Affectation d'Annotateurs au Dataset 
        </h2>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
            <p className="mt-2">Chargement des annotateurs...</p>
          </div>
        ) : (
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <strong>Liste des Annotateurs</strong>
            </div>
            <div className="card-body">
              {annotateurs.length === 0 ? (
                <div className="alert alert-warning text-center">
                  Aucun annotateur disponible.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle">
                    <thead className="table-success">
                      <tr>
                        <th>Nom de l'Annotateur</th>
                        <th className="text-center">Sélectionner</th>
                      </tr>
                    </thead>
                    <tbody>
                      {annotateurs.map((annotateur) => (
                        <tr key={annotateur.id}>
                          <td>{annotateur.nom} {annotateur.prenom}</td>
                          <td className="text-center">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={!!selectedAnnotateurs[annotateur.id]}
                              onChange={() => handleCheckboxChange(annotateur.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="text-center">
                <button
                  onClick={handleAffecter}
                  disabled={sending}
                  className={`btn btn-success mt-3 px-4 ${sending ? 'disabled' : ''}`}
                >
                  {sending ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Affectation en cours...
                    </>
                  ) : (
                    <>
                       Valider
                    </>
                  )}
                </button>
              </div>

              {message && (
                <div className={`alert mt-4 text-center ${message.includes('succès') ? 'alert-success' : 'alert-danger'}`}>
                  {message}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
