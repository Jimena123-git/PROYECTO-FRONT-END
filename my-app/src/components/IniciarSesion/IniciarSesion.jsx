import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./IniciarSesion.css";
import logo from "../../images/logodeGuardianesdelEntorno.png";

function IniciarSesion() {
  const [usuario, setUsuario] = useState(""); // Estado para el usuario
  const [contrasenia, setContrasenia] = useState(""); // Estado para la contraseña

  // Manejo de cambios en los inputs
  const CambioValorUsuario = (evento) => {
    setUsuario(evento.target.value);
  };

  const CambioValorContrasenia = (evento) => {
    setContrasenia(evento.target.value);
  };
  
  const handleSubmit = (evento) => {
    evento.preventDefault();
  };

  return (
    <div>
      <header className="header">
        <nav className="navbar navbar-expand-lg">
          <div className="container-lg">
            <div className="dropdown">
              <button
                className="btn btn-link dropdown-toggle p-0"
                type="button"
                id="logoDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  className="Logo"
                  id="logo"
                  src={logo}
                  alt="Logo de Guardianes del Entorno"
                  style={{ width: "50px", height: "50px" }} // Ajusta el tamaño según necesites
                />
              </button>
              <ul className="dropdown-menu" aria-labelledby="logoDropdown">
                <li><Link className="dropdown-item" to="/">Inicio</Link></li>
                <li><Link className="dropdown-item" to="/areasnaturales">Áreas Naturales</Link></li>
                <li><Link className="dropdown-item" to="/cargadedatos">Carga de Datos</Link></li>
                <li><Link className="dropdown-item" to="/registro">Registrarse</Link></li>
                <li><Link className="dropdown-item" to="/iniciarsesion">Iniciar Sesión</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      
      {/* Formulario de Inicio de Sesion */}
      <section className="registro-section">
        <div className="container">
    <div className="registro-header">
    <h2 class="tittle">Iniciar Sesión</h2>
    </div>

    <form className="registro-form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="usuario" className="form-label">Usuario:</label>
        <input
          type="text"
          id="usuario"
          className="form-control"
          value={usuario}
          onChange={CambioValorUsuario}
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="contraseña" className="form-label">Contraseña:</label>
        <input
          type="password"
          id="contraseña"
          className="form-control"
          value={contrasenia}
          onChange={CambioValorContrasenia}
          required
        />
      </div>

      <button type="submit" className="btn btn-crear-cuenta w-100">
        Iniciar Sesion
      </button>
    </form>
    
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

export default IniciarSesion;
