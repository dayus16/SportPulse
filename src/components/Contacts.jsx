import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";

const Contacts = () => {
  const [result, setResult] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const clearInput = () => {
    setName(""), setEmail(""), setMessage("");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult(true);
    const formData = new FormData(event.target);

    formData.append("access_key", "2dc75608-bdc0-41a8-b96f-17b199d7756c");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      toast.success("Form Submitted Successfully");
      setResult(false);
      clearInput();
      event.target.reset();
    } else {
      console.log("Error", data);
      toast.error(data.message);
    }
  };
  return (
    <div className="p-5">
      <div className="mt-10">
        <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
        <p className="mt-5 text-sm text-gray-700">
          Have a question, suggestion, or partnership inquiry? Fill out the form
          below and we’ll get back to you as soon as possible.
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="mt-10">
          <label className="block mb-2 text-lg text-gray-800">Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full md:w-[50%] h-50 border border-gray-500 outline-none px-4 py-2"
            required
          />
        </div>
        <div className="mt-3">
          <button className="bg-[#e93314] w-40 px-6 py-2 text-white rounded font-semibold cursor-pointer">
            {result ? (
              <div className="flex items-center justify-center">
                <ClipLoader color="fff" size={25} />
              </div>
            ) : (
              "Send Message"
            )}
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
