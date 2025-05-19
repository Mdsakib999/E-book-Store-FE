import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { SellCard } from "../Shared/SellCard";
import booksData from "/public/bookData.json";
import { Link } from "react-router-dom";

export const BestSelling = () => {
  return (
    <div className="max-w-7xl  mx-auto px-4 my-10">
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
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {booksData.map((item) => (
          <SellCard
            key={item.ISBN}
            isbn={item.ISBN}
            img={item.image}
            title={item.bookName}
            author={item.authorName}
            rating={item.rating}
            desc={item.shortDescription}
            price={item.discountPrice}
            originalPrice={item.price}
            category={item.genre}
            availability={item.availability}
          />
        ))}
      </div>
    </div>
  );
};
