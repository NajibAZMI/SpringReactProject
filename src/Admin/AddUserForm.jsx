import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function AddUserForm() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    login: "",
    password: "",
    role: "USER_ROLE",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/utilisateurs/addAnnotateur", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Erreur serveur: ${res.status} - ${errorText}`);
        }
        return res.json();
      })
      .then((data) => {
        alert("Utilisateur ajouté avec succès !");
        setFormData({
          nom: "",
          prenom: "",
          login: "",
          password: "",
          role: "USER_ROLE",
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Erreur : " + err.message);
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ margin: "20px auto", maxWidth: "400px" }}
      >
        <h2>Ajouter un utilisateur</h2>

        <div>
          <label>Nom :</label>
          <br />
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Prénom :</label>
          <br />
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email (login) :</label>
          <br />
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Mot de passe :</label>
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Rôle :</label>
          <br />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="USER_ROLE">Annotateur</option>
            <option value="ADMIN_ROLE">Admin</option>
          </select>
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Ajouter
        </button>
      </form>
      <Link to="/Admin/admin-dashboard">
        <button style={{ marginTop: "10px" }}>Retour à l'accueil admin</button>
      </Link>
    </>
  );
}
