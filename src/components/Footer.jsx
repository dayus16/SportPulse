import { useState } from "react";
import Logo from "../Images/Logo001.jpg";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import Adbanner from "./Adbanner";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    // Basic email regex
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSendButton = async () => {
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Try again.", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-10 bg-gray-800 text-white ">
      <div className="flex flex-col md:flex-row justify-around space-y-3 max-w-screen-xl mx-auto p-5">
        <div className="mt-8">
          <div className="flex items-center gap-3">
            <img
              src={Logo}
              alt="SportPulse Logo"
              className="w-10 h-10 rounded-full mb-2"
            />
            <h1 className="text-2xl font-bold">SportPulse</h1>
          </div>
          <p className="text-sm text-gray-300 mt-5">
            SportPulse brings you the latest updates, insights, and stories{" "}
            <br /> from the world of sports. From breaking news to in-depth
            analysis, <br /> we keep fans connected, informed, and inspired —
            all in one place.
          </p>
        </div>

        <div className="mt-8">
          <h1 className="text-xl font-bold border-b border-gray-600 pb-2 text-gray-200">
            Categories
          </h1>
          <div className="space-y-2">
            <p className="mt-3 text-gray-300 text-sm">Epl</p>
            <p className="text-gray-300 text-sm">Laliga</p>
            <p className="text-gray-300 text-sm">Bundesliga</p>
            <p className="text-gray-300 text-sm">Serie A</p>
            <p className="text-gray-300 text-sm">Ligue 1</p>
          </div>
        </div>
        <div className="mt-8">
          <h1 className="text-xl font-bold border-b border-gray-600 pb-2 text-gray-200">
            Links
          </h1>
          <ul className="space-y-2">
            <li className="mt-3 text-gray-300 text-sm">
              <Link to="/">Home</Link>
            </li>
            <li className="text-gray-300 text-sm">
              <Link to="/about">About</Link>
            </li>
            <li className="text-gray-300 text-sm">
              {" "}
              <Link to="/contact">Contact</Link>
            </li>
            <li className="text-gray-300 text-sm">
              {" "}
              <Link to="/blog">Blog</Link>
            </li>
            <li className="text-gray-300 text-sm">
              {" "}
              <Link to="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div className="mt-8">
          <h1 className="text-xl font-bold border-b border-gray-600 pb-2 text-200">
            Subscribe
          </h1>
          <p className="mt-3 text-sm text-gray-300">
            Want to be notified when we launch a new template or an udpate.{" "}
            <br /> Just sign up and we'll send you a notification by email.
          </p>
          <div className="flex items-center space-x-1 mt-5">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-500 flex-1 outline-none py-2 px-4 rounded bg-gray-600"
            />
            <button
              onClick={handleSendButton}
              className="bg-[#e93314] py-2 px-6 rounded cursor-pointer flex items-center justify-center"
            >
              {loading ? <ClipLoader color="#fff" size={20} /> : "Send"}
            </button>
          </div>
        </div>
      </div>
      <div className="text-center border-t border-gray-500 pt-4">
        <p className="text-lg text-gray-300 pb-5">
          © 2025 SportPulse. All rights reserved.
        </p>
      </div>
      <div className="flex justify-center space-x-4 pb-2">
        <Adbanner />
      </div>
    </div>
  );
};

export default Footer;
