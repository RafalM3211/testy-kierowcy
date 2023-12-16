import path from "path";
import { fileURLToPath } from "url";

export function hasKey<T extends object, K extends PropertyKey>(
  obj: T,
  key: K
): obj is T & Record<K, any> {
  return key in obj;
}

export function addPropToObject<O extends string, V>(
  obj: any,
  key: O,
  value: V
) {
  obj[key] = value;
}

export function getDirname(importMetaUrl: string) {
  const filename = fileURLToPath(importMetaUrl);
  const dirname = path.dirname(filename);
  return dirname;
}

export function isDev() {
  return process.env.REACT_APP_NODE_ENV === "development";
}

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}
