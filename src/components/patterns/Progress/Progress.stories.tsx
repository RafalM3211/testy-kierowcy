import Progress from "./Progress";
import type { Meta, StoryObj } from "@storybook/react";

const metaData = {
  title: "Progress bar",
  component: Progress,
} satisfies Meta<typeof Progress>;

export default metaData;

type Story = StoryObj<typeof Progress>;

export const Primary = {
  args: { correct: 30, wrong: 20 },
} satisfies Story;
