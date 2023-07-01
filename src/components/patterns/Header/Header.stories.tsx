import Header from "./Header";
import type { Meta, StoryObj } from "@storybook/react";

const metaData = {
  title: "Header",
} satisfies Meta<typeof Header>;

export default metaData;

type Story = StoryObj<typeof Header>;

export const Primary = {
  render: () => <Header />,
} satisfies Story;
