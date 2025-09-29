import type { SelectData } from "../types/select-data";

export const ADMIN_STATUS: SelectData = {
  default: { value: "Статус" },
  content: [
    { value: "Отложен" },
    { value: "Отменён" },
    { value: "Принят" },
    { value: "В работе" },
    { value: "Выполнен" },
    { value: "Завершён" },
  ],
};
