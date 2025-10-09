export type StatusOrder =
  | "Создан" // редактирование, удаление, no-image, нет скачивания
  | "Отложен" // редактирование, удаление, no-image, нет скачивания
  | "Отменён" // удалён админом
  | "Принят" // редактирование, удаление, no-image, нет скачивания
  | "Выполнен" // готовое фото через фильтр, нет скачивания
  | "Оплачен" // готовое фото, скачивание
  | "Завершён"; // удаление, готовое фото, скачивание

export interface Basket {
  orderId: string;
  service: string;
  mail?: string;
  mailAdmin?: string;
  images: string[];
  completedImages?: string[]; // src сформированный fileReader (хранится только в БД)
  created: string;
  status: StatusOrder;
}

export interface OrderData {
  orderId: string;
  name: FormDataEntryValue;
  phone: FormDataEntryValue;
  mail?: FormDataEntryValue;
  images?: string[];
  service: FormDataEntryValue;
}

export interface OrderEditData {
  orderId: string;
  mail?: FormDataEntryValue;
  images?: string[];
  service: FormDataEntryValue;
}

export interface MessagesData {
  orderId: string;
  name: FormDataEntryValue;
  phone: FormDataEntryValue;
  mail: FormDataEntryValue;
}

export interface Message {
  orderId: string;
  mail: string;
  mailAdmin?: string;
  created: string;
}

export interface MessageEditData {
  orderId: string;
  mail: FormDataEntryValue;
}
