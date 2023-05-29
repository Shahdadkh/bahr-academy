import { HiChevronLeft, HiHome } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

export default function CourseDetailBreadCrumb({ courseData }) {
  const courseLocaction = useLocation();

  const pages = [
    { name: "دورهها", href: "/Course", current: false },
    {
      name: courseData.lesson.lessonName,
      href: courseLocaction,
      current: true,
    },
  ];
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        <li className="m-0">
          <div className="m-auto text-center">
            <Link to="/" className="text-gray-400 hover:text-toz">
              <HiHome className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
              <span className="sr-only">خانه</span>
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <HiChevronLeft
                className="flex-shrink-0 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <Link
                to={page.href}
                className="text-sm font-medium text-toz hover:text-gray-400"
                aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
