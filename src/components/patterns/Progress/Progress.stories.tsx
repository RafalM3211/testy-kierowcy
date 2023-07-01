import Progress from "./Progress";
import type { Meta, StoryObj } from "@storybook/react";

const metaData = {
  title: "Progress bar",
} satisfies Meta<typeof Progress>;

export default metaData;

type Story = StoryObj<typeof Progress>;

export const Primary = {
  render: () => <Progress />,
} satisfies Story;
