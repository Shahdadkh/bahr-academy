import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import http from "../../core/services/Interceptor";
import CourseDetailBreadCrumb from "./CourseDetailBreadCrumb";
import CourseDetailLeftPrice from "./CourseDetailLeftPrice";
import CourseDetailImage from "./CourseDetailImage";
import CourseDetailCourses from "./CourseDetailCourses";
import CourseDetailSkeleton from "./CourseDetailSkeleton";

export default function CourseDetailPricing() {
  const param = useParams();
  const [courseData, setCourseData] = useState([]);
  const [IsLoad, setIsLoad] = useState(true);

  const getData = async () => {
    try {
      setIsLoad(true);
      const result = await http.get("/course/" + param.id);
      setIsLoad(false);
      setCourseData(result.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {IsLoad ? (
        <CourseDetailSkeleton cards={1} />
      ) : courseData.length !== 0 ? (
        <div className="mt-8 bg-background-800 pb-5 sm:mt-12">
          <div className="relative">
            <div className="absolute inset-0 h-1/2" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
                <div className="flex-1 bg-background-700 px-6 py-6">
                  <CourseDetailBreadCrumb courseData={courseData} />
                  <h3 className="text-2xl font-extrabold text-textHead-900 sm:text-3xl mt-5">
                    {courseData.title}
                  </h3>
                  <p className="mt-6 text-base text-toz">
                    {courseData.lesson.description}
                  </p>
                  <div className="mt-8">
                    <div className="flex items-center">
                      <h4 className="flex-shrink-0 pr-4  text-sm tracking-wider font-semibold uppercase text-textHover-600">
                        این دوره شامل چه سرفصل‌هایی می‌شود:
                      </h4>
                      <div className="flex-1 border-t-2 border-gray-300" />
                    </div>
                  </div>

                  {/* start */}
                  <CourseDetailCourses courseData={courseData} />
                  {/* end */}
                </div>
                {/* start */}
                <div className="text-center bg-background-700 lg:flex-shrink-0 lg:flex lg:flex-col">
                  <CourseDetailImage courseData={courseData} />
                  <CourseDetailLeftPrice courseData={courseData} />
                </div>
                {/* end */}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
