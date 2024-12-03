import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { AiOutlineLogout } from "react-icons/ai";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { getMyItem, pushInArray } from "../localStorage";

export default function Header() {
  const { logInUser, logOut, myItems, setMyItems, setLs, setTotal, total } =
    useContext(AuthContext);
  const [allItemTotal, setAllItemTotal] = useState(0);

  // console.log(myItems);

  const items = (
    <>
      <NavLink to="/">Home</NavLink>
      {logInUser && <NavLink to="/dashboard">Dashboard</NavLink>}
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

  const handlePlus = (id) => {
    // const a = [...myItems];
    setMyItems(() =>
      myItems.map((item) =>
        item._id === id
          ? { ...item, quantity: parseInt(item.quantity) + 1 }
          : item
      )
    );

    console.log(myItems);
  };

  const handleMinus = (id) => {
    const b = [...myItems];
    setMyItems(
      b.map((item) =>
        item._id === id
          ? { ...item, quantity: parseInt(item.quantity - 1) }
          : item
      )
    );
  };

  useEffect(() => {
    const totalResult = myItems.reduce(
      (acc, item) => acc + item?.price * item?.quantity,
      0
    );

    setTotal(totalResult);
  }, [myItems]);

  const handleDeleteFromLs = (id) => {
    const remainningId = getMyItem("id");
    const remain = remainningId.filter((item) => item !== id);
    localStorage.setItem("id", JSON.stringify(remain));
    setLs(remain);
  };

  //CONFIRM ORDER

  const handleConfirmOrder = () => {
    const idForOrderDataBase = myItems.map((item) => item._id);

    console.log(logInUser);


    const order = {
      userName: logInUser.email,
      orderConfirmList: idForOrderDataBase,
      totalPrice: total,
      name: logInUser.displayName,
    };

   

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId || data.modifiedCount) {
          toast.success("CONFIRMATION ACCEPTED!");
        }
      });
  };

  // console.log(myItems)

  // console.log(myItems);
  return (
    <div className="navbar bg-base-100 py-5 w-[1150px] mx-auto">
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
        <div>
          <div className="drawer drawer-end mr-5">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer-4">
                <div className="indicator">
                  {myItems.length > 0 ? (
                    <span className="indicator-item badge bg-red-500 text-white">
                      {myItems.length}
                    </span>
                  ) : (
                    <></>
                  )}
                  <FaShoppingCart className="size-10" />
                </div>
              </label>
            </div>
            <div className="drawer-side z-10">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <h1 className="text-center font-bold text-2xl p-5 italic">
                  MY ADDED ITEMS
                </h1>
                <h1 className="text-center">TOTAL PRICES : {total}</h1>
                {myItems.map((addItem, idx) => (
                  <div key={idx} className="relative card card-side">
                    <figure>
                      <img
                        src={addItem?.image}
                        className="w-24 ml-2"
                        alt="Movie"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{addItem?.watch}</h2>
                      <h1 className="font-semibold text-orange-500">
                        ${addItem?.price * addItem?.quantity}
                      </h1>
                      <div className="flex items-center mt-10">
                        <p>
                          <FaPlus
                            onClick={() =>
                              addItem?.quantity < 10 && handlePlus(addItem._id)
                            }
                          ></FaPlus>
                        </p>

                        <p>{addItem?.quantity}</p>

                        <p>
                          <FaMinus
                            onClick={() =>
                              addItem?.quantity > 1 && handleMinus(addItem._id)
                            }
                          ></FaMinus>
                        </p>
                      </div>
                    </div>
                    <p
                      onClick={() => handleDeleteFromLs(addItem?._id)}
                      className="absolute w-5 h-5 bg-red-600 opacity-80 rounded-full text-center right-0 top-0"
                    >
                      X
                    </p>
                  </div>
                ))}
                <button
                  onClick={handleConfirmOrder}
                  className="btn btn-outline px-5 py-2 rounded-none"
                >
                  ORDER
                </button>
              </ul>
            </div>
          </div>
        </div>
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
