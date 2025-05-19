import { Link } from "react-router-dom";
import bookImage from "/assets/offerBook.png";

export const Offer = () => {
  return (
    <div className="relative w-full mt-[200px] md:mt-[300px] lg:mt-[200px] py-20">
      {/* Full-width Gradient Background */}
      <div className="absolute inset-0 -top-10 z-0 max-w-7xl mx-auto h-[500px] rounded-2xl blur-2xl opacity-80 bg-gradient-to-b from-gray-500 to-gray-900" />

      {/* Card Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 rounded-lg bg-white/50 shadow-xl py-16">
        {/* Book Image */}
        <div className="absolute -top-24 right-0 md:-top-32 lg:-top-20 drop-shadow-xl">
          <img src={bookImage} alt="Book" />
        </div>

        {/* Content */}
        <div className="mt-20 md:mt-0 max-w-2xl lg:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl drop-shadow-md">
            Get 20% off on your first order
          </h2>
          <p className="mt-4 text-lg leading-6 text-white/80 drop-shadow-sm">
            We are excited to announce our new offer! Get 20% off on your first
            order when you sign up for our newsletter. Don&apos;t miss out on
            this exclusive discount!
          </p>
          <Link to="/allbooks">
            <button className="mt-8 bg-gradient-to-r from-black to-gray-500 text-white py-4 px-8 rounded-xl transition duration-300 shadow-md">
              Explore Books
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
