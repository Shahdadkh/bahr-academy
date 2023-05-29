import { Link } from "react-router-dom";
import { HiX, HiFolderAdd, HiOutlineShoppingCart } from "react-icons/hi";
import Pagination from "./PanelPagination";
import { useState } from "react";
import { likeAction, basketAction } from "../../features/Root/RootSlice";
import { useDispatch } from "react-redux";
import { removeItem, setItem, getItem } from "../../core/services/LocalStorage";
import { toast } from "react-toastify";
import DeleteModal from "../Others/DeleteModal";
import { CourseListCheck } from "../../core/Utils/CourseListCheck";

export default function PanelFavourite() {
  const localStore = localStorage.getItem("persist:root");
  const [files, setFiles] = useState(
    localStore
      ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).likeList)
      : []
  );
  const [isBasket, setIsBasket] = useState(
    localStore
      ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).basketList)
      : []
  );
  const [currentPage, setCurrentPage] = useState(0);
  //Modal
  const [showModal, setShowModal] = useState(false);
  const [showPost, setShowPost] = useState(null);

  const handleChange = (value, idnum) => {
    setShowModal(value);
    setShowPost(idnum);
  };

  const dispatch = useDispatch();
  const handleDelete = (value) => {
    if (value === true) {
      const newList = files.filter((item) => item.data._id !== showPost);
      dispatch(likeAction(newList));
      removeItem(showPost);
      setFiles(newList);
      toast.success("با موفقیت حذف شد");
    }
  };

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

  const pageSize = 8;
  const StartCourse = Number(currentPage) * Number(pageSize);
  const EndCourse = Number(currentPage) * Number(pageSize) + Number(pageSize);

  return (
    <div className="p-5">
      {files.length !== 0 ? (
        <div className="pb-4 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
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
      {files.length === 0 ? (
        <Link
          to="/Course"
          type="button"
          className="relative block w-full border-2 my-10 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none"
        >
          <HiFolderAdd className="mx-auto h-12 w-12 text-toz" />
          <span className="mt-2 block text-sm font-medium text-textHead-900">
            اضافه کردن دوره جدید به علاقمندی‌ها
          </span>
        </Link>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 mt-3 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {files.slice(StartCourse, EndCourse).map((file, index) => (
            <li
              key={index}
              className="relative shadow-md rounded-md overflow-hidden bg-background-700"
            >
              <div className="group block w-full h-56 p-1 aspect-w-10 aspect-h-7 bg-background-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-button-500 overflow-hidden">
                <img
                  src={file.data.lesson.image}
                  alt=""
                  className="object-contain w-full h-full pointer-events-none group-hover:opacity-75"
                />
                <button
                  type="button"
                  className="absolute p-1 top-0 text-gray-400 hover:text-toz"
                  onClick={() => handleChange(true, file.data._id)}
                >
                  <HiX className="h-5 w-5 text-toz" aria-hidden="true" />
                </button>
              </div>
              <Link to={/Course/ + file.data._id}>
                <p className="mt-2 block text-sm font-medium text-textHead-900 truncate pointer-events-none px-3">
                  {file.data.title}
                </p>
              </Link>
              <p className="block text-sm font-medium text-toz pointer-events-none p-3">
                {file.data.teacher.fullName}
              </p>
              <button
                type="button"
                className={
                  CourseListCheck(file.data._id) === false
                    ? "absolute p-3 bottom-0 left-0 text-toz hover:text-toz"
                    : "absolute p-3 bottom-0 left-0 text-toz hover:text-toz opacity-50 cursor-not-allowed"
                }
                onClick={
                  CourseListCheck(file.data._id) === false
                    ? () => handleBuy(file.data)
                    : null
                }
              >
                <HiOutlineShoppingCart
                  className="h-5 w-5 text-toz"
                  aria-hidden="true"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
      <Pagination
        totalPageSize={files.length}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <DeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        getFiles={() => handleDelete(true)}
        title="درخواست حذف علاقمندی"
        Question="آیا از حذف علاقمندی انتخابی خود مطمئن هستید؟"
        submitButton="حذف علاقمندی"
      />
    </div>
  );
}
