import type { Services } from "@/utils/types/services-types";
import home1 from "@/assets/images/dfg.jpg";
import home2 from "@/assets/images/dizain.png";
import home3 from "@/assets/images/home-3.jpg";

export const servicesData: Services[] = [
  {
    title: "Фото на документы",
    imgB: home1,
    imgS: home1,
    pathName: "photo-na-dokumenty",
    description: "description1",
  },
  {
    title: "Фотомонтаж Фотодизайн",
    imgB: home2,
    imgS: home2,
    pathName: "photo-montazh-dizain",
    description: "description2",
  },
  {
    title: "Реставрация фотографий",
    imgB: home3,
    imgS: home3,
    pathName: "photo-restavraciya",
    description: "description3",
  },
];
