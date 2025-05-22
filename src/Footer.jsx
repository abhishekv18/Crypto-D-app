
import React from "react";
import { FaGithub, FaTwitter, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col  p-5 mt-52 bg-black bg-opacity-60 backdrop-blur-md border-t border-gray-800">
    <p className="text-sm text-gray-400">
         Design & Developed by <span className="font-bold">Abhishek</span> ❤️
    </p>
      <p className="text-sm text-gray-400">
       
       &copy; {new Date().getFullYear()} All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
