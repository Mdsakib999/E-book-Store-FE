import { FaRegHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

export const BookCard = ({ book }) => {
  return (
    <div className="w-full h-[400px] mx-auto overflow-hidden rounded-md group relative hover:shadow-2xl border border-gray-200 hover:border hover:border-gray-800 duration-300">
      {/* Out of Stock Seal */}
      {book?.availability === false && (
        <div className="absolute right-0 top-0 z-0">
          <div className="bg-red-600 text-white text-xs font-medium py-1 px-4 rounded-bl-md shadow-lg transform rotate-0 flex items-center justify-center">
            <span className="tracking-wider uppercase">Out of Stock</span>
          </div>
        </div>
      )}
      {/* Image Section */}
      <div className="w-full h-[80%] overflow-hidden">
        <img
          src={book?.image}
          alt={book?.bookName}
          className="object-cover w-full h-[80%]"
        />
      </div>

      <div className="absolute bottom-0 z-10 w-full h-[40%] p-4 bg-white flex flex-col justify-between gap-2 transition-all duration-500 lg:group-hover:translate-y-[-40px] translate-y-[-10px]">
        {/* Top Content */}
        <div>
          <h2 className="text-md lg:text-xl font-bold text-black">
            {book?.bookName}
          </h2>
          <p className="text-sm text-gray-500">{book?.authorName}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-1.5">
              <p className="text-lg font-bold text-black">
                ${book?.discountPrice}
              </p>
              <p className="text-lg font-bold text-gray-500 line-through">
                ${book?.price}
              </p>
            </div>
            <p className="text-lg font-bold text-black flex items-center gap-x-1.5">
              <span className="font-sans">{book?.rating}</span>
              <FaStar fill="#FFDE21" />
            </p>
          </div>
        </div>
        {/* mobile screen button without hover */}
        <div className="lg:hidden flex justify-between items-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="cursor-pointer text-sm sm:text-md bg-black hover:bg-white hover:border hover:text-black duration-300 px-5 py-3 rounded text-white"
          >
            Add to cart
          </button>
          <FaRegHeart
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="text-3xl hover:bg-red-500 duration-300 p-2 rounded-full text-white bg-black"
          />
        </div>

        {/* Hover Buttons (bottom aligned) */}
        <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex justify-between items-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="cursor-pointer text-sm sm:text-md bg-black hover:bg-white hover:border hover:text-black duration-300 px-5 py-3 rounded text-white"
          >
            Add to cart
          </button>
          <FaRegHeart
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="text-3xl hover:bg-red-500 duration-300 p-2 rounded-full text-white bg-black"
          />
        </div>
      </div>
    </div>
  );
};
