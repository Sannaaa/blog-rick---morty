import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from './Badges.module.scss';
import Table from "./Table";
import wh from "./Images/wh.png";
import rh from "./Images/rh.png";
import SetCookie from "../Cookies/SetCookie";
import GetCookie from "../Cookies/GetCookie";
import RemoveCookie from "../Cookies/RemoveCookie";
import Favoris from "../../Pages/Favoris";

const BadgeDetails = () => {

  const handleClick = () => {
    
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

    let {id} = useParams();
    let [fetchedData, updateFetchedData] = useState([]);
    let [results, setResults] = useState([]);
    let { name, image, origin, gender, status, type } = fetchedData;

    let api = `https://rickandmortyapi.com/api/character/${id}`;

    useEffect(() => {
        (async function () {
          let data = await fetch(api).then((res) => res.json());
          updateFetchedData(data);

          let a = await Promise.all(
            data.episode.map((x) => {
              return fetch(x).then(res => res.json());
            })
          );
          setResults(a);
        })();
      }, [api]);

      let displayImage = document.getElementById(`image${id}`);

    return (
        <div className="container d-flex justify-content-center mb-5">
            <div className="d-flex flex-column gap-3">
            <img id={`image${id}`} className={`${style.btnDetail}`} src={wh} alt="" onClick={handleClick}></img>
                <h1 className="text-center fw-bold">{name}</h1>
                <img src={image} alt="" className={`${style.imgDetailed} img-fluid mb-4`}></img>
        <div className="content">
          <div className="text-center fs-4">
            <span className="fw-bold">Status : </span>
            {status}
          </div>
          <div className="text-center fs-4">
            <span className="fw-bold">Sexe : </span>
            {gender}
          </div>
          <div className="text-center fs-4">
            <span className="fw-bold">Type : </span>
            {type === "" ? "Inconnu" : type}
          </div>
          <div className="text-center fs-4 mb-5">
            <span className="fw-bold">Origine : </span>
            {origin?.name}
          </div>
          <div className="text-center">
            <span className={"fw-bold fs-2 text-decoration-underline"}>Liste des épisodes : </span>
            <Table results={results}/></div>
          </div>
            </div>

        </div>
    );
};

export default BadgeDetails;