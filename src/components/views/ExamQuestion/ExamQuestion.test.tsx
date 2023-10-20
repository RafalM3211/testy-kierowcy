import { render, screen, act } from "@testing-library/react";
import ExamQuestion from "./ExamQuestion";
import DummyProviders from "../../../tests/dummyProviders/DummyProviders";
import { mockVideoQuestionOnce } from "../../../tests/mocks";
import userEvent from "@testing-library/user-event";

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
  test("displays media cover and correct timer label on prepare state in basic image qustion", async () => {
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

  test("displays media cover and correct timer label on prepare state in basic video qustion", async () => {
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

  test("after 20 seconds media cover disappears and timer label changes", async () => {
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

  test("when user clicks media cover it disappears and timer label changes", async () => {
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

describe("answer state and transition to next question", () => {});
