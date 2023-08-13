import { wrapInDummyProviders } from "../../../utility/dummyProviders/DummyProviders";
import YesNoAnsewer from "./YesNoAnsewer";
import type { Meta, StoryObj } from "@storybook/react";

const YesNoAnsewerWrapped = wrapInDummyProviders(YesNoAnsewer);

const metaData = {
  title: "YesNoAnsewer",
  component: YesNoAnsewerWrapped,
} satisfies Meta<typeof YesNoAnsewerWrapped>;

export default metaData;

type Story = StoryObj<typeof YesNoAnsewerWrapped>;

export const Primary = {
  args: {
    chosenAnsewer: true,
  },
} satisfies Story;
