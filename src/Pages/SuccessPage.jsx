import { FiArrowLeft, FiCheck, FiDownload } from "react-icons/fi";
import { Link } from "react-router-dom";

const SuccessPage = ({ purchasedItems, currency, rates }) => {
	const handleDownload = (pdfUrl, bookName) => {
		const link = document.createElement("a");
		link.href = pdfUrl;
		link.download = `${bookName}.pdf`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
			<div className="bg-gray-50 rounded-xl shadow p-4 sm:p-6 max-w-4xl w-full text-center">
				<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<FiCheck className="text-green-600" size={24} />
				</div>
				<h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
					Thank You for Purchasing!
				</h1>
				<p className="text-gray-600 text-sm mb-6">
					Your e-books are ready for download. Find your purchased books below.
				</p>

				{/* Purchased Books List */}
				<div className="mb-6">
					<h2 className="text-base font-semibold text-gray-800 mb-4">
						Your Purchased Books
					</h2>
					<div className="space-y-4">
						{purchasedItems.map((item) => (
							<div
								key={item._id}
								className="bg-white rounded-lg shadow-sm p-3 flex items-center justify-between gap-3 w-full transition-transform hover:scale-[1.02] duration-200"
							>
								<img
									src={item.image || "https://via.placeholder.com/150"}
									alt={item.bookName}
									className="w-16 h-24 object-cover rounded-md flex-shrink-0"
								/>
								<div className="flex-1 text-left min-w-0">
									<h3 className="text-sm font-medium text-gray-900 truncate">
										{item.bookName}
									</h3>
									<p className="text-xs text-gray-500 truncate">
										by {item.authorName}
									</p>
									<p className="text-sm font-semibold text-gray-900">
										{currency}{" "}
										{(
											(item?.discountPrice || item?.price) * rates[currency]
										).toFixed(2)}
									</p>
								</div>
								<button
									onClick={() => handleDownload(item.pdf, item.bookName)}
									className="cursor-pointer bg-gray-900 text-white py-2 px-4 rounded-md text-xs font-medium flex items-center gap-1 hover:bg-gray-700 transition-colors duration-200"
								>
									<FiDownload size={14} />
									Download
								</button>
							</div>
						))}
					</div>
				</div>

				{/* Order Summary */}
				<div className="mb-6">
					<div className="flex justify-between pt-3 border-t">
						<p className="text-sm font-semibold text-gray-800">Total</p>
						<p className="text-sm font-bold text-gray-900">
							{currency}{" "}
							{purchasedItems
								.reduce(
									(acc, item) =>
										acc + (item.discountPrice || item.price) * rates[currency],
									0
								)
								.toFixed(2)}
						</p>
					</div>
				</div>

				<Link to="/allbooks">
					<button className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1 mx-auto text-sm transition-colors duration-200">
						<FiArrowLeft size={16} />
						Continue Shopping
					</button>
				</Link>
			</div>
		</div>
	);
};

export default SuccessPage;
