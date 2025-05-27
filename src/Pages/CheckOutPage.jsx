import React, { useState, useContext, useEffect } from "react";
import {
	FiTrash2,
	FiShoppingBag,
	FiBook,
	FiStar,
	FiCreditCard,
	FiCheck,
	FiArrowLeft,
	FiDownload,
	FiMail,
} from "react-icons/fi";
import { useCart } from "../provider/CartProvider";
import { useCurrency } from "../provider/CurrencyProvider";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
	Elements,
	CardNumberElement,
	CardExpiryElement,
	CardCvcElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import axiosInstance from "../Utils/axios";
import { useAuth } from "../provider/AuthProvider";
import SuccessPage from "./SuccessPage";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = ({
	cartItems,
	currency,
	rates,
	userId,
	onSuccess,
	onError,
}) => {
	const stripe = useStripe();
	const elements = useElements();
	const [isProcessing, setIsProcessing] = useState(false);
	const [cardError, setCardError] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!stripe || !elements) return;

		setIsProcessing(true);
		setCardError("");

		try {
			const amount = cartItems.reduce(
				(sum, item) =>
					sum +
					Math.round(
						parseFloat(item.discountPrice || item.price) * rates[currency] * 100
					),
				0
			);

			const response = await axiosInstance.post(
				"/payment/create-payment-intent",
				{
					items: cartItems.map((item) => ({
						name: item.bookName,
						price:
							parseFloat(item.discountPrice || item.price) * rates[currency],
						quantity: 1,
						book: item?.pdf,
						image: item?.image,
					})),
					currency: currency.toLowerCase(),
					userId,
				}
			);

			if (!response.data.clientSecret || !response.data.paymentIntentId) {
				throw new Error("Failed to create payment intent");
			}

			const { clientSecret, paymentIntentId } = response.data;

			const result = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardNumberElement),
				},
			});

			if (result.error) {
				setCardError(result.error.message);
				onError(result.error.message);
				setIsProcessing(false);
				return;
			}

			if (result.paymentIntent.status === "succeeded") {
				try {
					const orderResponse = await axiosInstance.post(
						"/payment/orders/save",
						{
							userId,
							items: cartItems.map((item) => ({
								book: item?.pdf,
								image: item?.image,
								bookId: item._id,
								bookName: item.bookName,
								authorName: item.authorName,
								category: item.category,
								price:
									parseFloat(item.discountPrice || item.price) *
									rates[currency],
								quantity: 1,
							})),
							total: parseFloat(
								cartItems
									.reduce(
										(acc, item) =>
											acc +
											parseFloat(item.discountPrice || item.price) *
												rates[currency],
										0
									)
									.toFixed(2)
							),
							currency: currency.toUpperCase(),
							paymentIntentId,
						}
					);

					if (orderResponse.status === 201) {
						onSuccess();
					} else {
						throw new Error("Failed to save order");
					}
				} catch (orderError) {
					setCardError(
						"Payment succeeded, but order saving failed. Contact support."
					);
					onError(orderError.message);
				}
			}
		} catch (error) {
			setCardError(error.message || "Payment failed. Please try again.");
			onError(error.message || "Payment failed. Please try again.");
		} finally {
			setIsProcessing(false);
		}
	};

	const elementOptions = {
		style: {
			base: {
				fontSize: "14px",
				color: "#1f2937",
				"::placeholder": { color: "#9ca3af" },
			},
			invalid: { color: "#ef4444" },
		},
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-3">
			<div className="p-3 border border-gray-200 rounded-lg">
				<label className="block text-xs font-medium text-gray-700 mb-1">
					Card Number
				</label>
				<CardNumberElement
					options={elementOptions}
					className="p-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
				/>
			</div>
			<div className="grid grid-cols-2 gap-3">
				<div className="p-3 border border-gray-200 rounded-lg">
					<label className="block text-xs font-medium text-gray-700 mb-1">
						Expiration Date
					</label>
					<CardExpiryElement
						options={elementOptions}
						className="p-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>
				<div className="p-3 border border-gray-200 rounded-lg">
					<label className="block text-xs font-medium text-gray-700 mb-1">
						CVC/CVV
					</label>
					<CardCvcElement
						options={elementOptions}
						className="p-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>
			</div>
			{cardError && <p className="text-red-500 text-xs">{cardError}</p>}
			<button
				type="submit"
				disabled={!stripe || isProcessing}
				className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isProcessing ? (
					<>
						<FiCreditCard className="animate-pulse" size={16} />
						Processing...
					</>
				) : (
					<>
						<FiCreditCard size={16} />
						Pay Now {currency}{" "}
						{cartItems
							.reduce(
								(acc, item) =>
									acc +
									parseFloat(item.discountPrice || item.price) *
										rates[currency],
								0
							)
							.toFixed(2)}
					</>
				)}
			</button>
		</form>
	);
};

