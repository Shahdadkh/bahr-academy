import React from "react";
import Skeleton from "react-loading-skeleton";

const LandingTeachersSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <li className="cursor-default" key={i}>
        <div className="rounded-xl shadow-md bg-background-750 h-80 p-5">
                <Skeleton
                    circle
            className="mx-auto h-40 w-40 rounded-full xl:w-44 xl:h-44"
          />
          <div className="space-y-2 mt-4">
            <div className="text-lg leading-6 text-textHover-600 font-medium space-y-1 "><Skeleton count={2}/></div>
          </div>
        </div>
      </li>
    ));
};

export default LandingTeachersSkeleton;
