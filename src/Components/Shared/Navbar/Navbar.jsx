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
import { IoMdMail } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { AiOutlineLogout } from "react-icons/ai";
import booksData from "../../../../public/bookData.json";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState(booksData);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = React.useRef();
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleNavToggle = () => setNavOpen((prev) => !prev);
  const toggleSearch = () => {
    setShowSearch((prev) => {
      if (prev) setSearchQuery("");
      return !prev;
    });
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setShowMobileNav(currentScrollY < lastScrollY);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    if (profileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [profileDropdownOpen]);

  const handleProfileClick = () => setProfileDropdownOpen((prev) => !prev);

  const handleSignout = async () => {
    const result = await Swal.fire({
      title: "Sign out?",
      text: "You will be signed out from all devices.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, sign out!",
    });
    if (result.isConfirmed) {
      await logout();
      Swal.fire("Signed out!", "You have been signed out.", "success");
    }
  };
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBooks([]);
    } else {
      const filtered = booksData.filter(
        (book) =>
          book.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.authorName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(filtered.slice(0, 5)); // limit to top 5 results
    }
  }, [searchQuery]);
  const handleSuggestionClick = (bookId, book) => {
    navigate(`/allbooks/${bookId}`, { state: book });
    setShowSearch(false);
    setSearchQuery("");
  };

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
                    isActive ? "text-orange-500 underline " : ""
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
          <h1 className="text-xl lg:text-3xl font-bold text-black">E-Book</h1>
        </Link>

        {/* Right: Icons + Auth */}
        <div className="flex items-center gap-5">
          <FiSearch
            className="text-3xl text-black cursor-pointer"
            onClick={toggleSearch}
          />
          <div className="relative cursor-pointer">
            <span className="bg-black absolute px-[6px] rounded-full text-sm font-bold -top-3 left-5 text-white">
              {cartData?.length || 0}
            </span>
            <IoCart size={30} className="text-black" />
          </div>
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={handleProfileClick}
                className="flex items-center gap-2 focus:outline-none cursor-pointer"
              >
                <FaUserCircle size={28} className="text-black" />
              </button>
              {/* Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fadeIn">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                    <FaUserCircle size={22} className="text-gray-600" />
                    <span className="font-semibold text-gray-800 truncate">
                      {user?.displayName || "User"}
                    </span>
                  </div>
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                    <IoMdMail size={22} className="text-gray-600" />
                    <span className="font-semibold text-gray-800 truncate">
                      {user?.email || "User"}
                    </span>
                  </div>
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                    <AiOutlineLogout size={22} className="text-red-600" />
                    <button
                      onClick={handleSignout}
                      className="w-full text-left font-semibold text-red-600 hover:text-red-500 rounded-b-lg cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/signin"
              className="cursor-pointer bg-gradient-to-r from-black to-gray-500 px-6 py-2 rounded-md text-white font-bold shadow-md hover:from-gray-500 hover:to-black transition"
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
        <div className="fixed inset-0 bg-black/50 z-40 flex justify-center items-start pt-5 transition-all duration-300">
          <div className="bg-white w-[90%] md:w-2/3 lg:w-1/2 px-4 py-4 rounded-xl shadow-lg relative animate-slideDown">
            <button
              onClick={toggleSearch}
              className="absolute top-6 right-6 text-black text-2xl z-50 cursor-pointer hover:text-red-600"
            >
              <AiOutlineClose />
            </button>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for books..."
                className="w-full border border-gray-300 rounded-full py-2 px-5 pl-10 focus:outline-none focus:border-gray-800"
              />
              <FiSearch
                className="absolute left-3 top-2.5 text-gray-500"
                size={22}
              />

              {/* Suggestions Dropdown */}
              {filteredBooks.length > 0 && (
                <ul className="absolute mt-2 bg-white border border-gray-300 rounded-md w-full max-h-60 overflow-y-auto shadow-lg z-50">
                  {filteredBooks.map((book) => (
                    <li
                      key={book.id}
                      onClick={() => handleSuggestionClick(book.id, book)}
                      className="flex items-center gap-4 px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      <img
                        src={book.image}
                        alt={book.bookName}
                        className="w-12 h-16 object-cover rounded-md"
                      />
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold text-black">
                          {book.bookName}
                        </p>
                        <p className="text-xs text-gray-500">
                          by {book.authorName}
                        </p>
                        <p className="text-xs text-gray-500">
                          Category: {book.category}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span>⭐ {book.rating}</span>
                          <span className="font-semibold text-green-600">
                            ${book.price}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
