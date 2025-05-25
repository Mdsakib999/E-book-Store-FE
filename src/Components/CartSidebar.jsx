import { FiTrash2, FiX } from "react-icons/fi";
import { useCart } from "../provider/CartProvider";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const CartSidebar = ({ isOpen, onClose }) => {
	const { cartItems, removeFromCart } = useCart();
	const location = useLocation();

	// Auto-close on route change
	useEffect(() => {
		onClose();
	}, [location]);

	return (
		<>
			{/* Click-outside overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black opacity-70 z-40"
					onClick={onClose}
				/>
			)}

			{/* Sidebar */}
			<div
				className={`fixed top-0 right-0 h-full w-full md:w-[320px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
				onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
			>
				<div className="flex justify-between items-center p-4 border-b">
					<h2 className="text-lg font-semibold">Your Cart</h2>
					<button className="cursor-pointer" onClick={onClose}>
						<FiX size={20} />
					</button>
				</div>

				<div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-140px)]">
					{cartItems.length === 0 ? (
						<p className="text-gray-500">Cart is empty</p>
					) : (
						cartItems.map((item) => (
							<div
								key={item._id}
								className="flex items-center gap-4 border-b pb-3"
							>
								<img
									src={item.image}
									alt={item.bookName}
									className="w-12 h-16 object-cover rounded"
								/>
								<div className="flex-1">
									<h4 className="text-sm font-medium">{item.bookName}</h4>
									<p className="text-xs text-gray-500">by {item.authorName}</p>
									<p className="text-sm font-semibold text-blue-600">
										${item.discountPrice || item.price}
									</p>
								</div>
								<button
									onClick={() => removeFromCart(item._id)}
									className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
									title="Remove from cart"
								>
									<FiTrash2 size={20} />
								</button>
							</div>
						))
					)}
				</div>

				<Link to="/cart">
					<div className="p-4 border-t">
						<button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer">
							Proceed to Checkout
						</button>
					</div>
				</Link>
			</div>
		</>
	);
};

export default CartSidebar;
