import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Characters } from "./views/characters";
import { CharacterDetail } from "../js/component/characterDetail";

import { Planets } from "./views/planets";
import { PlanetDetail } from "../js/component/planetDetail";

import { Vehicles } from "./views/vehicles";
import { VehicleDetail } from "./component/vehicleDetail";


import injectContext from "./store/appContext";

import { NavbarVertical } from "./component/navbarVertical";
import { Footer } from "./component/footer";


//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		/* Contenido dinámico a la derecha */
		<div className="content-container p-4" style={{ flexGrow: 1 }}>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<NavbarVertical />
					<Routes>
						<Route path="/characters" element={<Characters />} />
						<Route path="/character/:id" element={<CharacterDetail />} />

						<Route path="/planets" element={<Planets />} />
						<Route path="/planet/:id" element={<PlanetDetail />} />

						<Route path="/vehicles" element={<Vehicles />} />
						<Route path="/vehicle/:id" element={<VehicleDetail />} />

						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
