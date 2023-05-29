import React, { useState } from "react";
import { motion } from "framer-motion";
import { ButtonMotion } from './../../core/Utils/AnimEffect';

// interface Props {
//   initialShowCount: number;
//   stepCount: number;
//   data: any[];
//   content: any;
// }

const ShowMoreData = ({ initialShowCount, stepCount, data, content }) => {
  const [showCount, setShowCount] = useState(initialShowCount);
  const handleShowMore = () => {
    setShowCount(showCount + stepCount);
  };
  return (
    <>
      {data.slice(0, showCount).map((item, index) => content(item, index))}
      {data.length > showCount ? (
        <motion.button
          variants={ButtonMotion}
          whileHover="hover"
          animate="visible"
          initial="hidden"
          type="button"
          className="block mx-auto mt-6 col-span-2 px-7 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-button-600 hover:bg-button-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-500"
          onClick={handleShowMore}
        >
          نمایش بیشتر
        </motion.button>
      ) : null}
    </>
  );
};

export default ShowMoreData;
