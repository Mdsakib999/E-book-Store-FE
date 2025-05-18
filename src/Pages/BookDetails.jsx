import {
	FaStar,
	FaStarHalfAlt,
	FaMinus,
	FaPlus,
	FaShoppingCart,
	FaCalendarAlt,
	FaUser,
	FaHeart,
} from "react-icons/fa";
import got from "../assets/got.jpg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";

const BookDetails = () => {
	const [quantity, setQuantity] = useState(1);
	const [isFavorite, setIsFavorite] = useState(false);

	const incrementQuantity = () => {
		setQuantity((prev) => prev + 1);
	};

	const decrementQuantity = () => {
		if (quantity > 1) {
			setQuantity((prev) => prev - 1);
		}
	};

	const toggleFavorite = () => {
		setIsFavorite(!isFavorite);
	};

	return (
		<div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50">
			{/* Book Main Details */}
			<div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden mb-8">
				{/* Book Image */}
				<div className="md:w-2/5 p-6 flex justify-center border border-gray-400 rounded-lg">
					<div className="relative">
						<img
							className="h-96 w-80 object-cover rounded-md shadow-lg transform transition hover:scale-105 duration-300"
							src={got}
							alt="A Song of Ice and Fire Book Cover"
						/>
						<div className="absolute top-4 right-4">
							<button
								onClick={toggleFavorite}
								className={`rounded-full p-2 ${
									isFavorite
										? "bg-red-50 text-red-500"
										: "bg-gray-100 text-gray-400"
								} hover:bg-red-100 transition-colors duration-200`}
							>
								<FaHeart
									className={`${isFavorite ? "text-red-500" : "text-gray-400"}`}
								/>
							</button>
						</div>
					</div>
				</div>

				{/* Book Info */}
				<div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
					<div>
						<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
							A Song of Ice and Fire
						</h1>

						<div className="flex flex-col sm:flex-row sm:items-center gap-y-2 sm:gap-x-6 mb-4">
							<div className="flex items-center text-yellow-400">
								<FaStar />
								<FaStar />
								<FaStar />
								<FaStar />
								<FaStarHalfAlt />
								<span className="ml-2 text-gray-600 text-sm">(4.5/5)</span>
							</div>

							<div className="flex items-center text-gray-600">
								<FaUser className="mr-2" />
								<p className="text-md">
									By{" "}
									<span className="font-medium text-blue-600 hover:underline cursor-pointer">
										George R. R. Martin
									</span>
								</p>
							</div>
						</div>

						<div className="flex items-center text-gray-600 mb-4">
							<FaCalendarAlt className="mr-2" />
							<p className="text-md">
								First Published:{" "}
								<span className="font-medium">August 1996</span>
							</p>
						</div>

						<div className="mb-6">
							<p className="text-gray-700 leading-relaxed">
								A Song of Ice and Fire is an award-winning series of epic
								fantasy novels by American novelist and screenwriter George R.
								R. Martin. The series, which inspired the popular HBO show Game
								of Thrones, tells the story of a medieval country's civil war
								and is notable for its political intrigue, morally ambiguous
								characters, and minimal use of magic.
							</p>
						</div>

						<div className="flex items-center text-gray-700 mb-4">
							<span className="font-bold text-xl text-blue-600 mr-2">
								$29.99
							</span>
							<span className="line-through text-gray-500">$39.99</span>
							<span className="ml-3 px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium">
								25% OFF
							</span>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row gap-4 mt-4">
						<div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
							<button
								onClick={decrementQuantity}
								className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
							>
								<FaMinus className="text-gray-600" />
							</button>
							<span className="px-4 py-2 flex-grow text-center font-medium">
								{quantity}
							</span>
							<button
								onClick={incrementQuantity}
								className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
							>
								<FaPlus className="text-gray-600" />
							</button>
						</div>

						<button className="flex-grow bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200 flex items-center justify-center">
							<FaShoppingCart className="mr-2" />
							Add to Cart
						</button>
					</div>
				</div>
			</div>

			{/* Book Tabs Section */}
			<div className="bg-white rounded-lg shadow-md overflow-hidden">
				<Tabs>
					<TabList className="flex border-b border-gray-200 bg-gray-50">
						<Tab className="px-6 py-4 text-center text-gray-600 hover:text-blue-600 cursor-pointer outline-none focus:outline-none">
							Description
						</Tab>
						<Tab className="px-6 py-4 text-center text-gray-600 hover:text-blue-600 cursor-pointer outline-none focus:outline-none">
							Reviews
						</Tab>
					</TabList>

					<TabPanel className="p-6">
						<h2 className="text-2xl font-semibold text-gray-800 mb-4">
							About A Song of Ice and Fire
						</h2>
						<p className="text-gray-700 mb-4">
							A Song of Ice and Fire is an epic high fantasy series by George R.
							R. Martin, widely regarded as one of the most ambitious and
							realistic fantasy sagas ever written. Spanning across seven
							planned books (with five published so far), it blends intricate
							political intrigue, deeply human characters, and a richly detailed
							world. It serves as the foundation for the HBO show Game of
							Thrones, but the books are more layered, philosophical, and
							emotionally immersive.
						</p>
						<p className="text-gray-700 mb-4">
							🗺️ Worldbuilding: Westeros & Essos Martin’s world is massive and
							immersive, taking place primarily on two continents: Westeros: A
							land of medieval politics, noble houses, shifting alliances, and a
							mysterious icy threat in the North. Essos: A vast eastern
							continent full of ancient cities, magical traditions, mercenary
							groups, and political ideologies. The depth of the geography,
							religions (like the Faith of the Seven, R’hllor, Old Gods),
							cultures, and languages rivals Tolkien’s Middle-earth — but feels
							grittier and more grounded.
						</p>
						<p className="text-gray-700">
							👑 Core Premise: The Game of Thrones At its heart, the series is
							about power: how it’s gained, lost, corrupted, and used. The
							famous quote, “When you play the game of thrones, you win or you
							die,” defines the tone. While noble houses like the Starks,
							Lannisters, Targaryens, and Baratheons vie for control of the Iron
							Throne, darker forces stir in the background — ancient magic,
							dragons, and the supernatural threat of the White Walkers.
						</p>

						<p className="text-gray-700">
							🔥❄️ Thematic Duality: Ice and Fire The title isn’t just poetic —
							it symbolizes the two opposing forces of the story: Ice: The
							coming winter, the White Walkers, the Wall, and the North’s grim
							harshness. Fire: Dragons, Targaryen blood, R’hllor’s flame god,
							and fiery magic. This duality reflects the conflict between cold
							rational survival and fiery ambition or destiny.
						</p>
					</TabPanel>

					<TabPanel className="p-6">
						<h2 className="text-2xl font-semibold text-gray-800 mb-4">
							Reader Reviews
						</h2>

						<div className="border-b border-gray-200 pb-4 mb-4">
							<div className="flex items-center mb-2">
								<div className="hidden md:flex text-yellow-400">
									<FaStar />
									<FaStar />
									<FaStar />
									<FaStar />
									<FaStar />
								</div>
								<span className="ml-2 font-medium">John D.</span>
								<span className="mx-2 text-gray-400">•</span>
								<span className="text-sm text-gray-500">June 12, 2023</span>
							</div>
							<p className="text-gray-700">
								Absolutely brilliant writing! Martin created a fantasy world
								unlike any other with real, flawed characters and unexpected
								plot developments. The political intrigue is masterfully
								crafted.
							</p>
						</div>

						<div className="border-b border-gray-200 pb-4 mb-4">
							<div className="flex items-center mb-2">
								<div className="hidden md:flex text-yellow-400">
									<FaStar />
									<FaStar />
									<FaStar />
									<FaStar />
									<FaStarHalfAlt />
								</div>
								<span className="ml-2 font-medium">Maria S.</span>
								<span className="mx-2 text-gray-400">•</span>
								<span className="text-sm text-gray-500">April 3, 2023</span>
							</div>
							<p className="text-gray-700">
								The world-building is extraordinary and the characters feel so
								real. My only complaint is waiting for the next books! Still one
								of the best fantasy series ever written.
							</p>
						</div>

						<div>
							<div className="flex items-center mb-2">
								<div className="hidden md:flex text-yellow-400">
									<FaStar />
									<FaStar />
									<FaStar />
									<FaStar />
									<FaStar />
								</div>
								<span className="ml-2 font-medium">Robert L.</span>
								<span className="mx-2 text-gray-400">•</span>
								<span className="text-sm text-gray-500">February 19, 2023</span>
							</div>
							<p className="text-gray-700">
								I couldn't put these books down. The character development is
								phenomenal, and the way Martin weaves the various storylines
								together is masterful. Worth every penny!
							</p>
						</div>
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
};

export default BookDetails;
