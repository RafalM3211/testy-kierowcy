import ButtonLink from "./ButtonLink";
import { wrapInDummyProviders } from "../../../tests/dummyProviders/DummyProviders";
import type { Meta, StoryObj } from "@storybook/react";

const ButtonLinkWrapped = wrapInDummyProviders(ButtonLink);

const metaData = {
  title: "atoms/ButtonLink",
  component: ButtonLinkWrapped,
} satisfies Meta<typeof ButtonLink>;

export default metaData;

type Story = StoryObj<typeof ButtonLink>;

export const Default = {
  args: {
    to: "#",
    children: "some text",
  },
} satisfies Story;

export const Contained = {
  args: {
    ...Default.args,
    variant: "contained",
  },
} satisfies Story;

export const outlined = {
  args: {
    ...Default.args,
    variant: "outlined",
  },
} satisfies Story;
