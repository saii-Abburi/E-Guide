import React from "react";
import { MdNote } from "react-icons/md";
import { Link } from "react-router-dom";
import HeroImg from "../assets/HeroImg.jpg";

const HeroSection = () => {
  return (
    <section id="about" className="relative flex flex-col md:flex-row items-center justify-center gap-6 px-6 py-12 min-h-[70vh] overflow-hidden opacity-0 translate-y-4 animate-fade-in">
      
      {/* Image Section */}
      <div className="flex-shrink-0">
        <img
          src={HeroImg}
          alt="E-Guide Hero"
          className="rounded-2xl  w-[300px] md:w-[450px] transition-opacity duration-700 opacity-100"
        />
      </div>

      {/* Text Section */}
      <div className="mt-8 md:mt-0 md:ml-10 max-w-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight mb-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Had a tough time searching for material?
        </h1>
        <p className="text-lg text-slate-600 mb-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          E-Guide is here to help you — notes, tips, and all the college stuff you need, all in one spot. No more late-night panic searching!
        </p>
        <Link to="/login">
          <button
            className="flex items-center gap-2 text-lg font-semibold bg-primary text-white px-6 py-3 rounded-xl shadow-md hover:scale-105 hover:bg-blue-700 transition-transform duration-300 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <MdNote className="w-6 h-6" />
            Get The Notes
          </button>
        </Link>
      </div>
      
    </section>
  );
};

export default HeroSection;
