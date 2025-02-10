import React from 'react';
import { Link } from 'react-router-dom';
import './PaginaPrincipal.css';

const PaginaPrincipal = () => {
    return (
      <div>
        <header className="header">
          <nav className="navbar navbar-expand-lg">
            <div className="container-lg">
              <img
                className="Logo"
                id="logo"
                src="/images/alcomix logo letra en negro png.webp"
                alt="Logo de Alcomix"
                aria-label="Logo de Alcomix"
              />
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <Link className="nav-link highlight" to="/">PAGINA PRINCIPAL</Link>
                  <Link className="nav-link" to="/registro">REGISTRO</Link>
                </div>
              </div>
            </div>
          </nav>
        </header>
        
        <h1 className="titulo-principal">Guardianes del entorno</h1>
      </div>
    );
  };
export default PaginaPrincipal;
