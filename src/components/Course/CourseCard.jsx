import React, { useState, useEffect } from "react";
import { sampleAnimation } from "../../core/Utils/AnimEffect";
import CourseSort from "./CourseSort";
import CoursePageSize from "./CoursePageSize";
import CoursePagination from "./CoursePagination";
import http from "../../core/services/Interceptor";

import CourseModal from "./CourseModal";
import { motion } from "framer-motion";
import { HiHeart, HiOutlineHeart, HiBadgeCheck } from "react-icons/hi";
import { getItem, removeItem, setItem } from "../../core/services/LocalStorage";
import { useDispatch } from "react-redux";

import { likeAction } from "../../features/Root/RootSlice";
import { toast } from "react-toastify";
import { CourseListCheck } from "../../core/Utils/CourseListCheck";
import ContainerComponent from "./../common/ContainerComponent/ContainerComponent";
import { CourseCardSkeleton } from "./Loader/CourseCardSkeleton";

export default function CourseCard() {
  //Read Files
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //Course Modal
  const [showModal, setShowModal] = useState(false);
  const [showPost, setShowPost] = useState(null);
  //Pagination
  const [pageSize, setPageSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(0);
  //Heart
  const localStore = localStorage.getItem("persist:root");
  const [isHeart, setIsHeart] = useState(
    localStore
      ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).likeList)
      : []
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setIsLoading(true);
      const result = await http.get("/course/getall");
      setFiles(result.data.result);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  };

  const handleChange = (value, post) => {
    setShowModal(value);
    setShowPost(post);
  };

  const StartCourse = Number(currentPage) * Number(pageSize);
  const EndCourse = Number(currentPage) * Number(pageSize) + Number(pageSize);

  const dispatch = useDispatch();
  const handleHeart = (data) => {
    if (getItem(data._id) === false) {
      toast.success("به لیست مورد علاقه ها اضافه شد");
      setItem(data._id, data._id);
      const newList = [...isHeart, { id: data._id, data: data }];
      setIsHeart(newList);
    } else {
      removeItem(data._id);
      toast.warn("از لیست مورد علاقه ها حذف شد");
      const newList = isHeart.filter((item) => item.id !== data._id);
      setIsHeart(newList);
    }
  };
  dispatch(likeAction(isHeart));

  return (
    <>
      {files.length !== 0 ? (
        <ContainerComponent>
          <CourseSort
            files={files}
            setFiles={setFiles}
            setCurrentPage={setCurrentPage}
          />
          <CoursePageSize
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
          />
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 py-6 mt-2">
            {isLoading ? (
              <CourseCardSkeleton cards={8} />
            ) : (
              files.slice(StartCourse, EndCourse).map((file, index) => (
                <motion.div
                  key={index}
                  variants={sampleAnimation}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.05 }}
                >
                  <li
                    onClick={() => handleChange(true, file._id)}
                    key={index}
                    className="bg-background-700 rounded-t-md overflow-hidden cursor-pointer"
                  >
                    <div className="group block w-full h-56 p-1 aspect-w-10 aspect-h-7 bg-background-550 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-button-500 overflow-hidden">
                      <img
                        src={file.lesson.image}
                        alt=""
                        className="object-contain w-full h-full pointer-events-none group-hover:opacity-75"
                      />
                    </div>
                    <p className="mt-2 block text-sm font-medium text-textHead-900 truncate pointer-events-none px-3">
                      {file.title}
                    </p>
                    <p className="block text-sm font-medium text-toz pointer-events-none px-3 pb-3">
                      {file.teacher.fullName}
                    </p>
                  </li>
                  {CourseListCheck(file._id) === true ? (
                    <HiBadgeCheck className="absolute top-2 right-3 text-green-400 text-lg sm:text-5xl mt-1 inline-block" />
                  ) : null}
                  <div className="border-t px-3 pb-3 shadow-md bg-background-700 rounded-b-md">
                    {getItem("token") !== false ? (
                      <button onClick={() => handleHeart(file)}>
                        {getItem(file._id) !== false ? (
                          <HiHeart className="text-red-500 text-lg sm:text-2xl mt-1 inline-block " />
                        ) : (
                          <HiOutlineHeart className="text-gray-400 text-lg sm:text-2xl mt-1 inline-block" />
                        )}
                      </button>
                    ) : (
                      <HiOutlineHeart
                        onClick={() =>
                          toast.warn("لطفا وارد حساب کاربری خود شوید")
                        }
                        className="text-gray-400 text-lg sm:text-2xl mt-1 inline-block"
                      />
                    )}

                    <div className="float-left pt-1 text-sm text-textHead-900 sm:text-base">
                      {file.cost.toLocaleString()} تومان
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </ul>
          <CourseModal
            showModal={showModal}
            setShowModal={setShowModal}
            showPost={showPost}
          />
          <CoursePagination
            totalPageSize={files.length}
            pageSize={pageSize}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </ContainerComponent>
      ) : null}
    </>
  );
}
