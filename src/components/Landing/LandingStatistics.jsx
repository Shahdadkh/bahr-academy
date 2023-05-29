import { GetAllStudentAPI } from "../../core/services/GetAllStudentAPI";
import { GetAllTeacherAPI } from "../../core/services/GetAllTeacherAPI";
import { GetAllCoursesAPI } from "../../core/services/GetAllCoursesAPI";
import { useState } from "react";
import ContainerComponent from "./../common/ContainerComponent/ContainerComponent";

export default function LandingStatistics() {
  const [student] = useState(GetAllStudentAPI);
  const [teacher] = useState(GetAllTeacherAPI);
  const [course] = useState(GetAllCoursesAPI);

  return (
    <div className="bg-button-700 py-5">
      <ContainerComponent>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl font-iran">
              به آموزش ما اعتماد کنید
            </h2>
            <p className="mt-3 text-xl text-textHover-200 sm:mt-4 font-iran">
              دسترسی به باکیفیت ترین دوره های آموزشی آنلاین با تدریس برترین
              اساتید ایران در دسته بندی های گوناگون
            </p>
          </div>
          <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
            <div className="flex flex-col">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-textHover-200 font-iran">
                دانشجو
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white font-iran">
                {student.length}
              </dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-textHover-200 font-iran">
                استاد
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white font-iran">
                {teacher.length}
              </dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-textHover-200 font-iran">
                دوره
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white font-iran">
                {course.catch.length + 2}
              </dd>
            </div>
          </dl>
        </div>
      </ContainerComponent>
    </div>
  );
}
