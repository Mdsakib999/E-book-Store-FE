import { useEffect, useRef } from "react";
import { FaBookOpen, FaBrain, FaHeart, FaLandmark, FaRocket, FaUserEdit, FaUserSecret, FaUserTie } from "react-icons/fa";
import { GiBrokenWall } from "react-icons/gi";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useBookStore from "../../Store/BookStore";

export const FeaturedCategories = () => {
  const menuRef = useRef(null);
  const { books, fetchBooks } = useBookStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const uniqueGenres = [...new Set(books.map((book) => book.category))];
  const menuItems = [
    { id: 1, name: uniqueGenres[0]?.toUpperCase() || "PHILOSOPHY", icon: FaBrain, bgColor: "#FAF4EB" },
    { id: 2, name: uniqueGenres[1]?.toUpperCase() || "ROMANCE", icon: FaHeart, bgColor: "#F4E6E5" },
    { id: 3, name: uniqueGenres[2]?.toUpperCase() || "THRILLER", icon: FaUserSecret, bgColor: "#E6F2F4" },
    { id: 4, name: uniqueGenres[3]?.toUpperCase() || "BIOGRAPHY", icon: FaUserTie, bgColor: "#FFF6F6" },
    { id: 5, name: uniqueGenres[4]?.toUpperCase() || "HISTORY", icon: FaLandmark, bgColor: "#FFF6F6" },
    { id: 6, name: uniqueGenres[5]?.toUpperCase() || "MEMOIR", icon: FaUserEdit, bgColor: "#FAF4EB" },
    { id: 7, name: uniqueGenres[6]?.toUpperCase() || "SCIENCE FICTION", icon: FaRocket, bgColor: "#F4E6E5" },
    { id: 8, name: uniqueGenres[7]?.toUpperCase() || "DYSTOPIAN", icon: GiBrokenWall, bgColor: "#E6F2F4" },
    { id: 9, name: uniqueGenres[8]?.toUpperCase() || "FICTION", icon: FaBookOpen, bgColor: "#FFF6F6" },
  ];

  const scroll = (direction) => {
    if (menuRef.current) {
      menuRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 my-12 lg:my-24">
      {/* Header */}
      <h1 className="text-lg sm:text-2xl md:text-4xl font-bold whitespace-nowrap">
        Featured Categories
      </h1>

      {/* Arrows + Swipeable Menu */}
      <div className="relative mt-8">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-white bg-black rounded-full p-2 opacity-30 hover:opacity-80 cursor-pointer"
        >
          <MdChevronLeft className="text-xl lg:text-4xl " />
        </button>

        {/* Scrollable List */}
        <div
          ref={menuRef}
          className="flex gap-4 overflow-x-hidden scroll-smooth px-8 lg:px-12 py-4 "
        >
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-48 lg:w-64 flex flex-col items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer hover:shadow-lg active:scale-95"
              style={{ backgroundColor: "transparent" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = item.bgColor)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
              onClick={() => navigate(`/allbooks?category=${item.name}`)}
            >
              <div
                style={{ backgroundColor: item.bgColor }}
                className="p-6 rounded-full"
              >
                {typeof item.icon === 'string' ? (
                    <img
                    src={item.icon}
                    alt={item.name}
                    className="w-12 h-12 lg:w-20 lg:h-20"
                  />
                ) : (
                    <item.icon className="w-12 h-12 lg:w-20 lg:h-20 text-gray-700" />
                )}
              </div>
              <p className="text-center ont-semibold">{item.name}</p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-white bg-black rounded-full p-2 opacity-30 hover:opacity-80 cursor-pointer"
        >
          <MdChevronRight className="text-xl lg:text-4xl" />
        </button>
      </div>
    </div>
  );
};
