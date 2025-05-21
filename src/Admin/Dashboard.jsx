// src/pages/AdminDashboard.jsx
import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import AdminLayout from "./AdminLayout";

export default function AdminDashboard() {
  const data = [
    { date: "2025-05-12", value: 0 },
    { date: "2025-05-13", value: 0 },
    { date: "2025-05-14", value: 25 },
    { date: "2025-05-15", value: 18 },
    { date: "2025-05-16", value: 12 },
    { date: "2025-05-17", value: 13 },
    { date: "2025-05-18", value: 11 },
  ];

  const topAnnotators = [
    { name: "amineo amineo", percent: 57 },
    { name: "Test Annot", percent: 0 },
    { name: "Test Annot", percent: 0 },
    { name: "Test Annot", percent: 0 },
  ];

  const cards = [
    { title: "Total Datasets", value: 19, change: "+58.3%", icon: "📁" },
    { title: "Active Annotators", value: 52, change: "+43", icon: "👥" },
    { title: "Annotations Today", value: 8, change: "-20.0%", icon: "✅" },
    { title: "Completion Rate", value: "8%", change: "+0.7%", icon: "📈" },
  ];

  return (
    <AdminLayout>
      <h3 className="fw-bold text-primary">Dashboard Overview</h3>
      <p className="text-muted">Welcome back! Here's what's happening with your platform.</p>

      <div className="row mb-4">
        {cards.map((card, i) => (
          <div key={i} className="col-md-3 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="card-title">{card.title}</h6>
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
            <h6>Annotation Trend (Last 7 Days)</h6>
            <LineChart width={600} height={250} data={data}>
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
            <h6>Top Annotators</h6>
            {topAnnotators.map((a, i) => (
              <div key={i} className="mb-2">
                <small>{i + 1}. {a.name}</small>
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
        <small>© 2025 Annotation Platform. All rights reserved. | Terms | Privacy | Contact</small>
      </footer>
    </AdminLayout>
  );
}
