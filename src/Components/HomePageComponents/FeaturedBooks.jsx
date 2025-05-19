import { FaRegHeart, FaStar } from "react-icons/fa";
import booksData from "/public/bookData.json";
export const FeaturedBooks = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 my-12">
      <h1 className="text-lg sm:text-2xl md:text-4xl font-bold mb-8">
        Featured Books
      </h1>

      <div className="flex gap-8">
        {/* Left Feature Card (hidden on small screens) */}
        <div className="hidden md:block md:w-1/3 relative group overflow-hidden rounded-md text-white max-h-full">
          <figure className="w-full h-full rounded-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format"
              alt="Featured Book"
              className="h-full w-full scale-105 group-hover:scale-150 rounded-lg object-cover transition-all duration-300"
            />
          </figure>
          <div className="absolute inset-0 bg-gradient-to-b from-[#02cc6e25] via-[#02cc6e5b] to-[#02cc6e] transition-all duration-300" />
          <article className="p-6 absolute inset-0 place-content-center">
            <h2 className="text-2xl font-semibold capitalize w-[90%] drop-shadow">
              Learn why going to the mountains can change your thoughts and
              lifestyle forever
            </h2>
          </article>
        </div>

        {/* Right Side Grid of Cards */}
        <div className="w-full px-4 md:px-0 md:w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {booksData.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="relative group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.bookName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-black/70 backdrop-blur-md p-4 rounded-xl shadow-lg translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col gap-3">
                <p className="uppercase text-xs text-red-500 font-semibold mb-1">
                  ISBN: {item.ISBN}
                </p>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                  {item.bookName}
                </h2>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                  author: {item.authorName}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                  {item.shortDescription}
                </p>

                <div className="mt-2 flex justify-between items-center">
                  <p className="text-base font-semibold text-gray-800 dark:text-white">
                    ${item.price}
                  </p>
                  <p className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                    {item.rating} <FaStar className="ml-1 text-yellow-500" />
                  </p>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center mt-4">
                  <button className="text-sm font-medium text-black dark:text-white hover:underline">
                    {item.availability ? "Buy Now" : "Out of Stock"}
                  </button>
                  <FaRegHeart className="text-2xl text-gray-400 hover:text-red-500 transition-colors duration-300 cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
