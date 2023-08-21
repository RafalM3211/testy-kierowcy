import Progress from "./Progress";
import type { Meta, StoryObj } from "@storybook/react";

const metaData = {
  title: "Progress bar",
  component: Progress,
} satisfies Meta<typeof Progress>;

export default metaData;

type Story = StoryObj<typeof Progress>;

export const Primary = {
  args: { correctPercent: 30, wrongPercent: 20 },
} satisfies Story;
