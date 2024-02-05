import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import React from "react";
import { Poll } from ".";
import { storyOf } from "../../helpers/storyOf";

storyOf("Poll")
  .add("Single Choice", () => (
    <Poll
      canAddOptions={boolean("canAddOptions", true)}
      withoutFeedback={boolean("withoutFeedback", false)}
      confirmToVote={boolean("confirmToVote", true)}
      pollId={32}
      userId="STORYBOOK_USER"
      onSubmitted={action("onSubmitted")}
    />
  ))
  .add("Multiple Choices", () => (
    <Poll
      canAddOptions={boolean("canAddOptions", true)}
      withoutFeedback={boolean("withoutFeedback", false)}
      confirmToVote={boolean("confirmToVote", true)}
      pollId={30}
      userId="STORYBOOK_USER"
      onSubmitted={action("onSubmitted")}
    />
  ))
  .add("Scale", () => (
    <Poll
      canAddOptions={boolean("canAddOptions", true)}
      withoutFeedback={boolean("withoutFeedback", false)}
      confirmToVote={boolean("confirmToVote", true)}
      pollId={163}
      userId="STORYBOOK_USER"
      onSubmitted={action("onSubmitted")}
    />
  ));
