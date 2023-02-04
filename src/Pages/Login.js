import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import "./Login.css";

const Login = () => {

  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { currentUser } = useSelector(state => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
        navigate("/");
    }
  }, [currentUser, navigate])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
        return;
    }
      signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");

  };

  return (
    <div>
      <div id="logreg-forms">
        <form className="form-signin" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal" style={{textAlign: "center"}}>
                Connexion
            </h1>
            <input 
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Adresse mail"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            />
            <input 
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Mot de passe"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            />
            <button className="btn btn-secondary btn-block col-md-12 text-center" type="submit">Se connecter</button>
            <hr />
            <Link to="/register">
                <button className="btn btn-secondary btn-block col-md-12 text-center" type="button" id="btn-signup">Inscription</button>
            </Link>
        </form>
      </div>
    </div>
  )
}

export default Login;
