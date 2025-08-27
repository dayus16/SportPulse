import { useState } from "react";
import { IoIosSearch, IoMdMenu, IoMdClose } from "react-icons/io";
import Logo from "../Images/Logo001.jpg";
import { Link } from "react-router-dom";

const Nav = ({ input, setInput }) => {
  const [inputField, setInputField] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleSearch = () => {
    setInputField(!inputField);
  };
  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="hidden md:block">
        <div className="flex justify-between items-center p-5 bg-white text-black shadow-lg">
          <div className="text-2xl font-bold flex items-center space-x-2">
            <img
              src={Logo}
              alt="SportPulse Logo"
              className="w-10 h-10 rounded-full"
            />
            <h1>SportPulse</h1>
          </div>
          <div>
            <ul className="flex space-x-4 cursor-pointer">
              <li className="hover:text-[#e93314]">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-[#e93314]">
                <Link to="/about">About</Link>
              </li>
              <li className="hover:text-[#e93314]">
                <Link to="/contact">Contacts</Link>
              </li>
              <li className="hover:text-[#e93314]">
                <Link to="/blog">Blog</Link>
              </li>
              <li className="hover:text-[#e93314]">
                <Link to="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="search..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full py-2 px-4 rounded border border-black outline-none"
            />
            <button className="ml-2 cursor-pointer px-4 py-2 rounded absolute right-0 top-0">
              {" "}
              <IoIosSearch size={25} />
            </button>
          </div>
        </div>
      </div>

      {/* -------------Mobile View----------------------- */}
      <div className="md:hidden block">
        <div className="flex justify-between items-center bg-white p-5 shadow-lg">
          <div className="text-2xl font-bold flex items-center space-x-2">
            <img
              src={Logo}
              alt="SportPulse Logo"
              className="w-10 h-10 rounded-full"
            />
            <h1>SportPulse</h1>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleSearch}
              className="cursor-pointer px-2 py-2 rounded"
            >
              {inputField ? <IoMdClose size={25} /> : <IoIosSearch size={25} />}
            </button>

            <button onClick={handleMenu}>
              {menuOpen ? <IoMdClose size={25} /> : <IoMdMenu size={25} />}
            </button>
          </div>
        </div>

        {/* Search bar toggle */}
        {inputField && (
          <div className="flex items-center px-5 pb-3 space-x-2 relative">
            <input
              type="text"
              placeholder="Search..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 py-2 px-3 rounded border border-black outline-none"
            />
            <button className="cursor-pointer px-4 py-2 rounded absolute right-6 top-0">
              <IoIosSearch size={25} />
            </button>
          </div>
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <div className="flex flex-col items-center bg-white text-black shadow-lg p-5">
            <ul className="space-y-4 cursor-pointer">
              <li className="hover:text-[#e93314]">
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li className="hover:text-[#e93314]">
                <Link to="/about" onClick={() => setMenuOpen(false)}>
                  About
                </Link>
              </li>
              <li className="hover:text-[#e93314]">
                <Link to="/contact" onClick={() => setMenuOpen(false)}>
                  Contacts
                </Link>
              </li>
              <li className="hover:text-[#e93314]">
                <Link to="/blog" onClick={() => setMenuOpen(false)}>
                  Blog
                </Link>
              </li>
              <li className="hover:text-[#e93314]">
                <Link to="/privacy" onClick={() => setMenuOpen(false)}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
