import { useState } from "react";
import PanelPagination from "../Panel/PanelPagination";
import { Link } from "react-router-dom";
import { HiFolderAdd } from "react-icons/hi";
import { HiTrash } from "react-icons/hi";
import DeleteModal from "../Others/DeleteModal";
import { useDispatch } from "react-redux";
import { courseAction, paymentAction } from "../../features/Root/RootSlice";
import { toast } from "react-toastify";

export default function PanelList() {
  const localStore = localStorage.getItem("persist:root");
  const [files, setFiles] = useState(
    localStore
      ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).courseList)
      : []
  );
  const [walet, setWalet] = useState(
    localStore
      ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).payList)
      : []
  );
  const [currentPage, setCurrentPage] = useState(0);
  //Course Modal
  const [showModal, setShowModal] = useState(false);
  const [showPost, setShowPost] = useState(null);

  const handleChange = (value, idnum) => {
    setShowModal(value);
    setShowPost(idnum);
  };
  const today = new Date();

  const dispatch = useDispatch();
  const handleDelete = (value) => {
    if (value === true) {
      const newList = files.filter((item) => item.id !== showPost);
      const whoList = files.filter((item) => item.id === showPost);
      dispatch(courseAction(newList));
      setFiles(newList);
      const cancelList = [
        ...walet,
        {
          id: walet.length !== 0 ? walet[walet.length - 1].id + 1 : 1,
          code: (Math.random() + 1).toString(36).substring(2, 7).toUpperCase(),
          date: new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
            dateStyle: "short",
          }).format(today),
          detail: `لغو ${whoList[0].data.title}`,
          amount: whoList[0].data.cost * 0.8,
          invent:
            (walet.length !== 0 ? Number(walet[walet.length - 1].invent) : 0) +
            Number(whoList[0].data.cost) * 0.8,
        },
      ];
      setWalet(cancelList);
      toast.success("دوره با موفقیت حذف شد");
    }
  };
  dispatch(paymentAction(walet));

  const pageSize = 5;
  const StartCourse = Number(currentPage) * Number(pageSize);
  const EndCourse = Number(currentPage) * Number(pageSize) + Number(pageSize);

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          {files.length !== 0 ? (
            <div className="py-4 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {/* Job Postings */}
              </h3>
              <div className="mt-3 sm:mt-0 sm:ml-4">
                <Link
                  to="/Course"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                >
                  صفحه دوره‌ها
                </Link>
              </div>
            </div>
          ) : null}
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
                      تغییرات
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
                              src={course.data.lesson.image}
                              alt=""
                            />
                          </div>
                          <div className="lg:mr-4 group">
                            <Link
                              to={/Course/ + course.data._id}
                              className=" text-base font-base text-textHead-900 relative cursor-pointer"
                            >
                              {course.data.title.length > 23
                                ? course.data.title.slice(0, 23) + "..."
                                : course.data.title}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:flex px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-textHead-900">
                          {course.data.teacher.fullName}
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
                        {course.data.cost.toLocaleString()} تومان
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap mt-3 text-sm text-toz lg:block hidden">
                        {course.data.capacity} نفر
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleChange(true, course.data._id)}
                          className="text-red-400 hover:text-red-900"
                        >
                          <HiTrash className="h-6 w-6" />
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
          <DeleteModal
            showModal={showModal}
            setShowModal={setShowModal}
            getFiles={() => handleDelete(true)}
            title="درخواست لغو دوره"
            Question="بعد از فشردن دکمه‌ی لغو فقط 80% درصد پول به حساب شما بازگردانده خواهد شد. آیا از لغو دوره انتخابی خود مطمئن هستید؟"
            submitButton="لغو دوره"
          />
        </div>
      </div>
    </div>
  );
}
