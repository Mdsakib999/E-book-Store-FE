import { FiArrowLeft, FiCheck, FiDownload } from "react-icons/fi";

const SuccessPage = ({
	purchasedItems,
	total,
	currency,
	onBackToShopping,
	rates,
}) => {
	const handleDownload = (pdfUrl, bookName) => {
		const link = document.createElement("a");
		link.href = pdfUrl;
		link.download = `${bookName}.pdf`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
			<div className="bg-gray-50 rounded-2xl shadow p-6 sm:p-8 max-w-3xl w-full text-center">
				<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
					<FiCheck className="text-green-600" size={32} />
				</div>
				<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
					Thank You for Purchasing!
				</h1>
				<p className="text-gray-600 mb-8">
					Your e-books are ready for download. Find your purchased books below.
				</p>

				{/* Purchased Books List */}
				<div className="mb-8">
					<h2 className="text-lg font-semibold text-gray-800 mb-6">
						Your Purchased Books
					</h2>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{purchasedItems.map((item) => (
							<div
								key={item._id}
								className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center transition-transform hover:scale-105 duration-300"
							>
								<img
									src={item.image || "https://via.placeholder.com/150"}
									alt={item.bookName}
									className="w-32 h-48 object-cover rounded-md mb-4"
								/>
								<h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
									{item.bookName}
								</h3>
								<p className="text-xs text-gray-500 mb-4">
									by {item.authorName}
								</p>
								<p className="text-sm font-semibold text-gray-900 mb-4">
									{currency}{" "}
									{(
										item?.discountPrice * rates[currency] ||
										item?.price * rates[currency]
									).toFixed(2)}
								</p>
								<button
									onClick={() => handleDownload(item.pdf, item.bookName)}
									className="cursor-pointer w-full bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black hover:border hover:border-gray-400 transition-colors duration-300 font-medium flex items-center justify-center gap-2"
								>
									<FiDownload size={16} />
									Download
								</button>
							</div>
						))}
					</div>
				</div>

				{/* Order Summary */}
				<div className="mb-8">
					<div className="flex justify-between pt-4 border-t">
						<p className="text-sm font-semibold text-gray-800">Total</p>
						<p className="text-sm font-bold text-gray-900">
							{currency} {total}
						</p>
					</div>
				</div>

				<button
					onClick={onBackToShopping}
					className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2 mx-auto transition-colors duration-200"
				>
					<FiArrowLeft size={18} />
					Continue Shopping
				</button>
			</div>
		</div>
	);
};

export default SuccessPage;
