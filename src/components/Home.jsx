import { useState, useEffect } from "react";
import HomeImage from "../Images/Home_Pix002.png";
import Placeholder from "../Images/Placeholder.png";
import { FaRegComments, FaLongArrowAltRight, FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";
import { createClient } from "contentful";
import { createClient as createManagementClient } from "contentful-management";

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});
const managementClient = createManagementClient({
  accessToken: import.meta.env.VITE_CONTENTFUL_MANAGEMENT_TOKEN,
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

  const incrementViews = async (postId) => {
    try {
      const space = await managementClient.getSpace(
        import.meta.env.VITE_CONTENTFUL_SPACE_ID
      );
      const environment = await space.getEnvironment("master");

      // Get the latest entry
      let entry = await environment.getEntry(postId);

      // Increment views
      const currentViews = entry.fields.views?.["en-US"] || 0;
      entry.fields.views = { "en-US": currentViews + 1 };

      // Update the entry
      entry = await entry.update();

      // Publish the entry
      await entry.publish();

      console.log(`Views updated to ${currentViews + 1}`);
    } catch (error) {
      if (error.name === "VersionMismatch") {
        console.warn("Version mismatch, retrying...");
        await incrementViews(postId); // retry once
      } else {
        console.error("Error incrementing views:", error);
      }
    }
  };

  return (
    <div className="text-black max-w-screen-xl mx-auto p-5">
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
      <div className="mt-10 flex flex-col md:flex-row gap-6 w-full">
        {/* Left side: 70% */}
        <div className="w-full md:w-[70%] p-3 space-y-6 overflow-auto">
          {/* Top: Title + Buttons */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 border-b border-gray-300 pb-2 w-full">
            <div>
              <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                Latest World Sport News
              </h1>
              <p className="text-lg text-gray-600">Don't miss daily news</p>
            </div>

            <div className="">
              <button className="bg-[#e93314] border border-gray-400 text-white py-1 px-4 text-xs md:text-sm cursor-pointer">
                Epl
              </button>
              <button className="border border-gray-400 py-1 px-4 text-xs md:text-sm cursor-pointer">
                Laliga
              </button>
              <button className="border border-gray-400 py-1 px-4 text-xs md:text-sm cursor-pointer">
                Bundesliga
              </button>
              <button className="border border-gray-400 py-1 px-4 text-xs md:text-sm cursor-pointer">
                Serie A
              </button>
              <button className="border border-gray-400 py-1 px-4 text-xs md:text-sm cursor-pointer">
                Ligue 1
              </button>
            </div>
          </div>

          {/* Bottom: News Cards */}
          {filteredItems.slice(0, 7).map((post) => (
            <div
              key={post.sys.id}
              className="flex flex-col md:flex-row gap-6 mt-10"
            >
              {/* Image container with fixed width */}
              <div className="w-full md:w-100 h-60 overflow-hidden rounded-lg flex-shrink-0">
                <img
                  src={post.fields.image.fields.file.url}
                  alt={post.fields.title}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>

              {/* Text content */}
              <div className="flex-1">
                <button className="bg-[#e93314] py-1 px-4 text-xs text-white font-bold">
                  {post.fields.category}
                </button>
                <Link
                  to={`/blogDetails/${post.sys.id}`}
                  onClick={() => incrementViews(post.sys.id)}
                >
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
                      alt="Placeholder"
                      className="w-10 h-10 rounded-full"
                    />
                    <p className="text-xs font-bold text-gray-800 uppercase">
                      By {post.fields.author}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-gray-800 font-semibold">
                    <div className="flex items-center gap-1 text-gray-800 font-semibold">
                      <FaRegComments size={14} className="text-[#e93314]" />
                      <small className="font-bold">0</small>
                    </div>
                    <div className="flex items-center gap-1 text-gray-800 font-semibold">
                      <FaRegEye size={14} className="text-[#e93314]" />
                      <small className="font-bold">
                        {post.fields.views || 0}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-gray-800 py-2 px-4 text-white font-semibold text-lg rounded mt-10 hover:bg-[#e93314] hover:text-white transition-colors duration-300">
            <Link className="flex items-center justify-center gap-2" to="/blog">
              Read all News
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
              <div key={post.sys.id} className="flex items-center mt-10 gap-3">
                <div className="w-32 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={post.fields.image.fields.file.url}
                    alt={post.fields.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <Link
                    to={`/blogDetails/${post.sys.id}`}
                    onClick={() => incrementViews(post.sys.id)}
                  >
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
                        <small className="font-bold">0</small>
                      </div>
                      <div className="flex items-center gap-1 text-gray-800 font-semibold">
                        <FaRegEye size={14} className="text-[#e93314]" />
                        <small className="font-bold">
                          {post.fields.views || 0}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          <div className="mt-8">
            <h2 className="text-gray-800 text-xl font-bold rounded border-b border-gray-400 pb-2">
              Popular Tags
            </h2>
            <div className="mt-5 flex items-center flex-wrap gap-2">
              <h1 className="bg-gray-800 py-1 px-4 text-white font-bold text-sm">
                Epl
              </h1>
              <h1 className="bg-gray-800 py-1 px-4 text-white font-bold text-sm">
                Laliga
              </h1>
              <h1 className="bg-gray-800 py-1 px-4 text-white font-bold text-sm">
                Bundesliga
              </h1>
              <h1 className="bg-gray-800 py-1 px-4 text-white font-bold text-sm">
                Serie A
              </h1>
              <h1 className="bg-gray-800 py-1 px-4 text-white font-bold text-sm">
                Ligue 1
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
