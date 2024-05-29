import QuestionItem from "./QuestionItem";
import {
  basic,
  specialized,
} from "../../../tests/dummyQuestion/dummyQuestions";
import { wrapInDummyProviders } from "../../../tests/dummyProviders/DummyProviders";
import type { Meta, StoryObj } from "@storybook/react";

const QuestionItemWrapped = wrapInDummyProviders(QuestionItem);

const metaData = {
  title: "patters/Question item",
  component: QuestionItemWrapped,
} satisfies Meta<typeof QuestionItemWrapped>;

export default metaData;

type Story = StoryObj<typeof QuestionItemWrapped>;

export const Basic = {
  args: { number: 1, data: basic },
} satisfies Story;

export const Specialized = {
  args: { number: 2, data: specialized },
} satisfies Story;
