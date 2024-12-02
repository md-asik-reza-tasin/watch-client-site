import { useContext } from "react";
import { CgWebsite } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { RiUserStarLine } from "react-icons/ri";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function SideBarOfDashboard() {
  const { logInUser } = useContext(AuthContext);

  // console.log(logInUser)

  const sideBar = (
    <>
      <NavLink
        to="/dashboard"
        className="flex items-center gap-3 my-5"
      >
        Dashboard{" "}
        <span>
          <MdDashboard className="text-white" />
        </span>
      </NavLink>
      <NavLink to="/dashboard/users" className="flex items-center gap-3 my-5">
        Users{" "}
        <span>
          <FaUserGroup className="text-white" />
        </span>
      </NavLink>
      <NavLink to="/dashboard/profile" className="flex items-center gap-3 my-5">
        My Profile{" "}
        <span>
          <FaRegUser className="text-white" />
        </span>
      </NavLink>
      <NavLink to="/dashboard/additem" className="flex items-center gap-3 my-5">
        Add Item{" "}
        <span>
          <IoMdAddCircleOutline className="text-white" />
        </span>
      </NavLink>
      <NavLink to="/dashboard/slider" className="flex items-center gap-3 my-5">
        Slider{" "}
        <span>
          <TfiLayoutSliderAlt />
        </span>
      </NavLink>
      <NavLink to="/dashboard/reviews" className="flex items-center gap-3 my-5">
        Reviews{" "}
        <span>
          <RiUserStarLine className="text-white" />
        </span>
      </NavLink>
      <NavLink to="/" className="flex items-center gap-3 my-5">
        Website{" "}
        <span>
          <CgWebsite className="text-white" />
        </span>
      </NavLink>
    </>
  );

  return (
    <div className="bg-gray-800 text-white font-secondFont p-10 h-screen">
      <div className="avatar flex items-center gap-6">
        <div className="w-20 rounded-full ring ring-offset-2 text-white">
          <img src={logInUser?.file || logInUser?.photoURL} />
        </div>
        <p>Name</p>
      </div>
      <div className="mt-20">
        <ul>{sideBar}</ul>
      </div>
    </div>
  );
}
