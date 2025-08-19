import { Link } from "react-router-dom";
import Photo from "../Images/Home_Pix.jpg";
import { createClient } from "contentful";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const client = createClient({
  space: "g7ox7xqtg9kf",
  accessToken: "MBk4iBA_vOXWfhfCgNiG5tIm699bbZz9URhMPLZPkk0",
});

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
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
    <div className="bg-gray-100 min-h-screen p-5">
      <h1 className="text-4xl font-bold p-5">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-2 gap-4 p-5">
        {blogPosts.length > 0 ? (
          blogPosts.map((post) => (
            <div key={post.sys.id} className="relative">
              <img
                src={post.fields.image?.fields?.file?.url}
                alt={post.fields.title}
                className="w-full h-68 object-cover rounded-lg overflow-hidden"
              />
              <h1 className="absolute top-0 bg-[#e93314] text-white text-sm py-1 px-4">
                {post.fields.category}
              </h1>
              <div className="mt-4 text-xl font-bold text-gray-800 hover:text-[#e93314]">
                <Link to={`/blogDetails/${post.sys.id}`}>
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

        <div className="relative">
          <img src={Photo} alt="" className="w-100 rounded-lg" />
          <h1 className="absolute top-0 bg-[#e93314] text-white text-sm py-1 px-4">
            Baseball
          </h1>
          <div className="mt-4 text-xl font-bold text-gray-800 hover:text-[#e93314]">
            <Link>Cape Town's Day Zero: We are axing trees to save water</Link>
          </div>
          <p className="text-gray-500 text-xs">
            <span className="text-[#e93314]">🕖</span> 15 May 2022
          </p>
        </div>
        <div className="relative">
          <img src={Photo} alt="" className="w-100 rounded-lg" />
          <h1 className="absolute top-0 bg-[#e93314] text-white text-sm py-1 px-4">
            Basketball
          </h1>
          <div className="mt-4 text-xl font-bold text-gray-800 hover:text-[#e93314]">
            <Link>Cape Town's Day Zero: We are axing trees to save water</Link>
          </div>
          <p className="text-gray-500 text-xs">
            <span className="text-[#e93314]">🕖</span> 15 May 2022
          </p>
        </div>
        <div className="relative">
          <img src={Photo} alt="" className="w-100 rounded-lg" />
          <h1 className="absolute top-0 bg-[#e93314] text-white text-sm py-1 px-4">
            Hockey
          </h1>
          <div className="mt-4 text-xl font-bold text-gray-800 hover:text-[#e93314]">
            <Link>Cape Town's Day Zero: We are axing trees to save water</Link>
          </div>
          <p className="text-gray-500 text-xs">
            <span className="text-[#e93314]">🕖</span> 15 May 2022
          </p>
        </div>
        <div className="relative">
          <img src={Photo} alt="" className="w-100 rounded-lg" />
          <h1 className="absolute top-0 bg-[#e93314] text-white text-sm py-1 px-4">
            Table-tennis
          </h1>
          <div className="mt-4 text-xl font-bold text-gray-800 hover:text-[#e93314]">
            <Link>Cape Town's Day Zero: We are axing trees to save water</Link>
          </div>
          <p className="text-gray-500 text-xs">
            <span className="text-[#e93314]">🕖</span> 15 May 2022
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
