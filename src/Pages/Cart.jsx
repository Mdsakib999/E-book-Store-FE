import React, { useState } from "react";
import {
	FiTrash2,
	FiShoppingBag,
	FiBook,
	FiStar,
	FiCreditCard,
} from "react-icons/fi";
import { useCart } from "../provider/CartProvider";

const Cart = () => {
	const { cartItems, removeFromCart } = useCart();

	const calculateTotal = () => {
		return cartItems
			.reduce((acc, item) => {
				const price = item.discountPrice || item.price;
				return acc + parseFloat(price);
			}, 0)
			.toFixed(2);
	};

	const calculateSavings = () => {
		return cartItems
			.reduce((acc, item) => {
				if (item.discountPrice) {
					return acc + (item.price - item.discountPrice);
				}
				return acc;
			}, 0)
			.toFixed(2);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
			{/* Header */}
			<div className="bg-white shadow-sm border-b">
				<div className="max-w-4xl mx-auto px-6 py-6">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-blue-100 rounded-lg">
							<FiShoppingBag className="text-blue-600" size={24} />
						</div>
						<div>
							<h1 className="text-3xl font-bold text-gray-900">
								Shopping Cart
							</h1>
							<p className="text-gray-600">
								{cartItems.length} {cartItems.length === 1 ? "item" : "items"}{" "}
								in your cart
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-4xl mx-auto px-6 py-8">
				{cartItems.length === 0 ? (
					<div className="text-center py-16">
						<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
							<FiShoppingBag className="text-gray-400" size={32} />
						</div>
						<h2 className="text-2xl font-semibold text-gray-900 mb-2">
							Your cart is empty
						</h2>
						<p className="text-gray-600 mb-6">
							Looks like you haven't added any e-books yet.
						</p>
						<button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
							Browse E-books
						</button>
					</div>
				) : (
					<div className="grid lg:grid-cols-3 gap-8">
						{/* Cart Items */}
						<div className="lg:col-span-2 space-y-4">
							{cartItems.map((item) => (
								<div
									key={item._id}
									className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200"
								>
									<div className="flex gap-4">
										{/* Book Cover */}
										<div className="flex-shrink-0">
											<div className="w-20 h-28 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center shadow-sm">
												<FiBook className="text-white" size={24} />
											</div>
										</div>

										{/* Book Details */}
										<div className="flex-1 min-w-0">
											<div className="flex justify-between items-start mb-2">
												<div>
													<h3 className="text-xl font-semibold text-gray-900 mb-1 line-clamp-1">
														{item.bookName}
													</h3>
													<p className="text-gray-600 mb-1">
														by {item.authorName}
													</p>
													<span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
														{item.category}
													</span>
												</div>
												<button
													onClick={() => removeFromCart(item._id)}
													className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
													title="Remove from cart"
												>
													<FiTrash2 size={20} />
												</button>
											</div>

											<p className="text-gray-600 text-sm mb-3 line-clamp-2">
												{item.description}
											</p>

											{/* Rating */}
											<div className="flex items-center gap-1 mb-3">
												<FiStar
													className="text-yellow-400 fill-current"
													size={16}
												/>
												<span className="text-sm font-medium text-gray-700">
													{item.rating}
												</span>
												<span className="text-sm text-gray-500">rating</span>
											</div>

											{/* Price */}
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-2">
													{item.discountPrice ? (
														<>
															<span className="text-2xl font-bold text-gray-900">
																${item.discountPrice}
															</span>
															<span className="text-lg text-gray-500 line-through">
																${item.price}
															</span>
															<span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
																Save $
																{(item.price - item.discountPrice).toFixed(2)}
															</span>
														</>
													) : (
														<span className="text-2xl font-bold text-gray-900">
															${item.price}
														</span>
													)}
												</div>
												<span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
													Digital Download
												</span>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Order Summary */}
						<div className="lg:col-span-1">
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
								<h2 className="text-xl font-semibold text-gray-900 mb-4">
									Order Summary
								</h2>

								<div className="space-y-3 mb-4">
									<div className="flex justify-between text-gray-600">
										<span>
											Subtotal ({cartItems.length}{" "}
											{cartItems.length === 1 ? "item" : "items"})
										</span>
										<span>
											$
											{cartItems
												.reduce((acc, item) => acc + parseFloat(item.price), 0)
												.toFixed(2)}
										</span>
									</div>

									{parseFloat(calculateSavings()) > 0 && (
										<div className="flex justify-between text-green-600">
											<span>Total Savings</span>
											<span>-${calculateSavings()}</span>
										</div>
									)}

									<div className="border-t pt-3">
										<div className="flex justify-between text-xl font-semibold text-gray-900">
											<span>Total</span>
											<span>${calculateTotal()}</span>
										</div>
									</div>
								</div>

								<button className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2 mb-3">
									<FiCreditCard size={20} />
									Proceed to Checkout
								</button>

								<div className="text-center">
									<p className="text-xs text-gray-500 mb-2">
										Secure checkout with 256-bit SSL encryption
									</p>
									<p className="text-xs text-gray-500">
										Instant download after payment
									</p>
								</div>

								{/* Features */}
								<div className="mt-6 pt-6 border-t">
									<h3 className="font-medium text-gray-900 mb-3">
										What you get:
									</h3>
									<ul className="space-y-2 text-sm text-gray-600">
										<li className="flex items-center gap-2">
											<div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
											Instant digital download
										</li>
										<li className="flex items-center gap-2">
											<div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
											Lifetime access
										</li>
										<li className="flex items-center gap-2">
											<div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
											Multiple device support
										</li>
										<li className="flex items-center gap-2">
											<div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
											30-day money-back guarantee
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
