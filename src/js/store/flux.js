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
			characterData: [], // Detalles del personaje específico
			planets: [],
			planetData: [], // Detalles del planeta específico
			vehicles: [],
			characterFavorites: [], // Favoritos de personajes
			planetFavorites: [] // Favoritos de planetas
		},
		actions: {
			// Llamada a la API para obtener personajes
			fetchCharacters: async () => {
				const response = await fetch("https://www.swapi.tech/api/people");
				const data = await response.json();
				setStore({ characters: data.results });
			},

			// Llamada a la API para obtener detalles de un personaje específico
			fetchCharacterData: async (id) => {
				try {
					const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
					const data = await response.json();
					setStore({ characterData: data.result }); // Guardamos solo las propiedades del personaje
				} catch (error) {
					console.error("Error fetching character data:", error);
				}
			},

			// Llamada a la API para obtener planetas
			fetchPlanets: async () => {
				const response = await fetch("https://www.swapi.tech/api/planets");
				const data = await response.json();
				setStore({ planets: data.results });
			},

			// Llamada a la API para obtener detalles de un planeta específico
			fetchPlanetData: async (id) => {
				try {
					const response = await fetch(`https://www.swapi.tech/api/planets/${id}`);
					const data = await response.json();
					setStore({ planetData: data.result }); // Guardamos solo las propiedades del planeta
				} catch (error) {
					console.error("Error fetching planet data:", error);
				}
			},

			// Llamada a la API para obtener vehículos
			fetchVehicles: async () => {
				const response = await fetch("https://www.swapi.tech/api/vehicles/");
				const data = await response.json();
				setStore({ vehicles: data.results });
			},

			// Agregar a favoritos de personajes o planetas
			addToFavorites: (item, type) => {
				const store = getStore();
				const favorites = store[type + "Favorites"];
				const favoriteExists = favorites.find(fav => fav.uid === item.uid);

				// Si ya existe en favoritos, incrementamos el contador
				if (favoriteExists) {
					const updatedFavorites = favorites.map(fav => {
						if (fav.uid === item.uid) fav.count += 1;
						return fav;
					});
					setStore({ [type + "Favorites"]: updatedFavorites });
				} else {
					// Si no existe, lo añadimos con un contador inicial de 1
					const newFavorites = [...favorites, { ...item, count: 1 }];
					setStore({ [type + "Favorites"]: newFavorites });
				}
			},

			// Incrementar el contador de favoritos para personajes o planetas
			incrementFavoriteCount: (uid, type) => {
				const store = getStore();
				const favorites = store[type + "Favorites"];
				const updatedFavorites = favorites.map(favorite => {
					if (favorite.uid === uid) favorite.count += 1;
					return favorite;
				});
				setStore({ [type + "Favorites"]: updatedFavorites });
			},

			// Eliminar de favoritos (personajes o planetas)
			removeFromFavorites: (uid, type) => {
				const store = getStore();
				const updatedFavorites = store[type + "Favorites"].filter(fav => fav.uid !== uid);
				setStore({ [type + "Favorites"]: updatedFavorites });
			},

			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
