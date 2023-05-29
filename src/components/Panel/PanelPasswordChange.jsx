import { Disclosure } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { PanelPasswordChangeValidation } from "./../../core/validations/Validations";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import http from "../../core/services/Interceptor";
import { toast } from "react-toastify";
import { getItem } from "../../core/services/LocalStorage";
import { PasswordChecker } from "../common/PasswordChecker";
import Spinner from "../common/Spinner/Spinner";

export default function PanelPasswordChange() {
  const [showHidePassword, setShowHidePassword] = useState(false);
  const handleChangeType = () => setShowHidePassword(!showHidePassword);

  const [showHidePassword2, setShowHidePassword2] = useState(false);
  const handleChangeType2 = () => setShowHidePassword2(!showHidePassword2);

  const [showHidePassword3, setShowHidePassword3] = useState(false);
  const handleChangeType3 = () => setShowHidePassword3(!showHidePassword3);

  const [password, setPassword] = useState("");

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [userPassword, setUserPassword] = useState("");
  const [userSalt, setUserSalt] = useState("");
  const [userResetToken, setUserResetToken] = useState("");

  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const user = JSON.parse(getItem("user"));
    try {
      const result = await http.get("/student/" + user._id);
      setUserPassword(result.data.result.password);
      setUserSalt(result.data.result.salt);
      if (result.data.result.resetPasswordToken === null) {
        try {
          const data = {
            email: user.email,
          };
          const result = await http.post("/forgetpassword", data);
          if (result.success === true) {
            try {
              const result = await http.get("/student/" + user._id);
              setUserResetToken(result.data.result.resetPasswordToken);
            } catch (error) {
              console.log(error.message);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      } else {
        setUserResetToken(result.data.result.resetPasswordToken);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = async (value) => {
    setLoading(true);
    const pbkdf2 = require("pbkdf2");
    const salt = userSalt;
    const password = value.Password;
    const hashKey = pbkdf2
      .pbkdf2Sync(password, salt, 100000, 64, "sha512")
      .toString("hex");
    if (hashKey === userPassword) {
      if (value.NewPassword === value.RepeatNewPassword) {
        try {
          const data = {
            password: value.NewPassword,
          };

          const result = await http.post(
            "/resetPassword/" + userResetToken,
            data
          );
          setLoading(false);
          toast.success(result.data.message[0].message);
        } catch (error) {
          setLoading(false);
          toast.error(error.message);
        }
      } else {
        setLoading(false);
        toast.warn("رمز عبورهای وارد شده با هم همخوانی ندارد.");
      }
    } else {
      setLoading(false);
      toast.error("رمز عبور فعلی اشتباه وارد شده است.");
    }
  };

  return (
    <div className=" w-full lg:w-2/3 mx-auto">
      <Disclosure
        as="div"
        className="relative bg-sky-700 pb-32 overflow-hidden"
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
                Password: "",
                NewPassword: "",
                RepeatNewPassword: "",
              }}
              onSubmit={handleChange}
              validationSchema={PanelPasswordChangeValidation}
            >
              {({ setFieldValue }) => (
                <Form className="divide-y divide-gray-200 lg:col-span-9 w-2/3 mx-auto">
                  <div className="py-6 px-4 sm:p-6 lg:pb-8">
                    <div>
                      <h2 className="text-lg leading-6 font-medium text-textHead-900">
                        تغییر رمز عبور
                      </h2>
                      <p className="mt-1 text-sm text-toz">
                        از این قسمت می‌توانید برای تغییر رمز عبور خود اقدام
                        کنید.
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-12 gap-6">
                      <div className="col-span-12 relative">
                        <label className="block text-sm font-medium text-toz">
                          رمز عبور فعلی
                        </label>
                        <Field
                          type={showHidePassword ? "text" : "password"}
                          name="Password"
                          className="py-3 px-4 block w-full shadow-sm bg-background-500 text-toz border-2 focus:ring-button-500 focus:border-button-500 border-gray-300 rounded-md"
                        />
                        <i
                          className="text-xl text-toz cursor-pointer absolute left-3 top-9"
                          onClick={handleChangeType}
                        >
                          {!showHidePassword ? <HiEye /> : <HiEyeOff />}
                        </i>
                        <ErrorMessage name="Password" />
                      </div>

                      <div className="col-span-12 relative">
                        <label
                          htmlFor="NewPassword"
                          className="block text-sm font-medium text-toz"
                        >
                          رمز عبور جدید
                        </label>
                        <Field
                          type={showHidePassword2 ? "text" : "password"}
                          name="newPassword"
                          required
                          onChange={(e) => {
                            setFieldValue("newPassword", e.target.value);
                            setPassword(e.target.value);
                          }}
                          className="py-3 px-4 block w-full shadow-sm bg-background-500 text-toz border-2 focus:ring-button-500 focus:border-button-500 border-gray-300 rounded-md"
                        />
                        <i
                          className="text-xl text-toz cursor-pointer absolute left-3 top-9"
                          onClick={handleChangeType2}
                        >
                          {!showHidePassword2 ? <HiEye /> : <HiEyeOff />}
                        </i>
                        <PasswordChecker password={password} />
                      </div>

                      <div className="col-span-12 relative">
                        <label
                          htmlFor="RepeatNewPassword"
                          className="block text-sm font-medium text-toz"
                        >
                          تکرار رمز عبور جدید
                        </label>
                        <Field
                          type={showHidePassword3 ? "text" : "password"}
                          name="RepeatNewPassword"
                          className="py-3 px-4 block w-full shadow-sm bg-background-500 text-toz border-2 focus:ring-button-500 focus:border-button-500 border-gray-300 rounded-md"
                        />
                        <i
                          className="text-xl text-toz cursor-pointer absolute left-3 top-9"
                          onClick={handleChangeType3}
                        >
                          {!showHidePassword3 ? <HiEye /> : <HiEyeOff />}
                        </i>
                        <ErrorMessage name="RepeatNewPassword" />
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200">
                    <div className="py-4 px-4 flex justify-end sm:px-6">
                      <Link
                        to="/panel/dashboard"
                        type="button"
                        className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-500"
                      >
                        انصراف
                      </Link>
                      <button
                        type="submit"
                        className="ml-5 mr-2 flex gap-x-3 h-12 bg-button-700 border border-transparent rounded-md shadow-sm py-2 px-4 justify-center text-sm font-medium text-white hover:bg-button-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-500"
                      >
                        <span> اعمال تغییرات</span>
                        {loading ? <Spinner /> : null}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            {/* End */}
          </div>
        </div>
      </main>
    </div>
  );
}
