import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import { MdRemoveModerator } from "react-icons/md"; // Demote icon
import Swal from "sweetalert2";

export const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BackendURL}/auth/allusers`
      );
      // Sort admins to the top
      const sortedUsers = res.data.sort((a, b) => {
        if (a.role === "admin" && b.role !== "admin") return -1;
        if (a.role !== "admin" && b.role === "admin") return 1;
        return 0;
      });
      setUsers(sortedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const makeAdmin = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BackendURL}/auth/make-admin/${id}`
      );
      Swal.fire("Success", "User promoted to admin", "success");
      fetchUsers();
    } catch (error) {
      Swal.fire("Error", "Failed to promote user", "error");
    }
  };

  const removeAdmin = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BackendURL}/auth/remove-admin/${id}`
      );
      Swal.fire("Success", "Admin role removed", "success");
      fetchUsers();
    } catch (error) {
      Swal.fire("Error", "Failed to remove admin role", "error");
    }
  };

  const deleteUser = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_BackendURL}/auth/${id}`);
        Swal.fire("Deleted!", "User has been deleted.", "success");
        fetchUsers();
      } catch (error) {
        Swal.fire("Error", "Failed to delete user", "error");
      }
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Manage Users
      </h2>

      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

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
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 capitalize">{user.role}</td>
                  <td className="py-3 px-4 flex items-center justify-center gap-5 text-xl">
                    {user.role === "admin" ? (
                      <button
                        title="Demote to User"
                        className="text-yellow-600 hover:text-yellow-800"
                        onClick={() => removeAdmin(user._id)}
                      >
                        <MdRemoveModerator />
                      </button>
                    ) : (
                      <button
                        title="Promote to Admin"
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => makeAdmin(user._id)}
                      >
                        <FaUserShield />
                      </button>
                    )}
                    <button
                      title="Remove User"
                      className="text-red-600 hover:text-red-800"
                      onClick={() => deleteUser(user._id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
