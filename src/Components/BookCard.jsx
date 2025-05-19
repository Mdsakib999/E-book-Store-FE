/* eslint-disable */
import { FaRegHeart } from "react-icons/fa";

export const BookCard = ({ img, title, author, price }) => {
	return (
		<div className="w-full h-[400px] mx-auto overflow-hidden rounded-md group relative hover:shadow-2xl border border-gray-200 hover:border hover:border-orange-600 duration-300">
			{/* Image Section */}
			<div className="w-full h-[80%] overflow-hidden">
				<img src={img} alt={title} className="object-cover w-full h-[80%]" />
			</div>

			<div className="absolute bottom-0 z-10 w-full h-[45%] p-4 bg-white flex flex-col justify-between gap-4 transition-all duration-500 group-hover:translate-y-[-40px]">
				{/* Top Content */}
				<div>
					<p className="uppercase text-sm text-red-400">Kindle</p>
					<h2 className="text-xl font-bold text-black">{title}</h2>
					<p className="text-sm text-gray-500">{author}</p>
					<p className="text-lg font-bold text-black">{price}</p>
				</div>

				{/* Hover Buttons (bottom aligned) */}
				<div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex justify-between items-center">
					<button className="cursor-pointer text-sm sm:text-md bg-black hover:bg-white hover:border hover:text-black duration-300 px-10 py-3 rounded text-white">
						Add to cart
					</button>
					<FaRegHeart className="text-3xl hover:bg-red-500 duration-300 p-2 rounded-full text-white bg-black" />
				</div>
			</div>
		</div>
	);
};
