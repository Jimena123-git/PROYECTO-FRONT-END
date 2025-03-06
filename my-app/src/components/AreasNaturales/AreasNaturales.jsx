import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from '../../images/logodeGuardianesdelEntorno.png';
import './AreasNaturales.css';

const AreasNaturales = () => {
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevaArea, setNuevaArea] = useState({
    id: null,
    name: "",
    description: "",
    location: "",
    areaType: "",
    region: "",
    conservationStatus: "",
    imageUrl: ""
  });

  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [areas, setAreas] = useState([]);

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
        const response = await fetch(`https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/list?secret=TallerReact2025!&userId=${usuarioLogueado.id}&page=1&pageSize=10`, {
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        });
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
      const response = await fetch("https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/delete?secret=TallerReact2025!",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
          },
          body: JSON.stringify({ userId: 1234, naturalAreaId: id })
        }
      );

      if (response.ok) {
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
  
          setAreas((prevAreas) => [nuevaAreaConId, ...prevAreas]);
          alert("Área agregada con éxito!"); // El alert aquí
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
      const response = await fetch(
        'https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/update?secret=TallerReact2025!',
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
          },
          body: JSON.stringify(nuevaArea)
        }
      );

      if (response.ok) {
        alert("Área actualizada con éxito!");
        setMostrarFormulario(false);
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

      <h1 className="titulo-principal text-center">Listado de Areas Naturales</h1>

      <div className="d-flex justify-content-center mb-3">
        <button className="btn btn-success" onClick={() => setMostrarFormulario(true)}>
          Agregar Nueva Area
        </button>
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
          <div className="d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={handleCancelar}>Cancelar</button>
            <button className="btn btn-primary" onClick={handleEnviar}>
              {nuevaArea.id ? "Actualizar" : "Agregar"}
            </button>
          </div>
        </div>
      )}

      <div className="container">
        <div className="row">
          {areas.map((area) => (
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

                  <button className="btn btn-warning me-2" onClick={() => editarArea(area)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => eliminarArea(area.id)}>Eliminar</button>
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





