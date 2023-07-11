import type { anyObject } from "../types/globalTypes";

export function addPropToObject<O extends string, V>(
  obj: anyObject,
  key: O,
  value: V
) {
  obj[key] = value;
}
