import NoImage from "../../assets/images/NoImage.png";
import { Formik, Form, Field } from "formik";
import { getItem } from "../../core/services/LocalStorage";
import http from "../../core/services/Interceptor";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function CommentField() {
  const param = useParams();

  const handleSubmit = async (value) => {
    const user = JSON.parse(getItem("user"));
    const data = {
      postId: param.id,
      email: user.email,
      username: user.fullName,
      comment: value.comment,
    };
    try {
      const result = await http.post("/comments/send", data);
      toast.success(result.data.message);
      value.comment = "";
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {getItem("token") !== false ? (
        <div className="flex items-start mt-10 p-10 bg-background-750">
          <div className="flex-shrink-0 ml-2 mr-2">
            <img
              className="inline-block h-10 w-10 rounded-full"
              src={NoImage}
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1">
            {/* Start */}
            <Formik initialValues={{ comment: "" }} onSubmit={handleSubmit}>
              <Form className="relative">
                <div className=" rounded-lg  overflow-hidden ">
                  <label htmlFor="comment" className="sr-only">
                    پیام شما
                  </label>
                  <Field
                    as="textarea"
                    rows={3}
                    name="comment"
                    required
                    className="border border-gray-300 focus-within:border-button-500 focus-within:ring-1 focus-within:ring-button-500 rounded-lg block w-full py-3 bg-background-600 placeholder:text-toz text-textHead-900 indent-3 resize-none focus:outline-none focus:ring-0 sm:text-sm "
                    placeholder="پیام شما..."
                  />

                  <div className="py-2" aria-hidden="true">
                    <div className="py-px">
                      <div className="h-9" />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-end">
                  <div className="flex-shrink-0">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-button-600 hover:bg-button-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      ارسال
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
            {/* End */}
          </div>
        </div>
      ) : null}
    </>
  );
}
