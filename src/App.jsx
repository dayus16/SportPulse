import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Contacts from "./components/Contacts";
import About from "./components/About";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Blog from "./components/Blog";
import BlogDetails from "./components/BlogDetails";

import { Toaster } from "react-hot-toast";
import SocialBar from "./components/SocialBar";

const App = () => {
  const [input, setInput] = useState("");
  return (
    <div className="bg-gray-100 min-h-screen">
      <BrowserRouter>
        <Nav input={input} setInput={setInput} />
        <SocialBar />
        <Toaster position="top-right" />
        <Routes>
          <Route
            path="/"
            element={<Home input={input} setInput={setInput} />}
          />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/blog" element={<Blog input={input} setInput={setInput}/>} />
          <Route path="/blogDetails/:id" element={<BlogDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
