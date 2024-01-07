import { appApi } from "../clients/appApi";

interface Credentials {
  email: string;
  password: string;
}

interface RegisterValues extends Credentials {
  userName?: string;
}

export async function tryLogin(credentials: Credentials) {
  //todo: w auth headerze wysyła sie token a nie email i haslo. Email i hasło majaa byc w body

  const { email, password } = credentials;
  const auth = btoa(`${email}:${password}`);
  return await appApi.get("auth", {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
}

export async function register(body: RegisterValues) {
  return await appApi.post("users/register", body);
}
