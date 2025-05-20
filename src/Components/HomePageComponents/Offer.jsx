import { Link } from "react-router-dom";
import bookImage from "/assets/offerBook.png";

export const Offer = () => {
	return (
		<div className="rounded-lg relative w-full mt-[200px] md:mt-[300px] lg:mt-[200px] p-8">
			{/* Aurora Effect */}
			<div className="absolute inset-0 bg-gradient-to-l from-black via-gray-500 to-gray-900 opacity-70"></div>

			{/* Book Image Half Above the Card */}
			<div className="absolute -top-24  md:-top-30 lg:-top-10 md:right-30 md:-translate-y-1/3 md:z-10">
				<img src={bookImage} alt="Book" />
			</div>

			{/* Content */}
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between relative items-center mt-20 md:mt-0">
				<div className="max-w-2xl lg:text-left z-20">
					<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
						Get 20% off on your first order
					</h2>
					<p className="mt-4 text-lg leading-6 text-white">
						We are excited to announce our new offer! Get 20% off on your first
						order when you sign up for our newsletter. Don&apos;t miss out on
						this exclusive discount!
					</p>
					<Link to="/allbooks">
						<button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white py-4 px-8 rounded-full">
							Explore Books
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
