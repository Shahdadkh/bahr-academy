import { Formik, Form, Field } from "formik";
import ContainerComponent from "./../common/ContainerComponent/ContainerComponent";
import http from "../../core/services/Interceptor";
import { toast } from "react-toastify";

const handleSubmit = async (value) => {
  const data = {
    email: value.email,
    name: "",
    text: value.text,
  };
  try {
    const result = await http.post("/contactUs", data);
    toast.success(result.data.message[0].message);
    value.text = "";
  } catch (error) {
    toast.error(error.message);
  }
};

export default function LandingMessage() {
  return (
    <div className="bg-background-700 mt-16">
      <ContainerComponent>
        <div className="relative"></div>

        <div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-5">
          <div className="bg-background-700 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-12 xl:pr-12">
            <div className="max-w-lg mx-auto">
              <h2 className="text-2xl font-extrabold tracking-tight text-textHead-900 sm:text-3xl">
                انتقادات و پیشنهادات
              </h2>
              <p className="mt-3 text-lg leading-6 text-toz">
                کاربر گرامی؛ به منظور تضمین کیفیت و بالابردن هر چه بهتر خدمات،
                آماده شنیدن هرگونه انتقادات و پیشنهادات شما هستیم. جهت ارتباط با
                ما می‌توانید از طریق فرم روبه‌رو اقدام نمایید تا در اسرع وقت به
                نظر شما رسیدگی شود.
              </p>
            </div>
          </div>
          <div className="bg-background-600 py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8  shadow-lg  my-auto mt-10 mb-10 rounded-3xl">
            <div className="max-w-lg mx-auto lg:max-w-none">
              {/* Start */}
              <Formik
                initialValues={{ email: "", text: "" }}
                onSubmit={handleSubmit}
              >
                <Form className="grid grid-cols-1 gap-y-6">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      ایمیل
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className="block w-full shadow-sm py-3 px-4 bg-background-500 placeholder-toz focus:ring-button-500 focus:border-button-500 border border-gray-300 rounded-md"
                      placeholder="ایمیل"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="sr-only">
                      پیام شما
                    </label>
                    <Field
                      as="textarea"
                      name="text"
                      rows={4}
                      required
                      className="block w-full shadow-sm py-3 px-4 placeholder-toz bg-background-500 focus:ring-button-500 focus:border-button-500 border border-gray-300 rounded-md min-h-20"
                      placeholder="پیام شما"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-button-600 hover:bg-button-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-500"
                    >
                      ارسال
                    </button>
                  </div>
                </Form>
              </Formik>
              {/* End */}
            </div>
          </div>
        </div>
      </ContainerComponent>
    </div>
  );
}
