// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrCw3hJwfqarT9rWzV1VMIUs_GxSRaCqw",
  authDomain: "watch-website-a8d1d.firebaseapp.com",
  projectId: "watch-website-a8d1d",
  storageBucket: "watch-website-a8d1d.firebasestorage.app",
  messagingSenderId: "666836340407",
  appId: "1:666836340407:web:a98004aafafb04b02b4732"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);