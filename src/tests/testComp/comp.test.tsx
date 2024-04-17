import { render, screen, fireEvent } from "@testing-library/react";
import Comp from "./comp";
import { helper } from "./helper";
import DummyProviders from "../dummyProviders/DummyProviders";
import { userEvent } from "@testing-library/user-event";

jest.mock("./helper");

beforeEach(() => {
  (helper as jest.Mock).mockReturnValue(5);
});

it.skip("first", async () => {
  const user = userEvent.setup();
  jest.useRealTimers();

  render(
    <DummyProviders>
      <Comp />
    </DummyProviders>
  );
});
