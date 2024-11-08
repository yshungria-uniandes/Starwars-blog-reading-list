import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';



export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="d-flex justify-content-between" >
            <Link to="/characters">
                <div className="card d-flex flex-column justify-content-between" style={{ width: "18rem", height: "30rem" }}>
                    <img src={`https://starwars-visualguide.com/assets/img/characters/${store.characters && store.characters.length > 0 && store.characters[Math.floor(Math.random() * store.characters.length)].uid}.jpg`} className="card-img-top" alt="..." />
                    <div className="card-body d-flex align-items-end justify-content-center mt-auto h-100">
                        <h5 className="card-title">Characters</h5>
                    </div>
                </div>
            </Link>
            <Link to="/planets">
                <div className="card d-flex flex-column justify-content-between" style={{ width: "18rem", height: "30rem" }}>

                    <img src={`https://starwars-visualguide.com/assets/img/planets/${store.planets && store.planets.length > 0 && store.planets[Math.floor(Math.random() * store.planets.length)].uid}.jpg`} className="card-img-top" alt="..." />
                    <div className="card-body d-flex align-items-end justify-content-center mt-auto h-100">
                        <h5 className="card-title mt-auto">Planets</h5>
                    </div>

                </div>
            </Link>
            <Link to="/vehicles">
                <div className="card d-flex flex-column justify-content-between" style={{ width: "18rem", height: "30rem" }}>

                    <img src={`https://starwars-visualguide.com/assets/img/characters/${store.vehicles && store.vehicles.length > 0 && store.vehicles[Math.floor(Math.random() * store.vehicles.length)].uid}.jpg`} className="card-img-top" alt="..." />
                    <div className="card-body d-flex align-items-end justify-content-center mt-auto h-100">
                        <h5 className="card-title">Vehicles</h5>
                    </div>
                </div>
            </Link>
        </div>
    )
}