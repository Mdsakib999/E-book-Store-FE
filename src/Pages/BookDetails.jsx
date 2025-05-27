import { FaUser, FaHeart } from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useEffect, useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import RelatedBooks from "../Components/RelatedBooks";
import { useCurrency } from "../provider/CurrencyProvider";
import { FaPoundSign, FaEuroSign, FaDollarSign } from "react-icons/fa";
import useBookStore from "../Store/BookStore";
import { useParams } from "react-router-dom";
import { renderStars } from "../Utils/renderStars";
import showToast from "../Utils/ShowToast";
import { useCart } from "../provider/CartProvider";

const BookDetails = () => {
  const { title } = useParams();
  const [favorites, setFavorites] = useState({});
  const { currency, rates } = useCurrency();
  const { book, fetchBookByTitle, error } = useBookStore();
  const { addToCart, removeFromCart, isInCart } = useCart();
  // console.log(title);
  const handleCartAction = (item) => {
    const itemInCart = isInCart(item._id);

    if (itemInCart) {
      removeFromCart?.(item._id);
      showToast({
        title: `Removed "${item.bookName}" from cart!`,
        icon: "success",
      });
    } else {
      addToCart?.(item);
      showToast({
        title: `Added "${item.bookName}" to cart!`,
        icon: "success",
      });
    }
  };

  useEffect(() => {
    fetchBookByTitle(title);
  }, [title, fetchBookByTitle]);

  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
  if (!book) return <div className="p-4 text-center">Book not found</div>;

  const isFav = favorites[book.id];
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50">
      {/* Book Main Details */}
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden mb-8">
        {/* Book Image */}
        <div className="md:w-2/5 p-4 sm:p-6 flex justify-center items-center border border-gray-300 rounded-lg">
          <div className="relative w-full max-w-xs">
            <img
              className="w-full h-auto max-h-96 object-cover rounded-md shadow-lg transform transition hover:scale-105 duration-300"
              src={book?.image}
              alt="Book Cover"
            />

            <div className="absolute top-4 right-4">
              <button
                onClick={() => toggleFavorite(book.id)}
                className={`rounded-full p-2 
       ${isFav ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-400"}
       hover:bg-red-100 transition-colors duration-200`}
              >
                <FaHeart className={isFav ? "text-red-500" : "text-gray-400"} />
              </button>
            </div>
          </div>
        </div>

        {/* Book Info */}
        <div className="md:w-3/5 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              {book.bookName}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 sm:gap-x-6 mb-4">
              <div className="flex items-center">
                <div className="flex">{renderStars(book.rating)}</div>
                <span className="ml-2 text-gray-600 text-sm">
                  ({book.rating}/5)
                </span>
              </div>

              <div className="flex items-center text-gray-600">
                <FaUser className="mr-2" />
                <p className="text-md">
                  By{" "}
                  <span className="font-medium text-blue-600 hover:underline cursor-pointer">
                    {book.authorName}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center text-gray-600 mb-4">
              <BiSolidCategory className="mr-2" />
              <p className="text-md">
                Genre: <span className="font-medium">{book.category}</span>
              </p>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">
                {book?.description}{" "}
              </p>
            </div>
            <div className="mb-6"></div>

            <div className="flex items-center text-gray-700 mb-4">
              <p className="flex items-center justify-center text-base font-semibold text-gray-800 mt-1">
                {currency === "USD" && <FaDollarSign className="text-xl" />}
                {currency === "EUR" && <FaEuroSign className="text-xl" />}
                {currency === "GBP" && <FaPoundSign className="text-xl" />}
                <span className="text-xl">
                  {book.discountPrice
                    ? (book.discountPrice * rates[currency]).toFixed(2)
                    : (book.price * rates[currency]).toFixed(2)}
                </span>
              </p>
              {book.discountPrice && (
                <span className="line-through text-gray-500 ml-2">
                  {(book.price * rates[currency]).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                // disabled={isInCart(book._id)}
                onClick={(e) => {
                  handleCartAction(book);
                }}
                className={`font-medium rounded cursor-pointer text-sm sm:text-md px-5 py-2 ${
                  isInCart(book._id)
                    ? "bg-white text-black border border-black hover:bg-black hover:text-white"
                    : "bg-black text-white hover:bg-white hover:text-black hover:border"
                } duration-300`}
              >
                {isInCart(book._id) ? "Remove from Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Book Tabs Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Tabs>
          <TabList className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto">
            <Tab className="px-4 sm:px-6 py-3 sm:py-4 text-center text-gray-600 hover:text-blue-600 cursor-pointer outline-none focus:outline-none whitespace-nowrap">
              Description
            </Tab>
            <Tab className="px-4 sm:px-6 py-3 sm:py-4 text-center text-gray-600 hover:text-blue-600 cursor-pointer outline-none focus:outline-none whitespace-nowrap">
              Reviews
            </Tab>
          </TabList>

          <TabPanel className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              About {book.bookName}
            </h2>
            <p className="text-gray-700 mb-4">{book.shortDescription}</p>
          </TabPanel>

          <TabPanel className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              Reader Reviews
            </h2>

            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex flex-wrap items-center mb-2">
                <div className="flex items-center">
                  <div className="flex">{renderStars(book.rating)}</div>
                  <span className="ml-2 text-gray-600 text-sm">
                    ({book.rating}/5)
                  </span>
                </div>

                <span className="font-medium">John D.</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-sm text-gray-500">June 12, 2023</span>
              </div>
              <p className="text-gray-700">
                Absolutely brilliant writing! Martin created a fantasy world
                unlike any other with real, flawed characters and unexpected
                plot developments. The political intrigue is masterfully
                crafted.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex flex-wrap items-center mb-2">
                <div className="flex items-center">
                  <div className="flex">{renderStars(book.rating)}</div>
                  <span className="ml-2 text-gray-600 text-sm">
                    ({book.rating}/5)
                  </span>
                </div>

                <span className="font-medium">Maria S.</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-sm text-gray-500">April 3, 2023</span>
              </div>
              <p className="text-gray-700">
                The world-building is extraordinary and the characters feel so
                real. My only complaint is waiting for the next books! Still one
                of the best fantasy series ever written.
              </p>
            </div>
            <div>
              <div className="flex flex-wrap items-center mb-2">
                <div className="flex items-center">
                  <div className="flex">{renderStars(book.rating)}</div>
                  <span className="ml-2 text-gray-600 text-sm">
                    ({book.rating}/5)
                  </span>
                </div>

                <span className="font-medium">Robert L.</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-sm text-gray-500">February 19, 2023</span>
              </div>
              <p className="text-gray-700">
                I couldn&apos;t put these books down. The character development
                is phenomenal, and the way Martin weaves the various storylines
                together is masterful. Worth every penny!
              </p>
            </div>
          </TabPanel>
        </Tabs>
      </div>
      <RelatedBooks category={book.category} id={book._id} />
    </div>
  );
};

export default BookDetails;
