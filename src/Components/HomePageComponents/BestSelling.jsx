import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { SellCard } from "../Shared/SellCard";

export const BestSelling = () => {
  const dummyData = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?w=800",
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: "$20 - $30",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800",
      title: "Atomic Habits",
      author: "James Clear",
      price: "$15 - $25",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800",
      title: "Deep Work",
      author: "Cal Newport",
      price: "$18 - $28",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1586484721263-d3aef8ddfb4b?w=800",
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      price: "$22 - $32",
    },
    {
      id: 5,
      img: "https://images.unsplash.com/photo-1603201667141-04b3fa8a7d9f?w=800",
      title: "Can't Hurt Me",
      author: "David Goggins",
      price: "$25 - $35",
    },
    {
      id: 6,
      img: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800",
      title: "The 5 AM Club",
      author: "Robin Sharma",
      price: "$17 - $27",
    },
    {
      id: 7,
      img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800",
      title: "Think Like a Monk",
      author: "Jay Shetty",
      price: "$19 - $29",
    },
    {
      id: 8,
      img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800",
      title: "The Psychology of Money",
      author: "Morgan Housel",
      price: "$21 - $31",
    },
  ];

  return (
    <div className="max-w-7xl  mx-auto px-4 my-10">
      <div className="flex flex-wrap justify-between items-center gap-4 sm:gap-6 md:gap-8">
        <h1 className="text-lg sm:text-2xl md:text-4xl font-bold whitespace-nowrap">
          BestSelling Books
        </h1>
        <button className="text-sm sm:text-md md:text-xl flex items-center gap-1 whitespace-nowrap">
          View All
          <MdOutlineKeyboardArrowRight className="text-lg sm:text-xl md:text-2xl" />
        </button>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyData.map((item) => (
          <SellCard
            key={item.id}
            img={item.img}
            title={item.title}
            author={item.author}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};
