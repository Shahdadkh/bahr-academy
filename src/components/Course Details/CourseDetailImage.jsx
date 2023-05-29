export default function CourseDetailImage({ courseData }) {
  return (
    <div role="list" className="grid grid-cols-1">
      <div className="relative">
        <div className="group block w-full aspect-w-10 bg-background-600 aspect-h-7  focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-button-500 overflow-hidden">
          <img
            src={courseData.lesson.image}
            alt=""
            className="object-cover pointer-events-none group-hover:opacity-75 w-60 mx-auto rounded-md mt-6"
          />
        </div>
      </div>
    </div>
  );
}
