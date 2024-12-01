import { Outlet } from "react-router-dom";
import SideBarOfDashboard from "../ComponentsOfDashboard/SideBarOfDashboard";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-5 min-h-screen">
      <div className="sticky top-0 h-screen">
        <SideBarOfDashboard></SideBarOfDashboard>
      </div>

      <div className="col-span-4">
        <Outlet></Outlet>
      </div>

    </div>
  );
}
