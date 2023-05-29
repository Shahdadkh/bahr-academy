import Skeleton from "react-loading-skeleton";

export const PressNewsSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div
        key={i}
        className="flex md:h-48 lg:h-40 p-3 bg-background-750 shadow-md rounded-md"
      >
        <div className="relative m-1 w-1/2">
          <Skeleton className="absolute h-full w-full rounded-md" />
        </div>
        <div className="mr-4 w-full">
          <div className="w-1/2">
            <Skeleton count={1} />
          </div>
          <div className="w-full mt-5">
            <Skeleton count={2} />
          </div>
        </div>
      </div>
    ));
};
