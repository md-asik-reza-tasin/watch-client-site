import { createUserWithEmailAndPassword } from "firebase/auth";
import { createContext } from "react";
import { auth } from "../firebase.config";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {


    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }


  const info = { createUser };
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
}
