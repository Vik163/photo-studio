import type { Services } from "@/utils/types/works-data";
import home1 from "@/assets/images/dfg2.jpg";
import home2 from "@/assets/images/dizain.png";
import home3 from "@/assets/images/restoration2.jpg";

export const servicesData: Services[] = [
  {
    title: "Фото на документы",
    imgB: home1,
    imgS: home1,
    pathName: "photo-na-dokumenty",
  },
  {
    title: "Фотомонтаж Фотодизайн",
    imgB: home2,
    imgS: home2,
    pathName: "photo-dizain",
  },
  {
    title: "Реставрация фотографий",
    imgB: home3,
    imgS: home3,
    pathName: "photo-restavraciya",
  },
];
