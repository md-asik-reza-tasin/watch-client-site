import { FcGoogle } from "react-icons/fc";
import PictureShareComponent from "../Components/PictureShareComponent";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <div className="hero bg-base-100 py-6">
        <div className="hero-content flex-col gap-24 lg:flex-row-reverse">
          <PictureShareComponent></PictureShareComponent>

          <div className="card bg-base-100 w-9/12 border-r pr-16 rounded-none">
            <h1 className="text-orange-400 text-center font-extrabold text-3xl">
              LOG IN PLEASE
            </h1>

            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold font-secondFont">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered rounded-none"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold font-secondFont">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered rounded-none"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-neutral rounded-none font-semibold font-secondFont">
                  Login
                </button>
              </div>
            </form>

            <p className="text-center font-semibold">OR</p>
            <div className="flex items-center justify-center gap-5">
              <Link to='/register' className=" font-semibold border-r-2 px-5 text-xl italic">Register</Link>
              <button className="w-10 h-20">
                <FcGoogle className="h-11 w-10" />
              </button>
              <button className="h-20 w-10">
                <FaGithub className="h-11 w-10" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
