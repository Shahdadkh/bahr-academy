import { Formik, Field, Form } from "formik";
import Compic from "../../assets/images/ComputerProgramming.webp";
import ContainerComponent from "./../common/ContainerComponent/ContainerComponent";

export default function NewsHeader() {
  const handleSubmit = (value) => {
    alert(JSON.stringify(value));
  };
  return (
    <div className=" bg-background-700 overflow-hidden">
      <ContainerComponent>
        <div className="relative pb-16 sm:pb-24 lg:pb-32">
          <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <h1>
                  <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                    <span className="block text-textHead-900 text-right">
                      آکادمی برنامه‌نویسی بحر
                    </span>
                  </span>
                </h1>
                <p className="mt-3 text-base text-toz sm:mt-5 sm:text-xl lg:text-lg xl:text-xl text-right">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                  <p className="text-base font-medium text-textHead-800 text-right">
                    ایمیل خود را جهت دریافت آخرین بروزرسانی وارد کنید.
                  </p>
                  <Formik initialValues={{ email: "" }} onSubmit={handleSubmit}>
                    <Form className="mt-4 sm:flex sm:max-w-md">
                      <label htmlFor="email-address" className="sr-only">
                        ایمیل
                      </label>
                      <Field
                        name="email"
                        type="email"
                        required
                        className="appearance-none min-w-0 w-full bg-background-600 border border-toz rounded-md shadow-sm py-2 px-4 text-base text-toz placeholder-toz focus:outline-none focus:ring-button-500 focus:border-button-500 focus:placeholder-toz"
                        placeholder="ایمیل "
                      />
                      <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0 mr-2">
                        <button
                          type="submit"
                          className="w-full bg-button-600 flex items-center justify-center border border-transparent rounded-md py-2 px-4 text-base font-medium text-white hover:bg-button-700 focus:ring-2 focus:ring-offset-2 focus:ring-button-500"
                        >
                          با خبرم کن
                        </button>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <button
                    type="button"
                    className="relative block w-full bg-white rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-500"
                  >
                    <span className="sr-only">
                      Watch our video to learn more
                    </span>
                    <img
                      className="w-full hidden lg:block"
                      src={Compic}
                      alt=""
                    />
                    <div
                      className="absolute inset-0 w-full h-full flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <svg
                        className="h-20 w-20 text-button-500"
                        fill="currentColor"
                        viewBox="0 0 84 84"
                      >
                        <circle
                          opacity="0.9"
                          cx={42}
                          cy={42}
                          r={42}
                          fill="white"
                        />
                        <path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </ContainerComponent>
    </div>
  );
}
