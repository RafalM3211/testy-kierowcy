import express from "express";
import cors from "cors";
import session from "express-session";
import { getQuestionById } from "./dbApi.mjs";
import { sendImage, streamVideo, allowedMediaExtensions } from "./media.mjs";

console.log("START");

const server = express();

server.use(express.json());
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
    resave: false,
  })
);

const tempQuestionsIDs = [
  6301, 6302, 6304, 7131, 2420, 2430, 2432, 2990, 2438, 6339, 7130, 10060,
];

server.get("/question", (req, res) => {
  const questionId = Math.floor(Math.random() * 10);
  const question = getQuestionById(tempQuestionsIDs[questionId]);
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

server.listen(3001, () => {
  console.log("server is running on port 3001!");
});
