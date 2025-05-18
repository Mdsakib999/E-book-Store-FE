import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import "./Navbar.css";
import { IoCart, IoLogoWhatsapp } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa6";
// import logo from "../../assets/logo/LOGO.png";
import { FaUserCircle, FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [data, setData] = useState([]);
  const [lastScrollY, setLastScrollY] = useState(0);
  // const { setIsSidebarOpen, isSidebarOpen } = useContext('');
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  // console.log(user);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      // Scrolling down
      setShowSecondDiv(false);
    } else {
      // Scrolling up
      setShowSecondDiv(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div className=" flex justify-between items-center w-[100%] lg:max-w-[100%] mx-auto px-5 lg:px-24 py-2 md:py-4 text-black sticky top-0 z-20 bg-white ">
        <div className="flex items-end gap-4 md:text-center lg:text-lg md:mr-4">
          {/* Desktop Navigation */}
          <ul className="hidden md:flex md:gap-x-5 lg:gap-x-7 font-semibold">
            <Link to="/" className="nav_a rounded-xl cursor-pointer">
              Home
            </Link>
            <Link to="/allProduct" className="nav_a rounded-xl cursor-pointer">
              E-books
            </Link>

            <Link to="/contact" className="nav_a rounded-xl cursor-pointer">
              Contact
            </Link>
          </ul>
          {/* Mobile Navigation Icon */}
          <div onClick={handleNav} className="block md:hidden cursor-pointer">
            {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <ul
          className={
            nav
              ? "fixed lg:hidden block right-0 top-0 w-[70%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 z-10 "
              : "ease-in-out w-[70%] duration-500 fixed top-0 bottom-0 right-[-100%]"
          }
        >
          {/* Mobile Logo */}
          <h1 className="w-full text-3xl font-bold font-Dancing text-orange-500 m-4 ">
            E-Book
          </h1>
          {/* Mobile Navigation Items */}
          <li>
            <Link
              onClick={handleNav}
              className="p-4 block border-b rounded-xl text-white hover:bg-gray-800  duration-300  cursor-pointer border-gray-600"
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              onClick={handleNav}
              className="block p-4 border-b rounded-xl text-white hover:bg-gray-800 duration-300  cursor-pointer border-gray-600"
              to="/allProduct"
            >
              Our Products
            </Link>
          </li>

          <li>
            <Link
              onClick={handleNav}
              className="p-4 block border-b rounded-xl text-white hover:bg-gray-800 duration-300  cursor-pointer border-gray-600"
              to="/blog"
            >
              Blog
            </Link>
          </li>
          <li>
            {/* {!user && (
              <Link
              onClick={handleNav}
                to="/trackOrder"
                className="p-4 block border-b rounded-xl text-white hover:bg-gray-800 duration-300  cursor-pointer border-gray-600"
              >
                Track Order
              </Link>
            )} */}
          </li>
          <li>
            <Link
              className="p-4 block border-b rounded-xl text-white hover:bg-gray-800 duration-300  cursor-pointer border-gray-600"
              onClick={handleNav}
              to="/contact"
            >
              Contact
            </Link>
          </li>

          {/* Mobile social icon */}
          <div className=" flex justify-center  items-center space-x-4 mt-6">
            <a
              href="https://www.facebook.com/share/1AzYx6hdyw/?mibextid=wwXIfr"
              target="_blank"
              className="text-blue-500 hover:text-blue-700  p-1 rounded-full "
            >
              <FaFacebook size={26} />
            </a>
            <Link
              to="https://wa.me/8801727103079"
              target="_blank"
              className="text-green-500 hover:text-green-600 "
            >
              <IoLogoWhatsapp size={27} />
            </Link>
            <a
              href="http://www.youtube.com/@smfoodsbd"
              target="_blank"
              className="text-red-500 hover:text-red-600 p-1 rounded-full "
            >
              <FaYoutube size={26} />
            </a>
            <a
              href="https://www.instagram.com/smfoods.shop/profilecard/?igsh=dGR3bGVraXYyMzlv"
              target="_blank"
              className="text-pink-500 hover:text-pink-700 p-1 rounded-full "
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://x.com/smfoodshop"
              target="_blank"
              className="text-gray-200 hover:text-gray-300 p-1 rounded-full "
            >
              <FaXTwitter size={24} />
            </a>
          </div>
        </ul>

        {/* Logo */}
        <Link to="/" className="hidden md:flex cursor-pointer">
          <img className="w-[50px] rounded-full" src="" alt="" />
          <h1 className=" font-Dancing lg:text-3xl text-xl font-bold px-3 flex justify-center items-center text-black ">
            E-Book 
          </h1>
        </Link>

        {/* 3rd part */}
        <div className="flex items-center gap-x-5 ">
          {/* Search Box */}
          <div className="relative md:flex  items-center group  pt-1">
            <input
              type="text"
              onChange={(e) => setSearchProduct(e.target.value)}
              placeholder="Search..."
              className="border border-gray-300 group-hover:border-orange-500 rounded-full py-2 px-4 pl-10 md:max-w-[320px] focus:outline-none focus:border-orange-400"
            />
            <FiSearch
              className="absolute left-3 top-3 group-hover:text-orange-500"
              size={22}
            />
          </div>

          {/* Shopping cart */}
          <div
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="relative cursor-pointer "
          >
            <span className="bg-orange-500 absolute px-[6px] rounded-full text-sm font-bold -top-3 left-5 text-white">
              {data?.length}
            </span>
            <p className="font-bold flex items-center text-black -mt-1 ">
              <IoCart size={30} />
            </p>
          </div>



          <Link
            to="/login"
            className="bg-gradient-to-r cursor-pointer from-black to-gray-400 px-6 text-center py-2 rounded-md text-white font-bold shadow-md hover:from-orange-600 hover:to-yellow-400 transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
