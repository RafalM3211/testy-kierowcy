import ABCAnswer from "./ABCAnswer";
import { specialized } from "../../../tests/dummyQuestion/dummyQuestions";
import type { Meta, StoryObj } from "@storybook/react";

const metaData = {
  title: "patters/ABC answer",
  component: ABCAnswer,
  argTypes: {
    chosenAnswer: {
      options: ["A", "B", "C"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof ABCAnswer>;

export default metaData;

type Story = StoryObj<typeof ABCAnswer>;

export const Primary = {
  args: {
    answers: specialized.answers,
    chosenAnswer: "A",
  },
} satisfies Story;
