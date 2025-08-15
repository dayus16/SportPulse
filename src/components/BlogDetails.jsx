import React, { useState, useEffect } from "react";
import { FaRegComments } from "react-icons/fa";
import Placeholder from "../Images/Placeholder.png";
import Background from "../Images/Home_Pix.jpg";
import { createClient } from "contentful";
import { useParams } from "react-router-dom";

const client = createClient({
  space: "g7ox7xqtg9kf",
  accessToken: "MBk4iBA_vOXWfhfCgNiG5tIm699bbZz9URhMPLZPkk0",
});

const BlogDetails = () => {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await client.getEntry(id);
        console.log(response);
        setBlogPost(response);
      } catch (error) {
        console.error("Error fetching entry:", error);
      }
    };

    if (id) fetchEntry();
  }, [id]);

  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Create a new comment object
    const newComment = {
      id: Date.now(),
      name,
      email,
      message,
      date: new Date().toLocaleString(),
    };

    // Add to comments list
    setComments([newComment, ...comments]);

    // Clear the form
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="mt-10 w-full md:w-[70%]">
      <div className="p-8">
        {/* Blog content */}
        {blogPost ? (
          <>
            <button className="bg-[#e93314] py-1 px-4 text-white text-sm">
              {blogPost.fields.category}
            </button>

            <h1 className="text-3xl mt-4 text-gray-800">
              {blogPost.fields.title}
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-between mt-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <img
                    src={Placeholder}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="text-xs font-bold text-gray-800">
                    By {blogPost.fields.author || "Unknown"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">
                    <span className="text-[#e93314]">🕖</span>{" "}
                    {new Date(blogPost.fields.date).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-800 font-semibold">
                <FaRegComments size={15} className="text-[#e93314]" />
                <p className="text-xs font-bold">{comments.length}</p>
              </div>
            </div>

            <div className="mt-4">
              <img
                src={blogPost.fields.image?.fields?.file?.url || Background}
                alt={blogPost.fields.title}
                className="rounded-lg w-full h-auto"
              />
            </div>

            <div className="mt-6 text-lg text-gray-800">
              {blogPost.fields.postContent}
               
            </div>

            {/* Comment Form */}
            <div className="mt-5">
              <p className="font-bold text-gray-800 text-2xl">
                Leave a comment
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 mt-5">
              <div className="flex items-center gap-3">
                <div className="w-1/2">
                  <label>Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full py-2 px-4 outline-none border border-gray-500"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full py-2 px-4 outline-none border border-gray-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label>Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message..."
                  className="w-full py-2 px-4 outline-none border border-gray-500"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-[#e93314] py-2 px-6 text-white cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>

            {/* Display Comments */}
            <div className="mt-10">
              <h2 className="text-xl font-bold mb-4">
                Comments ({comments.length})
              </h2>
              {comments.length === 0 ? (
                <p className="text-gray-500">No comments yet. Be the first!</p>
              ) : (
                <div className="space-y-4">
                  {comments.map((c) => (
                    <div
                      key={c.id}
                      className="border border-gray-300 p-4 rounded-md bg-gray-50 shadow-sm"
                    >
                      <p className="font-semibold">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.date}</p>
                      <p className="mt-2">{c.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <p>Loading blog post...</p>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
