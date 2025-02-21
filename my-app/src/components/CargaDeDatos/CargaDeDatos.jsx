import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logodeGuardianesdelEntorno.png';

const CargaDeDatos = () => {
  // formulario para las areas naturales
  const [areaName, setAreaName] = useState('');
  const [areaLocation, setAreaLocation] = useState('');
  const [areaType, setAreaType] = useState('');

  // formulario para las especies
  const [speciesName, setSpeciesName] = useState('');
  const [speciesCategory, setSpeciesCategory] = useState('');
  const [conservationStatus, setConservationStatus] = useState('');

  // formulario para las actividades
  const [activityName, setActivityName] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [activityFecha, setActivityFecha] = useState('');

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'areaName':
        setAreaName(value);
        break;
      case 'areaLocation':
        setAreaLocation(value);
        break;
      case 'areaType':
        setAreaType(value);
        break;
      case 'speciesName':
        setSpeciesName(value);
        break;
      case 'speciesCategory':
        setSpeciesCategory(value);
        break;
      case 'conservationStatus':
        setConservationStatus(value);
        break;
      case 'activityName':
        setActivityName(value);
        break;
      case 'activityDescription':
        setActivityDescription(value);
        break;
      case 'activityFecha':
        setActivityFecha(value);
      break;
      default:
        break;
    }
  };
  
  const handleSubmitAreaSpecies = async (e) => {
    e.preventDefault();
  
    try {
      const area = await fetch(`https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/insert?secret=TallerReact2025!`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 123, 
          area: {
            name: areaName,
            location: areaLocation,
            type: areaType,
          },
        }),
      });
        const species = await fetch(`https://mammal-excited-tarpon.ngrok-free.app/api/species/insert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 123, 
          species: {
            name: speciesName,
            category: speciesCategory,
            conservationStatus,
          },
        }),
      });
  
      if (area.ok && species.ok) {
        setMensaje('Área y Especie registradas exitosamente!');
      } else {
        setMensaje('Hubo un error en el registro, verifica los datos.');
      }
    } catch (error) {
      setMensaje('Error de red, por favor intente más tarde.');
    }
  };
  
  const handleSubmitActivity = async (e) => {
    e.preventDefault();
    const data = {
      userId: 1,
      activity: {
        name: activityName,
        description: activityDescription,
      },
    };

    try {
      const response = await fetch(
        `https://mammal-excited-tarpon.ngrok-free.app/api/conservation-activity/insert?secret=TallerReact2025!`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      setMensaje('Actividad registrada exitosamente!');
    } catch (error) {
      setMensaje('Error de red, por favor intente más tarde.');
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

      {/*Formulario de areas y especies*/}
      <section className="registro-section">
        <div className="container">
          <div className="registro-header">
            <h2 className="tittle">Registrar Nuevas Áreas y Especies</h2>
            <p>Complete los campos para agregar nuevas áreas naturales y especies avistadas.</p>
          </div>
          
          <form onSubmit={handleSubmitAreaSpecies}>
           
            <div className="section">
              <h3>Registrar Área Natural</h3>
              <div className="mb-3">
                <label htmlFor="areaName">Nombre del Área:</label>
                <input
                  type="text"
                  id="areaName"
                  name="areaName"
                  className="form-control"
                  value={areaName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="areaLocation">Ubicación:</label>
                <input
                  type="text"
                  id="areaLocation"
                  name="areaLocation"
                  className="form-control"
                  value={areaLocation}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="areaType">Tipo de Área:</label>
                <input
                  type="text"
                  id="areaType"
                  name="areaType"
                  className="form-control"
                  value={areaType}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Sección de especies */}
            <div className="section">
              <h3>Registrar Especie Avistada</h3>
              <div className="mb-3">
                <label htmlFor="speciesName">Nombre de la Especie:</label>
                <input
                  type="text"
                  id="speciesName"
                  name="speciesName"
                  className="form-control"
                  value={speciesName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="speciesCategory">Categoría:</label>
                <input
                  type="text"
                  id="speciesCategory"
                  name="speciesCategory"
                  className="form-control"
                  value={speciesCategory}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="conservationStatus">Estado de Conservación:</label>
                <input
                  type="text"
                  id="conservationStatus"
                  name="conservationStatus"
                  className="form-control"
                  value={conservationStatus}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* mensaje de exito*/}
            {mensaje && <p className="mensaje-exito text-center mt-3">{mensaje}</p>}

            <div className="mb-3">
              <button type="submit" className="btn btn-primary">Agregar</button>
            </div>
          </form>
        </div>
      </section>

      {/*Formulario de actividades*/}
      <section className="registro-section">
        <div className="container">
          <div className="registro-header">
            <h2 className="tittle">Registrar Actividad</h2>
            <p>Complete los campos para agregar nuevas actividades.</p>
          </div>
          
          <form onSubmit={handleSubmitActivity}>
            <div className="section">
              <h3>Registrar Actividad</h3>
              <div className="mb-3">
                <label htmlFor="activityName">Nombre de la Actividad:</label>
                <input
                  type="text"
                  id="activityName"
                  name="activityName"
                  className="form-control"
                  value={activityName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="activityDescription">Descripcion:</label>
                <textarea
                  id="activityDescription"
                  name="activityDescription"
                  className="form-control"
                  value={activityDescription}
                  onChange={handleChange}
                  required
                ></textarea>
                
                <div className="mb-3">
                <label htmlFor="activityFecha">Fecha:</label>
                <textarea
                  id="activityFecha"
                  name="activityFecha"
                  className="form-control"
                  value={activityFecha}
                  onChange={handleChange}
                  required
                ></textarea>
                </div>
              </div>
            </div>

            {/* mensaje de exito*/}
            {mensaje && <p className="mensaje-exito text-center mt-3">{mensaje}</p>}

            <div className="mb-3">
              <button type="submit" className="btn btn-primary">Registrar Actividad</button>
            </div>
          </form>
        </div>
      </section>

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

export default CargaDeDatos;
