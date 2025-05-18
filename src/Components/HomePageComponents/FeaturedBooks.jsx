import { SellCard } from "../Shared/SellCard";

export const FeaturedBooks = () => {
  const dummyData = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800",
      title: "Ego is the Enemy",
      author: "Ryan Holiday",
      price: "$16 - $24",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800",
      title: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      price: "$23 - $33",
    },

    {
      id: 3,
      img: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=800",
      title: "Dare to Lead",
      author: "Brené Brown",
      price: "$20 - $30",
    },
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800",
      title: "Ego is the Enemy",
      author: "Ryan Holiday",
      price: "$16 - $24",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800",
      title: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      price: "$23 - $33",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=800",
      title: "Dare to Lead",
      author: "Brené Brown",
      price: "$20 - $30",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 my-12">
      <h1 className="text-lg sm:text-2xl md:text-4xl font-bold mb-8">
        Featured Books
      </h1>

      <div className="flex gap-8">
        {/* Left Feature Card (hidden on small screens) */}
        <div className="hidden md:block md:w-1/3 relative group overflow-hidden rounded-md text-white h-[500px]">
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
        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
};
