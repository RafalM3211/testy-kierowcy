import { wrapInDummyProviders } from "../../../tests/dummyProviders/DummyProviders";
import MenuButton from "./MenuButton";
import type { Meta, StoryObj } from "@storybook/react";

const MenuButtonWrapped = wrapInDummyProviders(MenuButton);

const metaData = {
  title: "atoms/MenuButton",
  component: MenuButtonWrapped,
} satisfies Meta<typeof MenuButton>;

export default metaData;

type Story = StoryObj<typeof MenuButton>;

export const Primary = {} satisfies Story;
