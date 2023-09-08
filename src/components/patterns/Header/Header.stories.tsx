import { wrapInDummyProviders } from "../../../tests/dummyProviders/DummyProviders";
import Header from "./Header";
import type { Meta, StoryObj } from "@storybook/react";

const HeaderWrapped = wrapInDummyProviders(Header);

const metaData = {
  title: "Header",
  component: HeaderWrapped,
} satisfies Meta<typeof Header>;

export default metaData;

type Story = StoryObj<typeof Header>;

export const Primary = {} satisfies Story;
