import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import booksData from "../../assets/bookData.json";
import { Link } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import { useCurrency } from "../../provider/CurrencyProvider";
import { FaPoundSign, FaEuroSign, FaDollarSign } from "react-icons/fa";

export const BestSelling = () => {
	const [favorites, setFavorites] = useState({});
	const { currency, rates } = useCurrency();

	const toggleFavorite = (bookId) => {
		const isFav = favorites[bookId];
		const updatedFavorites = {
			...favorites,
			[bookId]: !isFav,
		};
		setFavorites(updatedFavorites);

		Swal.fire({
			toast: true,
			position: "top",
			icon: "success",
			title: !isFav
				? "Product added to favorites"
				: "Product removed from favorites",
			showConfirmButton: false,
			timer: 1500,
		});
	};

	return (
		<div className="max-w-7xl  mx-auto px-4 my-10 lg:mt-28">
			<div className="flex flex-wrap justify-between items-center gap-4 sm:gap-6 md:gap-8 my-10">
				<h1 className="text-xl md:text-4xl font-bold whitespace-nowrap">
					BestSelling Books
				</h1>
				<Link
					to="/allbooks"
					className="text-sm sm:text-md md:text-xl flex items-center gap-1 whitespace-nowrap hover:text-blue-600 transition duration-300"
				>
					View All
					<MdOutlineKeyboardArrowRight className="text-lg sm:text-xl md:text-2xl" />
				</Link>
			</div>
			<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{booksData.slice(0, 8).map((item) => {
					const isFav = favorites[item.id];
					return (
						<Link
							key={item.ISBN}
							to={`/allbooks/${item.id}`}
							state={item}
							className="w-full h-[380px] mx-auto overflow-hidden rounded-lg group relative hover:shadow-xl bg-white border border-gray-200"
						>
							{/* Out of Stock Seal */}
							{item?.availability === false && (
								<div className="absolute right-0 top-0 z-0">
									<div className="bg-red-600 text-white text-xs font-medium py-1 px-4 rounded-bl-md shadow-lg transform rotate-0 flex items-center justify-center">
										<span className="tracking-wider uppercase">
											Out of Stock
										</span>
									</div>
								</div>
							)}
							{/* Image Section */}
							<div className="w-full h-[50%] overflow-hidden">
								<img
									src={item.image}
									alt={item.title}
									className="object-cover w-full h-full"
								/>
							</div>

							{/* Floating Info Section */}
							<div className="absolute bottom-0 z-10 w-full h-[40%] p-4 bg-white flex flex-col justify-between gap-4 transition-all duration-500 group-hover:translate-y-[-60px]">
								{/* Top Content */}
								<div className="flex flex-col gap-1">
									<p className="uppercase text-xs font-semibold text-red-500">
										{item.category}
									</p>
									<h2 className="text-md font-bold text-gray-900 ">
										{item.bookName}
									</h2>
									{/* Author */}
									<p className="text-sm text-gray-900 ">
										Author: {item.authorName}
									</p>
									{/* Rating*/}
									<div className="flex justify-between items-center text-sm text-gray-500 200 mt-1">
										{/* Price */}
										<p className="flex items-center text-base font-semibold text-gray-800  mt-1">
											<span>
												{currency === "USD" && <FaDollarSign />}
												{currency === "EUR" && <FaEuroSign />}
												{currency === "GBP" && <FaPoundSign />}
											</span>
											<span>
												{(item.discountPrice * rates[currency]).toFixed(2)}
											</span>
											<span className="text-sm line-through text-gray-400 ml-2">
												{(item.price * rates[currency]).toFixed(2)}
											</span>
										</p>
										<span className="flex items-center gap-1">
											{item.rating}{" "}
											<FaStar className="text-yellow-500 text-xs" />
										</span>
									</div>
								</div>

								{/* Hover Buttons (bottom aligned) */}
								<div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex justify-between items-center">
									<button
										className={`text-sm font-medium px-3 py-1 rounded ${
											item.availability
												? "cursor-pointer text-sm sm:text-md bg-black hover:bg-white hover:border hover:text-black duration-300 px-3 py-1.5 rounded text-white"
												: "bg-gray-300 text-gray-500 cursor-not-allowed"
										}`}
										disabled={!item.availability}
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
										}}
									>
										{item.availability ? "Add to Cart" : "Out of Stock"}
									</button>
									<button
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											toggleFavorite(item.id);
										}}
										className={`rounded-full p-2 ${
											isFav
												? "bg-red-50 text-red-500"
												: "bg-gray-100 text-gray-400"
										} hover:bg-red-100 transition-colors duration-200`}
									>
										<FaHeart
											className={`${isFav ? "text-red-500" : "text-gray-400"}`}
										/>
									</button>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};
