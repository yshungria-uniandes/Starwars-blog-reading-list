const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			characters: [],
			characterData: [],
			planets: [],
			planetData: [],
			vehicles: [], // Almacenar la lista de vehículos
			vehicleData: [], // Almacenar los detalles de un vehículo específico
			characterFavorites: [],
			planetFavorites: [],
			vehicleFavorites: [] // Favoritos de vehículos
		},
		actions: {
			// Obtener lista de personajes
			fetchCharacters: async () => {
				const response = await fetch("https://www.swapi.tech/api/people");
				const data = await response.json();
				setStore({ characters: data.results });
			},

			// Obtener detalles de un personaje específico
			fetchCharacterData: async (id) => {
				try {
					const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
					const data = await response.json();
					setStore({ characterData: data.result });
				} catch (error) {
					console.error("Error fetching character data:", error);
				}
			},

			// Obtener lista de planetas
			fetchPlanets: async () => {
				const response = await fetch("https://www.swapi.tech/api/planets");
				const data = await response.json();
				setStore({ planets: data.results });
			},

			// Obtener detalles de un planeta específico
			fetchPlanetsData: async (id) => {
				try {
					const response = await fetch(`https://www.swapi.tech/api/planets/${id}`);
					const data = await response.json();
					setStore({ planetData: data.result });
				} catch (error) {
					console.error("Error fetching planet data:", error);
				}
			},

			// Obtener lista de vehículos
			fetchVehicles: async () => {
				const response = await fetch("https://www.swapi.tech/api/vehicles");
				const data = await response.json();
				setStore({ vehicles: data.results });
			},

			// Obtener detalles de un vehículo específico
			fetchVehicleData: async (id) => {
				try {
					const response = await fetch(`https://www.swapi.tech/api/vehicles/${id}`);
					const data = await response.json();
					setStore({ vehicleData: data.result });
				} catch (error) {
					console.error("Error fetching vehicle data:", error);
				}
			},

			// Agregar a favoritos (personajes, planetas o vehículos)
			addToFavorites: (item, type) => {
				const store = getStore();
				const favorites = store[type + "Favorites"];
				const favoriteExists = favorites.find(fav => fav.uid === item.uid);

				if (favoriteExists) {
					const updatedFavorites = favorites.map(fav => {
						if (fav.uid === item.uid) fav.count += 1;
						return fav;
					});
					setStore({ [type + "Favorites"]: updatedFavorites });
				} else {
					const newFavorites = [...favorites, { ...item, count: 1 }];
					setStore({ [type + "Favorites"]: newFavorites });
				}
			},

			// Incrementar el contador de favoritos (para personajes, planetas o vehículos)
			incrementFavoriteCount: (uid, type) => {
				const store = getStore();
				const favorites = store[type + "Favorites"];
				const updatedFavorites = favorites.map(favorite => {
					if (favorite.uid === uid) favorite.count += 1;
					return favorite;
				});
				setStore({ [type + "Favorites"]: updatedFavorites });
			},

			// Eliminar de favoritos (personajes, planetas o vehículos)
			removeFromFavorites: (uid, type) => {
				const store = getStore();
				const updatedFavorites = store[type + "Favorites"].filter(fav => fav.uid !== uid);
				setStore({ [type + "Favorites"]: updatedFavorites });
			}
		}
	};
};

export default getState;
