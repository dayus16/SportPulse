import React from "react";
import { IoIosSearch, IoMdMenu, IoMdClose } from "react-icons/io";
import Logo from "../Images/logo.png";

const Nav = () => {
  const [inputField, setInputField] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
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
            <img src={Logo} alt="SportPulse Logo" className="w-10 h-10" />
            <h1>SportPulse</h1>
          </div>
          <div>
            <ul className="flex space-x-4 cursor-pointer">
              <li className="hover:text-[#e93314]">Home</li>
              <li className="hover:text-[#e93314]">About</li>
              <li className="hover:text-[#e93314]">Contact</li>
              <li className="hover:text-[#e93314]">Blog</li>
              <li className="hover:text-[#e93314]">Privacy Policy</li>
            </ul>
          </div>
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="search..."
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
      <div className="md:hidden">
        <div className="flex justify-between items-center p-5">
          {!inputField && (
            <div className="text-2xl font-bold flex items-center space-x-2">
              <img src={Logo} alt="SportPulse Logo" className="w-10 h-10" />
              <h1>SportPulse</h1>
            </div>
          )}
          <div className="flex items-center">
            <div className="relative flex items-center">
              {inputField && (
                <input
                  type="text"
                  placeholder="search.."
                  className="py-2 px-2 rounded border border-black outline-none"
                />
              )}

              <button
                onClick={handleSearch}
                className="ml-2 cursor-pointer px-2 py-2 rounded"
              >
                {inputField ? (
                  <IoMdClose size={25} />
                ) : (
                  <IoIosSearch size={25} />
                )}
              </button>
            </div>
            <div onClick={handleMenu}>
              {menuOpen ? <IoMdClose size={25} /> : <IoMdMenu size={25} />}
            </div>
          </div>
        </div>
        <div>
          {menuOpen && (
            <div className="flex flex-col items-center bg-white text-black shadow-lg p-5">
              <ul className="space-y-4 cursor-pointer">
                <li className="hover:text-[#e93314]">Home</li>
                <li className="hover:text-[#e93314]">About</li>
                <li className="hover:text-[#e93314]">Contact</li>
                <li className="hover:text-[#e93314]">Blog</li>
                <li className="hover:text-[#e93314]">Privacy Policy</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
