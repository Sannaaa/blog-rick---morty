import React from "react";
import { Link, useParams } from "react-router-dom";
import SetCookie from "../components/Cookies/SetCookie";
import GetCookie from "../components/Cookies/GetCookie";
import RemoveCookie from "../components/Cookies/RemoveCookie";
import Badges from "../components/Badges/Badges";
import style from "../components/Badges/Badges.module.scss";
import BadgeDetails from "../components/Badges/BadgeDetails";

const Favoris = () => {

  let cookieID = GetCookie(29);
  let cookieName = GetCookie("name");

    if (cookieID) {
            return (
              <div>
              </div>
            );
          
  
} else {
  return (
    <div className="">
      <h1 className="text-center fs-1 fw-bold mb-5">
        Aucun favoris
        </h1>
        <Link style={{textDecoration: "none"}}
        to = {"/episodes"}>
      <h4 className="text-center text-secondary text-decoration-underline">Liste des épisodes</h4>
      </Link>
    </div>
  );
}
};

export default Favoris;
