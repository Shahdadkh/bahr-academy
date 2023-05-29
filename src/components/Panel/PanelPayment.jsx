import Pagination from "./PanelPagination";
import { useState } from "react";
import PanelPaymentModal from "./PanelPaymentModal";
import { paymentAction } from "../../features/Root/RootSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function PanelPayment() {
  const [currentPage, setCurrentPage] = useState(0);
  //Modal
  const [showModal, setShowModal] = useState(false);
  const localStore = localStorage.getItem("persist:root");
  const [walet, setWalet] = useState(
    localStore
      ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).payList)
      : []
  );
  const today = new Date();
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setShowModal(value);
  };

  const handleUpdate = (value) => {
    if (value !== 0) {
      if (walet.length === 0) {
        const newList = [
          ...walet,
          {
            id: walet.length + 1,
            code: (Math.random() + 1)
              .toString(36)
              .substring(2, 7)
              .toUpperCase(),
            date: new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
              dateStyle: "short",
            }).format(today),
            detail: "شارژ حساب",
            amount: value,
            invent: value,
          },
        ];
        setWalet(newList);
        toast.success(`مبلغ ${value.toLocaleString()} تومان به حساب اضافه شد.`);
      } else {
        const newList = [
          ...walet,
          {
            id: walet.length + 1,
            code: (Math.random() + 1)
              .toString(36)
              .substring(2, 7)
              .toUpperCase(),
            date: new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
              dateStyle: "short",
            }).format(today),
            detail: "شارژ حساب",
            amount: value,
            invent: Number(walet[walet.length - 1].invent) + Number(value),
          },
        ];
        setWalet(newList);
        toast.success(`مبلغ ${value.toLocaleString()} تومان به حساب اضافه شد.`);
      }
    } else {
      toast.warn("مقدار نباید صفر باشد");
    }
  };
  dispatch(paymentAction(walet));

  const pageSize = 6;
  const StartCourse = Number(currentPage) * Number(pageSize);
  const EndCourse = Number(currentPage) * Number(pageSize) + Number(pageSize);

  return (
    <div className="flex flex-col">
      <div className="pt-5 border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg leading-6 font-bold text-textHead-900 mr-4">
          گردش حساب
        </h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <div className="flex h-10">
            {/* <input
              type="text"
              name="text"
              className="shadow-sm block w-full pr-3 sm:text-sm border-gray-300 rounded-md outline-none"
            /> */}
            <button
              onClick={() => handleChange(true)}
              type="button"
              className="inline-flex justify-center items-center w-32 mr-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600"
            >
              افزایش اعتبار
            </button>
          </div>
        </div>
      </div>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow my-4 overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-background-600">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-toz uppercase tracking-wider"
                  >
                    کد رهگیری
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-toz uppercase tracking-wider"
                  >
                    تاریخ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-toz uppercase tracking-wider"
                  >
                    توضیحات
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-toz uppercase tracking-wider"
                  >
                    کسر یا اضافه
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-toz uppercase tracking-wider"
                  >
                    موجودی
                  </th>
                </tr>
              </thead>
              <tbody className="bg-background-500 divide-y divide-gray-200">
                {walet
                  .slice()
                  .sort((a, b) => b.id - a.id)
                  .slice(StartCourse, EndCourse)
                  .map((data, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-toz font-sans font-semibold">
                        {data.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-toz">
                        {data.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-textHead-900">
                        {data.detail}
                      </td>

                      <td
                        className={
                          data.amount > 0
                            ? "px-6 py-4 whitespace-nowrap text-sm text-green-500"
                            : "px-6 py-4 whitespace-nowrap text-sm text-red-500"
                        }
                      >
                        {data.amount.toLocaleString()} تومان
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-toz">
                        {data.invent.toLocaleString()} تومان
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <Pagination
            totalPageSize={walet.length}
            pageSize={pageSize}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
          <PanelPaymentModal
            showModal={showModal}
            setShowModal={setShowModal}
            getFiles={(e) => handleUpdate(e)}
          />
        </div>
      </div>
    </div>
  );
}
