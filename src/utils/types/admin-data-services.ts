export type TypeServices =
  | "photo-na-dokumenty"
  | "photo-restavraciya"
  | "photo-dizain"
  | "retual-photo";

export type AdminServices = {
  [key in TypeServices]?: ServicesBlock;
};

export interface ServicesBlock {
  title: string;
  services: AdminOneService[];
}

export interface AdminOneService {
  service: string;
  image?: string;
  price?: number;
}
export type AdminFetchServices = {
  [key in TypeServices]: AdminFetchServiceData;
};

export interface AdminFetchServiceData {
  service?: FormDataEntryValue;
  price?: FormDataEntryValue;
  image?: string[];
}
