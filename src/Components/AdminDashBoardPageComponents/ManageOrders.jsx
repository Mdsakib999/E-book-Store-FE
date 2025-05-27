import { useEffect, useState } from "react";
import { FaEye, FaTimes } from "react-icons/fa";
import { Pagination } from "../Shared/Pagination";
import axiosInstance from "../../Utils/axios";
import { PrimaryButton } from "../Shared/Button/Button";

export const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/payment/allorders");
      //   console.log(res.data);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Orders</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase tracking-wider text-gray-700">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Books</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr
                key={order._id}
                className="border-t hover:bg-gray-50 transition-all duration-150"
              >
                <td className="px-6 py-4 font-medium">{order._id}</td>
                <td className="px-6 py-4">{order.user.name}</td>
                <td className="px-6 py-4">
                  {order.items.map((item) => item.bookName).join(", ")}
                </td>
                <td className="px-6 py-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <PrimaryButton
                    onClick={() => handleViewDetails(order)}
                    className="flex justify-center items-center whitespace-nowrap gap-3"
                  >
                    <FaEye className="text-xl" />
                    View Details
                  </PrimaryButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No orders found.
          </div>
        )}
      </div>

      {orders.length > ordersPerPage && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(orders.length / ordersPerPage)}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-white/10">
          <div className="bg-white/50 rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                Order Details
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm text-gray-600">Order ID</label>
                  <p className="font-semibold">{selectedOrder._id}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm text-gray-600">Customer</label>
                  <p className="font-semibold">{selectedOrder.user.name}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm text-gray-600">Order Date</label>
                  <p className="font-semibold">
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg col-span-full">
                  <label className="text-sm text-gray-600">Books</label>
                  <ul className="space-y-2">
                    {selectedOrder.items.map((item) => (
                      <li
                        key={item._id}
                        className="bg-white p-3 rounded border border-gray-200 shadow-sm"
                      >
                        <p className="font-semibold">{item.bookName}</p>
                        <p className="text-sm text-gray-500">
                          Author: {item.authorName}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-500">
                          Price: ${item.price}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm text-gray-600">
                    Transaction ID
                  </label>
                  <p className="font-semibold">
                    {selectedOrder.paymentIntentId}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm text-gray-600">Total Amount</label>
                  <p className="text-2xl font-bold text-green-600">
                    ${selectedOrder.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end p-6 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
