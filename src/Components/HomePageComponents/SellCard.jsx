import { FaDollarSign, FaEuroSign, FaPoundSign, FaHeart } from "react-icons/fa";
import { renderStars } from "../../Utils/renderStars";
import { useCart } from "../../provider/CartProvider";
import showToast from "../../Utils/ShowToast";

export const SellCard = ({ item, currency, rates, isFav, toggleFavorite }) => {
	const {
		id,
		image,
		bookName,
		authorName,
		category,
		rating,
		price,
		discountPrice,
	} = item;

	const { addToCart, removeFromCart, isInCart } = useCart();

	const handleCartAction = (item) => {
		const itemInCart = isInCart(item._id);

		if (itemInCart) {
			removeFromCart?.(item._id);
			showToast({
				title: `Removed "${item.bookName}" from cart!`,
				icon: "success",
			});
		} else {
			addToCart?.(item);
			showToast({
				title: `Added "${item.bookName}" to cart!`,
				icon: "success",
			});
		}
	};

	return (
		<div className="w-full h-[380px] mx-auto overflow-hidden rounded-lg group relative hover:shadow-xl bg-white border border-gray-200">
			{/* Image Section */}
			<div className="w-full h-[50%] overflow-hidden">
				<img
					src={image}
					alt={bookName}
					className="object-cover w-full h-full"
				/>
			</div>

			{/* Floating Info Section */}
			<div className="absolute bottom-0 z-10 w-full h-[40%] p-4 bg-white flex flex-col justify-between gap-4 transition-all duration-500 group-hover:translate-y-[-60px]">
				{/* Top Content */}
				<div className="flex flex-col gap-1">
					<p className="uppercase text-xs font-semibold text-red-500">
						{category}
					</p>
					<h2 className="text-md font-bold text-gray-900">{bookName}</h2>
					<p className="text-sm text-gray-900">Author: {authorName}</p>

					<div className="flex justify-between items-center text-sm text-gray-500 mt-1">
						<p className="flex items-center text-base font-semibold text-gray-800 mt-1">
							<span>
								{currency === "USD" && <FaDollarSign />}
								{currency === "EUR" && <FaEuroSign />}
								{currency === "GBP" && <FaPoundSign />}
							</span>
							<span>
								{discountPrice
									? (discountPrice * rates[currency]).toFixed(2)
									: (price * rates[currency]).toFixed(2)}
							</span>
							<span
								className={`${
									discountPrice ? "block" : "hidden"
								} text-sm line-through text-gray-400 ml-2`}
							>
								{(price * rates[currency]).toFixed(2)}
							</span>
						</p>

						<div className="flex">
							{renderStars(rating)}
							<span className="ml-2 text-gray-600 text-sm">({rating}/5)</span>
						</div>
					</div>
				</div>

				{/* Hover Buttons */}
				<div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex justify-between items-center">
					<button
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							handleCartAction(item);
						}}
						className={`font-medium rounded cursor-pointer text-sm sm:text-md px-3 py-1.5 ${
							isInCart(item._id)
								? "bg-white text-black border border-black hover:bg-black hover:text-white"
								: "bg-black text-white hover:bg-white hover:text-black hover:border"
						} duration-300`}
					>
						{isInCart(item._id) ? "Remove from Cart" : "Add to Cart"}
					</button>

					<button
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							toggleFavorite?.(id);
						}}
						className={`rounded-full p-2 ${
							isFav ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-400"
						} hover:bg-red-100 transition-colors duration-200`}
					>
						<FaHeart
							className={`${isFav ? "text-red-500" : "text-gray-400"}`}
						/>
					</button>
				</div>
			</div>
		</div>
	);
};
