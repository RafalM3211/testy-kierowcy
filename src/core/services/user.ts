import { User } from "../../types/globalTypes";
import { noRedirectApi, primaryApi } from "../clients/apis";

interface Credentials {
  email: string;
  password: string;
}

interface RegisterValues extends Credentials {
  userName?: string;
}

export async function signIn(body: Credentials) {
  return await primaryApi.post("users/signin", body, {
    credentials: "include",
  });
}

export async function signOut() {
  return await primaryApi.post("users/signout", {}, { credentials: "include" });
}

export async function register(body: RegisterValues) {
  return await primaryApi.post("users/register", body, {
    credentials: "include",
  });
}

export async function checkToken() {
  const res = await noRedirectApi.get("users/check-token", {
    credentials: "include",
  });
  return (await res.json()) as User;
}
