import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function AddUserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    login: "",
    password: "",
    role: "USER_ROLE",
  });
  const generateRandomPassword = (length = 10) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
  };

 useEffect(() => {
  if (isEdit) {
    fetch(`http://locahost:8080/api/utilisateurs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        
        setFormData({
          nom: data.nom,
          prenom: data.prenom,
          login: data.login,
          role: data.role
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Erreur lors du chargement des données");
      });
  } else {
    // Ajout : on génère automatiquement un mot de passe
    setFormData((prev) => ({
      ...prev,
      password: generateRandomPassword(),
    }));
  }
}, [id, isEdit]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEdit
      ? `http://localhost:8080/api/utilisateurs/update/${id}`
      : "http://localhost:8080/api/utilisateurs/addAnnotateur";
    const method = isEdit ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Erreur serveur: ${res.status} - ${errorText}`);
        }
        return res.json();
      })
      .then(() => {
        navigate("/Admin/GestionAnntateurs", {
          state: {
            successMessage: isEdit
              ? "Utilisateur modifié avec succès !"
              : "Utilisateur ajouté avec succès !",
          },
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Erreur : " + err.message);
      });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">
        {isEdit ? "Modifier" : "Ajouter"} un utilisateur
      </h2>
      <form
        onSubmit={handleSubmit}
        className="border p-4 shadow rounded bg-light"
      >
        <div className="mb-3">
          <label className="form-label">Nom :</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Prénom :</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email (login) :</label>
          <input
            type="email"
            name="login"
            value={formData.login}
            onChange={handleChange}
            className="form-control"
            required
            disabled={isEdit}
          />
        </div>

        

        <div className="mb-3">
          <label className="form-label">Rôle :</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="form-select"
          >
            <option value="USER_ROLE">Annotateur</option>
            <option value="ADMIN_ROLE">Admin</option>
          </select>
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            {isEdit ? "Modifier" : "Ajouter"}
          </button>
          <Link to="/Admin/admin-dashboard" className="btn btn-secondary">
            Retour
          </Link>
        </div>
      </form>
    </div>
  );
}
