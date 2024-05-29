import YesNoAnswer from "./YesNoAnswer";
import type { Meta, StoryObj } from "@storybook/react";

const metaData = {
  title: "patters/YesNoAnswer",
  component: YesNoAnswer,
} satisfies Meta<typeof YesNoAnswer>;

export default metaData;

type Story = StoryObj<typeof YesNoAnswer>;

export const Primary = {
  args: {
    chosenAnswer: true,
  },
} satisfies Story;
