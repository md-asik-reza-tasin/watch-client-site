import { Outlet, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

export default function Root() {
  const location = useLocation();

  return (
    <div>
      <div className="border-b">
        {location.pathname === "/dashboard" ? "" : <Header></Header>}
      </div>
      <div className="w-[1150px] mx-auto">
        <Outlet></Outlet>
      </div>
      {location.pathname === "/login" || location.pathname === "/register" ? "" : <Footer></Footer>}
    </div>
  );
}
