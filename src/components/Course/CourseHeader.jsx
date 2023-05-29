import ContainerComponent from "./../common/ContainerComponent/ContainerComponent";
export default function CourseHeader() {
  return (
    <div className="bg-background-700 overflow-hidden">
      <ContainerComponent>
        <div className="relative">
          <div
            className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full"
            aria-hidden="true"
          >
            <div className="relative h-full max-w-7xl mx-auto">
              <svg
                className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
                width={404}
                height={784}
                fill="none"
                viewBox="0 0 404 784"
              >
                <defs>
                  <pattern
                    id="f210dbf6-a58d-4871-961e-36d5016a0f49"
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
                  fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
                />
              </svg>
              <svg
                className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
                width={404}
                height={784}
                fill="none"
                viewBox="0 0 404 784"
              >
                <defs>
                  <pattern
                    id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
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
                  fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
                />
              </svg>
            </div>
          </div>

          <div className="relative pt-6 pb-16 sm:pb-24">
            <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-textHead-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">
                    آکادمی برنامه‌نویسی بحر
                  </span>{" "}
                  {/* <span className="block text-indigo-600 xl:inline">
                online business
              </span> */}
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-toz sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد.
                </p>
              </div>
            </main>
          </div>
        </div>
      </ContainerComponent>
    </div>
  );
}
