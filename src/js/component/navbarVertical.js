import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbarVertical.css";

export const NavbarVertical = () => {
  return (
    <div className="navbar-vertical">
      <h4 className="pb-3 text-center">Star Wars</h4>
      <ul className="p-5 nav flex-column">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Characters
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/vehicles" className="nav-link">
            Vehicles
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/planets" className="nav-link">
            Planets
          </Link>
        </li>
      </ul>
    </div>
  );
};


