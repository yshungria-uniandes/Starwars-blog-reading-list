import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importar FontAwesome
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; // Corazón lleno
import Dropdown from 'react-bootstrap/Dropdown'; // Importar el Dropdown de Bootstrap
import "../../styles/home.css"; // Importar los estilos personalizados

export const Characters = () => {
	const { store, actions } = useContext(Context);

	const handleAddFavorite = (character) => {
		// Verificamos si el personaje ya está en la lista de favoritos de personajes
		const favoriteExists = store.characterFavorites.find(fav => fav.uid === character.uid);

		if (favoriteExists) {
			// Si el personaje ya está en favoritos, incrementamos el contador
			actions.incrementFavoriteCount(character.uid, "character");
		} else {
			// Si no está en favoritos, lo añadimos con un contador inicial de 1
			actions.addToFavorites({ ...character, count: 1 }, "character");
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
							{/* Badge para el contador de favoritos */}
							{store.characterFavorites.length > 0 && (
								<span className="badge">{store.characterFavorites.length}</span>
							)}
						</Dropdown.Toggle>

						<Dropdown.Menu>
							{store.characterFavorites.length === 0 ? (
								<Dropdown.Item disabled>No tienes personajes favoritos aún.</Dropdown.Item>
							) : (
								store.characterFavorites.map((favorite, index) => (
									<Dropdown.Item key={index} className="d-flex justify-content-between align-items-center">
										<span>{favorite.name} (Añadido {favorite.count} {favorite.count > 1 ? 'veces' : 'vez'})</span>
										<button
											className="btn btn-danger btn-sm ml-2"
											onClick={() => actions.removeFromFavorites(favorite.uid, "character")}
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

			{/* Sección de personajes */}
			<div className="row">
				{store.characters.map((character, index) => (
					<div key={index} className="col-12 col-sm-6 col-md-4 mb-4">
						<div className="card h-100">
							<img
								src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
								className="card-img-top"
								alt={character.name}
							/>
							<div className="card-body d-flex flex-column">
								<h5 className="card-title">{character.name}</h5>
								<p className="card-text">
									{character.name} es un personaje importante en la saga de Star Wars.
								</p>

								{/* Botones responsive */}
								<div className="mt-auto d-flex flex-column gap-2">
									<Link to={`/character/${character.uid}`} className="d-grid">
										<button className="btn btn-primary w-100">Más información</button>
									</Link>
									<button
										className="btn btn-warning w-100"
										onClick={() => handleAddFavorite(character)}
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
