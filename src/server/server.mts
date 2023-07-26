import jsonServer from "json-server";
import * as fs from "fs";
import { getQuestionById } from "./dbApi.mjs";
import { getDirname } from "./helpers.mjs";
import type { EndpointHandler } from "./types.mjs";

console.log("START");

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

const tempQuestionsIDs = [
  6301, 6302, 6304, 7131, 2420, 2430, 2432, 2990, 2438, 6339, 7130, 10060,
];

server.get("/question", (req, res) => {
  const questionId = Math.floor(Math.random() * 10);
  const question = getQuestionById(tempQuestionsIDs[questionId]);
  res.status(200).jsonp(question);
});

server.get("/media/:fileName", (req, res) => {
  streamVideo(req, res);
});

const streamVideo: EndpointHandler = function (req, res) {
  const { fileName } = req.params;
  const range = req.headers.range;
  if (range === undefined) {
    res.status(400).send("Range header is not provided");
  } else {
    const filePath =
      getDirname(import.meta.url) + "/db/temporaryMedia/" + fileName;
    const fileSize = fs.statSync(filePath).size;
    const chunkSize = 10 ** 6; //1Mb
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, fileSize - 1);
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Content-Length": end - start + 1,
      "Accept-Ranges": "bytes",
      "Content-Type": "video/mp4",
    });
    const stream = fs.createReadStream(filePath, { start, end });
    stream.pipe(res);
  }
};

server.listen(3001, () => {
  console.log("server is running on port 3001!");
});
