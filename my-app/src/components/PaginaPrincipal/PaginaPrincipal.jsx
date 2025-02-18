import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PaginaPrincipal.css';
import logo from '../../images/logodeGuardianesdelEntorno.png';

const PaginaPrincipal = () => {
 
    
  
  return (
    <div>
      <header className="header">
        <nav className="navbar navbar-expand-lg">
          <div className="container-lg">
            <img className="Logo" id="logo" src={logo} alt="Logo de Guardianes del Entorno" />
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
                <Link className="nav-link highlight" to="/">Inicio</Link>
                <Link className="nav-link" to="/areasnaturales">Áreas Naturales</Link>
                <Link className="nav-link" to="/cargadedatos">Carga de Datos</Link>
                <Link className="nav-link" to="/registro">Registrarse</Link>
                <Link className="nav-link" to="/iniciarsesion">Iniciar Sesión</Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <h1 className="titulo-principal">Guardianes del entorno</h1>

      

      

      {/* Footer */}
      <footer>
        <div className="footer-container">
          <div className="footer-content">
            <p>&copy; 2025 Guardianes del Entorno. Todos los derechos reservados.</p>
            <div className="footer-links">
              <p>ABOUT US</p>
              <p>DELIVERY INFORMATION</p>
              <p>PRIVACY POLICY</p>
              <p>TERMS & CONDITIONS</p>
            </div>
            <div className="redes-icons">
              <a><i className="fab fa-facebook"></i></a>
              <a><i className="fab fa-twitter"></i></a>
              <a><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PaginaPrincipal;

