import { action } from "@storybook/addon-actions";
import React from "react";
import { CreatePoll } from ".";
import { storyOf } from "../../helpers/storyOf";

storyOf("CreatePoll").add("Default", () => (
  <CreatePoll onPollCreated={action("onPollCreated")} />
));
