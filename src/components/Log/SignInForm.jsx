import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { HiHome } from "react-icons/hi";
import ImageLeft from "../../assets/images/login-images/signIn.jpg";
//import { loginAction } from "../../features/Root/RootSlice";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { setItem } from "../../core/services/LocalStorage";
import http from "../../core/services/Interceptor";
import { toast } from "react-toastify";

export default function SignInForm({ onLoggin }) {
  const dispatch = useDispatch();
  const [showHidePassword, setShowHidePassword] = useState(false);
  const handleChangeType = () => setShowHidePassword(!showHidePassword);

  const handleSubmit = async (value) => {
    // dispatch(loginAction(value));
    try {
      const result = await http.post("/auth/login", value);
      setItem("user", JSON.stringify(result.data.result.studentModel));
      setItem("token", result.data.result.jwtToken);
      toast.success("ورود با موفقیت انجام شد.");
      onLoggin();
    } catch (error) {
      toast.error(error.response.data.message.message[0].message);
    }
  };

  return (
    <>
      <div className="min-h-full flex border rounded-3xl overflow-hidden shadow-md sm:w-4/5 mx-auto bg-background-750">
        <div className="flex-1 flex flex-col justify-center py-10 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-20 w-1/2">
          <div className="text-sm text-toz w-full">
            <Link to="/" className="w-fit flex text-right">
              <HiHome className=" ml-1 h-5 w-5" />
              <span>خانه</span>
            </Link>
          </div>
          <div className="mx-auto">
            <div className="mt-2">
              <div className="bg-background-750 overflow-hidden">
                <div className="relative max-w-xl mx-auto">
                  <div className="text-center">
                    <h2 className="text-xl  md:text-3xl lg:text-3xl font-extrabold tracking-tight text-textHead-900">
                      ورود به حساب کاربری
                    </h2>
                  </div>
                  <div className="mt-12">
                    <Formik
                      initialValues={{
                        email: "",
                        password: "",
                      }}
                      onSubmit={handleSubmit}
                    >
                      <Form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                        <div className="sm:col-span-2 h-20">
                          <label className="block text-sm font-medium text-toz mr-1">
                            ایمیل
                          </label>
                          <div className="mt-1 mx-1">
                            <Field
                              name="email"
                              type="email"
                              className="py-3 px-4 block w-full shadow-sm bg-background-500 text-toz border-2 focus:ring-button-500 focus:border-button-500 border-gray-300 rounded-md"
                            />
                            <ErrorMessage
                              component="span"
                              className="text-xs text-red-500"
                              name="email"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2 h-20">
                          <label className="block text-sm font-medium text-toz mr-1">
                            رمز عبور
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm mx-1">
                            <Field
                              type={showHidePassword ? "text" : "password"}
                              name="password"
                              className="py-3 px-4 block w-full shadow-sm bg-background-500 text-toz border-2 focus:ring-button-500 focus:border-button-500 border-gray-300 rounded-md"
                            />
                            <i
                              className="text-xl text-toz cursor-pointer absolute left-3 top-4"
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
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              id="remember-me"
                              name="remember-me"
                              type="checkbox"
                              className="h-4 w-4 text-button-600 focus:ring-button-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor="remember-me"
                              className="mr-2 block text-sm text-textHead-900"
                            >
                              مرا به خاطر بسپار
                            </label>
                          </div>
                        </div>

                        <div className="sm:col-span-2 mx-1 my-1">
                          <button
                            type="submit"
                            className="w-full mt-0 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-button-600 hover:bg-button-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            وارد شوید
                          </button>
                        </div>
                        <div className="block lg:w-52">
                          <div className="text-sm text-textHead-900 ">
                            حساب کاربری ندارید؟
                            <Link
                              to="/Account/SignUp"
                              className="font-medium text-textHover-600 hover:text-textHover-500 mr-1"
                            >
                              ثبت نام کنید
                            </Link>
                          </div>
                          <div className="text-sm mt-2">
                            <Link
                              to="/Account/ForgetPassword"
                              className="font-medium text-textHover-600 hover:text-textHover-500"
                            >
                              رمز عبور خود را فراموش کرده اید؟
                            </Link>
                          </div>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img className="absolute w-full h-full" src={ImageLeft} alt="" />
        </div>
      </div>
    </>
  );
}
