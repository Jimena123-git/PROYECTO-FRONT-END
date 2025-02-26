import React, { useState } from "react";

const AreasNaturales = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevaArea, setNuevaArea] = useState({
    name: "",
    description: "",
    location: "",
    areaType: "",
    region: "",
    conservationStatus: "",
    imageUrl: ""
  });
  const [areaAgregada, setAreaAgregada] = useState(null);

  // Función para manejar los cambios en el formulario
  const handleInputChange = (e) => {
    setNuevaArea({
      ...nuevaArea,
      [e.target.name]: e.target.value
    });
  };

  // Función para agregar un área utilizando la API
  const agregarArea = async () => {
    const areaNueva = {
      userId: 1234,  // Este valor debe ser el ID del usuario logueado
      naturalArea: {
        name: nuevaArea.name,
        location: nuevaArea.location,
        areaType: nuevaArea.areaType,
        region: nuevaArea.region,
        conservationStatus: nuevaArea.conservationStatus,
        description: nuevaArea.description,
        imageUrl: nuevaArea.imageUrl
      }
    };
  
    try {
      const response = await fetch(
        "https://mammal-excited-tarpon.ngrok-free.app/api/natural-area/insert?secret=TallerReact2025!",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
          },
          body: JSON.stringify(areaNueva)
        }
      );
  
      // Verificar si la respuesta es exitosa
      if (response.ok) {
        // Intentamos parsear la respuesta como JSON
        const data = await response.json();
        console.log("Respuesta de la API:", data);
  
        if (data.result) {
          alert("Área agregada con éxito!");
          setMostrarFormulario(false);
        } else {
          alert("Error desconocido al agregar el área.");
        }
      } else {
        // Si la respuesta no es OK, obtenemos el error del cuerpo de la respuesta
        const errorData = await response.text(); // Convertir la respuesta a texto en lugar de JSON
        console.error("Error en la API:", errorData);
        alert(`Error al agregar área: ${errorData}`);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
  
      if (error instanceof Error) {
        alert(`Hubo un error al intentar agregar el área: ${error.message}`);
      } else {
        alert("Hubo un error al intentar agregar el área.");
      }
    }
  };
  
  

  return (
    <div>
      <h1>Visualización de áreas naturales</h1>

      {/* Botón para mostrar el formulario */}
      <div className="d-flex justify-content-center mb-3">
        <button className="btn btn-success" onClick={() => setMostrarFormulario(true)}>
          Agregar Nueva Área
        </button>
      </div>

      {/* Formulario de agregar área */}
      {mostrarFormulario && (
        <div className="container">
          <div className="card p-3">
            <h3>Agregar Nueva Área</h3>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              className="form-control mb-2"
              value={nuevaArea.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Descripción"
              className="form-control mb-2"
              value={nuevaArea.description}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Ubicación"
              className="form-control mb-2"
              value={nuevaArea.location}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="areaType"
              placeholder="Tipo de área"
              className="form-control mb-2"
              value={nuevaArea.areaType}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="region"
              placeholder="Región"
              className="form-control mb-2"
              value={nuevaArea.region}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="conservationStatus"
              placeholder="Estado de conservación"
              className="form-control mb-2"
              value={nuevaArea.conservationStatus}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="URL de la imagen"
              className="form-control mb-2"
              value={nuevaArea.imageUrl}
              onChange={handleInputChange}
            />
            {/* Botón para guardar el área */}
            <button className="btn btn-success" onClick={agregarArea}>
              Guardar Área
            </button>
            <button className="btn btn-secondary ms-2" onClick={() => setMostrarFormulario(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Card para mostrar el área agregada */}
      {areaAgregada && (
        <div className="card mt-4" style={{ maxWidth: "18rem" }}>
          <img src={areaAgregada.imageUrl} className="card-img-top" alt={areaAgregada.name} />
          <div className="card-body">
            <h5 className="card-title">{areaAgregada.name}</h5>
            <p className="card-text">{areaAgregada.description}</p>
            <p><strong>Ubicación:</strong> {areaAgregada.location}</p>
            <p><strong>Tipo:</strong> {areaAgregada.areaType}</p>
            <p><strong>Región:</strong> {areaAgregada.region}</p>
            <p><strong>Estado de conservación:</strong> {areaAgregada.conservationStatus}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AreasNaturales;






