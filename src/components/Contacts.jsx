import React from "react";

const Contacts = () => {
  return (
    <div className="p-5">
      <div className="mt-10">
        <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
        <p className="mt-5 text-sm text-gray-700">
          Have a question, suggestion, or partnership inquiry? Fill out the form
          below and we’ll get back to you as soon as possible.
        </p>
      </div>
      <form>
        <div className="mt-10">
          <label className="block mb-2 text-lg text-gray-800">Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name *"
            className="w-full md:w-[50%] border border-gray-500 outline-none px-4 py-2"
            required
          />
        </div>
        <div className="mt-5">
          <label className="block mb-2 text-lg text-gray-800">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Example@gmail..."
            className="w-full md:w-[50%] border border-gray-500 outline-none px-4 py-2"
            required
          />
        </div>
        <div className="mt-5">
          <label className="block mb-2 text-lg text-gray-800">Message</label>
          <textarea
            type="text"
            name="message"
            placeholder="Write your message here..."
            className="w-full md:w-[50%] h-50 border border-gray-500 outline-none px-4 py-2"
            required
          />
        </div>
        <div className="mt-3">
          <button className="bg-[#e93314] px-6 py-2 text-white rounded font-semibold cursor-pointer">
            Send Message
          </button>
        </div>
      </form>
      <div className="mt-5">
        <p className="text-sm text-gray-700">
          <span className="font-semibold"> Note:</span> This platform is
          dedicated to delivering reliable sports news, updates, and analysis.
          All articles are carefully <br /> curated from credible sources or
          produced by our editorial team. We do not endorse misinformation or
          unauthorized content. <br /> Please use the Contact Us form for
          questions, suggestions, or partnership opportunities.
        </p>
      </div>
    </div>
  );
};

export default Contacts;
