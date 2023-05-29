import { Disclosure } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { PanelProfileEditValidation } from "../../core/validations/Validations";
import "../../components/common/DatePicker.css";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import { useState } from "react";
import { CustomeDropzone } from "./PanelDropZone";
import { Link } from "react-router-dom";
import { getItem, setItem } from "../../core/services/LocalStorage";
import http from "../../core/services/Interceptor";
import { toast } from "react-toastify";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PanelProfileEdit() {
  const MAIN_URL = process.env.REACT_APP_PUBLIC_PATH;
  const [selectedDay, setSelectedDay] = useState(null);
  const [files, setFiles] = useState([]);
  const user = JSON.parse(getItem("user"));

  const handleChangeDate = (date) => {
    const changeDate = date;
    const year = changeDate.year;
    const month = changeDate.month;
    const day = changeDate.day;
    return year + "/" + month + "/" + day;
  };

  const handleEdit = async (value, images) => {
    //Edit Profile
    try {
      const newList = {
        fullName: value.fullName,
        email: value.email,
        phoneNumber: value.phoneNumber,
        birthDate:
          selectedDay === null
            ? value.birthDate
            : handleChangeDate(selectedDay),
        nationalId: value.nationalId,
        profile: files.length === 0 ? value.profile : images,
      };
      const result = await http.put("/student/" + user._id, newList);
      toast.success(result.data.message[0].message);
      if (result.status === 200) {
        const list = {
          ...user,
          ...newList,
        };
        setItem("user", JSON.stringify(list));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (value) => {
    //Upload Image
    if (files.length !== 0) {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("x-auth-token", getItem("token"));

      const formdata = new FormData();
      formdata.append("image", files);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      try {
        fetch(MAIN_URL + "/upload/image", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.success === true) {
              handleEdit(value, result.result);
            }
          })
          .catch((error) => toast.error("خطایی رخ داده است.", error));
      } catch (error) {
        toast.error(error);
      }
    } else {
      handleEdit(value);
    }
  };

  return (
    <div>
      <Disclosure
        as="div"
        className="relative bg-button-700 pb-32 overflow-hidden"
      >
        {({ open }) => (
          <>
            <div
              aria-hidden="true"
              className={classNames(
                open ? "bottom-0" : "inset-y-0",
                "absolute inset-x-0 left-1/2 transform -translate-x-1/2 w-full overflow-hidden lg:inset-y-0"
              )}
            >
              <div className="absolute inset-0 flex">
                <div
                  className="h-full w-1/2"
                  style={{ backgroundColor: "#0a527b" }}
                />
                <div
                  className="h-full w-1/2"
                  style={{ backgroundColor: "#065d8c" }}
                />
              </div>
              <div className="relative flex justify-center">
                <svg
                  className="flex-shrink-0"
                  width={1750}
                  height={308}
                  viewBox="0 0 1750 308"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M284.161 308H1465.84L875.001 182.413 284.161 308z"
                    fill="#0369a1"
                  />
                  <path
                    d="M1465.84 308L16.816 0H1750v308h-284.16z"
                    fill="#065d8c"
                  />
                  <path
                    d="M1733.19 0L284.161 308H0V0h1733.19z"
                    fill="#0a527b"
                  />
                  <path
                    d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z"
                    fill="#0a4f76"
                  />
                </svg>
              </div>
            </div>
          </>
        )}
      </Disclosure>

      <main className="relative -mt-32">
        <div className="bg-background-700 overflow-hidden">
          <div className="divide-y divide-gray-200 lg:grid lg:divide-y-0 lg:divide-x">
            {/* Start */}
            <Formik
              initialValues={{
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                birthDate: user.birthDate,
                nationalId: user.nationalId,
                profile: user.profile,
              }}
              validationSchema={PanelProfileEditValidation}
              onSubmit={handleSubmit}
            >
              <Form className="divide-y divide-gray-200 lg:col-span-9">
                <div className="py-6 px-4 sm:p-6 lg:pb-8">
                  <div>
                    <h2 className="text-lg leading-6 font-bold text-textHead-900">
                      ویرایش پروفایل
                    </h2>
                  </div>

                  <div className="mt-6 flex flex-col lg:flex-row">
                    <div className="mt-6 flex-grow mx-auto lg:flex-grow-0 ">
                      <div className="mt-1 lg:hidden"></div>
                      <div className="flex-row-reverse flex md:gap-x-8">
                        <CustomeDropzone getPicture={(e) => setFiles(e)} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-12 gap-6">
                    <div className="col-span-12 sm:col-span-6">
                      <label className="block text-sm font-medium text-toz">
                        نام کامل
                      </label>
                      <Field
                        type="text"
                        name="fullName"
                        className="py-3 px-4 block w-full shadow-sm bg-background-500 text-toz border-2 focus:ring-button-500 focus:border-button-500 border-gray-300 rounded-md"
                      />
                      <ErrorMessage name="fullName" />
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                      <label className="block text-sm font-medium text-toz">
                        ایمیل
                      </label>
                      <Field
                        type="email"
                        name="email"
                        className="py-3 px-4 block w-full shadow-sm bg-background-500 text-toz border-2 focus:ring-button-500 focus:border-button-500 border-gray-300 rounded-md"
                      />
                      <ErrorMessage name="email" />
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                      <label className="block text-sm font-medium text-toz">
                        شماره موبایل
                      </label>
                      <Field
                        type="text"
                        name="phoneNumber"
                        maxLength="11"
                        className="py-3 px-4 block w-full shadow-sm bg-background-500 text-toz border-2 focus:ring-button-500 focus:border-button-500 border-gray-300 rounded-md"
                      />
                      <ErrorMessage name="phoneNumber" />
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-toz"
                      >
                        کد ملی
                      </label>
                      <Field
                        type="text"
                        name="nationalId"
                        maxLength="10"
                        className="py-3 px-4 block w-full shadow-sm bg-background-500 text-toz border-2 focus:ring-button-500 focus:border-button-500 border-gray-300 rounded-md"
                      />
                      <ErrorMessage name="nationalId" />
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-toz"
                      >
                        تاریخ تولد
                      </label>
                      <DatePicker
                        value={selectedDay}
                        onChange={setSelectedDay}
                        required
                        inputPlaceholder={user.birthDate}
                        inputClassName="py-3 px-4 block w-full shadow-sm bg-background-500 text-toz border-2 focus:ring-button-500 focus:border-button-500 border-gray-300 rounded-md"
                        shouldHighlightWeekends
                        locale="fa"
                      />
                    </div>

                    {/* <div className="col-span-12 sm:col-span-6">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-toz"
                      >
                        آدرس
                      </label>
                      <Field
                        type="text"
                        name="Address"
                        className="py-3 px-4 block w-full shadow-sm bg-background-500 text-toz border-2 focus:ring-button-500 focus:border-button-500 border-gray-300 rounded-md"
                      />
                    </div> */}
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  <div className="py-4 px-4 flex justify-end sm:px-6">
                    <Link
                      type="button"
                      to="/"
                      className="ml-2 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    >
                      انصراف
                    </Link>
                    <button
                      type="submit"
                      className="ml-5 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none"
                    >
                      اعمال تغییرات
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
            {/* End */}
          </div>
        </div>
      </main>
    </div>
  );
}
