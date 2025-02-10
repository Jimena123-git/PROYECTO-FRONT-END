import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logodeGuardianesdelEntorno.png';
import './AreasNaturales.css';

const AreasNaturales = () => {
    return (
          <div>
            <header className="header">
              <nav className="navbar navbar-expand-lg">
                <div className="container-lg">
                 <img
                    className="Logo"
                    id="logo"
                    src={logo}   
                    alt="Logo de Guardianes del Entorno"
                    aria-label="Logo de Guardianes del Entorno"
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
                      <Link className="nav-link" to="/">PAGINA PRINCIPAL</Link>
                      <Link className="nav-link" to="/registro">REGISTRO</Link>
                      <Link className="nav-link highlight" to="/areasnaturales">AREAS NATURALES</Link>
                    </div>
                  </div>
                </div>
              </nav>
            </header>
            
            {/*Footer*/}
            <footer>
              <div class="footer-container">
                <div class="footer-content">
                <p>&copy; 2025 Guardianes del Entorno. Todos los derechos reservados.</p>
                <div class="footer-links">
                  <p>ABOUT US</p>
                  <p>DELIVERY INFORMATION</p>
                  <p>PRIVACITY POLICY</p>
                  <p>TERMS & CONDITIONS</p>
                </div>
                <div className="redes-icons">
                <a>
                <i className="fab fa-facebook"></i>
                </a>
                <a >
                <i className="fab fa-twitter"></i>
                </a>
                <a >
                <i className="fab fa-instagram"></i>
                </a>
                </div>
                </div>
              </div>
            </footer>

            </div>
            )
}

export default AreasNaturales;