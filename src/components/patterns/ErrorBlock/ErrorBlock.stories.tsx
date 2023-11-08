import ErrorBlock from "./ErrorBlock";
import type { Meta, StoryObj } from "@storybook/react";

const metaData = {
  title: "patters/Error block",
  component: ErrorBlock,
} satisfies Meta<typeof ErrorBlock>;

export default metaData;

type Story = StoryObj<typeof ErrorBlock>;

export const Primary = {} satisfies Story;
