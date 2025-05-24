/* eslint-disable react/prop-types */
import {
  FaDollarSign,
  FaEuroSign,
  FaPoundSign,
  FaStar,
  FaHeart,
} from "react-icons/fa";

export const SellCard = ({
  item,
  currency,
  rates,
  isFav,
  toggleFavorite,
  onAddToCart,
}) => {
  const {
    id,
    image,
    bookName,
    authorName,
    category,
    availability,
    rating,
    price,
    discountPrice,
  } = item;

  return (
    <div className="w-full h-[380px] mx-auto overflow-hidden rounded-lg group relative hover:shadow-xl bg-white border border-gray-200">
      {/* Out of Stock Seal */}
      {availability === false && (
        <div className="absolute right-0 top-0 z-0">
          <div className="bg-red-600 text-white text-xs font-medium py-1 px-4 rounded-bl-md shadow-lg">
            <span className="tracking-wider uppercase">Out of Stock</span>
          </div>
        </div>
      )}

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
              <span>{(discountPrice * rates[currency]).toFixed(2)}</span>
              <span className="text-sm line-through text-gray-400 ml-2">
                {(price * rates[currency]).toFixed(2)}
              </span>
            </p>
            <span className="flex items-center gap-1">
              {rating} <FaStar className="text-yellow-500 text-xs" />
            </span>
          </div>
        </div>

        {/* Hover Buttons */}
        <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex justify-between items-center">
          <button
            className={`text-sm font-medium px-3 py-1 rounded ${
              availability
                ? "cursor-pointer text-sm sm:text-md bg-black hover:bg-white hover:border hover:text-black duration-300 px-3 py-1.5 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!availability}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart?.(item);
            }}
          >
            {availability ? "Add to Cart" : "Out of Stock"}
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
