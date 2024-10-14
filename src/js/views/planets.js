import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'react-bootstrap/Dropdown'; // Importar el Dropdown de Bootstrap
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import "../../styles/home.css";

export const Planets = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		// Llamar a la acción para obtener los planetas
		actions.fetchPlanets();
	}, [actions]);

	const handleAddFavorite = (planet) => {
		// Verificamos si el planeta ya está en la lista de favoritos de planetas
		const favoriteExists = store.planetFavorites.find(fav => fav.uid === planet.uid);

		if (favoriteExists) {
			// Si el planeta ya está en favoritos, incrementamos el contador
			actions.incrementFavoriteCount(planet.uid, "planet");
		} else {
			// Si no está en favoritos, lo añadimos con un contador inicial de 1
			actions.addToFavorites({ ...planet, count: 1 }, "planet");
		}
	};

	return (
		<div className="container-fluid mt-3">
			<div className="row mb-4">
				{/* Sección de favoritos en la parte superior como dropdown */}
				<div className="col-12 d-flex justify-content-end">
					<Dropdown>
						<Dropdown.Toggle variant="warning" id="dropdown-basic" className="heart-counter">
							<FontAwesomeIcon icon={solidHeart} />
							{/* Badge para el contador de favoritos de planetas */}
							{store.planetFavorites.length > 0 && (
								<span className="badge">{store.planetFavorites.length}</span>
							)}
						</Dropdown.Toggle>

						<Dropdown.Menu>
							{store.planetFavorites.length === 0 ? (
								<Dropdown.Item disabled>No tienes planetas favoritos aún.</Dropdown.Item>
							) : (
								store.planetFavorites.map((favorite, index) => (
									<Dropdown.Item key={index} className="d-flex justify-content-between align-items-center">
										<span>{favorite.name} (Añadido {favorite.count} {favorite.count > 1 ? 'veces' : 'vez'})</span>
										<button
											className="btn btn-danger btn-sm ml-2"
											onClick={() => actions.removeFromFavorites(favorite.uid, "planet")}
										>
											<FontAwesomeIcon icon={solidHeart} /> {/* Icono de corazón lleno para eliminar */}
										</button>
									</Dropdown.Item>
								))
							)}
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>

			{/* Sección de planetas */}
			<div className="row">
				{store.planets.map((planet, index) => (
					<div key={index} className="col-12 col-sm-6 col-md-4 mb-4">
						<div className="card h-100">
							<img
								src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
								className="card-img-top"
								alt={planet.name}
							/>
							<div className="card-body d-flex flex-column">
								<h5 className="card-title">{planet.name}</h5>
								<p className="card-text">
									{planet.name} es uno de los planetas en el universo de Star Wars.
								</p>

								<div className="mt-auto d-flex flex-column gap-2">
									<Link to={`/planet/${planet.uid}`} className="d-grid">
										<button className="btn btn-primary w-100">Más información</button>
									</Link>
									<button
										className="btn btn-warning w-100"
										onClick={() => handleAddFavorite(planet)}
									>
										<FontAwesomeIcon icon={solidHeart} /> Añadir a Favoritos
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
