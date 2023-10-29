import * as path from "path";
import * as fs from "fs";
import { rest } from "msw";
import {
  basic,
  basicWithVideo,
  specialized,
} from "./dummyQuestion/dummyQuestions";
import { server } from "../setupTests";

const originalLocation = window.location;

declare const window: {
  location?: Location;
};

export const mockWindowLocation = () => {
  delete window.location;

  window.location = Object.defineProperties(originalLocation, {
    ...Object.getOwnPropertyDescriptors(originalLocation),
  });
};

export const restoreWindowLocation = () => {
  window.location = originalLocation;
};

export function mockVideoQuestionOnce() {
  server.use(
    rest.get(apiUrl + "question", (req, res, ctx) => {
      return res(ctx.json(basicWithVideo), ctx.delay(0), ctx.status(200));
    })
  );
}

export function mockSpecializedQuestionOnce() {
  server.use(
    rest.get(apiUrl + "question", (req, res, ctx) => {
      return res(ctx.json(specialized), ctx.delay(0), ctx.status(200));
    })
  );
}

const apiUrl = process.env.REACT_APP_SERVER_URL;

export const handlers = [
  rest.get(apiUrl + "question", (req, res, ctx) => {
    console.log("mocked question!");
    return res(ctx.json(basic), ctx.delay(0), ctx.status(200));
  }),
  rest.get(apiUrl + "resetExamSession", (req, res, ctx) => {
    console.log("mocked session reset!");
    return res(ctx.delay(0), ctx.status(200));
  }),
  rest.get(apiUrl + "media/:fileName", (req, res, ctx) => {
    console.log("mock media");

    const imageBuffer = fs.readFileSync(
      path.resolve(__dirname, "../fixtures/image.jpg")
    );

    return res(
      ctx.set("Content-Length", imageBuffer.byteLength.toString()),
      ctx.set("Content-Type", "image/jpeg"),
      ctx.body(imageBuffer)
    );
  }),
];
