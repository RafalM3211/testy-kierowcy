import * as path from "path";
import * as fs from "fs";
import { rest } from "msw";
import {
  basicWithVideo,
  specialized,
  exam,
} from "./dummyQuestion/dummyQuestions";
import { user } from "./fixtures/fixtures";
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
    rest.get(apiUrl + "exam", (req, res, ctx) => {
      return res(
        ctx.json({ basic: [basicWithVideo], specialized: [specialized] }),
        ctx.delay(0),
        ctx.status(200)
      );
    })
  );
}

export function mockSpecializedQuestionOnce() {
  server.use(
    rest.get(apiUrl + "question/get-exam", (req, res, ctx) => {
      return res(
        ctx.json({ basic: [specialized], specialized: [specialized] }),
        ctx.delay(0),
        ctx.status(200)
      );
    })
  );
}

const apiUrl = process.env.REACT_APP_SERVER_URL;

export const handlers = [
  rest.get(apiUrl + "users/check-token", (req, res, ctx) => {
    return res(ctx.json(user), ctx.delay(0), ctx.status(200));
  }),
  rest.post(apiUrl + "users/signin", (req, res, ctx) => {
    return res(ctx.delay(0), ctx.status(200));
  }),
  rest.post(apiUrl + "users/signout", (req, res, ctx) => {
    return res(ctx.json(user), ctx.delay(0), ctx.status(200));
  }),
  rest.get(apiUrl + "question/get-exam", (req, res, ctx) => {
    return res(ctx.json(exam), ctx.delay(0), ctx.status(200));
  }),
  rest.post(apiUrl + "question/send-answer", (req, res, ctx) => {
    return res(ctx.json(exam), ctx.delay(0), ctx.status(200));
  }),
  rest.get(apiUrl + "media/:fileName", (req, res, ctx) => {
    console.log("mock media");

    const imageBuffer = fs.readFileSync(
      path.resolve(__dirname, "./dummyQuestion/question.jpg")
    );

    return res(
      ctx.set("Content-Length", imageBuffer.byteLength.toString()),
      ctx.set("Content-Type", "image/jpeg"),
      ctx.body(imageBuffer)
    );
  }),
];
