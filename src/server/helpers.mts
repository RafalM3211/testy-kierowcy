import type { anyObject } from "../types/globalTypes";
import path from "path";
import { fileURLToPath } from "url";

export function hasKey<T extends object, K extends PropertyKey>(
  obj: T,
  key: K
): obj is T & Record<K, any> {
  return key in obj;
}

export function addPropToObject<O extends string, V>(
  obj: anyObject,
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
