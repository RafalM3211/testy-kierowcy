import { createReadStream, statSync } from "fs";
import { getDirname } from "./helpers.mjs";
import type { EndpointHandler } from "./types.mjs";

export const allowedMediaExtensions = ["jpg", "mp4"];

export const streamVideo: EndpointHandler = function (req, res) {
  const { fileName } = req.params;
  const range = req.headers.range;
  if (range === undefined) {
    res.status(400).send("Range header is not provided");
  } else {
    const filePath =
      getDirname(import.meta.url) + "/db/temporaryMedia/" + fileName;
    const fileSize = statSync(filePath).size;
    const chunkSize = 10 ** 6; //1Mb
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, fileSize - 1);
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Content-Length": end - start + 1,
      "Accept-Ranges": "bytes",
      "Content-Type": "video/mp4",
    });
    const stream = createReadStream(filePath, { start, end });
    stream.pipe(res);
  }
};

export const sendImage: EndpointHandler = function (req, res) {
  const { fileName } = req.params;
  const filePath =
    getDirname(import.meta.url) + "/db/temporaryMedia/" + fileName;
  const fileSize = statSync(filePath).size;
  res.writeHead(206, {
    "Content-Length": fileSize,
    "Content-Type": "image/jpg",
  });
  const stream = createReadStream(filePath);
  stream.pipe(res);
};
