import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'react-bootstrap/Dropdown';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import "../../styles/home.css";

export const Vehicles = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		// Llamar a la acción para obtener los vehículos
		actions.fetchVehicles();
	}, [actions]);

	const handleAddFavorite = (vehicle) => {
		actions.addToFavorites(vehicle, "vehicle");
	};

	return (
		<div className="container-fluid mt-3">
			<div className="row mb-4">
				{/* Sección de favoritos en la parte superior como dropdown */}
				<div className="col-12 d-flex justify-content-end">
					<Dropdown>
						<Dropdown.Toggle variant="warning" id="dropdown-basic" className="heart-counter">
							<FontAwesomeIcon icon={solidHeart} />
							{/* Badge para el contador de favoritos de vehículos */}
							{store.vehicleFavorites.length > 0 && (
								<span className="badge">{store.vehicleFavorites.length}</span>
							)}
						</Dropdown.Toggle>

						<Dropdown.Menu>
							{store.vehicleFavorites.length === 0 ? (
								<Dropdown.Item disabled>No tienes vehículos favoritos aún.</Dropdown.Item>
							) : (
								store.vehicleFavorites.map((favorite, index) => (
									<Dropdown.Item key={index} className="d-flex justify-content-between align-items-center">
										<span>{favorite.name} (Añadido {favorite.count} {favorite.count > 1 ? 'veces' : 'vez'})</span>
										<button
											className="btn btn-danger btn-sm ml-2"
											onClick={() => actions.removeFromFavorites(favorite.uid, "vehicle")}
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

			{/* Sección de vehículos */}
			<div className="row">
				{store.vehicles.map((vehicle, index) => (
					<div key={index} className="col-12 col-sm-6 col-md-4 mb-4">
						<div className="card h-100">
							<img
								src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`}
								className="card-img-top"
								alt={vehicle.name}
							/>
							<div className="card-body d-flex flex-column">
								<h5 className="card-title">{vehicle.name}</h5>
								<p className="card-text">
									{vehicle.name} es uno de los vehículos icónicos del universo de Star Wars.
								</p>

								<div className="mt-auto d-flex flex-column gap-2">
									<Link to={`/vehicle/${vehicle.uid}`} className="d-grid">
										<button className="btn btn-primary w-100">Más información</button>
									</Link>
									<button
										className="btn btn-warning w-100"
										onClick={() => handleAddFavorite(vehicle)}
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
