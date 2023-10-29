import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route } from "react-router-dom";
import * as answersContext from "../../../context/Answers/Answers";
import PreviewQuestion from "./PreviewQuestion";
import {
  answeredBasic,
  basicWithVideo,
  answeredSpecialized,
} from "../../../tests/dummyQuestion/dummyQuestions";
import DummyProviders from "../../../tests/dummyProviders/DummyProviders";
import { act } from "react-dom/test-utils";

const dummyId = answeredBasic.id + 342;
const anotherBasic = { ...answeredBasic, id: dummyId };
const dummyAnswers = [
  answeredSpecialized,
  answeredBasic,
  basicWithVideo,
  anotherBasic,
];
const answersSpyBase = {
  answeredQuestions: dummyAnswers,
  addAnswer: jest.fn(),
  clearAnswers: jest.fn(),
};
const answersSpy = jest.spyOn(answersContext, "useAnswersContext");

const user = userEvent.setup({ delay: null });

beforeEach(() => {
  answersSpy.mockReturnValue(answersSpyBase);
});

function renderQuestionWithId(id: number = answeredBasic.id) {
  const routeElements = (
    <Route path="/question/:id" element={<PreviewQuestion />} />
  );
  render(
    <DummyProviders routes={routeElements} initialEntries={["/question/" + id]}>
      <PreviewQuestion />
    </DummyProviders>
  );
}

describe("answer button click", () => {
  it("answer button does not click on basic question", async () => {
    //arrange
    renderQuestionWithId();
    const yesAnswerButton = screen.getByRole("button", { name: "tak" });

    //act
    await act(async () => {
      await user.click(yesAnswerButton);
    });

    //assert
    expect(yesAnswerButton).not.toHaveAttribute("aria-pressed", true);
  });

  it("answer button does not click on specialized question", async () => {
    //arrange
    renderQuestionWithId(answeredSpecialized.id);
    const answerButton = screen.getByText("A", { exact: true });

    //act
    act(() => {
      user.click(answerButton);
    });

    //assert
    await waitFor(() => {
      expect(answerButton).not.toHaveAttribute("aria-pressed", true);
    });
  });
});

describe("next and previous quesiton buttons", () => {
  it("Next question button is disabled on last question", () => {
    //arrange
    const lastAnswer = dummyAnswers[dummyAnswers.length - 1];
    renderQuestionWithId(lastAnswer.id);

    //act
    const previousButton = screen.getByRole("button", { name: /poprzednie/i });
    const nextButton = screen.getByRole("button", { name: /następne/i });

    //assert
    expect(nextButton).toBeDisabled();
    expect(previousButton).not.toBeDisabled();
  });

  it("Previous button is disabled on last question", () => {
    //arrange
    const firstAnswer = dummyAnswers[0];
    renderQuestionWithId(firstAnswer.id);

    //act

    const nextButton = screen.getByRole("button", { name: /następne/i });
    const previousButton = screen.getByRole("button", { name: /poprzednie/i });

    //assert
    expect(previousButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });
});

describe("question media", () => {
  it("doesn't show media cover", () => {
    //arrange
    renderQuestionWithId();

    //act
    const mediaCover = screen.queryByText(/Kliknij aby wyświetlić/i);

    //assert
    expect(mediaCover).not.toBeInTheDocument();
  });
});
