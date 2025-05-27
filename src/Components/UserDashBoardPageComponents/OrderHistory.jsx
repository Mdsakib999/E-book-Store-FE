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
		<div className="px-4 sm:px-6 lg:px-8">
			<h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 font-serif text-center sm:text-left">
				Order History
			</h2>

			{/* Grid responsive for different screen sizes */}
			<div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 font-serif">
				{allOrders?.map((order) =>
					order.items.map((item, index) => (
						<div
							key={`${order._id}-${index}`}
							className="bg-white rounded-lg shadow-md overflow-hidden p-3 sm:p-5"
						>
							{/* Mobile-first approach: Stack vertically on small screens */}
							<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
								{/* Image container - responsive sizing */}
								<div className="flex-shrink-0 self-center sm:self-start">
									<img
										src={item.image}
										alt={item.bookName}
										className="w-24 h-32 xs:w-28 xs:h-36 sm:w-24 sm:h-32 md:w-32 md:h-40 lg:w-24 lg:h-32 xl:w-28 xl:h-36 object-cover rounded mx-auto sm:mx-0"
									/>
								</div>

								{/* Content and button container */}
								<div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 min-w-0">
									{/* Book details */}
									<div className="flex-1 text-center sm:text-left">
										<h3 className="text-base font-semibold mb-1 line-clamp-2">
											{item.bookName}
										</h3>
										<p className="text-xs text-gray-600 mb-1">
											by {item.authorName}
										</p>
										<p className="text-xs text-gray-600 mb-2 font-sans">
											{new Date(order.createdAt).toLocaleString()}
										</p>
										<p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-0">
											<span className="text-blue-500 font-bold">
												${item.price.toFixed(2)}
											</span>
										</p>
									</div>

									{/* Download button - responsive positioning */}
									<div className="flex justify-center sm:justify-end md:justify-center lg:justify-end">
										<button
											onClick={() => handleDownload(item.book, item.bookName)}
											className="w-full sm:w-auto md:w-auto border rounded py-1.5 text-xs sm:text-sm text-white bg-black transition-colors hover:text-black hover:bg-white duration-300 cursor-pointer min-w-[100px] md:min-w-[100px]"
										>
											Download
										</button>
									</div>
								</div>
							</div>
						</div>
					))
				)}
			</div>

			{/* Empty state */}
			{allOrders?.length === 0 && (
				<div className="text-center py-8 sm:py-12">
					<p className="text-gray-500 text-sm sm:text-base">No orders found</p>
				</div>
			)}
		</div>
	);
};
