import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from '../../images/logodeGuardianesdelEntorno.png';
import './EspeciesAvistadas.css';

const EspeciesAvistadas = () => {
  const [especies, setEspecies] = useState([]);
  const [areas, setAreas] = useState([]); // Lista de áreas naturales
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevaEspecie, setNuevaEspecie] = useState({
    commonName: "",
    scientificName: "",
    category: "",
    conservationStatus: "",
    naturalAreaId: ""  // Aquí se guardará el ID del área natural seleccionada
  });
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [comentario, setComentario] = useState('');
  const [puntuacion, setPuntuacion] = useState(1);

  // Obtener usuario logueado (puedes ajustarlo según tu lógica)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUsuarioLogueado(user);
    } else {
      // Si no hay usuario, asigna un valor por defecto (por ejemplo, 123)
      setUsuarioLogueado({ id: 123 });
    }
  }, []);

  // Cargar la lista de especies
  useEffect(() => {
    const fetchEspecies = async () => {
      try {
        const response = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/species/list?page=1&pageSize=1000');
        if (!response.ok) {
          throw new Error('Error al obtener las especies');
        }
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

  // Cargar la lista de áreas naturales para poder elegir el id
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch(
          'https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/list?secret=TallerReact2025!&userId=' + (usuarioLogueado?.id || 123) + '&page=1&pageSize=1000',
          { headers: { "ngrok-skip-browser-warning": "true" } }
        );
        const data = await response.json();
        setAreas(data.items || []);
      } catch (error) {
        console.error("Error al obtener áreas naturales:", error);
      }
    };

    // Aseguramos que haya usuario para hacer la petición
    if (usuarioLogueado) {
      fetchAreas();
    }
  }, [usuarioLogueado]);

  if (loading) {
    return <p>Cargando especies...</p>;
  }

  if (error) {
    return <p className="text-danger">Hubo un error: {error}</p>;
  }

  const eliminarEspecie = async (id) => {
    try {
      const response = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/species/delete?secret=TallerReact2025!', {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({ userId: usuarioLogueado?.id || 123, especieId: id })
      });

      if (response.ok) {
        setEspecies((prevEspecie) => prevEspecie.filter((especie) => especie.id !== id));
        alert("Especie eliminada con éxito!");
      } else {
        alert("Error al eliminar especie.");
      }
    } catch (error) {
      console.error("Error al eliminar especie:", error);
    }
  };

  const agregarEspecie = async () => {
    const especieNueva = {
      userId: usuarioLogueado?.id || 123,
      species: {
        commonName: nuevaEspecie.commonName,
        scientificName: nuevaEspecie.scientificName,
        category: nuevaEspecie.category,
        conservationStatus: nuevaEspecie.conservationStatus,
        naturalAreaId: Number(nuevaEspecie.naturalAreaId)  // Convertimos a número
      }
    };
  
    try {
      const response = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/species/insert?secret=TallerReact2025!', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(especieNueva),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data && data.result && data.species) {
          setEspecies((prevEspecies) => [data.species, ...prevEspecies]);
          alert("Especie agregada con éxito!");
          setMostrarFormulario(false);
          setNuevaEspecie({
            commonName: "",
            scientificName: "",
            category: "",
            conservationStatus: "",
            naturalAreaId: "",
          });
        } else {
          alert("Error al agregar especie.");
        }
      } else {
        alert("Error al agregar especie.");
      }
    } catch (error) {
      console.error("Error al agregar especie:", error);
    }
  };
  
  const editarEspecie = (especie) => {
    setNuevaEspecie(especie);
    setMostrarFormulario(true);
  };

  const actualizarEspecie = async () => {
    try {
      const response = await fetch('https://mammal-excited-tarpon.ngrok-free.app/api/species/update?secret=TallerReact2025!', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify(nuevaEspecie)
      });

      if (response.ok) {
        alert("Especie actualizada con éxito!");
        setMostrarFormulario(false);
        setEspecies((prevEspecies) =>
          prevEspecies.map((e) => (e.id === nuevaEspecie.id ? nuevaEspecie : e))
        );
      } else {
        alert("Error al actualizar especie.");
      }
    } catch (error) {
      console.error("Error al actualizar especie:", error);
    }
  };

  const handleCancelar = () => {
    setMostrarFormulario(false);
    setNuevaEspecie({
      commonName: "",
      scientificName: "",
      category: "",
      conservationStatus: "",
      naturalAreaId: ""
    });
  };

  const manejoBotonEnviar = () => {
    if (nuevaEspecie.id) {
      actualizarEspecie(); 
    } else {
      agregarEspecie(); 
    }
  };

  const handleComentarioChange = (e) => {
    setComentario(e.target.value);
  };

  const handlePuntuacionChange = (e) => {
    setPuntuacion(Number(e.target.value));
  };

  const handleEnviarComentario = (e) => {
    e.preventDefault();
    console.log("Comentario:", comentario);
    console.log("Puntuación:", puntuacion);
    alert("Comentario y puntuación enviados con éxito!");
    setComentario("");
    setPuntuacion(1);
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
            onChange={(e) => setNuevaEspecie({ ...nuevaEspecie, commonName: e.target.value })}
          />
          <input
            type="text"
            name="scientificName"
            placeholder="Nombre científico"
            className="form-control mb-2"
            value={nuevaEspecie.scientificName}
            onChange={(e) => setNuevaEspecie({ ...nuevaEspecie, scientificName: e.target.value })}
          />
          <input
            type="text"
            name="category"
            placeholder="Categoría"
            className="form-control mb-2"
            value={nuevaEspecie.category}
            onChange={(e) => setNuevaEspecie({ ...nuevaEspecie, category: e.target.value })}
          />
          <input
            type="text"
            name="conservationStatus"
            placeholder="Estado de conservación"
            className="form-control mb-2"
            value={nuevaEspecie.conservationStatus}
            onChange={(e) => setNuevaEspecie({ ...nuevaEspecie, conservationStatus: e.target.value })}
          />
          {/* Select para elegir el área natural */}
          <div className="form-group mb-2">
            <label>Área Natural:</label>
            <select
              className="form-control"
              name="naturalAreaId"
              value={nuevaEspecie.naturalAreaId}
              onChange={(e) => setNuevaEspecie({ ...nuevaEspecie, naturalAreaId: e.target.value })}
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
            <button className="btn btn-secondary" onClick={handleCancelar}>Cancelar</button>
            <button className="btn btn-primary" onClick={manejoBotonEnviar}>
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
                  <p><strong>Científico:</strong> {especie.scientificName}</p>
                  <p><strong>Categoría:</strong> {especie.category}</p>
                  <p><strong>Estado de conservación:</strong> {especie.conservationStatus}</p>
                  <p><strong>ID Área Natural:</strong> {especie.naturalAreaId}</p>
                  <button className="btn btn-warning me-2" onClick={() => editarEspecie(especie)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => eliminarEspecie(especie.id)}>Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleEnviarComentario}>
        <div className="form-group">
          <label htmlFor="comentario">Comentario:</label>
          <textarea
            className="form-control"
            id="comentario"
            value={comentario}
            onChange={handleComentarioChange}
            rows="3"
          />
        </div>

        <select
          className="form-control"
          id="puntuacion"
          value={puntuacion}
          onChange={handlePuntuacionChange}
        >
          {[1, 2, 3, 4, 5].map((puntaje) => (
            <option key={puntaje} value={puntaje}>
              {puntaje}
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-success mt-2">
          Enviar Comentario
        </button>
      </form>
    </div>
  );
};

export default EspeciesAvistadas;

