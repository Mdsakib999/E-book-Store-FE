import { useRef } from "react";
import GalleryIcon from "/assets/image-gallery.png";
import FoodIcon from "/assets/serve.png";
import HeartIcon from "/assets/hearts.png";
import DoctorIcon from "/assets/stethoscope.png";
import BiographyIcon from "/assets/resume.png";
import BabyIcon from "/assets/baby-boy.png";
import {
  MdOutlineKeyboardArrowRight,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

export const FeaturedCategories = () => {
  const menuRef = useRef(null);

  const menuItems = [
    {
      id: 1,
      name: "Arts & Photography",
      icon: GalleryIcon,
      bgColor: "#FAF1FF",
    },
    { id: 2, name: "Food & Drink", icon: FoodIcon, bgColor: "#FAF4EB" },
    { id: 3, name: "Romance", icon: HeartIcon, bgColor: "#F4E6E5" },
    { id: 4, name: "Health", icon: DoctorIcon, bgColor: "#E6F2F4" },
    { id: 5, name: "Biography", icon: BiographyIcon, bgColor: "#FFF6F6" },
    { id: 6, name: "Children", icon: BabyIcon, bgColor: "#FFF6F6" },
  ];

  const scroll = (direction) => {
    if (menuRef.current) {
      menuRef.current.scrollBy({
        left: direction === "left" ? -250 : 250,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 my-10">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 sm:gap-6 md:gap-8">
        <h1 className="text-lg sm:text-2xl md:text-4xl font-bold whitespace-nowrap">
          Featured Categories
        </h1>
        <button className="text-sm sm:text-md md:text-xl flex items-center gap-1 whitespace-nowrap">
          All Categories{" "}
          <MdOutlineKeyboardArrowRight className="text-lg sm:text-xl md:text-2xl" />
        </button>
      </div>

      {/* Arrows + Swipeable Menu */}
      <div className="relative mt-8">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-white bg-orange-500 rounded-full p-2"
        >
          <MdChevronLeft className="text-4xl " />
        </button>

        {/* Scrollable List */}
        <div
          ref={menuRef}
          className="flex gap-4 overflow-x-hidden scroll-smooth px-12 py-4"
        >
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-56 flex flex-col items-center gap-3 p-3 rounded-lg transition-colors duration-200"
              style={{ backgroundColor: "transparent" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = item.bgColor)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <div
                style={{ backgroundColor: item.bgColor }}
                className="p-6 rounded-full"
              >
                <img src={item.icon} alt={item.name} className="w-20 h-20" />
              </div>
              <p className="text-center font-medium">{item.name}</p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-white bg-orange-500 rounded-full p-2"
        >
          <MdChevronRight className="text-4xl" />
        </button>
      </div>
    </div>
  );
};
