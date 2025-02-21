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
      <div className="container mt-4">
      {/* Listado de las areas naturales */}
      <h2 className="subtitulo">Listado de Areas Naturales</h2>
      
    {/*<div className="row justify-content-center"> 
          {areas.map((area) => (
            <div key={area.id} className="col-md-4">
              <div className="card mb-3">
                <img
                  src={area.imageUrl}
                  className="card-img-top"
                  alt={area.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{area.name}</h5>
                  <p className="card-text"><strong>Ubicación:</strong> {area.location}</p>
                  <p className="card-text"><strong>Tipo de área:</strong> {area.areaType}</p>
                  <p className="card-text"><strong>Región:</strong> {area.region}</p>
                  <p className="card-text"><strong>Estado de conservación:</strong> {area.conservationStatus}</p>
                  <p className="card-text"><strong>Descripción:</strong> {area.description}</p>
                </div>
                </div>
            </div>
          ))}
        </div> */}

        <div id="carouselExampleCaptions" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img 
      src={areas.imageUrl} className="card-img-top" alt={areas.name}
      />
      <div class="carousel-caption d-none d-md-block">
        <h5>{areas.name}</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img 
      src="..." class="d-block w-100" alt="..."
      />
      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
      
      

      {/* Listado de las especies*/}
      <h2 className="subtitulo">Listado de Especies Avistadas</h2>
      
        <div className="row">
          {species.map((specie) => (
            <div key={specie.id} className="col-md-4">
              <div className="card mb-3">
                <img
                  src={specie.imageUrl}
                  className="card-img-top"
                  alt={specie.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{specie.name}</h5>
                  <p className="card-text"><strong>Nombre científico:</strong> {specie.scientificName}</p>
                  <p className="card-text"><strong>Categoría:</strong> {specie.category}</p>
                  <p className="card-text"><strong>Estado de conservación:</strong> {specie.conservationStatus}</p>
                  <p className="card-text"><strong>Área natural:</strong> {specie.areaName}</p>
                  <p className="card-text"><strong>Descripción:</strong> {specie.description}</p>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      

      {/* Paginación para Especies */}
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-primary"
          disabled={speciesPage === 1}
          onClick={() => setSpeciesPage(speciesPage - 1)}
        >
          Anterior
        </button>
        <span>Página {speciesPage} de {speciesTotalPages}</span>
        <button
          className="btn btn-primary"
          disabled={speciesPage === speciesTotalPages}
          onClick={() => setSpeciesPage(speciesPage + 1)}
        >
          Siguiente
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

