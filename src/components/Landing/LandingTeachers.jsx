import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { sampleAnimation } from "../../core/Utils/AnimEffect";
import ContainerComponent from "./../common/ContainerComponent/ContainerComponent";
import http from "../../core/services/Interceptor";
import LandingTeachersSkeleton from "./Loader/LandingTeachersSkeleton";
import { GetAllTeacherAPI } from './../../core/services/GetAllTeacherAPI';

export default function LandingTeachers(props) {
  const [people, setPeople] = useState(GetAllTeacherAPI);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   try {
  //     setIsLoading(true);
  //     const result = await http.get("/employee/getlastteachers");
  //     setPeople(result.data.result);
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(true);
  //     console.log(error);
  //   }
  // };

  const numb = props.num === "0" ? people.length : props.num;

  return (
    <div className="bg-background-800">
      <ContainerComponent>
        <div className="py-12 text-center lg:py-12">
          <div className="space-y-12">
            <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-textHead-900">
                اساتید ما
              </h2>
            </div>
            <ul className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-4 lg:max-w-5xl">
              {isLoading ? (
                <LandingTeachersSkeleton cards={8} />
              ) : (
                people.slice(0, numb).map((person, index) => (
                  <motion.li
                    className="cursor-default"
                    key={index}
                    variants={sampleAnimation}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="space-y-6 rounded-xl shadow-md bg-background-700 h-80 pt-2">
                      <img
                        className="mx-auto mt- h-40 w-40 rounded-full xl:w-44 xl:h-44"
                        src={person.image}
                        alt=""
                      />
                      <div className="space-y-2">
                        <div className="text-lg leading-6 text-textHover-600 font-medium space-y-1 ">
                          <h2>{person.name}</h2>
                          <p className="text-textHead-800 text-base">
                            {person.discription}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))
              )}
            </ul>
          </div>
        </div>
      </ContainerComponent>
    </div>
  );
}
