import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import ExamQuestion from "./ExamQuestion";
import DummyProviders from "../../../tests/dummyProviders/DummyProviders";
import { server } from "../../../setupTests";
import { basicWithVideo } from "../../../tests/dummyQuestion/dummyQuestions";

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
  screen.debug();
  const mediaCover = await screen.findByText(/Kliknij aby wyświetlić/i);
  const prepareStateLabel = await screen.findByText(
    /Czas na zapoznanie się z pytaniem/i
  );

  expect(mediaCover).toBeInTheDocument();
  expect(prepareStateLabel).toBeInTheDocument();
}

const apiUrl = process.env.REACT_APP_SERVER_URL;

function mockVideoQuestionOnce() {
  server.use(
    rest.get(apiUrl + "question", (req, res, ctx) => {
      return res.once(ctx.json(basicWithVideo), ctx.delay(0), ctx.status(200));
    })
  );
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
  await screen.findByText(/Następne pytanie/i);
});
