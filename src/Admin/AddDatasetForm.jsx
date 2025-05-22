import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
export default function AddDatasetForm() {
  const [formData, setFormData] = useState({
    nomDataset: "",
    descriptionDataset: "",
    classes: "",
    file: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("nomDataset", formData.nomDataset);
    formPayload.append("descriptionDataset", formData.descriptionDataset);
    formPayload.append("classesPossible", formData.classes);
    formPayload.append("file", formData.file);

    try {
      const res = await fetch("http://localhost:8080/api/datasets", {
        method: "POST",
        body: formPayload,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Erreur lors de l'envoi");
      }

      
      navigate("/Admin/DataSetList", { state: { successMessage: "✅ Dataset ajouté avec succès !" } });

    } catch (err) {
      console.error(err);
      alert("Erreur : " + err.message);
    }
  };

  return (
    <AdminLayout>
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h3 className="mb-4 text-center">Ajouter un nouveau Dataset</h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Nom du Dataset</label>
            <input
              type="text"
              name="nomDataset"
              className="form-control"
              value={formData.nomDataset}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="descriptionDataset"
              className="form-control"
              rows="3"
              value={formData.descriptionDataset}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Classes possibles (séparées par <code>;</code>)
            </label>
            <input
              type="text"
              name="classes"
              className="form-control"
              value={formData.classes}
              onChange={handleChange}
              placeholder="ex: chat;chien;oiseau"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Fichier CSV</label>
            <input
              type="file"
              name="file"
              accept=".csv"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">
              Créer
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/Admin/admin-dashboard")}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
    </AdminLayout>
  );
}
