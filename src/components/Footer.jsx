import { useState } from "react";
import Logo from "../Images/Logo001.jpg";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

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
    <div className="mt-10 bg-gray-800 text-white">
      <div className="flex flex-col md:flex-row justify-around space-y-3 p-5">
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
            <br />
            eiusmod tempor incididunt ut labore et dolore magna aliqua. <br />
            Eaque ipsa quae ab illo inventore veritatis et quasi architecto.
          </p>
        </div>

        <div className="mt-8">
          <h1 className="text-xl font-bold border-b border-gray-600 pb-2 text-gray-200">
            Categories
          </h1>
          <div className="space-y-2">
            <p className="mt-3 text-gray-300 text-sm">Football</p>
            <p className="text-gray-300 text-sm">Basketball</p>
            <p className="text-gray-300 text-sm">Baseball</p>
            <p className="text-gray-300 text-sm">Hockey</p>
            <p className="text-gray-300 text-sm">Table_tennis</p>
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
          <div className="space-x-1">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-5 border border-gray-500 outline-none py-2 px-4 rounded bg-gray-600"
            />
            <button
              onClick={handleSendButton}
              className="bg-[#e93314] py-2 px-6 w-20 rounded cursor-pointer"
            >
              {loading ? (
                <div className="flex jusitify-center items-center">
                  <ClipLoader color="fff" size={20} />
                </div>
              ) : (
                "Send"
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="text-center border-t border-gray-500 pt-4">
        <p className="text-lg text-gray-300 pb-5">
          © 2025 SportPulse. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
