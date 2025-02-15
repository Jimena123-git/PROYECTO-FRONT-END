// Registro.jsx
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Registro.css'
import logo from '../../images/logodeGuardianesdelEntorno.png';

function Registro() {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleUsuarioChange = (e) => {
    setUsuario(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleContraseñaChange = (e) => {
    setContraseña(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje(`El usuario fue registrado con exito: ${usuario}`);
  };

  return (
    <div>
      {/* Navbar */}
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
                <Link className="nav-link" to="/">Inicio</Link>
                <Link className="nav-link" to="/areasnaturales">Areas Naturales</Link>
                <Link className="nav-link highlight" to="/registro">Registrase</Link>
                <Link className="nav-link" to="/registro">Iniciar Sesion</Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
      
      {/* Formulario de Registro */}
      <section className="registro-section">
        <div className="container">
    <div className="registro-header">
    <h2 class="tittle">Crear Cuenta</h2>
      <p>Completa tus datos para crear tu cuenta y empezar a disfrutar de nuestros servicios.</p>
    </div>

    <form className="registro-form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="usuario" className="form-label">Usuario:</label>
        <input
          type="text"
          id="usuario"
          className="form-control"
          value={usuario}
          onChange={handleUsuarioChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="contraseña" className="form-label">Contraseña:</label>
        <input
          type="password"
          id="contraseña"
          className="form-control"
          value={contraseña}
          onChange={handleContraseñaChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-crear-cuenta w-100">
         Crear Cuenta
      </button>

    </form>

    {/* Muestra un mensaje de comprobación */}
    {mensaje && <p className="mensaje-exito text-center mt-3">{mensaje}</p>}
  </div>
</section>

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
  );
};
 
export default Registro;



  


