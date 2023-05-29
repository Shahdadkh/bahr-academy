import { HiCheck } from "react-icons/hi";
import { handleDate } from "../../core/Utils/handleDate";
import { getItem, setItem, removeItem } from "../../core/services/LocalStorage";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { basketAction } from "../../features/Root/RootSlice";
import { likeAction } from "../../features/Root/RootSlice";
import { CourseListCheck } from "../../core/Utils/CourseListCheck";
import { toast } from "react-toastify";

export default function CourseDetailSinglePrice({ courseData }) {
  //Basket
  const localStore = localStorage.getItem("persist:root");
  const [isBasket, setIsBasket] = useState(
    localStore
      ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).basketList)
      : []
  );
  //Heart
  const [isHeart, setIsHeart] = useState(
    localStore
      ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).likeList)
      : []
  );

  const dispatch = useDispatch();
  const handleBuy = (data) => {
    if (getItem("token") !== false) {
      if (getItem("b" + data._id) === false) {
        setItem("b" + data._id, data._id);
        const newList = [...isBasket, { id: data._id, data: data }];
        setIsBasket(newList);
        toast.success("به سبد خرید اضافه شد");
      } else {
        toast.warn("قبلا به سبد خرید اضافه شده است");
      }
    } else {
      toast.warn("لطفا وارد حساب کاربری خود شوید");
    }
  };
  dispatch(basketAction(isBasket));

  const handleHeart = (data) => {
    if (getItem(data._id) === false) {
      setItem(data._id, data._id);
      const newList = [...isHeart, { id: data._id, data: data }];
      setIsHeart(newList);
      toast.success("به لیست مورد علاقه ها اضافه شد");
    } else {
      removeItem(data._id);
      const newList = isHeart.filter((item) => item.id !== data._id);
      setIsHeart(newList);
      toast.error("از لیست مورد علاقه ها حذف شد");
    }
  };
  dispatch(likeAction(isHeart));

  const tiers = [
    {
      included: ["بسیار کاربردی", "بی نظیر", "فوق العاده"],
    },
  ];

  return (
    <div className="bg-background-600">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-4 sm:space-y-0 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
          <div className="rounded-lg divide-y divide-gray-200">
            <div className="p-6">
              <h2 className="text-base leading-6 font-medium text-textHead-800 w-60 mx-auto">
                شروع دوره: {handleDate(courseData.startDate.slice(0, 10))}
              </h2>
              <p className="mt-4 text-sm text-toz w-60 mx-auto">
                {courseData.capacity > 0
                  ? " ظرفیت باقیمانده: " + courseData.capacity + " نفر"
                  : "ظرفیت دوره تکمیل است."}
              </p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-textHead-800 w-60">
                  {courseData.cost.toLocaleString()}
                </span>
                <span className="text-base font-medium text-toz">تومان</span>
              </p>
              <button
                onClick={
                  CourseListCheck(courseData._id) === false &&
                  courseData.capacity > 0
                    ? () => handleBuy(courseData)
                    : null
                }
                className={
                  CourseListCheck(courseData._id) !== false ||
                  courseData.capacity === 0
                    ? "mt-8 block w-full bg-button-600 border border-button-800 rounded-md py-2 text-sm font-semibold text-white text-center opacity-50 cursor-not-allowed"
                    : "mt-8 block w-full bg-button-600 border border-button-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-button-900"
                }
              >
                افزودن به سبد خرید
              </button>
              {getItem("token") !== false ? (
                <button
                  onClick={() => handleHeart(courseData)}
                  className={
                    getItem(courseData._id) === false
                      ? "mt-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold text-sm py-2 px-11 border border-gray-400 rounded shadow"
                      : "mt-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold text-sm py-2 px-11 border border-gray-400 rounded shadow opacity-50"
                  }
                >
                  {getItem(courseData._id) === false
                    ? "اضافه به لیست علاقمندی‌ها"
                    : "حذف از لیست علاقمندی‌ها"}
                </button>
              ) : (
                <button
                  onClick={() => toast.warn("لطفا وارد حساب کاربری خود شوید")}
                  className="mt-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold text-sm py-2 px-11 border border-gray-400 rounded shadow"
                >
                  اضافه به لیست علاقمندی‌ها
                </button>
              )}
            </div>
            <div className="pt-6 pb-8 px-6">
              <h3 className="text-xs font-medium text-textHead-900 tracking-wide uppercase">
                شامل چه چیزهایی می شود:
              </h3>
              {tiers.map((tier, index) => (
                <ul key={index} className="mt-6 space-y-4">
                  {tier.included.map((feature, index) => (
                    <li key={index} className="flex space-x-3">
                      <div>
                        <HiCheck
                          className="flex-shrink-0 h-5 w-5 text-green-500 ml-2"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="text-sm text-toz">{feature}</div>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
