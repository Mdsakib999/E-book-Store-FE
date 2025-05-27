import { FiBookOpen, FiPhone, FiMapPin, FiArrowRight } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import {
	FaFacebookF,
	FaTwitter,
	FaInstagram,
	FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
	return (
		<div className="font-serif">
			{/* Footer */}
			<footer className="bg-gray-900 text-gray-300">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{/* Logo and About */}
						<div className="col-span-1 md:col-span-2 lg:col-span-1">
							<div className="flex items-center mb-6">
								<FiBookOpen size={32} className="text-blue-400 mr-2" />
								<span className="text-white font-bold text-2xl">Readify</span>
							</div>
							<p className="text-gray-400 mb-6">
								Discover the world of books with Readify. Your go-to platform
								for exploring, purchasing, and discussing literature of all
								genres.
							</p>
							<div className="flex space-x-4">
								<a
									href="#"
									className="text-gray-400 hover:text-blue-400 transition-colors"
								>
									<FaFacebookF size={20} />
								</a>
								<a
									href="#"
									className="text-gray-400 hover:text-blue-400 transition-colors"
								>
									<FaTwitter size={20} />
								</a>
								<a
									href="#"
									className="text-gray-400 hover:text-blue-400 transition-colors"
								>
									<FaInstagram size={20} />
								</a>
								<a
									href="#"
									className="text-gray-400 hover:text-blue-400 transition-colors"
								>
									<FaLinkedinIn size={20} />
								</a>
							</div>
						</div>

						{/* Quick Links */}
						<div>
							<h3 className="text-white font-semibold text-lg mb-6 border-b border-gray-700 pb-2">
								Quick Links
							</h3>
							<ul className="space-y-3">
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-blue-400 transition-colors"
									>
										Home
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-blue-400 transition-colors"
									>
										About Us
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-blue-400 transition-colors"
									>
										Authors
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-blue-400 transition-colors"
									>
										Contact
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-blue-400 transition-colors"
									>
										Blog
									</a>
								</li>
							</ul>
						</div>

						{/* Categories */}
						<div>
							<h3 className="text-white font-semibold text-lg mb-6 border-b border-gray-700 pb-2">
								Terms & condtion
							</h3>
							<ul className="space-y-3">
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-blue-400 transition-colors"
									>
										Copyright protected
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-blue-400 transition-colors"
									>
										Third-party disclaimer
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-blue-400 transition-colors"
									>
										Agreement implied
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-blue-400 transition-colors"
									>
										No piracy
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-blue-400 transition-colors"
									>
										Account Safety
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-gray-400 hover:text-blue-400 transition-colors"
									>
										Policy Agreement
									</a>
								</li>
							</ul>
						</div>

						{/* Contact Info */}
						<div>
							<h3 className="text-white font-semibold text-lg mb-6 border-b border-gray-700 pb-2">
								Contact Us
							</h3>
							<ul className="space-y-4">
								<li className="flex items-start">
									<FiMapPin
										size={18}
										className="text-blue-400 mr-3 mt-1 flex-shrink-0"
									/>
									<span>123 Reading Avenue, Booktown, BK 12345</span>
								</li>
								<li className="flex items-center">
									<FiPhone
										size={18}
										className="text-blue-400 mr-3 flex-shrink-0"
									/>
									<span>+1 (555) 123-4567</span>
								</li>
								<li className="flex items-center">
									<HiOutlineMail
										size={18}
										className="text-blue-400 mr-3 flex-shrink-0"
									/>
									<span>contact@readify.com</span>
								</li>
							</ul>
						</div>
					</div>

					{/* Bottom Section */}
					<div className="mt-12 pt-8 border-t border-gray-800">
						<div className="flex flex-col md:flex-row justify-between items-center">
							<p className="text-sm text-gray-500 mb-4 md:mb-0">
								© {new Date().getFullYear()} Readify. All rights reserved.
							</p>
							<div className="flex flex-wrap gap-4 text-sm text-gray-500">
								<a href="#" className="hover:text-blue-400 transition-colors">
									Privacy Policy
								</a>
								<a href="#" className="hover:text-blue-400 transition-colors">
									Terms of Service
								</a>
								<a href="#" className="hover:text-blue-400 transition-colors">
									Cookie Policy
								</a>
								<a href="#" className="hover:text-blue-400 transition-colors">
									Accessibility
								</a>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
