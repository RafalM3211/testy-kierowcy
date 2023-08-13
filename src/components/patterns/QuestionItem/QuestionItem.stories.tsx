import QuestionItem from "./QuestionItem";
import {
  basic,
  specialized,
} from "../../../utility/dummyQuestion/dummyQuestions";
import { wrapInDummyProviders } from "../../../utility/dummyProviders/DummyProviders";
import type { Meta, StoryObj } from "@storybook/react";

const QuestionItemWrapped = wrapInDummyProviders(QuestionItem);

const metaData = {
  title: "Question item",
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
