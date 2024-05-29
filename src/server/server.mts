import express from "express";
import env from "./env.mjs";
import cors from "cors";
import cookieParser from "cookie-parser";
import questions from "./question/routes.mjs";
import media from "./media/routes.mjs";
import users from "./users/routes.mjs";

console.log("START");

const server = express();

server.use(express.json());
server.use(cookieParser(env.cookie.secret));
server.use(
  cors({
    origin: true,
    credentials: true,
  })
);

server.use("/question", questions);
server.use("/media", media);
server.use("/users", users);

server.listen(3001, () => {
  console.log("server is running on port 3001!");
});
