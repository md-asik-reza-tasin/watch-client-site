import { Link } from "react-router-dom";
import PictureShareComponent from "../Components/PictureShareComponent";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function Register() {
  const { createUser } = useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const file = form.file.value;

    const user = {
      name,
      email,
      password,
      file,
    };

    createUser(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="hero bg-base-100">
        <div className="hero-content flex-col gap-24 lg:flex-row-reverse">
          <PictureShareComponent></PictureShareComponent>

          <div className="card bg-base-100 w-9/12 border-r pr-16 rounded-none">
            <h1 className="text-orange-400 text-center font-extrabold text-2xl">
              REGISTER ACCOUNT
            </h1>

            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold font-secondFont">
                    Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered rounded-none"
                  name="name"
                />
              </div>

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
                  name="email"
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
                  name="password"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold font-secondFont">
                    Choose your profile
                  </span>
                </label>
                <input
                  type="file"
                  placeholder="Photo"
                  className="rounded-none"
                  name="file"
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-neutral rounded-none font-semibold font-secondFont">
                  Register
                </button>
              </div>
            </form>

            <div className="flex items-center justify-center gap-5">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="font-semibold italic">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
