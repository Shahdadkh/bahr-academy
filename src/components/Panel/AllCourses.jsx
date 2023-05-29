import { useState, useEffect } from "react";
import PanelPagination from "../Panel/PanelPagination";
import { Link } from "react-router-dom";
import { HiOutlineShoppingCart, HiFolderAdd } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { basketAction } from "../../features/Root/RootSlice";
import { setItem, getItem } from "../../core/services/LocalStorage";
import { toast } from "react-toastify";
import { CourseListCheck } from "../../core/Utils/CourseListCheck";
import http from "../../core/services/Interceptor";

export default function AllCourses() {
  const localStore = localStorage.getItem("persist:root");
  const [isBasket, setIsBasket] = useState(
    localStore
      ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).basketList)
      : []
  );
  //Read Files
  const [files, setFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();
  const handleBuy = (data) => {
    if (getItem("b" + data._id) === false) {
      setItem("b" + data._id, data._id);
      const newList = [...isBasket, { id: data._id, data: data }];
      setIsBasket(newList);
      toast.success("به سبد خرید اضافه شد");
    } else {
      toast.warn("قبلا به سبد خرید اضافه شده است");
    }
  };
  dispatch(basketAction(isBasket));

  const pageSize = 10;
  const StartCourse = Number(currentPage) * Number(pageSize);
  const EndCourse = Number(currentPage) * Number(pageSize) + Number(pageSize);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await http.get(
        "/course/list?pagenumber=" + (currentPage + 1) + "&pagesize=" + pageSize
      );
      setFiles(result.data.result.courses);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-6 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          {files.length !== 0 ? (
            <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-background-600">
                  <tr>
                    <th
                      scope="col"
                      className="px-2 py-3 indent-3 text-right text-xs font-medium text-toz tracking-wider"
                    >
                      نام دوره
                    </th>

                    <th
                      scope="col"
                      className="hidden md:flex px-6 py-3 text-right text-xs font-medium text-toz tracking-wider "
                    >
                      مدرس
                    </th>

                    <th className="w-0"></th>

                    <th
                      scope="col"
                      className="hidden sm:flex px-6 py-3 text-right text-xs font-medium text-toz tracking-wider"
                    >
                      وضعیت
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-toz tracking-wider "
                    >
                      قیمت
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-toz tracking-wider lg:block hidden"
                    >
                      ظرفیت
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-600 tracking-wider "
                    >
                      سفارش
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-background-550 divide-y divide-gray-200">
                  {files.slice(StartCourse, EndCourse).map((course, index) => (
                    <tr key={index}>
                      <td className="px-2 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="hidden lg:flex flex-shrink-0 h-10 w-10 mr-2">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={course.lesson.image}
                              alt=""
                            />
                          </div>
                          <div className="lg:mr-4 group">
                            <Link
                              to={/Course/ + course._id}
                              className=" text-base font-base text-textHead-900 relative cursor-pointer"
                            >
                              {course.title.length > 23
                                ? course.title.slice(0, 23) + "..."
                                : course.title}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:flex px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-textHead-900">
                          {course.teacher.fullName}
                        </div>
                      </td>
                      <td className="w-0"></td>
                      <td className="hidden sm:flex px-6 py-4 whitespace-nowrap">
                        <span
                          className={
                            (true
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800") +
                            " px-2 text-xs w-fit leading-5 font-semibold rounded-full"
                          }
                        >
                          {true ? "درحال برگزاری" : "به پایان رسیده"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-toz">
                        {course.cost.toLocaleString()} تومان
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap mt-3 text-sm text-toz lg:block hidden">
                        {course.capacity} نفر
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className={
                            CourseListCheck(course._id) === false
                              ? "text-toz"
                              : "text-toz opacity-50 cursor-not-allowed"
                          }
                          onClick={
                            CourseListCheck(course._id) === false
                              ? () => handleBuy(course)
                              : null
                          }
                        >
                          <HiOutlineShoppingCart className="h-6 w-6" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Link
              to="/Course"
              type="button"
              className="relative block w-full border-2 my-10 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none"
            >
              <HiFolderAdd className="mx-auto h-12 w-12 text-gray-400" />
              <span className="mt-2 block text-sm font-medium text-textHead-900">
                اضافه کردن دوره جدید
              </span>
            </Link>
          )}
          <PanelPagination
            totalPageSize={files.length}
            pageSize={pageSize}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}
