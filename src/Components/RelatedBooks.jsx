import { Link, useLocation } from "react-router-dom";
import booksData from "../assets/bookData.json";
import { BookCard } from "./BookCard";

const RelatedBooks = () => {
  const location = useLocation();
  const { category, id } = location.state || {};
  const relatedBooks = booksData.filter(
    (book) => book.category === category && book.id !== id
  );

  return (
    <div className="mt-16">
      <h1 className="text-3xl font-black mb-5">You Might Also Like...</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedBooks.map((book) => (
          <Link key={book.ISBN} to={`/allbooks/${book.id}`} state={book}>
            <BookCard book={book} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedBooks;
