import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

export default function Slider() {
  const { photos, setPhotos, setUpdated } = useContext(AuthContext);

  const handleSlide = (e) => {
    e.preventDefault();

    const slider = e.target.slider.value;
    const watcName = e.target.watchName.value;
    const discount = e.target.discount.value;

    const photos = {
      slider,
      watcName,
      discount,
    };

    console.log(slider);

    fetch("http://localhost:5000/slider", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(photos),
    })
      .then((res) => res.json())
      .then((data) => setUpdated(data));
  };

  console.log(photos);

  const handleDeleteSlide = (id) => {
    fetch(`http://localhost:5000/slider/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          toast.success("DELETED");
          const remaining = photos.filter((photo) => photo._id !== id);
          setPhotos(remaining);
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleSlide} className="card-body">
        <div className=" gap-10">
          <div className="form-control">
            <label className="label">
              <span className="label-text">SLIDER IMAGE URL</span>
            </label>
            <input
              type="text"
              placeholder="URL"
              className="input input-bordered rounded-none"
              name="slider"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">WATCH NAME</span>
            </label>
            <input
              type="text"
              placeholder="WATCH NAME"
              className="input input-bordered rounded-none"
              name="watchName"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Discount %</span>
            </label>
            <input
              type="number"
              placeholder="DISCOUNT"
              className="input input-bordered rounded-none"
              name="discount"
            />
          </div>
          <div className="w-20 h-2 mt-5">
            <button className="btn w-20 h-2 bg-slate-400">Add</button>
          </div>
        </div>
      </form>

      <div className="grid grid-cols-6 mt-10 ml-2">
        {photos.map((photo) => (
          <div className="relative mx-5">
            <img className="w-40 p-2" src={photo?.slider}></img>
            <RxCross2
              onClick={() => handleDeleteSlide(photo._id)}
              className="absolute top-0 right-0 bg-red-600 text-white rounded-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
