module.exports = {
  stories: ["../src//**/*.stories.?(ts|tsx|js|jsx)"],
  addons: [
    "@storybook/addon-ondevice-controls",
    "@storybook/addon-ondevice-actions",
    "@storybook/addon-ondevice-notes",
    "@storybook/addon-ondevice-knobs",
  ],
};
