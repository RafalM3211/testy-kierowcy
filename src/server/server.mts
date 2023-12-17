import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotEnv from "dotenv";
import exam from "./exam/routes.mjs";
import media from "./media/routes.mjs";
import type { Question } from "../types/globalTypes";

declare module "express-session" {
  interface SessionData {
    questions: Question[];
  }
}

console.log("START");

dotEnv.config();

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

server.listen(3001, () => {
  console.log("server is running on port 3001!");
});
