import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ExamQuestion from "./ExamQuestion";
import DummyProviders from "../../../tests/dummyProviders/DummyProviders";
import {
  mockVideoQuestionOnce,
  mockSpecializedQuestionOnce,
} from "../../../tests/mocks";
import * as AnswersContext from "../../../context/Answers/Answers";
import { waitForQuestionLoad } from "../../../tests/utils";

jest.mock("../../patterns/Player/Player"); //HTML video element doen't work in jest environment

const user = userEvent.setup({ delay: null });

async function assertPrepareState() {
  const mediaCover = await screen.findByText(/Kliknij aby wyświetlić/i);
  const prepareStateLabel = await screen.findByText(
    /Czas na zapoznanie się z pytaniem/i
  );

  expect(mediaCover).toBeInTheDocument();
  expect(prepareStateLabel).toBeInTheDocument();
}

async function assertAnswerState() {
  const mediaCover = screen.queryByText(/Kliknij aby wyświetlić/i);
  const answerStateLabel = await screen.findByText(/Czas na odpowiedź/i);
  expect(mediaCover).not.toBeInTheDocument();
  expect(answerStateLabel).toBeInTheDocument();
}

describe("prepare state and transition to answer state", () => {
  it("displays media cover and correct timer label on prepare state in basic image qustion", async () => {
    //arrange

    //act
    render(
      <DummyProviders>
        <ExamQuestion />
      </DummyProviders>
    );

    //assert
    await assertPrepareState();
  });

  it("displays media cover and correct timer label on prepare state in basic video qustion", async () => {
    //arrange
    mockVideoQuestionOnce();

    //act
    render(
      <DummyProviders>
        <ExamQuestion />
      </DummyProviders>
    );

    //assert
    await assertPrepareState();
  });

  it("after 20 seconds media cover disappears and timer label changes", async () => {
    //arrange
    render(
      <DummyProviders>
        <ExamQuestion />
      </DummyProviders>
    );
    await waitForQuestionLoad();

    //act
    act(() => {
      jest.advanceTimersByTime(40 * 1000 + 1);
    });

    //assert
    await assertAnswerState();
  });

  it("when user clicks media cover it disappears and timer label changes", async () => {
    //arrange
    render(
      <DummyProviders>
        <ExamQuestion />
      </DummyProviders>
    );
    const mediaCover = await screen.findByText(/Kliknij aby wyświetlić/i);

    //act
    await act(async () => {
      await user.click(mediaCover);
    });

    //assert
    assertAnswerState();
  });
});

describe("answer state and transition to next question", () => {
  it("calls addAnswer with false when selected 'nie' answer and clicked next question", async () => {
    //arrange
    const addAnswerMock = jest.fn();
    const answersSpy = jest
      .spyOn(AnswersContext, "useAnswersContext")
      .mockReturnValue({
        answeredQuestions: [],
        addAnswer: addAnswerMock,
        clearAnswers: jest.fn(),
      });

    render(
      <DummyProviders>
        <ExamQuestion />
      </DummyProviders>
    );

    const trueButton = await screen.findByRole("button", { name: "tak" });
    const nextQuestionButton = await screen.findByRole("button", {
      name: "Następne pytanie",
    });

    //act
    await act(async () => {
      await user.click(trueButton);
    });
    await act(async () => {
      await user.click(nextQuestionButton);
    });

    //assert
    expect(addAnswerMock).toBeCalledWith(expect.anything(), true);
    answersSpy.mockRestore();
  });

  it("calls addAnswer with B when selected 'B' answer and clicked next question", async () => {
    //arrange
    mockSpecializedQuestionOnce();

    const addAnswerMock = jest.fn();
    const answersSpy = jest
      .spyOn(AnswersContext, "useAnswersContext")
      .mockReturnValue({
        answeredQuestions: [],
        addAnswer: addAnswerMock,
        clearAnswers: jest.fn(),
      });

    render(
      <DummyProviders>
        <ExamQuestion />
      </DummyProviders>
    );

    const trueButton = await screen.findByRole("button", { name: "B" });
    const nextQuestionButton = await screen.findByRole("button", {
      name: "Następne pytanie",
    });

    //act
    await act(async () => {
      await user.click(trueButton);
    });
    await act(async () => {
      await user.click(nextQuestionButton);
    });

    //assert
    expect(addAnswerMock).toBeCalledWith(expect.anything(), "B");
    answersSpy.mockRestore();
  });

  it("moves to next question after 50 seconds on specialized question", async () => {
    //arrange
    mockSpecializedQuestionOnce();
    render(
      <DummyProviders>
        <ExamQuestion />
      </DummyProviders>
    );

    const timerLabel = await screen.findByRole("heading", {
      name: /czas na odpowiedź/i,
    });
    const questionCount = await screen.findByText(/\d\/20/i);

    //act
    expect(questionCount.innerHTML).toBe("1/20");
    act(() => {
      jest.advanceTimersByTime(50 * 1000 + 1);
    });

    //assert
    expect(timerLabel.innerHTML).toBe("Czas na odpowiedź");
    expect(questionCount.innerHTML).toBe("2/20");
  });

  it("moves to next question after 20 seconds on basic question", async () => {
    //arrange
    render(
      <DummyProviders>
        <ExamQuestion />
      </DummyProviders>
    );
    const questionCount = await screen.findByText(/\d\/20/i);
    const mediaCover = await screen.findByText(/Kliknij aby wyświetlić/i);
    await act(async () => {
      await user.click(mediaCover); //move to answer state
    });

    //act
    expect(questionCount.innerHTML).toBe("1/20");
    act(() => {
      jest.advanceTimersByTime(20 * 1000 + 1);
    });

    //assert
    const timerLabel = await screen.findByRole("heading", {
      name: /czas na zapoznanie się z pytaniem/i,
    });
    expect(timerLabel).toBeInTheDocument();
    expect(questionCount.innerHTML).toBe("2/20");
  });

  it("moves to next question after next question clicked", async () => {
    //arrange
    render(
      <DummyProviders>
        <ExamQuestion />
      </DummyProviders>
    );
    const nextButton = await screen.findByRole("button", {
      name: /następne pytanie/i,
    });
    const questionCount = await screen.findByText(/\d\/20/i);

    //act
    expect(questionCount.innerHTML).toBe("1/20");
    await act(async () => {
      await user.click(nextButton);
    });

    //assert
    const timerLabel = await screen.findByRole("heading", {
      name: /czas na zapoznanie się z pytaniem/i,
    });
    expect(timerLabel).toBeInTheDocument();
    expect(questionCount.innerHTML).toBe("2/20");
  });
});
