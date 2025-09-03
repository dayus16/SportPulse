import React from "react";

const About = () => {
  return (
    <div className="p-5 max-w-screen-xl mx-auto">
      {/* Our Story Section */}
      <div className="p-5">
        <h1 className="text-3xl text-gray-800 font-bold mt-10 uppercase border-b-3 border-gray-600 w-fit pb-1">
          Our Story
        </h1>
        <p className="text-lg text-gray-600 mt-2 italic">Who We Are</p>
      </div>

      <div className="mt-5 space-y-4 p-5">
        <p className="text-lg text-gray-600 leading-relaxed">
          At <span className="font-semibold text-[#e93314]">SportPulse</span>,
          we believe sports are more than just games — they’re stories, passion,
          and a shared heartbeat that connects fans around the world. Founded by
          a team of dedicated sports enthusiasts, SportPulse delivers timely
          news, in-depth analysis, and engaging commentary across football,
          basketball, athletics, and more.
        </p>
      </div>

      {/* Mission Section */}
      <div className="p-5">
        <h2 className="text-3xl text-gray-800 font-bold mt-10 uppercase border-b-3 border-gray-600 w-fit pb-1">
          Our Mission
        </h2>
        <ul className="list-disc list-inside text-lg text-gray-600 mt-5 space-y-2">
          <li>
            <span className="font-semibold text-[#e93314]">Inform</span> –
            Provide accurate and up-to-date sports coverage.
          </li>
          <li>
            <span className="font-semibold text-[#e93314]">Engage</span> –
            Create a space where fans can discuss, debate, and celebrate.
          </li>
          <li>
            <span className="font-semibold text-[#e93314]">Inspire</span> –
            Share stories that highlight the human spirit behind the scores.
          </li>
        </ul>

        <p className="mt-5 text-lg text-gray-600 leading-relaxed">
          We combine real-time updates with carefully researched content from
          credible sources, ensuring our readers get quality information they
          can trust. Whether it’s breaking transfer news, post-match analysis,
          or exclusive interviews, SportPulse keeps you in sync with the pulse
          of the sports world.
        </p>

        <p className="mt-5 text-lg text-gray-600 leading-relaxed">
          From local matches to global tournaments, we’re here to make sure you
          never miss a beat.
        </p>
      </div>
    </div>
  );
};

export default About;
