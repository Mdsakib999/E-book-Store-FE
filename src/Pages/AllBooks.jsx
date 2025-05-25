/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
	FaSearch,
	FaFilter,
	FaTimes,
	FaChevronDown,
	FaChevronUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { SellCard } from "../Components/HomePageComponents/SellCard";
import useBookStore from "../Store/BookStore";
import showToast from "../Utils/ShowToast";
import { useCurrency } from "../provider/CurrencyProvider";

const FilterSection = ({
	genres,
	selectedGenres,
	setSelectedGenres,
	isFilterOpen,
	setIsFilterOpen,
}) => {
	const [isGenreOpen, setIsGenreOpen] = useState(true);

	const toggleGenre = (genre) => {
		setSelectedGenres((prev) =>
			prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
		);
	};

	const handleResetFilters = () => {
		setSelectedGenres([]);
	};

	return (
		<>
			{/* Mobile Filter Button */}
			<div className="flex justify-between items-center mb-4 lg:hidden">
				<h2 className="text-xl font-bold text-gray-800">All Books</h2>
				<button
					onClick={() => setIsFilterOpen(!isFilterOpen)}
					className="flex items-center bg-black text-white px-3 py-2 rounded-md"
				>
					<FaFilter className="mr-2" />
					Filters
				</button>
			</div>

			{/* Mobile Filter Modal */}
			<div
				className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 lg:hidden ${
					isFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
			>
				<div
					className={`absolute right-0 top-0 h-full bg-white w-4/5 max-w-md transform transition-transform duration-300 ${
						isFilterOpen ? "translate-x-0" : "translate-x-full"
					}`}
				>
					<div className="p-4">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-lg font-bold">Filters</h3>
							<button
								onClick={() => setIsFilterOpen(false)}
								className="text-gray-500"
							>
								<FaTimes size={20} />
							</button>
						</div>

						<div className="mb-4">
							<div
								className="flex justify-between items-center mb-2 cursor-pointer"
								onClick={() => setIsGenreOpen(!isGenreOpen)}
							>
								<h4 className="font-medium text-gray-800">Genre</h4>
								{isGenreOpen ? <FaChevronUp /> : <FaChevronDown />}
							</div>
							{isGenreOpen && (
								<div className="space-y-2 ml-2">
									{genres.map((genre) => (
										<div key={`mobile-${genre}`} className="flex items-center">
											<input
												type="checkbox"
												id={`genre-mobile-${genre}`}
												checked={selectedGenres.includes(genre)}
												onChange={() => toggleGenre(genre)}
												className="mr-2"
											/>
											<label
												htmlFor={`genre-mobile-${genre}`}
												className="text-gray-700"
											>
												{genre}
											</label>
										</div>
									))}
								</div>
							)}
						</div>

						<button
							onClick={handleResetFilters}
							className="w-full bg-black text-white py-2 rounded-md mt-4"
						>
							Reset Filters
						</button>
					</div>
				</div>
			</div>

			{/* Desktop Sidebar Filter */}
			<div className="hidden lg:block w-64 pr-6">
				<div className="sticky top-4">
					<h3 className="text-lg font-bold mb-4 text-gray-800">Filters</h3>

					<div className="mb-6">
						<div
							className="flex justify-between items-center mb-2 cursor-pointer"
							onClick={() => setIsGenreOpen(!isGenreOpen)}
						>
							<h4 className="font-medium text-gray-800">Genre</h4>
							{isGenreOpen ? <FaChevronUp /> : <FaChevronDown />}
						</div>
						{isGenreOpen && (
							<div className="space-y-2 ml-2">
								{genres.map((genre) => (
									<div key={`desktop-${genre}`} className="flex items-center">
										<input
											type="checkbox"
											id={`desktop-genre-${genre}`}
											checked={selectedGenres.includes(genre)}
											onChange={() => toggleGenre(genre)}
											className="mr-2"
										/>
										<label
											htmlFor={`desktop-genre-${genre}`}
											className="text-gray-700"
										>
											{genre}
										</label>
									</div>
								))}
							</div>
						)}
					</div>

					<button
						onClick={handleResetFilters}
						className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition-colors duration-300"
					>
						Reset Filters
					</button>
				</div>
			</div>
		</>
	);
};

const AllBooks = () => {
	const { books, fetchBooks } = useBookStore();
	const [filteredBooks, setFilteredBooks] = useState([]);
	const [selectedGenres, setSelectedGenres] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [favorites, setFavorites] = useState({});
	const { currency, rates } = useCurrency();

	useEffect(() => {
		fetchBooks();
	}, [fetchBooks]);

	const uniqueGenres = [...new Set(books.map((book) => book.category))];

	useEffect(() => {
		let results = [...books];

		if (searchQuery.trim() !== "") {
			const query = searchQuery.toLowerCase().trim();
			results = results.filter(
				(book) =>
					book.bookName.toLowerCase().includes(query) ||
					book.authorName.toLowerCase().includes(query)
			);
		}

		if (selectedGenres.length > 0) {
			results = results.filter((book) =>
				selectedGenres.includes(book.category)
			);
		}

		setFilteredBooks(results);
	}, [searchQuery, selectedGenres, books]);

	const handleResetAllFilters = () => {
		setSelectedGenres([]);
		setSearchQuery("");
	};

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

	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			<div className="flex flex-col lg:flex-row">
				<FilterSection
					genres={uniqueGenres}
					selectedGenres={selectedGenres}
					setSelectedGenres={setSelectedGenres}
					isFilterOpen={isFilterOpen}
					setIsFilterOpen={setIsFilterOpen}
				/>

				<div className="flex-1">
					<div className="hidden lg:flex justify-between items-center mb-6">
						<h2 className="text-2xl font-bold text-gray-800">All Books</h2>
						<div className="relative">
							<input
								type="text"
								placeholder="Search by title or author"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black w-64"
							/>
							<FaSearch className="absolute left-3 top-3 text-gray-400" />
						</div>
					</div>

					{/* Mobile Search Bar */}
					<div className="relative mb-4 lg:hidden">
						<input
							type="text"
							placeholder="Search by title or author"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black w-full"
						/>
						<FaSearch className="absolute left-3 top-3 text-gray-400" />
					</div>

					{/* Display filtered books or "no results" message */}
					{filteredBooks.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-12">
							<p className="text-xl text-gray-600 mb-4">
								No books found matching your filters.
							</p>
							<button
								onClick={handleResetAllFilters}
								className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900"
							>
								Reset All Filters
							</button>
						</div>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredBooks.map((item) => (
								<Link key={item._id} to={`/book/${item._id}`} className="block">
									<SellCard
										item={item}
										currency={currency}
										rates={rates}
										isFav={favorites[item.id]}
										toggleFavorite={toggleFavorite}
										onAddToCart={handleAddToCart}
									/>
								</Link>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AllBooks;
