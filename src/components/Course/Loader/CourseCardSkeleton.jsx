import Skeleton from "react-loading-skeleton";

export const CourseCardSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div key={i}>
        <li className="bg-background-600 h-80 rounded-t-md">
          <div className="group block w-full relative h-44 p-1 aspect-w-10 aspect-h-7 bg-background-550 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-button-500 overflow-hidden">
            <Skeleton className="absolute w-full h-full" />
          </div>
          <div className="mt-2 block w-2/3 text-sm font-medium text-textHead-900 truncate pointer-events-none px-3">
            <Skeleton />
          </div>
          <div className="block mt-10 px-3 pb-3">
            <Skeleton count={2} />
          </div>
        </li>
      </div>
    ));
};
