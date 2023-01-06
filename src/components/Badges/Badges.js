import React from "react";
import style from "./Badges.module.scss";
import { Link } from "react-router-dom";
import wh from "./Images/wh.png";
import rh from "./Images/rh.png";
import SetCookie from "../Cookies/SetCookie";
import GetCookie from "../Cookies/GetCookie";
import RemoveCookie from "../Cookies/RemoveCookie";

const Badges = ({ results, page }) => {

    let display;

    if (results) {
        display = results.map(x=>{
            let { id, name, image } = x;

            const handleClick = () => {
                let displayImage = document.getElementById(`image${id}`);
                if (displayImage.src.match(wh)) {
                    displayImage.src = rh;
                    SetCookie(`${id}`, id);
                    SetCookie(`${name}`, name);
                } else {
                    displayImage.src = wh;
                    RemoveCookie(`${id}`);
                    RemoveCookie(`${name}`);
                }
              };

            return(
            <div className="col-lg-4 col-md-6 col-12 mb-3 position-relative text-dark">
                <div className={`${style.cards} mb-5 d-flex flex-column justify-content-center`}>
                    <img className={`${style.img} img-fluid`} src={image} alt="" />
                    <div style={{padding: "5px"}} className="content">
                        <img id={`image${id}`} className={`${style.btn}`} src={wh} alt="" onClick={handleClick}></img>
                        <div className="fs-4 fw-bold mb-3">{name}</div>
                        <Link style={{textDecoration: "none"}}
                        to = {`${page}${id}`}
                        key={id}>
                        <h5 className="text-secondary">Fiche</h5>
                        </Link>
                    </div>
                </div>
            </div>
            );
        });
    } else {
        display = "No Characters Found";
    }

  return <>{display}</>;
};

export default Badges;