/* eslint-disable */
import { FaRegHeart } from "react-icons/fa";

export const BookCard = ({ img, title, author, price }) => {
	return (
		<div className="w-full h-[450px] mx-auto overflow-hidden rounded-md group relative hover:shadow-2xl border border-gray-200 hover:border hover:border-orange-600 duration-300">
			{/* Image Section */}
			<div className="w-full h-[60%] overflow-hidden py-10 px-20">
				<img src={img} alt={title} className="object-cover w-full h-full" />
			</div>

			{/* Floating Info Section */}
			<div className="absolute group-hover:bottom-10 transition-all duration-500 z-10 w-full p-4 bg-white">
				<p className="uppercase text-sm text-red-400">Kindle</p>
				<h2 className="text-xl font-bold text-black">{title}</h2>
				<p className="text-sm text-gray-500">{author}</p>
				<p className="text-lg font-bold text-black">{price}</p>

				{/* Hover Buttons */}
				<div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 flex justify-between items-center pt-4">
					<button className="cursor-pointer text-lg border border-orange-400 text-orange-400 hover:bg-orange-400 px-10 py-3 rounded hover:text-white">
						Add to cart
					</button>
					<FaRegHeart className="text-5xl hover:bg-red-500 p-2 rounded-full" />
				</div>
			</div>
		</div>
	);
};
