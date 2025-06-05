import React, { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav>
      <div className=" bg-background sticky top-0 text-black flex p-14 justify-between h-[100px] items-center opacity-0 translate-y-4 animate-fade-in">
      {/* Logo */}
      <div className="nav-left">
        <h1 className="text-heading text-primary font-bold">E-Guide</h1>
      </div>
      {/* Right Nav Links */}
      <ul className="gap-3 h-[100%] items-center hidden  md:flex">
        <li className="hover:text-primary hover:transition-colors-[300ms] font-light">
          <a href="#about">About</a>
        </li>
        <li className="hover:text-primary hover:transition-colors-[300ms] font-light">
          <a href="#why">Why?</a>
        </li>
        <Link to="/login"><button className="font-light bg-primary text-white p-[8px] border-0 outline-0 rounded-[12px] hover:transition-colors-[300ms] hover:bg-[rgb(0,83,218)]">
            Login/Signup
          </button></Link>
      </ul>
      <button className="md:hidden text-normal" onClick={toggleMenu}>
        {isOpen ? <MdClose /> : <MdMenu />}
      </button> 
    </div>
          {/* Mobile view */}
      

      {isOpen && (
        <ul className="mt-large gap-3 h-[100%] items-center flex flex-col">
          <li className="hover:text-primary hover:transition-colors-[300ms] font-light">
            <a href="#about">About</a>
          </li>
          <li className="hover:text-primary hover:transition-colors-[300ms] font-light">
            <a href="#why">Why?</a>
          </li>
          <Link to="/login"><button className="font-light bg-primary text-white p-[8px] border-0 outline-0 rounded-[12px] hover:transition-colors-[300ms] hover:bg-[rgb(0,83,218)]">
            Login/Signup
          </button></Link>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
