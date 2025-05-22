import { useEffect, useState } from "react";
import { FaCreditCard, FaPaypal } from "react-icons/fa";

const dummyOrders = [
  {
    id: "ORD-1001",
    customerName: "Alice Johnson",
    date: "2025-05-15",
    method: "Card",
    status: "Paid",
    amount: 59.99,
  },
  {
    id: "ORD-1002",
    customerName: "Bob Smith",
    date: "2025-05-18",
    method: "Card",
    status: "Pending",
    amount: 25.5,
  },
  {
    id: "ORD-1003",
    customerName: "Clara Lee",
    date: "2025-05-20",
    method: "PayPal",
    status: "Failed",
    amount: 34.0,
  },
];

export const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Replace with real API call in future
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
      case "Card":
        return <FaCreditCard className="inline-block mr-1" />;
      case "PayPal":
        return <FaPaypal className="inline-block mr-1" />;
      default:
        return null;
    }
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
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Payment Method</th>
              <th className="px-6 py-4">Total Amount</th>
              <th className="px-6 py-4">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 transition-all duration-150"
              >
                <td className="px-6 py-4 font-medium">{order.id}</td>
                <td className="px-6 py-4">{order.customerName}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4 flex items-center">
                  {getMethodIcon(order.method)} {order.method}
                </td>
                <td className="px-6 py-4">${order.amount.toFixed(2)}</td>
                <td
                  className={`px-6 py-4 font-semibold ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
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
    </div>
  );
};
