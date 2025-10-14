interface SelectValueDefault {
  value: string;
  iconLink?: string;
  iconAlt?: string;
}

interface SelectValues {
  value: string;
  iconLink?: string;
  iconAlt?: string;
}

export interface SelectData {
  content: SelectValues[];
  default?: SelectValueDefault;
}
