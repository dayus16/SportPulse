import { useState, useEffect } from "react";
import { FaRegComments, FaRegEye } from "react-icons/fa";
import Placeholder from "../Images/Placeholder.png";
import Background from "../Images/Home_Pix.jpg";
import { createClient } from "contentful";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Adbanner from "./Adbanner.jsx";

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

const BlogDetails = () => {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await client.getEntry(id);
        setBlogPost(response);
      } catch (error) {
        console.error("Error fetching entry:", error);
      }
    };

    if (id) fetchEntry();
  }, [id]);

  // ✅ Load comments from localStorage on mount
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem(`comments_${id}`);
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Save comments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`comments_${id}`, JSON.stringify(comments));
  }, [comments, id]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const newComment = {
      id: Date.now(),
      name,
      email,
      message,
      date: new Date().toLocaleString(),
      replies: [], // ✅ store replies inside
    };

    setComments([newComment, ...comments]);
    setName("");
    setEmail("");
    setMessage("");
  };

  // ✅ Handle reply
  const handleReply = (commentId, replyText, replyName) => {
    if (!replyText || !replyName) return;

    const updated = comments.map((c) =>
      c.id === commentId
        ? {
            ...c,
            replies: [
              ...c.replies,
              {
                id: Date.now(),
                name: replyName,
                message: replyText,
                date: new Date().toLocaleString(),
              },
            ],
          }
        : c
    );

    setComments(updated);
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
              <div className="flex items-center gap-3 text-gray-800 font-semibold">
                <div className="flex items-center gap-1 text-gray-800 font-semibold">
                  <FaRegComments size={15} className="text-[#e93314]" />
                  <small className="text-xs font-bold">{comments.length}</small>
                </div>
                <div className="flex items-center gap-1 text-gray-800 font-semibold">
                  <FaRegEye size={15} className="text-[#e93314]" />
                  <small className="text-xs font-bold">2</small>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <img
                src={blogPost.fields.image?.fields?.file?.url || Background}
                alt={blogPost.fields.title}
                className="rounded-lg w-full h-120 object-cover overflow-hidden rounded-t-lg"
              />
            </div>
            <Adbanner />
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
                    <CommentItem key={c.id} comment={c} onReply={handleReply} />
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            <ClipLoader size={25} />
            <p>Loading ...</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ✅ Separate component for comment + replies
const CommentItem = ({ comment, onReply }) => {
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyName, setReplyName] = useState("");

  const handleSubmitReply = (e) => {
    e.preventDefault();
    onReply(comment.id, replyText, replyName);
    setReplyText("");
    setReplyName("");
    setReplying(false);
  };

  return (
    <div className="border border-gray-300 p-4 rounded-md bg-gray-50 shadow-sm">
      <p className="font-semibold">{comment.name}</p>
      <p className="text-xs text-gray-500">{comment.date}</p>
      <p className="mt-2">{comment.message}</p>

      <button
        className="text-sm text-[#e93314] mt-2 cursor-pointer"
        onClick={() => setReplying(!replying)}
      >
        {replying ? "Cancel" : "Reply"}
      </button>

      {replying && (
        <form onSubmit={handleSubmitReply} className="mt-3 space-y-2">
          <input
            type="text"
            value={replyName}
            onChange={(e) => setReplyName(e.target.value)}
            placeholder="Your name"
            className="w-full py-1 px-2 outline-none border border-gray-400 text-sm"
            required
          />
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
            className="w-full py-1 px-2 outline-none border border-gray-400 text-sm"
            required
          />
          <button
            type="submit"
            className="bg-[#e93314] py-1 px-4 text-white text-sm cursor-pointer"
          >
            Post Reply
          </button>
        </form>
      )}

      {/* Nested replies */}
      {comment.replies.length > 0 && (
        <div className="mt-3 ml-5 border-l pl-3 space-y-2">
          {comment.replies.map((r) => (
            <div key={r.id} className="bg-white p-2 rounded border text-sm">
              <p className="font-semibold">{r.name}</p>
              <p className="text-xs text-gray-500">{r.date}</p>
              <p>{r.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
