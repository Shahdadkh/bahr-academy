import { useEffect } from "react";

import LandingHeader from "../../components/Landing/LandingHeader";
import LandingStatistics from "../../components/Landing/LandingStatistics";
import LandingServices from "../../components/Landing/LandingServices";
import LandingCategory from "../../components/Landing/LandingCategory";
import LandingSignIn from "../../components/Landing/LandingSignIn";

import LandingCourse from "../../components/Landing/LandingCourse";
import LandingTeachers from "../../components/Landing/LandingTeachers";
import LandingSupport from "../../components/Landing/LandingSupport";
import LandingMessage from "../../components/Landing/LandingMessage";

import Button from "../../components/common/Button";
import LandingNews from "./../../components/Landing/LandingNews";

const Landing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div>
        <LandingHeader />
        <LandingStatistics />
        <LandingServices />
        <LandingCategory />
        <LandingSignIn />
        <LandingCourse />
        <Button url="/Course" />
        <LandingTeachers num="4" />
        <Button url="/Teachers" />
        <LandingSupport />
        <LandingNews />
        <Button url="/News" />
        <LandingMessage />
      </div>
    </>
  );
};

export default Landing;
