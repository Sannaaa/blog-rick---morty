import React from "react";
import { NavLink, Link } from "react-router-dom";
import '../../App.css';
import { useDispatch, useSelector } from "react-redux";
import { logoutInitiate } from "../../Redux/Actions";

const NavBarAccount = () => {
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();
  
    const handleAuth = () => {
      if (currentUser) {
        dispatch(logoutInitiate());
      }
    };
  
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
    <div className="container">
      <Link to="/" className="fs-2 gotham fw-bold navbar-brand">
          <span className="text-secondary">Blog</span> - Rick & Morty
      </Link>
  
      <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation">
      
      <style jsx>
          {`
          button[aria-expanded="false"] > .close {
              display: none;
          }
  
          button[aria-expanded="true"] > .open {
              display: none;
          }
          `}
      </style>
      <i class="fas fa-bars open fw-bold text-dark"></i>
      <i class="fas fa-times close fw-bold text-dark"></i>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
      <h4 className="text-center fw-bold mx-auto">Email connecté : </h4><h4 className="text-secondary text-center fw-bold mx-auto">{currentUser.email}</h4>
        <Link to="login" className="navbar-brand">
            <button className="btn btn-danger navbar-brand" onClick={handleAuth}>Déconnexion</button>
        </Link>
      </div>
  
      <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
        <div className="navbar-nav fs-5">
          <NavLink to="episodes" className="nav-link">Épisodes</NavLink>
          <NavLink to="favoris" className="nav-link">Favoris</NavLink>
        </div>
      </div>
      
    </div>
  </nav>);
  };
  
  export default NavBarAccount;
  
