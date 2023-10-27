import { render } from "@testing-library/react";
import Comp from "./comp";
import { helper } from "./helper";

jest.mock("./helper");

beforeEach(() => {
  (helper as jest.Mock).mockReturnValue(5);
});

it("first", () => {
  render(<Comp />);
});

it("second", () => {
  render(<Comp />);
});
