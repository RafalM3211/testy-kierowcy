import { render, screen } from "@testing-library/react";
import { useParams } from "react-router-dom";
import { useAnsewersContext } from "../../../context/Ansewers/Ansewers";
import PreviewQuestion from "./PreviewQuestion";
import { basic } from "../../../tests/dummyQuestion/dummyQuestions";

jest.mock("../../../context/Ansewers/Ansewers");
jest.mock("react-router-dom");

beforeEach(() => {
  (useAnsewersContext as jest.Mock).mockReturnValue({
    anseweredQuestions: [basic],
  });
  (useParams as jest.Mock).mockReturnValue({ id: String(basic.id) });
});

test("renders", () => {
  render(<PreviewQuestion />);
});
