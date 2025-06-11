// Record - тайпскриптовый тип, который обозначает, что в качестве
// ключа будет string, а в качестве значения boolean | string
export type Mods = Record<string, boolean | string | undefined>;

// принимает 1 арг. - главный класс,
// 2 арг. - объект с модами, у которых как ключ - название класса, значение - boolean
// 3 арг. - дополнительные классы
export function classNames(
    cls: string,
    mods: Mods = {},
    additional: Array<string | undefined> = [],
): string {
    return [
        cls,
        ...additional.filter(Boolean),
        // с помощью Object.entries можем получить как ключи, так и значения у объекта
        ...Object.entries(mods)
            .filter(([_, value]) => Boolean(value)) // фильтруем на true
            .map(([className]) => className), // создаем массив с оставшимися значениями
    ].join(' '); // объединяем в строку
}
