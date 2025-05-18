/* eslint-disable */
import { FaRegHeart } from "react-icons/fa";

export const SellCard = ({ img, title, author, price }) => {
  return (
    <div className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-900">
      {/* Image */}
      <div className="overflow-hidden h-64">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Info */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-black/70 backdrop-blur-md p-4 rounded-xl shadow-lg translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <p className="uppercase text-xs text-red-500 font-semibold mb-1">
          Kindle
        </p>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate">
          {title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-300">{author}</p>
        <p className="text-base font-semibold text-gray-800 dark:text-white mt-1">
          {price}
        </p>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-4">
          <button className="text-sm font-medium text-black dark:text-white hover:underline">
            Buy Now
          </button>
          <FaRegHeart className="text-3xl text-gray-500 hover:text-red-500 transition-colors duration-300" />
        </div>
      </div>
    </div>
  );
};
