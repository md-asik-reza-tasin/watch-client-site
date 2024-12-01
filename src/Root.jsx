import { Outlet, useLocation } from "react-router-dom";
import Header from "./Components/Header";

export default function Root() {
  const location = useLocation();

  return (
    <div className="w-[1150px] mx-auto">
      {location.pathname === "/dashboard" ? "" : <Header></Header>}
      <Outlet></Outlet>
      
    </div>
  );
}
