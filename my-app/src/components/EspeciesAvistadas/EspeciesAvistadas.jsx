import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from '../../images/logodeGuardianesdelEntorno.png';
import './EspeciesAvistadas.css';

const EspeciesAvistadas = () => {
  const [especies, setEspecies] = useState([]);
  const [areas, setAreas] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevaEspecie, setNuevaEspecie] = useState({
    commonName: "",
    scientificName: "",
    category: "",
    conservationStatus: "",
    naturalAreaId: ""
  });
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [mensaje, setMensaje] = useState("");  // Estado para el mensaje de éxito o error

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUsuarioLogueado(user || { id: 123 });
  }, []);

  useEffect(() => {
    const fetchEspecies = async () => {
      try {
        const response = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/species/list?page=1&pageSize=1000');
        if (!response.ok) throw new Error('Error al obtener las especies');
        const data = await response.json();
        setEspecies(data.items);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEspecies();
  }, []);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch(
          `https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/list?secret=TallerReact2025!&userId=${usuarioLogueado?.id || 123}&page=1&pageSize=1000`,
          { headers: { "ngrok-skip-browser-warning": "true" } }
        );
        if (response.ok) {
          const data = await response.json();
          setAreas(data.items || []);
        }
      } catch (error) {
        console.error("Error al obtener áreas naturales:", error);
      }
    };

    if (usuarioLogueado) {
      fetchAreas();
    }
  }, [usuarioLogueado]);

  const handleChange = (e) => {
    setNuevaEspecie({
      ...nuevaEspecie,
      [e.target.name]: e.target.value
    });
  };

  const handleCrearEspecie = async (e) => {
    e.preventDefault();
    setMensaje(""); // Limpiar el mensaje antes de crear la especie
    
    if (!usuarioLogueado || !usuarioLogueado.id) {
      setMensaje("Error: Usuario no identificado.");
      return;
    }

    const requestBody = {
      userId: usuarioLogueado.id,
      species: { ...nuevaEspecie, naturalAreaId: parseInt(nuevaEspecie.naturalAreaId, 10) }
    };

    try {
      const response = await fetch(
        "https://mammal-excited-tarpon.ngrok-free.app/api/species/insert?secret=TallerReact2025!",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        setMensaje("¡Especie agregada correctamente!");  // Mensaje de éxito
        setNuevaEspecie({
          commonName: "",
          scientificName: "",
          category: "",
          conservationStatus: "",
          naturalAreaId: "",
        });

        // Recargar la lista de especies
        const nuevaLista = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/species/list?page=1&pageSize=1000');
        const data = await nuevaLista.json();
        setEspecies(data.items);
      } else {
        setMensaje("Error al guardar la especie.");  // Mensaje de error
      }
    } catch (error) {
      setMensaje("Error de conexión.");
    }
  };

  const handleEditarEspecie = (especie) => {
    setNuevaEspecie(especie);
    setMostrarFormulario(true);
  };

  const handleActualizarEspecie = async (e) => {
    e.preventDefault();
    setMensaje(""); // Limpiar el mensaje antes de actualizar la especie
    
    if (!usuarioLogueado || !usuarioLogueado.id) {
      setMensaje("Error: Usuario no identificado.");
      return;
    }

    const requestBody = {
      userId: usuarioLogueado.id,
      species: { ...nuevaEspecie, naturalAreaId: parseInt(nuevaEspecie.naturalAreaId, 10) }
    };

    try {
      const response = await fetch(
        `https://mammal-excited-tarpon.ngrok-free.app/api/species/update?secret=TallerReact2025!`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        setMensaje("¡Especie actualizada correctamente!");  // Mensaje de éxito
        setMostrarFormulario(false);

        // Recargar la lista de especies
        const nuevaLista = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/species/list?page=1&pageSize=1000');
        const data = await nuevaLista.json();
        setEspecies(data.items);
      } else {
        setMensaje("Error al actualizar la especie.");  // Mensaje de error
      }
    } catch (error) {
      setMensaje("Error de conexión.");
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
                <li><Link className="dropdown-item" to="/iniciarsesion">Iniciar Sesión</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <h1 className="titulo-principal text-center">Listado de Especies Avistadas</h1>

      <div className="d-flex justify-content-center mb-3">
        <button className="btn btn-success" onClick={() => setMostrarFormulario(true)}>
          Agregar Nueva Especie
        </button>
      </div>

      {/* Mostrar mensaje de éxito o error */}
      {mensaje && (
        <div className={`alert ${mensaje.includes("Error") ? "alert-danger" : "alert-success"}`} role="alert">
          {mensaje}
        </div>
      )}

      {mostrarFormulario && (
        <div className="card p-3 mt-3">
          <h3>{nuevaEspecie.id ? "Editar Especie" : "Agregar Nueva Especie"}</h3>
          {/* Entradas para los datos básicos de la especie */}
          <input
            type="text"
            name="commonName"
            placeholder="Nombre común"
            className="form-control mb-2"
            value={nuevaEspecie.commonName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="scientificName"
            placeholder="Nombre científico"
            className="form-control mb-2"
            value={nuevaEspecie.scientificName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Categoría"
            className="form-control mb-2"
            value={nuevaEspecie.category}
            onChange={handleChange}
          />
          <input
            type="text"
            name="conservationStatus"
            placeholder="Estado de conservación"
            className="form-control mb-2"
            value={nuevaEspecie.conservationStatus}
            onChange={handleChange}
          />
          {/* Select para elegir el área natural */}
          <div className="form-group mb-2">
            <label>Área Natural:</label>
            <select
              className="form-control"
              name="naturalAreaId"
              value={nuevaEspecie.naturalAreaId}
              onChange={handleChange}
            >
              <option value="">Selecciona un área natural</option>
              {areas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
            <button className="btn btn-primary" onClick={nuevaEspecie.id ? handleActualizarEspecie : handleCrearEspecie}>
              {nuevaEspecie.id ? "Actualizar" : "Agregar"}
            </button>
          </div>
        </div>
      )}

      <div className="container">
        <div className="row">
          {especies.map((especie) => (
            <div key={especie.id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{especie.commonName}</h5>
                  <p className="card-text">{especie.scientificName}</p>
                  <p className="card-text">{especie.category}</p>
                  <p className="card-text">{especie.conservationStatus}</p>
                  <button className="btn btn-warning" onClick={() => handleEditarEspecie(especie)}>Editar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EspeciesAvistadas;



