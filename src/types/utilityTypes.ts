export type GenericObject = {
  [key: string]: unknown;
};

export type RemoveUndefined<T> = {
  [K in keyof T]: T[K] extends object
    ? RemoveUndefined<NonNullable<T[K]>>
    : NonNullable<T[K]>;
};
