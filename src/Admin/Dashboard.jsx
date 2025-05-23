import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import AdminLayout from "./AdminLayout";
import Data from "../Images/Data.png";
import calendar from "../Images/calendar.png";
import completion from "../Images/completion.png";
import users from "../Images/users.png";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    numberDataset: 0,
    activeAnnotateur: 0,
    annotationParJour: 0,
    tauxCompletion: 0,
  });
  const [annotationTrend, setAnnotationTrend] = useState([]);
  const [topAnnotators, setTopAnnotators] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetch("http://localhost:8080/api/datasets/Admin/Statistique")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur HTTP " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setStats(data);

        const trend = Object.entries(data.annotaionParJour || {}).map(
          ([date, value]) => ({
            date,
            value,
          })
        );
        setAnnotationTrend(trend);

        const top = (data.avancementParAnnotateur || [])
          .map((a) => ({
            name: a.nom,
            percent: Math.round(a.pourcentage),
          }))
          .sort((a, b) => b.percent - a.percent); // Tri décroissant

        setTopAnnotators(top);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des statistiques :",
          error
        );
      });
  }, []);

  const cards = [
    {
      title: "Jeux de données",
      value: stats.numberDataset,
      change: "+58.3%",
      icon: Data,
    },
    {
      title: "Annotateurs actifs",
      value: stats.activeAnnotateur,
      change: "+43",
      icon: users,
    },
    {
      title: "Annotations aujourd'hui",
      value: stats.annotationParJour,
      change: "-20.0%",
      icon: calendar,
    },
    {
      title: "Taux de complétion",
      value: `${Math.round(stats.tauxCompletion)}%`,
      change: "+0.7%",
      icon: completion,
    },
  ];

  return (
    <AdminLayout>
      <h3 className="fw-bold text-primary"> Tableau de bord</h3>
      <p className="text-muted">
        Bienvenue ! Voici un aperçu de l'activité sur votre plateforme.
      </p>

      <div className="row mb-4">
        {cards.map((card, i) => (
          <div key={i} className="col-md-3 mb-3">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title">{card.title}</h6>
                  <h4 className="fw-bold">{card.value}</h4>
                  <p
                    className={`text-${
                      card.change.includes("-") ? "danger" : "success"
                    } mb-0`}
                  >
                    {card.change}
                  </p>
                </div>
                <img
                  src={card.icon}
                  alt="icon"
                  style={{ width: "40px", height: "40px" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card shadow-sm mb-3 p-3">
            <h6>Tendance des annotations (7 derniers jours)</h6>

            <LineChart width={600} height={250} data={annotationTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#00bfff" />
            </LineChart>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm mb-3 p-3">
            <h6>Meilleurs annotateurs</h6>
            {topAnnotators.map((a, i) => (
              <div key={i} className="mb-2">
                <small>
                  {i + 1}. {a.name}
                </small>
                <div className="progress">
                  <div
                    className="progress-bar bg-info"
                    role="progressbar"
                    style={{ width: `${a.percent}%` }}
                  >
                    {a.percent}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="text-center text-muted pt-4">
        <hr />
        <small>
          © 2025 Plateforme d’Annotation. Tous droits réservés. | Conditions |
          Confidentialité | Contact
        </small>
      </footer>
    </AdminLayout>
  );
}
