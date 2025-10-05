export type TypeServices =
  | "photo-na-dokumenty"
  | "photo-restavraciya"
  | "photo-dizain"
  | "retual-photo";

export type AdminServices = {
  [key in TypeServices]?: AdminOneService[];
};

export interface AdminOneService {
  service: string;
  price?: number;
}

export interface AdminFetchServiceData {
  type: TypeServices;
  service: FormDataEntryValue;
  price?: FormDataEntryValue;
}

export interface AdminResServiceData {
  type: TypeServices;
  service: string;
  price?: string;
}
