export interface Basket {
  orderId: string;
  service: string;
  message?: string;
  images: string[];
  completedImages?: string; // src сформированный fileReader (хранится только в БД)
  createdAt: string;
  status:
    | "Создан" // редактирование, удаление, no-image, нет скачивания
    | "Отложен" // редактирование, удаление, no-image, нет скачивания
    | "Отменён" // редактирование, удаление, no-image, нет скачивания
    | "Принят" // редактирование, удаление, no-image, нет скачивания
    | "В работе" // no-image, нет скачивания
    | "Выполнен" // готовое фото через фильтр, нет скачивания
    | "Завершён"; // удаление, готовое фото, скачивание
}

export interface OrderData {
  orderId: string;
  name: FormDataEntryValue;
  phone: FormDataEntryValue;
  message?: FormDataEntryValue;
  images?: string[];
  service: FormDataEntryValue;
}

export interface OrderEditData {
  orderId: string;
  message?: FormDataEntryValue;
  images?: string[];
  service: FormDataEntryValue;
}
