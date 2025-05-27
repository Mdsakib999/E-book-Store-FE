/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import { MdRemoveModerator } from "react-icons/md"; // Demote icon
import Swal from "sweetalert2";
import axiosInstance from "../../Utils/axios";
import { useAuth } from "../../provider/AuthProvider";
import { Pagination } from "../Shared/Pagination";

export const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("auth/allusers");
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
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be promoted to admin!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, make admin",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosInstance.put(`auth/make-admin/${id}`);
        Swal.fire("Success", "User promoted to admin", "success");
        fetchUsers();
      } catch (error) {
        Swal.fire("Error", "Failed to promote user", "error");
      }
    }
  };

  const removeAdmin = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This Admin will turn into a user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosInstance.put(`auth/remove-admin/${id}`);
        Swal.fire("Success", "Admin role removed", "success");
        fetchUsers();
      } catch (error) {
        Swal.fire("Error", "Failed to remove admin role", "error");
      }
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
        await axiosInstance.delete(`auth/${id}`);
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
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
        <table className="min-w-full bg-white shadow rounded-lg mb-10">
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
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((u, index) => {
                const isCurrentUser = u.email === user.email;
                const buttonBaseClasses =
                  "disabled:opacity-50 " +
                  (isCurrentUser ? "cursor-not-allowed" : "cursor-pointer");
                return (
                  <tr
                    key={u._id}
                    className={`border-t transition ${
                      isCurrentUser
                        ? "bg-gradient-to-l from-white/10 to-black/40 text-black font-semibold"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{u.name}</td>
                    <td className="py-3 px-4">{u.email}</td>
                    <td className="py-3 px-4 capitalize">{u.role}</td>
                    <td className="py-3 px-4 flex items-center justify-center gap-5 text-xl">
                      {u.role === "admin" ? (
                        <button
                          title="Demote to User"
                          className={`text-yellow-600 hover:text-yellow-800 ${buttonBaseClasses}`}
                          onClick={() => removeAdmin(u._id)}
                          disabled={isCurrentUser}
                        >
                          <MdRemoveModerator />
                        </button>
                      ) : (
                        <button
                          title="Promote to Admin"
                          className={`text-blue-600 hover:text-blue-800 ${buttonBaseClasses}`}
                          onClick={() => makeAdmin(u._id)}
                          disabled={isCurrentUser}
                        >
                          <FaUserShield />
                        </button>
                      )}
                      <button
                        title="Remove User"
                        className={`text-red-600 hover:text-red-800 ${buttonBaseClasses}`}
                        onClick={() => deleteUser(u._id)}
                        disabled={isCurrentUser}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </div>
    </div>
  );
};
