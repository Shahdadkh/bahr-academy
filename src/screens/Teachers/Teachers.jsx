import CourseHeader from "../../components/Course/CourseHeader";
import LandingTeachers from "../../components/Landing/LandingTeachers";
import { useEffect } from "react";

const Teachers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <CourseHeader />
      <LandingTeachers num="0" />
    </>
  );
};

export default Teachers;
