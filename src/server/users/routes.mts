import Router from "express-promise-router";
import { addUser, getUserByEmail } from "./users.mjs";
import { errorMessage, errorMessageWithField } from "../messages.mjs";
import { generateToken, getUserByCredentials } from "./users.mjs";
import type { User } from "../../types/globalTypes";

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
    const user = await addUser(email, password, userName);
    if (!user)
      throw new Error(
        "Something went wrong when creating user. Unable to find user in database"
      );
    const token = generateToken(user);

    res.status(201).jsonp(token);
  }
});

router.get("/login", async (req, res) => {
  let user: User | null = null;
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const credentialsCoded = authHeader.split(" ")[1];
    const decodedCredentials = atob(credentialsCoded);
    const email = decodedCredentials.split(":")[0];
    const password = decodedCredentials.split(":")[1];

    user = await getUserByCredentials(email, password);
  }
  if (user) {
    const token = generateToken(user);
    res.status(200).jsonp(token);
  } else {
    res.status(401).jsonp(errorMessage("AUTHENTICATION_FAILED"));
  }
});

export default router;
