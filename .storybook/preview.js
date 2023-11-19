import { withActions } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [withKnobs, withActions];
