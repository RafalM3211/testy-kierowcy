import { rest } from "msw";
import { basic } from "./dummyQuestion/dummyQuestions";

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

const apiUrl = process.env.REACT_APP_SERVER_URL;

export const handlers = [
  rest.get(apiUrl + "question", (req, res, ctx) => {
    console.log("mocked!");
    return res(ctx.json(basic), ctx.delay(0), ctx.status(200));
  }),
  rest.get(apiUrl + "resetEgzamSession", (req, res, ctx) => {
    console.log("mocked!");
    return res(ctx.delay(0), ctx.status(200));
  }),
];
