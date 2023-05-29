import Pic1 from "../../assets/images/landingDastebandi/amniat.svg";
import Pic2 from "../../assets/images/landingDastebandi/backend.svg";
import Pic3 from "../../assets/images/landingDastebandi/design.svg";
import Pic4 from "../../assets/images/landingDastebandi/frontend.svg";
import Pic5 from "../../assets/images/landingDastebandi/middle.svg";
import ContainerComponent from "./../common/ContainerComponent/ContainerComponent";

const categories = [
  {
    name: "فیزیک",
    role: "Copywriter",
    imageUrl: Pic1,
    twitterUrl: "/",
    linkedinUrl: "/",
  },
  {
    name: "ریاضی",
    role: "Copywriter",
    imageUrl: Pic2,
    twitterUrl: "/",
    linkedinUrl: "/",
  },
  {
    name: "شیمی",
    role: "Copywriter",
    imageUrl: Pic3,
    twitterUrl: "/",
    linkedinUrl: "/",
  },
  {
    name: "کامپیوتر",
    role: "Copywriter",
    imageUrl: Pic4,
    twitterUrl: "/",
    linkedinUrl: "/",
  },
  {
    name: "صنعت",
    role: "Copywriter",
    imageUrl: Pic5,
    twitterUrl: "/",
    linkedinUrl: "/",
  },
  {
    name: "معماری",
    role: "Copywriter",
    imageUrl: Pic2,
    twitterUrl: "/",
    linkedinUrl: "/",
  },
];

export default function LandingCategory() {
  return (
    <div className="bg-background-750 py-20">
      <ContainerComponent>
        <div className="py-12 text-center lg:py-12">
          <div className="space-y-12">
            <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
              <h2 className="text-3xl text-textHead-900 font-extrabold tracking-tight sm:text-4xl">
                دسته‌بندی‌ها
              </h2>
            </div>
            <ul className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-6 lg:max-w-5xl">
              {categories.map((category) => (
                <li key={category.name}>
                  <div className="space-y-6 ">
                    <img
                      className="mx-auto h-28 w-28 rounded-full xl:w-24 xl:h-24"
                      src={category.imageUrl}
                      alt=""
                    />
                    <div className="space-y-2">
                      <div className="text-lg leading-6 font-medium space-y-1 text-toz">
                        <h3>{category.name}</h3>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ContainerComponent>
    </div>
  );
}
