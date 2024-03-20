import { appApi } from "../clients/appApi";

interface Credentials {
  email: string;
  password: string;
}

interface RegisterValues extends Credentials {
  userName?: string;
}

export async function tryLogin(body: Credentials) {
  return await appApi.post("users/login", body, {
    credentials: "include",
  });
}

export async function register(body: RegisterValues) {
  return await appApi.post("users/register", body, {
    credentials: "include",
  });
}
