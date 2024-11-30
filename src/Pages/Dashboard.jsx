import { Outlet } from "react-router-dom";
import SideBarOfDashboard from "../ComponentsOfDashboard/SideBarOfDashboard";


export default function Dashboard() {
  
  return (
    <div className="grid grid-cols-5 h-[640px]">
      <SideBarOfDashboard></SideBarOfDashboard>
      <div className="col-span-4">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
