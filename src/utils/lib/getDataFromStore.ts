// import { clamps } from '@/utils/consts/products/clamps/clamps';
// import { drySystemMontage } from '@/utils/consts/products/sdmData/sdmData';
// import { industrialFasteners } from '@/utils/consts/products/industrial-fasteners/industrial-fasteners';
// import { profFasteners } from '@/utils/consts/products/prof-fasteners/prof-fasteners';
// import {
//    LOCALSTORAGE_CATEGORY_OF_PRODUCT,
//    LOCALSTORAGE_PRODUCT_ID,
//    LOCALSTORAGE_TYPE_OF_PRODUCT,
// } from '@/utils/consts/storage';
// import type { Categories, ViewName, ViewProducts } from '@/utils/types/catalog';

// /**
//  *  возвращает view по данным в localStorage
//  */
// export const getDataByView = (): ViewProducts => {
//    const typeProducts = localStorage.getItem(
//       LOCALSTORAGE_TYPE_OF_PRODUCT,
//    ) as ViewName;

//    switch (typeProducts) {
//       case 'Промышленный крепеж':
//          return industrialFasteners;

//       case 'Профессиональный крепеж':
//          return profFasteners;

//       case 'Система сухого монтажа':
//          return drySystemMontage;

//       case 'Хомуты':
//          return clamps;

//       default:
//          return drySystemMontage;
//    }
// };

// /**
//  *   возвращает category по данным в localStorage
//  */
// export const getDataByCategory = () => {
//    const viewProducts: ViewProducts = getDataByView();
//    const categoriesProducts = localStorage.getItem(
//       LOCALSTORAGE_CATEGORY_OF_PRODUCT,
//    )! as Categories;

//    if (viewProducts[categoriesProducts])
//       return viewProducts[categoriesProducts];
// };

// /**
//  *  возвращает карту по id в localStorage
//  */
// export const getDataById = () => {
//    const categoryProducts = localStorage.getItem(
//       LOCALSTORAGE_CATEGORY_OF_PRODUCT,
//    )! as Categories;
//    const idCard = localStorage.getItem(LOCALSTORAGE_PRODUCT_ID);

//    if (categoryProducts) {
//       const category = getDataByCategory();
//       if (category)
//          if (idCard) {
//             return category.find((card) => card.cardId === idCard);
//          }
//    }
// };
