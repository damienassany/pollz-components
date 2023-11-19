import "@storybook/addon-ondevice-actions/register";
import { withKnobs } from "@storybook/addon-ondevice-knobs";
import "@storybook/addon-ondevice-knobs/register";
import { addDecorator, getStorybookUI } from "@storybook/react-native";
import "./storybook.requires";

addDecorator(withKnobs);

const StorybookUIRoot = getStorybookUI({
  theme: {
    backgroundColor: "#E9E8DD",
  },
});

export default StorybookUIRoot;
