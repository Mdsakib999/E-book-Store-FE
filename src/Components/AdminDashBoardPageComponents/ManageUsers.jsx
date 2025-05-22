import { FaEdit, FaTrashAlt, FaUserShield } from "react-icons/fa";

export const ManageUsers = () => {
  // Dummy users
  const users = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      role: "Customer",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "Moderator",
    },
  ];

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
                key={user.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4 flex items-center justify-center gap-3 text-sm">
                  <button
                    title="Edit Role"
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => console.log("Edit Role", user.id)}
                  >
                    <FaUserShield />
                  </button>
                  <button
                    title="Edit Info"
                    className="text-green-600 hover:text-green-800"
                    onClick={() => console.log("Edit Info", user.id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    title="Remove User"
                    className="text-red-600 hover:text-red-800"
                    onClick={() => console.log("Remove User", user.id)}
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
