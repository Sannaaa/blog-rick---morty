import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from './Badges.module.scss';
import Table from "./Table";
import { useSelector } from "react-redux";
import { db } from "../../Firebase";
import { doc, setDoc } from "firebase/firestore";

const BadgeDetails = () => {

  const { currentUser } = useSelector(state => state.user);

  const date = new Date();

  const writeToDatabase = async(e) => {
    e.preventDefault();
    await setDoc(doc(db, `${currentUser.uid}`, `${id}`), {
        id: id,
        name: name,
        image: image,
        created: date
    });
    alert("Personnage ajouté aux favoris");
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

      if (currentUser) {
        return (
          <div className="container d-flex justify-content-center mb-5">
              <div className="d-flex flex-column gap-3">
                  <h1 className="text-center fw-bold">{name}</h1>
                  <img src={image} alt="" className={`${style.imgDetailed} img-fluid mb-4`}></img>
                  <button className={`btn btn-success fw-bold mb-3 ${style.btnDetail}`} onClick={writeToDatabase}>Ajouter aux favoris</button>
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
      } else {
        return (
          <div className="container d-flex justify-content-center mb-5">
              <div className="d-flex flex-column gap-3">
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
      }


};

export default BadgeDetails;