import React from 'react'
import { Link } from 'react-router-dom'
export default function PageNotFound() {
  return (
                    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-center">
                    <h1 className="display-1 fw-bold text-danger">404</h1>
                    <p className="fs-3">
                      <span className="text-danger">Oops!</span> Page non trouvée.
                    </p>
                    <p className="text-muted">Désolé, la page que vous recherchez n'existe pas.</p>
                    <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
                  </div>
  )
}

