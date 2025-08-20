// tbf5txmnqpwy
// 6TcLpqoZDv-CI1Yzi-zG4_mLpVrfSNyUKQdkrMJZafQ
import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import HomeImage from "../Images/Home_Pix002.png";
import Placeholder from "../Images/Placeholder.png";
import News from "../Images/Home_Pix.jpg";
import { FaRegComments, FaLongArrowAltRight, FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";
import { createClient } from "contentful";

const client = createClient({
  space: "g7ox7xqtg9kf",
  accessToken: "MBk4iBA_vOXWfhfCgNiG5tIm699bbZz9URhMPLZPkk0",
});
const Home = ({ input }) => {
  const [blogPosts, setBlogPosts] = useState([]);

  const normalizedInput = input.trim().toLowerCase();

  const filteredItems = blogPosts.filter(
    (post) =>
      post.fields.title.toLowerCase().includes(normalizedInput) ||
      post.fields.summary.toLowerCase().includes(normalizedInput) ||
      post.fields.category.toLowerCase().includes(normalizedInput) ||
      post.fields.author.toLowerCase().includes(normalizedInput)
  );

  const getAllEntries = async () => {
    try {
      const response = await client.getEntries();
      console.log(response.items);
      setBlogPosts(response.items);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  useEffect(() => {
    getAllEntries();
  }, []);

  return (
    <div className="text-black p-5">
      <div className="flex items-center justify-around h-100 rounded-lg p-5 bg-[#252423] text-white">
        <div>
          <h1 className="md:text-4xl text-3xl font-bold">
            {" "}
            Welcome to{" "}
            <span className="text-[#e93314]">
              {" "}
              <ReactTyped
                strings={["Sportpulse"]}
                typeSpeed={120}
                backSpeed={140}
                loop
              />
            </span>{" "}
            — <br /> Your Daily Dose of Sports Action!
          </h1>

          <p className="mt-4 text-lg font-medium">
            Stay ahead with fresh updates, expert opinions, <br /> and stories
            that capture the passion of every play.
          </p>
        </div>
        <div>
          <img
            src={HomeImage}
            alt="SportPulse Home"
            className="w-200 h-[380px] object-cover rounded-lg shadow-lg mt-5 hidden md:block"
          />
        </div>
      </div>
      <div className="mt-10 flex flex-col md:flex-row p-5 gap-6 border border-gray-200 rounded-lg">
        {/* Left side: 70% */}
        <div className="w-full md:w-[70%] p-3 space-y-6 ">
          {/* Top: Title + Buttons */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 border-b border-gray-300 pb-2">
            <div>
              <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                Latest World Sport News
              </h1>
              <p className="text-lg text-gray-600">Don't miss daily news</p>
            </div>

            <div className="">
              <button className="bg-[#e93314] text-white py-1 px-4 text-xs md:text-sm cursor-pointer">
                Football
              </button>
              <button className="border border-gray-400 py-1 px-4 text-xs md:text-sm cursor-pointer">
                Basketball
              </button>
              <button className="border border-gray-400 py-1 px-4 text-xs md:text-sm cursor-pointer">
                Baseball
              </button>
              <button className="border border-gray-400 py-1 px-4 text-xs md:text-sm cursor-pointer">
                Hockey
              </button>
              <button className="border border-gray-400 py-1 px-4 text-xs md:text-sm cursor-pointer">
                Table Tennis
              </button>
            </div>
          </div>

          {/* Bottom: News Cards */}
          {filteredItems.slice(0, 7).map((post) => (
            <div
              key={post.id}
              className="flex flex-col md:flex-row gap-6 mt-10"
            >
              <div className="md:w-120 h-40 overflow-hidden rounded-lg">
                <img
                  src={post.fields.image.fields.file.url}
                  alt={post.fields.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <button className="bg-[#e93314] py-1 px-4 text-xs text-white font-bold">
                  {post.fields.category}
                </button>
                <Link to={`/blogDetails/${post.sys.id}`}>
                  <h2 className="text-2xl text-gray-800 font-bold mt-2 hover:text-[#e93314] cursor-pointer">
                    {post.fields.title}
                  </h2>
                </Link>
                <p className="text-gray-500 text-xs">
                  <span className="text-[#e93314]">🕖</span>{" "}
                  {new Date(post.fields.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-gray-700 mt-3 text-sm">
                  {post.fields.summary}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={Placeholder}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <p className="text-xs font-bold text-gray-800 uppercase">
                      By {post.fields.author}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-gray-800 font-semibold">
                    <div className="flex items-center gap-1 text-gray-800 font-semibold">
                      <FaRegComments size={14} className="text-[#e93314]" />
                      <small className="font-bold">2</small>
                    </div>
                    <div className="flex items-center gap-1 text-gray-800 font-semibold">
                      <FaRegEye size={14} className="text-[#e93314]" />
                      <small className="font-bold">2</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Bottom: News Cards */}
          <div className="flex flex-col md:flex-row gap-6 mt-10">
            <div className="w-full md:w-80">
              <img
                src={News}
                alt="News"
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
            <div>
              <button className="bg-[#e93314] py-1 px-4 text-xs text-white font-bold">
                Basketball
              </button>
              <h2 className="text-2xl text-gray-800 font-bold mt-2 hover:text-[#e93314] cursor-pointer">
                Start your career right here at home
              </h2>
              <p className="text-gray-500 text-xs">
                <span className="text-[#e93314]">🕖</span> 15 May 2022
              </p>
              <p className="text-gray-700 mt-3 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor <br /> incididunt.
              </p>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                  <img
                    src={Placeholder}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="text-xs font-bold text-gray-800 uppercase">
                    By Mary Rose
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-800 font-semibold">
                  <FaRegComments size={15} className="text-[#e93314]" />
                  <p className="text-xs font-bold">2</p>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom: News Cards */}
          <div className="flex flex-col md:flex-row gap-6 mt-10">
            <div className="w-full md:w-80">
              <img
                src={News}
                alt="News"
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
            <div>
              <button className="bg-[#e93314] py-1 px-4 text-xs text-white font-bold">
                Baseball
              </button>
              <h2 className="text-2xl text-gray-800 font-bold mt-2 hover:text-[#e93314] cursor-pointer">
                Start your career right here at home
              </h2>
              <p className="text-gray-500 text-xs">
                <span className="text-[#e93314]">🕖</span> 15 May 2022
              </p>
              <p className="text-gray-700 mt-3 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor <br /> incididunt.
              </p>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                  <img
                    src={Placeholder}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="text-xs font-bold text-gray-800 uppercase">
                    By Jane Taylor
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-800 font-semibold">
                  <FaRegComments size={15} className="text-[#e93314]" />
                  <p className="text-xs font-bold">2</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 py-2 px-4 text-white font-semibold text-lg rounded mt-10 hover:bg-[#e93314] hover:text-white transition-colors duration-300">
            <Link className="flex items-center justify-center gap-2" to="/blog">
              Go To Blog Page
              <FaLongArrowAltRight />
            </Link>
          </div>
        </div>

        {/* Right side: 30% */}
        <div className="w-full md:w-[30%] p-3 rounded-lg overflow-auto">
          <h2 className="bg-gray-800 text-white py-2 px-8 rounded text-center font-semibold">
            Recent News
          </h2>
          {blogPosts
            .sort((a, b) => new Date(b.fields.date) - new Date(a.fields.date))
            .slice(0, 5)
            .map((post) => (
              <div key={post.id} className="flex items-center mt-10 gap-3">
                <img
                  src={post.fields.image.fields.file.url}
                  alt={post.fields.title}
                  className="w-30 h-20 rounded-lg object-cover"
                />
                <div>
                  <Link to={`/blogDetails/${post.sys.id}`}>
                    <h2 className="text-sm text-gray-800 font-bold hover:text-[#e93314] cursor-pointer">
                      {post.fields.title}
                    </h2>
                  </Link>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-500 text-xs">
                      <span className="text-[#e93314]">🕖</span>{" "}
                      {new Date(post.fields.date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <div className="flex items-center gap-2 text-gray-800 font-semibold">
                      <div className="flex items-center gap-1 text-gray-800 font-semibold">
                        <FaRegComments size={14} className="text-[#e93314]" />
                        <small className="font-bold">15</small>
                      </div>
                      <div className="flex items-center gap-1 text-gray-800 font-semibold">
                        <FaRegEye size={14} className="text-[#e93314]" />
                        <small className="font-bold">2</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          <div className="flex items-center mt-10 gap-3">
            <img src={News} alt="" className="w-30 rounded-lg object-cover" />
            <div>
              <h2 className="text-sm text-gray-800 font-bold hover:text-[#e93314] cursor-pointer">
                Start your career right here at home
              </h2>
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-xs">
                  <span className="text-[#e93314]">🕖</span> 15 May 2022
                </p>
                <div className="flex items-center gap-2 text-gray-800 font-semibold">
                  <FaRegComments size={15} className="text-[#e93314]" />
                  <p className="text-xs font-bold">15</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-10 gap-3">
            <img src={News} alt="" className="w-30 rounded-lg object-cover" />
            <div>
              <h2 className="text-sm text-gray-800 font-bold hover:text-[#e93314] cursor-pointer">
                Start your career right here at home
              </h2>
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-xs">
                  <span className="text-[#e93314]">🕖</span> 15 May 2022
                </p>
                <div className="flex items-center gap-2 text-gray-800 font-semibold">
                  <FaRegComments size={15} className="text-[#e93314]" />
                  <p className="text-xs font-bold">15</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-10 gap-3">
            <img src={News} alt="" className="w-30 rounded-lg object-cover" />
            <div>
              <h2 className="text-sm text-gray-800 font-bold hover:text-[#e93314] cursor-pointer">
                Start your career right here at home
              </h2>
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-xs">
                  <span className="text-[#e93314]">🕖</span> 15 May 2022
                </p>
                <div className="flex items-center gap-2 text-gray-800 font-semibold">
                  <FaRegComments size={15} className="text-[#e93314]" />
                  <p className="text-xs font-bold">15</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-10 gap-3">
            <img src={News} alt="" className="w-30 rounded-lg object-cover" />
            <div>
              <h2 className="text-sm text-gray-800 font-bold hover:text-[#e93314] cursor-pointer">
                Start your career right here at home
              </h2>
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-xs">
                  <span className="text-[#e93314]">🕖</span> 15 May 2022
                </p>
                <div className="flex items-center gap-2 text-gray-800 font-semibold">
                  <FaRegComments size={15} className="text-[#e93314]" />
                  <p className="text-xs font-bold">15</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-gray-800 text-xl font-bold rounded border-b border-gray-400 pb-2">
              Popular Tags
            </h2>
            <div className="mt-5 flex items-center flex-wrap gap-2">
              <h1 className="bg-gray-800 py-1 px-4 text-white font-bold text-sm">
                Football
              </h1>
              <h1 className="bg-gray-800 py-1 px-4 text-white font-bold text-sm">
                Basketball
              </h1>
              <h1 className="bg-gray-800 py-1 px-4 text-white font-bold text-sm">
                Baseball
              </h1>
              <h1 className="bg-gray-800 py-1 px-4 text-white font-bold text-sm">
                Hockey
              </h1>
              <h1 className="bg-gray-800 py-1 px-4 text-white font-bold text-sm">
                Table_tennis
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
