import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div className="bg-background-800 min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="max-w-max mx-auto">
          <main className="sm:flex mt-10">
            <p className="mt-16 text-4xl font-extrabold text-indigo-600 sm:text-5xl mx-3">
              404
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="mt-16 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  صفحه موردنظر یافت نشد.
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  لطفا دوباره تلاش کنید.
                </p>
              </div>
              <div className="block sm:flex mx-auto w-fit">
                <div className="mt-6 flex space-x-3 sm:border-l sm:border-transparent sm:pl-4">
                  <Link
                    to="/"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    بازگشت به صفحه اصلی
                  </Link>
                </div>
                <div className="mt-6 flex space-x-3 sm:border-l sm:border-transparent sm:pl-4">
                  <Link
                    to="/Course"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    دوره ها
                  </Link>
                </div>
                <div className="mt-6 flex space-x-3 sm:border-l sm:border-transparent sm:pl-4">
                  <Link
                    to="/News"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    اخبار و مقالات
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
