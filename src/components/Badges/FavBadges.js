import React, { useState } from "react";
import style from "./Badges.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { db } from "../../Firebase";
import { addDoc, collection, doc, setDoc, deleteDoc } from "firebase/firestore";

const FavBadges = ({ results, page }) => {

    const { currentUser } = useSelector(state => state.user);

    let display;

    if (results) {
        display = results.map(x=>{
            let { id, name, image } = x;

              const handleDelete= async () => {
                await deleteDoc(doc(db, `${currentUser.uid}`, `${id}` ));
                alert("Personnage retiré des favoris");
              };

              if (currentUser) {
                return(
                    <div className="col-lg-4 col-md-6 col-12 mb-3 position-relative text-dark">
                        <div className={`${style.cards} mb-5 d-flex flex-column justify-content-center`}>
                            <img className={`${style.img} img-fluid`} src={image} alt="" />
                            <div style={{padding: "5px"}} className="content">
                                <div className="fs-4 fw-bold mb-3">{name}</div>
                                <Link style={{textDecoration: "none"}}
                                to = {`${page}${id}`}
                                key={id}>
                                <h5 className="text-secondary mb-4">Fiche</h5>
                                </Link>
                                <button className={`btn btn-danger fw-bold`} onClick={handleDelete}>Retirer des favoris</button>
                            </div>
                        </div>
                    </div>
                    );
              } else {
                return(
                    <div className="col-lg-4 col-md-6 col-12 mb-3 position-relative text-dark">
                        <div className={`${style.cards} mb-5 d-flex flex-column justify-content-center`}>
                            <img className={`${style.img} img-fluid`} src={image} alt="" />
                            <div style={{padding: "5px"}} className="content">
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
              }
        });
    } else {
        display = "No Characters Found";
    }

  return <>{display}</>;
};

export default FavBadges;