import { wrapInDummyProviders } from "../../../tests/dummyProviders/DummyProviders";
import Drawer from "./Drawer";
import type { Meta, StoryObj } from "@storybook/react";

const DrawerWrapped = wrapInDummyProviders(Drawer);

const metaData = {
  title: "Drawer",
  component: DrawerWrapped,
} satisfies Meta<typeof Drawer>;

export default metaData;

type Story = StoryObj<typeof Drawer>;

export const Primary = {
  args: { open: true, setOpen: () => {} },
} satisfies Story;
