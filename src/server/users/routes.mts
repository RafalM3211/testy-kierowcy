import Router from "express-promise-router";
import { addUser, getUserByEmail } from "./users.mjs";
import { errorMessage, errorMessageWithField } from "../messages.mjs";
import { getUserByCredentials } from "./users.mjs";
import {
  generateToken,
  JWTCookieOptions,
  sanitizeBody,
} from "./authentication.mjs";
import type { User } from "../../types/globalTypes";

const router = Router();

router.post("/register", async (req, res) => {
  sanitizeBody(req);
  const { email, userName, password } = req.body;

  if (!email) {
    res.status(400).jsonp(errorMessageWithField("NOT_PROVIDED", "email"));
  }
  if (!password) {
    res.status(400).jsonp(errorMessageWithField("NOT_PROVIDED", "password"));
  }

  const userExist = !!(await getUserByEmail(email));

  if (userExist) {
    res.status(400).jsonp(errorMessage("USER_EXISTS"));
  } else {
    const user = await addUser(email, password, userName);
    if (!user)
      throw new Error(
        "Something went wrong when creating user. Unable to find user in database"
      );
    const token = generateToken(user);

    res.status(201).cookie("jwt", token, JWTCookieOptions).send();
  }
});

router.post("/login", async (req, res) => {
  let user: User | null = null;
  sanitizeBody(req);
  const { email, password } = req.body;

  if (email && password) {
    user = await getUserByCredentials(email, password);
    console.log(user);
  }
  if (user) {
    const token = generateToken(user);
    res.status(200).cookie("jwt", token, JWTCookieOptions).send();
  } else {
    res.status(401).jsonp(errorMessage("AUTHENTICATION_FAILED"));
  }
});

export default router;
