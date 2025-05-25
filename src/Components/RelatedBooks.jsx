import { Link, useLocation } from "react-router-dom";
import { SellCard } from "./HomePageComponents/SellCard";
import { useEffect, useState } from "react";
import showToast from "../Utils/ShowToast";
import useBookStore from "../Store/BookStore";
import { useCurrency } from "../provider/CurrencyProvider";

const RelatedBooks = ({ category, id }) => {
	const location = useLocation();
	const [favorites, setFavorites] = useState({});
	const { currency, rates } = useCurrency();
	const { books, fetchBooks } = useBookStore();

	useEffect(() => {
		fetchBooks();
	}, [fetchBooks]);

	const toggleFavorite = (bookId) => {
		const isFav = favorites[bookId];
		const updatedFavorites = {
			...favorites,
			[bookId]: !isFav,
		};
		setFavorites(updatedFavorites);
		showToast({
			title: !isFav
				? "Product added to favorites"
				: "Product removed from favorites",
			icon: "success",
		});
	};
	const handleAddToCart = (item) => {
		showToast({
			title: `Added "${item.bookName}" to cart!`,
			icon: "success",
		});
	};
	if (!books || books.length === 0) {
		return <div className="p-4">Loading books or no books available...</div>;
	}

	const relatedBooks = books.filter(
		(book) => book.category === category && book._id !== id
	);

	return (
		<div className="mt-16">
			<h1 className="text-3xl font-black mb-5">You Might Also Like...</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{relatedBooks.map((book) => (
					<Link key={book._id} to={`/allbooks/${book._id}`} state={book}>
						<SellCard
							item={book}
							currency={currency}
							rates={rates}
							isFav={favorites[book._id]}
							toggleFavorite={toggleFavorite}
							onAddToCart={handleAddToCart}
						/>{" "}
					</Link>
				))}
			</div>
		</div>
	);
};

export default RelatedBooks;
