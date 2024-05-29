import { screen } from "@testing-library/react";

export const userEventEmptyInput = "[KeyA][Backspace]";

export async function waitForQuestionLoad() {
  try {
    await screen.findAllByText(/id pytania/i);
  } catch {
    throw new Error(
      "Timeou for question load exceeded. Couldn't find element matching /id pytania/i"
    );
  }
}
