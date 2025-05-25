/* eslint-disable */
import {
  FaUser,
  FaSignOutAlt,
  FaTimes,
  FaUsers,
  FaBook,
  FaClipboardList,
  FaHistory,
} from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";

export const DashBoardLeftNav = ({ closeSidebar }) => {
  const { isAdmin } = useAuth();

  const adminRoutes = [
    {
      label: "Profile",
      icon: <FaUser size={20} />,
      path: "/admin/dashboard",
    },
    {
      label: "Manage Users",
      icon: <FaUsers size={20} />,
      path: "/admin/dashboard/manage-users",
    },
    {
      label: "Add Book",
      icon: <MdLibraryAdd size={20} />,
      path: "/admin/dashboard/add-books",
    },
    {
      label: "Manage Category",
      icon: <MdLibraryAdd size={20} />,
      path: "/admin/dashboard/manage-category",
    },
    {
      label: "Manage Books",
      icon: <FaBook size={20} />,
      path: "/admin/dashboard/manage-books",
    },
    {
      label: "Manage Orders",
      icon: <FaClipboardList size={20} />,
      path: "/admin/dashboard/manage-orders",
    },
  ];

  const customerRoutes = [
    {
      label: "Profile",
      icon: <FaUser size={20} />,
      path: "/admin/dashboard",
    },
    {
      label: "Order History",
      icon: <FaHistory size={20} />,
      path: "/dashboard/order",
    },
  ];

  const routesToRender = isAdmin === true ? adminRoutes : customerRoutes;

  return (
    <aside className="bg-gray-100 h-full w-full p-4 relative">
      {/* Close button for mobile */}
      <button
        onClick={closeSidebar}
        className="absolute top-16 right-4 sm:hidden text-gray-700 hover:text-red-600"
      >
        <FaTimes size={22} />
      </button>

      <div className="flex flex-col gap-6 mt-10 sm:mt-0">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isAdmin ? "Admin" : "User"} Dashboard
        </h2>

        <nav className="flex flex-col gap-4 mt-4">
          {routesToRender.map(({ label, icon, path }) => (
            <Link to={path} onClick={closeSidebar} key={label}>
              <button className="flex items-center gap-3 text-gray-700 hover:text-blue-600 hover:bg-gray-200 px-3 py-2 rounded-md transition w-full">
                {icon}
                <span>{label}</span>
              </button>
            </Link>
          ))}

          <button
            className="flex items-center gap-3 text-red-600 hover:text-red-800 hover:bg-red-100 px-3 py-2 rounded-md transition w-full"
            onClick={() => {
              // console.log("Logout");
              closeSidebar();
            }}
          >
            <FaSignOutAlt size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};
