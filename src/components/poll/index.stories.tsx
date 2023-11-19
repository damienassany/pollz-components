import { action } from "@storybook/addon-actions";
import { boolean, number } from "@storybook/addon-knobs";
import React from "react";
import { View } from "react-native";
import { Poll } from ".";
import { storyOf } from "../../helpers/storyOf";

storyOf("Poll").add("default", () => (
  <View style={{ minWidth: 350, minHeight: 300 }}>
    <Poll
      withoutFeedback={boolean("withoutFeedback", false)}
      confirmToVote={boolean("confirmToVote", true)}
      pollId={number("pollId", 32)}
      userId="STORYBOOK_USER"
      onSubmitted={action("onSubmitted")}
    />
  </View>
));
