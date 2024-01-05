import jwt from "jsonwebtoken";
import env from "../env.mjs";
import type { User } from "../../types/globalTypes";

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
