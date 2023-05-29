import React from "react";
import Skeleton from "react-loading-skeleton";

const CourseDetailSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div
        className="w-6/7 md:flex bg-background-550  max-w-7xl mx-auto sm:mt-12 mt-8 rounded-lg p-4"
        key={i}
      >
        <div className="md:w-3/4">
          <div className="w-1/5">
            <Skeleton />
          </div>
          <div className="h-10 w-1/2 my-10 mr-2">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="md:my-10 w-5/6 mx-auto">
            <Skeleton count={4} />
            <Skeleton width={"50%"} />
          </div>
          <div className="mx-auto border-t-2 py-5">
            <Skeleton height={"50px"} width={"90%"} count={3} />
          </div>
        </div>
        <div className="md:w-1/4 p-3 md:border-r-2">
          <div className="w-full border-b-2">
            <Skeleton className="h-32 w-full" />
            <div className="mx-auto w-2/3 py-5">
              <Skeleton count={3} />
            </div>
          </div>
          <div className=" mx-auto border-b-2 py-4">
            <Skeleton count={2} height={"40px"} />
          </div>
          <div className="w-2/3 m-auto mt-4">
            <Skeleton count={3} />
          </div>
        </div>
      </div>
    ));
};

export default CourseDetailSkeleton;
