import { Fragment, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { GetAllCoursesAPI } from "../../core/services/GetAllCoursesAPI";
import GetAllNewsAPI from "../../core/services/GetAllNewsAPI";
import { HiOutlineCog, HiSearch } from "react-icons/hi";
import { handleTitle } from "../../core/Utils/handleSplitText";
import AdvanceSearch, { plans } from "./AdvanceSearch";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function LandingSearchModal({ showModal, setShowModal }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const location = useLocation().pathname;
  const [showAdvanceSearch, setshowAdvanceSearch] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(plans[0]);
  const [IsLoad, setIsLoad] = useState(true);
  const [courses, setCourseData] = useState([]);
  const [news, setNewsData] = useState([]);

  useEffect(() => {
    GetAllCoursesAPI(setIsLoad, setCourseData);
    GetAllNewsAPI(setIsLoad, setNewsData);
  }, [location.pathname]);
  useEffect(() => {
    if (showModal === true) {
      setOpen(true);
    }
    if (open === false) {
      setShowModal(open);
    }
  });

  const openFilters = () => {
    setshowAdvanceSearch(!showAdvanceSearch);
  };

  const filteredCourses =
    query === ""
      ? []
      : courses.filter((course) => {
          if (selectedCourse.value === 1) {
            return course.title.toLowerCase().includes(query.toLowerCase());
          } else if (selectedCourse.value === 2) {
            return course.teacher.fullName
              .toLowerCase()
              .includes(query.toLowerCase());
          } else {
            return course.title.toLowerCase().includes(query.toLowerCase());
          }
        });

  const filteredNews =
    query === ""
      ? []
      : news.filter((news) => {
          return news.title.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Transition.Root show={open} as={Fragment} afterLeave={() => setQuery("")}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20"
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-xl transform divide-y  divide-gray-100 overflow-hidden rounded-xl bg-background-600 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
          >
            <div className="relative">
              <div className="absolute top-2 left-3 flex gap-x-2">
                <HiSearch
                  className=" h-5 w-5 text-toz mt-1"
                  aria-hidden="true"
                />
                <button
                  onClick={() => openFilters()}
                  className="shadow-md rounded-md h-8 flex gap-x-1 bg-button-500 hover:bg-button-600 px-2 py-1.5"
                >
                  <span className="text-xs text-textHead-900">
                    جستجوی پیشرفته
                  </span>
                  <HiOutlineCog className=" h-5 w-5 text-toz" />
                </button>
              </div>

              <Combobox.Input
                className="h-12 w-full border-0 bg-transparent  pl-11 pr-4 text-sm text-textHead-800 placeholder-toz focus:ring-0"
                placeholder="جستجو..."
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            {location === "/News"
              ? filteredNews.length > 0 && (
                  <Combobox.Options
                    static
                    className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-textHead-800 "
                  >
                    {filteredNews.map((news) => (
                      <Combobox.Option
                        key={news._id}
                        value={news}
                        className={({ active }) =>
                          classNames(
                            "cursor-pointer select-none px-4 py-2",
                            active && "bg-button-600 text-white"
                          )
                        }
                      >
                        <Link
                          to={/News/ + news._id}
                          onClick={() => setOpen(false)}
                        >
                          <div className="w-full h-12 lg:h-16 flex">
                            <div className="w-1/5 relative h-12 lg:h-16  bg-background-600 rounded-md">
                              <img
                                className="absolute w-full h-full shadow-md rounded-md"
                                src={news.image}
                                alt=""
                              />
                            </div>
                            <div className="py-0.5 pr-2 indent-3">
                              <span>{handleTitle(news.title)}</span>
                              <span className="text-textHead-800 block pt-1">
                                {news.category}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </Combobox.Option>
                    ))}
                    {filteredNews.map((news) => (
                      <Combobox.Option
                        key={news._id}
                        value={news}
                      ></Combobox.Option>
                    ))}
                  </Combobox.Options>
                )
              : filteredCourses.length > 0 && (
                  <Combobox.Options
                    static
                    className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-textHead-800 "
                  >
                    {filteredCourses.map((course) => (
                      <Combobox.Option
                        key={course._id}
                        value={course}
                        className={({ active }) =>
                          classNames(
                            "cursor-pointer select-none px-4 py-2",
                            active && "bg-button-600 text-white"
                          )
                        }
                      >
                        <Link
                          to={/Course/ + course._id}
                          onClick={() => setOpen(false)}
                        >
                          <div className="w-full h-12 lg:h-16 flex">
                            <div className="w-1/5 relative h-12 lg:h-16  bg-background-600 rounded-md">
                              <img
                                className="absolute w-full h-full shadow-md rounded-md"
                                src={course.lesson.image}
                                alt=""
                              />
                            </div>
                            <div className="py-0.5 pr-2 indent-3">
                              <span>{course.title}</span>
                              <div className="flex">
                                <span className="text-textHead-800 block pt-1">
                                  {course.lesson.lessonName}
                                </span>
                                <span className="text-textHead-800 block pt-1">
                                  {"/"} {course.teacher.fullName}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </Combobox.Option>
                    ))}
                    {filteredCourses.map((course) => (
                      <Combobox.Option
                        key={course._id}
                        value={course}
                      ></Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}
            {query !== "" &&
              (filteredCourses.length || filteredNews.length) === 0 && (
                <p className="p-4 text-sm text-toz">موردی یافت نشد.</p>
              )}
            {showAdvanceSearch && (
              <AdvanceSearch setSelectedCourse={setSelectedCourse} />
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
