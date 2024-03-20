import express from "express";
import env from "./env.mjs";
import cors from "cors";
import cookieParser from "cookie-parser";
import exam from "./exam/routes.mjs";
import media from "./media/routes.mjs";
import users from "./users/routes.mjs";
import type { Question } from "../types/globalTypes";

console.log("START");

const server = express();

server.use(express.json());
server.use(cookieParser("randomvaluegeneratedinfuture"));
server.use(
  cors({
    origin: true,
    credentials: true,
  })
);

server.use("/exam", exam);
server.use("/media", media);
server.use("/users", users);

server.listen(3001, () => {
  console.log("server is running on port 3001!");
});
