import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import newPass from "../../assets/images/login-images/newPass.jpg";
import { HiArrowRight, HiHome } from "react-icons/hi";
import { ResetPasswordValidation } from "../../core/validations/Validations";
import http from "../../core/services/Interceptor";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { PasswordChecker } from "./../common/PasswordChecker";
import Spinner from "../common/Spinner/Spinner";

export default function ResetPassword() {
  const param = useParams();
  const [password, setPassword] = useState("");
  const [showHidePassword, setShowHidePassword] = useState(false);
  const [showHidePassword2, setShowHidePassword2] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (value) => {
    setLoading(true);
    if (value.password1 === value.password2) {
      try {
        const data = {
          password: value.password1,
        };
        const result = await http.post("/resetPassword/" + param.token, data);
        setLoading(false);
        toast.success(result.data.message[0].message);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message[0].message);
      }
    } else {
      setLoading(false);
      toast.warn("رمز عبورهای وارد شده با هم همخوانی ندارد.");
    }
  };
  return (
    <>
      <div className="p-4 sm:p-10 bg-background-800">
        <div className="min-h-full flex border  rounded-3xl overflow-hidden shadow-md sm:w-4/5 mx-auto bg-background-750">
          <div className="flex-1 flex flex-col justify-center py-10 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-20 w-1/2">
            <div className="text-sm text-toz w-full">
              <Link to="/account/signin" className="w-fit flex text-right">
                <HiArrowRight className="mt-1 ml-1" />
                <span>بازگشت</span>
              </Link>
            </div>
            <div className="text-sm text-toz w-full">
              <Link to="/" className="w-fit flex text-right">
                <HiHome className="mt-1 ml-1" />
                <span>خانه</span>
              </Link>
            </div>
            <div className="mx-auto w-full">
              <div className="mt-2 w-full mx-auto">
                <div className="bg-background-750 overflow-hidden">
                  <div className="relative max-w-xl mx-auto">
                    <div className="text-center">
                      <h2 className="text-xl  md:text-3xl lg:text-3xl font-extrabold tracking-tight text-textHead-900">
                        تعیین رمز عبور جدید
                      </h2>
                    </div>
                    <div className="mt-12">
                      <Formik
                        initialValues={{
                          password1: "",
                          password2: "",
                        }}
                        onSubmit={onSubmit}
                        validationSchema={ResetPasswordValidation}
                      >
                        {({ setFieldValue }) => (
                          <Form
                            action="/"
                            method="POST"
                            className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                          >
                            <div className="sm:col-span-2 h-24">
                              <label className="block  text-sm font-medium text-gray-700 mr-1">
                                رمز عبور جدید
                              </label>
                              <div className="mt-1 mx-1 relative">
                                <Field
                                  type={showHidePassword ? "text" : "password"}
                                  name="password1"
                                  minLength="8"
                                  onChange={(e) => {
                                    setFieldValue("password1", e.target.value);
                                    setPassword(e.target.value);
                                  }}
                                  className="py-3 px-4 block w-full text-left border-2 focus:ring-indigo-500 bg-background-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                  placeholder=""
                                />
                                <i
                                  className="text-xl text-toz cursor-pointer absolute right-3 top-4"
                                  onClick={() =>
                                    setShowHidePassword(!showHidePassword)
                                  }
                                >
                                  {!showHidePassword ? <HiEye /> : <HiEyeOff />}
                                </i>
                                <PasswordChecker password={password} />
                              </div>
                            </div>
                            <div className="sm:col-span-2 h-24">
                              <label className="block text-sm font-medium text-gray-700 mr-1">
                                تکرار رمز عبور جدید
                              </label>
                              <div className="mt-1 relative rounded-md mx-1">
                                <Field
                                  type={showHidePassword2 ? "text" : "password"}
                                  name="password2"
                                  minLength="8"
                                  className="py-3 px-4 block text-left w-full border-2 focus:ring-indigo-500 bg-background-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                  placeholder=""
                                />
                                <i
                                  className="text-xl text-toz cursor-pointer absolute right-3 top-4"
                                  onClick={() =>
                                    setShowHidePassword2(!showHidePassword2)
                                  }
                                >
                                  {!showHidePassword2 ? (
                                    <HiEye />
                                  ) : (
                                    <HiEyeOff />
                                  )}
                                </i>
                                <ErrorMessage
                                  component="span"
                                  className="text-xs text-red-500"
                                  name="password2"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2 mx-1 my-1">
                              <button
                                type="submit"
                                className="w-full mt-0 flex gap-x-3 h-12 items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                <span>ذخیره</span>
                                {loading ? <Spinner /> : null}
                              </button>
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
            <img className="absolute w-full h-full" src={newPass} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
