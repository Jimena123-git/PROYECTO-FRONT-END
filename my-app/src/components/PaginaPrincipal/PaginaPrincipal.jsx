import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PaginaPrincipal.css';
import logo from '../../images/logodeGuardianesdelEntorno.png';

const PaginaPrincipal = () => {
  // Estados para las áreas naturales
  const [areas, setAreas] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const areaPageSize = 10;

  // Estados para las especies avistadas
  const [species, setSpecies] = useState([]);
  const [speciesPage, setSpeciesPage] = useState(1);
  const [speciesTotalPages, setSpeciesTotalPages] = useState(1);
  const speciesPageSize = 10;

  // Estado para manejar comentarios y puntuaciones
  const [areaComments, setAreaComments] = useState([]);
  const [speciesComments, setSpeciesComments] = useState([]);

  const [areaRating, setAreaRating] = useState(1); // Puntuación por defecto 1
  const [speciesRating, setSpeciesRating] = useState(1); // Puntuación por defecto 1
  const [areaComment, setAreaComment] = useState('');
  const [speciesComment, setSpeciesComment] = useState('');

  // Función para obtener las areas naturales
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
    fetchAreas();
  }, [page]);

  // Función para obtener las especies 
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

  useEffect(() => { 
    fetchEspecies();
  }, [speciesPage]);

  // envio de comentario y puntuacion para las areas
  const handleAreaCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      rating: areaRating,
      comment: areaComment,
    };
    setAreaComments([newComment, ...areaComments]);
    setAreaComment('');
  };

  // envio de comentario y puntuacion para las espec
  const handleSpeciesCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      rating: speciesRating,
      comment: speciesComment,
    };
    setSpeciesComments([newComment, ...speciesComments]);
    setSpeciesComment('');
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

      <h1 className="titulo-principal">Guardianes del entorno</h1>
      <div className="container mt-4">
        {/* Listado de las áreas naturales */}
        <h2 className="subtitulo">Listado de Áreas Naturales</h2>
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
                <div key={area.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
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

        {/* Formulario para dejar comentarios y puntuación */}
        <div className="comment-section">
          <h5>Deja tu comentario y puntuación</h5>
          <form onSubmit={handleAreaCommentSubmit}>
            <div className="form-group">
              <label htmlFor="areaRating">Puntuación</label>
              <select
                id="areaRating"
                className="form-control"
                value={areaRating}
                onChange={(e) => setAreaRating(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>{rating}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="areaComment">Comentario</label>
              <textarea
                id="areaComment"
                className="form-control"
                rows="3"
                value={areaComment}
                onChange={(e) => setAreaComment(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-2">Enviar</button>
          </form>

          <div className="comments-list">
            {areaComments.map((comment, index) => (
              <div key={index} className="comment">
                <p><strong>Puntuación:</strong> {comment.rating}</p>
                <p><strong>Comentario:</strong> {comment.comment}</p>
              </div>
            ))}
          </div>
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


        {/* Formulario para dejar comentarios y puntuación de especies */}
        <div className="comment-section">
          <h5>Deja tu comentario y puntuación sobre la especie</h5>
          <form onSubmit={handleSpeciesCommentSubmit}>
            <div className="form-group">
              <label htmlFor="speciesRating">Puntuación</label>
              <select
                id="speciesRating"
                className="form-control"
                value={speciesRating}
                onChange={(e) => setSpeciesRating(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>{rating}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="speciesComment">Comentario</label>
              <textarea
                id="speciesComment"
                className="form-control"
                rows="3"
                value={speciesComment}
                onChange={(e) => setSpeciesComment(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-2">Enviar</button>
          </form>

          <div className="comments-list">
            {speciesComments.map((comment, index) => (
              <div key={index} className="comment">
                <p><strong>Puntuación:</strong> {comment.rating}</p>
                <p><strong>Comentario:</strong> {comment.comment}</p>
              </div>
            ))}
          </div>
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

export default PaginaPrincipal;

