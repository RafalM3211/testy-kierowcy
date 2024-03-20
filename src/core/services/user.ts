import { appApi } from "../clients/appApi";

interface Credentials {
  email: string;
  password: string;
}

interface RegisterValues extends Credentials {
  userName?: string;
}

export async function tryLogin(credentials: Credentials) {
  const { email, password } = credentials;
  const auth = btoa(`${email}:${password}`);
  return await appApi.get("users/login", {
    headers: {
      Authorization: `Basic ${auth}`,
    },
    credentials: "include",
  });
}

export async function register(body: RegisterValues) {
  return await appApi.post("users/register", body, {
    credentials: "include",
  });
}
