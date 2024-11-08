import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";
import Spinner from 'react-bootstrap/Spinner'; // Usar un spinner de Bootstrap

export const PlanetDetail = () => {
  const { store, actions } = useContext(Context); // Obtener el contexto global
  const { id } = useParams(); // Obtener el ID del planeta desde la URL
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchPlanetDetails = async () => {
      try {
        setLoading(true); // Iniciar la carga
        await actions.fetchPlanetsData(id); // Llamar a la acción para obtener los datos del planeta
        setLoading(false); // Finalizamos la carga
      } catch (err) {
        console.error("Error fetching planet details:", err);
        setError("Failed to load planet details."); // Capturamos el error
        setLoading(false); // Finalizamos la carga incluso en caso de error
      }
    };

    fetchPlanetDetails(); // Ejecutamos la función cuando el componente se monta
  }, []); // El efecto se ejecuta cuando el ID o las acciones cambian

  // Obtenemos los datos del planeta desde el store
  const planet = store.planetData?.properties; 
  const description = store.planetData?.description;

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>; // Mostrar un mensaje de error estilizado
  }

  if (!planet || !planet.name) {
    return <div className="alert alert-warning">Planet not found.</div>; // Mostrar un mensaje si no se encuentra el planeta
  }

  // Desestructuramos los datos para mejorar la legibilidad
  const {
    name,
    climate,
    diameter,
    gravity,
    population,
    terrain,
    orbital_period,
    rotation_period
  } = planet;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 text-center">
          <img
            src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
            onError={e => (e.target.src = "https://via.placeholder.com/400x200")}
            alt={name}
            className="img-fluid mb-3 shadow-lg rounded"
            style={{ maxWidth: "100%" }}
          />
          <h2 className="mt-3">{name}</h2>
        </div>
        <div className="col-md-8">
          <div className="card p-3 shadow-lg">
            <h3 className="mb-4">Planet Details</h3>
            {/* Mostrar la descripción si está disponible, o un mensaje alternativo */}
            <p className="text-muted mb-4">
              {description ? description : "No description available for this planet."}
            </p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <strong>Climate:</strong> <span>{climate}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Diameter:</strong> <span>{diameter} km</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Gravity:</strong> <span>{gravity}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Population:</strong> <span>{population}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Terrain:</strong> <span>{terrain}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Orbital Period:</strong> <span>{orbital_period} days</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Rotation Period:</strong> <span>{rotation_period} hours</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
