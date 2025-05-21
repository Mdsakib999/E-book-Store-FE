const dummyOrders = [
  {
    id: 1,
    bookName: "The Silent Patient",
    authorName: "Alex Michaelides",
    shortDescription:
      "A psychological thriller about a woman's act of violence against her husband—and of the therapist obsessed with uncovering her motive.",
    price: 18.99,
    discountPrice: 13.99,
    rating: 4.6,
    image: "/BookImages/book-1.png",
    category: "Thriller",
    availability: false,
    ISBN: "9781250301697",
  },
  {
    id: 2,
    bookName: "Atomic Habits",
    authorName: "James Clear",
    shortDescription:
      "An easy & proven way to build good habits & break bad ones.",
    price: 20.0,
    discountPrice: 15.0,
    rating: 4.8,
    image: "/BookImages/book-2.png",
    category: "Self-help",
    availability: true,
    ISBN: "9780735211292",
  },
  {
    id: 3,
    bookName: "Educated",
    authorName: "Tara Westover",
    shortDescription:
      "A memoir about growing up in a survivalist family and pursuing education against all odds.",
    price: 17.5,
    discountPrice: 12.99,
    rating: 4.7,
    image: "/BookImages/book-3.png",
    category: "Memoir",
    availability: false,
    ISBN: "9780399590504",
  },
];

export const OrderHistory = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Order History</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {dummyOrders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col lg:flex-row bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={order.image}
              alt={order.bookName}
              className="w-full lg:w-32 h-48 object-cover"
            />
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">{order.bookName}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  by {order.authorName}
                </p>
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                  {order.shortDescription}
                </p>
                <p className="text-sm">
                  <span className="line-through text-red-500 mr-2">
                    ${order.price.toFixed(2)}
                  </span>
                  <span className="text-green-600 font-semibold">
                    ${order.discountPrice.toFixed(2)}
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium ${
                    order.availability
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.availability ? "Delivered" : "Pending"}
                </span>
                <button className="text-sm text-blue-600 hover:underline">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
