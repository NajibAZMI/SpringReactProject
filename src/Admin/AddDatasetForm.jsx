import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function AddUserForm() {
  const { id } = useParams(); // Récupère l'ID s'il existe
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(!!id);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    login: "",
    password: "",
    role: "USER_ROLE",
  });


  useEffect(() => {
    if (isEdit) {
      fetch(`http://localhost:8080/api/utilisateurs/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            nom: data.nom,
            prenom: data.prenom,
            login: data.login,
            password: "",
            role: data.role,
          });
        })
        .catch((err) => {
          console.error(err);
          alert("Erreur lors du chargement des données");
        });
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
      .then(() => {
        alert(isEdit ? "Utilisateur modifié avec succès !" : "Utilisateur ajouté avec succès !");
        navigate("/Admin/gestion-annotateurs");
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
        <h2>{isEdit ? "Modifier" : "Ajouter"} un utilisateur</h2>

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
            disabled={isEdit}
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
            placeholder={isEdit ? "(Laisser vide pour ne pas changer)" : ""}
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
          {isEdit ? "Modifier" : "Ajouter"}
        </button>
      </form>

      <Link to="/Admin/admin-dashboard">
        <button style={{ marginTop: "10px" }}>Retour à l'accueil admin</button>
      </Link>
    </>
  );
}
