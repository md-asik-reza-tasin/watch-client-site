import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { AiOutlineLogout } from "react-icons/ai";

export default function Header() {
  const { logInUser, logOut } = useContext(AuthContext);

  const items = (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
    </>
  );

  const handleSignOut = () => {
    logOut()
      .then((result) => {
        toast.success("SIGN OUT SUCCESSFULLY!");
      })
      .then((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="navbar bg-base-100 py-5 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {items}
          </ul>
        </div>
        <Link className="text-xl font-secondFont italic font-extrabold">
          My Watch
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-5 font-secondFont font-semibold">
          {items}
        </ul>
      </div>
      <div className="navbar-end">
        {logInUser ? (
          <>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="m-1">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={logInUser.photoURL} />
                  </div>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <button onClick={handleSignOut}>
                    Sign Out <AiOutlineLogout />
                  </button>{" "}
                </li>
              </ul>
            </div>

            {/* {" "}
            <button onClick={handleSignOut}>Sign Out</button>{" "}
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={logInUser.photoURL} />
              </div>
            </div>{" "} */}
          </>
        ) : (
          <NavLink to="/login">
            <button className="btn btn-sm bg-orange-500 rounded-none">
              Log in
            </button>
          </NavLink>
        )}
      </div>
    </div>
  );
}
