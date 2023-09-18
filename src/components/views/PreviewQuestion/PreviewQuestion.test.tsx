import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route } from "react-router-dom";
import * as ansewersContext from "../../../context/Ansewers/Ansewers";
import PreviewQuestion from "./PreviewQuestion";
import {
  anseweredBasic,
  basicWithVideo,
  anseweredSpecialized,
} from "../../../tests/dummyQuestion/dummyQuestions";
import DummyProviders from "../../../tests/dummyProviders/DummyProviders";

const dummyId = anseweredBasic.id + 342;
const anotherBasic = { ...anseweredBasic, id: dummyId };
const dummyAnsewers = [
  anseweredSpecialized,
  anseweredBasic,
  basicWithVideo,
  anotherBasic,
];
const ansewersSpyBase = {
  anseweredQuestions: dummyAnsewers,
  addAnsewer: jest.fn(),
  clearAnsewers: jest.fn(),
};
const ansewersSpy = jest.spyOn(ansewersContext, "useAnsewersContext");

beforeEach(() => {
  ansewersSpy.mockReturnValue(ansewersSpyBase);
});

function renderQuestionWithId(id: number = anseweredBasic.id) {
  const routeElements = (
    <Route path="/question/:id" element={<PreviewQuestion />} />
  );
  render(
    <DummyProviders routes={routeElements} initialEntries={["/question/" + id]}>
      <PreviewQuestion />
    </DummyProviders>
  );
}

describe("ansewer button click", () => {
  it("ansewer button does not click on basic question", async () => {
    //arrange
    renderQuestionWithId();
    const yesAnsewerButton = screen.getByRole("button", { name: "tak" });
    const user = userEvent.setup();

    //act
    await user.click(yesAnsewerButton);

    //assert
    expect(yesAnsewerButton).not.toHaveAttribute("aria-pressed", true);
  });

  it("ansewer button does not click on specialized question", async () => {
    //arrange
    renderQuestionWithId(anseweredSpecialized.id);
    const ansewerButton = screen.getByText("A", { exact: true });
    const user = userEvent.setup();

    //act
    await user.click(ansewerButton);

    //assert
    expect(ansewerButton).not.toHaveAttribute("aria-pressed", true);
  });
});

describe("next and previous quesiton buttons", () => {
  it("Next question button is disabled on last question", () => {
    //arrange
    const lastAnsewer = dummyAnsewers[dummyAnsewers.length - 1];
    renderQuestionWithId(lastAnsewer.id);

    //act
    const previousButton = screen.getByRole("button", { name: /poprzednie/i });
    const nextButton = screen.getByRole("button", { name: /następne/i });

    //assert
    expect(nextButton).toBeDisabled();
    expect(previousButton).not.toBeDisabled();
  });

  it("Previous button is disabled on last question", async () => {
    //arrange
    const firstAnsewer = dummyAnsewers[0];
    renderQuestionWithId(firstAnsewer.id);

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
