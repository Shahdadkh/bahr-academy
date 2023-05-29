import { Disclosure } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
import { motion } from "framer-motion";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CourseDetailCourses({ courseData }) {
  return (
    <div className="mx-auto px-8 pb-6">
      <div className="bg-background-700">
        <div className="max-w-7xl mx-auto">
          <div className="divide-y-2 divide-gray-300">
            <dl className="mt-6 space-y-6 divide-y divide-gray-300">
              {/* {courseData.map((faq) => ( */}
              {courseData.lesson.topics.map((feature, index) => (
                <Disclosure as="div" key={index} className="pt-6">
                  {({ open }) => (
                    <>
                      <motion.dt
                        className="text-lg"
                        whileHover={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                      >
                        <Disclosure.Button className="text-left w-full flex justify-between items-start text-textHead-800">
                          <span className="font-small text-textHead-800">
                            {/* {courseData.lesson.topics} */}
                            {feature}
                          </span>
                          <span className="ml-6 h-7 flex items-center">
                            <HiChevronDown
                              className={classNames(
                                open ? "-rotate-180" : "rotate-0",
                                "h-6 w-6 transform"
                              )}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </motion.dt>

                      <Disclosure.Panel as="dd" className="mt-2 pl-12">
                        <motion.p
                          initial={{ y: -100 }}
                          animate={{ y: 0 }}
                          className="text-base text-toz"
                        >
                          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                          چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون
                          بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و
                          برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع
                          با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی
                          در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه
                          و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را
                          برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ
                          پیشرو در زبان فارسی ایجاد کرد.{" "}
                        </motion.p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
