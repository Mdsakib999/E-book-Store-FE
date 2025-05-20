import { Link, useLocation } from "react-router-dom";
import booksData from "../../public/bookData.json";
import { BookCard } from "./BookCard";

const RelatedBooks = () => {
	const location = useLocation();
	const { category, id } = location.state || {};
	const relatedBooks = booksData.filter(
		(book) => book.category === category && book.id !== id
	);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
			{relatedBooks.map((book) => (
				<Link key={book.ISBN} to={`/allbooks/${book.id}`} state={book}>
					<BookCard book={book} />
				</Link>
			))}
		</div>
	);
};

export default RelatedBooks;
