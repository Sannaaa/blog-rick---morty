import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import "./Register.css";

const Register = () => {

  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { currentUser } = useSelector(state => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
        navigate("/");
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e) => {
    const regEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("Les mots de passe ne correspondent pas");
    } else if (password.length < 8) {
      alert("Mot de passe trop court (minimum 8 caractères)");
    }
    else if (!regEx.test(email) && email !== "") {
        alert("Adresse mail invalide (erreur regEx)");
    }
    else if (password === passwordConfirm && password.length >= 8 && regEx.test(email)) {
      createUserWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      alert("Inscription réussie");
    }

  };

  return (
    <div>
      <div id="register-form">
        <form className="form-signup" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal" style={{textAlign: "center"}}>
                Inscription
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
            <input 
            type="password"
            id="inputRePassword"
            className="form-control"
            placeholder="Confirmation du mot de passe"
            name="passwordConfirm"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
            required
            />
            <button className="btn btn-secondary btn-block col-md-12 text-center" type="submit">S'inscrire</button>
            <Link to="/login">
                <i className="fas fa-angle-left"></i> Retour à la page de connexion
            </Link>
        </form>
      </div>
    </div>
  )
}

export default Register;
export const regEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;