import Support from "../../assets/images/customer-support.jpg";
import ContainerComponent from "../common/ContainerComponent/ContainerComponent";

export default function LandingSupport() {
  return (
    <div className="bg-button-700 mt-10">
      <ContainerComponent>
        <div className="relative">
          <div className="h-56 bg-button-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
            <img className="w-full h-full object-cover" src={Support} alt="" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16 mt-14">
            <div className="md:ml-auto md:w-1/2 md:pl-10">
              <h2 className="text-base font-semibold uppercase tracking-wider text-gray-300">
                بهترین اساتید برتر
              </h2>
              <p className="mt-2 text-white text-3xl font-extrabold tracking-tight sm:text-4xl">
                ما کنارتان هستیم
              </p>
              <p className="mt-3 text-lg text-gray-300">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
              </p>
              <div className="mt-8"></div>
            </div>
          </div>
        </div>
      </ContainerComponent>
    </div>
  );
}
