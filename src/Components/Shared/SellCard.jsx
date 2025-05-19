/* eslint-disable */
import { FaRegHeart, FaStar } from "react-icons/fa";

export const SellCard = ({
  isbn,
  img,
  title,
  author,
  rating,
  desc,
  price,
  originalPrice,
  category,
  availability,
}) => {
  return (
    <div className="w-full h-[400px]  mx-auto overflow-hidden rounded-lg group relative hover:shadow-xl bg-white border border-gray-200">
      {/* Image Section */}
      <div className="w-full h-[60%] overflow-hidden">
        <img src={img} alt={title} className="object-cover w-full h-full" />
      </div>

      {/* Floating Info Section */}
      <div className="absolute bottom-0 z-10 w-full h-[45%] p-4 bg-white flex flex-col justify-between gap-4 transition-all duration-500 group-hover:translate-y-[-40px]">
        {/* Top Content */}
        <div className="flex flex-col gap-2">
          <p
            className={`uppercase text-md font-semibold ${
              category === "Unknown" ? "text-gray-400 text-xs" : "text-red-500"
            }`}
          >
            {category}
          </p>
          <h2 className="text-lg font-bold text-gray-900 ">{title}</h2>
          {/* Author */}
          <p className="text-sm text-gray-900 ">Author: {author}</p>
          {/* Description (truncate long text) */}
          {/* <p className="text-xs text-gray-500  mt-1 line-clamp-2">{desc}</p> */}

          {/* Rating + ISBN */}
          <div className="flex justify-between items-center text-sm text-gray-500 200 mt-1">
            {/* Price */}
            <p className="text-base font-semibold text-gray-800  mt-1">
              ${price}
              <span className="text-sm line-through text-gray-400 ml-2">
                ${originalPrice}
              </span>
            </p>
            <span className="flex items-center gap-1">
              {rating} <FaStar className="text-yellow-500 text-xs" />
            </span>
            {/* <span className="text-[10px]">ISBN: {isbn}</span> */}
          </div>
        </div>

        {/* Hover Buttons (bottom aligned) */}
        <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex justify-between items-center">
          <button
            disabled={!availability}
            className={`text-sm sm:text-md px-4 py-2 rounded text-white transition-colors duration-300 ${
              availability
                ? "bg-blue-500 hover:bg-orange-400"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {availability ? "Buy Now" : "Out of Stock"}
          </button>
          <FaRegHeart className="text-3xl hover:bg-red-500 p-2 rounded-full text-white bg-blue-500 transition-colors duration-300" />
        </div>
      </div>
    </div>
  );
};
