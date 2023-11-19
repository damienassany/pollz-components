import { action } from "@storybook/addon-actions";
import { boolean, number } from "@storybook/addon-knobs";
import React from "react";
import { Poll } from ".";
import { storyOf } from "../../helpers/storyOf";

storyOf("Poll").add("default", () => (
  <Poll
    canAddOptions={boolean("canAddOptions", true)}
    withoutFeedback={boolean("withoutFeedback", false)}
    confirmToVote={boolean("confirmToVote", true)}
    pollId={number("pollId", 32)}
    userId="STORYBOOK_USER"
    onSubmitted={action("onSubmitted")}
  />
));
