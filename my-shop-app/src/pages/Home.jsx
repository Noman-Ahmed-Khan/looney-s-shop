// components/HeroSection.jsx
import React, { useEffect, useState } from "react";
import { Facebook, Twitter, Instagram, ArrowRight  } from "lucide-react";

const texts = ["のみさん", "nomissaan", "Simple, Yūshū, Superior"];

const SocialIcon = ({ Icon, href = "#", className = "" }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`group relative p-3 rounded-full transition-all duration-300 ease-out hover:scale-110 text-[#F3ECEE] ${className}`}
  >
    <div className="absolute inset-0 bg-[#F3ECEE] opacity-0 group-hover:opacity-20 rounded-full transition-all duration-300" />
    <Icon 
      size={25} 
      className="relative z-10 group-hover:text-[#2b4f77] transition-colors duration-300" 
    />
  </a>
);

const Home = () => {
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTypingPaused, setIsTypingPaused] = useState(false);

  useEffect(() => {
    if (isTypingPaused) return;

    const currentFullText = texts[textIndex];
    const typingSpeed = isDeleting ? 80 : 150;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentFullText.length) {
        setCurrentText(currentFullText.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setCurrentText(currentFullText.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === currentFullText.length) {
        setIsTypingPaused(true);
        setTimeout(() => {
          setIsDeleting(true);
          setIsTypingPaused(false);
        }, 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, isTypingPaused]);

  return (
    <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-2 relative z-10">
      {/* Left Side */}
      <div className="bg-[#ACC5E1] text-[#F3ECEE] p-4 sm:p-6 lg:p-8 flex flex-col justify-between min-h-screen">
        <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto text-center lg:text-left">
          <h2 className="text-4xl text-[#3D516B] font-semibold mb-4 relative">
            Welcome
            <div className="absolute -bottom-2 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 w-24 h-1 bg-gradient-to-r from-[#ACC5E1] to-[#F3ECEE] rounded-full" />
          </h2>
          <p className="text-[#3D516B]/90 text-xl">
            Discover elevated essentials designed for everyday life — from perfectly cut tees to relaxed-fit pants and beyond.
          </p>
          <p className="text-[#3D516B]/90 text-xl mt-3">
            Crafted for those who move with intention, our collection is a celebration of simplicity and quality.
          </p>

          <div className="mt-3 flex justify-center lg:justify-start">
            <button className="text-[#F3ECEE] text-xl px-4 py-2 rounded-full hover:bg-[#3D516B] hover:scale-105 transition-all duration-300 flex justify-between items-center">
              Explore the Collection
              <ArrowRight className="ml-2" size={25} />
            </button>
          </div>
        </div>

        {/* Contact Info + Social Icons */}
        <div className="mt-10 text-center lg:text-left">
          <div className="space-y-3 mb-6">
            <div className="group flex items-center justify-center lg:justify-start space-x-3 hover:text-[#2B4F77] transition-colors duration-300">
              <p className="text-sm">info@mysite.com</p>
            </div>
            <div className="group flex items-center justify-center lg:justify-start space-x-3 hover:text-[#2B4F77] transition-colors duration-300">
              <p className="text-sm">123-456-7890</p>
            </div>
          </div>
          <div className="flex justify-center lg:justify-start space-x-4">
            <SocialIcon Icon={Facebook} />
            <SocialIcon Icon={Twitter} />
            <SocialIcon Icon={Instagram} />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-center items-center bg-[#ACC5E1] text-[#3D516B] min-h-screen pt-5 lg:pb-20 px-4 sm:px-6 relative">
        {/* Background gradient - positioned behind the text */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-96 h-96 bg-gradient-to-r from-[#3D516B]/10 to-transparent rounded-full blur-xl" />
        </div>
        
        <div className="text-center max-w-md lg:max-w-lg transform hover:scale-105 transition-transform duration-100 ease-in-out relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium mb-4 relative">
            <span className="inline-block min-h-[1.2em]">
              {currentText}
              <span className="animate-pulse text-[#3D516B]">|</span>
            </span>
          </h1>
          <p className="text-[#F3ECEE] rounded-full bg-[#3D516B]/20 px-6 py-2 backdrop-blur-sm" />
        </div>
      </div>

    </div>
  );
};

export default Home;