import React, { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiHome, HiEye, HiEyeOff } from "react-icons/hi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SignUpValidation } from "../../core/validations/Validations";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import "../../components/common/DatePicker.css";

import LeftPic from "../../assets/images/login-images/signUp.jpg";
import proImage from "../../assets/images/NoImage.png";
import { InputRightMotion, InputLeftMotion } from "../../core/Utils/AnimEffect";
import http from "../../core/services/Interceptor";
import { PasswordChecker } from "./../common/PasswordChecker";

const plans = [
  {
    name: "دانشجو",
  },
  {
    name: "کارمند",
  },
];

export default function SignUpForm() {
  const [selectedDay, setSelectedDay] = useState(null);

  const [showHidePassword, setShowHidePassword] = useState(false);
  const [activeShowIndex, setActiveShowIndex] = useState(0);

  const [password, setPassword] = useState("");

  const [selected, setSelected] = useState(0);

  const handleChangeDate = (date) => {
    const changeDate = date;
    const year = changeDate.year;
    const month = changeDate.month;
    const day = changeDate.day;
    return year + "/" + month + "/" + day;
  };

  const handleSubmit = async (value) => {
    console.log(value);
    if (selected === 0) {
      const data = {
        ...value,
        birthDate: handleChangeDate(selectedDay),
        profile: proImage,
      };
      console.log(data);
      try {
        const result = await http.post("/auth/register", data);
        console.log(result);
        toast.success(result.data.message[0].message);
      } catch (error) {
        toast.error("ایمیل یا کدملی تکراری است.");
      }
    } else if (selected === 1) {
      const data = {
        ...value,
        birthDate: handleChangeDate(selectedDay),
        profile: proImage,
        address: "ساری، بلوار خزر",
        role: "teacher",
      };
      try {
        const result = await http.post("/auth/employee/register", data);
        toast.success(result.data.message[0].message);
      } catch (error) {
        toast.error("ایمیل یا کدملی تکراری است.");
      }
    }
  };

  const handleDate = (value) => {
    setSelectedDay(value);
  };

  return (
    <div className="min-h-full flex border rounded-3xl sm:w-4/5 mx-auto bg-background-750 overflow-x-hidden">
      <div className="flex-1 flex flex-col justify-center py-10 px-4  sm:px-6 lg:flex-none lg:px-14 w-1/2">
        <div className="text-sm text-toz w-full">
          <Link to="/" className="w-fit flex text-right">
            <HiHome className=" ml-1 h-5 w-5" />
            <span>خانه</span>
          </Link>
        </div>
        <div className="mx-auto w-full">
          <div className="mt-2">
            <div className="bg-background-750">
              <div className="relative max-w-xl mx-auto ">
                <div className="text-center">
                  <h2 className="text-xl sm:text-2xl  md:text-3xl lg:text-xl xl:text-3xl font-extrabold tracking-tight text-textHead-900 ">
                    ساخت حساب کاربری جدید
                  </h2>
                </div>
                <div className="w-2/3 p-4 mx-auto">
                  <div className="mx-auto w-full max-w-md">
                    <RadioGroup value={selected} onChange={setSelected}>
                      <RadioGroup.Label className="text-textHead-800">
                        نوع عضویت:
                      </RadioGroup.Label>
                      <div className="mt-2 grid sm:grid-cols-2 gap-2">
                        {plans.map((plan, index) => (
                          <RadioGroup.Option
                            key={plan.name}
                            value={index}
                            className={({ active, checked }) =>
                              `${
                                active
                                  ? "ring-2 ring-white ring-opacity-60 ring-offset-2 "
                                  : ""
                              }
                  ${
                    checked
                      ? "bg-button-900 bg-opacity-75 text-white"
                      : "bg-background-600"
                  }
                    relative flex cursor-pointer border-2 rounded-lg px-5 py-4 focus:outline-none`
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <div className="flex w-full h-5 items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="text-sm">
                                      <RadioGroup.Label
                                        as="p"
                                        className={`font-medium  ${
                                          checked
                                            ? "text-white"
                                            : "text-textHead-900"
                                        }`}
                                      >
                                        {plan.name}
                                      </RadioGroup.Label>
                                    </div>
                                  </div>
                                  {checked && (
                                    <div className="shrink-0 text-white">
                                      <CheckIcon className="h-6 w-6" />
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="mt-2">
                  <Formik
                    initialValues={{
                      fullName: "",
                      email: "",
                      password: "",
                      phoneNumber: "",
                      nationalId: "",
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={SignUpValidation}
                  >
                    {({ validateForm, setFieldValue }) => (
                      <Form className="mx-0 md:mx-10 gap-y-6 sm:gap-x-8 ">
                        <div
                          className={
                            activeShowIndex === 0
                              ? "visible"
                              : "hidden invisible"
                          }
                        >
                          <motion.div
                            variants={InputRightMotion}
                            animate="visible"
                            initial="hidden"
                            className="w-full h-28"
                          >
                            <label
                              htmlFor="user-name"
                              className="block text-sm font-medium text-toz mr-1"
                            >
                              نام کامل
                            </label>
                            <div className="mt-1 mr-1">
                              <Field
                                type="text"
                                name="fullName"
                                className="py-3 px-4 block w-full shadow-sm bg-background-500 text-toz border-2 focus:ring-button-500 focus:border-button-500 border-gray-300 rounded-md"
                              />
                              <ErrorMessage
                                component="span"
                                className="text-sm text-red-500"
                                name="fullName"
                              />
                            </div>
                          </motion.div>
                          <motion.div
                            variants={InputLeftMotion}
                            animate="visible"
                            initial="hidden"
                            className="h-32"
                          >
                            <label className="block  text-sm font-medium text-toz mr-1">
                              رمز عبور
                            </label>
                            <div className="mt-1 mr-1 relative">
                              <Field
                                type={showHidePassword ? "text" : "password"}
                                name="password"
                                onChange={(e) => {
                                  setFieldValue("password", e.target.value);
                                  setPassword(e.target.value);
                                }}
                                className="py-3 px-4 text-left block w-full shadow-sm bg-background-500 text-toz border-2 focus:ring-button-500 focus:border-button-500 border-gray-300 rounded-md"
                              />
                              <i
                                className="text-xl text-toz cursor-pointer absolute right-3 top-4"
                                onClick={() =>
                                  setShowHidePassword(!showHidePassword)
                                }
                              >
                                {!showHidePassword ? <HiEye /> : <HiEyeOff />}
                              </i>
                              <ErrorMessage
                                component="span"
                                className="text-xs text-red-500"
                                name="password"
                              />
                              <PasswordChecker password={password} />
                            </div>
                          </motion.div>
                          <motion.div
                            variants={InputRightMotion}
                            animate="visible"
                            initial="hidden"
                            className="h-24"
                          >
                            <label className="block text-sm font-medium text-toz mr-1">
                              ایمیل
                            </label>
                            <div className="mt-1 mr-1">
                              <Field
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="py-3 px-4 text-left block w-full shadow-sm bg-background-500 text-toz border-2 focus:ring-button-500 focus:border-button-500 border-gray-300 rounded-md"
                              />
                              <ErrorMessage
                                component="span"
                                className="text-sm text-red-500"
                                name="email"
                              />
                            </div>
                          </motion.div>
                          <div className="sm:col-span-2 mr-1 my-1">
                            <button
                              type="button"
                              onClick={() => {
                                validateForm().then(
                                  (value) =>
                                    !(
                                      value.fullName &&
                                      value.password &&
                                      value.email
                                    )
                                );
                                setActiveShowIndex(1);
                              }}
                              className="w-full  mt-4 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-button-600 hover:bg-button-700 focus:outline-none"
                            >
                              مرحله بعد
                            </button>
                          </div>
                        </div>

                        <div
                          className={
                            activeShowIndex === 1
                              ? "visible"
                              : "hidden invisible"
                          }
                        >
                          <div className="h-28">
                            <label className="block text-sm font-medium text-toz mr-1">
                              شماره موبایل
                            </label>
                            <div className="mt-1 relative rounded-md  ml-1">
                              <Field
                                type="text"
                                name="phoneNumber"
                                maxLength="11"
                                className="py-3 px-4 block w-full shadow-sm bg-background-500 text-toz border-2 focus:ring-button-500 focus:border-button-500 border-gray-300 rounded-md"
                                placeholder=""
                              />
                              <ErrorMessage
                                component="span"
                                className="text-sm text-red-500"
                                name="phoneNumber"
                              />
                            </div>
                          </div>
                          <div className="h-28">
                            <label className="block text-sm font-medium text-toz mt-1 mr-1">
                              کدملی
                            </label>
                            <div className="mt-1 ml-1">
                              <Field
                                type="text"
                                name="nationalId"
                                maxLength="10"
                                className="py-3 px-4 block w-full shadow-sm bg-background-500 text-toz border-2 focus:ring-button-500 focus:border-button-500 border-gray-300 rounded-md"
                              />
                              <ErrorMessage
                                component="span"
                                className="text-sm text-red-500"
                                name="nationalId"
                              />
                            </div>
                          </div>
                          <div className="h-28">
                            <label className="block text-sm font-medium text-toz mt-1 mr-1">
                              تاریخ تولد
                            </label>
                            <div className="mt-1 ml-1">
                              <DatePicker
                                name="birthDate"
                                value={selectedDay}
                                onChange={(e) => handleDate(e)}
                                inputPlaceholder=" "
                                inputClassName="py-3 px-4 block w-full shadow-sm bg-background-500 text-toz border-2 focus:ring-button-500 focus:border-button-500 border-gray-300 rounded-md"
                                shouldHighlightWeekends
                                locale="fa"
                              />
                            </div>
                          </div>
                          <div className="xl:grid xl:grid-cols-2 gap-x-10 my-1">
                            <button
                              onClick={() => {
                                validateForm();
                              }}
                              type="submit"
                              className="w-full mt-4 inline-flex items-center justify-center px-1 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-button-600 hover:bg-button-900 focus:outline-none"
                            >
                              تکمیل ثبت نام
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveShowIndex(0);
                              }}
                              className="w-full mt-4 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-button-500 hover:bg-button-700 focus:outline-none"
                            >
                              مرحله قبل
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute w-full h-full rounded-l-3xl"
          src={LeftPic}
          alt=""
        />
      </div>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
