import "@storybook/addon-ondevice-actions/register";
import "@storybook/addon-ondevice-knobs/register";
import { getStorybookUI } from "@storybook/react-native";
import "./storybook.requires";

const StorybookUIRoot = getStorybookUI({
  theme: {
    backgroundColor: "#E9E8DD",
  },
});

export default StorybookUIRoot;
