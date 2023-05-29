import NewsHeader from "../../components/News/NewsHeader";
import NewsLastNews from "../../components/News/NewsLastNews";
import PressNews from './../../components/News/PressNews';
import { useEffect } from "react";

const News = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NewsHeader />
      <NewsLastNews />
      <PressNews />
    </>
  );
};

export default News;
