import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";
import Spinner from 'react-bootstrap/Spinner';

export const VehicleDetail = () => {
	const { store, actions } = useContext(Context);
	const { id } = useParams(); // Obtener el ID del vehículo desde la URL
	const [loading, setLoading] = useState(true); // Estado para manejar la carga
	const [error, setError] = useState(null); // Estado para manejar errores

	useEffect(() => {
		const fetchVehicleDetails = async () => {
			try {
				setLoading(true); // Iniciar la carga
				await actions.fetchVehicleData(id); // Llamar a la acción para obtener los datos del vehículo
				setLoading(false); // Finalizar la carga
			} catch (err) {
				console.error("Error fetching vehicle details:", err);
				setError("Failed to load vehicle details."); // Capturamos el error
				setLoading(false);
			}
		};

		fetchVehicleDetails(); // Ejecutamos la función cuando el componente se monta
	}, []);

	const vehicle = store.vehicleData?.properties; 
	const description = store.vehicleData?.description;

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

	if (!vehicle || !vehicle.name) {
		return <div className="alert alert-warning">Vehicle not found.</div>; // Mostrar un mensaje si no se encuentra el vehículo
	}

	// Desestructuramos los datos del vehículo para mejorar la legibilidad
	const {
		name,
		model,
		manufacturer,
		cost_in_credits,
		length,
		crew,
		passengers,
		max_atmosphering_speed,
		cargo_capacity
	} = vehicle;

	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col-md-4 text-center">
					<img
						src={`https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`}
						alt={name}
						className="img-fluid mb-3 shadow-lg rounded"
						style={{ maxWidth: "100%" }}
					/>
					<h2 className="mt-3">{name}</h2>
				</div>
				<div className="col-md-8">
					<div className="card p-3 shadow-lg">
						<h3 className="mb-4">Vehicle Details</h3>
						<p className="text-muted mb-4">
							{description ? description : "No description available for this vehicle."}
						</p>
						<ul className="list-group list-group-flush">
							<li className="list-group-item d-flex justify-content-between">
								<strong>Model:</strong> <span>{model}</span>
							</li>
							<li className="list-group-item d-flex justify-content-between">
								<strong>Manufacturer:</strong> <span>{manufacturer}</span>
							</li>
							<li className="list-group-item d-flex justify-content-between">
								<strong>Cost in Credits:</strong> <span>{cost_in_credits}</span>
							</li>
							<li className="list-group-item d-flex justify-content-between">
								<strong>Length:</strong> <span>{length} meters</span>
							</li>
							<li className="list-group-item d-flex justify-content-between">
								<strong>Crew:</strong> <span>{crew}</span>
							</li>
							<li className="list-group-item d-flex justify-content-between">
								<strong>Passengers:</strong> <span>{passengers}</span>
							</li>
							<li className="list-group-item d-flex justify-content-between">
								<strong>Max Speed:</strong> <span>{max_atmosphering_speed} km/h</span>
							</li>
							<li className="list-group-item d-flex justify-content-between">
								<strong>Cargo Capacity:</strong> <span>{cargo_capacity} kg</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
