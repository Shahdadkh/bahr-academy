import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useEffect } from "react";

export default function PanelPaymentModal({
  showModal,
  setShowModal,
  getFiles,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleUpdate = (text) => {
    setValue(text.target.value);
  };

  useEffect(() => {
    if (showModal === true) {
      setOpen(true);
    }
    if (open === false) {
      setShowModal(open);
    }
  });

  const handleChange = () => {
    getFiles(Number(value));
    if (Number(value) !== 0) {
      setOpen(false);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div
          className="flex min-h-screen text-center md:block md:px-2 lg:px-4 "
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
            <Dialog.Overlay className="block fixed inset-0 bg-toz bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

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
            <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-2xl">
              <div className="w-full relative flex items-center rounded-lg bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                  <div className="col-span-12">
                    <h2 className="text-2xl font-medium text-center text-gray-900">
                      افزودن اعتبار
                    </h2>

                    <section
                      aria-labelledby="information-heading"
                      className="mt-3"
                    >
                      <p className="text-md text-center font-normal text-gray-400">
                        مبلغ مورد نظر جهت افزایش موجودی را وارد کنید
                      </p>

                      <div className="mt-6">
                        <div>
                          <input
                            onChange={(e) => handleUpdate(e)}
                            type="number"
                            name="number"
                            min={0}
                            className="text-center shadow block w-full h-12 border rounded-md outline-none"
                            value={value}
                          />
                        </div>
                      </div>
                      <div className="flex mt-3">
                        <button
                          onClick={() => setValue(50000)}
                          type="submit"
                          className="w-full  bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        >
                          50,000 تومان
                        </button>
                        <button
                          onClick={() => setValue(200000)}
                          type="submit"
                          className="w-full mr-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        >
                          200,000 تومان
                        </button>
                        <button
                          onClick={() => setValue(500000)}
                          type="submit"
                          className="w-full mr-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        >
                          500,000 تومان
                        </button>
                      </div>
                    </section>

                    <div className="mt-8 flex gap-x-6">
                      <button
                        onClick={() => handleChange()}
                        type="submit"
                        className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 outline-none"
                      >
                        افزایش اعتبار
                      </button>
                      <button
                        onClick={() => setOpen(false)}
                        type="submit"
                        className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                      >
                        انصراف
                      </button>
                    </div>

                    {/* <p className="absolute top-4 left-4 text-center sm:static sm:mt-6">
                          <a
                            href=""
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            View full details
                          </a>
                        </p> */}
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
