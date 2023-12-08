import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotEnv from "dotenv";
import { getNextExamQuestion } from "./db/dbApi.mjs";
import { sendImage, streamVideo, allowedMediaExtensions } from "./media.mjs";
import { isDev } from "./helpers.mjs";
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

server.get("/question", async (req, res) => {
  const session = req.session;
  if (!session.questions) {
    session.questions = [];
  }

  const wihoutFirst = [...session.questions].splice(1);

  const question = await getNextExamQuestion(
    isDev() ? wihoutFirst : session.questions
  );
  session.questions.push(question);

  //console.log(session.questions[session.questions.length - 1].id);

  session.save();
  res.status(200).jsonp(question);
});

server.get("/media/:fileName", (req, res) => {
  const { fileName } = req.params;
  const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
  if (allowedMediaExtensions.includes(fileExtension)) {
    if (fileExtension === "jpg") {
      sendImage(req, res);
    } else {
      streamVideo(req, res);
    }
  } else {
    const errorMessage =
      "wrong media extension. Supported extensions are: " +
      allowedMediaExtensions.join(", ");
    console.error(errorMessage);
    res.status(400).send(errorMessage);
  }
});

server.get("/resetExamSession", (req, res) => {
  const session = req.session;
  session.questions = [];
  session.save();
  res.sendStatus(200);
});

server.listen(3001, () => {
  console.log("server is running on port 3001!");
});
