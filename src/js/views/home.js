import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="row">
			{store.characters.map((character, index) => (
				<div key={index} className="col-md-4 mb-4">
					<div className="card " style={{ width: "18rem" }}>
						<img
							src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
							className="card-img-top"
							alt={character.name}
						/>
						<div className="card-body">
							<h5 className="card-title">{character.name}</h5>
							<p className="card-text">
								{character.name} es un personaje importante en la saga de Star Wars.
							</p>
							<Link to={`/character/${character.uid}`}>
								<button className="btn btn-primary">Más información</button>
							</Link>
							<button
								className="btn btn-warning ml-2"
								onClick={() => actions.addFavorite(character)}
							>
								Añadir a Favoritos
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
