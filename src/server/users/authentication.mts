import jwt from "jsonwebtoken";
import env from "../env.mjs";
import type { User } from "../../types/globalTypes";
import type { CookieOptions, Request } from "express";

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

export const JWTCookieOptions: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure: true,
  maxAge: 1000 * 3600 * 24,
};

export function sanitizeBody(req: Request) {
  Object.entries(req.body).forEach(([key, value]) => {
    req.body[key] = sanitize(value as string);
  });
}

export function sanitize(text: string) {
  const forbiddenCharacters = "`-=~!@#$%^&*()_+[]{}'\"\\;:,.<>/?";

  let sanitizedText = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (!forbiddenCharacters.includes(char)) {
      sanitizedText += char;
    }
  }

  return sanitizedText;
}
