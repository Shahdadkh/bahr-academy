import { Fragment, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  HiHome,
  HiAcademicCap,
  HiOutlineMenu,
  HiUserGroup,
  HiRss,
  HiOutlineX,
  HiOutlineShoppingBag,
  HiSearch,
  HiOutlineCurrencyDollar,
} from "react-icons/hi";
import NoPic from "../../assets/images/NoImage.png";
import IconPic from "../../assets/images/Logo.svg";
import LandingSearchModal from "./LandingSearchModal";
import { closeAction } from "../../features/Root/RootSlice";
import { useDispatch, useSelector } from "react-redux";
import ContainerComponent from "../common/ContainerComponent/ContainerComponent";
import { getItem } from "../../core/services/LocalStorage";

const navigationList = [
  {
    name: "خانه",
    to: "/",
    icon: HiHome,
  },
  {
    name: "دوره ها",
    to: "/Course",
    icon: HiAcademicCap,
  },
  {
    name: "اساتید",
    to: "/Teachers",
    icon: HiUserGroup,
  },
  {
    name: "اخبار و مقالات",
    to: "/News",
    icon: HiRss,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function LandingNavbar({ isExit }) {
  const [showModal, setShowModal] = useState(false);
  const [handleLogin, setHandleLogin] = useState(false);
  const [navigation] = useState(navigationList);
  const locationPath = useLocation().pathname;
  const dispatch = useDispatch();
  const count = useSelector((state) => state.basketList.length);
  const cash = useSelector((state) => state.payList);
  const user = getItem("user") !== false ? JSON.parse(getItem("user")) : null;

  const handleChange = (value) => {
    setShowModal(value);
  };

  useEffect(() => {
    if (getItem("token") !== false) {
      setHandleLogin(true);
    } else {
      setHandleLogin(false);
    }
  }, []);

  const handleExit = () => {
    dispatch(closeAction());
    isExit();
  };

  return (
    <Disclosure as="nav" className=" shadow border-b w-full bg-background-900">
      {({ open }) => (
        <>
          <ContainerComponent>
            <LandingSearchModal
              showModal={showModal}
              setShowModal={setShowModal}
            />
            <div className=" mx-auto ">
              <div className="flex justify-between h-20">
                {/* Start Right Panel */}

                <div className="flex px-2 lg:px-0">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block lg:hidden h-10 w-auto"
                      src={IconPic}
                      alt=""
                    />
                    <img
                      className="hidden lg:block h-10 w-auto ml-6"
                      src={IconPic}
                      alt=""
                    />
                  </div>
                  <div className="hidden  lg:flex lg:space-x-8">
                    {navigation.map((item, index) => (
                      <Link
                        key={index}
                        to={item.to}
                        className={
                          (item.to === locationPath
                            ? "text-textHover-600 font-bold border-b-[3px]"
                            : "text-toz ") +
                          " hover:text-textHover-600 hover:font-bold hover:border-b-[3px] border-b-textHover-600 ml-6 inline-flex items-center px-1 pt-1 text-base font-medium mb-0.5"
                        }
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                {/* End Right Panel */}

                {/* Start Search Panel */}
                <div className="flex-1 flex  items-center justify-center px-2 lg:ml-6 lg:justify-start">
                  <div className="w-full sm:w-2/3 lg:max-w-xs">
                    <label htmlFor="search" className=" sr-only">
                      جستجو
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <HiSearch
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>

                      <button
                        onClick={() => handleChange(true)}
                        name="search"
                        type="search"
                        className="block w-full pl-10 pr-3 py-2 h-9 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-button-500 focus:border-button-500 sm:text-sm"
                        placeholder="جستجو"
                      />
                    </div>
                  </div>
                </div>
                {/* End Search Panel */}

                {/* Start Left Panel */}
                {/* Mobile menu button */}
                {/* Edit Here */}

                {handleLogin === true ? (
                  <div className="flex items-center lg:hidden">
                    <Link
                      to="/ShoppingCart"
                      className="relative inline-flex items-center justify-center p-2 rounded-md text-gray-400 focus:text-button-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-button-500"
                    >
                      <HiOutlineShoppingBag
                        className="block h-6 w-6 text-gray-400 focus:text-textHover-600"
                        aria-hidden="true"
                      />
                      {count !== 0 ? (
                        <div className="absolute top-2 right-1 bg-button-700 text-xs rounded-full w-4 h-4 text-white flex justify-center">
                          {count}
                        </div>
                      ) : null}
                    </Link>
                  </div>
                ) : null}
                <div className="flex items-center lg:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-button-500">
                    <span className="sr-only">بازکردن منوی اصلی</span>
                    {open ? (
                      <HiOutlineX
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <HiOutlineMenu
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>

                {/* Desktop menu button */}

                <div className="hidden lg:ml-4 lg:flex lg:items-center">
                  {/* EDIT HERE */}
                  {/* Start cash */}
                  {locationPath === "/ShoppingCart" ? (
                    <div className="flex-1 flex ml-3">
                      <div className="text-gray-400 ml-1">
                        <HiOutlineCurrencyDollar
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      </div>
                      <span className="font-light text-textHead-900 text-sm">
                        <Link
                          to="/panel/Payment"
                          className="ml-2 text-textHead-900"
                        >
                          موجودی کارت:
                        </Link>
                        {cash.length !== 0
                          ? Number(
                              cash[cash.length - 1].invent
                            ).toLocaleString()
                          : 0}{" "}
                        تومان
                      </span>
                    </div>
                  ) : null}

                  {handleLogin === true ? (
                    <Link
                      to="/ShoppingCart"
                      className="relative flex-shrink-0 ml-4  p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      <HiOutlineShoppingBag
                        className="h-6 w-6"
                        aria-hidden="true"
                      />

                      {count !== 0 ? (
                        <div className="absolute top-1 right-0 bg-button-700 text-xs rounded-full w-4 h-4 text-white flex justify-center">
                          {count}
                        </div>
                      ) : null}
                    </Link>
                  ) : (
                    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                      <Link
                        to="/Account/SignIn"
                        className="ml-3 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow text-base font-medium text-gray-500 hover:text-gray-900 bg-white"
                      >
                        ورود
                      </Link>
                      <Link
                        to="/Account/SignUp"
                        className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-button-600 hover:bg-button-700"
                      >
                        ثبت نام
                      </Link>
                    </div>
                  )}
                  {/* End Left Bell */}
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-4 relative flex-shrink-0">
                    {/* EDIT HERE */}
                    {/* Start Left Avatar */}
                    {handleLogin === true ? (
                      <div>
                        <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-500">
                          <span className="sr-only">بازکردن منو</span>
                          <img
                            className="h-9 w-9 rounded-full"
                            src={
                              getItem("user") !== false ? user.profile : NoPic
                            }
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                    ) : null}
                    {/* End Left Avatar */}
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right z-30 absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/panel/Dashboard"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                " block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              داشبورد
                            </Link>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <div
                              onClick={handleExit}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                " block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              خروج
                            </div>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                {/* End Left Panel */}
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {navigation.map((item, index) => (
                  <Link
                    key={index}
                    to={item.to}
                    className={
                      (item.to === locationPath ? "bg-indigo-300  " : null) +
                      " -m-3 p-3 flex items-center rounded-md hover:bg-indigo-300 "
                    }
                  >
                    <item.icon
                      className="flex-shrink-0 h-6 w-6 text-textHover-600 mr-4"
                      aria-hidden="true"
                    />
                    <span className="ml-3 text-base font-medium text-textHead-900 mr-2">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
              {/* EDIT HERE */}
              {/* Start Bottom Panel */}
              {handleLogin === true ? (
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={getItem("user") !== false ? user.profile : NoPic}
                        alt=""
                      />
                    </div>
                    <div className="mx-3">
                      <div className="text-base font-medium text-textHead-800">
                        {getItem("user") !== false ? user.fullName : null}
                      </div>
                      <div className="text-sm font-medium text-toz">
                        {getItem("user") !== false ? user.email : NoPic}
                      </div>
                    </div>
                    {/* <button
                    type="button"
                    className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-500"
                  >
                    <span className="sr-only">دیدن وضعیت</span>
                  </button> */}
                  </div>
                  <div className="mt-3 space-y-1">
                    <Link
                      to="/Panel/Dashboard"
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    >
                      داشبورد
                    </Link>
                    <div
                      onClick={handleExit}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    >
                      خروج
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-6 px-5 space-y-6">
                  <div>
                    <Link
                      to="/Account/SignUp"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-button-600 hover:bg-button-700"
                    >
                      ثبت نام
                    </Link>
                    <p className="mt-6 text-center text-base font-medium text-toz">
                      حساب کاربری دارید؟
                      <Link
                        to="/Account/SignIn"
                        className="text-textHover-600 hover:text-textHover-500 mr-2"
                      >
                        برای ورود کلیک کنید
                      </Link>
                    </p>
                  </div>
                </div>
              )}

              {/* End Bottom Panel */}
            </Disclosure.Panel>
          </ContainerComponent>
        </>
      )}
    </Disclosure>
  );
}
