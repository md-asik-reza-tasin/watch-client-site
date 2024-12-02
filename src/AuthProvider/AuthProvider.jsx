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
import { getMyItem } from "../localStorage";

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
  const [updatedItem, setUpdatedItem] = useState(null);
  const [myItems, setMyItems] = useState([]);
  const [addToCartReload, setAddToCartReload] = useState([]);
  const [ls, setLs] = useState([]);
  const [totalOrderedItems, setTotalOrderedItems] = useState([]);

  // console.log(allUsers);

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
      console.log(user);
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
  }, [addItem, updatedItem]);

  useEffect(() => {
    fetch("http://localhost:5000/slider")
      .then((res) => res.json())
      .then((data) => setPhotos(data));
  }, [updated]);

  useEffect(() => {
    if (allItems.length) {
      const total = [];
      const myItemFromLocalStorage = getMyItem("id");
      for (let id of myItemFromLocalStorage) {
        const totalAddedItem = allItems.find((item) => item._id === id);
        total.push(totalAddedItem);
      }
      setMyItems(total);
    }
  }, [addToCartReload, allItems, ls]);

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  // console.log(logInUser);
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
    setUpdatedItem,
    myItems,
    setAddToCartReload,
    addToCartReload,
    setMyItems,
    setLs,
    totalOrderedItems,
  };
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
}
