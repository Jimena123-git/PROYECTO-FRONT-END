// Registro.jsx
import React, { useState } from "react";
import PaginaPrincipal from '../PaginaPrincipal/PaginaPrincipal'; // para mi imporTAR el header
import './Registro.css'

function Registro() {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleUsuarioChange = (e) => {
    setUsuario(e.target.value);
  };

  const handleContraseñaChange = (e) => {
    setContraseña(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje(`El usuario fue registrado con exito: ${usuario}`);
  };

  return (
    <div>
      <PaginaPrincipal /> {/* al incluir pagina principal todo el contenido del header se mostrará de manera automática */}
   
      <div className="container mt-4">
  <div className="card" style={{ maxWidth: '500px', margin: 'auto' }}>
    <div className="card-body">
      <h5 className="card-title text-center">REGISTRO</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="usuario" className="form-label">Usuario:</label>
          <input
            type="text"
            id="usuario"
            className="form-control"
            value={usuario}
            onChange={handleUsuarioChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contraseña" className="form-label">Contraseña:</label>
          <input
            type="password"
            id="contraseña"
            className="form-control"
            value={contraseña}
            onChange={handleContraseñaChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Registrarse</button>
      </form>

      {/* se muestra el mensaje de registro */}
      {mensaje && <p className="text-success mt-3 text-center">{mensaje}</p>}
    </div>
  </div>
</div>

      
    </div>
  );
}

export default Registro;



  


