import { Link } from "react-router-dom";

export default function NoData() {
  return (
    <>
      <div className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="max-w-max mx-auto">
          <main className="sm:flex mt-10">
            <p className="mt-16 text-4xl font-extrabold text-indigo-600 sm:text-5xl mx-3">
              503
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="mt-16 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  دریافت دیتا موفقیت آمیز نبود
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  لطفا بعد از مدتی صفحه را رفرش کنید
                </p>
              </div>
              <div className="block sm:flex">
                <div className="mt-6 flex space-x-3 sm:border-l sm:border-transparent sm:pl-4">
                  <Link
                    to="/"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    ورود به صفحه اصلی
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
