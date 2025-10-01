import { StatusOrder } from "./fetch-data";

export type TypeData = "mail" | "order";

export interface OneOrder {
  orderId: string;
  userName: string;
  phone: string;
  service?: string;
  mail: string;
  images?: string[];
  mailAdmin?: string;
  completedImages?: string[]; // src сформированный fileReader  (хранится только в БД)
  status?: StatusOrder;
  created: string;
  leftDays?: number;
}

export interface AdminData {
  deviceId: string;
  data: OneOrder[];
}

export interface OrdersData {
  mail?: OneOrder;
  mails?: OneOrder[];
  order?: OneOrder;
  orders?: OneOrder[];
}

export interface AdminUpdateData {
  deviceId: string;
  orderId: string;
  mailAdmin?: FormDataEntryValue;
  status?: StatusOrder;
  completedImages?: string[];
}
