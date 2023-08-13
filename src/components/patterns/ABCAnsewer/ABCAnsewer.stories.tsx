import ABCAnsewer from "./ABCAnsewer";
import { specialized } from "../../../utility/dummyQuestion/dummyQuestions";
import type { Meta, StoryObj } from "@storybook/react";

const metaData = {
  title: "ABC ansewer",
  component: ABCAnsewer,
  argTypes: {
    chosenAnsewer: {
      options: ["A", "B", "C"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof ABCAnsewer>;

export default metaData;

type Story = StoryObj<typeof ABCAnsewer>;

export const Primary = {
  args: {
    ansewers: specialized.ansewers,
    chosenAnsewer: "A",
  },
} satisfies Story;
