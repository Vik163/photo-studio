export interface Basket {
  orderId: string;
  service: string;
  message?: string;
  images: string[];
  completedImages?: string;
  createdAt: string;
  status:
    | "Создан"
    | "Отложен"
    | "Отменён"
    | "Принят"
    | "В работе"
    | "Выполнен"
    | "Завершён";
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
