import { FaRegHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

export const BookCard = ({ book }) => {
<<<<<<< HEAD
	return (
		<div className="relative w-full h-[400px] mx-auto my-auto overflow-hidden rounded-md group hover:shadow-2xl border border-gray-200 hover:border hover:border-gray-800 duration-300">
			{/* Out of Stock Seal */}
			{book?.availability === false && (
				<div className="absolute right-0 top-0 z-0">
					<div className="bg-red-600 text-white text-xs font-medium py-1 px-4 rounded-bl-md shadow-lg transform rotate-0 flex items-center justify-center">
						<span className="tracking-wider uppercase">Out of Stock</span>
					</div>
				</div>
			)}
			{/* Image Section */}
			<div className="w-full h-[60%] overflow-hidden">
				<img
					src={book?.image}
					alt={book?.bookName}
					className="object-cover w-full h-full"
				/>
			</div>

			<div className="absolute -bottom-0 z-10 w-full bg-white transition-all duration-500 group-hover:translate-y-[-10px]">
				{/* Top Content */}
				<div className="p-4">
					{/* Book title in fixed height container */}
					<div className="h-[60px] overflow-hidden">
						<h2 className="text-xl font-bold text-black line-clamp-2">
							{book?.bookName}
						</h2>
					</div>
					<p className="text-sm text-gray-500">{book?.authorName}</p>
					<div className="flex justify-between items-center mt-2">
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

				{/* Hover Buttons (bottom aligned) */}
				<div className="px-4 pt-0 pb-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex justify-between items-center">
					<button
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
						}}
						className="cursor-pointer text-sm sm:text-md bg-black hover:bg-white hover:border hover:text-black duration-300 px-3 py-2 rounded text-white"
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
=======
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
>>>>>>> 92be341e93b6ad5b3db2fe8ae584f0b51c7b3e03
};
