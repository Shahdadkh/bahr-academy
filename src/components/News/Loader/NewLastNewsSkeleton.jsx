import Skeleton from "react-loading-skeleton";

export const NewLastNewsSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div key={i} className="flex h-56 sm:h-48 p-3 bg-background-750 shadow-md rounded-md">
        <div className=" relative m-1 w-1/3 ">
          <Skeleton className="absolute h-full w-full rounded-md" />
        </div>
        <div className="mr-4 relative w-2/3">
          <div className="w-2/3 h-10">
            <Skeleton count={1} />
          </div>
          <Skeleton count={4} className="w-full" />
          <div className="w-1/4">
            <Skeleton />
          </div>
        </div>
      </div>
    ));
};
