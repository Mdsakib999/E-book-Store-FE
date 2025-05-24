import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCurrency } from "../../provider/CurrencyProvider";
import { SellCard } from "./SellCard";
import useBookStore from "../../Store/BookStore";
import showToast from "../../Utils/ShowToast";

export const BestSelling = () => {
  const [favorites, setFavorites] = useState({});
  const { currency, rates } = useCurrency();
  const { books, fetchBooks } = useBookStore();

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
        {books.slice(0, 8).map((item) => (
          <Link
            key={item._id}
            to={`/allbooks/${item._id}`}
            state={item}
            className="block"
          >
            <SellCard
              item={item}
              currency={currency}
              rates={rates}
              isFav={favorites[item._id]}
              toggleFavorite={toggleFavorite}
              onAddToCart={handleAddToCart}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
