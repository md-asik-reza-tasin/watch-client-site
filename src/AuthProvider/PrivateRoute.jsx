import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const location = useLocation();
  console.log(location);

  const { logInUser, loading } = useContext(AuthContext);
  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  } else if (logInUser) {
    return <div>{children}</div>;
  } else {
    return <Navigate to="/login" state={location.pathname}></Navigate>;
  }
}
