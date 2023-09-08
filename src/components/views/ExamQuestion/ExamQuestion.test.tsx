import { render, screen } from "@testing-library/react";
import ExamQuestion from "./ExamQuestion";
import DummyProviders from "../../../tests/dummyProviders/DummyProviders";

test("renders", async () => {
  render(
    <DummyProviders>
      <ExamQuestion />
    </DummyProviders>
  );

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("a");
    }, 10);
  });
});
