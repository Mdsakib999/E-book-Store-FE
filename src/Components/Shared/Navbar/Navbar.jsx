import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoCart, IoLogoWhatsapp } from "react-icons/io5";
import "./Navbar.css";
import {
	FaFacebook,
	FaInstagram,
	FaYoutube,
	FaXTwitter,
} from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { useAuth } from "../../../provider/AuthProvider";
import { FiUser } from "react-icons/fi";
import toast from "react-hot-toast";

const navLinks = [
	{ to: "/", label: "Home" },
	{ to: "/allbooks", label: "E-books" },
	{ to: "/contact", label: "Contact" },
];

const socialLinks = [
	{
		href: "https://www.facebook.com/share/1AzYx6hdyw/?mibextid=wwXIfr",
		icon: <FaFacebook size={26} />,
		className: "text-blue-500",
	},
	{
		to: "https://wa.me/8801727103079",
		icon: <IoLogoWhatsapp size={27} />,
		className: "text-green-500",
	},
	{
		href: "http://www.youtube.com/@smfoodsbd",
		icon: <FaYoutube size={26} />,
		className: "text-red-500",
	},
	{
		href: "https://www.instagram.com/smfoods.shop/profilecard/?igsh=dGR3bGVraXYyMzlv",
		icon: <FaInstagram size={24} />,
		className: "text-pink-500",
	},
	{
		href: "https://x.com/smfoodshop",
		icon: <FaXTwitter size={24} />,
		className: "text-gray-200",
	},
];

const Navbar = () => {
	const [navOpen, setNavOpen] = useState(false);
	const [cartData, setCartData] = useState([]);
	const [showMobileNav, setShowMobileNav] = useState(false);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [showSearch, setShowSearch] = useState(false);
	const { user, logout } = useAuth();

	const handleSignOut = async () => {
		await logout();
		toast.success(<h1 className="font-serif">Logged out successfully</h1>);
	};

	const handleNavToggle = () => setNavOpen((prev) => !prev);
	const toggleSearch = () => setShowSearch((prev) => !prev);

	const handleScroll = () => {
		const currentScrollY = window.scrollY;
		setShowMobileNav(currentScrollY < lastScrollY);
		setLastScrollY(currentScrollY);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);

	return (
		<>
			<nav className="sticky top-0 z-20 bg-white shadow px-5 lg:px-24 py-3 flex justify-between items-center">
				{/* Left: Logo + Nav */}
				<div className="flex items-center gap-4">
					<ul className="hidden md:flex gap-6 font-semibold">
						{navLinks.map((link) => (
							<NavLink
								key={link.to}
								to={link.to}
								className={({ isActive }) =>
									`nav_a rounded-xl cursor-pointer ${
										isActive ? "text-orange-500 nav_a" : ""
									}`
								}
							>
								{link.label}
							</NavLink>
						))}
					</ul>

					{/* Mobile Nav Toggle */}
					<div className="md:hidden cursor-pointer" onClick={handleNavToggle}>
						{navOpen ? (
							<AiOutlineClose size={30} />
						) : (
							<AiOutlineMenu size={30} />
						)}
					</div>
				</div>

				<Link to="/" className="hidden md:flex items-center gap-2">
					<h1 className="font-Dancing text-xl lg:text-3xl font-bold text-black">
						E-Book
					</h1>
				</Link>

				{/* Right: Icons + Auth */}
				<div className="flex items-center gap-5">
					<FiSearch
						className="text-3xl text-black cursor-pointer"
						onClick={toggleSearch}
					/>
					<div className="relative cursor-pointer">
						<span className="bg-orange-500 absolute px-[6px] rounded-full text-sm font-bold -top-3 left-5 text-white">
							{cartData?.length || 0}
						</span>
						<IoCart size={30} className="text-black" />
					</div>
					{user ? (
						<div className="flex items-center space-x-3">
							<div className="flex items-center">
								{user.photoURL ? (
									<img
										src={user.photoURL}
										alt={user.displayName || "User"}
										className="w-8 h-8 rounded-full object-cover border-2 border-gray-300"
									/>
								) : (
									<div className="hidden w-8 h-8 rounded-full bg-gray-300 md:flex items-center justify-center text-white">
										<FiUser className="w-4 h-4" />
									</div>
								)}
								<span className="hidden md:block ml-2 font-medium text-gray-700">
									{user.displayName || "User"}
								</span>
							</div>

							<button
								onClick={handleSignOut}
								className="bg-gradient-to-r from-black to-gray-400 px-4 py-1.5 text-sm rounded-md text-white font-bold shadow-md hover:from-orange-600 hover:to-yellow-400 transition cursor-pointer"
							>
								Sign Out
							</button>
						</div>
					) : (
						<Link
							to="/signin"
							className="bg-gradient-to-r from-black to-gray-400 px-6 py-2 rounded-md text-white font-bold shadow-md hover:from-orange-600 hover:to-yellow-400 transition"
						>
							Login
						</Link>
					)}
				</div>

				{/* Mobile Nav Menu */}
				<div
					className={`fixed top-0 right-0 h-full w-[70%] bg-black text-white z-30 transition-transform duration-300 ${
						navOpen ? "translate-x-0" : "translate-x-full"
					}`}
				>
					<div className="p-4 font-bold text-3xl text-orange-500">E-Book</div>
					<ul className="space-y-2 px-4">
						{[
							{ to: "/", label: "Home" },
							{ to: "/allProduct", label: "Our Products" },
							{ to: "/blog", label: "Blog" },
							{ to: "/contact", label: "Contact" },
						].map((item) => (
							<li key={item.to}>
								<Link
									to={item.to}
									onClick={handleNavToggle}
									className="block py-2 px-4 rounded-xl border-b border-gray-600 hover:bg-gray-800"
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>

					{/* Mobile Social Icons */}
					<div className="flex justify-center items-center gap-4 mt-6">
						{socialLinks.map((link, i) =>
							link.href ? (
								<a
									key={i}
									href={link.href}
									target="_blank"
									rel="noreferrer"
									className={link.className}
								>
									{link.icon}
								</a>
							) : (
								<Link
									key={i}
									to={link.to}
									target="_blank"
									className={link.className}
								>
									{link.icon}
								</Link>
							)
						)}
					</div>
				</div>
			</nav>

			{/* Search Overlay */}
			{showSearch && (
				<div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-start pt-20 transition-all duration-300">
					<div className="bg-white w-[90%] md:w-2/3 lg:w-1/2 p-4 rounded-xl shadow-lg relative animate-slideDown">
						<button
							onClick={toggleSearch}
							className="absolute top-2 right-3 text-black text-2xl"
						>
							<AiOutlineClose />
						</button>
						<div className="relative">
							<input
								type="text"
								placeholder="Search for books..."
								className="w-full border border-gray-300 rounded-full py-2 px-5 pl-10 focus:outline-none focus:border-orange-400"
							/>
							<FiSearch
								className="absolute left-3 top-3 text-gray-500"
								size={22}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Navbar;
