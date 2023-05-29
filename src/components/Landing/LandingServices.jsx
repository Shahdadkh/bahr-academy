import {
  HiAcademicCap,
  HiBriefcase,
  HiMail,
  HiUserGroup,
} from "react-icons/hi";
import ContainerComponent from "../common/ContainerComponent/ContainerComponent";

const features = [
  {
    name: "مدرک معتبر",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. ",
    icon: HiAcademicCap,
  },
  {
    name: "مشاوره",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. ",
    icon: HiUserGroup,
  },
  {
    name: "فرصت‌های شغلی",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. ",
    icon: HiBriefcase,
  },
  {
    name: "رزومه کاری",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. ",
    icon: HiMail,
  },
];

export default function LandingServices() {
  return (
    <div className="bg-background-750 overflow-hidden py-10">
      <ContainerComponent>
        <div className="relative max-w-7xl mx-auto py-12">
          <svg
            className="absolute top-0 right-0 left-full transform -translate-x-1/2 -translate-y-3/4 lg:left-full lg:translate-x-1/2 lg:translate-y-1/4"
            width={404}
            height={784}
            fill="none"
            viewBox="0 0 404 784"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="8b1b5f72-e944-4457-af67-0c6d15a99f38"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-300"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={784}
              fill="url(#8b1b5f72-e944-4457-af67-0c6d15a99f38)"
            />
          </svg>

          <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-8">
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-extrabold tracking-tight text-textHead-900 sm:text-4xl lg:leading-tight ">
                بهترین انتخاب برای شروع یادگیری
              </h2>
            </div>
            <dl className="mt-10 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:mt-0 lg:col-span-2">
              {features.map((feature, index) => (
                <div key={index}>
                  <dt>
                    <div className="flex">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-textHover-600 text-white">
                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className=" my-auto mr-7 text-lg leading-6 font-medium text-textHover-600">
                        {feature.name}
                      </p>
                    </div>
                  </dt>
                  <dd className="mt-2 text-base text-toz">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </ContainerComponent>
    </div>
  );
}
