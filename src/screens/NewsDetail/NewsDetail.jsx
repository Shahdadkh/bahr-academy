import NewsDetails from "../../components/News Details/NewsDetails";
import CommentField from "../../components/common/CommentField";
import ReviewCustomer from "../../components/common/ReviewCustomer";
import { useEffect } from "react";

const NewsDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NewsDetails />
      <CommentField />
      <ReviewCustomer />
    </>
  );
};

export default NewsDetail;
