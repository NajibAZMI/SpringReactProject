import React, { useState } from 'react';
import { Link } from 'react-router-dom';
export default function AddDatasetForm() {
  const [datasetData, setDatasetData] = useState({
    nomDataset: '',
    descriptionDataset: '',
    classesPossible: '',
    file: null,
  });

  // Fonction pour gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setDatasetData({
        ...datasetData,
        [name]: files[0], // Prendre le premier fichier
      });
    } else {
      setDatasetData({
        ...datasetData,
        [name]: value,
      });
    }
  };

  // Fonction pour envoyer le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Créer un FormData pour envoyer le fichier
    const formData = new FormData();
    formData.append('nomDataset', datasetData.nomDataset);
    formData.append('descriptionDataset', datasetData.descriptionDataset);
    formData.append('classesPossible', datasetData.classesPossible);
    formData.append('file', datasetData.file);

    try {
      const response = await fetch('http://localhost:8080/api/datasets', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert('Dataset et Classes Possibles ajoutés avec succès');
      } else {
        throw new Error('Erreur lors fff de l\'ajout du Dataset');
      }
    } catch (error) {
      console.error(error);
      alert('Erreur lors de l\'ajout du Dataset');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px auto', maxWidth: '600px' }}>
      <h2>Ajouter un Dataset</h2>

      <div>
        <label>Nom du Dataset :</label><br />
        <input
          type="text"
          name="nomDataset"
          value={datasetData.nomDataset}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Description du Dataset (optionnel) :</label><br />
        <textarea
          name="descriptionDataset"
          value={datasetData.descriptionDataset}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Liste des classes possibles (séparées par ";") :</label><br />
        <input
          type="text"
          name="classesPossible"
          value={datasetData.classesPossible}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Fichier contenant le dataset :</label><br />
        <input
          type="file"
          name="file"
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" style={{ marginTop: '10px' }}>
        Ajouter
      </button>
      <Link to="/Admin/admin-dashboard">
        <button style={{ marginTop: "10px" }}>Retour à l'accueil admin</button>
      </Link>
    </form>
  );
}
