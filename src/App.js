import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Badges from "./components/Badges/Badges";
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Episodes from './Pages/Episodes';
import Favoris from './Pages/Favoris';
import BadgeDetails from "./components/Badges/BadgeDetails";

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/:id" element={<BadgeDetails />}/>

        <Route path="/episodes" element={<Episodes />}/>
        <Route path="/episodes/:id" element={<BadgeDetails />}/>

        <Route path="/favoris" element={<Favoris />}/>
        <Route path="/favoris/:id" element={<BadgeDetails />}/>
      </Routes>

    </Router>
  );
}

const Home = () => {

  let [id] = useState(Math.floor(Math.random() * (826 - 1) + 1));
  let [id2] = useState(Math.floor(Math.random() * (826 - 1) + 1));
  let [id3] = useState(Math.floor(Math.random() * (826 - 1) + 1));
  let [id4] = useState(Math.floor(Math.random() * (826 - 1) + 1));
  let [id5] = useState(Math.floor(Math.random() * (826 - 1) + 1));
  let [results, setResults] = useState([]);

  let api = `https://rickandmortyapi.com/api/character/${id},${id2},${id3},${id4},${id5}`;

  useEffect(() => {

    (async function() {
      let data = await fetch(api).then(res => res.json());
      setResults(data);
    })();

  }, [api]);

  return (
    <div className="App">
      <h1 className="text-center mb-5 fw-bold">Personnages</h1>

      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="row justify-content-md-center" align="center">
              <Badges page="/" results={results}/>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-center mb-5 fw-bold">Favoris</h1>
    </div>
  );
};

export default App;