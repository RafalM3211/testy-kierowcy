import List from "./List";
import {
  basic,
  specialized,
} from "../../../utility/dummyQuestion/dummyQuestions";
import type { Meta, StoryObj } from "@storybook/react";
import { wrapInDummyProviders } from "../../../utility/dummyProviders/DummyProviders";
import { Question } from "../../../types/globalTypes";

const ListWrapped = wrapInDummyProviders((props: { questions: Question[] }) => (
  <List questions={props.questions} />
));

const metaData = {
  title: "Questions list",
  component: ListWrapped,
} satisfies Meta<typeof ListWrapped>;

export default metaData;

type Story = StoryObj<typeof ListWrapped>;

const questions = [];
for (let i = 0; i < 3; i++) {
  questions.push(basic);
}
for (let i = 0; i < 3; i++) {
  questions.push(specialized);
}

export const Empty = {
  args: {
    questions: [],
  },
} satisfies Story;

export const Filled = {
  args: {
    questions: questions,
  },
} satisfies Story;
