import { useState, useEffect } from "react";

import { IoArrowUpSharp } from "react-icons/io5";
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  return (
    <button
      onClick={scrollToTop}
      className={`cursor-pointer animate-bounce fixed z-20 bottom-10 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <IoArrowUpSharp size={24} />
    </button>
  );
}

export default ScrollToTop;
