import SmallHeader from "./SmallHeader";
import type { Meta, StoryObj } from "@storybook/react";

const metaData = {
  title: "small header",
} satisfies Meta<typeof SmallHeader>;

export default metaData;

type Story = StoryObj<typeof SmallHeader>;

export const Primary = {
  render: () => <SmallHeader />,
} satisfies Story;
