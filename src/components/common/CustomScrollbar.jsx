import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Scroll from "../ScrollToTop/Scroll";
import SimpleBar from "simplebar-react";
import Darkmode from "./Darkmode";

const CustomScrollbar = ({ children, boxClassName }) => {
  const scrollRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, [pathname]);

  return (
    <SimpleBar
      scrollableNodeProps={{ ref: scrollRef }}
      className={boxClassName}
    >
      <Darkmode className="absolute z-50" />
      <Scroll scrollBox={scrollRef} />
      {children}
    </SimpleBar>
  );
};

export default CustomScrollbar;
