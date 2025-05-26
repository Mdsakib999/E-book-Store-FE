import { useEffect, useState } from "react";
import { FaEdit, FaPoundSign, FaSearch, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import UpdateBookModal from "./UpdateBookModal";
import showToast from "../../Utils/ShowToast";
import { useCurrency } from "../../provider/CurrencyProvider";
import useBookStore from "../../Store/BookStore";
import { FaDollarSign, FaEuroSign } from "react-icons/fa6";
import { renderStars } from "../../Utils/renderStars";
import { Pagination } from "../Shared/Pagination";

export const ManageBooks = () => {
  const { currency, rates } = useCurrency();
  const { books, fetchBooks, setBooks, deleteBook } = useBookStore();
  // console.log(books);

  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchBooks().catch((error) => {
      showToast({
        title: "Error",
        text: `Failed to fetch books. ${error.message}`,
        icon: "error",
      });
    });
  }, [fetchBooks]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteBook(id);
        showToast({
          title: "Deleted",
          text: "Book deleted successfully!",
          icon: "success",
        });
      } catch (error) {
        showToast({
          title: "Error",
          text: `Failed to delete book. ${error.message}`,
          icon: "error",
        });
      }
    }
  };

  const handleUpdate = (updatedBook) => {
    try {
      const updatedList = books.map((book) =>
        book.id === updatedBook.id ? updatedBook : book
      );
      setBooks(updatedList);
      showToast({
        title: "Updated",
        text: "Book updated successfully!",
        icon: "success",
      });
    } catch (error) {
      showToast({
        title: "Error",
        text: `Failed to update book. ${error.message}`,
        icon: "error",
      });
    }
  };

  const filteredBooks = books.filter((book) =>
    `${book.bookName} ${book.authorName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="px-4 md:px-8 lg:px-16 py-6">
      <h1 className="text-2xl md:text-4xl text-center font-bold bg-primary text-black">
        Manage All Books
      </h1>

      <div className="flex justify-end">
        <div className="relative my-5 place-items-end">
          <input
            type="text"
            placeholder="Search by title or author"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black w-64"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {paginatedBooks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
          {paginatedBooks.map((book) => (
            <div
              key={book._id}
              className="border border-gray-200 rounded-md shadow-md"
            >
              <figure className="relative h-40 w-full overflow-hidden">
                <img
                  src={book.image}
                  alt={book.bookName}
                  className="h-full w-full object-contain transition-transform duration-500 hover:scale-110"
                />
              </figure>

              <div className="p-4 space-y-2">
                <h2 className="text-lg font-bold text-gray-900">
                  {book.bookName}
                </h2>

                <p className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">Author:</span>{" "}
                  {book.authorName}
                </p>

                <div className="flex justify-between items-center mt-2">
                  <p className="flex items-center gap-1 text-lg font-bold text-indigo-600">
                    {currency === "USD" && <FaDollarSign />}
                    {currency === "EUR" && <FaEuroSign />}
                    {currency === "GBP" && <FaPoundSign />}
                    {(book.discountPrice
                      ? book.discountPrice * rates[currency]
                      : book.price * rates[currency]
                    ).toFixed(2)}
                    {book.discountPrice && (
                      <span className="line-through text-sm text-gray-400 ml-2">
                        {(book.price * rates[currency]).toFixed(2)}
                      </span>
                    )}
                  </p>

                  <div className="flex items-center text-yellow-500">
                    {renderStars(book.rating)}
                    <span className="ml-2 text-sm text-gray-600">
                      ({book.rating}/5)
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm line-clamp-2">
                  {book.description}
                </p>
                <p className="text-gray-500 text-xs truncate">{book.pdf}</p>

                <div className="flex mt-4 space-x-3">
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-sm"
                    onClick={() => setSelectedBook(book)}
                  >
                    <FaEdit className="text-base" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-sm"
                  >
                    <FaTrashAlt className="text-base" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">
          No books found matching your search.
        </p>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredBooks.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />

      {selectedBook && (
        <UpdateBookModal
          data={selectedBook}
          onClose={() => setSelectedBook(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};
