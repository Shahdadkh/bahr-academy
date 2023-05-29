import { Link } from "react-router-dom";
import ContainerComponent from "../common/ContainerComponent/ContainerComponent";

export default function LandingSignIn() {
  return (
    <div className="bg-textHover-700">
      <ContainerComponent>
        <div className="text-center py-16 sm:py-20">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">ایده‌هاتو گسترش بده</span>
            <span className="block">و همین حالا آغاز به کار کن</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-textHover-200">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است.
          </p>
          <Link
            to={
              localStorage.getItem("token")
                ? "/Panel/Dashboard"
                : "/Account/SignUp"
            }
            className="mt-8 w-fit inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-textHover-600 bg-white hover:bg-indigo-50"
          >
            {localStorage.getItem("token")
              ? "وارد پنل کاربری خود شوید"
              : "به رایگان ثبت‌ نام کنید"}
          </Link>
        </div>
      </ContainerComponent>
    </div>
  );
}
