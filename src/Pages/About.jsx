import {
	FaBook,
	FaUsers,
	FaGlobe,
	FaAward,
	FaHeart,
	FaRocket,
	FaShieldAlt,
	FaMobile,
	FaHeadset,
	FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
	const stats = [
		{ icon: FaBook, number: "50K+", label: "E-Books Available" },
		{ icon: FaUsers, number: "1M+", label: "Happy Readers" },
		{ icon: FaGlobe, number: "150+", label: "Countries Served" },
		{ icon: FaAward, number: "25+", label: "Industry Awards" },
	];

	const features = [
		{
			icon: FaMobile,
			title: "Cross-Platform Reading",
			description:
				"Read seamlessly across all your devices with automatic sync of bookmarks, notes, and reading progress.",
		},
		{
			icon: FaShieldAlt,
			title: "Secure & Reliable",
			description:
				"Your data is protected with enterprise-grade security, ensuring your privacy and reading history stay safe.",
		},
		{
			icon: FaHeadset,
			title: "24/7 Customer Support",
			description:
				"Our dedicated support team is always ready to help you with any questions or technical issues.",
		},
		{
			icon: FaRocket,
			title: "Lightning Fast",
			description:
				"Experience instant downloads and smooth reading with our optimized platform and CDN infrastructure.",
		},
	];

	const team = [
		{
			name: "Sarah Johnson",
			role: "CEO & Founder",
			image:
				"https://images.unsplash.com/photo-1722270608841-35d7372a2e85?w=300&h=300&fit=crop&crop=face",
			description:
				"Passionate about making reading accessible to everyone, everywhere.",
		},
		{
			name: "Michael Chen",
			role: "CTO",
			image:
				"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
			description:
				"Tech enthusiast building the future of digital reading experiences.",
		},
		{
			name: "Emily Rodriguez",
			role: "Head of Content",
			image:
				"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
			description:
				"Curating the best collection of e-books across all genres and languages.",
		},
		{
			name: "David Kim",
			role: "Head of Design",
			image:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
			description:
				"Creating beautiful and intuitive reading experiences for our users.",
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-gray-200 via-gray-500 to-gray-900 text-white py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">About Readify</h2>
					<p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
						We're on a mission to democratize reading by making the world's best
						books accessible to everyone, anywhere, anytime. Join millions of
						readers who have discovered their next favorite story with us.
					</p>
				</div>
			</div>

			{/* Stats Section */}
			<div className="py-16 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						{stats.map((stat, index) => (
							<div key={index} className="text-center group">
								<div className="bg-gradient-to-br from-gray-950 to-purple-100 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
									<stat.icon className="text-2xl text-white" />
								</div>
								<h3 className="text-3xl font-bold text-gray-800 mb-2">
									{stat.number}
								</h3>
								<p className="text-gray-600">{stat.label}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Story Section */}
			<div className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div>
							<h3 className="text-3xl font-bold text-gray-800 mb-6">
								Our Story
							</h3>
							<div className="space-y-4 text-gray-600 leading-relaxed">
								<p>
									Founded in 2019, Readify began with a simple yet powerful
									vision: to break down the barriers that prevent people from
									accessing great literature. Our founders, avid readers
									themselves, noticed how difficult it was to find, purchase,
									and enjoy books in the digital age.
								</p>
								<p>
									What started as a small startup with a handful of e-books has
									grown into a global platform serving over a million readers
									worldwide. We've partnered with publishers, authors, and
									distributors to create the most comprehensive digital library
									available today.
								</p>
								<p>
									Today, Readify stands as more than just an e-book
									platform—we're a community of book lovers, a bridge between
									authors and readers, and a catalyst for the love of reading in
									the digital age.
								</p>
							</div>
						</div>
						<div className="relative">
							<div className="bg-gradient-to-r from-gray-700 via-gray-500 to-gray-900 p-8 rounded-2xl shadow-lg text-white">
								<div className="flex items-center mb-4">
									<FaHeart className="text-2xl mr-3" />
									<h4 className="text-xl font-semibold">Our Mission</h4>
								</div>
								<p className="text-white leading-relaxed">
									To inspire a world where everyone has access to the
									transformative power of books, fostering learning, empathy,
									and imagination across all communities and cultures.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Features Section */}
			<div className="py-16 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h3 className="text-3xl font-bold text-gray-800 mb-4">
							Why Choose Readify?
						</h3>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							We've built features that enhance your reading experience and make
							discovering new books effortless.
						</p>
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{features.map((feature, index) => (
							<div
								key={index}
								className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
							>
								<div className="bg-gradient-to-r from-gray-400 to-black p-3 rounded-full w-fit mb-4">
									<feature.icon className="text-white text-xl" />
								</div>
								<h4 className="font-semibold text-gray-800 mb-2">
									{feature.title}
								</h4>
								<p className="text-gray-600 text-sm leading-relaxed">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Team Section */}
			<div className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h3 className="text-3xl font-bold text-gray-800 mb-4">
							Meet Our Team
						</h3>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							The passionate individuals behind Readify, working tirelessly to
							bring you the best reading experience.
						</p>
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{team.map((member, index) => (
							<div
								key={index}
								className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center group hover:transform hover:scale-105"
							>
								<div className="relative mb-4">
									<img
										src={member.image}
										alt={member.name}
										className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-gradient-to-r from-blue-600 to-purple-600"
									/>
									<div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
								</div>
								<h4 className="font-semibold text-gray-800 mb-1">
									{member.name}
								</h4>
								<p className="text-blue-600 font-medium mb-2">{member.role}</p>
								<p className="text-gray-600 text-sm leading-relaxed">
									{member.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Values Section */}
			<div className="py-16 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h3 className="text-3xl font-bold text-gray-800 mb-4">
							Our Values
						</h3>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							The principles that guide everything we do at Readify.
						</p>
					</div>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="text-center p-6">
							<div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
								<FaUsers className="text-blue-600 text-2xl" />
							</div>
							<h4 className="font-semibold text-gray-800 mb-2">
								Community First
							</h4>
							<p className="text-gray-600">
								We believe in the power of reading communities and strive to
								connect readers worldwide.
							</p>
						</div>
						<div className="text-center p-6">
							<div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
								<FaGlobe className="text-green-600 text-2xl" />
							</div>
							<h4 className="font-semibold text-gray-800 mb-2">
								Global Accessibility
							</h4>
							<p className="text-gray-600">
								Making books accessible to everyone, regardless of location,
								language, or economic status.
							</p>
						</div>
						<div className="text-center p-6">
							<div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
								<FaRocket className="text-purple-600 text-2xl" />
							</div>
							<h4 className="font-semibold text-gray-800 mb-2">Innovation</h4>
							<p className="text-gray-600">
								Continuously improving our platform with cutting-edge technology
								and user-centric design.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Call to Action */}
			<div className="py-16 bg-gradient-to-r from-gray-200 via-gray-500 to-gray-900 text-white">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
					<h3 className="text-3xl font-bold mb-4">
						Ready to Start Your Reading Journey?
					</h3>
					<p className="text-xl text-blue-100 mb-8">
						Join millions of readers who have discovered their favorite books on
						Readify.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link to="/allbooks">
							<button className="cursor-pointer bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
								Browse Books
							</button>
						</Link>
						<Link to="/signup">
							<button className="cursor-pointer border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
								Sign Up Free
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
