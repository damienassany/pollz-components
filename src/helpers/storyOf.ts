import { storiesOf } from "@storybook/react-native";
import { ProviderFn } from "./provider";

export const storyOf = (name: string) => {
  return storiesOf(name, module).addDecorator(ProviderFn);
};
