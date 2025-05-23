import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserLayout from "./UserLayout";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TravaillerTache() {
  const { idTache } = useParams();
  const [flatCouples, setFlatCouples] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedClass, setSelectedClass] = useState("");
  const [currentClasses, setCurrentClasses] = useState([]);
  const [showFinishedModal, setShowFinishedModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false); // 🔸 nouvelle modale
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCouples = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/utilisateurs/Tache/${idTache}`);
        if (!response.ok) throw new Error("Erreur lors du chargement des couples");
        const data = await response.json();

        const allCouples = [];
        data.forEach(group => {
          group.couples.forEach(couple => {
            allCouples.push({ ...couple, classesPossibles: group.classesPossibles });
          });
        });

        setFlatCouples(allCouples);
        if (allCouples.length > 0) {
          setCurrentClasses(allCouples[0].classesPossibles);
        }
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchCouples();
  }, [idTache]);

  const handleValider = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) {
      alert("Utilisateur non connecté");
      return;
    }

    const couple = flatCouples[currentIndex];
    if (!selectedClass || selectedClass.trim() === "") {
      setShowAlertModal(true); // 🔸 afficher modale alerte
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/datasets/annote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coupleId: couple.id,
          classeChoisie: selectedClass,
          annotateurId: user.id,
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'enregistrement");

      setSelectedClass("");
      handleSuivant();
    } catch (error) {
      console.error(error);
      alert("Échec de l'annotation");
    }
  };

  const handleSuivant = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < flatCouples.length) {
      setCurrentIndex(nextIndex);
      setSelectedClass("");
      setCurrentClasses(flatCouples[nextIndex].classesPossibles);
    } else {
      setShowFinishedModal(true);
    }
  };

  const handlePrecedent = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
      setSelectedClass("");
      setCurrentClasses(flatCouples[prevIndex].classesPossibles);
    } else {
      alert("Début atteint !");
    }
  };

  const couple = flatCouples[currentIndex];

  return (
    <UserLayout>
      <div style={{ padding: "20px" }}>
        <h2>Travail sur la tâche : {idTache}</h2>

        {couple ? (
          <div
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "20px",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <h4>Couple ID : {couple.id}</h4>
            <p><strong>Texte 1:</strong> {couple.text1}</p>
            <p><strong>Texte 2:</strong> {couple.text2}</p>

            <div style={{ marginTop: "15px" }}>
              {currentClasses.map((classe, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedClass(classe)}
                  style={{
                    marginRight: "10px",
                    backgroundColor: selectedClass === classe ? "#007BFF" : "#eee",
                    color: selectedClass === classe ? "#fff" : "#000",
                    padding: "10px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {classe}
                </button>
              ))}
            </div>

            <div style={{ marginTop: "20px" }}>
              <button onClick={handlePrecedent} className="btn btn-primary me-2">
                Précédent
              </button>
              <button onClick={handleValider} className="btn btn-success me-2">
                Valider
              </button>
              <button onClick={handleSuivant} className="btn btn-primary">
                Suivant
              </button>
            </div>
          </div>
        ) : (
          <p>Aucun couple disponible.</p>
        )}

        {/* 🔸 Modale Alerte : classe non sélectionnée */}
        {showAlertModal && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            tabIndex="-1"
            aria-modal="true"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-warning">
                  <h5 className="modal-title">Attention</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAlertModal(false)}
                    aria-label="Fermer"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Veuillez sélectionner une classe avant de valider.</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowAlertModal(false)}
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 🔸 Modale Fin de tâche */}
        {showFinishedModal && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            tabIndex="-1"
            aria-modal="true"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Annotation terminée</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowFinishedModal(false)}
                    aria-label="Fermer"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Félicitations, vous avez terminé toutes les annotations pour cette tâche !</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setShowFinishedModal(false);
                      const user = JSON.parse(localStorage.getItem("user"));
                      navigate(`/User/TachesList/${user.id}`);
                    }}
                  >
                    Retour à la liste des tâches
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
}
