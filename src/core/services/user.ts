import type { Credentials } from "../../types/globalTypes";
import { appApi } from "../clients/appApi";

export async function tryLogin(credentials: Credentials) {
  const { email, password } = credentials;
  const auth = btoa(`${email}:${password}`);
  return await appApi.get("auth", {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
}
