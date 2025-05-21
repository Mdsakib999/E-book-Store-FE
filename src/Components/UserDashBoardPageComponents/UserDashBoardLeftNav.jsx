import { FaUser, FaHistory, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export const UserDashBoardLeftNav = ({ closeSidebar }) => {
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
          Dashboard
        </h2>

        <nav className="flex flex-col gap-4 mt-4">
          <Link to="/dashboard" onClick={closeSidebar}>
            <button className="flex items-center gap-3 text-gray-700 hover:text-blue-600 hover:bg-gray-200 px-3 py-2 rounded-md transition w-full">
              <FaUser size={20} />
              <span>Profile</span>
            </button>
          </Link>

          <Link to="/dashboard/order" onClick={closeSidebar}>
            <button className="flex items-center gap-3 text-gray-700 hover:text-blue-600 hover:bg-gray-200 px-3 py-2 rounded-md transition w-full">
              <FaHistory size={20} />
              <span>Order History</span>
            </button>
          </Link>

          <button
            className="flex items-center gap-3 text-red-600 hover:text-red-800 hover:bg-red-100 px-3 py-2 rounded-md transition w-full"
            onClick={() => {
              console.log("Logout");
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
