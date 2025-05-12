import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TravaillerTache() {
  const { idTache } = useParams();
  const [flatCouples, setFlatCouples] = useState([]); // couples à plat
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedClass, setSelectedClass] = useState("");
  const [currentClasses, setCurrentClasses] = useState([]);

  useEffect(() => {
    const fetchCouples = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/utilisateurs/Tache/${idTache}`);
        if (!response.ok) throw new Error("Erreur lors du chargement des couples");
        const data = await response.json();

        // Aplatir les couples avec classes
        const allCouples = [];
        data.forEach(group => {
          group.couples.forEach(couple => {
            allCouples.push({
              ...couple,
              classesPossibles: group.classesPossibles
            });
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
  alert("Veuillez sélectionner une classe");
  return;
}


    try {
      const response = await fetch("http://localhost:8080/api/datasets/api/annotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coupleId: couple.id,
          classeChoisie: selectedClass,
          annotateurId: user.id,
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'enregistrement");

      alert("Annotation enregistrée !");
      setSelectedClass(""); // reset après validation
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
      alert("Fin des couples !");
    }
  };
const handlePrecedent = () => {
    const nextIndex = currentIndex - 1;
    if (nextIndex < flatCouples.length) {
      setCurrentIndex(nextIndex);
      setSelectedClass("");
      setCurrentClasses(flatCouples[nextIndex].classesPossibles);
    } else {
      alert("Fin des couples !");
    }
  };
  const couple = flatCouples[currentIndex];

  return (
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
            <button
              onClick={handlePrecedent}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                marginRight: "10px"
              }}
            >Précédent</button>
            <button
              onClick={handleValider}
              disabled={!selectedClass || selectedClass.trim() === ""}
              style={{
                backgroundColor: "#28a745",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                marginRight: "10px",
              }}
            >
              Valider
            </button>

            <button
              onClick={handleSuivant}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Suivant
            </button>
          </div>
        </div>
      ) : (
        <p>Aucun couple disponible.</p>
      )}
    </div>
  );
}
