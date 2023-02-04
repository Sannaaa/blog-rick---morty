import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJYh_l3vhAW5aGNmXPTS3dca10KTcVe2w",
  authDomain: "blog-rick-morty-3acf3.firebaseapp.com",
  projectId: "blog-rick-morty-3acf3",
  storageBucket: "blog-rick-morty-3acf3.appspot.com",
  messagingSenderId: "122343852029",
  appId: "1:122343852029:web:9f5ffd03755e4fbdd73b94"
};

  const app = initializeApp(firebaseConfig);

  const auth = getAuth();
  const db = getFirestore(app);

  export { auth, db };
