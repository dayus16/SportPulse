import { Link } from "react-router-dom";
import { createClient } from "contentful";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { createClient as createManagementClient } from "contentful-management";

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});
const managementClient = createManagementClient({
  accessToken: import.meta.env.VITE_CONTENTFUL_MANAGEMENT_TOKEN,
});

const Blog = ({ input }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const normalizedInput = input.trim().toLowerCase();

  const filteredItems = blogPosts.filter(
    (post) =>
      post.fields.title.toLowerCase().includes(normalizedInput) ||
      post.fields.category.toLowerCase().includes(normalizedInput) ||
      post.fields.author.toLowerCase().includes(normalizedInput)
  );

  const getAllEntries = async () => {
    try {
      const response = await client.getEntries();
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

      let entry = await environment.getEntry(postId);
      const currentViews = entry.fields.views?.["en-US"] || 0;
      entry.fields.views = { "en-US": currentViews + 1 };

      entry = await entry.update();
      await entry.publish();

      console.log(`Views updated to ${currentViews + 1}`);
    } catch (error) {
      if (error.name === "VersionMismatch") {
        console.warn("Version mismatch, retrying...");
        await incrementViews(postId);
      } else {
        console.error("Error incrementing views:", error);
      }
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredItems.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  return (
    <div className="bg-gray-100 min-h-screen max-w-screen-xl mx-auto p-5">
      <h1 className="text-4xl text-gray-800 font-bold p-5">Blogs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 space-y-3 p-5">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <div key={post.sys.id} className="relative">
              <img
                src={post.fields.image?.fields?.file?.url}
                alt={post.fields.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <h1 className="absolute top-0 bg-gray-200 text-black text-sm py-1 px-4">
                {post.fields.category}
              </h1>
              <div className="mt-4 text-xl font-bold text-gray-800 hover:text-[#e93314]">
                <Link
                  to={`/blogDetails/${post.sys.id}`}
                  onClick={() => incrementViews(post.sys.id)}
                >
                  <p>{post.fields.title}</p>
                </Link>
              </div>
              <p className="text-gray-500 text-xs">
                <span className="text-[#e93314]">🕖</span>{" "}
                {new Date(post.fields.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 col-span-full">
            <ClipLoader size={25} />
            <p>Loading ...</p>
          </div>
        )}
      </div>

      {/* 🔹 Pagination Buttons */}
      {blogPosts.length > postsPerPage && (
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
          >
            <FiChevronLeft size={20} />
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
