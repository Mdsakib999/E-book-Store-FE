import GalleryIcon from "/assets/image-gallery.png";
import FoodIcon from "/assets/serve.png";
import HeartIcon from "/assets/hearts.png";
import DoctorIcon from "/assets/stethoscope.png";
import BiographyIcon from "/assets/resume.png";
import BabyIcon from "/assets/baby-boy.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
export const FeaturedCategories = () => {
  const menuItems = [
    {
      id: 1,
      name: "Arts & Photography",
      icon: GalleryIcon,
      bgColor: "#FAF1FF",
    },
    {
      id: 2,
      name: "Food & Drink",
      icon: FoodIcon,
      bgColor: "#FAF4EB",
    },
    {
      id: 3,
      name: "Romance",
      icon: HeartIcon,
      bgColor: "#F4E6E5",
    },
    {
      id: 4,
      name: "Health",
      icon: DoctorIcon,
      bgColor: "#E6F2F4",
    },
    {
      id: 5,
      name: "Biography",
      icon: BiographyIcon,
      bgColor: "#FFF6F6",
    },
    {
      id: 6,
      name: "Children",
      icon: BabyIcon,
      bgColor: "#FFF6F6",
    },
  ];

  return (
    <div className="max-w-7xl  mx-auto px-4 my-10">
      <div className="flex flex-wrap justify-between items-center gap-4 sm:gap-6 md:gap-8">
        <h1 className="text-lg sm:text-2xl md:text-4xl font-bold whitespace-nowrap">
          Featured Categories
        </h1>
        <button className="text-sm sm:text-md md:text-xl flex items-center gap-1 whitespace-nowrap">
          All Categories{" "}
          <MdOutlineKeyboardArrowRight className="text-lg sm:text-xl md:text-2xl" />
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-4 lg:grid-cols-6 mt-8">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 min-w-[250px] flex flex-col items-center gap-3 p-3 rounded-lg transition-colors duration-200 md:min-w-0"
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
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
