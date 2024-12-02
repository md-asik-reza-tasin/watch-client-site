import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FaDeleteLeft, FaUserGroup } from "react-icons/fa6";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { MdDelete, MdOutlineWatch } from "react-icons/md";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import TotalOrderForAdmin from "./TotalOrderForAdmin";

export default function MainDashBoard() {
  const {
    allItems,
    setAllItems,
    allUsers,
    singleItem,
    setSingleItem,
    setUpdatedItem,
  } = useContext(AuthContext);
  // console.log(allItems);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/items/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          toast.success("DELETED ITEM");
          const remaining = allItems.filter((item) => item._id !== id);
          setAllItems(remaining);
        }
      });
  };

  const handleSingleItem = (id) => {
    fetch(`http://localhost:5000/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleItem(data);
        // console.log(data);
      });
  };

  const handleSingleUpdate = (e) => {
    e.preventDefault();

    const form = e.target;

    const watch = form.watchName.value;
    const brand = form.brand.value;
    const price = form.price.value;
    const image = form.image.value;
    const category = form.category.value;
    const stock = form.stock.value;
    const warranty = form.warranty.value;
    const description = form.description.value;

    // console.log(e);

    const itemInfo = {
      watch,
      brand,
      price,
      image,
      category,
      stock,
      warranty,
      description,
    };

    console.log(itemInfo);

    fetch(`http://localhost:5000/items/${singleItem._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(itemInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("UPDATED");
        setUpdatedItem(data);
      });
  };

  return (
    <div className="px-5">
      <div className="flex justify-between">
        <div className="border m-10 w-[500px] h-[200px] hover:shadow-xl  text-center">
          <h1 className="mt-5 text-gray-400 font-bold">TOTAL ITEMS</h1>
          <p className="mt-5 mb-4 font-secondFont font-extrabold text-gray-500 text-7xl">
            {allItems.length}
          </p>
          <div className="flex items-center justify-center gap-2 ">
            <NavLink
              className="ml-5 font-extralight text-xl italic text-gray-500"
              to="/dashboard/additem"
            >
              Add Item
            </NavLink>
            <MdOutlineWatch className=" w-5 h-5 text-gray-500" />
          </div>
        </div>
        <div className="border m-10 w-[500px] h-[200px] hover:shadow-xl text-center">
          <h1 className="mt-5 text-gray-400 font-bold">TOTAL USERS</h1>
          <p className="mt-5 mb-4 font-secondFont font-extrabold text-orange-700 text-7xl">
            {allUsers.length}
          </p>
          <div className="flex items-center justify-center gap-2">
            <NavLink
              className="ml-5 font-extralight text-xl italic text-gray-500"
              to="/dashboard/users"
            >
              USERS
            </NavLink>
            <FaUserGroup className="w-5 h-5 text-gray-500" />
          </div>
        </div>
        <div className="border m-10 w-[500px] h-[200px] hover:shadow-xl text-center">
          <h1 className="mt-5 text-gray-400 font-bold">TOTAL ITEMS</h1>
          <p className="mt-5 mb-4 font-secondFont font-extrabold text-gray-500 text-7xl">
            {allItems.length}
          </p>
          <div className="flex justify-center items-center gap-2">
            <NavLink
              className="ml-5 font-extralight text-xl italic text-gray-500"
              to="/dashboard/additem"
            >
              Add Item
            </NavLink>
            <MdOutlineWatch className=" w-5 h-5 text-gray-500" />
          </div>
        </div>
        <div className="border m-10 w-[500px] h-[200px] hover:shadow-xl text-center">
          <h1 className="mt-5 text-gray-400 font-bold">TOTAL ITEMS</h1>
          <p className="mt-5 mb-4 font-secondFont font-extrabold text-gray-500 text-7xl">
            {allItems.length}
          </p>
          <div className="flex justify-center items-center gap-2">
            <NavLink
              className="ml-5 font-extralight text-xl italic text-gray-500"
              to="/dashboard/additem"
            >
              Add Item
            </NavLink>
            <MdOutlineWatch className=" w-5 h-5 text-gray-500" />
          </div>
        </div>
      </div>
      <div className="px-5">
        <div
          className="overflow-x-auto"
          style={{
            maxHeight: "300px", // Set max height for vertical scrolling
            overflowY: "auto", // Enable vertical scrolling
          }}
        >
          <table className="table table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th></th>
                <td></td>
                <td>Name</td>
                <td>Brand</td>
                <td>Category</td>
                <td>Price</td>
                <td>Stock</td>
                <td>Warranty</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {allItems.map((item, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.watch}</td>
                  <td>{item.brand}</td>
                  <td>{item.category}</td>
                  <td
                    className={`${
                      item.price > 100
                        ? "text-orange-600 font-bold"
                        : "text-black font-bold"
                    }`}
                  >
                    ${item.price}
                  </td>
                  <td>{item.stock}</td>
                  <td>{item.warranty}</td>
                  <td onClick={() => handleDelete(item._id)}>
                    <MdDelete />
                  </td>
                  <td
                    onClick={() => {
                      document.getElementById("my_modal_4").showModal();
                      handleSingleItem(item._id);
                    }}
                  >
                    <CgArrowsExchangeAltV />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <img className="w-20 mx-auto" src={singleItem?.image} alt="" />

          <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="card w-[900px]">
                <form onSubmit={handleSingleUpdate} className="card-body">
                  <div className="grid grid-cols-2 gap-10">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Watch Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Watch Name"
                        className="input input-bordered rounded-none"
                        name="watchName"
                        defaultValue={singleItem?.watch}
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Brand</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Brand"
                        className="input input-bordered rounded-none"
                        name="brand"
                        defaultValue={singleItem?.brand}
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Price</span>
                      </label>
                      <input
                        type="number"
                        placeholder="Price"
                        className="input input-bordered rounded-none"
                        name="price"
                        defaultValue={singleItem?.price}
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Image</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Image"
                        className="input input-bordered rounded-none"
                        name="image"
                        defaultValue={singleItem?.image}
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Category</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Category"
                        className="input input-bordered rounded-none"
                        name="category"
                        defaultValue={singleItem?.category}
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Availability</span>
                      </label>
                      <div className="flex gap-5 mt-5">
                        <div className="flex gap-2">
                          <input
                            type="radio"
                            name="stock"
                            className="radio"
                            value="In stock"
                            // defaultChecked={singleItem?.stock === "In stock"}

                            defaultChecked={singleItem?.stock === "In stock"}
                          />{" "}
                          <p>In Stock</p>
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="radio"
                            name="stock"
                            className="radio"
                            value="Out Of Stock"
                            defaultChecked={
                              singleItem?.stock === "Out Of Stock"
                            }
                          />{" "}
                          <p>Out Of Stock</p>
                        </div>
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Warranty</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Warranty"
                        className="input input-bordered rounded-none"
                        name="warranty"
                        defaultValue={singleItem?.warranty}
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Description</span>
                      </label>
                      <input
                        className="input input-bordered px-3 py-2 rounded-none"
                        name="description"
                        id=""
                        placeholder="Description"
                        defaultValue={singleItem?.description}
                      ></input>
                    </div>

                    <div className="form-control mt-6 col-span-2">
                      <button className="btn btn-neutral rounded-none">
                        Add Item
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn btn-sm">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <TotalOrderForAdmin></TotalOrderForAdmin>
    </div>
  );
}