const CheckOutPage = () => {
	const { cartItems, removeFromCart, clearCart } = useCart();
	const { currency, rates } = useCurrency();
	const { user } = useAuth();
	const [showSuccess, setShowSuccess] = useState(false);
	const [error, setError] = useState("");
	const [purchasedItems, setPurchasedItems] = useState([]);
	const [total, setTotal] = useState(0);
	const [userId, setUserId] = useState(user);

	const fetchUser = async () => {
		const response = await axiosInstance.get(`/auth/${user?.uid}`);
		setUserId(response.data._id);
	};

	useEffect(() => {
		fetchUser();
	}, [user]);

	const convertPrice = (price) => {
		return (price * rates[currency]).toFixed(2);
	};

	const calculateTotal = () => {
		return cartItems
			.reduce(
				(acc, item) => acc + parseFloat(item.discountPrice || item.price),
				0
			)
			.toFixed(2);
	};

	const calculateSavings = () => {
		return cartItems
			.reduce((acc, item) => {
				if (item.discountPrice) return acc + (item.price - item.discountPrice);
				return acc;
			}, 0)
			.toFixed(2);
	};

	const handlePaymentSuccess = () => {
		setPurchasedItems(cartItems);
		setTotal(convertPrice(calculateTotal()));
		clearCart();
		setShowSuccess(true);
	};

	const handlePaymentError = (errorMessage) => {
		setError(errorMessage);
	};

	if (!user) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
				<div className="text-center">
					<h2 className="text-xl font-semibold text-gray-900 mb-3">
						Please Log In
					</h2>
					<p className="text-gray-600 text-sm mb-4">
						You need to be logged in to complete your purchase.
					</p>
					<Link to="/signin">
						<button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm">
							Log In
						</button>
					</Link>
				</div>
			</div>
		);
	}

	if (showSuccess) {
		return (
			<SuccessPage
				purchasedItems={purchasedItems}
				rates={rates}
				total={total}
				currency={currency}
				onBackToShopping={() => setShowSuccess(false)}
			/>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="bg-white shadow-sm">
				<div className="max-w-6xl mx-auto px-4 py-4">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-blue-100 rounded-full">
							<FiShoppingBag className="text-blue-600" size={20} />
						</div>
						<div>
							<h1 className="text-lg font-semibold text-gray-900">Your Cart</h1>
							<p className="text-gray-600 text-xs">
								{cartItems.length} {cartItems.length === 1 ? "item" : "items"}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 py-6">
				{cartItems.length === 0 ? (
					<div className="text-center py-12">
						<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<FiShoppingBag className="text-gray-400" size={24} />
						</div>
						<h2 className="text-lg font-semibold text-gray-900 mb-2">
							Your Cart is Empty
						</h2>
						<p className="text-gray-600 text-sm mb-4">
							Discover our collection of e-books!
						</p>
						<Link to="/allbooks">
							<button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm">
								Browse E-books
							</button>
						</Link>
					</div>
				) : (
					<div className="flex flex-col lg:flex-row gap-6">
						<div className="flex-1 space-y-4">
							{cartItems.map((item) => (
								<div
									key={item._id}
									className="bg-white border border-gray-200 rounded-lg p-4 flex gap-3"
								>
									<div className="w-24 h-32 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
										<img className="h-full" src={item?.image} alt="" />
									</div>
									<div className="flex-1">
										<div className="flex justify-between items-start">
											<div>
												<h3 className="text-base font-semibold text-gray-900 line-clamp-1">
													{item.bookName}
												</h3>
												<p className="text-gray-600 text-xs">
													by {item.authorName}
												</p>
											</div>
											<button
												onClick={() => removeFromCart(item._id)}
												className="p-1 text-gray-400 hover:text-red-500 rounded-full transition-colors duration-200"
												title="Remove from cart"
											>
												<FiTrash2 size={16} />
											</button>
										</div>
										<span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mt-1">
											{item.category}
										</span>
										<p className="text-gray-600 text-xs mt-2 line-clamp-2">
											{item.description}
										</p>
										<div className="flex items-center gap-1 mt-2">
											<FiStar
												className="text-yellow-400 fill-current"
												size={14}
											/>
											<span className="text-xs text-gray-700">
												{item.rating}
											</span>
										</div>
										<div className="flex items-center gap-2 mt-2">
											{item.discountPrice ? (
												<>
													<span className="text-base font-semibold text-gray-900">
														{currency} {convertPrice(item.discountPrice)}
													</span>
													<span className="text-xs text-gray-500 line-through">
														{currency} {convertPrice(item.price)}
													</span>
													<span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
														Save {currency}{" "}
														{convertPrice(item.price - item.discountPrice)}
													</span>
												</>
											) : (
												<span className="text-base font-semibold text-gray-900">
													{currency} {convertPrice(item.price)}
												</span>
											)}
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="lg:w-80">
							<div className="bg-white border border-gray-200 rounded-lg p-4">
								<h2 className="text-base font-semibold text-gray-900 mb-4">
									Order Summary
								</h2>
								<div className="space-y-3">
									<div className="flex justify-between text-gray-600 text-sm">
										<span>
											Subtotal ({cartItems.length}{" "}
											{cartItems.length === 1 ? "item" : "items"})
										</span>
										<span>
											{currency}{" "}
											{convertPrice(
												cartItems.reduce(
													(acc, item) => acc + parseFloat(item.price),
													0
												)
											)}
										</span>
									</div>
									{parseFloat(calculateSavings()) > 0 && (
										<div className="flex justify-between text-green-600 text-sm">
											<span>Savings</span>
											<span>
												-{currency} {convertPrice(calculateSavings())}
											</span>
										</div>
									)}
									<div className="border-t pt-3">
										<div className="flex justify-between text-base font-semibold text-gray-900">
											<span>Total</span>
											<span>
												{currency} {convertPrice(calculateTotal())}
											</span>
										</div>
									</div>
								</div>

								{error && (
									<div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-md">
										<p className="text-red-600 text-xs">{error}</p>
									</div>
								)}
								<Elements stripe={stripePromise}>
									<PaymentForm
										cartItems={cartItems}
										currency={currency}
										rates={rates}
										userId={userId}
										onSuccess={handlePaymentSuccess}
										onError={handlePaymentError}
									/>
								</Elements>
								<div className="mt-3 text-center">
									<p className="text-xs text-gray-500">
										🔒 Secure payment by Stripe
									</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CheckOutPage;
