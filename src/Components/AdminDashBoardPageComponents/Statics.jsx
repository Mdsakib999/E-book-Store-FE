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
import { Bar, Line, Doughnut, Pie } from "react-chartjs-2";

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

const months = ["Jan", "Feb", "Mar", "Apr", "May"];

export const Statics = () => {
  const userGrowthData = {
    labels: months,
    datasets: [
      {
        label: "New Users",
        data: [45, 67, 80, 120, 150],
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
        data: [30, 50, 60, 90, 100],
        backgroundColor: "#10b981",
      },
    ],
  };

  const bookCollectionData = {
    labels: ["Fiction", "Tech", "Comics", "Sci-Fi", "Non-fiction"],
    datasets: [
      {
        label: "Total Collection",
        data: [100, 80, 60, 90, 120],
        backgroundColor: "#6366f1",
      },
      {
        label: "Top Selling",
        data: [40, 60, 30, 80, 100],
        backgroundColor: "#f59e0b",
      },
    ],
  };

  const paymentData = {
    labels: ["Success", "Failed"],
    datasets: [
      {
        data: [250, 25],
        backgroundColor: ["#10b981", "#ef4444"],
      },
    ],
  };

  const categoryPieData = {
    labels: ["Fiction", "Tech", "Comics"],
    datasets: [
      {
        data: [120, 90, 60],
        backgroundColor: ["#f43f5e", "#3b82f6", "#f59e0b"],
      },
    ],
  };

  const formatPieData = {
    labels: ["PDF", "EPUB", "MOBI"],
    datasets: [
      {
        data: [150, 80, 40],
        backgroundColor: ["#8b5cf6", "#22c55e", "#ef4444"],
      },
    ],
  };

  const revenueRefundData = {
    labels: months,
    datasets: [
      {
        label: "Revenue",
        data: [1000, 1500, 2000, 2500, 3000],
        borderColor: "#0ea5e9",
        backgroundColor: "rgba(14, 165, 233, 0.1)",
        fill: true,
        yAxisID: "y1",
      },
      {
        label: "Refunds",
        data: [50, 70, 60, 40, 30],
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
        <Bar data={bookCollectionData} />
      </div>

      {/* <div>
        <h2 className="text-xl font-semibold mb-2">Sales by Format</h2>
        <Pie data={formatPieData} />
      </div> */}
      <div className="w-3/5">
        <h2 className="text-xl font-semibold mb-2">Sales by Category</h2>
        <Pie data={categoryPieData} />
      </div>

      <div className="w-3/5">
        <h2 className="text-xl font-semibold mb-2">Payments Overview</h2>
        <Doughnut data={paymentData} />
      </div>
    </div>
  );
};
