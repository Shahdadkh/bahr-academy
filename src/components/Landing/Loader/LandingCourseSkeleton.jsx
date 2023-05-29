import React from "react";
import Skeleton from "react-loading-skeleton";

const LandingCourseSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div key={i} className=" rounded-lg shadow-lg overflow-hidden">
        <div className=" bg-background-500 h-40">
          <Skeleton className="animate-pulse w-full h-full" />
        </div>
        <div className=" bg-background-750 p-6 w-full">
          <div className="w-1/2">
            <Skeleton />
          </div>
          <div className="block mt-2">
            <Skeleton count={3} />
          </div>
          <div className="flex gap-x-3 mt-6">
            <div className="w-10 h-10">
              <Skeleton circle className="w-10 h-10" />
            </div>
            <div className="w-1/3">
              <Skeleton count={2} />
            </div>
          </div>
        </div>
      </div>
    ));
};
export default LandingCourseSkeleton;
