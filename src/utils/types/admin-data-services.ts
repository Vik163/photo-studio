export type TypeServices =
  | "photo-na-dokumenty"
  | "photo-restavraciya"
  | "photo-dizain"
  | "ritual-photo";

export type AdminServices = {
  type: TypeServices;
  services: AdminOneService[];
};

export interface AdminOneService {
  id: string;
  value: string;
  price?: string;
}

export interface AdminFetchServiceData {
  type: TypeServices;
  id?: string;
  value: FormDataEntryValue;
  price?: FormDataEntryValue;
}

export interface AdminResServiceData {
  type: TypeServices;
  id: string;
  value: string;
  price?: string;
}
