import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ExamQuestion from "./ExamQuestion";
import DummyProviders from "../../../tests/dummyProviders/DummyProviders";
import {
  mockVideoQuestionOnce,
  mockSpecializedQuestionOnce,
} from "../../../tests/mocks";
import * as AnsewersContext from "../../../context/Ansewers/Ansewers";

import { rest } from "msw";
import {
  basic,
  basicWithVideo,
  specialized,
} from "../../../tests/dummyQuestion/dummyQuestions";
import { server } from "../../../setupTests";

jest.mock("../../patterns/Player/Player", () => {
  const { forwardRef } = jest.requireActual("react");

  const PlayerMock = forwardRef((props: any, ref: any) => {
    ref.current = {
      seekTo: jest.fn(),
    };
    return <div>video player mock</div>;
  });

  return {
    __esModule: true,
    canPlay: jest.fn(() => true),
    default: PlayerMock,
  };
});

const user = userEvent.setup({ delay: null });

async function assertPrepareState() {
  const mediaCover = await screen.findByText(/Kliknij aby wyświetlić/i);
  const prepareStateLabel = await screen.findByText(
    /Czas na zapoznanie się z pytaniem/i
  );

  expect(mediaCover).toBeInTheDocument();
  expect(prepareStateLabel).toBeInTheDocument();
}

function assertAnswerState() {
  const mediaCover = screen.queryByText(/Kliknij aby wyświetlić/i);
  const answerStateLabel = screen.getByText(/Czas na odpowiedź/i);
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

    //act
    act(() => {
      jest.advanceTimersByTime(40 * 1000 + 1);
    });

    //assert
    assertAnswerState();
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
  it("calls addAnsewer with false when selected 'nie' answer and clicked next question", async () => {
    //arrange
    const addAnsewerMock = jest.fn();
    const ansewersSpy = jest
      .spyOn(AnsewersContext, "useAnsewersContext")
      .mockReturnValue({
        anseweredQuestions: [],
        addAnsewer: addAnsewerMock,
        clearAnsewers: jest.fn(),
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
    expect(addAnsewerMock).toBeCalledWith(expect.anything(), true);
    ansewersSpy.mockRestore();
  });

  it("calls addAnsewer with B when selected 'B' answer and clicked next question", async () => {
    //arrange
    mockSpecializedQuestionOnce();

    const addAnsewerMock = jest.fn();
    const ansewersSpy = jest
      .spyOn(AnsewersContext, "useAnsewersContext")
      .mockReturnValue({
        anseweredQuestions: [],
        addAnsewer: addAnsewerMock,
        clearAnsewers: jest.fn(),
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
    expect(addAnsewerMock).toBeCalledWith(expect.anything(), "B");
    ansewersSpy.mockRestore();
  });
});
