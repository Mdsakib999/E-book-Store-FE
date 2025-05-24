import { FaHeart, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPoundSign, FaEuroSign, FaDollarSign } from "react-icons/fa";
import { useCurrency } from "../../provider/CurrencyProvider";
import useBookStore from "../../Store/BookStore";
import showToast from "../../Utils/ShowToast";
import { renderStars } from "../../Utils/renderStars";

export const FeaturedBooks = () => {
  const { books, fetchBooks } = useBookStore();
  const [favorites, setFavorites] = useState({});
  const { currency, rates } = useCurrency();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const toggleFavorite = (bookId) => {
    const isFav = favorites[bookId];
    const updatedFavorites = {
      ...favorites,
      [bookId]: !isFav,
    };
    setFavorites(updatedFavorites);
    showToast({
      title: !isFav
        ? "Product added to favorites"
        : "Product removed from favorites",
      icon: "success",
    });
  };
  const handleAddToCart = (item) => {
    showToast({
      title: `Added "${item.bookName}" to cart!`,
      icon: "success",
    });
  };
  if (!books || books.length === 0) {
    return <div className="p-4">Loading books or no books available...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-lg sm:text-2xl md:text-4xl font-bold mb-8">
        Featured Books
      </h1>

      <div className="flex gap-8">
        {/* Left Feature Card (hidden on small screens) */}
        <div className="hidden lg:block md:w-1/3 relative group overflow-hidden rounded-md text-white max-h-full">
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
        <div className="w-full px-4 md:px-0 md:w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {books.slice(0, 6).map((item) => {
            const isFav = favorites[item._id];
            return (
              <Link
                key={item._id}
                to={`/book/${item._id}`}
                state={item}
                className="relative group bg-white  rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="lg:aspect-[3/4] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.bookName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 "
                  />
                </div>

                {/* Info Overlay */}
                <div
                  className="md:absolute md:bottom-4 md:left-4 md:right-4 
                lg:mt-4 md:mt-0 
                bg-white/60 backdrop-blur-md p-4 rounded-xl shadow-lg 
                translate-y-0 opacity-100 
                md:translate-y-10 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 
                transition-all duration-500 flex flex-col justify-between"
                >
                  <h2 className="text-lg font-bold text-gray-900  truncate ">
                    {item.bookName}
                  </h2>
                  <p className="text-sm font-semibold text-black py-1">
                    Author: {item.authorName}
                  </p>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {item.shortDescription}
                  </p>

                  <div className=" flex justify-between items-center ">
                    <p className="flex items-center text-base font-semibold text-gray-800  mt-1">
                      <span>
                        {currency === "USD" && <FaDollarSign />}
                        {currency === "EUR" && <FaEuroSign />}
                        {currency === "GBP" && <FaPoundSign />}
                      </span>
                      <span className="text-lg">
                        {(item.discountPrice * rates[currency]).toFixed(2)}
                      </span>
                      <span className="text-sm line-through text-gray-500 ml-2">
                        {(item.price * rates[currency]).toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <div className="flex">
                    {renderStars(item.rating)}
                    <span className="ml-2 text-gray-600 text-sm">
                      ({item.rating}/5)
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center mt-2">
                    <button
                      className="font-medium cursor-pointer text-sm sm:text-md bg-black hover:bg-white hover:border hover:text-black duration-300 px-3 py-1.5 rounded text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(item._id);
                      }}
                      className={`rounded-full p-2 ${
                        isFav
                          ? "bg-red-50 text-red-500"
                          : "bg-gray-100 text-gray-400"
                      } hover:bg-red-100 transition-colors duration-200`}
                    >
                      <FaHeart
                        className={`${
                          isFav ? "text-red-500" : "text-gray-400"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
