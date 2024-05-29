import Loader from "./Loader";
import type { Meta, StoryObj } from "@storybook/react";

const metaData = {
  title: "patters/Loader",
  component: Loader,
} satisfies Meta<typeof Loader>;

export default metaData;

type Story = StoryObj<typeof Loader>;

export const Primary = {} satisfies Story;
