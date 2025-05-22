import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import UserLayout from "./UserLayout";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    numberTaches: 0,
    tachesComplete: 0,
    tauxCompletion: 0,
    annotationjour:0,
    annotaion7jours: {},
  });
  const [annotationTrend, setAnnotationTrend] = useState([]);

  // Récupération utilisateur
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  // Appel API après chargement de l'utilisateur
  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:8080/api/datasets/User/Statistique/${user.id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur HTTP " + response.status);
        }
        return response.json();
      })
      .then(data => {
        setStats(data);

        const trend = Object.entries(data.annotaion7jours || {}).map(([date, value]) => ({
          date,
          value,
        }));
        setAnnotationTrend(trend);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des statistiques :", error);
      });
  }, [user]);

  const cards = [
    { title: "Tâches", value: stats.numberTaches, change: "+5%", icon: "📁" },
    { title: "Tâches terminées", value: stats.tachesComplete, change: "+2%", icon: "✅" },
    { title: "Annotations aujourd'hui", value: stats.annotationjour, change: "+1%", icon: "🕒" },
    { title: "Taux de complétion", value: `${Math.round(stats.tauxCompletion)}%`, change: "+0.7%", icon: "📈" },
  ];

  return (
    <UserLayout>
      <h3 className="fw-bold text-primary">Tableau de bord</h3>
      <p className="text-muted">Bienvenue ! Voici un aperçu de votre activité récente.</p>

      <div className="row mb-4">
        {cards.map((card, i) => (
          <div key={i} className="col-md-3 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="card-title">{card.icon} {card.title}</h6>
                <h4 className="fw-bold">{card.value}</h4>
                <p className={`text-${card.change.includes("-") ? "danger" : "success"} mb-0`}>
                  {card.change}
                </p>
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
      </div>

      <footer className="text-center text-muted pt-4">
        <hr />
        <small>© 2025 Plateforme d’Annotation. Tous droits réservés. | Conditions | Confidentialité | Contact</small>
      </footer>
    </UserLayout>
  );
}
