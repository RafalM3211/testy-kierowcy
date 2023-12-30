import dotEnv from "dotenv";
import type { RemoveUndefined } from "../types/utilityTypes";
import { isObject } from "./helpers.mjs";

dotEnv.config();

const env = {
  jwt: {
    secret: process.env.JWT_SECRET,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
  },
};

function lookForUndefined(obj: {}) {
  Object.entries(obj).forEach(([key, value]) => {
    if (value === undefined)
      throw new Error("environment variable " + key + " is undefined");
    if (value !== null) {
      if (isObject(value)) lookForUndefined(value);
    }
  });
}

lookForUndefined(env);

export default env as RemoveUndefined<typeof env>;
