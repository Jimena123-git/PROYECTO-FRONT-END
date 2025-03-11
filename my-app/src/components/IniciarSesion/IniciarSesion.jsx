import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // useNavigate para redirigir después del login
import "./IniciarSesion.css";
import logo from "../../images/logodeGuardianesdelEntorno.png";

function IniciarSesion() {
  const [usuario, setUsuario] = useState(""); 
  const [contrasenia, setContrasenia] = useState(""); 
  const [error, setError] = useState(""); 
  const [message, setMessage] = useState("");
  const navigate = useNavigate();  // Redirigir después del login

  // Manejo de cambios en los inputs
  const CambioValorUsuario = (evento) => {
    setUsuario(evento.target.value);
  };

  const CambioValorContrasenia = (evento) => {
    setContrasenia(evento.target.value);
  };

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    
    if (!usuario || !contrasenia) {
      setError("Por favor, complete todos los campos.");
      return;
    }
    
    setError("");
    setMessage("");

    try {
      console.log("Enviando solicitud a la API...");
      
      const response = await fetch("https://mammal-excited-tarpon.ngrok-free.app/api/user/login?secret=TallerReact2025!", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: usuario, password: contrasenia }),
      });

      console.log("Respuesta de la API recibida", response);

      if (response.status === 403) {
        setError("Acceso denegado: Código secreto incorrecto");
        return;
      }
      if (response.status === 500) {
        setError("Error interno del servidor");
        return;
      }

      const data = await response.json();
      console.log("Datos de la API:", data); 

      if (data.isValid && data.user) {
        setMessage("¡Inicio de sesión exitoso!");
        localStorage.setItem("user", JSON.stringify(data.user)); // Guarda el usuario en localStorage.
        navigate("/registro"); 
      } else {
        setError("Datos incorrectos");
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
      setError("Error al conectar con el servidor");
    }
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
                  style={{ width: "50px", height: "50px" }} 
                />
              </button>
              <ul className="dropdown-menu" aria-labelledby="logoDropdown">
                <li><Link className="dropdown-item" to="/">Inicio</Link></li>
                <li><Link className="dropdown-item" to="/areasnaturales">Áreas Naturales</Link></li>
                <li><Link className="dropdown-item" to="/especiesavistadas">Especies Avistadas</Link></li>
                <li><Link className="dropdown-item" to="/actividadesconservacion">Actividades Conservación</Link></li>
                <li><Link className="dropdown-item" to="/registro">Registrarse</Link></li>
                <li><Link className="dropdown-item" to="/iniciarsesion">Iniciar Sesion</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Formulario de Inicio de Sesion */}
      <section className="registro-section">
        <div className="container">
          <div className="registro-header">
            <h2 className="tittle">Iniciar Sesión</h2>
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

            {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar errores */}
            {message && <div className="alert alert-success">{message}</div>} {/* Mostrar mensaje de éxito */}

            <button type="submit" className="btn btn-crear-cuenta w-100">
              Iniciar Sesion
            </button>
          </form>
        </div>
      </section>

      {/*Footer*/}
      <footer>
        <div className="footer-container">
          <div className="footer-content">
            <p>&copy; 2025 Guardianes del Entorno. Todos los derechos reservados.</p>
            <div className="footer-links">
              <p>ABOUT US</p>
              <p>DELIVERY INFORMATION</p>
              <p>PRIVACITY POLICY</p>
              <p>TERMS & CONDITIONS</p>
            </div>
            <div className="redes-icons">
              <a>
                <i className="fab fa-facebook"></i>
              </a>
              <a>
                <i className="fab fa-twitter"></i>
              </a>
              <a>
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
