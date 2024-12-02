import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function AddItem() {
  const { setAddItem } = useContext(AuthContext);

  const handleAddItems = (e) => {
    e.preventDefault();

    // console.log(e)

    const form = e.target;

    const watch = form.watchName.value;
    const brand = form.brand.value;
    const price = form.price.value;
    const image = form.image.value;
    const category = form.category.value;
    const stock = form.stock.value;
    const warranty = form.warranty.value;
    const description = form.description.value;

    console.log(e);

    const itemInfo = {
      watch,
      brand,
      price,
      image,
      category,
      stock,
      warranty,
      description,
      quantity : 1
    };

    console.log(itemInfo);

    fetch("http://localhost:5000/items", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(itemInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("ADDED ITEMS");
          setAddItem(data);
        }
      });
  };

  return (
    <div>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card w-[1000px]">
            <form onSubmit={handleAddItems} className="card-body">
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
                      />{" "}
                      <p>In Stock</p>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        name="stock"
                        className="radio"
                        value="Out Of Stock"
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
    </div>
  );
}
