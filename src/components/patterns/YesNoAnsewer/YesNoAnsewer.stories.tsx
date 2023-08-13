import YesNoAnsewer from "./YesNoAnsewer";
import type { Meta, StoryObj } from "@storybook/react";

const metaData = {
  title: "YesNoAnsewer",
  component: YesNoAnsewer,
} satisfies Meta<typeof YesNoAnsewer>;

export default metaData;

type Story = StoryObj<typeof YesNoAnsewer>;

export const Primary = {
  args: {
    chosenAnsewer: true,
    size: 5,
  },
} satisfies Story;
