import React, { useState, useEffect } from "react";
import './UserProfile.css';

const UserProfile = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const pageSize = 10;
    const userId = 1; // Temporalmente fijo

    const fetchUsers = async (pageNumber) => {
        setLoading(true);

        try {
            const response = await fetch(
                `https://mammal-excited-tarpon.ngrok-free.app/api/user/list?secret=TallerReact2025!&userId=${userId}&page=${pageNumber}&pageSize=${pageSize}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "true",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status}`);
            }

            const data = await response.json();

            if (data.users?.items) {
                setUsers((prevUsers) => {
                    const mergedUsers = [...prevUsers, ...data.users.items];
                    const uniqueUsers = Array.from(new Map(mergedUsers.map(user => [user.id, user])).values());
                    return uniqueUsers;
                });
                setTotalRecords(data.users.totalRecords || 0);
            } else {
                setError("No se encontraron usuarios.");
            }
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            setError("Error al obtener los usuarios. Inténtalo más tarde.");
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        if (users.length >= totalRecords) return;

        setPage((prevPage) => {
            const nextPage = prevPage + 1;
            fetchUsers(nextPage);
            return nextPage;
        });
    };

    const manejoVolver = () => {
        window.history.back(); // para volver a la pagina anterior 
    };

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    return (
        <div className="container mt-4">
            <div className="card shadow-lg rounded-lg border-light">
                <div className="card-body">
                    <button onClick={manejoVolver} className="btn btn-success mb-4">
                        <i className="bi bi-arrow-left"></i> Volver
                    </button>

                    <h2 className="card-title text-center mb-4 text-black">Lista de Usuarios</h2>

                    {error && <div className="alert alert-danger text-center">{error}</div>}

                    <ul className="list-group">
                        {users.map((user) => (
                            <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center border-0">
                                <div>
                                    <h5 className="mb-1 text-dark">{user.name}</h5>
                                    <p className="text-muted">{user.email}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {users.length < totalRecords && (
                        <button 
                            onClick={handleLoadMore} 
                            className="btn btn-secondary w-100 mt-3 rounded-pill"
                            disabled={loading}
                        >
                            {loading ? "Cargando más..." : "Ver más"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
