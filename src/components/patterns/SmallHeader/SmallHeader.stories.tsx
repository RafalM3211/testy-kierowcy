import { wrapInDummyProviders } from "../../../tests/dummyProviders/DummyProviders";
import SmallHeader from "./SmallHeader";
import type { Meta, StoryObj } from "@storybook/react";

const SmallHeaderWrapped = wrapInDummyProviders(SmallHeader);

const metaData = {
  title: "Small header",
  component: SmallHeaderWrapped,
} satisfies Meta<typeof SmallHeader>;

export default metaData;

type Story = StoryObj<typeof SmallHeader>;

export const Primary = {} satisfies Story;
