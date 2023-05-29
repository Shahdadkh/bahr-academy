import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { handleTitle } from "../../core/Utils/handleSplitText";
import ContainerComponent from "../common/ContainerComponent/ContainerComponent";
import GetAllNewsAPI from "./../../core/services/GetAllNewsAPI";
import { PressNewsSkeleton } from "./../News/Loader/PressNewsSkeleton";
import { motion } from "framer-motion";
import { NewsMotion } from "../../core/Utils/AnimEffect";

const handleSubmit = (value) => {
  alert(JSON.stringify(value));
};
const LandingNews = () => {
  const [data, setData] = useState([]);
  const [IsLoad, setIsLoad] = useState(true);

  useEffect(() => {
    GetAllNewsAPI(setIsLoad, setData);
  }, []);

  return (
    <div className="bg-background-800 pt-16 pb-20 lg:pt-12 lg:pb-18 mt-2">
      <ContainerComponent>
        <div className="divide-y-2 divide-gray-200">
          <h2 className="text-3xl  font-extrabold text-textHead-900 sm:text-4xl">
            اخبار و مقالات
          </h2>
          <div className="mt-6 pt-10 md:grid gap-5 md:grid-cols-2">
            {IsLoad ? (
              <PressNewsSkeleton cards={6} />
            ) : (
              data.slice(0, 6).map((data, index) => (
                <Link to={/news/ + data._id} key={index} className="mt-2 block">
                  <motion.div
                    variants={NewsMotion}
                    whileHover="hover"
                    animate="visible"
                    initial="hidden"
                    className="flex md:h-48 lg:h-40 p-3 bg-background-750 shadow-md rounded-md"
                  >
                    <div className="relative m-1 w-full sm:w-1/2 md:w-full ">
                      <img
                        className="absolute h-full w-full rounded-md"
                        alt="#"
                        src={data.image}
                      />
                    </div>
                    <div className="mr-4">
                      <p className="text-lg lg:text-xl font-semibold text-textHead-900">
                        {handleTitle(data.title)}
                      </p>
                      <p className="mt-3 text-base text-toz">
                        {data.text.slice(0, 75) + "..."}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))
            )}
          </div>
          <div className="mt-10 ">
            <div className="mt-6 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
              <p className="text-xl text-toz">
                با ما از آخرین اخبار و مقالات روز مطلع شوید
              </p>
              {/* Start */}
              <Formik initialValues={{ email: "" }} onSubmit={handleSubmit}>
                <Form className=" flex flex-col sm:flex-row lg:mt-0 lg:justify-end">
                  <Field
                    name="email"
                    type="email"
                    required
                    className="appearance-none sm:w-3/4 bg-background-600 border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-textHead-900 placeholder-toz focus:outline-none focus:ring-button-500 focus:border-button-500 focus:placeholder-gray-400"
                    placeholder="ایمیل "
                  />
                  <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0 mr-2">
                    <button
                      type="submit"
                      className="w-fit mx-auto bg-button-600 flex items-center justify-center border border-transparent rounded-md py-2 px-4 text-base font-medium text-white hover:bg-button-700 focus:ring-2 focus:ring-offset-2 focus:ring-button-500"
                    >
                      با خبرم کن
                    </button>
                  </div>
                </Form>
              </Formik>
              {/* End */}
            </div>
          </div>
        </div>
      </ContainerComponent>
    </div>
  );
};

export default LandingNews;
