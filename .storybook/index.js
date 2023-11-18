import { getStorybookUI } from "@storybook/react-native";

import "./storybook.requires";

const StorybookUIRoot = getStorybookUI({
  theme: {
    backgroundColor: "#E9E8DD",
  },
});

export default StorybookUIRoot;
