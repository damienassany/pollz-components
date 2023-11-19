import { withKnobs } from "@storybook/addon-ondevice-knobs";
import { storiesOf } from "@storybook/react-native";
import { ProviderFn } from "./provider";

export const storyOf = (name: string) => {
  return storiesOf(name, module)
    .addDecorator(withKnobs)
    .addDecorator(ProviderFn);
};
