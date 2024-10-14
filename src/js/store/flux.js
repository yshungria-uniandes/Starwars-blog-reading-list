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
			vehicles: [],
			favorites: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},

			fetchCharacters: async () => {
				const response = await fetch("https://www.swapi.tech/api/people");
				const data = await response.json();
				console.log(data.results);
				setStore({ characters: data.results });

			},

			fetchCharacterData: async (id) => {
				try {
				  const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
				  const data = await response.json();
				  console.log(data.result);
				  setStore({ characterData: data.result }); // Guardamos solo las propiedades del personaje
				} catch (error) {
				  console.error("Error fetching character data:", error);
				}
			  },
			  

			fetchPlanets: async () => {
				const response = await fetch("https://www.swapi.tech/api/planets");
				const data = await response.json();
				console.log(data.results);
				setStore({ planets: data.results });
			},

			fetchVehicles: async () => {
				const response = await fetch("https://www.swapi.tech/api/vehicles/");
				const data = await response.json();
				console.log(data.results);
				setStore({ vehicles: data.results });
			},

			fetchCharactersData: async (id) => {
				const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
				const data = await response.json();
				console.log(data.result);
				setStore({ characters: data.result });
			},

			fetchPlanetsData: async (id) => {
				const response = await fetch(`https://www.swapi.tech/api/planets/${id}`);
				const data = await response.json();
				console.log(data.result);
				setStore({ planets: data.result });
			},

			fetchVehiclesData: async (id) => {
				const response = await fetch(`https://www.swapi.tech/api/vehicles/${id}`);
				const data = await response.json();
				console.log(data.result);
				setStore({ vehicles: data.result });
			},

			addToFavorites: (favorite) => {
				const store = getStore();
				const favorites = store.favorites.concat(favorite);
				setStore({ favorites: favorites });
			},

			incrementFavoriteCount: (uid) => {
				const store = getStore();
				const favorites = store.favorites.map(favorite => {
					if (favorite.uid === uid) favorite.count += 1;
					return favorite;
				});
				
				setStore({ favorites: favorites });
			},

			removeFromFavorites: (index) => {
				const store = getStore();
				const favorites = store.favorites.filter((favorite, i) => i !== index);
				setStore({ favorites: favorites });
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
