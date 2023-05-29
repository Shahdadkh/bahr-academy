import NoPic from "../../assets/images/NoImage.png";
import bahrololoomi_a3c4 from "../../assets/images/APIimg/teacher/bahrololoomi_a3c4.jpg";
import heidar_h14i from "../../assets/images/APIimg/teacher/heidar_h14i.jpg";
import mohsen_w6gt from "../../assets/images/APIimg/teacher/mohsen_w6gt.jpg";
import salar_jpwd from "../../assets/images/APIimg/teacher/salar_jpwd.jpg";

const result = [
  {
    image: bahrololoomi_a3c4,
    name: "دکتر سید محمدحسین بحرالعلومی",
    _id: 1,
    email: "bahrololoomi@gmail.com",
    discription: "دکتری هوش مصنوعی, شاه شاهان",
  },
  {
    image: heidar_h14i,
    name: "مهندس حیدر صفری",
    _id: 2,
    email: "heidar@gmail.com",
    discription: "فول استک دولوپر",
  },
  {
    image: salar_jpwd,
    name: "مهندس سالار نیلی",
    _id: 5,
    email: "salar@gmail.com",
    discription: "Senior menior duper  super asp.net core developer",
  },
  {
    image: mohsen_w6gt,
    name: "مهندس محسن اسفندیاری",
    _id: 6,
    email: "mohsen@gmail.com",
    discription: "چنیور فرانت اند",
  },
  {
    image: NoPic,
    name: "مهندس محمدحسین خلیل پور",
    _id: 4,
    email: "khalilpour@gmail.com",
    discription: "سنیور ری اکت نیتیو",
  },
];

export const GetAllTeacherAPI = () => {
  return result;
};
