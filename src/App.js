import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Badges from "./components/Badges/Badges";
import NavBar from './components/Navbar/NavBar';
import NavBarAccount from "./components/Navbar/NavBarAccount";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Episodes from './Pages/Episodes';
import Favoris from './Pages/Favoris';
import BadgeDetails from "./components/Badges/BadgeDetails";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "./Firebase";
import { setUser } from "./Redux/Actions";
import FavDetails from "./components/Badges/FavDetails";
import FavBadges from "./components/Badges/FavBadges";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);

    if (currentUser) {
      return (
        <BrowserRouter>
          <div className="App">
          <NavBarAccount />
          </div>
        
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/:id" element={<BadgeDetails />}/>
    
            <Route path="/episodes" element={<Episodes />}/>
            <Route path="/episodes/:id" element={<BadgeDetails />}/>
    
            <Route path="/favoris" element={<Favoris />}/>
            <Route path="/favoris/:id" element={<FavDetails />}/>
    
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>

          </Routes>
    
        </BrowserRouter>
      );
    } else {
      return (
        <BrowserRouter>
          <div className="App">
          <NavBar />
          </div>
        
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/:id" element={<BadgeDetails />}/>
    
            <Route path="/episodes" element={<Episodes />}/>
            <Route path="/episodes/:id" element={<BadgeDetails />}/>
    
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>

          </Routes>
    
        </BrowserRouter>
      );
    }


}

const Home = () => {

  const { currentUser } = useSelector(state => state.user);

  let [id] = useState(Math.floor(Math.random() * (826 - 1) + 1));
  let [id2] = useState(Math.floor(Math.random() * (826 - 1) + 1));
  let [id3] = useState(Math.floor(Math.random() * (826 - 1) + 1));
  let [id4] = useState(Math.floor(Math.random() * (826 - 1) + 1));
  let [id5] = useState(Math.floor(Math.random() * (826 - 1) + 1));
  let [results, setResults] = useState([]);

  const [data, setData] = useState([]);

  let api = `https://rickandmortyapi.com/api/character/${id},${id2},${id3},${id4},${id5}`;

  useEffect(() => {

    (async function() {
      let data = await fetch(api).then(res => res.json());
      setResults(data);
    })();

  }, [api]);

    const fetchFavorites = async () => {
        let list = [];
        const querySnapshot = await getDocs(query(collection(db, `${currentUser.uid}`), orderBy("created", "desc")));
        querySnapshot.forEach((doc) => {
          list.push({id: doc.id, ...doc.data()});
          list.length = Math.min(5, list.length);
        });
        setData(list);
    }
    fetchFavorites();

  if (currentUser) {
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
        <h1 className="text-center mb-5 fw-bold">Favoris les plus récents</h1>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-12">
              <div className="row justify-content-md-center" align="center">
              <FavBadges page="/favoris/" results={data}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  } else {
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
      </div>
    );
  }

};

export default App;