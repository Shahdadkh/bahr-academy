import { HiCheck, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  basketAction,
  courseAction,
  paymentAction,
} from "../../features/Root/RootSlice";
import { removeItem } from "../../core/services/LocalStorage";
import { toast } from "react-toastify";
import DeleteModal from "../Others/DeleteModal";
import ShoppingSelectPayment from "./ShoppingSelectPayment";
import ContainerComponent from "./../common/ContainerComponent/ContainerComponent";
import Spinner from "../common/Spinner/Spinner";

export default function ShoppingCart() {
  const localStore = localStorage.getItem("persist:root");
  const [isExist, SetIsExist] = useState(
    localStore
      ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).basketList)
      : []
  );
  const [isCourse] = useState(
    localStore
      ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).courseList)
      : []
  );
  const [walet, setWalet] = useState(
    localStore
      ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).payList)
      : []
  );
  const [paymentType, setPaymentType] = useState("پرداخت از طریق درگاه بانکی");
  //Modal
  const [showModal, setShowModal] = useState(false);
  const [showPost, setShowPost] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (value, idnum) => {
    setShowModal(value);
    setShowPost(idnum);
  };

  const today = new Date();
  const dispatch = useDispatch();

  const sumPrice =
    isExist.langth !== 0
      ? isExist
          .map((items) => items.data.cost)
          .reduce((a, b) => a + (b * 109) / 100, 0)
      : 0;

  const handleSubmit = () => {
    setLoading(true);
    if (isExist.length !== 0) {
      if (paymentType === "پرداخت از طریق درگاه بانکی") {
        dispatch(courseAction([...isCourse, ...isExist]));
        dispatch(basketAction([]));
        isExist.map((item) => removeItem("b" + item.id));
        SetIsExist([]);
        toast.success("با موفقیت پرداخت شد");
        setLoading(false);
      } else {
        if (walet.length !== 0) {
          if (walet[walet.length - 1].invent !== 0) {
            if (walet[walet.length - 1].invent >= sumPrice) {
              dispatch(courseAction([...isCourse, ...isExist]));
              dispatch(basketAction([]));
              isExist.map((item) => removeItem("b" + item.id));
              SetIsExist([]);
              const newList = [
                ...walet,
                {
                  id: walet[walet.length - 1].id + 1,
                  code: (Math.random() + 1)
                    .toString(36)
                    .substring(2, 7)
                    .toUpperCase(),
                  date: new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
                    dateStyle: "short",
                  }).format(today),
                  detail: "خرید دوره جدید",
                  amount: -sumPrice,
                  invent:
                    Number(walet[walet.length - 1].invent) - Number(sumPrice),
                },
              ];
              setWalet(newList);
              setLoading(false);
              toast.success("با موفقیت پرداخت شد");
            } else {
              setLoading(false);
              toast.warn("موجودی کافی نیست.");
            }
          } else {
            setLoading(false);
            toast.warn("موجودی کافی نیست.");
          }
        } else {
          setLoading(false);
          toast.warn("موجودی کافی نیست.");
        }
      }
    } else {
      setLoading(false);
      toast.warn("سبد خرید خالی است");
    }
  };
  dispatch(paymentAction(walet));

  const handleDelete = (value) => {
    if (value === true) {
      const newList = isExist.filter((item) => item.id !== showPost);
      dispatch(basketAction(newList));
      removeItem("b" + showPost);
      SetIsExist(newList);
      toast.success("با موفقیت از سبد خرید حذف شد");
    }
  };

  return (
    <div className="bg-background-800">
      <ContainerComponent>
        <div className="pt-10 pb-24">
          <h1 className="text-3xl font-extrabold tracking-tight text-textHead-900 sm:text-4xl">
            سبد خرید
          </h1>
          {/* Start */}
          {/* <Formik initialValues={{}}> */}
          <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                اقلام موجود در سبد خرید
              </h2>

              {isExist.length !== 0 ? (
                isExist.map((items, index) => (
                  <ul
                    key={index}
                    className="border-t border-b border-gray-200 divide-y divide-gray-200"
                  >
                    <li className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <img
                          src={items.data.lesson.image}
                          alt=""
                          className="w-48 h-28 rounded-md object-contain"
                        />
                      </div>

                      <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 mr-3 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <Link
                                  to={/Course/ + items.data._id}
                                  className="font-medium text-textHead-900 hover:text-textHead-800"
                                >
                                  {items.data.title}
                                </Link>
                              </h3>
                            </div>

                            <p
                              key={index}
                              className="mt-1 text-sm font-medium text-textHead-800"
                            >
                              {items.data.cost.toLocaleString()} تومان
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <label className="sr-only">{items.title}</label>

                            <div className="absolute top-0 left-0">
                              <button
                                type="button"
                                onClick={() => handleChange(true, items.id)}
                                className="-m-2 p-2 inline-flex text-gray-400 hover:text-toz"
                              >
                                <span className="sr-only">حذف</span>
                                <HiX className="h-5 w-5" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <p className="mt-4 flex text-sm text-gray-700 space-x-2 mr-3">
                          <HiCheck
                            className="flex-shrink-0 h-5 w-5 text-green-500 ml-1"
                            aria-hidden="true"
                          />

                          <span className="text-textHead-900">
                            در سبد خرید قرار گرفت
                          </span>
                        </p>
                      </div>
                    </li>
                  </ul>
                ))
              ) : (
                <span className="text-toz">سبد خرید خالی است</span>
              )}
            </section>

            <section
              aria-labelledby="summary-heading"
              className="mt-16 bg-background-600 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
            >
              <div className="relative font-bold">
                <ShoppingSelectPayment
                  setPaymentType={setPaymentType}
                  className="absolute top-0 left-0"
                />
              </div>

              <h2
                id="summary-heading"
                className="text-lg font-medium text-textHead-900 mt-6"
              >
                برآورد هزینه
              </h2>
              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-toz">جمع</dt>
                  <dd className="text-sm font-medium text-textHead-800">
                    {isExist.langth !== 0
                      ? isExist
                          .map((items) => items.data.cost)
                          .reduce((a, b) => a + b, 0)
                          .toLocaleString()
                      : 0}
                    تومان
                  </dd>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="flex text-sm text-toz">
                    <span>مالیات بر ارزش افزوده</span>
                  </dt>
                  <dd className="text-sm font-medium text-textHead-800">
                    {isExist.langth !== 0
                      ? isExist
                          .map((items) => items.data.cost)
                          .reduce((a, b) => a + (b * 9) / 100, 0)
                          .toLocaleString()
                      : 0}
                    تومان
                  </dd>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="text-base font-medium text-textHead-900">
                    جمع کل
                  </dt>
                  <dd className="text-base font-medium text-textHead-900">
                    {isExist.langth !== 0
                      ? isExist
                          .map((items) => items.data.cost)
                          .reduce((a, b) => a + (b * 109) / 100, 0)
                          .toLocaleString()
                      : 0}
                    تومان
                  </dd>
                </div>
              </dl>
              <div className="mt-6">
                <button
                  type="submit"
                  onClick={() => handleSubmit()}
                  className="w-full h-12 flex gap-x-3 items-center justify-center bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  <span>پرداخت</span>
                  {loading ? <Spinner /> : null}
                </button>
              </div>
            </section>
          </div>
          {/* </Formik> */}
          {/* End */}
          <DeleteModal
            showModal={showModal}
            setShowModal={setShowModal}
            getFiles={() => handleDelete(true)}
            title="درخواست حذف دوره"
            Question="آیا از حذف دوره انتخابی خود مطمئن هستید؟"
            submitButton="حذف دوره"
          />
        </div>
      </ContainerComponent>
    </div>
  );
}
