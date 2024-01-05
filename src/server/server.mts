import express from "express";
import env from "./env.mjs";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import exam from "./exam/routes.mjs";
import media from "./media/routes.mjs";
import auth from "./auth/routes.mjs";
import users from "./users/routes.mjs";
import type { Question } from "../types/globalTypes";

declare module "express-session" {
  interface SessionData {
    questions: Question[];
  }
}

console.log("START");

const server = express();
const memoryStore = new session.MemoryStore();

server.use(express.json());
server.use(cookieParser("randomvaluegeneratedinfuture"));
server.use(
  cors({
    origin: true,
    credentials: true,
  })
);
server.use(
  session({
    secret: "randomvaluegeneratedinfuture",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
    store: memoryStore,
    resave: false,
  })
);

server.use("/exam", exam);
server.use("/media", media);
server.use("/auth", auth);
server.use("/users", users);

server.listen(3001, () => {
  console.log("server is running on port 3001!");
});
