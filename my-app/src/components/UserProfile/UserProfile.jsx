import React, { useState, useEffect } from "react";
import './UserProfile.css';

const PerfilUsuario = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);
    const [pagina, setPagina] = useState(1);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const tamanoPagina = 10;
    const userId = 1; // Temporalmente fijo

    const obtenerUsuarios = async (numeroPagina) => {
        setCargando(true);

        try {
            const respuesta = await fetch(
                `https://mammal-excited-tarpon.ngrok-free.app/api/user/list?secret=TallerReact2025!&userId=${userId}&page=${numeroPagina}&pageSize=${tamanoPagina}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "true",
                    },
                }
            );

            if (!respuesta.ok) {
                throw new Error(`Error en la API: ${respuesta.status}`);
            }

            const datos = await respuesta.json();

            if (datos.users?.items) {
                setUsuarios((usuariosPrevios) => {
                    const usuariosCombinados = [...usuariosPrevios, ...datos.users.items];
                    // Eliminamos duplicados usando el id
                    const usuariosUnicos = Array.from(new Map(usuariosCombinados.map(usuario => [usuario.id, usuario])).values());
                    return usuariosUnicos;
                });
                setTotalRegistros(datos.users.totalRecords || 0);
            } else {
                setError("No se encontraron usuarios.");
            }
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            setError("Error al obtener los usuarios. Inténtalo más tarde.");
        } finally {
            setCargando(false);
        }
    };

    const cargarMas = () => {
        if (usuarios.length >= totalRegistros) return;
        setPagina((paginaAnterior) => {
            const siguientePagina = paginaAnterior + 1;
            obtenerUsuarios(siguientePagina);
            return siguientePagina;
        });
    };

    const manejarVolver = () => {
        window.history.back(); // para volver a la página anterior 
    };

    useEffect(() => {
        obtenerUsuarios(pagina);
    }, [pagina]);

    return (
        <div className="container mt-4">
            <div className="card shadow-lg rounded-lg border-light">
                <div className="card-body">
                    <button onClick={manejarVolver} className="btn btn-success mb-4">
                        <i className="bi bi-arrow-left"></i> Volver
                    </button>

                    <h2 className="card-title text-center mb-4 text-black">Lista de Usuarios</h2>

                    {error && <div className="alert alert-danger text-center">{error}</div>}

                    <ul className="list-group">
                        {usuarios.map((usuario) => (
                            <li key={usuario.id} className="list-group-item d-flex justify-content-between align-items-center border-0">
                                <div>
                                    <h5 className="mb-1 text-dark">{usuario.name}</h5>
                                    <p className="text-muted">{usuario.email}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {usuarios.length < totalRegistros && (
                        <button 
                            onClick={cargarMas} 
                            className="btn btn-secondary w-100 mt-3 rounded-pill"
                            disabled={cargando}
                        >
                            {cargando ? "Cargando más..." : "Ver más"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PerfilUsuario;

