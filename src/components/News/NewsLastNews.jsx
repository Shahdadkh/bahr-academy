import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { handleTitle, handleTime } from "../../core/Utils/handleSplitText";
import { NewLastNewsSkeleton } from "./Loader/NewLastNewsSkeleton";
import ContainerComponent from "../common/ContainerComponent/ContainerComponent";
import { motion } from "framer-motion";
import { NewsMotion } from "../../core/Utils/AnimEffect";
import http from "../../core/services/Interceptor";

export default function NewsLastNews() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setIsLoading(true);
      const result = await http.get("/news/topNews");
      setData(result.data.result);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  };

  return (
    <div className="bg-background-800 pt-16 pb-20  sm:px-6 lg:pt-12 lg:pb-18 lg:px-8 mt-2">
      <div className="relative  divide-y-2 divide-gray-200 ">
        <ContainerComponent>
          <div className="">
            <h2 className="text-3xl tracking-tight font-extrabold text-textHead-900 sm:text-4xl">
              آخرین خبر
            </h2>
          </div>
          <div className="mt-6 pt-10 grid gap-5 lg:grid-cols-2 border-t-2">
            {isLoading ? (
              <NewLastNewsSkeleton cards={6} />
            ) : (
              data.map((post, index) => (
                <Link key={index} to={/news/ + post._id}>
                  <motion.div
                    variants={NewsMotion}
                    whileHover="hover"
                    animate="visible"
                    initial="hidden"
                    className="flex h-56 sm:h-48 p-3 bg-background-700 shadow-md rounded-md"
                  >
                    <div className=" relative m-1 w-2/3 ">
                      <img
                        className="absolute h-full w-full rounded-md"
                        alt="#"
                        src={post.image}
                      />
                    </div>
                    <div className="mr-4 relative">
                      <div className="flex">
                        <p className="text-lg w-3/4 font-semibold text-textHead-900">
                          {handleTitle(post.title)}
                        </p>
                        <div className="w-1/5 absolute left-0">
                          <span className="bg-indigo-100 text-textHover-800 bg-grey-700 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <p className="mt-3 text-base text-toz">
                        {post.text.slice(0, 100) + "..."}
                      </p>
                      <div className="absolute bottom-2 flex space-x-1 text-sm text-toz indent-1 mt-2">
                        <time dateTime="/">{handleTime(post.title)}</time>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))
            )}
          </div>
        </ContainerComponent>
      </div>
    </div>
  );
}
