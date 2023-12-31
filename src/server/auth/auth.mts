import jwt from "jsonwebtoken";
import env from "../env.mjs";
import { getUsersWhere } from "../db/dbApi.mjs";
import { withoutProperty } from "../helpers.mjs";
import type { Credentials, User } from "../../types/globalTypes";

export async function getUserByCredentials(credentials: Credentials) {
  const email = credentials.email;
  const password = credentials.password;
  const users = await getUsersWhere(
    "email=$1 AND password=crypt($2, password)",
    [email, password]
  );

  let user: User | null = null;

  if (users.length > 1) {
    throw `Too many rows returned: ${users.length}. Should return only one user. There's an email duplicate in the table`;
  } else if (users.length === 1) {
    const withPassword = users[0];
    user = withoutProperty(withPassword, "password");
  }

  return user;
}

export function generateToken(user: User) {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const token = jwt.sign(payload, env.jwt.secret, {
    algorithm: "HS256",
    expiresIn: "1h",
    audience: env.jwt.audience,
    issuer: env.jwt.issuer,
  });

  return token;
}
