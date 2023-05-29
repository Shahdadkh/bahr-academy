import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  HiBookOpen,
  HiPresentationChartLine,
  HiMenuAlt2,
  HiPencilAlt,
  HiChevronDown,
  HiKey,
  HiHeart,
  HiOutlineShoppingBag,
  HiCreditCard,
  HiOutlineCurrencyDollar,
  HiAcademicCap,
  HiPuzzle,
} from "react-icons/hi";
import Logo from "../../assets/images/Logo.svg";
import NoPic from "../../assets/images/NoImage.png";
import { Link, Outlet, useLocation } from "react-router-dom";
import { closeAction } from "../../features/Root/RootSlice";
import { useDispatch, useSelector } from "react-redux";
import { getItem } from "../../core/services/LocalStorage";

const navigationList = [
  {
    name: "داشبورد",
    to: "/panel/Dashboard",
    icon: HiPresentationChartLine,
    current: true,
  },
  {
    name: "همه‌ی دوره‌ها",
    to: "/panel/AllCourses",
    icon: HiBookOpen,
    current: false,
  },
  {
    name: "دوره‌های من",
    to: "/panel/Courses",
    icon: HiAcademicCap,
    current: false,
  },
  {
    name: "علاقمندی‌ها",
    to: "/panel/Favourite",
    icon: HiHeart,
    current: false,
  },
  {
    name: "کارت الکترونیکی",
    to: "/panel/Payment",
    icon: HiCreditCard,
    current: false,
  },
  {
    name: "ویرایش پروفایل",
    to: "/panel/ProfileEdit",
    icon: HiPencilAlt,
    current: false,
  },
  {
    name: "تغییر رمز عبور",
    to: "/panel/PasswordChange",
    icon: HiKey,
    current: false,
  },
  {
    name: "تغییر تم ",
    to: "/panel/ThemeChange",
    icon: HiPuzzle,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PanelLayout({ isExit }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navigation] = useState(navigationList);
  const locationPath = useLocation().pathname;
  const dispatch = useDispatch();
  const count = useSelector((state) => state.basketList.length);
  const cash = useSelector((state) => state.payList);
  const user = getItem("user") !== false ? JSON.parse(getItem("user")) : null;

  const handleChange = () => {
    window.localStorage.clear();
    dispatch(closeAction());
    isExit();
  };

  const userNavigation = [
    { name: "صفحه اصلی", to: "/", isChange: null },
    { name: "خارج شدن از اکانت", to: "/", isChange: handleChange },
  ];

  return (
    <>
      <div className="bg-background-800 h-screen">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-toz bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-button-700">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2"></div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src={Logo}
                    alt="آکادمی برنامه نویسی بحر"
                  />
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigation.map((item, index) => (
                      <Link
                        key={index}
                        to={item.to}
                        className={
                          (item.to === locationPath
                            ? "bg-button-500 text-white "
                            : "text-indigo-100 hover:bg-button-600 ") +
                          " group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        }
                      >
                        <item.icon
                          className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-background-900">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow pt-5 bg-button-700 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img className="h-8 w-auto" src={Logo} alt="" />
            </div>
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1 mt-5">
                {navigation.map((item, index) => (
                  <Link
                    key={index}
                    to={item.to}
                    className={
                      (item.to === locationPath
                        ? " bg-textHover-800 text-white "
                        : " text-indigo-100 hover:bg-textHover-600 ") +
                      " group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    }
                  >
                    <item.icon
                      className="mr-3 flex-shrink-0 h-6 w-6 text-textHover-300 ml-1"
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-background-900 shadow">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-toz focus:outline-none focus:ring-2 focus:ring-inset focus:ring-button-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <HiMenuAlt2 className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <Link to="/">
                <div className="flex mt-3">
                  <img className="w-10 h-10" src={Logo} alt="" />
                  <h2 className="leading-15 mt-2 indent-2 hidden sm:block text-textHead-900">
                    آکادمی برنامه نویسی بحر
                  </h2>
                </div>
              </Link>

              <div className="ml-4 flex items-center md:ml-6">
                <div className="hidden flex-1 md:flex ml-3">
                  <div className="text-toz ml-1">
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
                      ? Number(cash[cash.length - 1].invent).toLocaleString()
                      : 0}
                    تومان
                  </span>
                </div>

                <div className="relative flex ml-3">
                  <Link
                    to="/ShoppingCart"
                    className="inline-flex items-center justify-center p-2 rounded-md text-toz hover:text-toz hover:bg-background-800 focus:outline-none"
                  >
                    <HiOutlineShoppingBag
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                    {count !== 0 ? (
                      <div className="absolute top-2 right-1 bg-button-700 text-xs rounded-full w-4 h-4 text-white flex justify-center">
                        {count}
                      </div>
                    ) : null}
                  </Link>
                </div>

                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs bg-background-800 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">باز کردن منو</span>
                      <img
                        className="h-9 w-9 rounded-full"
                        src={getItem("user") !== false ? user.profile : NoPic}
                        alt=""
                      />
                      <HiChevronDown
                        className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute left-0 mt-3 w-40 rounded-md shadow-lg py-2 bg-background-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              to={item.to}
                              onClick={item.isChange}
                              className={classNames(
                                active ? "bg-gray-100 " : "",
                                "block px-4 py-2 text-sm text-toz hover:bg-background-600"
                              )}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main>
            <div className="md:py-6">
              <div className="w-full lg:ml-10 lg:mx-auto px-4 sm:px-6 lg:w-3/4 md:px-8 bg-background-700 md:rounded-3xl">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
