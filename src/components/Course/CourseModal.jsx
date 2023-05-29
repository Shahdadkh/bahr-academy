import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { HiStar } from "react-icons/hi";
import { handleDate } from "../../core/Utils/handleDate";

import { Link } from "react-router-dom";
import { getItem } from "../../core/services/LocalStorage";
import Rating from "react-rating";
import { useDispatch } from "react-redux";
import { basketAction } from "../../features/Root/RootSlice";

import { setItem } from "../../core/services/LocalStorage";
import { CourseListCheck } from "../../core/Utils/CourseListCheck";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import http from "../../core/services/Interceptor";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CourseModal({ showModal, setShowModal, showPost }) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const [likeCount, setLikeCount] = useState(0);

  const localStore = localStorage.getItem("persist:root");
  const [isBasket, setIsBasket] = useState(
    localStore
      ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).basketList)
      : []
  );
  const user = getItem("user") !== false ? JSON.parse(getItem("user")) : null;

  useEffect(() => {
    if (showModal === true) {
      getData();
    }
    if (open === false) {
      setShowModal(open);
    }
  });

  const getData = async () => {
    try {
      const result = await http.get("/course/" + showPost);
      setProduct(result.data.result);
      setOpen(true);
      countLike(result.data.result.lesson._id);
    } catch (error) {
      console.log(error);
    }
  };

  const countLike = async (lessonId) => {
    const data = {
      termId: lessonId,
      userId: user._id,
      like: true,
    };
    try {
      const result = await http.get("/course/likeCount/" + showPost, data);
      setLikeCount(
        Math.ceil(
          (result.data.result.like /
            (result.data.result.like + result.data.result.dislike)) *
            5
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();
  const handleBuy = (data) => {
    if (getItem("token") !== false) {
      if (getItem("b" + data._id) === false) {
        setItem("b" + data._id, data._id);
        const newList = [...isBasket, { id: data._id, data: data }];
        setIsBasket(newList);
        toast.success("به سبد خرید اضافه شد");
        setOpen(false);
      } else {
        toast.warn("قبلا به سبد خرید اضافه شده است");
        setOpen(false);
      }
    } else {
      toast.warn("لطفا وارد حساب کاربری خود شوید");
      setOpen(false);
    }
  };
  dispatch(basketAction(isBasket));

  const handleRating = async (value) => {
    if (getItem("token") !== false) {
      const data = {
        courseId: product._id,
        userId: user._id,
      };

      if (value >= 3) {
        try {
          const result = await http.post("/course/like", data);
          toast.success(result.data.message[0].message);
        } catch (error) {
          toast.error(error.response.data.message.message[0].message);
        }
      } else if (value < 3) {
        try {
          const result = await http.post("/course/dislike", data);
          toast.success(result.data.message[0].message);
        } catch (error) {
          toast.error(error.response.data.message.message[0].message);
        }
      }
    } else {
      toast.warn("لطفا وارد حساب کاربری خود شوید");
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      {product.length !== 0 ? (
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen}
        >
          <div
            className="flex min-h-screen text-center md:block md:px-2 lg:px-4"
            style={{ fontSize: 0 }}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className=" fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity block" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden md:inline-block md:align-middle md:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
                <div className="w-full relative flex items-center bg-background-700 px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-md">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-toz sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                    <div className="sm:col-span-4 lg:col-span-5">
                      <div className="p-1 aspect-w-1 aspect-h-1 rounded-lg bg-background-500 overflow-hidden shadow">
                        <img
                          src={product.lesson.image}
                          alt=""
                          className="object-center object-cover"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-extrabold text-textHead-900 text-right">
                        {product.title}
                      </h2>

                      <section
                        aria-labelledby="information-heading"
                        className="mt-3"
                      >
                        <h3 id="information-heading" className="sr-only">
                          مشخصات محصول
                        </h3>

                        <p className="text-2xl text-textHead-900 text-right">
                          {product.cost.toLocaleString()} تومان
                        </p>

                        {/* Reviews */}
                        <div className="mt-3">
                          <h4 className="sr-only">Reviews</h4>
                          <div className="flex items-center">
                            <div className="flex items-center">
                              <Rating
                                onChange={(e) => handleRating(e)}
                                {...{
                                  emptySymbol: (
                                    <HiStar className="text-gray-300 text-xl">
                                      star_border
                                    </HiStar>
                                  ),
                                  fullSymbol: (
                                    <HiStar className="text-yellow-400 text-xl">
                                      star_rate
                                    </HiStar>
                                  ),
                                  fractions: 1,
                                  initialRating: likeCount,
                                }}
                              />
                            </div>
                            <p className="sr-only">
                              {product.__v} امتیازی داده نشده است
                            </p>
                          </div>
                        </div>

                        <div className="mt-6">
                          <h4 className="sr-only">مشخصات</h4>

                          <p className="text-sm text-toz text-right">
                            {product.lesson.description}
                          </p>
                          <p
                            className={classNames(
                              product.capacity > 0
                                ? "text-lime-600"
                                : "text-red-500",
                              "text-base text-right mt-4"
                            )}
                          >
                            {product.capacity > 0
                              ? `ظرفیت باقیمانده: ${product.capacity} نفر`
                              : `ظرفیت دوره تکمیل است.`}
                          </p>
                          <p className="text-sm text-textHead-800 text-right mt-4">
                            تاریخ شروع:{" "}
                            {handleDate(product.startDate.slice(0, 10))}
                          </p>
                        </div>
                      </section>

                      <section
                        aria-labelledby="options-heading"
                        className="mt-6"
                      >
                        <h3 id="options-heading" className="sr-only">
                          مشخصات محصول
                        </h3>

                        <div className="mt-6">
                          <button
                            onClick={
                              CourseListCheck(product._id) === false &&
                              product.capacity > 0
                                ? () => handleBuy(product)
                                : null
                            }
                            className={
                              CourseListCheck(product._id) !== false ||
                              product.capacity === 0
                                ? "w-full bg-button-600 border border-transparent rounded-md py-2 px-8 flex items-center justify-center text-base font-medium text-white opacity-50 cursor-not-allowed"
                                : "w-full bg-button-600 border border-transparent rounded-md py-2 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-button-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-button-500"
                            }
                          >
                            افزودن به سبد خرید
                          </button>
                        </div>

                        <p className="absolute top-4 left-4 text-center sm:static sm:mt-5">
                          <Link
                            to={/Course/ + product._id}
                            className="font-medium text-textHover-600 hover:text-textHover-500"
                          >
                            مشاهده کامل مشخصات
                          </Link>
                        </p>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      ) : null}
    </Transition.Root>
  );
}
