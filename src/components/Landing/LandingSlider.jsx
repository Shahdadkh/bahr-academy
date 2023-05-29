import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import Typewriter from "typewriter-effect";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Img1 from "../../assets/images/slider/01.jpg";
import Img2 from "../../assets/images/slider/02.jpg";
import Img3 from "../../assets/images/slider/03.jpg";
import { Link } from "react-router-dom";

const Slider = () => {
  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={30}
        centeredSlides={false}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-[450px] md:h-[650px] relative"
      >
        <SwiperSlide>
          <img className="absolute w-full h-full" src={Img1} alt="" />
          <div className="bg-slate-800 opacity-80 h-full relative">
            <div className="absolute bg-slate-700 rounded-lg px-4 py-2 left-10 right-10 mx-auto md:right-auto top-16 sm:w-1/2 xl:w-1/4">
              <p className="text-2xl text-textHover-500 text-center">دوره ها</p>
              <div className=" h-48">
                <span className="text-gray-200 text-center m-5 leading-10">
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .typeString(
                          "ما خودمون بهترین بازار سرمایه هستیم چرا روی استعدادهای خودمون سرمایه‌گذاری نکنیم؟ "
                        )
                        .start();
                    }}
                  />
                </span>
              </div>
              <div>
                <Link to="/Course">
                  <button className="px-3 block w-fit mx-auto py-2 bg-button-700 hover:bg-button-800 rounded-full">
                    <span className="text-textHover-200">دوره ها</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img className="absolute w-full h-full" src={Img2} alt="" />
          <div className="bg-slate-800 opacity-80 h-full relative">
            <div className="absolute bg-slate-700 rounded-lg px-4 py-2 m-auto left-10 right-10 top-16 md:top-40  sm:w-1/2 xl:w-1/4">
              <p className="text-2xl text-textHover-500 text-center">
                اخبار و مقالات
              </p>
              <div className=" h-48">
                <span className="text-gray-200 text-center m-5 leading-10">
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .typeString(
                          "ما خودمون بهترین بازار سرمایه هستیم چرا روی استعدادهای خودمون سرمایه‌گذاری نکنیم؟ "
                        )
                        .start();
                    }}
                  />
                </span>
              </div>
              <div>
                <Link to="/News">
                  <button className="px-3 block w-fit mx-auto py-2 bg-button-700 hover:bg-button-800 rounded-full">
                    <span className="text-textHover-200">اخبار و مقالات</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img className="absolute w-full h-full" src={Img3} alt="" />
          <div className="bg-slate-800 opacity-80 h-full relative">
            <div className="absolute bg-slate-700 rounded-lg px-4 py-2 top-16 md:top-auto md:bottom-20 right-10 left-10 sm:left-auto mx-auto sm:w-1/2 xl:w-1/4">
              <p className="text-2xl text-textHover-500 text-center">اساتید</p>
              <div className=" h-48">
                <span className="text-gray-200 text-center m-5 leading-10">
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .typeString(
                          "ما خودمون بهترین بازار سرمایه هستیم چرا روی استعدادهای خودمون سرمایه‌گذاری نکنیم؟ "
                        )
                        .start();
                    }}
                  />
                </span>
              </div>
              <div>
                <Link to="/Teachers">
                  <button className="px-3 block w-fit mx-auto py-2 bg-button-700 hover:bg-button-800 rounded-full">
                    <span className="text-textHover-200">اساتید</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
export default Slider;
