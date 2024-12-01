import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { data } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [logInUser, setLogInUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [google, setGoogle] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [addItem, setAddItem] = useState(null);
  const [singleItem, setSingleItem] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [updated, setUpdated] = useState(null);

  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const createAccountByGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubs = onAuthStateChanged(auth, (user) => {
      setLogInUser(user);
      setLoading(false);
    });

    return () => unsubs();
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, [logInUser, google]);

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => res.json())
      .then((data) => setAllItems(data));
  }, [addItem]);

  useEffect(() => {
    fetch("http://localhost:5000/slider")
      .then((res) => res.json())
      .then((data) => setPhotos(data));
  }, [updated]);

  console.log(logInUser);
  const info = {
    createUser,
    logIn,
    logInUser,
    allUsers,
    logOut,
    loading,
    setAllUsers,
    createAccountByGoogle,
    setGoogle,
    allItems,
    setAllItems,
    setAddItem,
    singleItem,
    setSingleItem,
    photos,
    setPhotos,
    setUpdated,
    updated,
  };
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
}
