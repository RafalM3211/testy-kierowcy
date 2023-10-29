import YesNoAnswer from "./YesNoAnswer";
import type { Meta, StoryObj } from "@storybook/react";

const metaData = {
  title: "YesNoAnswer",
  component: YesNoAnswer,
} satisfies Meta<typeof YesNoAnswer>;

export default metaData;

type Story = StoryObj<typeof YesNoAnswer>;

export const Primary = {
  args: {
    chosenAnswer: true,
    size: 5,
  },
} satisfies Story;
