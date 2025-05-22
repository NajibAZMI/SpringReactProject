import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from "./AdminLayout";

export default function DatasetDetail() {
  const { id } = useParams();
  const [dataset, setDataset] = useState(null);
  const [annotateurs, setAnnotateurs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [couplesPerPage] = useState(10);

  useEffect(() => {
    const fetchDataset = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/datasets/${id}`);
        if (!response.ok) throw new Error('Erreur lors du chargement du dataset');
        const data = await response.json();
        setDataset(data);
      } catch (error) {
        console.error('Erreur dataset :', error);
      }
    };

    const fetchAnnotateurs = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/datasets/${id}/annotateurs`);
        if (!response.ok) throw new Error('Erreur lors du chargement des annotateurs');
        const data = await response.json();
        setAnnotateurs(data);
      } catch (error) {
        console.error('Erreur annotateurs :', error);
      }
    };

    fetchDataset();
    fetchAnnotateurs();
  }, [id]);

  const indexOfLastCouple = currentPage * couplesPerPage;
  const indexOfFirstCouple = indexOfLastCouple - couplesPerPage;
  const currentCouples = dataset?.coupleTextList.slice(indexOfFirstCouple, indexOfLastCouple);
  const totalCouples = dataset?.coupleTextList.length || 0;
  const totalPages = Math.ceil(totalCouples / couplesPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (!dataset) return <div className="container py-5"><div className="alert alert-warning">Dataset non trouvé.</div></div>;

  return (
    <AdminLayout>
      <div className="container py-5">
        <h2 className="mb-4">🗂️ Détails du Dataset</h2>

        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <p><span className="fw-bold">Nom :</span> {dataset.nomDataset}</p>
            <p><span className="fw-bold">Description :</span> {dataset.descriptionDataset}</p>
            <p><span className="fw-bold">Avancement :</span> 0%</p>
            <p><span className="fw-bold">Classes :</span> {dataset.classesPossibles.map(c => c.textclass).join(", ")}</p>
          </div>
        </div>

        <h4 className="mb-3">👥 Annotateurs associés</h4>
        {annotateurs.length > 0 ? (
          <div className="table-responsive mb-4">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {annotateurs.map((a) => (
                  <tr key={a.id}>
                    <td>{a.nom} {a.prenom}</td>
                    <td>{a.login}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="alert alert-info">Aucun annotateur assigné à ce dataset.</div>
        )}

        <h4 className="mb-3">📝 Couples de textes</h4>
        {currentCouples && currentCouples.length > 0 ? (
          <div className="table-responsive mb-4">
            <table className="table table-bordered table-striped">
              <thead className="table-light">
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
          </div>
        ) : (
          <div className="alert alert-info">Aucun couple de textes trouvé pour ce dataset.</div>
        )}

        <div className="d-flex justify-content-between align-items-center my-4">
          <button
            className="btn btn-outline-primary"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ◀ Précédent
          </button>
          <span className="text-muted">Page {currentPage} sur {totalPages}</span>
          <button
            className="btn btn-outline-primary"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Suivant ▶
          </button>
        </div>

        <Link to="/Admin/DataSetList">
          <button className="btn btn-success mt-3">⬅ Retour à la liste</button>
        </Link>
      </div>
    </AdminLayout>
  );
}
