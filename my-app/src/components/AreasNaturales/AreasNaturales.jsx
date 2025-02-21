import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logodeGuardianesdelEntorno.png';
import './AreasNaturales.css';

const AreasNaturales = ({id}) => {
  const [areas, setAreas] = useState([]);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/list?userId=123&page=1&pageSize=10&id=${id}`, {
          headers: {
            "ngrok-skip-browser-warning": "true" 
          }
        });
        
        const data = await response.json(); // Esa línea de código transforma la respuesta de la API en un formato json que JavaScript puede usar fácilmente.
        console.log("Datos recibidos de la API:", data); 
        setAreas(data.items); // Aquí accedemos a la propiedad 'items' que contiene los datos de las áreas
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // aca se detiene la carga si hay errores
      } finally {
        setLoading(false);
      }
    };

    fetchAreas(); // La función fetchAreas hace una solicitud a la API para obtener los datos de las áreas naturales y luego los maneja o muestra en el componente.

  }, [id]); // El [] en el useEffect asegura que el código dentro del efecto solo se ejecute una vez, cuando el componente se monta.

  if (loading) {
    return <p>Cargando áreas naturales...</p>;
  }

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
                <li><Link className="dropdown-item" to="/cargadedatos">Carga de Datos</Link></li>
                <li><Link className="dropdown-item" to="/registro">Registrarse</Link></li>
                <li><Link className="dropdown-item" to="/iniciarsesion">Iniciar Sesión</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <h1 className="titulo-principal">Visualización de areas naturales</h1>
      
      <div className="container">
        <div className="row justify-content-center">
          {areas.map((area) => (
            <div key={area.id} className="col-md-6 mb-4">
              <div className="card" style={{ width: "100%" }}>
                {area.imageUrl && (
                  <img
                  src={area.imageUrl}
                  
                  className="card-img-top"
                  alt={area.name}
                  style={{ height: "200px", objectFit: "cover" }}
                  />
                  
          )}
          <div className="card-body">
            <h5 className="card-title">{area.name}</h5>
            <p className="card-text">{area.description}</p>
            <p><strong>Ubicación:</strong> {area.location}</p>
            <p><strong>Tipo de área:</strong> {area.areaType}</p>
            <p><strong>Región: </strong> {area.region}</p>
            <p><strong>Estado de conservación:</strong> {area.conservationStatus}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


   




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

export default AreasNaturales;
