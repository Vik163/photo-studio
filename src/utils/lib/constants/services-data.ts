import type { Services } from "@/utils/types/services-types";
import home1 from "@/assets/images/home-1.jpg";
import home2 from "@/assets/images/home-2.jpg";
import home3 from "@/assets/images/home-3.jpg";

export const servicesData: Services[] = [
  {
    title: "Фото на документы",
    imgB: home1,
    imgS: home1,
    pathName: "pathname",
    description: "description1",
  },
  {
    title: "Фотомонтаж Фотодизайн",
    imgB: home2,
    imgS: home2,
    pathName: "pathname",
    description: "description2",
  },
  {
    title: "Реставрация старых фотографий",
    imgB: home3,
    imgS: home3,
    pathName: "pathname",
    description: "description3",
  },
  {
    title: "Title4",
    imgB: home1,
    imgS: home1,
    pathName: "pathname",
    description: "description4",
  },
];
