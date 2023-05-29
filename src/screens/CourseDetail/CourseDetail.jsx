import CourseDetailHeader from "../../components/Course Details/CourseDetailHeader";
import CommentField from "../../components/common/CommentField";
import ReviewCustomer from "../../components/common/ReviewCustomer";
import { useEffect } from "react";

const CourseDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CourseDetailHeader />
      <CommentField />
      <ReviewCustomer />
    </>
  );
};

export default CourseDetail;
