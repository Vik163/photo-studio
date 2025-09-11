export type StatusOrder =
  | "Создан" // редактирование, удаление, no-image, нет скачивания
  | "Отложен" // редактирование, удаление, no-image, нет скачивания
  | "Отменён" // редактирование, удаление, no-image, нет скачивания
  | "Принят" // редактирование, удаление, no-image, нет скачивания
  | "В работе" // no-image, нет скачивания
  | "Выполнен" // готовое фото через фильтр, нет скачивания
  | "Завершён"; // удаление, готовое фото, скачивание

export interface OneOrder {
  orderId: string;
  name: string;
  phone: string;
  service: string;
  message?: string;
  images?: string[];
  completedImages?: string; // src сформированный fileReader  (хранится только в БД)
  status: StatusOrder;
  created: string;
  leftDays: number;
}

export interface Order {
  userId: string;
  orders: OneOrder[];
}

export interface OrdersUser {
  userId: string;
  ordersUser: ResOrderUser[];
}

export interface ResOrderUser {
  orderId: string;
  service: string;
  completedImages?: string;
  status: StatusOrder;
  created: string;
  leftDays: number;
}
