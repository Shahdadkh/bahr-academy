import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import LandingNavbar from "../Landing/LandingNavbar";

const MainLayout = ({ isExit }) => {
  return (
    <>
      <LandingNavbar isExit={isExit} />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
