import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { db } from "../Firebase";
import { useSelector } from "react-redux";
import { collection, getDocs, getDoc, doc, query, orderBy } from "firebase/firestore";
import FavBadges from "../components/Badges/FavBadges";

const Favoris = () => {

  const { currentUser } = useSelector(state => state.user);

  const [data, setData] = useState([]);

    const fetchFavorites = async () => {
      let list = [];
      const querySnapshot = await getDocs(query(collection(db, `${currentUser.uid}`), orderBy("created", "desc")));
      querySnapshot.forEach((doc) => {
        list.push({id: doc.id, ...doc.data()});
      });
      setData(list);
    }
    fetchFavorites();

  if (data.length === 0) {

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

  } else {

    return (
      <div className="">
        <h1 className="text-center mb-5 fw-bold">Favoris</h1>
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

  }


};

export default Favoris;
