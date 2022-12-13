export type AllOrNone<T> = Required<T> | Partial<Record<keyof T, undefined>>
