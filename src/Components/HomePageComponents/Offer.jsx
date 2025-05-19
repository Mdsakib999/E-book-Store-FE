import { Link } from "react-router-dom";
import bookImage from "/assets/offerBook.png";

export const Offer = () => {
	return (
		<div className="rounded-lg relative w-full mt-[200px] md:mt-[300px] lg:mt-[200px] py-32 lg:py-20 max-w-7xl mx-auto bg-gradient-to-b from-black to-gray-100">
			{/* Card Container */}
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 rounded bg-white/30 py-16">
				{/* Book Image */}
				<div className="absolute -top-5 md:right-20 md:-top-10 lg:-top-5 z-10 drop-shadow-xl">
					<img src={bookImage} alt="Book" />
				</div>

				{/* Content */}
				<div className="relative z-20 max-w-2xl lg:text-left">
					<h2 className="md:text-2xl lg:text-3xl font-bold tracking-tight text-white sm:text-4xl drop-shadow-md">
						Get 20% off on your first order
					</h2>
					<p className="mt-4 md:text-md lg:text-lg leading-6 text-white drop-shadow-xl">
						We are excited to announce our new offer! Get 20% off on your first
						order when you sign up for our newsletter. Don&apos;t miss out on
						this exclusive discount!
					</p>
					<Link to="/allbooks">
						<button className="mt-8 bg-gradient-to-r from-black to-gray-500 text-white py-4 px-8 rounded-xl transition duration-300 shadow-md">
							Explore Books
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
