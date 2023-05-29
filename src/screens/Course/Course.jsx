import CourseHeader from "../../components/Course/CourseHeader";
import CourseCard from "../../components/Course/CourseCard";
import { useEffect } from "react";

const Course = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CourseHeader />
      <CourseCard />
    </>
  );
};

export default Course;
