import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import axiosInstance from "../../Utils/axios";
import {
  getCategoryCounts,
  getMonthlyCounts,
  getMonthlySums,
} from "../../Utils/statistics";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const Statistics = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("auth/allusers")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));

    axiosInstance
      .get("/payment/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const userGrowthData = {
    labels: months,
    datasets: [
      {
        label: "New Users",
        data: getMonthlyCounts(users),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
      },
    ],
  };

  const orderData = {
    labels: months,
    datasets: [
      {
        label: "Orders",
        data: getMonthlyCounts(orders),
        backgroundColor: "#10b981",
      },
    ],
  };

  const { labels: bookCategories, data: booksSold } = getCategoryCounts(orders);

  const bookSalesData = {
    labels: bookCategories,
    datasets: [
      {
        label: "Books Sold",
        data: booksSold,
        backgroundColor: "#f59e0b",
      },
    ],
  };

  const revenueByMonth = getMonthlySums(orders, "total");
  const refundsByMonth = [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const revenueRefundData = {
    labels: months,
    datasets: [
      {
        label: "Revenue",
        data: revenueByMonth,
        borderColor: "#0ea5e9",
        backgroundColor: "rgba(14, 165, 233, 0.1)",
        fill: true,
        yAxisID: "y1",
      },
      {
        label: "Refunds",
        data: refundsByMonth,
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        fill: true,
        yAxisID: "y2",
      },
    ],
  };

  const multiAxisOptions = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    scales: {
      y1: {
        type: "linear",
        display: true,
        position: "left",
      },
      y2: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Monthly User Growth</h2>
        <Line data={userGrowthData} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Monthly Orders</h2>
        <Bar data={orderData} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Revenue vs Refunds</h2>
        <Line data={revenueRefundData} options={multiAxisOptions} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">
          Book Collection vs Top Selling
        </h2>
        <Bar data={bookSalesData} />
      </div>
    </div>
  );
};
