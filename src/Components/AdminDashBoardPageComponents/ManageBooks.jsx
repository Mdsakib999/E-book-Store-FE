/* eslint-disable */
import { useEffect, useState } from "react";
import { FaEdit, FaSearch, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import UpdateBookModal from "./UpdateBookModal";
import showToast from "../../Utils/ShowToast";
import { useCurrency } from "../../provider/CurrencyProvider";
import useBookStore from "../../Store/BookStore";

export const ManageBooks = () => {
  const { currency, rates } = useCurrency();
  const { books, fetchBooks, setBooks } = useBookStore();
  console.log(books);

  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
        // Optional: call API to delete book here
        const updatedBooks = books.filter((book) => book.id !== id);
        setBooks(updatedBooks);
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

  return (
    <div className="px-4 md:px-8 lg:px-16 py-6">
      <h1 className="text-2xl md:text-4xl text-center font-bold bg-primary text-black py-4 px-6">
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

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <div
              key={book._id}
              className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden"
            >
              <figure className="relative h-40 w-full overflow-hidden">
                <img
                  src={book.image}
                  alt={book.bookName}
                  className="h-full w-full object-contain transition-transform duration-500 hover:scale-110"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-xl font-semibold mb-2">
                  {book.bookName}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>Author:</strong> {book.authorName}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>Price:</strong> ${book.price}
                  {book.discountPrice && (
                    <span className="ml-2 text-green-600">
                      (Discount: ${book.discountPrice})
                    </span>
                  )}
                </p>

                <p className="text-gray-600 text-sm line-clamp-3">
                  {book.description}
                </p>
                <p className="text-gray-600 text-sm line-clamp-3">{book.pdf}</p>

                <div className="flex mt-4 space-x-4">
                  <button
                    className="btn bg-indigo-500 text-white flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-indigo-600 transition"
                    onClick={() => setSelectedBook(book)}
                  >
                    <FaEdit className="text-lg" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="btn bg-red-500 text-white flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-red-600 transition"
                  >
                    <FaTrashAlt className="text-lg" /> Delete
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
