import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { handleTitle } from "../../core/Utils/handleSplitText";
import ContainerComponent from "../common/ContainerComponent/ContainerComponent";
import ShowMoreData from "./../common/ShowMoreData";
import { PressNewsSkeleton } from "./Loader/PressNewsSkeleton";
import { NewsMotion } from "../../core/Utils/AnimEffect";
import http from "../../core/services/Interceptor";
import { FilterNews } from "./FilterNews";

export default function PressNews() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setIsLoading(true);
      const result = await http.get("/news", {
        // query URL without using browser cache
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      setData(result.data.result);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  };

  return (
    <div className="bg-background-800 pt-16 pb-20 lg:pt-12 lg:pb-18 mt-2">
      <ContainerComponent>
        <div className="divide-y-2 relative divide-gray-200">
          <h2 className="text-3xl  font-extrabold text-textHead-900 sm:text-4xl">
            اخبار و مقالات
          </h2>
          <FilterNews setSelectedNews={setData} />
          <div className="mt-6 pt-10 md:grid gap-5 md:grid-cols-2">
            {isLoading ? (
              <PressNewsSkeleton cards={6} />
            ) : (
              <ShowMoreData
                initialShowCount={6}
                stepCount={6}
                data={data}
                content={(data, index) => (
                  <Link
                    to={/news/ + data._id}
                    key={index}
                    className="mt-2 block"
                  >
                    <motion.div
                      variants={NewsMotion}
                      whileHover="hover"
                      animate="visible"
                      initial="hidden"
                      className="flex md:h-48 lg:h-40 p-3 bg-background-700 shadow-md rounded-md"
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
                )}
              />
            )}
          </div>
        </div>
      </ContainerComponent>
    </div>
  );
}
