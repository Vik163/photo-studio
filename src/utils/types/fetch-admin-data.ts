import { Message, StatusOrder } from "./fetch-data";

export interface OneOrder {
  orderId: string;
  name: string;
  phone: string;
  service?: string;
  mail?: string;
  images?: string[];
  completedImages?: string; // src сформированный fileReader  (хранится только в БД)
  status?: StatusOrder;
  created: string;
  leftDays?: number;
}

export interface AdminOrders {
  deviceId: string;
  ordersUser: OneOrder[];
}

export interface AdminMessages {
  deviceId: string;
  messages: OneOrder[];
}
