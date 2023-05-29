import React, { useState, useEffect } from "react";
import { handleDate } from "../../core/Utils/handleDate";
import CourseModal from "../Course/CourseModal";
import { motion } from "framer-motion";
import { sampleAnimation } from "../../core/Utils/AnimEffect";
import ContainerComponent from "../common/ContainerComponent/ContainerComponent";
import { GetAllCoursesAPI } from "../../core/services/GetAllCoursesAPI";
import LandingCourseSkeleton from "./Loader/LandingCourseSkeleton";

const LandingCourse = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPost, setShowPost] = useState(null);
  const [IsLoad, setIsLoad] = useState(true);
  const [courses, setCourseData] = useState([]);

  useEffect(() => {
    GetAllCoursesAPI(setIsLoad, setCourseData);
  }, []);

  const handleChange = (value, post) => {
    setShowModal(value);
    setShowPost(post);
  };

  return (
    <div className="relative py-20">
      <ContainerComponent>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-textHead-900 sm:text-4xl">
              دوره‌ها
            </h2>
          </div>
          <div className="mt-12 mx-10 sm:mx-20 lg:mx-0  grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {IsLoad ? (
              <LandingCourseSkeleton cards={4} />
            ) : (
              courses.slice(0, 4).map((post, index) => (
                <motion.div
                  onClick={() => handleChange(true, post._id)}
                  key={index}
                  className="flex flex-col rounded-lg shadow-lg overflow-hidden cursor-pointer"
                  variants={sampleAnimation}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex-shrink-0 p-2 bg-background-500">
                    <img
                      className="h-60 w-full object-contain"
                      src={post.lesson.image}
                      alt=""
                    />
                  </div>
                  <div className="flex-1 bg-background-700 p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-textHover-600"></p>
                      <div
                        onClick={() => handleChange(true, post._id)}
                        className="block mt-2"
                      >
                        <p className="text-xl font-semibold text-textHead-900">
                          {post.title.length > 23
                            ? post.title.slice(0, 23) + "..."
                            : post.title}
                        </p>
                        <p className="mt-3 text-base text-toz">
                          {post.lesson.description.slice(0, 150) + " ..."}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <span className="sr-only">{post.teacher.fullName}</span>
                        <img
                          className="h-10 w-10 rounded-full"
                          src={post.teacher.profile}
                          alt=""
                        />
                      </div>
                      <div className="ml-3 mr-3">
                        <p className="text-sm font-medium text-textHead-900">
                          {post.teacher.fullName}
                        </p>
                        <div className="flex space-x-1 text-sm text-toz">
                          <time dateTime="/">
                            {handleDate(post.startDate.slice(0, 10))}
                          </time>
                          <span aria-hidden="true">،</span>
                          <span>
                            {post.capacity + post.students.length} نفر
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
            <CourseModal
              showModal={showModal}
              setShowModal={setShowModal}
              showPost={showPost}
            />
          </div>
        </div>
      </ContainerComponent>
    </div>
  );
};
export default LandingCourse;
