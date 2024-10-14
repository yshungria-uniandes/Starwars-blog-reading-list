import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";
import Spinner from 'react-bootstrap/Spinner'; // Usar un spinner de Bootstrap

export const CharacterDetail = () => {
  const { store, actions } = useContext(Context); // Obtener el contexto global
  const { id } = useParams(); // Obtener el ID del personaje desde la URL
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        setLoading(true); // Iniciar la carga
        await actions.fetchCharacterData(id); // Llamar a la acción para obtener los datos del personaje
        setLoading(false); // Finalizamos la carga
      } catch (err) {
        console.error("Error fetching character details:", err);
        setError("Failed to load character details."); // Capturamos el error
        setLoading(false); // Finalizamos la carga incluso en caso de error
      }
    };

    fetchCharacterDetails(); // Ejecutamos la función cuando el componente se monta
  }, []); // El efecto se ejecuta cuando el ID o las acciones cambian

  // Obtenemos los datos del personaje desde el store
  const character = store.characterData?.properties; 
  const description = store.characterData?.description;

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

  if (!character || !character.name) {
    return <div className="alert alert-warning">Character not found.</div>; // Mostrar un mensaje si no se encuentra el personaje
  }

  // Desestructuramos los datos para mejorar la legibilidad
  const {
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender
  } = character;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 text-center">
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
            alt={name}
            className="img-fluid mb-3 shadow-lg rounded"
            style={{ maxWidth: "100%" }}
          />
          <h2 className="mt-3">{name}</h2>
        </div>
        <div className="col-md-8">
          <div className="card p-3 shadow-lg">
            <h3 className="mb-4">Character Details</h3>
            {/* Mostrar la descripción si está disponible, o un mensaje alternativo */}
            <p className="text-muted mb-4">
              {description ? description : "No description available for this character."}
            </p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <strong>Height:</strong> <span>{height} cm</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Mass:</strong> <span>{mass} kg</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Hair Color:</strong> <span>{hair_color}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Skin Color:</strong> <span>{skin_color}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Eye Color:</strong> <span>{eye_color}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Birth Year:</strong> <span>{birth_year}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Gender:</strong> <span>{gender}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
