import { useEffect, useState } from "react";
import axiosInstance from "../../Utils/axios";
import { useAuth } from "../../provider/AuthProvider";

export const OrderHistory = () => {
	const [allOrders, setAllOrders] = useState([]);
	const { user } = useAuth();

	const fetchOrders = async () => {
		try {
			const response = await axiosInstance.get(
				`/payment/orders/history?userId=${user?._id}`
			);
			console.log(response.data);
			setAllOrders(response.data);
		} catch (error) {
			console.error("Error fetching orders:", error);
		}
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	const handleDownload = (pdfUrl, bookName) => {
		const link = document.createElement("a");
		link.href = pdfUrl;
		link.download = `${bookName}.pdf`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<>
			<h2 className="text-2xl font-semibold mb-6 font-serif">Order History</h2>
			<div className="grid gap-6 md:grid-cols-2 font-serif">
				{allOrders?.map((order) =>
					order.items.map((item, index) => (
						<div
							key={`${order._id}-${index}`}
							className="flex flex-col lg:flex-row bg-white rounded-lg shadow-md overflow-hidden"
						>
							<img
								src={item.image}
								alt={item.bookName}
								className="w-full lg:w-32 h-48 object-cover"
							/>
							<div className="flex-1 p-4 flex flex-col justify-between">
								<div>
									<h3 className="text-lg font-semibold">{item.bookName}</h3>
									<p className="text-sm text-gray-600 mb-1">
										by {item.authorName}
									</p>
									<p className="text-sm text-gray-600 mb-1 font-sans my-2">
										{new Date(order.createdAt).toLocaleString()}
									</p>
									<p className="text-sm">
										<span className="text-blue-500 font-bold mr-2">
											${item.price.toFixed(2)}
										</span>
									</p>
								</div>
								<div className="flex items-center justify-between mt-4">
									<button
										onClick={() => handleDownload(item.book, item.bookName)}
										className="border rounded px-5 py-2 text-sm text-white bg-black transition-colors hover:text-black hover:bg-white duration-300 cursor-pointer"
									>
										Download
									</button>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</>
	);
};
