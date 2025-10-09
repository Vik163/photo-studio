import { StatusOrder } from "./fetch-data";

interface SelectValueDefault {
  value: string;
  iconLink?: string;
  iconAlt?: string;
}

interface SelectValues {
  value: StatusOrder;
  iconLink?: string;
  iconAlt?: string;
}

export interface SelectData {
  content: SelectValues[];
  default: SelectValueDefault;
}
