import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logodeGuardianesdelEntorno.png';

const ActividadesConservacion = () => {
  const [actividades, setActividades] = useState([]);
  const [nuevaActividad, setNuevaActividad] = useState({ description: "", date: "" });
  
  useEffect(() => {
    try {
      const actividadesGuardadas = JSON.parse(localStorage.getItem("actividades")) || [];
      setActividades(actividadesGuardadas);
    } catch (error) {
      console.error("Error al cargar las actividades desde localStorage:", error);
    }
  }, []);
  
  useEffect(() => {
    if (actividades.length > 0) {
      try {
        localStorage.setItem("actividades", JSON.stringify(actividades));
      } catch (error) {
        console.error("Error al guardar las actividades en localStorage:", error);
      }
    }
  }, [actividades]);

  const handleChange = (e) => {
    setNuevaActividad({ ...nuevaActividad, [e.target.name]: e.target.value });
  };

  const agregarActividad = (e) => {
    e.preventDefault();

    if (!nuevaActividad.description.trim() || !nuevaActividad.date) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    
    const fechaHoy = new Date().toISOString().split('T')[0]; // T es simplemente para separar la fecha y la hora
    if (nuevaActividad.date > fechaHoy) {
      alert("La fecha no puede ser en el futuro.");
      return;
    }

    const nueva = {
      id: Date.now(), 
      description: nuevaActividad.description.trim(),
      date: nuevaActividad.date,
    };

    setActividades((prevActividades) => [...prevActividades, nueva]);
    setNuevaActividad({ description: "", date: "" });
  };

  const eliminarActividad = (id) => {
    const nuevasActividades = actividades.filter((actividad) => actividad.id !== id);
    setActividades(nuevasActividades); 
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

      <h1 className="titulo-principal text-center">Actividades de Conservación</h1>

      {/* Formulario */}
      <form onSubmit={agregarActividad} className="bg-white p-4 rounded-lg shadow-md">
        <div className="mb-3">
          <label className="form-label">Descripción:</label>
          <input
            type="text"
            name="description"
            value={nuevaActividad.description}
            onChange={handleChange}
            className="form-control"
            placeholder="Ej: Plantación de árboles"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha:</label>
          <input
            type="date"
            name="date"
            value={nuevaActividad.date}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button
          type="submit"
          className="btn btn-success w-100"
        >
         Agregar Actividad
        </button>
      </form>

      {/* Listado de actividades */}
      <div className="mt-6">
        {actividades.length === 0 ? (
          <p className="text-center text-gray-600">No hay actividades registradas.</p>
        ) : (
          actividades.map((actividad) => (
            <div key={actividad.id} className="d-flex justify-content-between align-items-center bg-white p-4 my-2 rounded-lg shadow-md border-start border-5 border-success">
              <div>
                <p className="fw-bold text-dark">{actividad.description}</p>
                <p className="text-muted">{actividad.date}</p>
              </div>
              <button
                onClick={() => eliminarActividad(actividad.id)}
                className="btn btn-danger">Eliminar </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActividadesConservacion;
