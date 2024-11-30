import { Link, useNavigate } from "react-router-dom";
import PictureShareComponent from "../Components/PictureShareComponent";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from "firebase/auth";

export default function Register() {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const file = form.file.value;


    createUser(email, password)
      .then((result) => {
        const created_account = result.user.metadata.creationTime;
        const last_login = result.user.metadata.lastSignInTime;

        const user = {
          name,
          email,
          created_account,
          last_login,
          file,
        };

        console.log(user);

        updateProfile(result.user, {
          displayName: name,
          photoURL: file,
        });

        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              toast.success("SUCCESSFULLY REGISTERED");
              form.reset();
              navigate("/");
              console.log(data);
            }
          });
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
                 Photo URL
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Photo"
                  className=" input input-bordered rounded-none"
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
