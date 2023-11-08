import { wrapInDummyProviders } from "../../../tests/dummyProviders/DummyProviders";
import InfoChip from "./InfoChip";
import type { Meta, StoryObj } from "@storybook/react";

const InfoChipWrapped = wrapInDummyProviders(InfoChip);

const metaData = {
  title: "atoms/InfoChip",
  component: InfoChipWrapped,
} satisfies Meta<typeof InfoChip>;

export default metaData;

type Story = StoryObj<typeof InfoChip>;

export const Primary = { args: { children: "some child" } } satisfies Story;
