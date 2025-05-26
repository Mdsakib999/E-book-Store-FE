import { useEffect, useState } from "react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaMoneyCheckAlt,
  FaEye,
  FaTimes,
} from "react-icons/fa";
import { Pagination } from "../Shared/Pagination";

const dummyOrders = [
  {
    id: "ORD-1001",
    customerName: "Alice Johnson",
    bookName: "Atomic Habits",
    date: "2025-05-15",
    method: "Visa",
    trxId: "TRX-84920493",
    status: "Paid",
    amount: 59.99,
  },
  {
    id: "ORD-1002",
    customerName: "Bob Smith",
    bookName: "Educated",
    date: "2025-05-18",
    method: "MasterCard",
    trxId: "TRX-29834734",
    status: "Pending",
    amount: 25.5,
  },
  {
    id: "ORD-1003",
    customerName: "Clara Lee",
    bookName: "The Midnight Library",
    date: "2025-05-20",
    method: "Amex",
    trxId: "TRX-40329483",
    status: "Failed",
    amount: 34.0,
  },
  {
    id: "ORD-1001",
    customerName: "Alice Johnson",
    bookName: "Atomic Habits",
    date: "2025-05-15",
    method: "Visa",
    trxId: "TRX-84920493",
    status: "Paid",
    amount: 59.99,
  },
  {
    id: "ORD-1002",
    customerName: "Bob Smith",
    bookName: "Educated",
    date: "2025-05-18",
    method: "MasterCard",
    trxId: "TRX-29834734",
    status: "Pending",
    amount: 25.5,
  },
  {
    id: "ORD-1003",
    customerName: "Clara Lee",
    bookName: "The Midnight Library",
    date: "2025-05-20",
    method: "Amex",
    trxId: "TRX-40329483",
    status: "Failed",
    amount: 34.0,
  },
  {
    id: "ORD-1001",
    customerName: "Alice Johnson",
    bookName: "Atomic Habits",
    date: "2025-05-15",
    method: "Visa",
    trxId: "TRX-84920493",
    status: "Paid",
    amount: 59.99,
  },
  {
    id: "ORD-1002",
    customerName: "Bob Smith",
    bookName: "Educated",
    date: "2025-05-18",
    method: "MasterCard",
    trxId: "TRX-29834734",
    status: "Pending",
    amount: 25.5,
  },
  {
    id: "ORD-1003",
    customerName: "Clara Lee",
    bookName: "The Midnight Library",
    date: "2025-05-20",
    method: "Amex",
    trxId: "TRX-40329483",
    status: "Failed",
    amount: 34.0,
  },
];

export const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  useEffect(() => {
    setOrders(dummyOrders);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "text-green-600";
      case "Pending":
        return "text-yellow-600";
      case "Failed":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case "Visa":
        return <FaCcVisa className="inline-block mr-1 text-blue-700" />;
      case "MasterCard":
        return <FaCcMastercard className="inline-block mr-1 text-red-600" />;
      case "Amex":
        return <FaCcAmex className="inline-block mr-1 text-indigo-600" />;
      default:
        return <FaMoneyCheckAlt className="inline-block mr-1 text-gray-600" />;
    }
  };

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
              <th className="px-6 py-4">Book</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 transition-all duration-150"
              >
                <td className="px-6 py-4 font-medium">{order.id}</td>
                <td className="px-6 py-4">{order.customerName}</td>
                <td className="px-6 py-4">{order.bookName}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">${order.amount.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleViewDetails(order)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
                  >
                    <FaEye className="text-sm" />
                    View Details
                  </button>
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
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Order ID
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedOrder.id}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Customer Name
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedOrder.customerName}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Book Name
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedOrder.bookName}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Order Date
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedOrder.date}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Payment Method
                  </label>
                  <p className="text-lg font-semibold text-gray-900 flex items-center">
                    {getMethodIcon(selectedOrder.method)} {selectedOrder.method}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Transaction ID
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedOrder.trxId}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Total Amount
                  </label>
                  <p className="text-2xl font-bold text-green-600">
                    ${selectedOrder.amount.toFixed(2)}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Payment Status
                  </label>
                  <p
                    className={`text-lg font-bold ${getStatusColor(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status}
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
