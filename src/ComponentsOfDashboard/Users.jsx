import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

export default function Users() {
  const { allUsers, setAllUsers } = useContext(AuthContext);

  console.log(allUsers);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          toast.success("DELETED");
          const remaining = allUsers.filter((auser) => auser._id !== id);
          setAllUsers(remaining);
        }
      });
  };

  return (
    <div
      className="overflow-x-auto p-6"
      style={{
        maxHeight: "700px", // Set max height for vertical scrolling
        overflowY: "auto", // Enable vertical scrolling
      }}
    >
      <h1 className="text-center mb-5 mt-5 font-secondFont font-semibold">
        ALL USERS INFORMATION
      </h1>
      <table className="table table-xs table-pin-rows table-pin-cols border shadow-md">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Create Account Time</th>
            <th>Last Log In</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {allUsers.map((user, idx) => (
            <tr key={idx}>
              <th></th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={user?.file} />
                    </div>
                  </div>
                </div>
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.created_account}</td>
              <td>{user.last_login}</td>
              <td onClick={() => handleDelete(user._id)}>
                <MdDelete className="w-14 h-5" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
