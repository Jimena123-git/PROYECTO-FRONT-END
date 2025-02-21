import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PaginaPrincipal.css';
import logo from '../../images/logodeGuardianesdelEntorno.png';

const PaginaPrincipal = () => {
  // Estados para las areas naturales
  const [areas, setAreas] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // aca inicializa la variable page en 1
  const areaPageSize = 10;

  // Estados para las especies avistadas
  const [species, setSpecies] = useState([]);
  const [speciesPage, setSpeciesPage] = useState(1);
  const [speciesTotalPages, setSpeciesTotalPages] = useState(1);
  const speciesPageSize = 10;
  
  const fetchAreas = async () => {
    try {
      const apiUrl = `https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/list?secret=TallerReact2025!&page=${page}&pageSize=${areaPageSize}`;
      const response = await fetch(apiUrl, {
        headers: {
          'ngrok-skip-browser-warning': 'true', 
        }
      });
      
      if (!response.ok) throw new Error("Error al obtener los datos");

      const data = await response.json();
      setAreas(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error al obtener áreas naturales:", error);
    }
  };

  useEffect(() => {
    fetchAreas()
  }, [page]);

  const fetchEspecies = async () => {
  try {
    const apiUrl = `https://mammal-excited-tarpon.ngrok-free.app/api/species/list?secret=TallerReact2025!&page=${speciesPage}&pageSize=${speciesPageSize}`;
    const response = await fetch(apiUrl, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      }
    });

    if (!response.ok) throw new Error("Error al obtener las especies");

    const data = await response.json();
    setSpecies(data.items);
    setSpeciesTotalPages(data.totalPages);
  } catch (error) {
    console.error("Error al obtener especies:", error);
  }
};

useEffect(() => { // funcion para obtener las especies
  fetchEspecies()
}, [speciesPage]);

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

  
      

      <h1 className="titulo-principal">Guardianes del entorno</h1>
      <div className="container mt-4">
      {/* Listado de las areas naturales */}
      <h2 className="subtitulo">Listado de Areas Naturales</h2>
      
    

      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-container">
    <div className="carousel-indicators">
      {areas.map((_, index) => (
        <button
          key={index}
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to={index}
          className={index === 0 ? "active" : ""}
          aria-current={index === 0 ? "true" : "false"}
          aria-label={`Slide ${index + 1}`}
        ></button>
      ))}
    </div>

    <div className="carousel-inner">
      {areas.map((area, index) => (
        <div
          key={area.id}
          className={`carousel-item ${index === 0 ? "active" : ""}`}
        >
          <div className="text-center">
            <img
              src={area.imageUrl}
              className="d-block mx-auto"
              alt={area.name}
              style={{ height: "300px", width: "auto", objectFit: "cover" }}
            />
          </div>
          <div className="p-3 text-center">
            <h5><strong>{area.name}</strong></h5>
            <p><strong>Ubicación:</strong> {area.location}</p>
            <p><strong>Tipo de área:</strong> {area.areaType}</p>
            <p><strong>Región:</strong> {area.region}</p>
            <p><strong>Estado de conservación:</strong> {area.conservationStatus}</p>
            <p>{area.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>

  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>



    
      

    {/* Listado de Especies Avistadas */}
    <h2 className="subtitulo">Listado de Especies Avistadas</h2>
    <div id="speciesCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-container">
        <div className="carousel-indicators">
          {species.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#speciesCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {species.map((specie, index) => (
            <div key={specie.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <div className="text-center">
                <img
                  src={specie.imageUrl}
                  className="d-block mx-auto"
                  alt={specie.name}
                  style={{ height: "300px", width: "auto", objectFit: "cover" }}
                />
              </div>
              <div className="p-3 text-center">
                <h5><strong>{specie.name}</strong></h5>
                <p><strong>Nombre científico:</strong> {specie.scientificName}</p>
                <p><strong>Categoría:</strong> {specie.category}</p>
                <p><strong>Estado de conservación:</strong> {specie.conservationStatus}</p>
                <p><strong>Área natural:</strong> {specie.areaName}</p>
                <p>{specie.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#speciesCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#speciesCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    </div>

     
      
    
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

