import React from "react";
import { useEffect } from "react";
import { HiArrowSmUp } from "react-icons/hi";

import "./Scroll.css";

const Scroll = ({ scrollBox }) => {
  const calculateScrollProgress = () => {
    const progress = document.getElementById("progress");

    const position = scrollBox.current.scrollTop;
    const calculatedHeight =
      scrollBox.current.scrollHeight - scrollBox.current.clientHeight;
    const scrollValue = Math.round((position * 100) / calculatedHeight);

    progress.style.display = position > 100 ? "grid" : "none";
    progress.style.background = `conic-gradient(#2563eb ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
  };

  const handleProgressScrollToTop = () => {
    scrollBox.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  //add event
  useEffect(() => {
    scrollBox.current.addEventListener("scroll", calculateScrollProgress);
  }, []);

  // useReadingProgress();
  return (
    <div onClick={handleProgressScrollToTop} className="z-20 bottom-20 right-7" id="progress">
      <span id="progress-value">
        <HiArrowSmUp
          className="h-6 w-6 text-gray-600 rounded-full"
          aria-hidden="true"
        />
      </span>
    </div>
  );
};

export default Scroll;
