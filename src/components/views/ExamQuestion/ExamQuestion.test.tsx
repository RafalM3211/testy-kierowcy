import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import ExamQuestion from "./ExamQuestion";
import DummyProviders from "../../../tests/dummyProviders/DummyProviders";
import { mockVideoQuestionOnce } from "../../../tests/mocks";

jest.mock("react", () => {
  const original = jest.requireActual("react");

  return {
    ...original,
    useRef: () => {
      return {
        current: {
          seekTo: jest.fn(),
        },
      };
    },
  };
});

jest.mock("../../patterns/Player/Player", () => {
  const { forwardRef } = jest.requireActual("react");

  const PlayerMock = forwardRef(() => {
    return <div>video player mock</div>;
  });

  return {
    __esModule: true,
    canPlay: jest.fn(() => true),
    default: PlayerMock,
  };
});

async function assertPrepareState() {
  const mediaCover = await screen.findByText(/Kliknij aby wyświetlić/i);
  const prepareStateLabel = await screen.findByText(
    /Czas na zapoznanie się z pytaniem/i
  );

  expect(mediaCover).toBeInTheDocument();
  expect(prepareStateLabel).toBeInTheDocument();
}

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
  await screen.findByText(/Następne pytanie/i);
});
