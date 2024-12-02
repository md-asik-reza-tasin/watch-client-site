import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { getMyItem, pushInArray } from "../localStorage";
import { toast } from "react-toastify";

export default function Card() {
  const { allItems, addToCartReload, setAddToCartReload } =
    useContext(AuthContext);

  const handleAddItem = (id) => {
    const check = getMyItem("id");
    if (check.includes(id)) {
      toast.info("ALREADY ADDED");
    } else {
      pushInArray("id", id);
      const add = [...addToCartReload, id];
      setAddToCartReload(add);
    }
  };

  return (
    <>
      <h1 className="text-center text-gray-400 font-secondFont text-5xl mb-10">
        Featured Collection
      </h1>
      <div className="grid grid-cols-3 gap-10">
        {allItems.map((item) => (
          <div key={item._id}>
            <div className="card rounded-none w-full h-[480px] mb-10">
              <figure
                onClick={() =>
                  document.getElementById("my_modal_4").showModal()
                }
              >
                <img
                  className=" bg-slate-100 relative"
                  src={item.image}
                  alt="Shoes"
                />
                <p
                  className={`${
                    item.stock === "Out Of Stock"
                      ? "absolute left-0 bg-red-700 opacity-50 font-thin text-sm px-1 text-white top-0"
                      : "absolute left-0 bg-black opacity-50 font-thin text-sm px-1 text-white top-0"
                  }`}
                >
                  {item.stock}
                </p>
              </figure>
              <div className="mt-2">
                <h2 className="card-title text-gray-600">{item.watch}</h2>
                <p className="text-xl mb-2 font-bold">${item.price}</p>
                <div className="card-actions justify-start mt-5">
                  <button
                    onClick={() => handleAddItem(item._id)}
                    className="bg-zinc-600 text-white w-28 h-12 hover:bg-black transition-colors duration-500"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>

            <dialog id="my_modal_4" className="modal">
              <div className="modal-box w-11/12 max-w-5xl">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <div className="hero">
                  <div className="hero-content flex-col lg:flex-row">
                    <img src={item.image} className="max-w-sm" />
                    <div>
                      <h1 className="text-5xl font-bold text-gray-500">
                        {item.watch}
                      </h1>
                      <h1 className="text-3xl font-bold text-black mt-4 italic">
                        {item.category}
                      </h1>
                      <p className="pt-6 italic">{item.description}</p>
                      <div className="flex flex-col">
                        <p className="font-semibold">{item.warranty}</p>
                        <p className="pb-5 mt-5 text-2xl text-gray-600 font-extrabold">
                          ${item.price}
                        </p>
                      </div>
                      <button className="bg-zinc-600 text-white w-28 h-12 hover:bg-black transition-colors duration-500">
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </dialog>
          </div>
        ))}
      </div>
    </>
  );
}
