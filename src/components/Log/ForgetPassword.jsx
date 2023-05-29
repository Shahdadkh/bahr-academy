import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ForgetPasswordValidation } from "../../core/validations/Validations";
import ImageLeft from "../../assets/images/login-images/forgetPass.jpg";
import { HiArrowRight, HiHome } from "react-icons/hi";
import http from "../../core/services/Interceptor";
import { toast } from "react-toastify";

export default function ForgetPass() {
  const onSubmit = async (value) => {
    try {
      const data = {
        email: value.email,
      };
      const result = await http.post("/forgetpassword", data);
      toast.success(result.data.message[0].message);
    } catch (error) {
      toast.warn(error.response.data.message[0].message);
    }
  };
  return (
    <>
      <div className="min-h-full flex border  rounded-3xl overflow-hidden shadow-md w-4/5 mx-auto bg-background-750">
        <div className="flex-1 flex flex-col justify-center py-32 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-20 w-1/2">
          <div className="text-sm text-toz w-fit">
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
            <div className="mt-2">
              <div className="bg-background-750 overflow-hidden">
                <div className="relative max-w-lg  mx-auto">
                  <div className="text-center">
                    <h2 className="text-xl  md:text-3xl lg:text-3xl font-extrabold tracking-tight text-textHead-900">
                      فراموشی رمز عبور
                    </h2>
                  </div>

                  <div className="mt-12">
                    <div className="">
                      <Formik
                        onSubmit={onSubmit}
                        initialValues={{ email: "" }}
                        validationSchema={ForgetPasswordValidation}
                      >
                        <Form
                          action="#"
                          method="POST"
                          className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                        >
                          <div className="sm:col-span-2 h-24">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-toz mr-1"
                            >
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

                          <div className="sm:col-span-2 mx-1 my-1">
                            <button
                              type="submit"
                              className="w-full mt-0 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-button-600 hover:bg-button-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              ارسال
                            </button>
                          </div>
                        </Form>
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute w-full h-full rounded-l-3xl"
            src={ImageLeft}
            alt=""
          />
        </div>
      </div>
    </>
  );
}
