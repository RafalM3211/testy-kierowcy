import type { Ansewer } from "../types/globalTypes";
import type { GenericObject } from "../types/utilityTypes";

export function trimText(text: string, limit: number) {
  let returnedText = text;
  if (text.length > limit) {
    returnedText = text.slice(0, limit - 1) + "...";
  }
  return returnedText;
}

export function isImage(name: string) {
  const extension = name.slice(name.lastIndexOf(".") + 1);
  return extension === "jpg";
}

export function getColorForAnsewerButton(
  buttonValue: Exclude<Ansewer, null>,
  correctAnsewer: Exclude<Ansewer, null> | undefined,
  chosenAnsewer: Ansewer
) {
  if (correctAnsewer !== undefined) {
    const isButtonCorrectAnsewer = buttonValue === correctAnsewer;
    const isButtonCkecked = buttonValue === chosenAnsewer;
    if (isButtonCorrectAnsewer) return "success";
    if (!isButtonCorrectAnsewer && isButtonCkecked) return "error";
  }
  return "primary";
}

export function withoutProperty<O extends GenericObject, S extends string>(
  obj: O,
  property: Extract<keyof O, S>
): Omit<O, S> {
  const objCopy = { ...obj };
  delete objCopy[property];
  return objCopy;
}
