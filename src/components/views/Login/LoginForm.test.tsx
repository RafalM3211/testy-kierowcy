import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DummyProviders from "../../../tests/dummyProviders/DummyProviders";
import LoginForm from "./subcomponents/LoginForm";

interface ValidationEntry {
  description: string;
  errorMessage: string;
  email: string;
  password: string;
}

const validationProvider: ValidationEntry[] = [
  {
    description: "shows expected error message when email is incorrect",
    errorMessage: "niepoprwany adres email",
    email: "wrongmail@",
    password: "password",
  },
  {
    description: "shows expected error message when email is empty",
    errorMessage: "to pole jest wymagane",
    email: "[KeyA][Backspace]",
    password: "password",
  },
  {
    description: "shows expected error message when password is empty",
    errorMessage: "to pole jest wymagane",
    email: "correct@mail.com",
    password: "[KeyA][Backspace]",
  },
];

it("doesn't show any errors when inputs are correct and button isn't disabled", async () => {
  //arrange
  const user = userEvent.setup();
  jest.useRealTimers();
  render(
    <DummyProviders>
      <LoginForm />
    </DummyProviders>
  );
  const emailInput = await screen.findByLabelText("email*");
  const passwordInput = await screen.findByLabelText("hasło*");
  const signinButton = await screen.findByRole("button", { name: "zaloguj" });
  const clickaway = await screen.findByTestId("clickaway");

  //act
  await user.type(emailInput, "anna@example.com");
  await user.type(passwordInput, "password");
  await user.click(clickaway);

  //assert
  expect(screen.queryByText("niepoprwany adres email")).not.toBeInTheDocument();
  expect(signinButton).not.toBeDisabled();
});

describe("Validation", () => {
  validationProvider.forEach(
    ({ description, errorMessage, email, password }) => {
      it(description, async () => {
        const user = userEvent.setup();
        jest.useRealTimers();
        render(
          <DummyProviders>
            <LoginForm />
          </DummyProviders>
        );
        const emailInput = await screen.findByLabelText("email*");
        const passwordInput = await screen.findByLabelText("hasło*");
        const signinButton = await screen.findByRole("button", {
          name: "zaloguj",
        });
        const clickaway = await screen.findByTestId("clickaway");

        //act
        await user.type(emailInput, email);
        await user.type(passwordInput, password);
        await user.click(clickaway);

        //assert
        expect(screen.queryByText(errorMessage)).toBeInTheDocument();
        expect(signinButton).toBeDisabled();
      });
    }
  );

  /* it("Shows error message and button is disabled when input is incorrect ", async () => {
    //arrange
    const user = userEvent.setup();
    jest.useRealTimers();
    render(
      <DummyProviders>
        <LoginForm />
      </DummyProviders>
    );
    const emailInput = await screen.findByLabelText("email*");
    const signinButton = await screen.findByRole("button", { name: "zaloguj" });
    const clickaway = await screen.findByTestId("clickaway");

    //act
    await user.type(emailInput, "wrongmail");
    await user.click(clickaway);

    //assert
    expect(screen.queryByText("niepoprwany adres email")).toBeInTheDocument();
    expect(signinButton).toBeDisabled();
  }); */
});
