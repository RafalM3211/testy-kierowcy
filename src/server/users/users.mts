import { getUsersWhere, insertUser } from "../db/dbApi.mjs";
import { withoutProperty } from "../helpers.mjs";
import type { Credentials, User } from "../../types/globalTypes";

async function getOneUserWhere(conditions: string, values: any[]) {
  const users = await getUsersWhere(conditions, values);

  let user: User | null = null;

  if (users.length > 1) {
    throw `Too many rows returned: ${users.length}. Should return only one user. There's an email duplicate in the table`;
  } else if (users.length === 1) {
    const withPassword = users[0];
    user = withoutProperty(withPassword, "password");
  }

  return user;
}

export async function getUserByCredentials(credentials: Credentials) {
  const email = credentials.email;
  const password = credentials.password;

  const user = await getOneUserWhere(
    "email=$1 AND password=crypt($2, password)",
    [email, password]
  );
  return user;
}

export async function getUserByEmail(email: string) {
  const user = await getOneUserWhere("email=$1", [email]);
  return user;
}

export async function addUser(
  email: string,
  password: string,
  name?: string | undefined
) {
  const trimmedName = name?.trim() || null;
  insertUser(email, password, trimmedName);
}
