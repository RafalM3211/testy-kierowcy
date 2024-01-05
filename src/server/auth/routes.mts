import Router from "express-promise-router";
import { getUserByCredentials } from "../users/users.mjs";
import { generateToken } from "./auth.mjs";
import type { User } from "../../types/globalTypes";
import { errorMessage } from "../messages.mjs";

const router = Router();

router.get("/", async (req, res) => {
  let user: User | null = null;
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const credentialsCoded = authHeader.split(" ")[1];
    const decodedCredentials = atob(credentialsCoded);
    const email = decodedCredentials.split(":")[0];
    const password = decodedCredentials.split(":")[1];

    user = await getUserByCredentials({ email, password });
  }
  if (user) {
    const token = generateToken(user);
    res.status(200).jsonp(token);
  } else {
    res.status(401).jsonp(errorMessage("AUTHENTICATION_FAILED"));
  }
});

export default router;
