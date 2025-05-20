import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

const Newsletter = () => {
	const [email, setEmail] = useState("");
	const [subscribed, setSubscribed] = useState(false);

	const handleSubscribe = (e) => {
		e.preventDefault();
		if (email) {
			setSubscribed(true);
			setEmail("");
			setTimeout(() => setSubscribed(false), 3000);
		}
	};

	return (
		<div className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 font-sans">
			<div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
				<h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
					Join Our Newsletter
				</h3>
				<p className="text-gray-600 mb-6 max-w-2xl mx-auto">
					Stay updated with the latest books, exclusive offers, and reading
					insights delivered straight to your inbox.
				</p>

				<div className="flex flex-wrap justify-center gap-4 mb-8">
					<div className="flex items-center text-black text-sm font-medium">
						<FiArrowRight className="mr-2" />
						Weekly Updates
					</div>
					<div className="flex items-center text-black text-sm font-medium">
						<FiArrowRight className="mr-2" />
						Exclusive Content
					</div>
					<div className="flex items-center text-black text-sm font-medium">
						<FiArrowRight className="mr-2" />
						Book Recommendations
					</div>
				</div>

				<form
					onSubmit={handleSubscribe}
					className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl mx-auto"
				>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						className="w-full sm:flex-1 px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
						required
					/>
					<button
						type="submit"
						className="cursor-pointer w-full sm:w-auto bg-black hover:bg-white border hover:text-black text-white font-medium px-6 py-3 rounded-lg transition duration-300"
					>
						Subscribe Now
					</button>
				</form>

				{subscribed && (
					<p className="mt-4 text-green-600 text-sm">
						Thank you for subscribing!
					</p>
				)}
			</div>
		</div>
	);
};

export default Newsletter;
