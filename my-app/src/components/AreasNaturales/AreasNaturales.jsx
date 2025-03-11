import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from '../../images/logodeGuardianesdelEntorno.png';
import './AreasNaturales.css';
import Mapa from '../Mapa';

const AreasNaturales = () => {
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevaArea, setNuevaArea] = useState({
    id: null,
    name: "", //  Se inicializan como cadenas vacías porque el usuario aún no ha ingresado datos.
    description: "",
    location: "",
    areaType: "",
    region: "",
    conservationStatus: "",
    imageUrl: ""
  });

  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [areas, setAreas] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el filtro de búsqueda

  // Estados para comentarios y puntuaciones por cada area
  const [comentarios, setComentarios] = useState({});
  const [puntuaciones, setPuntuaciones] = useState({});

  // Estado para guardar los comentarios y puntuaciones enviados
  const [comentariosEnviados, setComentariosEnviados] = useState({});

  const agregarComentario = (areaId, comentario) => {
    setComentarios({...comentarios, [areaId]: comentario });
  };

  const agregarPuntuacion = (areaId, puntuacion) => {
    setPuntuaciones({...puntuaciones, [areaId]: puntuacion});
  };

  // Funcion para enviar comentario y puntuación
  const enviarComentarioYPuntuacion = (areaId) => {
    const comentario = comentarios[areaId];
    const puntuacion = puntuaciones[areaId];

    if (!comentario || !puntuacion) {
      alert("Por favor ingrese un comentario y una puntuación.");
      return;
    }
    
    alert(`Tu comentario: "${comentario}" y tu puntuación: ${puntuacion} fueron enviados`);
    
    setComentariosEnviados({...comentariosEnviados, [areaId]: { comentario, puntuacion }
    });
    
    setComentarios({ ...comentarios, [areaId]: "" });
    setPuntuaciones({ ...puntuaciones, [areaId]: null }); // la puntuación en null, para permitir una nueva entrada
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUsuarioLogueado(user);
    }
  }, []);

  useEffect(() => {
    if (!usuarioLogueado) return;

    const fetchAreas = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/list?secret=TallerReact2025!&userId=${usuarioLogueado.id}&page=1&pageSize=10`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true"
            }
          }
        );
        const data = await response.json();
        setAreas(data.items || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, [usuarioLogueado]);

  const eliminarArea = async (id) => {
    try {
      const respuesta = await fetch("https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/delete?secret=TallerReact2025!", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({ userId: usuarioLogueado?.id || 1234, naturalAreaId: id })
      });

      if (respuesta.ok) {
        setAreas((prevAreas) => prevAreas.filter((area) => area.id !== id));  
        alert("Área eliminada con éxito!");
      } else {
        alert("Error al eliminar área.");
      }
    } catch (error) {
      console.error("Error al eliminar área:", error);
    }
  };

  const agregarArea = async () => {
    const areaNueva = {
      userId: usuarioLogueado?.id,
      naturalArea: {
        name: "",
        location: "",
        areaType: "",
        region: "",
        conservationStatus: "",
        description: "",
        imageUrl: ""
      }
    };

    try {
      const response = await fetch("https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/insert?secret=TallerReact2025!", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify(areaNueva)
      });

      if (response.ok) {
        const data = await response.json();

        if (data && data.result && data.naturalArea) {
          const nuevaAreaConId = {
            ...data.naturalArea,
            id: data.naturalArea.id
          };

          // Se actualiza el estado de `areas`, añadiendo la nueva área al principio del arreglo.
          setAreas((prevAreas) => [nuevaAreaConId, ...prevAreas]);
          alert("Área agregada con éxito!");
          setMostrarFormulario(false);
          setNuevaArea({
            id: '',
            name: '',
            description: '',
            location: '',
            areaType: '',
            region: '',
            conservationStatus: '',
            imageUrl: ''
          });
        } else {
          alert("Error al agregar área. La API no devolvió los datos esperados.");
        }
      } else {
        alert("Error al agregar área.");
      }
    } catch (error) {
      console.error("Error al agregar área:", error);
    }
  };

  const editarArea = (area) => {
    setNuevaArea(area);
    setMostrarFormulario(true);
  };

  const actualizarArea = async () => {
    try {
      const response = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/update?secret=TallerReact2025!', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify(nuevaArea) // se convierte el objeto areaNueva en json para enviarlo
      });

      if (response.ok) {
        alert("Área actualizada con éxito!");
        setMostrarFormulario(false); // oculta el formulario de edicion
        setAreas((prevAreas) =>
          prevAreas.map((a) => (a.id === nuevaArea.id ? nuevaArea : a))
        );
      } else {
        alert("Error al actualizar área.");
      }
    } catch (error) {
      console.error("Error al actualizar área:", error);
    }
  };

  // Maneja la cancelacion del formulario
  const handleCancelar = () => {
    setMostrarFormulario(false);
    setNuevaArea({
      id: null,
      name: "",
      description: "",
      location: "",
      areaType: "",
      region: "",
      conservationStatus: "",
      imageUrl: ""
    });
  };

  
  const handleEnviar = () => {
    if (nuevaArea.id) {
      setAreas(areas.map(area => area.id === nuevaArea.id ? nuevaArea : area));
    } else {
      setAreas([...areas, { ...nuevaArea, id: Date.now() }]);
    }
    setMostrarFormulario(false);
    setNuevaArea({
      id: null,
      name: "",
      description: "",
      location: "",
      areaType: "",
      region: "",
      conservationStatus: "",
      imageUrl: ""
    });
  };

  // Filtro de area basado en el searchTerm
  const filterAreas = areas.filter((area) =>
    area.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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

      <h1 className="titulo-principal text-center">Listado de Areas Naturales</h1>

      <div className="d-flex justify-content-center mb-3">
        <button
          className="btn btn-success"
          onClick={(agregarArea) => setMostrarFormulario(true)}
        >
          Agregar Nueva Area
        </button>
      </div>

      {/* Input para filtrar áreas */}
      <div className="d-flex justify-content-center mb-3">
        <input
          type="text"
          placeholder="Buscar áreas..."
          className="form-control w-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {mostrarFormulario && (
        <div className="card p-3 mt-3">
          <h3>{nuevaArea.id ? "Editar Área" : "Agregar Nueva Área"}</h3>
          {["name", "description", "location", "areaType", "region", "conservationStatus", "imageUrl"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="form-control mb-2"
              value={nuevaArea[field] || ""}
              onChange={(e) => setNuevaArea({ ...nuevaArea, [field]: e.target.value })}
            />
          ))}
          
          {/* mapa */}
          <Mapa ubicacion={nuevaArea.location} />

          <div className="d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={handleCancelar}>
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={handleEnviar}>
              {nuevaArea.id ? "Actualizar" : "Agregar"}
            </button>
          </div>
        </div>
      )}

      <div className="container">
        <div className="row">
          {filterAreas.map((area) => (
            <div key={area.id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  {area.imageUrl && (
                    <img
                      src={area.imageUrl}
                      className="card-img-top"
                      alt={area.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}
                  <h5 className="card-title">{area.name}</h5>
                  <p className="card-text">{area.description}</p>
                  <p><strong>Ubicación:</strong> {area.location}</p>
                  <p><strong>Tipo de área:</strong> {area.areaType}</p>
                  <p><strong>Región:</strong> {area.region}</p>
                  <p><strong>Estado de conservación:</strong> {area.conservationStatus}</p>

                  {/* se agrega el mapa en cada area */}
                  <Mapa ubicacion={area.location} />

                  <button className="btn btn-warning me-2" onClick={() => editarArea(area)}>
                    Editar
                  </button>
                  <button className="btn btn-danger" onClick={() => eliminarArea(area.id)}>
                    Eliminar
                  </button>

                  {/* Seccion de comentarios y puntuaciones */}
                  <div className="mt-3">
                    <h6>Comentarios</h6>
                    <textarea
                      placeholder="Escribe un comentario..."
                      className="form-control"
                      rows="3"
                      value={comentarios[area.id] || ""}
                      onChange={(e) => agregarComentario(area.id, e.target.value)}
                    />
                    <div className="mt-2">
                      <h6>Puntuación</h6>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className={`btn ${puntuaciones[area.id] === star ? "btn-warning" : "btn-outline-warning"} me-1`}
                          onClick={() => agregarPuntuacion(area.id, star)}
                        >
                          {star} ⭐
                        </button>
                      ))}
                    </div>
                    {/* Boton para enviar comentario y puntuación */}
                    <div className="mt-3">
                      <button
                        className="btn btn-primary"
                        onClick={() => enviarComentarioYPuntuacion(area.id)}
                      >
                        Enviar Comentario y Puntuación
                      </button>
                    </div>
                    {/* Mostrar el comentario y la puntuacion enviada*/}
                    {comentariosEnviados[area.id] && (
                      <div className="mt-2 alert alert-info">
                        <p>
                          <strong>Comentario enviado:</strong> {comentariosEnviados[area.id].comentario}
                        </p>
                        <p>
                          <strong>Puntuación enviada:</strong> {comentariosEnviados[area.id].puntuacion}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AreasNaturales;



