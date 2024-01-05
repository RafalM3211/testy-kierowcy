import Router from "express-promise-router";

import { addUser, getUserByEmail } from "./users.mjs";
import { errorMessage, errorMessageWithField } from "../messages.mjs";
import { generateToken } from "../auth/auth.mjs";

const router = Router();

router.post("/register", async (req, res) => {
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
    addUser(email, password, userName);
    const user = await getUserByEmail(email);
    if (!user)
      throw new Error(
        "Something went wrong when creating user. Unable to find user in database"
      );
    const token = generateToken(user);

    res.status(201).jsonp(token);
  }
});

export default router;
