import { Link } from "react-router-dom";
import Photo from "../Images/Home_Pix.jpg";

const Blog = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <h1 className="text-4xl font-bold p-5">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-2 gap-4 p-5">
        <div className="relative">
          <img src={Photo} alt="" className="w-100 rounded-lg" />
          <h1 className="absolute top-0 bg-[#e93314] text-white text-sm py-1 px-4">
            Football
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
