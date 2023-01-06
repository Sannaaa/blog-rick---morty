import React, { useState, useEffect } from "react";
import Badges from "../components/Badges/Badges";
import InputGroup from "../components/Filters/InputGroup";

const Episodes = () => {

  let [id, setID] = useState(1);
  let [info, setInfo] = useState([]);
  let [results, setResults] = useState([]);
  let { air_date, name, episode } = info;
  let api = `https://rickandmortyapi.com/api/episode/${id}`;

  useEffect(() => {

    (async function() {
      let data = await fetch(api).then(res => res.json());
      setInfo(data);

      let a = await Promise.all(
        data.characters.map((x) => {
          return fetch(x).then(res => res.json());
        })
      );
      setResults(a);
    })();

  }, [api]);

  return (
    <div className="container">
      <div className="row mb-4">
        <h1 className="text-center mb-3">Nom de l'épisode : <span className="text-secondary"> "{name === "" ? "Inconnu" : name}"</span></h1>
        <h4 className="text-center mb-3">Code de l'épisode : <span className="text-secondary"> {episode === "" ? "Inconnu" : episode}</span></h4>
        <h4 className="text-center mb-3">Date de diffusion : <span className="text-secondary">{air_date === "" ? "Inconnu" : air_date}</span></h4>
        </div>
      <div className="row">
        <div className="col-lg-3"><h5 className="text-center mb-4">Choisir un épisode</h5>
        <InputGroup setID={setID} name="Épisode" total={51}/>
        </div>
        <div className="col-lg-8 col-12">
          <div className="row" align="center"><Badges page="/episodes/" results={results}/></div>
        </div>
      </div>
    </div>
  );
};

export default Episodes;