// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { handlers } from "./tests/mocks";
import { mockWindowLocation, restoreWindowLocation } from "./tests/mocks";

const server = setupServer(...handlers);

beforeAll(() => {
  mockWindowLocation();
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  restoreWindowLocation();
  server.close();
});
