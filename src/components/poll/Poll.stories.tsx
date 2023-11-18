import { action } from "@storybook/addon-actions";
import React from "react";
import { View } from "react-native";
import { Poll } from ".";
import { storyOf } from "../../helpers/storyOf";

storyOf("Poll").add("default", () => (
  <View style={{ minWidth: 350, minHeight: 300 }}>
    <Poll
      pollId={32}
      userId="STORYBOOK_USER"
      onSubmitted={action("onSubmitted")}
    />
  </View>
));
