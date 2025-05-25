import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaUserShield } from "react-icons/fa";

export const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/allusers");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Manage Users
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4 capitalize">{user.role}</td>
                <td className="py-3 px-4 flex items-center justify-center gap-4 text-sm">
                  <button
                    title="Edit Role"
                    className="text-blue-600 hover:text-blue-800 text-2xl"
                    // onClick={() => console.log("Edit Role", user._id)}
                  >
                    <FaUserShield />
                  </button>
                  <button
                    title="Edit Info"
                    className="text-green-600 hover:text-green-800 text-2xl"
                    // onClick={() => console.log("Edit Info", user._id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    title="Remove User"
                    className="text-red-600 hover:text-red-800 text-2xl"
                    // onClick={() => console.log("Remove User", user._id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
