import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function DatasetDetail() {
  const { id } = useParams();
  const [dataset, setDataset] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [couplesPerPage] = useState(100); // Nombre de couples par page

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

  // Calculer les couples à afficher pour la page actuelle
  const indexOfLastCouple = currentPage * couplesPerPage;
  const indexOfFirstCouple = indexOfLastCouple - couplesPerPage;
  const currentCouples = dataset?.coupleTextList.slice(indexOfFirstCouple, indexOfLastCouple);

  // Calculer le nombre total de pages
  const totalCouples = dataset?.coupleTextList.length || 0;
  const totalPages = Math.ceil(totalCouples / couplesPerPage);

  // Fonction pour changer de page
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (!dataset) return <p>Dataset non trouvé.</p>;

  return (
    <div className="container py-5">
      <h2>Détails du Dataset</h2>
      <div className="mb-4">
        <p><strong>Nom :</strong> {dataset.nomDataset}</p>
        <p><strong>Description :</strong> {dataset.descriptionDataset}</p>
        <p><strong>Avancement :</strong> 0%</p>
        <p><strong>Classes :</strong> {dataset.classesPossibles.map(c => c.textclass).join(", ")}</p>
      </div>

      <h3>Couples de textes</h3>
      {currentCouples && currentCouples.length > 0 ? (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Texte 1</th>
              <th>Texte 2</th>
            </tr>
          </thead>
          <tbody>
            {currentCouples.map((couple) => (
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

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center my-3">
        <button
          className="btn btn-secondary"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <span>
          Page {currentPage} sur {totalPages}
        </span>
        <button
          className="btn btn-secondary"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>

      <Link to="/Admin/DataSetList">
        <button className="btn btn-primary mt-3">Retour à la liste</button>
      </Link>
    </div>
  );
}
